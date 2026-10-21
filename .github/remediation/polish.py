"""Focused corrections discovered by actual Chromium screenshots, not new features."""
from pathlib import Path
import subprocess
import json
root = Path('apps/web')
def replace(relative, old, new):
    p = root / relative
    s = p.read_text()
    assert old in s, 'Expected reviewed source: ' + relative
    p.write_text(s.replace(old, new))
replace('e2e/frontend.spec.ts', "page.getByText('Barang Tidak Ditemukan')", "page.getByRole('heading', { name: 'Barang Tidak Ditemukan', exact: true })")
replace('src/styles/layout/inventory.css', ".lf-inventory-card [class*='rounded-full']", '.lf-inventory-card > .lf-status-badge')
replace('src/styles/layout/officer-shell.css', 'scrollbar-gutter: stable;', 'scrollbar-width: none;')
replace('src/styles/layout/officer-shell.css', '.lf-officer-mobile-header > a {', '.lf-officer-mobile-header > a:not(.lf-brand) {')
replace('src/styles/layout/foundation.css', 'button,\ninput,\nselect,\ntextarea {\n  font: inherit;\n}', '@layer base {\n  button, input, select, textarea { font: inherit; }\n}')
replace('src/styles/layout/public-shell.css', '.lf-public-content {', '.lf-public-content,\n.lf-public-page {')
p = root / 'src/styles/layout/public-shell.css'
p.write_text(p.read_text() + '\n.lf-public-page { display: flex; flex-direction: column; gap: 20px; }\n')
replace('src/components/ui/Badge.tsx', 'dot = true,', 'dot = false,')
replace('src/components/ui/Badge.tsx', 'inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full text-xs font-semibold select-none', 'lf-status-badge inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full text-xs font-normal whitespace-nowrap select-none')
replace('src/components/ui/Badge.tsx', 'bg-[var(--lf-success-soft)] text-[var(--lf-success)] border border-[rgba(15,151,61,0.2)]', 'bg-[var(--lf-success-soft)] text-[var(--lf-success)]')
replace('src/components/ui/Badge.tsx', 'bg-[var(--lf-soft)] text-[var(--lf-action)] border border-[rgba(11,94,215,0.2)]', 'bg-[var(--lf-canvas)] text-[var(--lf-muted)]')
# Account information comes from the mock session; logout must clear it, not only navigate.
p = root / 'src/pages/officer/OfficerAccountPage.tsx'
p.write_text('''import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { services } from '@/services/registry';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { useServiceVersion } from '@/hooks/useServiceVersion';
export function OfficerAccountPage() {
  const navigate = useNavigate();
  const version = useServiceVersion();
  const load = useCallback(() => services.auth.getCurrentUser(), []);
  const { data: user, loading, error } = useAsyncResource(load, version);
  const logout = async () => { await services.auth.logout(); navigate('/'); };
  return <div className="lf-stack" style={{ maxWidth: 560, margin: 'auto' }}>
    <div className="lf-page-intro"><h1 className="lf-title">Akun Petugas</h1>
      <p>Sesi simulasi frontend. Belum terhubung ke Clerk.</p></div>
    <section className="lf-surface lf-stack" style={{ padding: 24 }}>
      <UserRound size={32} aria-hidden="true" />
      {loading ? <p role="status">Memuat sesi...</p> : error ? <p role="alert">{error}</p> : <>
        <h2 className="lf-section-title">{user?.fullName ?? 'Tidak ada sesi'}</h2>
        <p>{user?.email}</p><p>Penugasan pos: {user?.assignedPostId ?? '-'}</p>
        <Button variant="secondary" leftIcon={<LogOut size={20} />} onClick={logout}>Keluar Panel</Button>
      </>}
    </section>
  </div>;
}
''')
# Browser geometry regression: child badge spans must never inherit a 140px dot width.
p = root / 'e2e/frontend.spec.ts'
s = p.read_text()
s += '''\ntest('F/A-F/C: corrected badge and Guest padding geometry', async ({ page }, info) => {
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
'''
p.write_text(s)
subprocess.run(['npx','prettier','--write','src','e2e'], cwd=root, check=True)
# Exact Figma renders are evidence only, never used as implementation assets.
refs = {
 'mobile-dashboard': ('373:2908','a73e4dbe-41fe-463e-9149-c5327276286f'),
 'desktop-dashboard': ('374:16601','df79cd4e-fa0b-4d39-b18d-4f22de65dcea'),
 'mobile-register': ('374:3241','a681449b-4026-41d0-9727-4d763fe27c78'),
 'desktop-register': ('374:16829','35f52427-3519-4fc3-8fd0-127b3855db5c'),
 'mobile-catalog': ('374:12577','2d6bcddf-560f-45b3-84e7-d64cf4efc7a9'),
 'desktop-catalog': ('374:18778','631202ce-72cc-4d1d-8e24-9f4d22883ed2'),
 'mobile-landing': ('374:12454','c21368e2-95e8-4c72-bba1-273e438ceeea'),
 'desktop-landing': ('374:18641','0df29e5b-c243-42ab-a316-df3ebda5df17'),
}
folder = Path('remediation-evidence/figma');folder.mkdir(parents=True,exist_ok=True)
results = []
for name, (node, asset) in refs.items():
    r = subprocess.run(['curl','--fail','--location','--silent','--show-error','--max-time','30',
         '-o',str(folder / (name + '.png')), 'https://www.figma.com/api/mcp/asset/' + asset + '.png'])
    results.append({'name':name,'node_id':node,'downloaded':r.returncode == 0})
(folder/'mapping.json').write_text(json.dumps(results,indent=2))
print('Screenshot-based polish and precise browser assertions prepared.')
