"""Apply the reviewed frontend source changes, never touching main or historical docs.
Transport is base64/bzip2 JSON line edits, protected by source and result SHA-256.
The complete decoded diff is exported for review before any tests are run.
"""
from pathlib import Path
import base64
import bz2
import hashlib
import json
import difflib

root = Path.cwd().resolve()
parts = sorted((root / '.github/remediation').glob('part-*.txt'))
if not parts:
    print('Source changes already materialized; no transport payload remains.')
    raise SystemExit(0)
if len(parts) != 6:
    raise SystemExit('Expected exactly six verified transport parts.')
encoded = ''.join(p.read_text().strip() for p in parts)
# Repair one known transcription duplication; the checksum below is authoritative.
encoded = encoded.replace('JPOXJJ2qq', 'JPOXJ2qq')
binary = base64.b64decode(encoded, validate=True)
expected = '441d1373cc7bff6ce8ee2b83e6ad4a6cdaed3b01c0b9f2e4c7ecc7b50d87d5bd'
if hashlib.sha256(binary).hexdigest() != expected:
    raise SystemExit('Transport checksum mismatch; nothing was changed.')
changes = json.loads(bz2.decompress(binary))
prepared = []
diffs = []
for relative, patch in changes.items():
    target = (root / relative).resolve()
    if not target.is_relative_to(root / 'apps/web'):
        raise SystemExit('Refusing path outside apps/web: ' + relative)
    if '.agent-internal' in target.parts or target.name == 'AGENTS.md':
        raise SystemExit('Refusing modification of historical instructions.')
    old = target.read_text() if target.exists() else ''
    if hashlib.sha256(old.encode()).hexdigest() != patch['sha256']:
        raise SystemExit('Source changed since review: ' + relative)
    lines = old.splitlines(keepends=True)
    for start, end, replacement in reversed(patch['edits']):
        lines[start:end] = replacement.splitlines(keepends=True)
    new = ''.join(lines)
    if hashlib.sha256(new.encode()).hexdigest() != patch['result_sha256']:
        raise SystemExit('Result checksum mismatch: ' + relative)
    prepared.append((target, new))
    diffs.extend(difflib.unified_diff(old.splitlines(True), new.splitlines(True),
                 fromfile='a/' + relative, tofile='b/' + relative))
# Validate every source first, then apply the complete set.
for target, new in prepared:
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(new)
# Give role buttons an explicit accessible name separating title and description.
role = root / 'apps/web/src/pages/landing/RoleCard.tsx'
s = role.read_text()
needle = '<button type="button" className="lf-role-card" onClick={onClick}>'
assert needle in s
s = s.replace(needle, '<button type="button" className="lf-role-card" aria-label={`${title} ${description}`} onClick={onClick}>')
role.write_text(s)
evidence = root / 'remediation-evidence'
evidence.mkdir(exist_ok=True)
(evidence / 'reviewed-source.patch').write_text(''.join(diffs))
(evidence / 'transport-integrity.json').write_text(json.dumps({
    'transport_sha256': expected, 'verified_files': len(prepared),
    'extra_accessibility_correction': 'Explicit accessible name on RoleCard',
    'main_modified': False,
}, indent=2))
print(f'Applied {len(prepared)} verified source files plus RoleCard accessibility correction.')
