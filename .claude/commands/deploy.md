# Deploy to Production

Push changes to GitHub Pages production environment.

## Steps

1. **Check current status:**
```bash
git status
```

If there are uncommitted changes, warn the user to commit first using `/commit`.

2. **Check remote status:**
```bash
git log origin/main..HEAD --oneline
```

Show commits that will be pushed. If none, inform user that production is already up to date.

3. **Push to production:**
```bash
git push origin main
```

4. **Confirm deployment:**

After successful push, inform the user:
- Changes pushed to `main` branch
- GitHub Pages will automatically rebuild (1-2 minutes)
- Site URL: Check repository Settings > Pages for the URL

5. **Verify (optional):**

Suggest the user verify the deployment:
- Check GitHub Actions tab for build status
- Visit the live site to confirm changes
