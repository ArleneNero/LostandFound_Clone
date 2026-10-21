import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { OfficerReportsPage } from '@/pages/officer/OfficerReportsPage';
import { OfficerRegisterItemPage } from '@/pages/officer/OfficerRegisterItemPage';
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

describe('Officer Item Registration Submilestone (F/B.3)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.reset();
    global.URL.createObjectURL = vi.fn(() => 'mock-blob://photo.png');
    global.URL.revokeObjectURL = vi.fn();
  });

  describe('F/B.3.0 Alur Pemilihan Laporan', () => {
    it('renders two distinct flow options without floating buttons', () => {
      render(
        <MemoryRouter>
          <OfficerReportsPage />
        </MemoryRouter>
      );

      expect(screen.getByText('Pilih Jenis Laporan')).toBeDefined();
      expect(screen.getByText('Catat Barang oleh Petugas')).toBeDefined();
      expect(screen.getByText('Laporan dari Mahasiswa')).toBeDefined();
    });

    it('navigates to catat-barang when Catat Barang card is clicked', () => {
      render(
        <MemoryRouter>
          <OfficerReportsPage />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText('Catat Barang oleh Petugas'));
      expect(mockNavigate).toHaveBeenCalledWith('/petugas/catat-barang');
    });
  });

  describe('F/B.3.1 - F/B.3.5 Form Catat Barang & Atomic Create', () => {
    it('validates mandatory photo and fields before submitting', async () => {
      render(
        <MemoryRouter>
          <OfficerRegisterItemPage />
        </MemoryRouter>
      );

      const submitBtn = screen.getByRole('button', { name: /Konfirmasi & Simpan Barang/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText('Wajib unggah 1 foto barang.')).toBeDefined();
        expect(screen.getByText('Nama barang wajib diisi.')).toBeDefined();
        expect(screen.getByText('Pilih kategori barang.')).toBeDefined();
        expect(screen.getByText('Deskripsi publik wajib diisi.')).toBeDefined();
      });
    });

    it('successfully creates item atomically and displays 02.03 success screen', async () => {
      render(
        <MemoryRouter>
          <OfficerRegisterItemPage />
        </MemoryRouter>
      );

      // 1. Upload mock photo
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['dummy content'], 'item.jpg', { type: 'image/jpeg' });
      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByText('Foto contoh dipilih.')).toBeDefined();
      });

      // 2. Fill required text fields
      fireEvent.change(screen.getByPlaceholderText(/Contoh: AirPods Pro/i), {
        target: { value: 'Jam Tangan Casio' },
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'Aksesoris' },
      });
      fireEvent.change(screen.getByPlaceholderText(/Deskripsi umum warna/i), {
        target: { value: 'Jam tangan strap hitam digital' },
      });

      // 3. Check physical confirmation checkbox
      const checkbox = document.getElementById('physicallyReceived') as HTMLInputElement;
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);

      // 4. Submit form
      const submitBtn = screen.getByRole('button', { name: /Konfirmasi & Simpan Barang/i });
      fireEvent.click(submitBtn);

      // 5. Verify success screen (Figma 02.03)
      await waitFor(() => {
        expect(screen.getByText('Barang berhasil dicatat')).toBeDefined();
        expect(screen.getByText('Jam Tangan Casio')).toBeDefined();
        expect(screen.getByText('Catat Barang Lagi')).toBeDefined();
      });

      // 6. Verify item exists in store with STORED status
      const officerItems = await services.items.getOfficerItems();
      const saved = officerItems.items.find((i) => i.name === 'Jam Tangan Casio');
      expect(saved).toBeDefined();
      expect(saved?.status).toBe('STORED');
      expect(saved?.isVisible).toBe(true);
    });
  });
});
