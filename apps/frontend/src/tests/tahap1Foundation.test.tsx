import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { PublicLayout } from '@/components/layouts/PublicLayout';

describe('Tahap 1 — Foundation, Landing & Login', () => {
  it('renders LandingPage with hero headline and role cards', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Barangmu hilang?')).toBeDefined();
    expect(screen.getByText('Masuk ke UBL LostnFound')).toBeDefined();
    expect(screen.getByText('Mahasiswa')).toBeDefined();
    expect(screen.getByText('Petugas')).toBeDefined();
    expect(screen.getByText('Mode Tamu')).toBeDefined();
  });

  it('renders LoginPage for Mahasiswa with form inputs and navigation', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Masuk sebagai Mahasiswa')).toBeDefined();
    expect(screen.getByText('Gunakan akun email kampus untuk melanjutkan.')).toBeDefined();
    expect(screen.getByText('Email Kampus / NIM')).toBeDefined();
    expect(screen.getByText('Kata Sandi')).toBeDefined();
    expect(screen.getByText('Masuk Sekarang')).toBeDefined();
    expect(screen.getByText('Pilih peran')).toBeDefined();
  });

  it('renders PublicLayout brand header', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PublicLayout />
      </MemoryRouter>
    );

    expect(screen.getAllByText('UBL LostnFound').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Temukan barangmu dengan mudah.').length).toBeGreaterThan(0);
  });
});
