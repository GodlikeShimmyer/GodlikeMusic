# 🎵 GodlikeMusic

A full-featured, modern music streaming web application inspired by Spotify, built with Next.js, TypeScript, and powered by the YouTube Data API v3.

![GodlikeMusic](https://img.shields.io/badge/GodlikeMusic-v1.0.0-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.x-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vercel](https://img.shields.io/badge/Vercel-Ready-black)

## ⚠️ Legal & Compliance Notice

**IMPORTANT**: This application uses the YouTube Data API v3 and is subject to [YouTube's Terms of Service](https://www.youtube.com/t/terms) and [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy).

- **DO NOT** use this application to violate any terms of service
- **DO NOT** attempt to bypass rate limits or quotas
- **DO NOT** use for commercial purposes without proper licensing
- **DO** respect copyright and content ownership
- **DO** comply with all applicable laws and regulations

This is an **original implementation** and does not use any proprietary Spotify code, assets, or APIs.

## ✨ Features

### 🎼 Core Music Features
- **YouTube Integration**: Stream music directly from YouTube with embedded player
- **Smart Search**: Real-time search with typeahead suggestions
- **Playback Controls**: Play, pause, next, previous, shuffle, repeat modes
- **Queue Management**: View and manage upcoming tracks
- **Playback History**: Track your listening history

### 📚 Library & Organization
- **Personal Library**: Save tracks, albums, and follow artists
- **Playlist Management**: Create, edit, delete, and organize playlists
- **Liked Songs**: Dedicated playlist for your favorite tracks
- **Public/Private Playlists**: Control playlist visibility

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion
- **Dark Theme**: Easy on the eyes with customizable color scheme
- **Keyboard Navigation**: Full keyboard accessibility support
- **Mobile Responsive**: Works seamlessly on all devices

### 🚀 Technical Features
- **Server-Side API Proxy**: Secure API key handling via Vercel environment variables
- **Client-Side State**: Zustand for efficient state management
- **Data Fetching**: React Query for server state with caching
- **Persistent Storage**: Local storage for user preferences and library
- **Optimized Performance**: Code splitting and lazy loading
- **SEO Friendly**: Next.js App Router with metadata

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Icons**: Lucide React
- **Deployment**: Vercel
- **API**: YouTube Data API v3

## 🎨 Brand Colors

```css
--godlike-green: #00C46A
--godlike-blue: #0077FF
--godlike-cyan: #00E5FF
```

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- YouTube Data API v3 Key ([Get one here](https://console.cloud.google.com/apis/credentials))

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd godlikemusic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🚀 Vercel Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/godlikemusic)

### Manual Deployment

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables in Vercel Dashboard**
   
   Go to your project in Vercel Dashboard:
   - Navigate to **Settings** → **Environment Variables**
   - Add the following variable:
     - **Name**: `YOUTUBE_API_KEY`
     - **Value**: Your YouTube Data API v3 key
     - **Environments**: Production, Preview, Development

5. **Redeploy** (if needed)
   ```bash
   vercel --prod
   ```

### Environment Variables

The following environment variables must be set in your Vercel project:

| Variable | Description | Required |
|----------|-------------|----------|
| `YOUTUBE_API_KEY` | YouTube Data API v3 Key | Yes |

**⚠️ Security Note**: Never commit API keys to your repository. Always use Vercel's environment variables dashboard.

## 📁 Project Structure

```
godlikemusic/
├── app/
│   ├── api/                    # API routes (YouTube proxy)
│   │   ├── search/
│   │   │   └── route.ts       # Search endpoint
│   │   ├── video/
│   │   │   └── route.ts       # Single video endpoint
│   │   └── videos/
│   │       └── route.ts       # Batch videos endpoint
│   ├── components/             # React components
│   │   ├── cards/             # Card components
│   │   ├── player/            # Player components
│   │   ├── views/             # View components
│   │   ├── Logo.tsx
│   │   ├── MainContent.tsx
│   │   ├── PlayerBar.tsx
│   │   ├── PlayerSidebar.tsx
│   │   ├── Providers.tsx
│   │   └── Sidebar.tsx
│   ├── lib/                   # Utility functions
│   │   ├── seedData.ts        # Seed/demo data
│   │   └── utils.ts           # Helper functions
│   ├── store/                 # Zustand stores
│   │   ├── useLibraryStore.ts
│   │   └── usePlayerStore.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/                    # Static assets
├── .eslintrc.json            # ESLint config
├── .gitignore                # Git ignore rules
├── .vercelignore             # Vercel ignore rules
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel configuration
└── README.md                 # This file
```

## 🎮 Usage Guide

### Searching for Music

1. Click the **Search** icon in the sidebar
2. Type your query in the search box
3. Results will appear as you type
4. Click on any track to play it

### Creating Playlists

1. Click **Create Playlist** in the sidebar
2. A new playlist will be created
3. Click on the playlist to view it
4. Add tracks by searching and clicking the **+** icon

### Playing Music

1. Click the play button on any track
2. The player sidebar will open on the right
3. Use the bottom player bar for quick controls
4. Manage your queue from the player sidebar

### Managing Your Library

1. Click the **heart** icon to save tracks
2. Click **Your Library** to view saved content
3. Follow artists by clicking their **follow** button
4. Access all your content from the Library view

## 🔧 API Routes

### Search Endpoint

```
GET /api/search?q={query}&type={video|channel|playlist}&maxResults={number}
```

**Parameters**:
- `q`: Search query (required)
- `type`: Result type (default: 'video')
- `maxResults`: Number of results (default: 20, max: 50)

**Response**: YouTube Data API search results

### Video Endpoint

```
GET /api/video?id={videoId}
```

**Parameters**:
- `id`: YouTube video ID (required)

**Response**: Video details including title, duration, thumbnail

### Videos Endpoint

```
GET /api/videos?ids={id1,id2,id3}
```

**Parameters**:
- `ids`: Comma-separated video IDs (required, max 50)

**Response**: Batch video details

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  'godlike-green': '#00C46A',
  'godlike-blue': '#0077FF',
  'godlike-cyan': '#00E5FF',
}
```

### Seed Data

Modify `app/lib/seedData.ts` to change demo playlists and featured content.

## 🐛 Troubleshooting

### API Quota Exceeded

If you see "quota exceeded" errors:
1. Check your YouTube API quota in Google Cloud Console
2. Request a quota increase if needed
3. Implement caching to reduce API calls
4. Use seed data as fallback

### Player Not Loading

If the YouTube player doesn't load:
1. Check browser console for errors
2. Verify the video ID is valid
3. Ensure the video allows embedding
4. Check for ad blockers or content blockers

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Clear npm cache: `npm cache clean --force`
4. Check Node.js version (18.x+ required)

## 📝 Development Notes

### Code Quality

- **ESLint**: Linting is configured for Next.js
- **TypeScript**: Strict mode enabled
- **Prettier**: Consider adding for consistent formatting

### Testing

The project includes Vitest setup. Add tests in `__tests__` directories:

```bash
npm test
```

### Performance

- API responses are cached for 1-2 hours
- Images are optimized via Next.js Image component
- Code splitting is automatic with Next.js
- Use React Query for efficient data fetching

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests if applicable
5. Submit a pull request

## 📄 License

This project is provided as-is for educational and personal use. 

**Important**: 
- This does not include any license to use Spotify's trademarks, trade names, or branding
- YouTube API usage is subject to Google's terms
- Respect all copyright and intellectual property rights

## 🙏 Acknowledgments

- **Next.js** - The React Framework
- **Vercel** - Deployment platform
- **YouTube** - Content and API
- **Tailwind CSS** - Styling framework
- **Lucide** - Icon library

## 📞 Support

For issues and questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [YouTube API Documentation](https://developers.google.com/youtube/v3)
3. Open an issue on GitHub

## 🗺️ Roadmap

- [ ] User authentication with OAuth
- [ ] Social features (follow friends, share playlists)
- [ ] Advanced recommendation algorithm
- [ ] Lyrics integration
- [ ] Podcast support
- [ ] Desktop app (Electron)
- [ ] Mobile apps (React Native)

---

**Made with ❤️ by the GodlikeMusic Team**

*Remember to respect all terms of service and use responsibly!*
