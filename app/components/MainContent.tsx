'use client';

import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import LibraryView from './views/LibraryView';
import PlaylistView from './views/PlaylistView';

interface MainContentProps {
  view: 'home' | 'search' | 'library' | 'playlist';
  playlistId?: string | null;
}

export default function MainContent({ view, playlistId }: MainContentProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-dark-elevated to-dark-bg">
      <div className="min-h-full p-8">
        {view === 'home' && <HomeView />}
        {view === 'search' && <SearchView />}
        {view === 'library' && <LibraryView />}
        {view === 'playlist' && playlistId && <PlaylistView playlistId={playlistId} />}
      </div>
    </main>
  );
}
