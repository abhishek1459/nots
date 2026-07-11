# Deployment Guide

This project can be deployed to multiple platforms. Follow the instructions below for your preferred hosting provider.

## Environment Variables Setup

Before deploying, you must set up these environment variables in your deployment platform:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Vercel Deployment

### Option 1: Using GitHub Integration (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New" → "Project"
4. Select your `nots` repository
5. Vercel will automatically detect the framework (Vite/React)
6. **IMPORTANT**: Before clicking Deploy, scroll to "Environment Variables" section
7. Add the following environment variables:
   - **Name**: `VITE_SUPABASE_URL`  
     **Value**: `https://yxxhkhbofoohvgaovppj.supabase.co` (your actual Supabase URL)
   - **Name**: `VITE_SUPABASE_ANON_KEY`  
     **Value**: `sb_publishable_bj2S4V0xGNIizG00UtN7tA_BMUJNgSY` (your actual anon key)
8. Make sure both are set for **Production**, **Preview**, and **Development** environments
9. Click "Deploy"

### Option 2: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and add environment variables when asked.

---

## Cloudflare Pages Deployment

### Option 1: Using GitHub Integration (Recommended)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to "Pages"
3. Click "Create a project" → "Connect to Git"
4. Select your GitHub account and `nots` repository
5. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Click "Save and Deploy"

### Option 2: Using Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy dist
```

---

## Environment Variables Setup

### For Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable with its value
3. Make sure they're available for all environments (Production, Preview, Development)

### For Cloudflare Pages

1. Go to Project Settings → Environment Variables
2. Add variables under "Production" environment
3. For preview deployments, add under "Preview" environment

---

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Application loads without errors
- [ ] Login functionality works
- [ ] Can create, read, update, delete notes
- [ ] Supabase connection is stable
- [ ] Dark mode toggle works
- [ ] Search functionality works

---

## Troubleshooting

### "404 NOT_FOUND" Error on Vercel or Cloudflare Pages

**Problem**: You get a 404 error when accessing routes like `/login`, `/` after logging in, etc.

**Cause**: This is a **Single Page Application (SPA)** built with React Router. All routes are handled client-side, but the server doesn't know this. When you navigate directly to `/login`, the server looks for a physical file and can't find it.

**Solution**: The routing configuration is already included in the project:
- **Vercel**: `vercel.json` has a rewrite rule that redirects all routes to `/index.html`
- **Cloudflare Pages**: `public/_routes.json` handles SPA routing

If you're still getting 404 errors:

1. **For Vercel**: 
   - Go to Project Settings → Build & Development Settings
   - Ensure "Build Command" is `npm run build`
   - Ensure "Output Directory" is `dist`
   - Redeploy the project

2. **For Cloudflare Pages**:
   - Go to Settings → Build & Deployments
   - Clear the build cache and redeploy
   - Verify `_routes.json` is included in deployment

---

## Rollback

### Vercel
- Go to Deployments tab
- Click on a previous deployment
- Click "Redeploy"

### Cloudflare Pages
- Go to Deployments tab
- Click on a previous deployment
- Click "Rollback to this deployment"
