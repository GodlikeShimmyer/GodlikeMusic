// Core types for GodlikeMusic

export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  album?: string;
  albumId?: string;
  duration: number; // in seconds
  thumbnail: string;
  videoId: string;
  channelId?: string;
  channelTitle?: string;
  addedAt?: Date;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  tracks: Track[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  thumbnail: string;
  tracks: Track[];
  year?: number;
  saved?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  thumbnail?: string;
  followers?: number;
  followed?: boolean;
}

export interface SearchResult {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
}

export interface PlaybackState {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  history: Track[];
  currentIndex: number;
  volume: number;
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';
  progress: number; // 0-100
  duration: number; // in seconds
}

export interface UserLibrary {
  savedTracks: Track[];
  savedAlbums: Album[];
  followedArtists: Artist[];
  playlists: Playlist[];
}

export interface YouTubeSearchResponse {
  items: Array<{
    id: {
      kind: string;
      videoId?: string;
      channelId?: string;
      playlistId?: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
      channelTitle: string;
      channelId: string;
      publishedAt: string;
    };
  }>;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubeVideoResponse {
  items: Array<{
    id: string;
    snippet: {
      title: string;
      description: string;
      channelId: string;
      channelTitle: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
    contentDetails: {
      duration: string; // ISO 8601 format
    };
  }>;
}
