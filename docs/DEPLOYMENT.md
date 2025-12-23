# Deployment Guide

This guide covers deploying the Laingsburg Area Food Bank website to GitHub Pages.

## Overview

The site is a static website hosted on GitHub Pages. When you push changes to the `main` branch, GitHub automatically builds and deploys the site within 1-2 minutes.

## Initial GitHub Pages Setup

### 1. Create GitHub Repository

If not already done:

```bash
git remote add origin https://github.com/yourusername/laingsburgfoodbank.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages** (in left sidebar)
3. Under "Source", select:
   - **Branch**: `main`
   - **Folder**: `/src` (if available) or `/ (root)`
4. Click **Save**

### 3. Wait for Deployment

- GitHub will build your site (usually 1-2 minutes)
- Your site will be available at: `https://yourusername.github.io/laingsburgfoodbank/`

## Custom Domain Setup

To use a custom domain like `laingsburgfoodbank.org`:

### 1. Create CNAME File

Create `src/CNAME` with your domain:

```
laingsburgfoodbank.org
```

### 2. Configure DNS

Add these DNS records with your domain registrar:

**For apex domain (laingsburgfoodbank.org):**

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**For www subdomain:**

| Type | Name | Value |
|------|------|-------|
| CNAME | www | yourusername.github.io |

### 3. Enable HTTPS

1. Go to **Settings** > **Pages**
2. Check **Enforce HTTPS**
3. Wait for certificate provisioning (can take up to 24 hours)

### 4. Verify Setup

- Visit your domain
- Check for HTTPS lock icon
- Test both `www` and non-www versions

## Deployment Workflow

### Standard Deployment

```bash
# 1. Make your changes
# 2. Stage and commit
git add .
git commit -m "Description of changes"

# 3. Push to main (triggers deployment)
git push origin main
```

### Using Claude Code

```bash
# Run the deploy command
/deploy
```

This command:
1. Shows current git status
2. Pushes to origin main
3. Confirms deployment triggered

### Verify Deployment

After pushing:

1. Go to **Actions** tab on GitHub
2. Watch the "pages build and deployment" workflow
3. Green checkmark = successful deployment
4. Visit your site to confirm changes

## Rollback

If something goes wrong:

```bash
# View recent commits
git log --oneline -10

# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit (caution: rewrites history)
git reset --hard <commit-hash>
git push origin main --force
```

## Troubleshooting

### Site Not Updating

1. **Check Actions tab** - Is there a failed build?
2. **Clear browser cache** - Hard refresh (Ctrl+Shift+R)
3. **Wait longer** - Can take up to 10 minutes during high traffic
4. **Check branch** - Ensure you're pushing to `main`

### 404 Error

1. **Check Pages settings** - Correct branch and folder?
2. **Check file paths** - Are paths relative or absolute?
3. **Check CNAME** - Matches your domain exactly?

### HTTPS Not Working

1. **Wait 24 hours** - Certificate provisioning takes time
2. **Check DNS** - Are A records correct?
3. **Remove and re-add** - Toggle "Enforce HTTPS" off and on

### Custom Domain Not Working

1. **Verify DNS propagation**: `dig yourdomain.com`
2. **Check CNAME file** - No trailing spaces or newlines
3. **Verify in GitHub** - Custom domain shows in Pages settings

## CMS Deployment

The Decap CMS (`/admin/`) requires additional setup for production:

### GitHub OAuth App

1. Go to GitHub **Settings** > **Developer settings** > **OAuth Apps**
2. Create new OAuth App:
   - **Name**: Laingsburg Food Bank CMS
   - **Homepage URL**: `https://laingsburgfoodbank.org`
   - **Callback URL**: `https://api.netlify.com/auth/done`
3. Note the Client ID and Client Secret

### Netlify Identity (Recommended)

For the CMS to work, you need an OAuth provider. Options:

1. **Netlify Identity** - Free tier available
2. **Self-hosted** - Run your own OAuth server
3. **GitHub Backend** - Direct GitHub authentication

See [Decap CMS Authentication](https://decapcms.org/docs/authentication-backends/) for details.

## Environment-Specific Configuration

### Development

- View site at `localhost` or `file://`
- CMS may not work locally (requires OAuth)
- Content loads from local `_data/*.yml` files

### Production

- Site at your GitHub Pages URL or custom domain
- CMS requires OAuth setup
- Content managed via CMS or direct GitHub edits

## Monitoring

### Check Site Status

- **GitHub Actions**: View build status
- **UptimeRobot**: Free monitoring (optional)
- **Google Search Console**: SEO and indexing

### Performance

Run Lighthouse audit periodically:
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Generate report
4. Address any issues found

## Security Checklist

- [ ] HTTPS enabled and enforced
- [ ] No secrets in repository
- [ ] `.gitignore` excludes sensitive files
- [ ] External links use `rel="noopener noreferrer"`
- [ ] CMS access restricted to authorized users
