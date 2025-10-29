'use client';

import { useState } from 'react';
import { useLibraryStore } from '@/app/store/useLibraryStore';
import TrackRow from '../TrackRow';
import AlbumCard from '../cards/AlbumCard';
import ArtistCard from '../cards/ArtistCard';

type LibraryTab = 'tracks' | 'albums' | 'artists';

export default function LibraryView() {
  const [activeTab, setActiveTab] = useState<LibraryTab>('tracks');
  const { savedTracks, savedAlbums, followedArtists } = useLibraryStore();

  const tabs: { id: LibraryTab; label: string; count: number }[] = [
    { id: 'tracks', label: 'Tracks', count: savedTracks.length },
    { id: 'albums', label: 'Albums', count: savedAlbums.length },
    { id: 'artists', label: 'Artists', count: followedArtists.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Your Library</h1>
        <p className="text-dark-subdued">All your saved music in one place</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-elevated">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-semibold transition-colors relative ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-dark-subdued hover:text-white'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 text-xs bg-dark-elevated px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-godlike-green" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'tracks' && (
          <div>
            {savedTracks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-dark-subdued">No saved tracks yet</p>
                <p className="text-sm text-dark-subdued mt-2">
                  Start saving your favorite tracks!
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {savedTracks.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    track={track}
                    index={index}
                    tracks={savedTracks}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'albums' && (
          <div>
            {savedAlbums.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-dark-subdued">No saved albums yet</p>
                <p className="text-sm text-dark-subdued mt-2">
                  Discover and save albums you love!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {savedAlbums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'artists' && (
          <div>
            {followedArtists.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-dark-subdued">No followed artists yet</p>
                <p className="text-sm text-dark-subdued mt-2">
                  Follow artists to keep up with their music!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {followedArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
