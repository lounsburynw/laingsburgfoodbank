# Prepare Next Session Context

Create a handoff document for the next session.

## Prerequisites

1. A P0 item must be set in `features.json`
2. Current work should be committed

## Steps

1. **Verify P0 is set:**
```bash
python3 -c "
import json
with open('features.json') as f:
    cl = json.load(f)

p0_items = []
skip_keys = ['version', 'phase', 'last_updated', 'category_order', 'description']
for cat_key, cat_val in cl.items():
    if cat_key in skip_keys or not isinstance(cat_val, dict):
        continue
    for sub_key, sub_val in cat_val.items():
        if not isinstance(sub_val, dict) or sub_key in skip_keys:
            continue
        for item_key, item_val in sub_val.items():
            if isinstance(item_val, dict) and item_val.get('status') == 'not_implemented' and item_val.get('priority') == 0:
                p0_items.append(item_key)

if len(p0_items) == 0:
    print('ERROR: No P0 item set. Set a P0 before running /nextsesh')
elif len(p0_items) > 1:
    print(f'WARNING: {len(p0_items)} P0 items. Should be exactly 1.')
else:
    print(f'P0: {p0_items[0]}')
"
```

2. **Create handoff document:**

Write to `docs/next_session_prompt.md`:
- What was accomplished this session
- The P0 item for next session
- Any context or notes for the next session
- Suggested approach

3. **Example format:**

```markdown
# Next Session Context

## Previous Session Summary
- Completed: [item name]
- Changes: [brief description]

## Next Item (P0)
**Item**: [item name]
**Category**: [category > subcategory]

## Context
[Any relevant notes, decisions made, things to watch out for]

## Suggested Approach
1. [Step 1]
2. [Step 2]
```
