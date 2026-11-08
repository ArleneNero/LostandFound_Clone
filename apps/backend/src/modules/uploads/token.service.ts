import { randomUUID } from "crypto";
import { tokenSigner } from "./token.signer.js";
import type { UploadPurpose } from "./uploads.dto.js";
import { AppError } from "../../utils/errors.js";

export interface UploadTokenPayload {
  tokenId: string;
  userId: string;
  purpose: UploadPurpose;
  storagePath: string;
  exp: number; // epoch in seconds
}

export class UploadTokenService {
  private consumedTokens = new Set<string>();

  public issueUploadToken(
    userId: string,
    purpose: UploadPurpose,
    storagePath: string,
    expiresInSeconds = 900
  ): { uploadToken: string; expiresAt: Date } {
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);
    const tokenId = randomUUID();

    const payload: UploadTokenPayload = {
      tokenId,
      userId,
      purpose,
      storagePath,
      exp: Math.floor(expiresAt.getTime() / 1000),
    };

    return {
      uploadToken: tokenSigner.sign(payload),
      expiresAt,
    };
  }

  public verifyAndConsume(
    uploadToken: string,
    expectedPurpose: UploadPurpose,
    expectedUserId: string
  ): { storagePath: string } {
    const payload = tokenSigner.verify<UploadTokenPayload>(uploadToken);
    if (!payload) {
      throw new AppError("INVALID_TOKEN", "Upload token tidak valid atau tanda tangan rusak", 422);
    }

    if (payload.exp * 1000 < Date.now()) {
      throw new AppError("TOKEN_EXPIRED", "Upload token telah kedaluwarsa (15 menit)", 422);
    }

    if (payload.purpose !== expectedPurpose) {
      throw new AppError(
        "INVALID_PURPOSE",
        `Tujuan token tidak sesuai (diharapkan: ${expectedPurpose}, aktual: ${payload.purpose})`,
        422
      );
    }

    if (payload.userId !== expectedUserId) {
      throw new AppError("FORBIDDEN", "Upload token bukan milik akun yang sedang login", 403);
    }

    if (this.consumedTokens.has(payload.tokenId)) {
      throw new AppError("TOKEN_ALREADY_USED", "Upload token sudah pernah digunakan (anti-replay)", 409);
    }

    this.consumedTokens.add(payload.tokenId);
    return { storagePath: payload.storagePath };
  }

  public clear(): void {
    this.consumedTokens.clear();
  }
}

export const uploadTokenService = new UploadTokenService();
