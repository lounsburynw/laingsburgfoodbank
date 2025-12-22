#!/bin/bash
cd /Users/nicolaslounsbury/projects/laingsburgfoodbank

echo "=========================================="
echo "LAINGSBURG FOOD BANK - ENVIRONMENT CHECK"
echo "=========================================="

# Check if index.html exists
echo ""
echo "Checking project files..."
if [ -f "src/index.html" ]; then
    echo "  index.html: Found"
else
    echo "  index.html: Not found (create with project_structure)"
fi

# Validate HTML if it exists
if [ -f "src/index.html" ]; then
    echo ""
    echo "HTML structure check..."
    if grep -q "<!DOCTYPE html>" src/index.html; then
        echo "  DOCTYPE: Valid"
    else
        echo "  DOCTYPE: Missing!"
    fi
    if grep -q "<html lang=" src/index.html; then
        echo "  Language: Set"
    else
        echo "  Language: Missing lang attribute"
    fi
fi

# Show current phase
echo ""
echo "=========================================="
echo "CURRENT DEVELOPMENT PHASE"
echo "=========================================="
python3 -c "
import json
import os

with open('phase.json') as f:
    phase = json.load(f)

current = phase['current_phase']
checklist = phase['active_checklist']

print(f'Phase: {current.upper()}')
print(f'Checklist: {checklist}')

# Verify checklist exists
if os.path.exists(checklist):
    print(f'Status: Checklist found')
else:
    print(f'Status: WARNING - {checklist} not found!')

# Count items
if os.path.exists(checklist):
    with open(checklist) as f:
        cl = json.load(f)

    done_val = 'implemented'
    pending_val = 'not_implemented'

    def count_items(obj):
        done, pending = 0, 0
        if isinstance(obj, dict):
            status = obj.get('status')
            if status == done_val:
                done += 1
            elif status == pending_val:
                pending += 1
            for val in obj.values():
                sub_done, sub_pending = count_items(val)
                done += sub_done
                pending += sub_pending
        return done, pending

    done, pending = count_items(cl)
    total = done + pending
    if total > 0:
        print(f'Progress: {done}/{total} items implemented ({100*done//total}%)')
        if pending > 0:
            print(f'Remaining: {pending} items not_implemented')

    # Check for P0 items
    p0_items = []
    skip_keys = ['version', 'phase', 'last_updated', 'category_order', 'description']
    for cat_key, cat_val in cl.items():
        if cat_key in skip_keys or not isinstance(cat_val, dict):
            continue
        for sub_key, sub_val in cat_val.items():
            if not isinstance(sub_val, dict) or sub_key in skip_keys:
                continue
            for item_key, item_val in sub_val.items():
                if isinstance(item_val, dict) and item_val.get('status') == pending_val and item_val.get('priority') == 0:
                    p0_items.append(item_key)

    if len(p0_items) > 1:
        print(f'WARNING: {len(p0_items)} P0 items (should be at most 1)')
    elif len(p0_items) == 1:
        print(f'P0 (IMMEDIATE): {p0_items[0]}')
"
echo "=========================================="
