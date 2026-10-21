import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  busy?: boolean;
}
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md',
  busy = false,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const callback = useRef(onClose);
  callback.current = onClose;
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = ref.current;
    panel?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) {
        e.preventDefault();
        callback.current();
      }
      if (e.key !== 'Tab' || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),a[href],[tabindex="0"]',
        ),
      ).filter((el) => !el.hidden);
      if (!focusable.length) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        e.preventDefault();
        last.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last || document.activeElement === panel)
      ) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('keydown', key);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [isOpen, busy]);
  if (!isOpen) return null;
  return (
    <div className="lf-modal-overlay">
      <div
        className="lf-modal-backdrop"
        aria-hidden="true"
        onClick={() => {
          if (!busy) onClose();
        }}
      />
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : 'Konfirmasi'}
        className={`lf-modal lf-modal-${maxWidth}`}
      >
        <header>
          <h2 id={titleId}>{title}</h2>
          <button type="button" onClick={onClose} disabled={busy} aria-label="Tutup modal">
            <X size={20} />
          </button>
        </header>
        <div className="lf-modal-body">{children}</div>
        {footer && <footer>{footer}</footer>}
      </div>
    </div>
  );
}
