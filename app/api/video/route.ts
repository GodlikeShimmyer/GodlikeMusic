import { NextRequest, NextResponse } from 'next/server';

/**
 * YouTube Data API v3 Video Details Endpoint Proxy
 * Fetches detailed information about a specific video
 * 
 * Query Parameters:
 * - id: video ID (required)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('id');

    // Validate inputs
    if (!videoId || videoId.trim().length === 0) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Validate video ID format (YouTube video IDs are 11 characters)
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return NextResponse.json(
        { error: 'Invalid video ID format' },
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
    const youtubeUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    youtubeUrl.searchParams.append('part', 'snippet,contentDetails,statistics');
    youtubeUrl.searchParams.append('id', videoId);
    youtubeUrl.searchParams.append('key', apiKey);

    // Make request to YouTube API
    const response = await fetch(youtubeUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 7200 }, // Cache for 2 hours
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

    // Check if video exists
    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Return successful response with cache headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=7200, stale-while-revalidate=14400',
      },
    });

  } catch (error) {
    console.error('Video API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
