import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  isItemOverdue,
  filterAndSortInventory,
  getDaysStored,
} from '@/features/officer/selectors/inventorySelectors';
import { OfficerInventoryPage } from '@/pages/officer/OfficerInventoryPage';
import { OfficerItemDetailPage } from '@/pages/officer/OfficerItemDetailPage';
import { services } from '@/services/registry';
import { mockStore } from '@/data/mockStore';
import { FoundItem } from '@/types/domain';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Officer Inventory Submilestone (F/B.2)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.reset();
  });

  describe('Inventory Selectors & Overdue Computation (F/B.2.3)', () => {
    it('correctly calculates days stored and overdue status without modifying status', () => {
      // 40 days ago
      const fortyDaysAgo = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString();
      // 5 days ago
      const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();

      expect(getDaysStored(fortyDaysAgo)).toBeGreaterThanOrEqual(40);
      expect(isItemOverdue(fortyDaysAgo, 30)).toBe(true);

      expect(getDaysStored(fiveDaysAgo)).toBeLessThan(30);
      expect(isItemOverdue(fiveDaysAgo, 30)).toBe(false);
    });

    it('filters and sorts inventory correctly', () => {
      const items: FoundItem[] = [
        {
          id: '1',
          inventoryCode: 'INV-001',
          name: 'Dompet Kulit',
          category: 'Dompet',
          description: '',
          foundLocation: 'Kantin',
          foundDate: '2026-10-10',
          receivedAt: '2026-10-10T10:00:00Z',
          postId: 1,
          postName: 'Pos Pengajaran',
          photoUrl: '',
          status: 'STORED',
          isVisible: true,
          privateNotes: 'Ciri khusus',
        },
        {
          id: '2',
          inventoryCode: 'INV-002',
          name: 'Kunci Motor',
          category: 'Kunci',
          description: '',
          foundLocation: 'Parkiran',
          foundDate: '2026-10-15',
          receivedAt: '2026-10-15T10:00:00Z',
          postId: 1,
          postName: 'Pos Pengajaran',
          photoUrl: '',
          status: 'RETURNED_TO_OWNER',
          isVisible: false,
          privateNotes: null,
        },
      ];

      // Filter by status STORED
      const storedOnly = filterAndSortInventory(items, { status: 'STORED' });
      expect(storedOnly.length).toBe(1);
      expect(storedOnly[0].id).toBe('1');

      // Filter by search query
      const searched = filterAndSortInventory(items, { search: 'Kunci' });
      expect(searched.length).toBe(1);
      expect(searched[0].id).toBe('2');

      // Sort oldest first
      const oldestFirst = filterAndSortInventory(items, { sortBy: 'oldest' });
      expect(oldestFirst[0].id).toBe('1');
    });
  });

  describe('OfficerInventoryPage (F/B.2.0, F/B.2.4)', () => {
    it('renders inventory list and scope disclaimer banner', async () => {
      render(
        <MemoryRouter>
          <OfficerInventoryPage />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(
          screen.getByText(
            'Data hanya dari unit Pengajaran. Tidak ada akses edit inventaris unit lain.',
          ),
        ).toBeDefined();
        expect(screen.getAllByText('Kunci Motor Honda Vario').length).toBeGreaterThan(0);
      });

      expect(screen.getByPlaceholderText('Cari barang atau kode inventaris...')).toBeDefined();
    });

    it('filters items when search input is typed', async () => {
      render(
        <MemoryRouter>
          <OfficerInventoryPage />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getAllByText('Kunci Motor Honda Vario').length).toBeGreaterThan(0);
      });

      const searchInput = screen.getByPlaceholderText(
        'Cari barang atau kode inventaris...',
      ) as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'Honda' } });
      expect(searchInput.value).toBe('Honda');
    });
  });

  describe('Internal Detail & Visibility Toggle (F/B.2.1, F/B.2.2)', () => {
    it('renders internal details with private notes', async () => {
      render(
        <MemoryRouter initialEntries={['/petugas/inventaris/item-uuid-001']}>
          <Routes>
            <Route path="/petugas/inventaris/:id" element={<OfficerItemDetailPage />} />
          </Routes>
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('Kunci Motor Honda Vario')).toBeDefined();
        expect(screen.getByText('Hanya untuk petugas')).toBeDefined();
        expect(screen.getByText('Plat nomor B 3456 SAA tercatat di STNK remote.')).toBeDefined();
      });
    });

    it('toggles catalog visibility without altering STORED status', async () => {
      render(
        <MemoryRouter initialEntries={['/petugas/inventaris/item-uuid-001']}>
          <Routes>
            <Route path="/petugas/inventaris/:id" element={<OfficerItemDetailPage />} />
          </Routes>
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('Visibilitas Katalog Publik')).toBeDefined();
      });

      // Initially visible
      const toggleBtn = screen.getByRole('button', { name: /Sembunyikan/i });
      fireEvent.click(toggleBtn);

      await waitFor(async () => {
        const item = await services.items.getItemById('item-uuid-001');
        expect(item?.isVisible).toBe(false);
        expect(item?.status).toBe('STORED'); // Status MUST remain STORED
      });

      // Verify public catalog excludes hidden item
      const publicItems = await services.items.getItems();
      const inPublic = publicItems.items.some((i) => i.id === 'item-uuid-001');
      expect(inPublic).toBe(false);
    });
  });
});
