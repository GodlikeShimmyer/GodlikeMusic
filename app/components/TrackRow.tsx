'use client';

import { useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal, Plus } from 'lucide-react';
import { Track } from '@/app/types';
import { usePlayerStore } from '@/app/store/usePlayerStore';
import { useLibraryStore } from '@/app/store/useLibraryStore';
import { formatDuration } from '@/app/lib/utils';
import Image from 'next/image';
import ContextMenu from './ContextMenu';

interface TrackRowProps {
  track: Track;
  index: number;
  tracks: Track[];
  showAlbum?: boolean;
}

export default function TrackRow({ track, index, tracks, showAlbum = false }: TrackRowProps) {
  const { currentTrack, isPlaying, playTrackList, pause, play } = usePlayerStore();
  const { saveTrack, unsaveTrack, isTrackSaved } = useLibraryStore();
  
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const isCurrentTrack = currentTrack?.id === track.id;
  const isSaved = isTrackSaved(track.id);

  const handlePlay = () => {
    if (isCurrentTrack) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      playTrackList(tracks, index);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      unsaveTrack(track.id);
    } else {
      saveTrack(track);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  return (
    <>
      <div
        className="track-row grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 rounded group hover:bg-dark-elevated cursor-pointer"
        onClick={handlePlay}
        onContextMenu={handleContextMenu}
      >
        {/* Index / Play Button */}
        <div className="flex items-center justify-center">
          {isCurrentTrack && isPlaying ? (
            <Pause className="h-4 w-4 text-godlike-green fill-current" />
          ) : (
            <>
              <span className="group-hover:hidden text-dark-subdued text-sm">
                {index + 1}
              </span>
              <Play className="hidden group-hover:block play-button h-4 w-4 fill-current" />
            </>
          )}
        </div>

        {/* Title & Artist */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-10 w-10 overflow-hidden rounded shrink-0">
            <Image
              src={track.thumbnail}
              alt={track.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={`truncate font-medium ${
                isCurrentTrack ? 'text-godlike-green' : 'text-white'
              }`}
            >
              {track.title}
            </p>
            <p className="truncate text-sm text-dark-subdued">{track.artist}</p>
          </div>
        </div>

        {/* Album */}
        <div className="flex items-center min-w-0">
          {showAlbum && (
            <p className="truncate text-sm text-dark-subdued">
              {track.album || track.channelTitle || '-'}
            </p>
          )}
        </div>

        {/* Duration & Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={handleLike}
            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
              isSaved ? 'opacity-100 text-godlike-green' : 'text-dark-subdued hover:text-white'
            }`}
            aria-label={isSaved ? 'Unlike' : 'Like'}
          >
            <Heart
              className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
            />
          </button>
          <span className="text-sm text-dark-subdued w-12 text-right">
            {formatDuration(track.duration)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleContextMenu(e as any);
            }}
            className="opacity-0 group-hover:opacity-100 text-dark-subdued hover:text-white transition-opacity"
            aria-label="More Options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showContextMenu && (
        <ContextMenu
          track={track}
          position={contextMenuPosition}
          onClose={() => setShowContextMenu(false)}
        />
      )}
    </>
  );
}
