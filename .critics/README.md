# Codebase Critics

LLM-based code review prompts that catch issues before they're committed.

## Available Critics

| Critic | Purpose | Catches |
|--------|---------|---------|
| `accessibility.critic.md` | WCAG compliance | Missing alt text, contrast issues, keyboard nav |
| `html.critic.md` | HTML best practices | Invalid structure, missing meta tags, semantics |
| `session.critic.md` | Session hygiene | Missing P0, incomplete handoff |

## Usage

### Via /critic Command

```bash
# Run all critics on staged changes
/critic

# Run specific critic
/critic accessibility
```

### Example Output

```json
{
  "pass": false,
  "issues": [
    "Image missing alt attribute",
    "Button has no accessible name"
  ],
  "severity": "critical",
  "suggestions": [
    "Add alt='Description of image' to <img>",
    "Add aria-label or visible text to button"
  ]
}
```

## When to Run

- **Before commits** - Run `/critic` to catch issues early
- **After adding images** - Run accessibility critic
- **Session end** - Run session critic to ensure P0 is set

## Adding New Critics

1. Create `{name}.critic.md` in `.critics/`
2. Follow the template:
   - **Context** - What this enforces
   - **Check** - Specific things to verify
   - **Output** - JSON format
   - **Examples** - FAIL and PASS cases
3. Add to the table in this README
