import React from 'react';
import { useParams } from 'react-router-dom';
import PlaylistCard from '../components/PlaylistCard';
import { mockPlaylists } from '../data/mockSongs';

export default function Playlist({ setCurrentSong }) {
  const { id } = useParams();
  const playlist = mockPlaylists.find((p) => p.id === id);

  if (!playlist) return <p className="p-6 text-white">Playlist not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-4">{playlist.name}</h1>
      <div className="grid grid-cols-1 gap-3">
        {playlist.songs.map((song, idx) => (
          <div
            key={song.id}
            className="flex items-center gap-4 p-3 rounded hover:bg-gray-800 cursor-pointer text-white"
            onClick={() => setCurrentSong(song)}
          >
            <span>{idx + 1}</span>
            <img
              src={song.cover_image}
              alt={song.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <h4>{song.title}</h4>
              <p className="text-gray-400 text-sm">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
