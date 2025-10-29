'use client';

import { usePlayerStore } from '../store/usePlayerStore';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Volume2, VolumeX } from 'lucide-react';
import { formatDuration } from '../lib/utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    volume,
    shuffle,
    repeat,
    progress,
    duration,
    togglePlayPause,
    nextTrack,
    previousTrack,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    seekTo,
  } = usePlayerStore();

  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handleVolumeToggle = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    const newSeconds = (newProgress / 100) * duration;
    seekTo(newSeconds);
  };

  const currentSeconds = (progress / 100) * duration;

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="flex h-24 items-center justify-between border-t border-dark-elevated bg-dark-surface px-4">
      {/* Left: Current Track Info */}
      <div className="flex w-1/4 items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded bg-dark-elevated shrink-0">
          <Image
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-semibold">{currentTrack.title}</h4>
          <p className="truncate text-xs text-dark-subdued">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Center: Player Controls */}
      <div className="flex w-2/4 flex-col items-center gap-2">
        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleShuffle}
            className={`player-control ${shuffle ? 'text-godlike-green' : 'text-dark-subdued'}`}
            aria-label="Toggle Shuffle"
          >
            <Shuffle className="h-4 w-4" />
          </button>

          <button
            onClick={previousTrack}
            className="player-control text-white"
            aria-label="Previous Track"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={togglePlayPause}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:scale-105"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="h-4 w-4" fill="currentColor" />}
          </button>

          <button
            onClick={nextTrack}
            className="player-control text-white"
            aria-label="Next Track"
          >
            <SkipForward className="h-5 w-5" />
          </button>

          <button
            onClick={toggleRepeat}
            className={`player-control ${repeat !== 'off' ? 'text-godlike-green' : 'text-dark-subdued'}`}
            aria-label="Toggle Repeat"
          >
            {repeat === 'one' ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex w-full items-center gap-2">
          <span className="text-xs text-dark-subdued w-10 text-right">
            {formatDuration(currentSeconds)}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar flex-1"
            aria-label="Seek"
          />
          <span className="text-xs text-dark-subdued w-10">
            {formatDuration(duration)}
          </span>
        </div>
      </div>

      {/* Right: Volume Control */}
      <div className="flex w-1/4 items-center justify-end gap-2">
        <button
          onClick={handleVolumeToggle}
          className="player-control text-white"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider w-24"
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
