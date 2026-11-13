import { env } from "../config/env.js";

export class EmailService {
  async sendPasswordResetEmail(toEmail: string, resetUrl: string, fullName: string): Promise<boolean> {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL,
          to: [toEmail],
          subject: "Atur Ulang Kata Sandi Akun — UBL LostnFound",
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8fb; margin: 0; padding: 24px; }
    .card { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; }
    .header { background: #0050c8; padding: 28px 24px; text-align: center; color: #ffffff; }
    .title { font-size: 20px; font-weight: 700; margin: 0; }
    .subtitle { font-size: 13px; opacity: 0.85; margin-top: 6px; }
    .body { padding: 32px 28px; color: #1e293b; line-height: 1.6; font-size: 14px; }
    .btn-container { text-align: center; margin: 30px 0; }
    .btn { display: inline-block; background-color: #0050c8; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 13px 32px; border-radius: 10px; font-size: 14px; }
    .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 class="title">UBL LostnFound</h1>
      <p class="subtitle">Layanan Barang Temuan Kampus Universitas Budi Luhur</p>
    </div>
    <div class="body">
      <p>Halo, <strong>${fullName}</strong>!</p>
      <p>Kami menerima permintaan untuk mengatur ulang kata sandi akun mahasiswa Anda. Klik tombol di bawah ini untuk membuat kata sandi baru:</p>
      <div class="btn-container">
        <a href="${resetUrl}" class="btn">Atur Ulang Kata Sandi</a>
      </div>
      <p style="font-size: 12px; color: #64748b;">Tautan ini hanya berlaku selama <strong>30 menit</strong>. Jika Anda tidak merasa meminta pengaturan ulang kata sandi, Anda dapat mengabaikan email ini dengan aman.</p>
      <p style="font-size: 11px; color: #94a3b8; word-break: break-all; margin-top: 20px;">
        Jika tombol di atas tidak dapat diklik, salin dan buka tautan berikut di peramban Anda:<br>
        <a href="${resetUrl}" style="color: #0050c8;">${resetUrl}</a>
      </p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Universitas Budi Luhur — Pos Pengajaran Terpadu.
    </div>
  </div>
</body>
</html>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Resend API error:", errorData);
        return false;
      }

      return true;
    } catch (err) {
      console.error("Failed to send reset email:", err);
      return false;
    }
  }
}

export const emailService = new EmailService();
