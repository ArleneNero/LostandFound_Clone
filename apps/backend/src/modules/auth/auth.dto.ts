import { z } from "zod";

// 1. Me Schema (Canonical OpenAPI v1.0 allowlist)
export const meSchema = z.object({
  user_id: z.string().uuid(),
  full_name: z.string(),
  email: z.string().email(),
  student_number: z.string().nullable(),
  role: z.enum(["STUDENT", "OFFICER"]),
  assigned_post_id: z.number().int().nullable(),
  nim_verification_status: z.literal("NOT_VERIFIED"),
});
export type Me = z.infer<typeof meSchema>;

// 2. Response Envelope
export const meResponseSchema = z.object({
  data: meSchema,
});
export type MeResponse = z.infer<typeof meResponseSchema>;

// 3. Officer Login Request Schema
export const officerLoginSchema = z.object({
  email: z.string().trim().email("Format email tidak valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});
export type OfficerLoginRequest = z.infer<typeof officerLoginSchema>;

// 4. Officer Login Response Schema
export const officerLoginResponseSchema = z.object({
  data: z.object({
    token: z.string(),
    user: meSchema,
  }),
});
export type OfficerLoginResponse = z.infer<typeof officerLoginResponseSchema>;

// 5. Bootstrap Request Schema (B/H.1.0)
export const bootstrapRequestSchema = z
  .object({
    full_name: z.string().trim().min(1, "Nama lengkap tidak boleh kosong").max(120),
    student_number: z.string().trim().min(1, "NIM tidak boleh kosong").max(30),
  })
  .strict();
export type BootstrapRequest = z.infer<typeof bootstrapRequestSchema>;

// 6. Student Login Request Schema
export const studentLoginSchema = z.object({
  email: z.string().trim().email("Format email tidak valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});
export type StudentLoginRequest = z.infer<typeof studentLoginSchema>;

// 7. Student Register Request Schema
export const studentRegisterSchema = z.object({
  full_name: z.string().trim().min(2, "Nama lengkap minimal 2 karakter").max(120),
  email: z.string().trim().email("Format email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  student_number: z.string().trim().min(5, "NIM minimal 5 karakter").max(30),
});
export type StudentRegisterRequest = z.infer<typeof studentRegisterSchema>;
