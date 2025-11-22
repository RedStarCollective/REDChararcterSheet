# GitHub Pages Deployment Guide

## Quick Setup Instructions

Your Cyberpunk RED Character Sheet is ready to be deployed! Follow these steps to make it live on GitHub Pages:

### Step 1: Enable GitHub Pages

1. Go to your repository: **https://github.com/RedStarCollective/REDChararcterSheet**

2. Click on **Settings** (top navigation bar)

3. In the left sidebar, click **Pages** (under "Code and automation")

4. Under "Source", select **Deploy from a branch**

5. Under "Branch":
   - Select the branch: `claude/cyberpunk-character-sheet-01NZkniWbF1KuRYEm4jsEGS8`
   - Select the folder: `/ (root)`
   - Click **Save**

### Step 2: Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-3 minutes
- You'll see a green checkmark when it's ready

### Step 3: Access Your Character Sheet

Once deployed, your character sheet will be available at:

```
https://redstarcollective.github.io/REDChararcterSheet/
```

## Alternative: Merge to Main Branch (Recommended for Production)

If you want to use a cleaner URL and make this the primary version:

1. **Create a Pull Request**:
   - Go to your repository on GitHub
   - Click "Pull Requests" → "New Pull Request"
   - Select your branch `claude/cyberpunk-character-sheet-01NZkniWbF1KuRYEm4jsEGS8` to merge into `main`
   - Create and merge the PR

2. **Update GitHub Pages Settings**:
   - Go to Settings → Pages
   - Change the branch to `main`
   - Click Save

3. **Access at**:
   ```
   https://redstarcollective.github.io/REDChararcterSheet/
   ```

## Troubleshooting

### Site Not Loading?

- Wait 2-5 minutes after enabling GitHub Pages
- Check the Actions tab for build status
- Ensure the branch and folder are correctly selected
- Clear your browser cache

### 404 Error?

- Verify `index.html` is in the root of your selected branch
- Check that GitHub Pages is enabled in Settings
- Ensure the repository is public (or you have GitHub Pro for private repos)

### Custom Domain (Optional)

To use a custom domain:

1. Go to Settings → Pages
2. Under "Custom domain", enter your domain (e.g., `cyberpunk.yourdomain.com`)
3. Add a CNAME record in your domain's DNS settings pointing to `redstarcollective.github.io`
4. Wait for DNS propagation (up to 24-48 hours)

## Testing Locally

Before deploying, you can test locally:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Then open: `http://localhost:8000`

## Need Help?

- Check GitHub's official docs: https://docs.github.com/pages
- Repository issues: https://github.com/RedStarCollective/REDChararcterSheet/issues
