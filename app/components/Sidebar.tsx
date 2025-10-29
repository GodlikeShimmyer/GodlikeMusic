'use client';

import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';
import { useLibraryStore } from '../store/useLibraryStore';
import { cn } from '../lib/utils';
import Logo from './Logo';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: 'home' | 'search' | 'library' | 'playlist') => void;
  onPlaylistSelect: (playlistId: string) => void;
}

export default function Sidebar({ currentView, onViewChange, onPlaylistSelect }: SidebarProps) {
  const playlists = useLibraryStore((state) => state.playlists);
  const createPlaylist = useLibraryStore((state) => state.createPlaylist);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  const handleCreatePlaylist = () => {
    const name = `My Playlist #${playlists.length}`;
    const newPlaylist = createPlaylist(name, 'Created with GodlikeMusic');
    onPlaylistSelect(newPlaylist.id);
  };

  return (
    <div className="flex w-64 flex-col bg-black p-6">
      {/* Logo */}
      <div className="mb-8">
        <Logo />
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-4 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as any)}
              className={cn(
                'flex items-center gap-4 text-sm font-semibold transition-colors',
                isActive ? 'text-white' : 'text-dark-subdued hover:text-white'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-6 w-6" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Create Playlist Button */}
      <button
        onClick={handleCreatePlaylist}
        className="flex items-center gap-4 text-sm font-semibold text-dark-subdued transition-colors hover:text-white mb-4"
        aria-label="Create Playlist"
      >
        <PlusSquare className="h-6 w-6" />
        <span>Create Playlist</span>
      </button>

      {/* Liked Songs */}
      <button
        onClick={() => onPlaylistSelect('liked-songs')}
        className="flex items-center gap-4 text-sm font-semibold text-dark-subdued transition-colors hover:text-white mb-6"
        aria-label="Liked Songs"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-gradient-to-br from-purple-700 to-blue-300">
          <Heart className="h-3 w-3 fill-white text-white" />
        </div>
        <span>Liked Songs</span>
      </button>

      {/* Divider */}
      <div className="border-t border-dark-elevated mb-4" />

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {playlists
            .filter((p) => p.id !== 'liked-songs')
            .map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => onPlaylistSelect(playlist.id)}
                className="text-left text-sm text-dark-subdued transition-colors hover:text-white truncate"
                title={playlist.name}
              >
                {playlist.name}
              </button>
            ))}
        </div>
      </div>

      {/* Legal Notice */}
      <div className="mt-4 text-xs text-dark-subdued border-t border-dark-elevated pt-4">
        <p className="mb-2">
          Powered by YouTube Data API
        </p>
        <p>
          Please comply with{' '}
          <a
            href="https://www.youtube.com/t/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-godlike-cyan hover:underline"
          >
            YouTube ToS
          </a>
        </p>
      </div>
    </div>
  );
}
