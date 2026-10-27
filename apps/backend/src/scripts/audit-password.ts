import bcrypt from 'bcryptjs';
import { pool } from '../db/index.js';

async function runAudit() {
  console.log('=== AUDIT HASHING PASSWORD BCRYPT ===\n');

  // 1. Ambil data petugas dari database Neon PostgreSQL
  const res = await pool.query(
    "SELECT user_id, full_name, email, role, password_hash FROM users WHERE role = 'OFFICER';"
  );

  console.log(`Ditemukan ${res.rows.length} akun petugas di database:`);
  for (const row of res.rows) {
    console.log(`- [${row.email}] | password_hash: ${row.password_hash ? row.password_hash : '(belum di-set)'}`);
  }

  // 2. Audit baris akun petugas aktif (Pos Pengajaran)
  const targetEmail = 'lostandfound.budiluhur@gmail.com';
  const officer = res.rows.find((r) => r.email === targetEmail);

  if (!officer || !officer.password_hash) {
    throw new Error('Akun tidak ditemukan atau belum memiliki hash');
  }

  console.log(`\n--- Pemeriksaan Kriptografis [${targetEmail}] ---`);
  console.log('1. Raw Nilai di DB   :', officer.password_hash);
  console.log('2. Panjang Karakter  :', officer.password_hash.length, 'karakter (standar Bcrypt = 60)');
  console.log('3. Identifier Versi  :', officer.password_hash.substring(0, 4), '($2b$ = spesifikasi Bcrypt)');
  console.log('4. Cost Factor (Salt):', officer.password_hash.substring(4, 7), '(10 rounds = 2^10 = 1024 iterasi hashing)');
  console.log('5. Salt Nilai        :', officer.password_hash.substring(7, 29));
  console.log('6. Hash Nilai        :', officer.password_hash.substring(29));

  // 3. Verifikasi Matematis Bcrypt
  const matchCorrect = await bcrypt.compare('petugasUBL2026!', officer.password_hash);
  const matchWrong = await bcrypt.compare('salahPassword123', officer.password_hash);
  const matchEmpty = await bcrypt.compare('', officer.password_hash);

  console.log('\n--- Uji Verifikasi bcrypt.compare() ---');
  console.log('Input: "petugasUBL2026!"  -> Hasil:', matchCorrect ? 'VALID (MATCH)' : 'FAILED');
  console.log('Input: "salahPassword123" -> Hasil:', matchWrong ? 'VALID' : 'REJECTED (MISMATCH)');
  console.log('Input: "" (string kosong) -> Hasil:', matchEmpty ? 'VALID' : 'REJECTED (MISMATCH)');

  // 4. Verifikasi bahwa plaintext TIDAK tersimpan
  const plaintextCheck = await pool.query(
    "SELECT * FROM users WHERE users::text ILIKE '%petugasUBL2026!%';"
  );
  console.log('\n--- Uji Deteksi Plaintext di Database ---');
  console.log('Jumlah kemunculan string plaintext "petugasUBL2026!" di seluruh tabel:', plaintextCheck.rows.length);

  await pool.end();
}

runAudit().catch(console.error);
