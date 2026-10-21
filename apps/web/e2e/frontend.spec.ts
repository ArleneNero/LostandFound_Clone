import { test, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';
const photo = path.resolve('public/assets/items/airpods-pro.png');
test('F/A-F/C: all implemented routes render without overflow, errors or broken images', async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const routes: [string, string][] = [
    ['dashboard', '/petugas/dashboard'],
    ['inventory', '/petugas/inventaris'],
    ['internal-detail', '/petugas/inventaris/item-uuid-001'],
    ['register', '/petugas/catat-barang'],
    ['reports', '/petugas/laporan'],
    ['report-detail', '/petugas/laporan/sub-uuid-001'],
    ['landing', '/'],
    ['home', '/beranda'],
    ['catalog', '/barang'],
    ['detail', '/barang/item-uuid-001'],
    ['posts', '/pos'],
    ['post-detail', '/pos/1'],
    ['guide', '/panduan'],
    ['account', '/petugas/akun'],
  ];
  fs.mkdirSync('evidence/after', { recursive: true });
  for (const [name, route] of routes) {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      route,
    ).toBe(true);
    const broken = await page
      .locator('img')
      .evaluateAll((images) =>
        images
          .filter(
            (img) =>
              (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth === 0,
          )
          .map((img) => img.getAttribute('src')),
      );
    expect(broken, route).toEqual([]);
    await page.screenshot({
      path: `evidence/after/${info.project.name}-${name}.png`,
      fullPage: false,
    });
  }
  expect(errors).toEqual([]);
});
test('F/B: selected photo survives creation and Guest navigation', async ({ page }) => {
  await page.goto('/petugas/catat-barang');
  await page.locator('input[type=file]').setInputFiles(photo);
  await page.getByLabel('Nama barang', { exact: false }).fill('Jam Foto Persisten');
  await page.getByLabel('Kategori', { exact: false }).selectOption('Elektronik');
  await page.getByLabel('Deskripsi publik', { exact: false }).fill('Biru dan hitam.');
  await page.locator('#physicallyReceived').check();
  await page.getByRole('button', { name: 'Konfirmasi & Simpan Barang' }).click();
  await expect(page.getByText('Barang berhasil dicatat')).toBeVisible();
  const saved = page.locator('img[alt="Jam Foto Persisten"]');
  await expect(saved).toHaveAttribute('src', /^blob:/);
  await page.getByRole('button', { name: 'Lihat di Katalog' }).click();
  await page.getByRole('button', { name: 'Lihat Jam Foto Persisten' }).click();
  await expect(page.locator('h1')).toHaveText('Jam Foto Persisten');
  await expect
    .poll(() =>
      page
        .locator('img[alt="Jam Foto Persisten"]')
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
});
test('F/C: pagination never renders more than ten cards, filters reset page', async ({ page }) => {
  await page.goto('/barang');
  await page.evaluate(async () => {
    const { mockStore } = await import(/* @vite-ignore */ '/src/' + 'data/mockStore.ts');
    const state = mockStore.getState();
    const original = state.items.find((i) => i.status === 'STORED' && i.is_visible)!;
    state.items = Array.from({ length: 21 }, (_, i) => ({
      ...structuredClone(original),
      item_id: `test-${i}`,
      item_name: `Barang ${String(i).padStart(2, '0')}`,
    }));
    mockStore.publish();
  });
  await expect(page.getByTestId('catalog-card')).toHaveCount(10);
  await page.getByRole('button', { name: 'Berikutnya' }).click();
  await expect(page.getByTestId('catalog-card')).toHaveCount(10);
  await page.getByRole('button', { name: 'Berikutnya' }).click();
  await expect(page.getByTestId('catalog-card')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Berikutnya' })).toBeDisabled();
  await page.getByPlaceholder('Cari nama barang...').fill('Barang 00');
  await expect(page.getByTestId('catalog-card')).toHaveCount(1);
  await expect(page.getByText('Halaman 1 dari 1')).toBeVisible();
});
test('F/B: unauthorized item direct URL is denied and public fields stay private', async ({
  page,
}) => {
  await page.goto('/petugas/inventaris/item-uuid-002');
  await expect(
    page.getByRole('heading', { name: 'Barang Tidak Ditemukan', exact: true }),
  ).toBeVisible();
  await page.goto('/barang/item-uuid-001');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByText(/Plat nomor B 3456 SAA/)).toHaveCount(0);
});
test('F/B: reception requires a new photo, records received item and history', async ({ page }) => {
  await page.goto('/petugas/laporan/sub-uuid-001');
  await page.getByRole('button', { name: 'Lanjut Konfirmasi Fisik' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.locator('#receiveCheck').check();
  await expect(dialog.getByRole('button', { name: 'Konfirmasi Penerimaan' })).toBeDisabled();
  await dialog.locator('input[type=file]').setInputFiles(photo);
  await dialog.getByRole('button', { name: 'Konfirmasi Penerimaan' }).click();
  await expect(page.getByText('Barang Fisik Telah Diterima')).toBeVisible();
  await expect(page.getByText('RECEIVED', { exact: true })).toBeVisible();
});
test('F/B: modal keyboard and verified return', async ({ page }) => {
  await page.goto('/petugas/inventaris/item-uuid-001');
  await page.getByRole('button', { name: 'Proses Serah Terima' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await page.getByRole('button', { name: 'Proses Serah Terima' }).click();
  await dialog.getByLabel('Nama Lengkap Penerima').fill('Penerima Demo');
  await dialog.getByLabel('Ringkasan Verifikasi').fill('Ciri fisik cocok.');
  await dialog.locator('#verifyCheck').check();
  await dialog.getByRole('button', { name: 'Konfirmasi Serah Terima' }).click();
  await expect(page.getByText('Barang telah diserahkan kepada pemilik sah.')).toBeVisible();
  await page.getByRole('link', { name: 'UBL LostnFound, halaman awal' }).first().click();
  await page.goto('/barang/item-uuid-001');
  // A hard reload intentionally resets in-memory fixtures; persistence is not claimed.
});
test('F/A visual geometry at agreed viewport', async ({ page }, info) => {
  await page.goto('/petugas/dashboard');
  await expect(page.locator('h1')).toBeVisible();
  if (info.project.name === 'mobile') {
    expect((await page.locator('.lf-officer-mobile-header').boundingBox())?.height).toBe(86);
    expect((await page.locator('.lf-officer-bottom-nav').boundingBox())?.height).toBe(72);
  } else {
    expect((await page.locator('.lf-officer-sidebar').boundingBox())?.width).toBe(244);
    expect((await page.locator('.lf-officer-topbar').boundingBox())?.height).toBe(74);
  }
});

test('F/A-F/C: corrected badge and Guest padding geometry', async ({ page }, info) => {
  await page.goto('/petugas/dashboard');
  await expect(page.locator('.lf-inventory-card').first()).toBeAttached();
  if (info.project.name === 'mobile') {
    const card = await page.locator('.lf-inventory-card').first().boundingBox();
    expect(card?.width).toBe(350);
    const badge = await page.locator('.lf-inventory-card > .lf-status-badge').first().boundingBox();
    expect(badge?.width).toBe(140);
    const brand = await page.locator('.lf-officer-mobile-header .lf-brand').boundingBox();
    expect(brand?.x).toBe(20);
  }
  await page.goto('/beranda');
  const bounds = await page.locator('h1').boundingBox();
  expect(bounds?.x).toBeGreaterThanOrEqual(20);
});

test('F/B: account logout clears the simulated session', async ({ page }) => {
  await page.goto('/petugas/akun');
  await expect(page.getByRole('heading', { name: 'Akun Petugas', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Keluar Panel' }).click();
  await expect(page).toHaveURL('/');
  const cleared = await page.evaluate(async () => {
    const { mockStore } = await import('/src/data/mockStore.ts');
    return mockStore.getState().currentUser === null;
  });
  expect(cleared).toBe(true);
});
