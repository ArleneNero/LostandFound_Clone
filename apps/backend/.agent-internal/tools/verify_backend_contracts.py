#!/usr/bin/env python3
"""Read-only verification of backend canonical snapshots and task coverage."""
from pathlib import Path
import hashlib, json, re, sys
ROOT=Path(__file__).resolve().parents[1]
M=json.loads((ROOT/'contracts/manifest.json').read_text())
failed=[]
for fname,expected in M['files'].items():
 p=ROOT/'contracts'/fname
 actual=hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else 'MISSING'
 if actual!=expected: failed.append(f'{fname}: expected={expected}, found={actual}')
reg=json.loads((ROOT/'task-registry.json').read_text())
tasks=reg['tasks']; mids={x['id'] for x in reg['milestones']}
if len(tasks)!=95 or len(set(t['task_id'] for t in tasks))!=95: failed.append('registry count or duplicate task ID')
if len(mids)!=13:failed.append('milestone count !=13')
if any(t['major'] not in mids or t['status'] not in {'PLANNED','IN_PROGRESS','BLOCKED','COMPLETED'} for t in tasks):failed.append('registry major/status invalid')
if len(re.findall(r'(?m)^Table\s+\w+', (ROOT/'contracts/erd-v6.2.dbml').read_text()))!=8:failed.append('ERD table count !=8')
try:
 import yaml
 spec=yaml.safe_load((ROOT/'contracts/openapi-v1.0.yaml').read_text())
 count=sum(1 for p,ms in spec['paths'].items() for m in ms if m in {'get','post','patch','delete','put'})
 if count!=22: failed.append('OpenAPI operations count !=22')
 if '/officer/inventory' not in spec['paths'] or 'get' not in spec['paths']['/officer/inventory']:failed.append('missing canonical officer inventory GET')
 if 'get' in spec['paths'].get('/officer/items',{}):failed.append('invalid officer items GET route')
 for name in ('ItemCreateRequest','ReceiveRequest'):
  p=spec['components']['schemas'][name]['properties']['item_photo_upload_tokens']
  if (p.get('minItems'),p.get('maxItems'))!=(1,1):failed.append(name+': photo cardinality drift')
except ImportError:
 print('WARN: PyYAML unavailable; YAML parse skipped. Hash + static checks still performed.')
except Exception as e: failed.append('OpenAPI read/parsing: '+str(e))
print('Backend contract/task verification:', 'PASS' if not failed else 'FAIL')
print('Tasks:',len(tasks),'Milestones:',len(mids),'Contract SHA files:',len(M['files']))
for error in failed:print('FAIL:',error)
sys.exit(1 if failed else 0)
