import { NextRequest, NextResponse } from 'next/server';

/**
 * YouTube Data API v3 Search Endpoint Proxy
 * Searches for videos, channels, and playlists
 * 
 * Query Parameters:
 * - q: search query (required)
 * - type: 'video' | 'channel' | 'playlist' (default: 'video')
 * - maxResults: number of results (default: 20, max: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'video';
    const maxResults = Math.min(parseInt(searchParams.get('maxResults') || '20'), 50);

    // Validate inputs
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Get API key from Vercel environment variables
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey) {
      console.error('YOUTUBE_API_KEY is not configured in Vercel environment variables');
      return NextResponse.json(
        { 
          error: 'YouTube API is not configured. Please add YOUTUBE_API_KEY to your Vercel environment variables.',
          hint: 'Go to Vercel Dashboard → Project Settings → Environment Variables'
        },
        { status: 500 }
      );
    }

    // Build YouTube API URL
    const youtubeUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    youtubeUrl.searchParams.append('part', 'snippet');
    youtubeUrl.searchParams.append('q', query);
    youtubeUrl.searchParams.append('type', type);
    youtubeUrl.searchParams.append('maxResults', maxResults.toString());
    youtubeUrl.searchParams.append('key', apiKey);
    youtubeUrl.searchParams.append('videoEmbeddable', 'true');
    youtubeUrl.searchParams.append('safeSearch', 'moderate');

    // Make request to YouTube API
    const response = await fetch(youtubeUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('YouTube API error:', errorData);
      
      if (response.status === 403) {
        return NextResponse.json(
          { 
            error: 'YouTube API quota exceeded or invalid API key',
            hint: 'Check your API key and quota in Google Cloud Console'
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to fetch from YouTube API', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return successful response with cache headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
