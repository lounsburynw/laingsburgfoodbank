# Start Session

Begin a development session on the Laingsburg Food Bank website.

## Step 1: Environment Check

Run these commands to establish context:

```bash
./init.sh
```

```bash
tail -20 claude-progress.txt
```

```bash
git log --oneline -5
```

## Step 2: Identify Next Work Item

```bash
python3 -c "
import json

with open('phase.json') as f:
    phase = json.load(f)

current_phase = phase['current_phase']
checklist_file = phase['active_checklist']

print('='*50)
print(f'PHASE: {current_phase.upper()}')
print(f'Checklist: {checklist_file}')
print('='*50)

with open(checklist_file) as f:
    checklist = json.load(f)

status_pending = 'not_implemented'
best = None
best_priority = 999
p0_items = []

category_order = checklist.get('category_order', [k for k in checklist.keys()])
skip_keys = ['version', 'phase', 'last_updated', 'category_order', 'description']

for category in category_order:
    if category in skip_keys or category not in checklist:
        continue
    items = checklist[category]
    if not isinstance(items, dict):
        continue
    for subcategory, subitems in items.items():
        if not isinstance(subitems, dict) or subcategory in ['description']:
            continue
        for item, info in subitems.items():
            if isinstance(info, dict) and info.get('status') == status_pending:
                priority = info.get('priority', 99)
                if priority == 0:
                    p0_items.append(item)
                if priority < best_priority:
                    best_priority = priority
                    best = {'item': item, 'category': category, 'subcategory': subcategory, 'priority': priority, 'info': info}

if len(p0_items) > 1:
    print(f'WARNING: {len(p0_items)} P0 items found (should be at most 1)')

if best:
    priority_label = {0: 'P0 (IMMEDIATE)', 1: 'P1', 2: 'P2', 3: 'P3'}.get(best['priority'], f'P{best[\"priority\"]}')
    print(f'NEXT: {best[\"item\"]}')
    print(f'Area: {best[\"category\"]} > {best[\"subcategory\"]}')
    print(f'Priority: {priority_label}')
    if 'description' in best['info']:
        print(f'Description: {best[\"info\"][\"description\"]}')
else:
    print('All items complete for this phase!')
"
```

## Step 3: Work Rules

1. **ONE ITEM** per session
2. **Read before edit** - understand existing code
3. **Test locally** - open in browser, check mobile
4. **Commit on success**

## Step 4: Session End

1. Update checklist status if item complete
2. Append summary to `claude-progress.txt`
3. Run `/commit` to commit changes
