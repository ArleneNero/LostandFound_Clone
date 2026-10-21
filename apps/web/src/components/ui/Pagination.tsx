import { Button } from './Button';
export function Pagination({
  page,
  totalPages,
  total,
  busy,
  onPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  busy: boolean;
  onPage: (page: number) => void;
}) {
  if (!total) return null;
  return (
    <nav className="lf-pagination" aria-label="Halaman katalog">
      <Button variant="secondary" disabled={busy || page <= 1} onClick={() => onPage(page - 1)}>
        Sebelumnya
      </Button>
      <span aria-live="polite">
        Halaman {page} dari {totalPages}
      </span>
      <Button
        variant="secondary"
        disabled={busy || page >= totalPages}
        onClick={() => onPage(page + 1)}
      >
        Berikutnya
      </Button>
    </nav>
  );
}
