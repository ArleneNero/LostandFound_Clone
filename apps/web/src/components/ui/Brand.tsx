import { Link } from 'react-router-dom';
export function Brand({
  compact = false,
  officer = false,
}: {
  compact?: boolean;
  officer?: boolean;
}) {
  return (
    <Link
      to="/"
      className={`lf-brand ${compact ? 'lf-brand-compact' : ''}`}
      aria-label="UBL LostnFound, halaman awal"
    >
      <span className="lf-brand-icon">
        <img src={`${import.meta.env.BASE_URL}favicon.svg`} width="52" height="56" alt="" />
      </span>
      <span className="lf-brand-copy">
        <strong>
          UBL <span>LostnFound</span>
        </strong>
        <small>{officer ? 'Petugas · Pengajaran' : 'Temukan barangmu dengan mudah.'}</small>
      </span>
    </Link>
  );
}
