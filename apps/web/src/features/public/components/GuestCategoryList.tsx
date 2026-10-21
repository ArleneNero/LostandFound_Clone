import { useNavigate } from 'react-router-dom';
import { Laptop, Briefcase, Wallet, Key, CreditCard, LayoutGrid } from 'lucide-react';
const categories = [
  { name: 'Elektronik', icon: Laptop, color: '#e9f4ff', ink: '#1677ff' },
  { name: 'Tas', icon: Briefcase, color: '#f0ecff', ink: '#7856ff' },
  { name: 'Dompet', icon: Wallet, color: '#eff0ff', ink: '#7666ee' },
  { name: 'Kunci', icon: Key, color: '#fff7e5', ink: '#df9e00' },
  { name: 'KTM', icon: CreditCard, color: '#e7faf4', ink: '#009e85' },
  { name: 'Lainnya', icon: LayoutGrid, color: '#edf4fc', ink: '#5977a4' },
];
export function GuestCategoryList({
  onSelect,
  selected,
}: {
  onSelect?: (category: string) => void;
  selected?: string;
}) {
  const navigate = useNavigate();
  const select = (category: string) =>
    onSelect
      ? onSelect(category)
      : navigate(`/barang${category === 'ALL' ? '' : `?cat=${encodeURIComponent(category)}`}`);
  return (
    <section className="lf-surface lf-category-panel">
      <div className="lf-heading-row">
        <h2>Kategori</h2>
        <button type="button" className="lf-text-link" onClick={() => select('ALL')}>
          Lihat semua
        </button>
      </div>
      <div className="lf-categories">
        {categories.map(({ name, icon: Icon, color, ink }) => (
          <button
            type="button"
            key={name}
            aria-pressed={selected === name}
            onClick={() => select(name)}
          >
            <span style={{ background: color, color: ink }}>
              <Icon size={23} />
            </span>
            <small>{name}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
