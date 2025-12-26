# Laingsburg Area Food Bank

A modern, accessible website for the Laingsburg Area Food Bank serving the Laingsburg, Michigan community since 1985.
       
## Features

- **Accessible First**: WCAG 2.1 AA compliant with keyboard navigation, screen reader support, and proper color contrast
- **Mobile Responsive**: Mobile-first design that works on all devices
- **Fast Loading**: Minimal dependencies, critical CSS inlined, optimized for performance
- **Easy Content Editing**: Decap CMS integration for non-technical content updates
- **Print Friendly**: Clean print styles for physical distribution

## Tech Stack

- **HTML5** - Semantic, accessible markup
- **CSS3** - Custom properties, mobile-first responsive design
- **Vanilla JavaScript** - Minimal JS for content loading
- **Decap CMS** - Git-based headless CMS for content management
- **GitHub Pages** - Free, reliable static hosting

## Getting Started

### Prerequisites

- Git
- A web browser
- (Optional) A local web server for development

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/laingsburgfoodbank.git
   cd laingsburgfoodbank
   ```

2. Open `src/index.html` in your browser, or use a local server:
   ```bash
   # Using Python
   cd src && python3 -m http.server 8000

   # Using Node.js
   npx serve src
   ```

3. Visit `http://localhost:8000` in your browser.

### Project Structure

```
laingsburgfoodbank/
├── src/                    # Source files
│   ├── index.html          # Main landing page
│   ├── css/
│   │   └── styles.css      # All styles (variables, reset, components)
│   ├── js/
│   │   └── content-loader.js  # Dynamic content from YAML files
│   ├── _data/              # Content data files (YAML)
│   │   ├── hours.yml       # Operating hours and location
│   │   ├── contact.yml     # Contact information
│   │   ├── menu.yml        # Food availability
│   │   └── needs.yml       # Current needs list
│   ├── admin/              # Decap CMS admin interface
│   ├── sitemap.xml         # Search engine sitemap
│   └── robots.txt          # Crawler directives
├── docs/                   # Documentation
│   └── CONTENT-EDITOR-GUIDE.md  # Guide for content editors
├── .claude/commands/       # Claude Code slash commands
├── .critics/               # Code review critics
├── CLAUDE.md               # AI assistant instructions
├── phase.json              # Current development phase
├── features.json           # Feature tracking checklist
└── polish.json             # Polish phase checklist
```

## Content Management

### For Content Editors

The website uses Decap CMS for easy content updates. See the [Content Editor Guide](docs/CONTENT-EDITOR-GUIDE.md) for detailed instructions.

**Quick edits via CMS:**
1. Go to `/admin/` on the live site
2. Log in with GitHub
3. Edit hours, menu, needs, or contact info
4. Save and publish

**Direct file editing:**
Edit YAML files in `src/_data/` directly via GitHub.

### Editable Content

| Content | File | CMS Collection |
|---------|------|----------------|
| Hours & Location | `src/_data/hours.yml` | Hours |
| Contact Info | `src/_data/contact.yml` | Contact |
| Food Menu | `src/_data/menu.yml` | Menu |
| Current Needs | `src/_data/needs.yml` | Needs |

## Development

### Claude Code Workflow

This project uses Claude Code for AI-assisted development. Available commands:

| Command | Description |
|---------|-------------|
| `/start` | Begin a development session |
| `/test` | Check HTML validity and links |
| `/critic` | Run code review on staged changes |
| `/commit` | Run critics, then commit if passing |
| `/deploy` | Push changes to production |
| `/nextsesh` | Prepare handoff notes for next session |

### Development Phases

Progress is tracked in JSON checklists:

- `features.json` - Foundation phase features
- `polish.json` - Polish phase (accessibility, performance, SEO)

Run `./init.sh` to check current phase and progress.

## Deployment

The site is hosted on GitHub Pages and deploys automatically when changes are pushed to the `main` branch.

### Manual Deployment

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

The site updates within 1-2 minutes at your GitHub Pages URL.

### Custom Domain Setup

1. Add a `CNAME` file to `src/` with your domain
2. Configure DNS with your domain registrar
3. Enable HTTPS in GitHub Pages settings

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## Accessibility

This site is designed to be accessible to all users:

- Semantic HTML with proper heading hierarchy
- ARIA landmarks and labels
- Keyboard navigable with visible focus states
- Skip link for keyboard users
- Color contrast meets WCAG AA standards
- Reduced motion support for vestibular disorders
- Screen reader tested

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run `/critic` to check for issues
5. Commit: `git commit -m "Add your feature"`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

## License

This project is for the Laingsburg Area Food Bank. All rights reserved.

## Contact

- **Phone**: (517) 651-5531
- **Email**: laingsburgumc@gmail.com
- **Facebook**: [Laingsburg Area Food Bank](https://www.facebook.com/laingsburgareafoodbank)
- **Address**: 210 Crum St, Laingsburg, MI 48848
