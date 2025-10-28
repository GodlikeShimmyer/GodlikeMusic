import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Library from './pages/Library';
import Album from './pages/Album';
import Playlist from './pages/Playlist';
import LikedSongs from './pages/LikedSongs';
import Artist from './pages/Artist';
import PlayerBar from './components/PlayerBar';
import { mockSongs } from './data/mockSongs';

export default function App() {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 relative min-h-screen bg-gray-900">
          <Routes>
            <Route path="/" element={<Home setCurrentSong={setCurrentSong} />} />
            <Route path="/library" element={<Library setCurrentSong={setCurrentSong} />} />
            <Route path="/album/:id" element={<Album setCurrentSong={setCurrentSong} />} />
            <Route path="/playlist/:id" element={<Playlist setCurrentSong={setCurrentSong} />} />
            <Route path="/likedsongs" element={<LikedSongs setCurrentSong={setCurrentSong} />} />
            <Route path="/artist/:id" element={<Artist setCurrentSong={setCurrentSong} />} />
          </Routes>
        </div>
        <PlayerBar currentSong={currentSong} />
      </div>
    </Router>
  );
}
