# 🚀 Vercel Deployment Setup Guide

## ❌ Current Issue
Deployment failed due to missing environment variables.

## ✅ Solution: Add Environment Variables to Vercel

### Step 1: Get Your Values

You need these values from your `.env.local` file (DO NOT commit this file):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```bash
NEXT_PUBLIC_SITE_URL=https://www.rsumeloy.co.id
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
GOOGLE_AI_API_KEY=your_google_gemini_api_key (optional)
```

---

### Step 2: Add to Vercel Dashboard

1. **Go to Vercel Dashboard:**
   - URL: https://vercel.com/hendrazan/rsumeloy/settings/environment-variables

2. **Add Each Variable:**
   - Click "Add New"
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL
   - Environment: Select all (Production, Preview, Development)
   - Click "Save"

3. **Repeat for all variables:**
   - ✅ NEXT_PUBLIC_SUPABASE_URL
   - ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
   - ✅ NEXT_PUBLIC_SITE_URL
   - ✅ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   - ⚪ GOOGLE_AI_API_KEY (optional, for AI chatbot)

---

### Step 3: Redeploy

After adding all variables:

1. Go to: https://vercel.com/hendrazan/rsumeloy/deployments
2. Click on failed deployment (57e3096)
3. Click "Redeploy"
4. Or push new commit to trigger auto-deploy

---

## 🔍 Where to Find Your Values

### Supabase Values:
1. Login: https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Cloudinary:
Already in code: `ddyqhlilj`

### Site URL:
Your production domain:
- Check these URLs work:
- https://www.rsumeloy.co.id (if custom domain)
- https://rsumeloy-git-master-yourname.vercel.app

### Google AI (Optional):
1. https://makersuite.google.com/app/apikey
2. Create API key
3. Copy key

---

## 🎯 Quick Command Reference

If you have Vercel CLI installed:

```bash
# Login
vercel login

# Link project
vercel link

# Add env variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

# Deploy
vercel --prod
```

---

## ✅ Verification

After setup, build should succeed with:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

---

## 🆘 Troubleshooting

### Build still fails?
1. Check all variable names are correct (case-sensitive)
2. Verify Supabase URL starts with `https://`
3. Ensure no trailing spaces in values
4. Verify Supabase project is active

### How to test locally?
```bash
# Copy example
cp .env.example .env.local

# Add your values
# Edit .env.local

# Test build
npm run build
```

---

## 📝 Security Notes

- ✅ `NEXT_PUBLIC_*` variables are safe (exposed to browser)
- ❌ **NEVER** commit `.env.local` to Git
- ✅ Use `.env.example` as template (no real values)
- ✅ Keep `GOOGLE_AI_API_KEY` secure (backend only if possible)

---

Ready to deploy! 🚀
