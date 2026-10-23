import { RoleSelectionSection } from './landing/RoleSelectionSection';
export function LandingPage() {
  return (
    <div className="lf-landing">
      <section className="lf-landing-hero" aria-labelledby="landing-title">
        <img
          src={`${import.meta.env.BASE_URL}assets/illustrations/landing/Kotak Barang Hilang dan Ditemukan.png`}
          alt="Ilustrasi kotak barang temuan"
        />
        <div className="lf-landing-copy">
          <h1 id="landing-title">Barangmu hilang?</h1>
          <p>Tenang, barangmu mungkin sudah ditemukan! Yuk, cek barang temuan di sekitar kampus.</p>
        </div>
      </section>
      <RoleSelectionSection />
    </div>
  );
}
