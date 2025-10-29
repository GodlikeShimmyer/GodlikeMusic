'use client';

import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from '@/app/lib/utils';
import TrackRow from '../TrackRow';
import { Track, YouTubeSearchResponse } from '@/app/types';
import { parseISODuration, getBestThumbnail, sanitizeText } from '@/app/lib/utils';

export default function SearchView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounced search
  const debouncedSearch = useCallback((query: string) => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Fetch search results
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return null;
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}&type=video&maxResults=20`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      return response.json() as Promise<YouTubeSearchResponse>;
    },
    enabled: debouncedQuery.length > 0,
  });

  // Fetch video details for durations
  const videoIds = data?.items.map((item) => item.id.videoId).filter(Boolean).join(',') || '';
  
  const { data: videoDetails } = useQuery({
    queryKey: ['video-details', videoIds],
    queryFn: async () => {
      if (!videoIds) return null;
      
      const response = await fetch(`/api/videos?ids=${videoIds}`);
      if (!response.ok) {
        throw new Error('Failed to fetch video details');
      }
      return response.json();
    },
    enabled: !!videoIds,
  });

  // Convert to Track format
  const tracks: Track[] =
    data?.items
      .filter((item) => item.id.videoId)
      .map((item, index) => {
        const details = videoDetails?.items.find((v: any) => v.id === item.id.videoId);
        const duration = details ? parseISODuration(details.contentDetails.duration) : 0;

        return {
          id: item.id.videoId!,
          title: sanitizeText(item.snippet.title),
          artist: sanitizeText(item.snippet.channelTitle),
          album: undefined,
          duration,
          thumbnail: getBestThumbnail(item.snippet.thumbnails),
          videoId: item.id.videoId!,
          channelId: item.snippet.channelId,
          channelTitle: sanitizeText(item.snippet.channelTitle),
        };
      }) || [];

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-dark-elevated p-6 -m-8 mb-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-subdued" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-full bg-white pl-12 pr-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-godlike-green"
            autoFocus
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-8">
        {!searchQuery && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto mb-4 text-dark-subdued" />
            <h2 className="text-2xl font-bold mb-2">Search for music</h2>
            <p className="text-dark-subdued">
              Find your favorite songs, artists, and albums
            </p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <div className="spinner h-12 w-12 mx-auto mb-4"></div>
            <p className="text-dark-subdued">Searching...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-2">Failed to load search results</p>
            <p className="text-sm text-dark-subdued">Please try again later</p>
          </div>
        )}

        {tracks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Songs</h2>
            <div className="space-y-1">
              {tracks.map((track, index) => (
                <TrackRow key={track.id} track={track} index={index} tracks={tracks} />
              ))}
            </div>
          </div>
        )}

        {debouncedQuery && !isLoading && tracks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-subdued">No results found for &quot;{debouncedQuery}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
