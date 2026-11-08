import type { AuthUser } from "../auth/auth.types.js";
import type { UploadPurpose } from "./uploads.dto.js";
import type { StoredIntent } from "./intent.registry.js";
import type { ObjectMetadata } from "./storage/storage.interface.js";
import { AppError } from "../../utils/errors.js";

export function assertRoleForPurpose(user: AuthUser, purpose: UploadPurpose): void {
  if (purpose === "ITEM_PHOTO" && user.role !== "OFFICER") {
    throw new AppError("FORBIDDEN", "Hanya petugas (OFFICER) yang berwenang meminta upload intent ITEM_PHOTO", 403);
  }

  if (purpose === "REPORT_PHOTO" && user.role !== "STUDENT") {
    throw new AppError("FORBIDDEN", "Hanya mahasiswa (STUDENT) yang berwenang meminta upload intent REPORT_PHOTO", 403);
  }
}

export function validateIntentForFinalize(intent: StoredIntent | null, user: AuthUser): StoredIntent {
  if (!intent) {
    throw new AppError("INTENT_NOT_FOUND", "Upload intent tidak ditemukan atau sudah kedaluwarsa", 404);
  }

  if (intent.userId !== user.userId) {
    throw new AppError("FORBIDDEN", "Upload intent bukan milik akun Anda", 403);
  }

  if (Date.now() > intent.expiresAt) {
    throw new AppError("INTENT_EXPIRED", "Upload intent telah kedaluwarsa (batas waktu 5 menit)", 422);
  }

  return intent;
}

export function validateObjectMetadata(metadata: ObjectMetadata, intent: StoredIntent): void {
  if (!metadata.exists) {
    throw new AppError("OBJECT_NOT_FOUND", "Objek gambar belum diunggah ke storage R2", 404);
  }

  if (metadata.contentLength > intent.sizeBytes) {
    throw new AppError(
      "PAYLOAD_TOO_LARGE",
      `Ukuran objek (${metadata.contentLength} bytes) melebihi deklarasi intent (${intent.sizeBytes} bytes)`,
      422
    );
  }
}
