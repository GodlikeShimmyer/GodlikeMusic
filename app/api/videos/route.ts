import { NextRequest, NextResponse } from 'next/server';

/**
 * YouTube Data API v3 Batch Video Details Endpoint Proxy
 * Fetches detailed information about multiple videos
 * 
 * Query Parameters:
 * - ids: comma-separated video IDs (required, max 50)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    // Validate inputs
    if (!ids || ids.trim().length === 0) {
      return NextResponse.json(
        { error: 'Video IDs are required' },
        { status: 400 }
      );
    }

    // Split and validate IDs
    const videoIds = ids.split(',').map(id => id.trim()).filter(Boolean);
    
    if (videoIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one valid video ID is required' },
        { status: 400 }
      );
    }

    if (videoIds.length > 50) {
      return NextResponse.json(
        { error: 'Maximum 50 video IDs allowed per request' },
        { status: 400 }
      );
    }

    // Validate each video ID format
    const invalidIds = videoIds.filter(id => !/^[a-zA-Z0-9_-]{11}$/.test(id));
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { 
          error: 'Invalid video ID format',
          invalidIds: invalidIds
        },
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
    youtubeUrl.searchParams.append('id', videoIds.join(','));
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

    // Return successful response with cache headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=7200, stale-while-revalidate=14400',
      },
    });

  } catch (error) {
    console.error('Videos API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
