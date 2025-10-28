import React, { useState } from 'react';
import { mockSongs } from '../data/mockSongs';

export default function LikedSongs({ setCurrentSong }) {
  const likedSongs = mockSongs.filter((s) => s.liked);

  if (!likedSongs.length)
    return <p className="p-6 text-white">You haven't liked any songs yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-4">Liked Songs</h1>
      <div className="grid grid-cols-1 gap-3">
        {likedSongs.map((song, idx) => (
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
