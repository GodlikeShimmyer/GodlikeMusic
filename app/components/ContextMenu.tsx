'use client';

import { useEffect, useRef } from 'react';
import { Track } from '@/app/types';
import { useLibraryStore } from '@/app/store/useLibraryStore';
import { usePlayerStore } from '@/app/store/usePlayerStore';
import { Heart, ListPlus, Share2, Radio } from 'lucide-react';

interface ContextMenuProps {
  track: Track;
  position: { x: number; y: number };
  onClose: () => void;
}

export default function ContextMenu({ track, position, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { playlists, addTrackToPlaylist, isTrackSaved, saveTrack, unsaveTrack } = useLibraryStore();
  const { addToQueue } = usePlayerStore();
  const isSaved = isTrackSaved(track.id);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleSave = () => {
    if (isSaved) {
      unsaveTrack(track.id);
    } else {
      saveTrack(track);
    }
    onClose();
  };

  const handleAddToQueue = () => {
    addToQueue(track);
    onClose();
  };

  const handleAddToPlaylist = (playlistId: string) => {
    addTrackToPlaylist(playlistId, track);
    onClose();
  };

  const handleShare = () => {
    const url = `https://www.youtube.com/watch?v=${track.videoId}`;
    if (navigator.share) {
      navigator.share({
        title: track.title,
        text: `Check out ${track.title} by ${track.artist}`,
        url: url,
      }).catch(() => {
        // Fallback to copy
        navigator.clipboard.writeText(url);
      });
    } else {
      navigator.clipboard.writeText(url);
    }
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="context-menu fixed z-50 min-w-[200px] rounded-md bg-dark-elevated shadow-lg py-2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <button
        onClick={handleSave}
        className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-dark-highlight"
      >
        <Heart className={`h-4 w-4 ${isSaved ? 'fill-current text-godlike-green' : ''}`} />
        {isSaved ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
      </button>

      <button
        onClick={handleAddToQueue}
        className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-dark-highlight"
      >
        <ListPlus className="h-4 w-4" />
        Add to Queue
      </button>

      <div className="border-t border-dark-surface my-2" />

      <div className="px-4 py-2 text-xs text-dark-subdued uppercase font-semibold">
        Add to Playlist
      </div>

      <div className="max-h-48 overflow-y-auto">
        {playlists.map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => handleAddToPlaylist(playlist.id)}
            className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-dark-highlight"
          >
            <ListPlus className="h-4 w-4" />
            {playlist.name}
          </button>
        ))}
      </div>

      <div className="border-t border-dark-surface my-2" />

      <button
        onClick={handleShare}
        className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-dark-highlight"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}
