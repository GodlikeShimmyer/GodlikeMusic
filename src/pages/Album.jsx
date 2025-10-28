import React from 'react';
import { useParams } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';
import { mockSongs } from '../data/mockSongs';

export default function Album({ setCurrentSong }) {
  const { id } = useParams();
  const albumSongs = mockSongs.filter((s) => s.albumId === id);

  if (!albumSongs.length) return <p className="p-6 text-white">Album not found</p>;

  return (
    <div className="p-6">
      <div className="flex gap-6 mb-6">
        <img
          src={albumSongs[0].cover_image}
          alt={albumSongs[0].album}
          className="w-48 h-48 object-cover rounded"
        />
        <div className="text-white">
          <h1 className="text-3xl font-bold">{albumSongs[0].album}</h1>
          <p className="mt-2 text-gray-400">{albumSongs[0].artist}</p>
          <p className="mt-2 text-gray-400">{albumSongs.length} songs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {albumSongs.map((song, index) => (
          <div
            key={song.id}
            className="flex items-center gap-4 p-3 rounded hover:bg-gray-800 cursor-pointer text-white"
            onClick={() => setCurrentSong(song)}
          >
            <span>{index + 1}</span>
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
