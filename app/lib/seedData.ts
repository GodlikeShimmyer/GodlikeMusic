import { Track, Playlist, Album, Artist } from '@/app/types';

/**
 * Seed data for GodlikeMusic
 * These are sample tracks, playlists, albums, and artists to populate the UI
 * when YouTube API quota is limited or for initial demo purposes.
 * 
 * Note: Video IDs are examples and should be replaced with actual working IDs
 */

export const seedTracks: Track[] = [
  {
    id: 'seed-1',
    title: 'Electronic Dreams',
    artist: 'Synthwave Studio',
    album: 'Neon Nights',
    duration: 245,
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    videoId: 'dQw4w9WgXcQ',
    channelId: 'UC38IQsAvIsxxjztdMZQtwHA',
    channelTitle: 'Synthwave Studio',
  },
  {
    id: 'seed-2',
    title: 'Chill Vibes',
    artist: 'Lo-Fi Beats',
    album: 'Study Sessions',
    duration: 189,
    thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
    videoId: 'jfKfPfyJRdk',
    channelId: 'UC_aEa8K-EOJ3D6gOs7HcyNg',
    channelTitle: 'Lo-Fi Beats',
  },
  {
    id: 'seed-3',
    title: 'Epic Journey',
    artist: 'Orchestral Masters',
    album: 'Cinematic Scores',
    duration: 312,
    thumbnail: 'https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg',
    videoId: 'ScMzIvxBSi4',
    channelId: 'UCRjHm_1T7gPt8LfDcOm2-5A',
    channelTitle: 'Orchestral Masters',
  },
  {
    id: 'seed-4',
    title: 'Summer Breeze',
    artist: 'Acoustic Souls',
    album: 'Natural Vibes',
    duration: 198,
    thumbnail: 'https://i.ytimg.com/vi/ZbZSe6N_BXs/hqdefault.jpg',
    videoId: 'ZbZSe6N_BXs',
    channelId: 'UC-9-kyTW8ZkZNDHQJ6FgpwQ',
    channelTitle: 'Acoustic Souls',
  },
  {
    id: 'seed-5',
    title: 'Night Drive',
    artist: 'Midnight Runner',
    album: 'Urban Lights',
    duration: 267,
    thumbnail: 'https://i.ytimg.com/vi/y6120QOlsfU/hqdefault.jpg',
    videoId: 'y6120QOlsfU',
    channelId: 'UCXuqSBlHAE6Xw-yeJA0Tunw',
    channelTitle: 'Midnight Runner',
  },
];

export const seedPlaylists: Playlist[] = [
  {
    id: 'featured-1',
    name: 'Today\'s Top Hits',
    description: 'The most played songs right now',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    tracks: seedTracks.slice(0, 3),
    isPublic: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    owner: 'GodlikeMusic',
  },
  {
    id: 'featured-2',
    name: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits',
    thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
    tracks: [seedTracks[1], seedTracks[3]],
    isPublic: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    owner: 'GodlikeMusic',
  },
  {
    id: 'featured-3',
    name: 'Epic Soundtracks',
    description: 'Cinematic and orchestral masterpieces',
    thumbnail: 'https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg',
    tracks: [seedTracks[2]],
    isPublic: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
    owner: 'GodlikeMusic',
  },
  {
    id: 'featured-4',
    name: 'Night Vibes',
    description: 'Perfect music for late night sessions',
    thumbnail: 'https://i.ytimg.com/vi/y6120QOlsfU/hqdefault.jpg',
    tracks: [seedTracks[4], seedTracks[0]],
    isPublic: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(),
    owner: 'GodlikeMusic',
  },
];

export const seedAlbums: Album[] = [
  {
    id: 'album-1',
    title: 'Neon Nights',
    artist: 'Synthwave Studio',
    artistId: 'artist-1',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    tracks: [seedTracks[0]],
    year: 2024,
    saved: false,
  },
  {
    id: 'album-2',
    title: 'Study Sessions',
    artist: 'Lo-Fi Beats',
    artistId: 'artist-2',
    thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
    tracks: [seedTracks[1]],
    year: 2023,
    saved: false,
  },
  {
    id: 'album-3',
    title: 'Cinematic Scores',
    artist: 'Orchestral Masters',
    artistId: 'artist-3',
    thumbnail: 'https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg',
    tracks: [seedTracks[2]],
    year: 2024,
    saved: false,
  },
];

export const seedArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Synthwave Studio',
    thumbnail: 'https://yt3.ggpht.com/ytc/default_100x100.jpg',
    followers: 150000,
    followed: false,
  },
  {
    id: 'artist-2',
    name: 'Lo-Fi Beats',
    thumbnail: 'https://yt3.ggpht.com/ytc/default_100x100.jpg',
    followers: 280000,
    followed: false,
  },
  {
    id: 'artist-3',
    name: 'Orchestral Masters',
    thumbnail: 'https://yt3.ggpht.com/ytc/default_100x100.jpg',
    followers: 95000,
    followed: false,
  },
  {
    id: 'artist-4',
    name: 'Acoustic Souls',
    thumbnail: 'https://yt3.ggpht.com/ytc/default_100x100.jpg',
    followers: 72000,
    followed: false,
  },
  {
    id: 'artist-5',
    name: 'Midnight Runner',
    thumbnail: 'https://yt3.ggpht.com/ytc/default_100x100.jpg',
    followers: 125000,
    followed: false,
  },
];

/**
 * Featured sections for the home page
 */
export const featuredSections = [
  {
    title: 'Featured Playlists',
    items: seedPlaylists,
  },
  {
    title: 'New Releases',
    items: seedAlbums,
  },
  {
    title: 'Popular Artists',
    items: seedArtists,
  },
];

/**
 * Simple recommendation algorithm based on a seed track
 * In production, this would use more sophisticated algorithms
 */
export function getRecommendations(seedTrack: Track, allTracks: Track[] = seedTracks): Track[] {
  // For demo purposes, return random tracks excluding the seed
  return allTracks
    .filter(t => t.id !== seedTrack.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
}

/**
 * Build a radio station from a track (similar songs)
 */
export function buildRadio(seedTrack: Track, allTracks: Track[] = seedTracks): Track[] {
  // Simple implementation: find tracks from same artist or similar keywords
  const radio = allTracks.filter(t => 
    t.id !== seedTrack.id && 
    (t.artist === seedTrack.artist || t.channelId === seedTrack.channelId)
  );
  
  // If not enough tracks from same artist, add random ones
  if (radio.length < 20) {
    const additional = allTracks
      .filter(t => t.id !== seedTrack.id && !radio.includes(t))
      .sort(() => Math.random() - 0.5)
      .slice(0, 20 - radio.length);
    radio.push(...additional);
  }
  
  return [seedTrack, ...radio];
}
