import { db } from "../../db/index.js";
import { users, servicePosts } from "../../db/schema.js";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { AuthUser, TokenPayload } from "./auth.types.js";
import { jwtService } from "./jwt.service.js";
import { Me } from "./auth.dto.js";

export class AuthService {
  /**
   * Helper to sign a deterministic JWT with HMAC-SHA256 (HS256).
   * Delegated to JwtService for cryptographic separation.
   */
  createToken(
    payload: { sub: string; email?: string; name?: string },
    expiresInSeconds: number = 3600
  ): string {
    return jwtService.createToken(payload, expiresInSeconds);
  }

  /**
   * Verifies a Bearer JWT signature, structure, and expiration safely against timing attacks.
   * Delegated to JwtService for cryptographic separation.
   */
  verifyToken(token: string): TokenPayload | null {
    return jwtService.verifyToken(token);
  }

  /**
   * B/D.1.1: Resolves local user from Neon PostgreSQL by auth_user_id (Never trusts role from client)
   */
  async getUserByAuthId(authUserId: string): Promise<AuthUser | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.authUserId, authUserId),
    });

    if (!user) {
      return null;
    }

    return {
      userId: user.userId,
      authUserId: user.authUserId,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      studentNumber: user.studentNumber,
    };
  }

  /**
   * B/D.1.2: Resolves assigned service post for an officer (Pos Pengajaran)
   */
  async getOfficerPost(userId: string): Promise<{ postId: number; name: string } | null> {
    const post = await db.query.servicePosts.findFirst({
      where: eq(servicePosts.officerUserId, userId),
    });

    if (!post) {
      return null;
    }

    return {
      postId: post.postId,
      name: post.name,
    };
  }

  /**
   * Officer Login: Zero-Trust Server-Side Credential & Role Validation
   * - Finds officer by email
   * - Strictly verifies user.role === 'OFFICER'
   * - Compares submitted password with user.passwordHash using bcrypt
   * - Issues JWT token and returns verified officer profile
   */
  async officerLogin(
    email: string,
    password: string
  ): Promise<
    | { success: true; data: { token: string; user: Me } }
    | { success: false; code: string; message: string }
  > {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });

    // Zero-Trust: If user not found, or user is not an OFFICER, or no passwordHash set
    if (!user || user.role !== "OFFICER" || !user.passwordHash) {
      return {
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Email atau kata sandi petugas tidak valid",
      };
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return {
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Email atau kata sandi petugas tidak valid",
      };
    }

    const post = await this.getOfficerPost(user.userId);
    const token = this.createToken({
      sub: user.authUserId,
      email: user.email,
      name: user.fullName,
    });

    const officerProfile: Me = {
      user_id: user.userId,
      full_name: user.fullName,
      email: user.email,
      student_number: user.studentNumber,
      role: user.role,
      assigned_post_id: post?.postId ?? null,
      nim_verification_status: "NOT_VERIFIED",
    };

    return {
      success: true,
      data: {
        token,
        user: officerProfile,
      },
    };
  }

  /**
   * B/H.1.0: POST /me/bootstrap
   * Creates a student profile after verified email authentication.
   * Derives authUserId and email strictly from verified session.
   * Returns 409 PROFILE_EXISTS if user already has an active student profile.
   */
  async bootstrapStudent(
    authUserId: string,
    email: string,
    fullName: string,
    studentNumber: string
  ): Promise<
    | { success: true; data: Me }
    | { success: false; code: string; message: string; statusCode?: number }
  > {
    const normalizedEmail = (email || "").trim().toLowerCase();
    if (!normalizedEmail.endsWith("@student.budiluhur.ac.id")) {
      return {
        success: false,
        code: "INVALID_STUDENT_DOMAIN",
        message: "Hanya email resmi mahasiswa (@student.budiluhur.ac.id) yang diizinkan untuk akun mahasiswa",
        statusCode: 403,
      };
    }

    const existing = await db.query.users.findFirst({
      where: eq(users.authUserId, authUserId),
    });

    if (existing && existing.studentNumber) {
      return {
        success: false,
        code: "PROFILE_EXISTS",
        message: "Profil mahasiswa sudah terdaftar",
        statusCode: 409,
      };
    }

    let user;
    if (existing) {
      const [updated] = await db
        .update(users)
        .set({
          fullName,
          studentNumber,
          role: "STUDENT",
        })
        .where(eq(users.userId, existing.userId))
        .returning();
      user = updated;
    } else {
      const [created] = await db
        .insert(users)
        .values({
          authUserId,
          email,
          fullName,
          studentNumber,
          role: "STUDENT",
        })
        .returning();
      user = created;
    }

    const meData: Me = {
      user_id: user.userId,
      full_name: user.fullName,
      email: user.email,
      student_number: user.studentNumber,
      role: user.role,
      assigned_post_id: null,
      nim_verification_status: "NOT_VERIFIED",
    };

    return {
      success: true,
      data: meData,
    };
  }

  /**
   * Student Login: Zero-Trust Server-Side Credential & Domain Validation
   * - Verifies email ends with @student.budiluhur.ac.id
   * - Finds student by email strictly with role === 'STUDENT'
   * - Compares password using bcrypt
   * - Issues JWT token and returns verified student profile
   */
  async studentLogin(
    email: string,
    password: string
  ): Promise<
    | { success: true; data: { token: string; user: Me } }
    | { success: false; code: string; message: string; statusCode?: number }
  > {
    const normalizedEmail = (email || "").trim().toLowerCase();
    if (!normalizedEmail.endsWith("@student.budiluhur.ac.id")) {
      return {
        success: false,
        code: "INVALID_STUDENT_DOMAIN",
        message: "Hanya email resmi mahasiswa (@student.budiluhur.ac.id) yang diizinkan untuk akun mahasiswa",
        statusCode: 403,
      };
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });

    if (!user || user.role !== "STUDENT" || !user.passwordHash) {
      return {
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Email atau kata sandi mahasiswa tidak valid",
        statusCode: 401,
      };
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return {
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Email atau kata sandi mahasiswa tidak valid",
        statusCode: 401,
      };
    }

    const token = this.createToken({
      sub: user.authUserId,
      email: user.email,
      name: user.fullName,
    });

    const studentProfile: Me = {
      user_id: user.userId,
      full_name: user.fullName,
      email: user.email,
      student_number: user.studentNumber,
      role: user.role,
      assigned_post_id: null,
      nim_verification_status: "NOT_VERIFIED",
    };

    return {
      success: true,
      data: {
        token,
        user: studentProfile,
      },
    };
  }

  /**
   * Student Register: Server-Side Registration with Domain & Duplicate Checks
   * - Verifies email ends with @student.budiluhur.ac.id
   * - Checks duplicate email or studentNumber
   * - Hashes password using bcrypt
   * - Creates user with role === 'STUDENT'
   * - Issues JWT token and returns verified student profile
   */
  async studentRegister(
    fullName: string,
    email: string,
    password: string,
    studentNumber: string
  ): Promise<
    | { success: true; data: { token: string; user: Me } }
    | { success: false; code: string; message: string; statusCode?: number }
  > {
    const normalizedEmail = (email || "").trim().toLowerCase();
    if (!normalizedEmail.endsWith("@student.budiluhur.ac.id")) {
      return {
        success: false,
        code: "INVALID_STUDENT_DOMAIN",
        message: "Hanya email resmi mahasiswa (@student.budiluhur.ac.id) yang diizinkan untuk akun mahasiswa",
        statusCode: 403,
      };
    }

    const existingEmail = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });
    if (existingEmail) {
      return {
        success: false,
        code: "EMAIL_EXISTS",
        message: "Email mahasiswa sudah terdaftar",
        statusCode: 409,
      };
    }

    const existingNim = await db.query.users.findFirst({
      where: eq(users.studentNumber, studentNumber.trim()),
    });
    if (existingNim) {
      return {
        success: false,
        code: "STUDENT_NUMBER_EXISTS",
        message: "NIM mahasiswa sudah terdaftar",
        statusCode: 409,
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const authUserId = `student-${crypto.randomUUID()}`;

    const [created] = await db
      .insert(users)
      .values({
        authUserId,
        email: normalizedEmail,
        fullName: fullName.trim(),
        studentNumber: studentNumber.trim(),
        passwordHash,
        role: "STUDENT",
      })
      .returning();

    const token = this.createToken({
      sub: created.authUserId,
      email: created.email,
      name: created.fullName,
    });

    const studentProfile: Me = {
      user_id: created.userId,
      full_name: created.fullName,
      email: created.email,
      student_number: created.studentNumber,
      role: created.role,
      assigned_post_id: null,
      nim_verification_status: "NOT_VERIFIED",
    };

    return {
      success: true,
      data: {
        token,
        user: studentProfile,
      },
    };
  }
}

export const authService = new AuthService();
