'use client';

import { seedPlaylists, seedAlbums, seedArtists } from '@/app/lib/seedData';
import PlaylistCard from '../cards/PlaylistCard';
import AlbumCard from '../cards/AlbumCard';
import ArtistCard from '../cards/ArtistCard';

export default function HomeView() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-lg bg-gradient-godlike p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome to GodlikeMusic</h1>
        <p className="text-lg opacity-90">
          Discover millions of songs, create playlists, and enjoy your music
        </p>
      </div>

      {/* Featured Playlists */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {seedPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <h2 className="text-2xl font-bold mb-4">New Releases</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {seedAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Artists</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {seedArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
}
