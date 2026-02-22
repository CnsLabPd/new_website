# 🚀 Deployment Guide

Deploy your Audio Balloon Pop Game to the web for FREE in under 15 minutes!

---

## Deployment Options

This guide covers two deployment platforms:
1. **Vercel** (Recommended - Serverless, instant deploys) - See main branch
2. **Render.com** (Alternative - Traditional server) - See `render_deployment` branch

---

## Option 1: Deploy to Vercel (Recommended - Current Setup)

### Prerequisites
- GitHub account (free)
- Vercel account (free, sign up at https://vercel.com)
- Neon PostgreSQL database (free, sign up at https://neon.tech)

### Step 1: Set Up Neon Database

1. Go to https://neon.tech and sign up (free)
2. Create a new project: "balloon-game"
3. Wait for database creation (~30 seconds)
4. Click **"Connection String"** and copy the PostgreSQL URL
   - It looks like: `postgres://username:password@host/database`
5. Save this URL - you'll need it in Step 3

### Step 2: Push Code to GitHub

If you haven't already:

```bash
git add -A
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 3: Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect the `vercel.json` configuration
5. **BEFORE DEPLOYING:** Add environment variable:
   - Click **"Environment Variables"**
   - Add: `DATABASE_URL` = (paste your Neon PostgreSQL URL from Step 1)
6. Click **"Deploy"**

**Deployment takes 1-2 minutes!**

### Step 4: Get Your URL

Once deployed, you'll get a URL like:
```
https://balloon-game-xxxx.vercel.app
```

**Your game is now live!** 🎉

### Environment Variables for Vercel

Required environment variables in Vercel dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgres://user:pass@host/db` | Neon PostgreSQL connection string |

Optional variables:
| Variable | Value | Description |
|----------|-------|-------------|
| `PYTHON_VERSION` | `3.11.9` | Python version (auto-detected from runtime.txt) |

### Vercel Auto-Deployment

After initial setup, every push to `main` branch automatically deploys:

```bash
git add -A
git commit -m "Update game"
git push origin main
```

Vercel will automatically build and deploy in ~1 minute!

### Vercel Benefits

- ✅ Instant deployments (1-2 minutes)
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN for fast loading
- ✅ Serverless functions (no server management)
- ✅ Automatic scaling
- ✅ Zero cold starts for static assets

---

## Option 2: Deploy to Render.com (Alternative)

**Note:** For Render deployment, use the `render_deployment` branch:

```bash
git checkout render_deployment
git push origin render_deployment
```

Then follow the Render instructions below.

### Prerequisites

- GitHub account (free)
- Your code pushed to GitHub
- Render.com account (free, no credit card needed)

### Step 1: Push Code to GitHub

If you haven't already:

```bash
git add -A
git commit -m "Ready for deployment"
git push origin render_deployment
```

### Step 2: Deploy to Render.com

#### 2.1 Sign Up

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with your GitHub account

#### 2.2 Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the `render_deployment` branch
4. Render will auto-detect your `render.yaml` file
5. Click **"Create Web Service"**

#### 2.3 Wait for Deployment

Render will automatically:
- Install Python 3.11.9
- Install dependencies from `requirements.txt`
- Run the production server
- Give you a free URL

**Deployment takes 3-5 minutes**

#### 2.4 Get Your URL

Once deployed, you'll get a URL like:
```
https://balloon-game-xxxx.onrender.com
```

**Your game is now live!** 🎉

### Step 3: Configure Database (Optional)

The game works perfectly with SQLite (default). For PostgreSQL:

1. In Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Create a free PostgreSQL database
3. Copy the **Internal Database URL**
4. In your web service:
   - Go to **"Environment"**
   - Add variable: `DATABASE_URL` = (paste your database URL)
   - Click **"Save Changes"**

The server will auto-restart and use PostgreSQL.

---

## Troubleshooting

### Deployment Failed

**Check the build logs:**
- Click on your service in Render
- Go to "Logs" tab
- Look for error messages

**Common issues:**
- Python version mismatch → Check `runtime.txt` has `python-3.11.9`
- Missing dependencies → Check `server/requirements.txt`

### App Shows Error Page

**Check the runtime logs:**
- In Render dashboard, go to "Logs"
- Look for Python errors

**Common issues:**
- Database connection failed → PostgreSQL URL incorrect
- Port not set → Should use `PORT` environment variable (auto-set by Render)

### Can't Access Game

**Check these:**
- Service is running (green in Render dashboard)
- URL is correct (copy from Render)
- Give it 30-60 seconds on first load (free tier sleeps when inactive)

---

## Free Tier Limitations

Render free tier includes:
- ✅ 750 hours/month (enough for hobby projects)
- ✅ Auto-sleep after 15 minutes of inactivity
- ✅ Auto-wake on first request (30-60 seconds)
- ✅ SSL/HTTPS included
- ✅ Automatic deployments from GitHub

**Perfect for personal projects and demos!**

---

## Alternative Deployment Options

### Railway (Alternative)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Railway auto-detects and deploys

### PythonAnywhere (Alternative)

1. Go to https://www.pythonanywhere.com
2. Sign up for free account
3. Upload your code
4. Configure web app with Flask
5. Set WSGI configuration

---

## Local Testing Before Deployment

Always test locally first:

```bash
# Start production server locally
python3 server/api_server_production.py

# Test at
http://localhost:10000/
```

This simulates the production environment.

---

## Updating Your Deployed Game

After making changes:

```bash
git add -A
git commit -m "Update game"
git push origin main
```

Render automatically redeploys! Watch the progress in the dashboard.

---

## Need Help?

- **Render Docs**: https://render.com/docs
- **GitHub Issues**: https://github.com/CnsLabPd/balloon_game_ver1/issues

---

**That's it! Your game is now accessible to anyone worldwide!** 🎈🎮
