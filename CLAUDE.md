# CLAUDE.md

**Laingsburg Area Food Bank** - Website for a local food bank serving the Laingsburg, Michigan community.

## Quick Start

```bash
./init.sh                    # Verify environment + current phase
cat phase.json               # Current development phase
cat claude-progress.txt      # Where we are
```

## Project Overview

A modern, accessible website for the Laingsburg Area Food Bank featuring:

- **Landing Page**: Critical information, hours, location
- **Donations**: Online giving, item wishlists, corporate partnerships
- **Volunteers**: Signup, scheduling, role descriptions
- **Food Menu**: What's currently available for distribution
- **Needs Board**: Current needs and wants of the food bank
- **Community**: Social media links, newsletter signup, success stories

## Development Phases

Development follows a phased approach, tracked in `phase.json`:

| Phase | Checklist | Focus |
|-------|-----------|-------|
| **foundation** | `features.json` | Core site structure, landing page (ACTIVE) |
| **content** | `content.json` | Real content, images, copy |
| **features** | `features.json` | Donations, volunteers, interactive features |
| **polish** | `polish.json` | Accessibility, SEO, performance |

Check current phase: `python3 -c "import json; print(json.load(open('phase.json'))['current_phase'])"`

### Priority Levels

| Priority | Meaning | Rule |
|----------|---------|------|
| **P0** | Immediate/blocking | **At most ONE P0 at a time** |
| **P1** | High priority | Current sprint work |
| **P2** | Normal priority | Planned work |
| **P3** | Low priority | Nice to have |

## Project Structure

```
phase.json                  # Current development phase
features.json               # Feature checklist
claude-progress.txt         # Session state (append-only)
init.sh                     # Verification script
src/                        # Source code
  index.html                # Landing page
  css/                      # Stylesheets
  js/                       # JavaScript
  assets/                   # Images, fonts
docs/                       # Documentation
  content/                  # Content drafts
.critics/                   # Code review prompts
.claude/commands/           # Slash commands
```

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (simple, accessible)
- **Hosting**: GitHub Pages (free, reliable)
- **Forms**: Formspree or similar (donations, contact)
- **No build step**: Keep it simple for maintainability

## Session Protocol

1. Run `/start` - environment check, phase info, next work item
2. Work on ONE item per session
3. Update checklist status when items change
4. Append to `claude-progress.txt` before ending
5. Run `/commit` - runs critics, then commits if they pass

### Slash Commands

| Command | Purpose |
|---------|---------|
| `/start` | Begin session, find next item |
| `/test` | Check HTML validity, links |
| `/critic` | Run codebase critics on staged changes |
| `/commit` | Run critics, then commit |
| `/nextsesh` | Prepare handoff notes |

## Design Principles

1. **Accessible First**: WCAG 2.1 AA compliance
2. **Mobile First**: Most visitors on phones
3. **Fast Loading**: Minimal dependencies, optimized images
4. **Easy to Update**: Non-technical person should be able to edit content
5. **Local Focus**: Serve the Laingsburg community specifically

## Content Sources

- Existing page: https://www.laingsburg.us/laingsburg-area-food-bank/
- Food bank staff for current info
- Community for testimonials

## Constraints

- No budget for paid services (use free tiers)
- Must be maintainable by non-developers
- Accessibility is non-negotiable
- Must work on older devices/browsers
