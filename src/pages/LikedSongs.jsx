import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Heart, Clock } from 'lucide-react';
import TrackRow from '../components/tracks/TrackRow';

export default function LikedSongs() {
  const { data: likedTracks = [] } = useQuery({
    queryKey: ['likedTracks'],
    queryFn: () => base44.entities.LikedTrack.list(),
  });

  const { data: allTracks = [] } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => base44.entities.Track.list(),
  });

  const tracks = allTracks.filter((track) =>
    likedTracks.some((liked) => liked.track_id === track.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black">
      <div className="flex items-end gap-6 p-8 pb-6">
        <div className="w-60 h-60 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shadow-2xl rounded-lg">
          <Heart fill="white" className="text-white" size={80} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase">Playlist</p>
          <h1 className="text-6xl font-bold my-4">Liked Songs</h1>
          <p className="text-sm">
            <span className="font-semibold">GodlikeMusic</span> • {tracks.length} songs
          </p>
        </div>
      </div>

      <div className="px-8 pb-8">
        {tracks.length > 0 ? (
          <>
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
              <div>#</div>
              <div>TITLE</div>
              <div>ALBUM</div>
              <div className="flex justify-end">
                <Clock size={16} />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              {tracks.map((track, index) => (
                <TrackRow key={track.id} track={track} index={index} showAlbum />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No liked songs yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Start liking songs to build your collection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
