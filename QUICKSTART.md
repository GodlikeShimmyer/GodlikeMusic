# 🚀 Quick Start Guide

Get GodlikeMusic running in 5 minutes!

## ⚡ Prerequisites

- Node.js 18+ installed
- A YouTube Data API v3 key

## 📝 Steps

### 1. Get YouTube API Key (2 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a project (if needed)
3. Enable "YouTube Data API v3"
4. Create an API Key
5. Copy the key

### 2. Clone & Install (1 minute)

```bash
# Clone the repository
git clone <your-repo-url>
cd godlikemusic

# Install dependencies
npm install
```

### 3. Configure Environment (30 seconds)

Create `.env.local` file:

```env
YOUTUBE_API_KEY=your_api_key_here
```

### 4. Run Locally (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel (1 minute)

```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy
vercel

# Or use the deploy script
./deploy.sh
```

**Important**: After deployment, add `YOUTUBE_API_KEY` in Vercel Dashboard → Settings → Environment Variables

## ✅ Verification

Test these features:
- [ ] Search for a song
- [ ] Click play
- [ ] Check YouTube player loads
- [ ] Create a playlist
- [ ] Save a track

## 🆘 Troubleshooting

**API not configured error?**
- Verify environment variable name is exactly `YOUTUBE_API_KEY`
- Redeploy after adding the variable

**Player not loading?**
- Check browser console for errors
- Verify video IDs are valid
- Disable ad blockers

**Build errors?**
```bash
rm -rf node_modules .next
npm install
npm run build
```

## 📚 Next Steps

- Read [README.md](./README.md) for full documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide
- Check [LEGAL.md](./LEGAL.md) for compliance information

---

**That's it! You're ready to rock! 🎸**

Need help? Check the full README or open an issue.
