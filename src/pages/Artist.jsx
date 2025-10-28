import React from 'react';
import { useParams } from 'react-router-dom';
import { mockSongs } from '../data/mockSongs';

export default function Artist({ setCurrentSong }) {
  const { id } = useParams();
  const artistSongs = mockSongs.filter((s) => s.artistId === id);

  if (!artistSongs.length) return <p className="p-6 text-white">Artist not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-4">{artistSongs[0].artist}</h1>
      <div className="grid grid-cols-1 gap-3">
        {artistSongs.map((song, idx) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
