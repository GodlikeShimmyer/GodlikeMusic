'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PlayerBar from './components/PlayerBar';
import PlayerSidebar from './components/PlayerSidebar';
import { usePlayerStore } from './store/usePlayerStore';

/**
 * Main App Page
 * Layout: Sidebar | MainContent | PlayerSidebar (conditional)
 * Bottom: PlayerBar
 */
export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'library' | 'playlist'>('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  return (
    <div className="flex h-screen flex-col bg-dark-bg text-white">
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          onPlaylistSelect={(id) => {
            setSelectedPlaylistId(id);
            setCurrentView('playlist');
          }}
        />

        {/* Main Content Area */}
        <MainContent
          view={currentView}
          playlistId={selectedPlaylistId}
        />

        {/* Right Player Sidebar (visible when track is playing) */}
        {currentTrack && <PlayerSidebar />}
      </div>

      {/* Bottom Player Bar */}
      <PlayerBar />
    </div>
  );
}
