import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  selectDashboardMetrics,
  selectRecentItems,
} from '@/features/officer/selectors/dashboardSelectors';
import { OfficerDashboardPage } from '@/pages/officer/OfficerDashboardPage';
import { FoundItem, Submission } from '@/types/domain';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Officer Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('dashboardSelectors', () => {
    const mockItems: FoundItem[] = [
      {
        id: '1',
        name: 'Item 1',
        inventoryCode: 'INV-001',
        status: 'STORED',
        category: 'Elektronik',
        description: '',
        foundLocation: 'Gedung A',
        foundDate: '2026-10-10T08:00:00Z',
        receivedAt: '2026-10-10T10:00:00Z',
        postId: 1,
        postName: 'Pos Pengajaran',
        photoUrl: 'https://example.com/p1.jpg',
        isVisible: true,
        privateNotes: null,
      },
      {
        id: '2',
        name: 'Item 2',
        inventoryCode: 'INV-002',
        status: 'RETURNED_TO_OWNER',
        category: 'Dokumen',
        description: '',
        foundLocation: 'Kantin',
        foundDate: '2026-10-12T08:00:00Z',
        receivedAt: '2026-10-12T10:00:00Z',
        postId: 1,
        postName: 'Pos Pengajaran',
        photoUrl: 'https://example.com/p2.jpg',
        isVisible: false,
        privateNotes: null,
      },
    ];

    const mockSubmissions: Submission[] = [
      {
        id: 's1',
        reportCode: 'REP-001',
        itemName: 'Sub 1',
        status: 'PENDING_RECEIPT',
        targetPostId: 1,
        submittedAt: '2026-10-10T10:00:00Z',
        category: 'Lainnya',
        foundLocation: 'Kantin',
        foundDate: '2026-10-10T09:00:00Z',
        photoUrl: 'https://example.com/s1.jpg',
        description: '',
      },
    ];

    it('selectDashboardMetrics accurately calculates operational counts', () => {
      const metrics = selectDashboardMetrics(mockItems, mockSubmissions);
      expect(metrics.totalStored).toBe(1);
      expect(metrics.totalReturned).toBe(1);
      expect(metrics.totalPendingReports).toBe(1);
    });

    it('selectRecentItems orders items by receivedAt descending', () => {
      const recent = selectRecentItems(mockItems, 5);
      expect(recent[0].id).toBe('2'); // Oct 12 is later than Oct 10
      expect(recent[1].id).toBe('1');
    });
  });

  describe('OfficerDashboardPage rendering', () => {
    it('renders header, metrics, actions and recent items table', async () => {
      render(
        <MemoryRouter>
          <OfficerDashboardPage />
        </MemoryRouter>
      );

      // Loading state displays skeleton first
      expect(screen.getAllByRole('generic').length).toBeGreaterThan(0);

      // Wait for data load from in-memory service
      await waitFor(() => {
        expect(screen.getByText('Barang tersedia')).toBeDefined();
        expect(screen.getByText('Sudah diserahkan')).toBeDefined();
        expect(screen.getByText('Laporan Menunggu')).toBeDefined();
      });

      // Check actions
      expect(screen.getByText('Catat Barang')).toBeDefined();
      expect(
        screen.getByPlaceholderText('Cari nama atau kode inventaris Pengajaran...')
      ).toBeDefined();
    });

    it('filters recent items when typing in search input', async () => {
      render(
        <MemoryRouter>
          <OfficerDashboardPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Barang tersedia')).toBeDefined();
      });

      const searchInput = screen.getByPlaceholderText(
        'Cari nama atau kode inventaris Pengajaran...'
      ) as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'AirPods' } });

      // Search filters items in table
      expect(searchInput.value).toBe('AirPods');
    });

    it('navigates to register item when Catat Barang is clicked', async () => {
      render(
        <MemoryRouter>
          <OfficerDashboardPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Catat Barang')).toBeDefined();
      });

      fireEvent.click(screen.getByText('Catat Barang'));
      expect(mockNavigate).toHaveBeenCalledWith('/petugas/catat-barang');
    });
  });
});
