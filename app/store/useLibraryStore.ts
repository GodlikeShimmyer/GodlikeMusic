import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Track, Playlist, Album, Artist, UserLibrary } from '@/app/types';
import { generateId } from '@/app/lib/utils';

interface LibraryStore extends UserLibrary {
  // Saved Tracks
  saveTrack: (track: Track) => void;
  unsaveTrack: (trackId: string) => void;
  isTrackSaved: (trackId: string) => boolean;

  // Saved Albums
  saveAlbum: (album: Album) => void;
  unsaveAlbum: (albumId: string) => void;
  isAlbumSaved: (albumId: string) => boolean;

  // Followed Artists
  followArtist: (artist: Artist) => void;
  unfollowArtist: (artistId: string) => void;
  isArtistFollowed: (artistId: string) => boolean;

  // Playlists
  createPlaylist: (name: string, description?: string, isPublic?: boolean) => Playlist;
  deletePlaylist: (playlistId: string) => void;
  updatePlaylist: (playlistId: string, updates: Partial<Playlist>) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  getPlaylist: (playlistId: string) => Playlist | undefined;
}

// Seed data for initial playlists
const seedPlaylists: Playlist[] = [
  {
    id: 'liked-songs',
    name: 'Liked Songs',
    description: 'Your favorite tracks',
    tracks: [],
    isPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: 'user',
  },
];

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set, get) => ({
      // Initial state
      savedTracks: [],
      savedAlbums: [],
      followedArtists: [],
      playlists: seedPlaylists,

      // Saved Tracks
      saveTrack: (track) => {
        const { savedTracks } = get();
        const trackWithDate = { ...track, addedAt: new Date() };
        
        if (!savedTracks.find((t) => t.id === track.id)) {
          set({ savedTracks: [trackWithDate, ...savedTracks] });
        }
      },

      unsaveTrack: (trackId) => {
        const { savedTracks } = get();
        set({ savedTracks: savedTracks.filter((t) => t.id !== trackId) });
      },

      isTrackSaved: (trackId) => {
        const { savedTracks } = get();
        return savedTracks.some((t) => t.id === trackId);
      },

      // Saved Albums
      saveAlbum: (album) => {
        const { savedAlbums } = get();
        const albumWithSaved = { ...album, saved: true };
        
        if (!savedAlbums.find((a) => a.id === album.id)) {
          set({ savedAlbums: [albumWithSaved, ...savedAlbums] });
        }
      },

      unsaveAlbum: (albumId) => {
        const { savedAlbums } = get();
        set({ savedAlbums: savedAlbums.filter((a) => a.id !== albumId) });
      },

      isAlbumSaved: (albumId) => {
        const { savedAlbums } = get();
        return savedAlbums.some((a) => a.id === albumId);
      },

      // Followed Artists
      followArtist: (artist) => {
        const { followedArtists } = get();
        const artistWithFollowed = { ...artist, followed: true };
        
        if (!followedArtists.find((a) => a.id === artist.id)) {
          set({ followedArtists: [artistWithFollowed, ...followedArtists] });
        }
      },

      unfollowArtist: (artistId) => {
        const { followedArtists } = get();
        set({ followedArtists: followedArtists.filter((a) => a.id !== artistId) });
      },

      isArtistFollowed: (artistId) => {
        const { followedArtists } = get();
        return followedArtists.some((a) => a.id === artistId);
      },

      // Playlists
      createPlaylist: (name, description = '', isPublic = true) => {
        const { playlists } = get();
        const newPlaylist: Playlist = {
          id: generateId(),
          name,
          description,
          tracks: [],
          isPublic,
          createdAt: new Date(),
          updatedAt: new Date(),
          owner: 'user',
        };
        
        set({ playlists: [...playlists, newPlaylist] });
        return newPlaylist;
      },

      deletePlaylist: (playlistId) => {
        const { playlists } = get();
        // Prevent deletion of "Liked Songs"
        if (playlistId === 'liked-songs') return;
        
        set({ playlists: playlists.filter((p) => p.id !== playlistId) });
      },

      updatePlaylist: (playlistId, updates) => {
        const { playlists } = get();
        set({
          playlists: playlists.map((p) =>
            p.id === playlistId
              ? { ...p, ...updates, updatedAt: new Date() }
              : p
          ),
        });
      },

      addTrackToPlaylist: (playlistId, track) => {
        const { playlists } = get();
        const trackWithDate = { ...track, addedAt: new Date() };
        
        set({
          playlists: playlists.map((p) => {
            if (p.id === playlistId) {
              // Check if track already exists
              if (p.tracks.find((t) => t.id === track.id)) {
                return p;
              }
              return {
                ...p,
                tracks: [...p.tracks, trackWithDate],
                updatedAt: new Date(),
              };
            }
            return p;
          }),
        });
      },

      removeTrackFromPlaylist: (playlistId, trackId) => {
        const { playlists } = get();
        set({
          playlists: playlists.map((p) =>
            p.id === playlistId
              ? {
                  ...p,
                  tracks: p.tracks.filter((t) => t.id !== trackId),
                  updatedAt: new Date(),
                }
              : p
          ),
        });
      },

      getPlaylist: (playlistId) => {
        const { playlists } = get();
        return playlists.find((p) => p.id === playlistId);
      },
    }),
    {
      name: 'library-storage',
    }
  )
);
