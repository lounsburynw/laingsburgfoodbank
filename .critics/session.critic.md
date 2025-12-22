# Session Critic

Review session hygiene and handoff completeness.

## Context

Each session should complete cleanly with proper tracking and handoff to the next session.

## Check

When reviewing at session end:

1. **P0 Assignment**
   - Exactly ONE P0 item in `features.json` for pending work
   - P0 is a pending item (not already implemented)

2. **Progress Tracking**
   - `claude-progress.txt` updated with session summary
   - Completed items marked as `implemented` in checklist

3. **Handoff Quality** (if `/nextsesh` was run)
   - `docs/next_session_prompt.md` exists
   - Contains clear description of next item
   - Includes relevant context

## Output

Respond with JSON:
```json
{
  "pass": boolean,
  "issues": ["list of session hygiene issues"],
  "severity": "critical" | "warning" | "info",
  "suggestions": ["how to fix each issue"]
}
```

## Examples

### FAIL - No P0 Set
```json
// features.json has no priority: 0 items for pending work
```
Issue: No P0 item set for next session

### FAIL - Multiple P0 Items
```json
// features.json has 3 items with priority: 0
```
Issue: Multiple P0 items (should be exactly 1)

### PASS - Clean Session
- Exactly one P0 item in features.json
- claude-progress.txt updated
- Completed work marked as implemented
