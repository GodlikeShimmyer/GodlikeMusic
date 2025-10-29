'use client';

import { Playlist } from '@/app/types';
import { Play } from 'lucide-react';
import { usePlayerStore } from '@/app/store/usePlayerStore';
import Image from 'next/image';
import { useState } from 'react';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const playTrackList = usePlayerStore((state) => state.playTrackList);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.tracks.length > 0) {
      playTrackList(playlist.tracks, 0);
    }
  };

  return (
    <div
      className="group relative rounded-lg bg-dark-surface p-4 transition-all hover:bg-dark-elevated cursor-pointer hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md shadow-lg">
        {playlist.thumbnail ? (
          <Image
            src={playlist.thumbnail}
            alt={playlist.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-godlike text-6xl font-bold text-white">
            {playlist.name.charAt(0)}
          </div>
        )}

        {/* Play Button Overlay */}
        {isHovered && playlist.tracks.length > 0 && (
          <button
            onClick={handlePlay}
            className="absolute right-2 bottom-2 flex h-12 w-12 items-center justify-center rounded-full bg-godlike-green text-black shadow-lg hover:scale-110 transition-transform"
            aria-label="Play Playlist"
          >
            <Play className="h-5 w-5 fill-current" />
          </button>
        )}
      </div>

      {/* Playlist Info */}
      <div>
        <h3 className="truncate font-bold text-white mb-1">{playlist.name}</h3>
        <p className="text-sm text-dark-subdued truncate-2">
          {playlist.description || `${playlist.tracks.length} songs`}
        </p>
      </div>
    </div>
  );
}
