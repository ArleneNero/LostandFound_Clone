import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { OfficerLayout } from '@/components/layouts/OfficerLayout';
import { StudentLayout } from '@/components/layouts/StudentLayout';

describe('Layout Smoke Tests (F/A.3)', () => {
  it('renders PublicLayout with brand and navigation links without crashing', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/beranda']}>
        <PublicLayout />
      </MemoryRouter>
    );

    expect(screen.getAllByText('UBL LostnFound').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cari Barang').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pos Pelayanan').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
    unmount();

    // Verify 00.01 Landing header minimal view
    render(
      <MemoryRouter initialEntries={['/']}>
        <PublicLayout />
      </MemoryRouter>
    );
    expect(screen.getAllByText('UBL LostnFound').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Temukan barangmu dengan mudah.').length).toBeGreaterThan(0);
  });

  it('renders OfficerLayout with sidebar and pos pengajaran info', () => {
    render(
      <MemoryRouter initialEntries={['/petugas/dashboard']}>
        <OfficerLayout />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Pos Pengajaran').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Inventaris').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Laporan').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Akun').length).toBeGreaterThan(0);
  });

  it('renders StudentLayout with student portal brand', () => {
    render(
      <MemoryRouter initialEntries={['/mahasiswa/beranda']}>
        <StudentLayout />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Portal Mahasiswa').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Beranda').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Lapor').length).toBeGreaterThan(0);
  });
});
