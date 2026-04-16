# AgroTradeMatch Dashboard - Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the AgroTradeMatch dashboard to Netlify. The application is a static React site with no backend requirements, making it ideal for Netlify's hosting platform.

## Prerequisites

Before deploying, ensure you have:

- A GitHub account (to host the repository)
- A Netlify account (free tier available at [netlify.com](https://netlify.com))
- Git installed on your local machine
- Node.js 18+ and pnpm installed

## Step 1: Prepare Your Repository for GitHub

### 1.1 Initialize Git (if not already done)

```bash
cd agro-trade-dashboard
git init
git add .
git commit -m "Initial commit: AgroTradeMatch dashboard"
```

### 1.2 Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repository `agro-trade-dashboard`
3. Add a description: "A community platform connecting agricultural buyers and sellers across West Africa"
4. Choose **Public** (recommended for community visibility)
5. Click **Create repository**

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/agro-trade-dashboard.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended for Beginners)

1. **Connect to Netlify**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click **Add new site** → **Import an existing project**
   - Select **GitHub** as your Git provider
   - Authorize Netlify to access your GitHub account

2. **Select Your Repository**
   - Find and select `agro-trade-dashboard`
   - Click **Install** to grant Netlify access

3. **Configure Build Settings**
   - **Base directory**: Leave empty (default)
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist/public`
   - Click **Deploy site**

4. **Wait for Deployment**
   - Netlify will automatically build and deploy your site
   - You'll receive a unique URL (e.g., `https://agro-trade-dashboard-abc123.netlify.app`)

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build Your Project**
   ```bash
   pnpm build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist/public
   ```

4. **Authenticate**
   - Follow the prompts to log in to your Netlify account
   - Authorize the CLI to deploy on your behalf

## Step 3: Configure Custom Domain (Optional)

1. **In Netlify Dashboard**
   - Go to **Site settings** → **Domain management**
   - Click **Add custom domain**
   - Enter your domain name (e.g., `agro-trade-match.com`)

2. **Update DNS Records**
   - Follow Netlify's instructions to update your domain's DNS settings
   - Typical records needed:
     - `ALIAS` or `CNAME` pointing to your Netlify site
     - `A` records for root domain

3. **Enable HTTPS**
   - Netlify automatically provisions SSL certificates
   - HTTPS is enabled by default

## Step 4: Automatic Deployments

Once connected to GitHub, Netlify will automatically deploy whenever you push to the `main` branch.

### To Deploy Updates:

```bash
# Make your changes
git add .
git commit -m "Update: [description of changes]"
git push origin main
```

Netlify will automatically build and deploy within seconds.

## Step 5: Environment Variables (If Needed)

If you add environment variables in the future:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add your variables (e.g., API keys)
4. Redeploy your site

## Troubleshooting

### Build Fails with "Missing Dependencies"

**Solution**: Ensure `pnpm` is specified in Netlify:
- Go to **Site settings** → **Build & deploy** → **Environment**
- Add: `NODE_VERSION` = `18` (or your preferred version)

### Site Shows 404 Errors on Routes

**Solution**: Configure redirects for client-side routing:
- Create a `netlify.toml` file in the project root:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- Commit and push to trigger a redeploy

### Images or Data Not Loading

**Solution**: Verify that `public/agro_data.json` is included in the build:
- Check that the file exists in `client/public/agro_data.json`
- Ensure it's committed to Git
- Redeploy after confirming

## Performance Optimization

### Enable Caching

In `netlify.toml`, add:

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Monitor Build Performance

- Visit **Analytics** in Netlify dashboard
- Review **Deploys** tab for build times
- Consider code splitting if bundle size exceeds 500KB

## Security Best Practices

1. **Keep Dependencies Updated**
   ```bash
   pnpm update
   git push origin main
   ```

2. **Review Build Logs**
   - Check for security warnings in deployment logs
   - Address any deprecation notices

3. **Enable Branch Protection**
   - In GitHub, go to **Settings** → **Branches**
   - Add branch protection rule for `main`
   - Require status checks before merging

## Monitoring and Maintenance

### Set Up Notifications

1. Go to **Site settings** → **Notifications**
2. Enable email alerts for:
   - Deploy failures
   - SSL certificate expiration

### Regular Backups

- Your GitHub repository serves as your backup
- Netlify stores all deployment history
- Export data regularly if needed

## Rollback to Previous Deployment

If something goes wrong:

1. Go to **Deploys** in Netlify dashboard
2. Find the previous working deployment
3. Click **Publish deploy**

Your site will instantly revert to that version.

## Support and Resources

- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **React Deployment**: [react.dev/learn/deployment](https://react.dev/learn/deployment)
- **GitHub Help**: [docs.github.com](https://docs.github.com)

## Summary

Your AgroTradeMatch dashboard is now ready for production deployment. The entire process—from GitHub setup to live deployment—typically takes less than 15 minutes. Once deployed, your community members can access the platform to browse buyers, sellers, and facilitate agricultural trade transactions.

---

**Deployment Checklist:**
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] Netlify account created
- [ ] Site connected to GitHub repository
- [ ] Build settings configured (pnpm build, dist/public)
- [ ] Deployment successful
- [ ] Custom domain configured (optional)
- [ ] HTTPS verified
- [ ] Test all pages and links work correctly
