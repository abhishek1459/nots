# Deployment Guide

This project can be deployed to multiple platforms. Follow the instructions below for your preferred hosting provider.

## Environment Variables

Before deploying, set up the following environment variables in your deployment platform:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
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

### "Missing Supabase environment variables" error

Make sure your deployment platform has the environment variables set correctly:
- Check the exact variable names (case-sensitive)
- Verify values are correct
- Redeploy after adding/updating variables

### Build fails

1. Ensure Node.js version is 18+ in your deployment settings
2. Check that all dependencies are in `package.json`
3. Run `npm run build` locally to verify the build process

### Network errors in deployed app

1. Verify Supabase project is accessible from public internet
2. Check Supabase project URL in environment variables
3. Ensure CORS is properly configured in Supabase dashboard

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
