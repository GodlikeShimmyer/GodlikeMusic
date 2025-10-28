import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Search as SearchIcon } from 'lucide-react';
import TrackRow from '../components/tracks/TrackRow';
import PlaylistCard from '../components/cards/PlaylistCard';
import AlbumCard from '../components/cards/AlbumCard';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const { data: tracks = [] } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => base44.entities.Track.list(),
  });

  const { data: albums = [] } = useQuery({
    queryKey: ['albums'],
    queryFn: () => base44.entities.Album.list(),
  });

  const { data: playlists = [] } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => base44.entities.Playlist.list(),
  });

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Tracks', value: 'tracks' },
    { name: 'Albums', value: 'albums' },
    { name: 'Playlists', value: 'playlists' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="max-w-2xl mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-black rounded-full py-3 pl-14 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      {!searchQuery ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Pop', 'Hip-Hop', 'Rock', 'Electronic', 'Jazz', 'Classical', 'R&B', 'Country'].map(
              (category, index) => (
                <div
                  key={category}
                  className="aspect-square rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform"
                  style={{
                    background: [
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                    ][index % 8],
                  }}
                >
                  <h3 className="text-2xl font-bold">{category}</h3>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex gap-3 mb-8 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveTab(category.value)}
                className={`px-6 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                  activeTab === category.value
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {(activeTab === 'all' || activeTab === 'tracks') && filteredTracks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Tracks</h2>
              <div className="space-y-2">
                {filteredTracks.map((track, index) => (
                  <TrackRow key={track.id} track={track} index={index} />
                ))}
              </div>
            </section>
          )}

          {(activeTab === 'all' || activeTab === 'albums') && filteredAlbums.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredAlbums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            </section>
          )}

          {(activeTab === 'all' || activeTab === 'playlists') && filteredPlaylists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
          )}

          {filteredTracks.length === 0 &&
            filteredAlbums.length === 0 &&
            filteredPlaylists.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400">No results found for "{searchQuery}"</p>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
