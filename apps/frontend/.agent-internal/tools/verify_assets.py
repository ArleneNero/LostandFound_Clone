#!/usr/bin/env python3
"""Read-only integrity verifier for six exact user-provided static assets."""
import hashlib, json, sys
from pathlib import Path
D=Path(__file__).resolve().parents[1]
WEB=D.parent
M=json.loads((D/'assets-manifest.json').read_text(encoding='utf-8'))
errors=[]
for a in M['files']:
 p=WEB/'public'/a['relative_public_path']
 if not p.is_file(): errors.append('MISSING '+str(p)); continue
 bs=p.read_bytes(); sha=hashlib.sha256(bs).hexdigest()
 if sha!=a['sha256'] or len(bs)!=a['bytes']:errors.append('MISMATCH '+str(p))
 else: print('MATCH',a['original_filename'],len(bs))
if errors:
 print('\n'.join(errors)); sys.exit(1)
print('PASS: all six provided assets byte-for-byte unchanged.')
