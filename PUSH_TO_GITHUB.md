# Push AgroTradeMatch Project to Existing GitHub Repository

Complete step-by-step guide to push your Manus project to your existing GitHub repo.

---

## Prerequisites

- You have an existing GitHub repository created
- You know your GitHub username and repository name
- Git is installed on your computer
- You have access to your project files

---

## Step 1: Get Your Repository URL

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/REPO_NAME`
2. Click the green **Code** button
3. Copy the HTTPS URL (should look like: `https://github.com/YOUR_USERNAME/agro-trade-dashboard.git`)
4. **Save this URL** - you'll need it in the next steps

---

## Step 2: Download Your Project Files

Since you're working with Manus, you need to get the project files locally first.

### Option A: Download from Manus Management UI

1. Go to your Manus project dashboard
2. Click **Code** panel (in Management UI on the right)
3. Click **Download all files** button
4. Extract the ZIP file to a folder on your computer
5. Open that folder in VSCode or your terminal

### Option B: Clone from Manus (If Already Pushed)

If you've already pushed to GitHub once:

```bash
git clone https://github.com/YOUR_USERNAME/agro-trade-dashboard.git
cd agro-trade-dashboard
```

---

## Step 3: Initialize Git (If Not Already Done)

Open Terminal/Command Prompt in your project folder:

```bash
cd /path/to/agro-trade-dashboard
```

Check if git is already initialized:

```bash
git status
```

**If you see an error** like "fatal: not a git repository", initialize git:

```bash
git init
```

---

## Step 4: Add All Files

Add all your project files to git:

```bash
git add .
```

---

## Step 5: Create Initial Commit

Create your first commit:

```bash
git commit -m "Initial commit: AgroTradeMatch Dashboard with 21 traders"
```

---

## Step 6: Add Remote Repository

Connect your local project to your GitHub repository:

```bash
git remote add origin https://github.com/YOUR_USERNAME/agro-trade-dashboard.git
```

**Replace:**
- `YOUR_USERNAME` with your actual GitHub username
- `agro-trade-dashboard` with your actual repository name

**Verify it was added:**

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/agro-trade-dashboard.git (fetch)
origin  https://github.com/YOUR_USERNAME/agro-trade-dashboard.git (push)
```

---

## Step 7: Push to GitHub

Push your code to GitHub:

```bash
git branch -M main
git push -u origin main
```

**What this does:**
- Renames your branch to `main` (GitHub's default)
- Pushes all your code to GitHub
- Sets up tracking so future pushes are easier

---

## Step 8: Verify Upload

1. Go to your GitHub repository page
2. Refresh the page
3. You should see all your project files listed
4. Check that the `client/public/agro_data.json` file shows 21 traders

---

## If You Already Have Files in GitHub

If your GitHub repository already has some files, you might need to pull them first:

```bash
git pull origin main --allow-unrelated-histories
```

Then push:

```bash
git push -u origin main
```

---

## Troubleshooting

### Error: "remote origin already exists"

**Solution:** Remove the old remote and add the correct one:

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/agro-trade-dashboard.git
git push -u origin main
```

### Error: "Permission denied (publickey)"

**Solution:** You need to set up SSH or use GitHub token. Use HTTPS instead:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/agro-trade-dashboard.git
git push -u origin main
```

### Error: "failed to push some refs"

**Solution:** Pull first, then push:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "fatal: not a git repository"

**Solution:** Initialize git first:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/agro-trade-dashboard.git
git push -u origin main
```

---

## After Pushing to GitHub

### Connect to Netlify

1. Go to https://app.netlify.com
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub**
4. Select your `agro-trade-dashboard` repository
5. Configure build settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist/public`
6. Click **Deploy site**

Your site will be live in 2-5 minutes!

---

## Future Updates Workflow

Every time you have new trader data:

1. **Update the data** in `client/public/agro_data.json`
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Update: Add new traders"
   ```
3. **Push to GitHub**:
   ```bash
   git push origin main
   ```
4. **Netlify automatically redeploys** (no action needed)

---

## Quick Reference

```bash
# Check status
git status

# Add all files
git add .

# Create commit
git commit -m "Your message"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main

# Check remotes
git remote -v

# See commit history
git log --oneline -5
```

---

## Summary

| Step | Command | Purpose |
|------|---------|---------|
| 1 | Get repo URL from GitHub | Know where to push |
| 2 | Download project files | Have files locally |
| 3 | `git init` | Initialize git |
| 4 | `git add .` | Stage all files |
| 5 | `git commit -m "message"` | Create commit |
| 6 | `git remote add origin URL` | Connect to GitHub |
| 7 | `git push -u origin main` | Push to GitHub |
| 8 | Verify on GitHub | Confirm upload |

You're ready to push! Start with Step 1.
