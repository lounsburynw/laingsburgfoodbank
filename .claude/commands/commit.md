# Commit Changes

Commit staged changes after running codebase critics.

## Steps

1. **Check for staged changes:**
```bash
git diff --staged --stat
```

If no staged changes, prompt user to stage files first.

2. **Run critics on staged changes:**

Run `/critic` to check for issues. This analyzes the staged diff against:
- `.critics/accessibility.critic.md` - Accessibility issues
- `.critics/html.critic.md` - HTML best practices
- `.critics/session.critic.md` - Session hygiene

3. **Handle critic results:**

- If any critic returns **FAIL** with severity "critical": **STOP**. Show the issues and ask user how to proceed.
- If warnings only: Proceed with commit but note the warnings.
- If all pass: Proceed with commit.

4. **Generate commit message:**

Analyze the staged changes and create a concise commit message:
- First line: `Session N: brief_description`
- Body: What changed and why (if non-trivial)

5. **Commit:**
```bash
git commit -m "Session N: description"
```

6. **Verify:**
```bash
git status
```
