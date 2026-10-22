import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
interface RoleCardProps {
  title: string;
  description: string;
  iconSrc?: string;
  iconFallback?: ReactNode;
  iconBgColor?: string;
  onClick: () => void;
}
export function RoleCard({ title, description, iconSrc, iconFallback, onClick }: RoleCardProps) {
  return (
    <button
      type="button"
      className="lf-role-card"
      aria-label={`${title} ${description}`}
      onClick={onClick}
    >
      <span className={`lf-role-art ${iconSrc ? '' : 'lf-role-art-guest'}`}>
        {iconSrc ? <img src={iconSrc} alt="" /> : iconFallback}
      </span>
      <span className="lf-role-copy">
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <ChevronRight size={16} />
    </button>
  );
}
