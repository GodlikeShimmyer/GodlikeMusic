'use client';

import { Album } from '@/app/types';
import { Play } from 'lucide-react';
import { usePlayerStore } from '@/app/store/usePlayerStore';
import { useLibraryStore } from '@/app/store/useLibraryStore';
import Image from 'next/image';
import { useState } from 'react';

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const playTrackList = usePlayerStore((state) => state.playTrackList);
  const { saveAlbum, unsaveAlbum, isAlbumSaved } = useLibraryStore();
  const [isHovered, setIsHovered] = useState(false);
  const isSaved = isAlbumSaved(album.id);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (album.tracks.length > 0) {
      playTrackList(album.tracks, 0);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      unsaveAlbum(album.id);
    } else {
      saveAlbum(album);
    }
  };

  return (
    <div
      className="group relative rounded-lg bg-dark-surface p-4 transition-all hover:bg-dark-elevated cursor-pointer hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSave}
    >
      {/* Album Art */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md shadow-lg">
        <Image
          src={album.thumbnail}
          alt={album.title}
          fill
          className="object-cover"
        />

        {/* Play Button Overlay */}
        {isHovered && album.tracks.length > 0 && (
          <button
            onClick={handlePlay}
            className="absolute right-2 bottom-2 flex h-12 w-12 items-center justify-center rounded-full bg-godlike-green text-black shadow-lg hover:scale-110 transition-transform"
            aria-label="Play Album"
          >
            <Play className="h-5 w-5 fill-current" />
          </button>
        )}
      </div>

      {/* Album Info */}
      <div>
        <h3 className="truncate font-bold text-white mb-1">{album.title}</h3>
        <p className="text-sm text-dark-subdued truncate">{album.artist}</p>
        {album.year && (
          <p className="text-xs text-dark-subdued mt-1">{album.year}</p>
        )}
      </div>
    </div>
  );
}
