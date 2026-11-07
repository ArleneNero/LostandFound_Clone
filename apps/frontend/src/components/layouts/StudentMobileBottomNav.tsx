import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export interface StudentNavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StudentMobileBottomNavProps {
  items: StudentNavItem[];
  isNavActive: (path: string) => boolean;
}

export const StudentMobileBottomNav: React.FC<StudentMobileBottomNavProps> = ({
  items,
  isNavActive,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--lf-border)] z-30 flex items-center justify-around h-16 px-2">
      {items.map((item) => {
        const Icon = item.icon;
        const active = isNavActive(item.path);
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={clsx(
              'flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-medium transition-colors',
              active ? 'text-[var(--lf-action)] font-bold' : 'text-[var(--lf-muted)]'
            )}
          >
            <Icon className={clsx('w-5 h-5 mb-0.5', active ? 'text-[var(--lf-action)]' : 'text-[var(--lf-muted)]')} />
            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

