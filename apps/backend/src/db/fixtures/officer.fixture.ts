import "dotenv/config";

export const SEED_OFFICER_EMAIL =
  process.env.SEED_OFFICER_EMAIL || "lostandfound.budiluhur@gmail.com";
export const SEED_OFFICER_PASSWORD =
  process.env.SEED_OFFICER_PASSWORD || "dummy-dev-password";
export const SEED_OFFICER_PASSWORD_HASH =
  process.env.SEED_OFFICER_PASSWORD_HASH ||
  "$2b$10$l.tv/TEACqQO2ZwUJr0Qfu/w/.VC5knT97F80dhzTlTCol69ifrIi";

export const officerSeedData = {
  authUserId: "seed-officer-pengajaran-01",
  fullName: "Petugas Pos Pengajaran",
  email: SEED_OFFICER_EMAIL,
  role: "OFFICER" as const,
  passwordHash: SEED_OFFICER_PASSWORD_HASH,
};

export const servicePostSeedData = {
  name: "Pos Pengajaran",
  locationDescription: "Gedung Pengajaran Lt. 1, Dekat Lobby Utama (Akses Lapangan)",
  openingHours: "Senin - Jumat, 08:00 - 16:00 WIB",
  directions: "Dari gerbang utama jalan lurus ke arah gedung pengajaran samping lapangan.",
  storageLimitDays: 30,
};

export const servicePostPhotoSeedData = {
  storagePath: "posts/pos-pengajaran-cover.webp",
  position: 1,
};

export const SEED_STUDENT_EMAIL =
  process.env.SEED_STUDENT_EMAIL || "2411502194@student.budiluhur.ac.id";
export const SEED_STUDENT_PASSWORD =
  process.env.SEED_STUDENT_PASSWORD || "Nero Mahasiswa";
export const SEED_STUDENT_PASSWORD_HASH =
  process.env.SEED_STUDENT_PASSWORD_HASH ||
  "$2b$10$YbkvabCo5a2Nn3B0Uq1j0e8c6XOgHN6JxcKiL5yJhiLy9YQaDpq/2";

export const studentSeedData = {
  authUserId: "seed-student-nero-01",
  fullName: "Nero Mahasiswa",
  email: SEED_STUDENT_EMAIL,
  studentNumber: "2411502194",
  role: "STUDENT" as const,
  passwordHash: SEED_STUDENT_PASSWORD_HASH,
};
