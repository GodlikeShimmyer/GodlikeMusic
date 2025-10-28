import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Play, MoreHorizontal, Clock } from 'lucide-react';
import TrackRow from '../components/tracks/TrackRow';

export default function Album() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const { data: album } = useQuery({
    queryKey: ['album', id],
    queryFn: async () => {
      const albums = await base44.entities.Album.list();
      return albums.find((a) => a.id === id);
    },
  });

  const { data: allTracks = [] } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => base44.entities.Track.list(),
  });

  if (!album) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">Album not found</p>
      </div>
    );
  }

  const albumTracks = allTracks.filter((track) => track.album_id === album.id);

  const totalDuration = albumTracks.reduce((sum, track) => sum + (track.duration || 0), 0);
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-900 to-black">
      <div className="flex items-end gap-6 p-8 pb-6">
        <img
          src={album.cover_url}
          alt={album.title}
          className="w-60 h-60 shadow-2xl rounded-lg"
        />
        <div>
          <p className="text-sm font-semibold uppercase">Album</p>
          <h1 className="text-6xl font-bold my-4">{album.title}</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{album.artist}</span>
            <span>•</span>
            <span>{album.year}</span>
            <span>•</span>
            <span>{albumTracks.length} songs</span>
            {totalDuration > 0 && (
              <>
                <span>•</span>
                <span>{formatDuration(totalDuration)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 px-8 py-6 bg-black/20 backdrop-blur-md">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 hover:bg-green-400 transition-all">
          <Play fill="black" className="text-black ml-1" size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal size={32} />
        </button>
      </div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-[16px_4fr_1fr] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
          <div>#</div>
          <div>TITLE</div>
          <div className="flex justify-end">
            <Clock size={16} />
          </div>
        </div>

        <div className="mt-4 space-y-1">
          {albumTracks.map((track, index) => (
            <TrackRow key={track.id} track={track} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
