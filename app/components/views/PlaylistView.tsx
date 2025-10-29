'use client';

import { useLibraryStore } from '@/app/store/useLibraryStore';
import { usePlayerStore } from '@/app/store/usePlayerStore';
import TrackRow from '../TrackRow';
import { Play, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { formatDate } from '@/app/lib/utils';

interface PlaylistViewProps {
  playlistId: string;
}

export default function PlaylistView({ playlistId }: PlaylistViewProps) {
  const playlist = useLibraryStore((state) =>
    state.playlists.find((p) => p.id === playlistId)
  );
  const playTrackList = usePlayerStore((state) => state.playTrackList);

  if (!playlist) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-subdued">Playlist not found</p>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      playTrackList(playlist.tracks, 0);
    }
  };

  const totalDuration = playlist.tracks.reduce((acc, track) => acc + track.duration, 0);
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <div className="space-y-6">
      {/* Playlist Header */}
      <div className="flex items-end gap-6">
        {/* Playlist Cover */}
        <div className="relative h-56 w-56 overflow-hidden rounded shadow-lg shrink-0 bg-gradient-godlike">
          {playlist.thumbnail ? (
            <Image
              src={playlist.thumbnail}
              alt={playlist.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-white">
              {playlist.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Playlist Info */}
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase">Playlist</p>
          <h1 className="text-5xl font-bold my-4">{playlist.name}</h1>
          {playlist.description && (
            <p className="text-sm text-dark-subdued mb-4">{playlist.description}</p>
          )}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{playlist.owner}</span>
            <span className="text-dark-subdued">•</span>
            <span className="text-dark-subdued">{playlist.tracks.length} songs</span>
            {totalDuration > 0 && (
              <>
                <span className="text-dark-subdued">•</span>
                <span className="text-dark-subdued">
                  {hours > 0 && `${hours} hr `}
                  {minutes} min
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayAll}
          disabled={playlist.tracks.length === 0}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-godlike-green text-black shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Play All"
        >
          <Play className="h-6 w-6 fill-current" />
        </button>
        <button
          className="text-dark-subdued hover:text-white"
          aria-label="More Options"
        >
          <MoreHorizontal className="h-8 w-8" />
        </button>
      </div>

      {/* Track List */}
      <div>
        {playlist.tracks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dark-subdued">No tracks in this playlist yet</p>
            <p className="text-sm text-dark-subdued mt-2">
              Search for music and add tracks to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-dark-subdued border-b border-dark-elevated">
              <div>#</div>
              <div>Title</div>
              <div>Album</div>
              <div className="text-right">Duration</div>
            </div>

            {/* Tracks */}
            {playlist.tracks.map((track, index) => (
              <TrackRow
                key={`${track.id}-${index}`}
                track={track}
                index={index}
                tracks={playlist.tracks}
                showAlbum
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
