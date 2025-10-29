'use client';

import { useEffect, useRef, useState } from 'react';
import { X, List } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { formatDuration } from '../lib/utils';
import Image from 'next/image';

/**
 * YouTube IFrame API Player
 * This component handles the YouTube embed player in the right sidebar
 */
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function PlayerSidebar() {
  const {
    currentTrack,
    isPlaying,
    volume,
    setProgress,
    setDuration,
    nextTrack,
    queue,
    currentIndex,
  } = usePlayerStore();

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setPlayerReady(true);
      };
    } else {
      setPlayerReady(true);
    }
  }, []);

  // Initialize player
  useEffect(() => {
    if (playerReady && currentTrack && !playerRef.current) {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: currentTrack.videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume);
            const duration = event.target.getDuration();
            setDuration(duration);
            
            // Update progress
            progressIntervalRef.current = setInterval(() => {
              if (playerRef.current && playerRef.current.getCurrentTime) {
                const currentTime = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();
                const progress = (currentTime / duration) * 100;
                setProgress(progress);
              }
            }, 1000);
          },
          onStateChange: (event: any) => {
            // Auto-play next track when current ends
            if (event.data === window.YT.PlayerState.ENDED) {
              nextTrack();
            }
          },
        },
      });
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerReady, currentTrack]);

  // Handle play/pause
  useEffect(() => {
    if (playerRef.current && playerRef.current.playVideo) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  // Handle volume
  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  // Load new video
  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById && currentTrack) {
      playerRef.current.loadVideoById(currentTrack.videoId);
      const duration = playerRef.current.getDuration();
      setDuration(duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.videoId]);

  if (!currentTrack) return null;

  return (
    <div className="w-96 border-l border-dark-elevated bg-dark-surface flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-elevated p-4">
        <button
          onClick={() => setShowQueue(!showQueue)}
          className={`flex items-center gap-2 text-sm font-semibold ${showQueue ? 'text-godlike-green' : 'text-white'}`}
        >
          <List className="h-5 w-5" />
          {showQueue ? 'Now Playing' : 'Queue'}
        </button>
      </div>

      {/* Content */}
      {showQueue ? (
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold mb-4 text-dark-subdued">Up Next</h3>
          <div className="space-y-2">
            {queue.slice(currentIndex + 1).map((track, index) => (
              <div
                key={`${track.id}-${index}`}
                className="flex items-center gap-3 p-2 rounded hover:bg-dark-elevated"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded shrink-0">
                  <Image
                    src={track.thumbnail}
                    alt={track.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{track.title}</p>
                  <p className="truncate text-xs text-dark-subdued">{track.artist}</p>
                </div>
                <span className="text-xs text-dark-subdued shrink-0">
                  {formatDuration(track.duration)}
                </span>
              </div>
            ))}
            {queue.slice(currentIndex + 1).length === 0 && (
              <p className="text-sm text-dark-subdued text-center py-8">
                Queue is empty
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4">
          {/* YouTube Player */}
          <div className="aspect-video w-full mb-4 bg-black rounded overflow-hidden">
            <div id="youtube-player" className="w-full h-full"></div>
          </div>

          {/* Track Info */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-1">{currentTrack.title}</h3>
            <p className="text-sm text-dark-subdued">{currentTrack.artist}</p>
          </div>

          {/* Album Art (if available) */}
          <div className="relative aspect-square w-full rounded overflow-hidden">
            <Image
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
