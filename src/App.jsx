import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';

import Home from './pages/Home';
import Album from './pages/Album';
import Playlist from './pages/Playlist';
import Artist from './pages/Artist';
import LikedSongs from './pages/LikedSongs';

export default function App() {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home setCurrentSong={setCurrentSong} />} />
            <Route path="/album/:id" element={<Album setCurrentSong={setCurrentSong} />} />
            <Route path="/playlist/:id" element={<Playlist setCurrentSong={setCurrentSong} />} />
            <Route path="/artist/:id" element={<Artist setCurrentSong={setCurrentSong} />} />
            <Route path="/likedsongs" element={<LikedSongs setCurrentSong={setCurrentSong} />} />
          </Routes>
        </div>
        <PlayerBar currentSong={currentSong} setCurrentSong={setCurrentSong} />
      </div>
    </div>
  );
}
