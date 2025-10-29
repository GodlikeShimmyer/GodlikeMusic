# 🚀 Deployment Guide for GodlikeMusic

This guide will walk you through deploying GodlikeMusic to Vercel.

## Prerequisites

1. **GitHub Account** (or GitLab/Bitbucket)
2. **Vercel Account** (free tier is sufficient) - Sign up at [vercel.com](https://vercel.com)
3. **YouTube Data API v3 Key** - Get from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

## Step 1: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **YouTube Data API v3**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key
   - (Optional but recommended) Restrict the API key to YouTube Data API v3 and your domain

## Step 2: Push to GitHub

If you haven't already pushed to GitHub:

```bash
# Create a new repository on GitHub (don't initialize with README)
# Then run these commands:

git remote add origin https://github.com/yourusername/godlikemusic.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for beginners)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js - keep the default settings
5. Click "Deploy"
6. Wait for the initial deployment to complete

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option C: Use the provided deploy script

```bash
./deploy.sh
```

## Step 4: Add Environment Variables

This is **CRITICAL** - the app won't work without this step!

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:
   - **Name**: `YOUTUBE_API_KEY`
   - **Value**: Your YouTube Data API v3 key from Step 1
   - **Environments**: Check all three (Production, Preview, Development)
5. Click "Save"

## Step 5: Redeploy (Important!)

After adding environment variables, you need to redeploy:

### Via Dashboard:
1. Go to "Deployments" tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"

### Via CLI:
```bash
vercel --prod
```

## Step 6: Verify Deployment

1. Visit your deployed URL (e.g., `https://godlikemusic.vercel.app`)
2. Test the search functionality
3. Try playing a song
4. Check that the YouTube player loads correctly

## Troubleshooting

### API Key Issues

**Problem**: "YouTube API is not configured" error

**Solution**:
- Verify the environment variable is named exactly: `YOUTUBE_API_KEY`
- Check that it's enabled for Production environment
- Redeploy after adding the variable
- Verify the API key is valid in Google Cloud Console

### Quota Exceeded

**Problem**: "API quota exceeded" error

**Solution**:
- YouTube Data API has a daily quota (10,000 units by default)
- Each search costs ~100 units
- Request quota increase in Google Cloud Console if needed
- The app includes caching to minimize API calls

### Build Errors

**Problem**: Build fails during deployment

**Solution**:
```bash
# Test build locally first
npm run build

# If it works locally but fails on Vercel:
# 1. Check Node.js version (should be 18.x or higher)
# 2. Clear Vercel cache and redeploy
# 3. Check the build logs for specific errors
```

### Player Not Loading

**Problem**: YouTube player doesn't load or shows errors

**Solution**:
- Ensure video IDs are valid
- Check that videos allow embedding
- Verify no ad blockers are interfering
- Check browser console for JavaScript errors

## Custom Domain Setup

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Performance Optimization

### Enable Analytics

1. Go to Vercel Dashboard → Your Project → Analytics
2. Enable Vercel Analytics for free performance insights

### Enable Caching

The API routes already include caching headers:
- Search results: 1 hour cache
- Video details: 2 hour cache

### Image Optimization

Next.js Image component is already configured to optimize images from YouTube.

## Monitoring

### Check API Usage

Monitor your YouTube API usage:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Dashboard"
3. Select "YouTube Data API v3"
4. View quota usage and statistics

### Vercel Logs

View real-time logs:
```bash
vercel logs [deployment-url]
```

Or check logs in Vercel Dashboard → Your Project → Deployments → [Click deployment] → Logs

## Continuous Deployment

Once connected to GitHub, Vercel automatically:
- Deploys every push to the main branch (Production)
- Creates preview deployments for pull requests
- Runs build checks before deployment

## Security Best Practices

1. **Never commit API keys** to your repository
2. **Use environment variables** for all sensitive data
3. **Restrict API key** usage in Google Cloud Console
4. **Enable HTTP/2** (Vercel does this automatically)
5. **Use HTTPS** (Vercel provides free SSL)

## Scaling Considerations

### Free Tier Limits (Vercel)
- 100 GB bandwidth per month
- Unlimited deployments
- Serverless function execution: 100 GB-hours

### Upgrading
If you exceed free tier limits:
1. Go to Vercel Dashboard → Your Team → Billing
2. Upgrade to Pro plan ($20/month) for:
   - 1 TB bandwidth
   - Unlimited team members
   - Advanced analytics
   - Priority support

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Google Cloud Console](https://console.cloud.google.com/)

## Support

If you encounter issues:
1. Check the [README.md](./README.md) troubleshooting section
2. Review Vercel deployment logs
3. Check YouTube API quota and status
4. Verify environment variables are set correctly

## Post-Deployment Checklist

- [ ] API key is configured in Vercel
- [ ] App is accessible at deployment URL
- [ ] Search functionality works
- [ ] Player loads and plays music
- [ ] No console errors in browser
- [ ] API calls are working (check Network tab)
- [ ] Playlists can be created and managed
- [ ] Library features work (save/unsave tracks)
- [ ] Mobile responsiveness is good

## Next Steps

After successful deployment:
1. Share your app URL
2. Gather user feedback
3. Monitor API usage
4. Add custom domain (optional)
5. Enable analytics
6. Consider adding more features from the roadmap

---

**Congratulations! Your GodlikeMusic app is now live! 🎉**
