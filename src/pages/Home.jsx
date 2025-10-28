import React, { useState } from 'react';
import AlbumCard from '../components/AlbumCard';
import PlaylistCard from '../components/PlaylistCard';
import { mockSongs, mockPlaylists } from '../data/mockSongs';

export default function Home({ setCurrentSong }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = mockSongs.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search songs, artists..."
        className="w-full p-3 rounded bg-gray-800 text-white mb-6"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h2 className="text-xl font-bold mb-4">Recommended</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {mockPlaylists.map((p) => (
          <PlaylistCard key={p.id} playlist={p} setCurrentSong={setCurrentSong} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Trending Songs</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredSongs.map((song) => (
          <AlbumCard
