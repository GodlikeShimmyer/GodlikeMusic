import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Track, PlaybackState } from '@/app/types';
import { shuffleArray } from '@/app/lib/utils';

interface PlayerStore extends PlaybackState {
  // Actions
  setCurrentTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  playTrackList: (tracks: Track[], startIndex?: number) => void;
  seekTo: (seconds: number) => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTrack: null,
      isPlaying: false,
      queue: [],
      history: [],
      currentIndex: 0,
      volume: 80,
      shuffle: false,
      repeat: 'off',
      progress: 0,
      duration: 0,

      // Actions
      setCurrentTrack: (track) => {
        const { currentTrack, history } = get();
        const newHistory = currentTrack ? [...history, currentTrack] : history;
        
        set({
          currentTrack: track,
          history: newHistory.slice(-50), // Keep last 50 tracks
          isPlaying: true,
          progress: 0,
        });
      },

      play: () => set({ isPlaying: true }),

      pause: () => set({ isPlaying: false }),

      togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

      nextTrack: () => {
        const { queue, currentIndex, repeat, currentTrack, shuffle: isShuffled } = get();
        
        if (repeat === 'one') {
          set({ progress: 0 });
          return;
        }

        let nextIndex = currentIndex + 1;

        if (nextIndex >= queue.length) {
          if (repeat === 'all') {
            nextIndex = 0;
          } else {
            set({ isPlaying: false });
            return;
          }
        }

        const nextTrack = queue[nextIndex];
        if (nextTrack) {
          const { history } = get();
          const newHistory = currentTrack ? [...history, currentTrack] : history;
          
          set({
            currentTrack: nextTrack,
            currentIndex: nextIndex,
            history: newHistory.slice(-50),
            progress: 0,
            isPlaying: true,
          });
        }
      },

      previousTrack: () => {
        const { queue, currentIndex, history, progress } = get();
        
        // If progress > 3 seconds, restart current track
        if (progress > 3) {
          set({ progress: 0 });
          return;
        }

        // Go to previous track in queue
        if (currentIndex > 0) {
          const prevTrack = queue[currentIndex - 1];
          set({
            currentTrack: prevTrack,
            currentIndex: currentIndex - 1,
            progress: 0,
            isPlaying: true,
          });
        } else if (history.length > 0) {
          // Go to last track in history
          const lastHistoryTrack = history[history.length - 1];
          set({
            currentTrack: lastHistoryTrack,
            history: history.slice(0, -1),
            progress: 0,
            isPlaying: true,
          });
        }
      },

      setVolume: (volume) => set({ volume: Math.max(0, Math.min(100, volume)) }),

      toggleShuffle: () => {
        const { shuffle, queue, currentIndex } = get();
        
        if (!shuffle) {
          // Enable shuffle - randomize queue except current track
          const currentTrack = queue[currentIndex];
          const otherTracks = queue.filter((_, i) => i !== currentIndex);
          const shuffled = shuffleArray(otherTracks);
          const newQueue = currentTrack ? [currentTrack, ...shuffled] : shuffled;
          
          set({
            shuffle: true,
            queue: newQueue,
            currentIndex: 0,
          });
        } else {
          // Disable shuffle - restore original order (note: original order is lost, this is a limitation)
          set({ shuffle: false });
        }
      },

      toggleRepeat: () => {
        const { repeat } = get();
        const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
        const currentModeIndex = modes.indexOf(repeat);
        const nextMode = modes[(currentModeIndex + 1) % modes.length];
        set({ repeat: nextMode });
      },

      setProgress: (progress) => set({ progress: Math.max(0, Math.min(100, progress)) }),

      setDuration: (duration) => set({ duration }),

      addToQueue: (track) => {
        const { queue } = get();
        set({ queue: [...queue, track] });
      },

      removeFromQueue: (index) => {
        const { queue, currentIndex } = get();
        const newQueue = queue.filter((_, i) => i !== index);
        const newCurrentIndex = index < currentIndex ? currentIndex - 1 : currentIndex;
        set({ queue: newQueue, currentIndex: newCurrentIndex });
      },

      clearQueue: () => set({ queue: [], currentIndex: 0 }),

      playTrackList: (tracks, startIndex = 0) => {
        const track = tracks[startIndex];
        if (track) {
          set({
            queue: tracks,
            currentTrack: track,
            currentIndex: startIndex,
            isPlaying: true,
            progress: 0,
          });
        }
      },

      seekTo: (seconds) => {
        const { duration } = get();
        const progress = (seconds / duration) * 100;
        set({ progress: Math.max(0, Math.min(100, progress)) });
      },
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        volume: state.volume,
        shuffle: state.shuffle,
        repeat: state.repeat,
      }),
    }
  )
);
