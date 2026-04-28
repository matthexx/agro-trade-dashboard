# Sync Latest Dashboard Updates to Your Local VSCode Project

Follow these exact steps to pull the latest updates safely without losing your work.

---

## Prerequisites

- VSCode installed on your computer
- Git installed on your computer
- Your project already cloned from GitHub locally
- Terminal/Command Prompt access

---

## Step 1: Check Your Current Status

Open Terminal in VSCode (Ctrl + ` on Windows/Linux, Cmd + ` on Mac) or open Command Prompt separately.

Navigate to your project:

```bash
cd /path/to/your/agro-trade-dashboard
```

Check your current status:

```bash
git status
```

**You should see:**
- Either "nothing to commit, working tree clean" (good)
- Or "Changes not staged for commit" (if you made local changes)

---

## Step 2: Backup Your Local Changes (If Any)

If you see uncommitted changes from Step 1, save them first:

```bash
git add .
git commit -m "Local backup: [describe your changes]"
```

Example:
```bash
git commit -m "Local backup: Updated styling"
```

---

## Step 3: Fetch Latest Updates from GitHub

This downloads the latest changes WITHOUT applying them yet:

```bash
git fetch origin
```

---

## Step 4: Check What's New

See what changes are coming:

```bash
git log --oneline origin/main -5
```

This shows the 5 most recent commits on GitHub.

---

## Step 5: Pull Latest Updates

This is the safe way to get the latest changes:

```bash
git pull origin main
```

**What this does:**
- Downloads the latest code from GitHub
- Automatically merges it with your local version
- Keeps your local changes if they don't conflict

---

## Step 6: Install Any New Dependencies

If new packages were added, install them:

```bash
pnpm install
```

---

## Step 7: Verify Everything Works

Start the development server:

```bash
pnpm dev
```

Open your browser to `http://localhost:3000` and test:
- ✓ Home page loads
- ✓ Buyers page works
- ✓ Sellers page shows all 21 traders
- ✓ Search functionality works
- ✓ View Details modals open correctly
- ✓ Join Now button links to Google Form

---

## What Changed in Latest Update

The latest update added:
- **6 new traders** to the database
- Updated trader count on home page (now 21 members)
- All existing data preserved
- No breaking changes

---

## If Something Goes Wrong

### Scenario 1: "Merge Conflict" Error

This means your local changes conflict with GitHub changes.

**Solution:**

```bash
# Cancel the merge
git merge --abort

# Try again with a different approach
git pull origin main --rebase
```

### Scenario 2: "Permission Denied" or "Authentication Failed"

**Solution:** Make sure you've authenticated Git with GitHub:

```bash
# Check if you're logged in
git config --global user.name
git config --global user.email

# If not set, configure them
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"
```

### Scenario 3: "Detached HEAD" State

**Solution:**

```bash
# Go back to main branch
git checkout main
git pull origin main
```

### Scenario 4: Local Changes Lost

**Solution:** Git keeps a history. Recover your work:

```bash
# See all recent commits
git reflog

# Go back to a specific point
git reset --hard HEAD@{1}
```

---

## Safe Workflow for Future Updates

Every time you get new trader data:

1. **Commit your local work** (if any):
   ```bash
   git add .
   git commit -m "Your message"
   ```

2. **Pull latest updates**:
   ```bash
   git pull origin main
   ```

3. **Install dependencies** (if needed):
   ```bash
   pnpm install
   ```

4. **Test locally**:
   ```bash
   pnpm dev
   ```

5. **Push your changes** (if you made any):
   ```bash
   git push origin main
   ```

---

## Quick Reference Commands

```bash
# See current status
git status

# See what's different from GitHub
git diff origin/main

# Pull latest changes
git pull origin main

# See commit history
git log --oneline -10

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# See all branches
git branch -a

# Switch to main branch
git checkout main
```

---

## After Pulling Updates

### To Deploy Updated Version to Netlify

1. Make sure everything works locally:
   ```bash
   pnpm build
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

3. Netlify automatically detects the push and redeploys
4. Your live site updates within 2-5 minutes

### No manual Netlify action needed - it's automatic!

---

## Need Help?

If you get stuck:

1. Take a screenshot of the error
2. Run this command to see detailed info:
   ```bash
   git log --oneline -10
   git status
   git remote -v
   ```
3. Send me the output and I'll help you fix it

---

## Summary

| Step | Command | Purpose |
|------|---------|---------|
| 1 | `git status` | Check current state |
| 2 | `git add . && git commit -m "message"` | Backup local changes |
| 3 | `git fetch origin` | Download updates |
| 4 | `git log --oneline origin/main -5` | See what's new |
| 5 | `git pull origin main` | Apply updates |
| 6 | `pnpm install` | Install dependencies |
| 7 | `pnpm dev` | Test locally |

You're ready to sync! Start with Step 1.
