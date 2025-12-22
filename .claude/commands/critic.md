# Run Codebase Critics

Run LLM-based code review on staged changes.

## Usage

- `/critic` - Run all critics on staged changes
- `/critic accessibility` - Run only accessibility critic
- `/critic html` - Run only HTML critic
- `/critic session` - Run only session critic

## Steps

1. **Get staged diff:**
```bash
git diff --staged
```

2. **Check for changes:**
If no staged changes, warn the user:
```
No staged changes. Stage your changes with `git add` first.
```

3. **Run each critic:**

For each critic, read the critic file and analyze the staged diff against its rules.

**Critics to run:**
- `.critics/accessibility.critic.md` - Accessibility issues
- `.critics/html.critic.md` - HTML structure and semantics
- `.critics/session.critic.md` - Session hygiene (P0 assignment)

4. **Format results:**

```
## Critic Results

| Critic | Result | Severity | Issues |
|--------|--------|----------|--------|
| Accessibility | PASS | - | - |
| HTML | PASS | - | - |
| Session | PASS | - | - |

Ready to commit: Yes
```

## Notes

- Critics are defined in `.critics/*.critic.md`
- Each critic outputs JSON with pass/issues/severity
- Critical failures should block commit
