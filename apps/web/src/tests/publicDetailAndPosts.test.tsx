import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ItemDetailPage } from '@/pages/ItemDetailPage';
import { PostsPage } from '@/pages/PostsPage';
import { GuidePage } from '@/pages/GuidePage';
import { services } from '@/services/registry';
import { mockStore } from '@/data/mockStore';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Public Item Detail, Posts & Guide (F/C.3 - F/C.4)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.reset();
  });

  describe('F/C.3.0 - F/C.3.3: ItemDetailPage & 404 Behavior', () => {
    it('renders item details accurately with no private notes or reporter leakage', async () => {
      render(
        <MemoryRouter initialEntries={['/barang/item-uuid-003']}>
          <Routes>
            <Route path="/barang/:id" element={<ItemDetailPage />} />
          </Routes>
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('AirPods Pro')).toBeDefined();
        expect(screen.getByText(/Earbuds putih beserta wadah pengisi daya/i)).toBeDefined();
        expect(screen.getAllByText('Pengajaran').length).toBeGreaterThan(0);
      });

      // Assert private notes are NEVER rendered
      expect(screen.queryByText(/Serial number tertera/i)).toBeNull();
    });

    it('renders 404 Not Found state for non-existent item id', async () => {
      render(
        <MemoryRouter initialEntries={['/barang/item-non-existent-999']}>
          <Routes>
            <Route path="/barang/:id" element={<ItemDetailPage />} />
          </Routes>
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('Barang Tidak Ditemukan')).toBeDefined();
        expect(screen.getByText('Kembali ke Katalog')).toBeDefined();
      });
    });

    it('renders 404 when item is hidden by officer (cross-role test F/C.3.1 & F/C.2.4)', async () => {
      // Officer toggles item to invisible
      await services.items.updateVisibility('item-uuid-003', false);

      // Verify public getPublicItemById returns null
      const publicItem = await services.items.getPublicItemById('item-uuid-003');
      expect(publicItem).toBeNull();

      // Verify UI renders 404
      render(
        <MemoryRouter initialEntries={['/barang/item-uuid-003']}>
          <Routes>
            <Route path="/barang/:id" element={<ItemDetailPage />} />
          </Routes>
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('Barang Tidak Ditemukan')).toBeDefined();
      });
    });

    it('renders 404 when item status is RETURNED_TO_OWNER', async () => {
      // Officer returns item
      await services.items.returnItem(
        'item-uuid-001',
        'Budi Luhur Student',
        'Bawa kartu identitas',
      );

      // Verify public getPublicItemById returns null
      const publicItem = await services.items.getPublicItemById('item-uuid-001');
      expect(publicItem).toBeNull();

      // Verify UI renders 404
      render(
        <MemoryRouter initialEntries={['/barang/item-uuid-001']}>
          <Routes>
            <Route path="/barang/:id" element={<ItemDetailPage />} />
          </Routes>
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('Barang Tidak Ditemukan')).toBeDefined();
      });
    });
  });

  describe('F/C.4.0 & F/C.4.1: Pos Pelayanan & Galeri Pos', () => {
    it('renders supplied post names and honest empty location states', async () => {
      render(
        <MemoryRouter>
          <PostsPage />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('Pos Pelayanan')).toBeDefined();
        expect(screen.getByText('Pengajaran')).toBeDefined();
        expect(screen.getAllByText('Lokasi belum dilengkapi')[0]).toBeDefined();
        expect(screen.getAllByText('Jam layanan belum dilengkapi')[0]).toBeDefined();
        expect(screen.getByText('Satu katalog, tiga pos')).toBeDefined();
      });
    });

    it('navigates to catalog filtered by post when button clicked', async () => {
      render(
        <MemoryRouter>
          <PostsPage />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getAllByText('Lihat Barang di Pos Ini').length).toBeGreaterThan(0);
      });

      fireEvent.click(screen.getAllByText('Lihat Barang di Pos Ini')[0]);
      expect(mockNavigate).toHaveBeenCalledWith('/barang?post=1');
    });
  });

  describe('F/C.4.2: Pickup Guide Page', () => {
    it('renders 5 sequential physical verification steps per Figma 03.P05', () => {
      render(
        <MemoryRouter>
          <GuidePage />
        </MemoryRouter>,
      );

      expect(screen.getByText('Alur Pengambilan')).toBeDefined();
      expect(screen.getByText('Tidak perlu mengajukan klaim online.')).toBeDefined();

      expect(screen.getByText('1. Cari barang')).toBeDefined();
      expect(screen.getByText('2. Periksa pos penyimpanan')).toBeDefined();
      expect(screen.getByText('3. Datang ke pos')).toBeDefined();
      expect(screen.getByText('4. Verifikasi kepemilikan')).toBeDefined();
      expect(screen.getByText('5. Barang diserahkan')).toBeDefined();
    });
  });
});
