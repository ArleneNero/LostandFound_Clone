#!/usr/bin/env python3
"""Static contract fingerprint check. Does not test running API, Neon, Neon Auth or R2.

Usage from monorepo root:
  python apps/web/.agent-internal/tools/verify_backend_sync.py
For package creation/audit without root backend:
  python apps/web/.agent-internal/tools/verify_backend_sync.py --backend-contracts /path/to/.agent-internal/contracts
"""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument('--backend-contracts', type=Path, help='Explicit canonical backend .agent-internal/contracts directory')
    args = p.parse_args()
    script = Path(__file__).resolve()
    repo_root = script.parents[4]
    local = script.parents[1] / 'contracts'
    reference = args.backend_contracts if args.backend_contracts else repo_root / '.agent-internal' / 'contracts'
    manifest = json.loads((local / 'manifest.json').read_text(encoding='utf-8'))

    print('UBL LostnFound — frontend/backend contract snapshot check')
    print('Frontend snapshot:', local)
    print('Backend canonical:', reference)
    print('This checks files only; it does not test HTTP, database or storage.')
    mismatches = []
    for filename, expected in manifest['files'].items():
        target = local / filename
        if not target.exists():
            mismatches.append(f'FRONTEND_MISSING {filename}')
            continue
        got = sha256(target)
        if got != expected:
            mismatches.append(f'FRONTEND_MODIFIED {filename}: {got}')
        else:
            print('SNAPSHOT_MATCH', filename, got)
    if mismatches:
        print('\nMISMATCH: frontend snapshot is altered or missing.')
        for reason in mismatches: print('-', reason)
        return 1

    if not reference.is_dir():
        print('\nNOT_VERIFIABLE: backend canonical directory is not mounted. Stop before real API integration.')
        return 2
    for filename in manifest['files']:
        target = reference / filename
        if not target.exists():
            mismatches.append(f'BACKEND_MISSING {filename}')
            continue
        if sha256(target) != sha256(local / filename):
            mismatches.append(f'BACKEND_DRIFT {filename}: backend {sha256(target)} vs frontend {sha256(local / filename)}')
    if mismatches:
        print('\nMISMATCH: never silently edit frontend types or backend contract to disguise drift.')
        for reason in mismatches: print('-', reason)
        return 1

    try:
        import yaml
    except ImportError:
        print('\nHASH_MATCH, STRUCTURE_NOT_VERIFIED (PyYAML unavailable).')
        return 0

    schema = yaml.safe_load((local / 'openapi-v1.0.yaml').read_text(encoding='utf-8'))
    operations = sum(method in ('get','post','patch','put','delete')
                     for path in schema['paths'].values() for method in path)
    if operations != manifest['expected_endpoints']:
        print(f'FAIL: expected {manifest["expected_endpoints"]} endpoints, observed {operations}')
        return 1
    types = schema['components']['schemas']
    for name in ('ItemCreateRequest','ReceiveRequest'):
        x = types[name]['properties']['item_photo_upload_tokens']
        if x.get('minItems') != 1 or x.get('maxItems') != 1:
            print(f'FAIL: {name} photo tokens not exactly one.')
            return 1
    item_photos=types['FoundItemPublic']['properties']['photos']
    if item_photos.get('minItems') != 1 or item_photos.get('maxItems') != 1:
        print('FAIL: public item must have precisely one photo.')
        return 1
    print(f'\nMATCH: {operations} endpoints, exact snapshots match backend, one-item-photo rules match.')
    print('Runtime HTTP, security, provider, Figma visual and E2E tests: NOT RUN.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
