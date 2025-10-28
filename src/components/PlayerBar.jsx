import React, { useRef, useEffect, useState } from 'react';
import YouTubePlayer from './YouTubePlayer';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';

export default function PlayerBar({ currentSong }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef(null);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(isMuted ? volume * 100 : 0);
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-gray-800 p-4 flex items-center justify-between">
      {currentSong ? (
        <>
          <div className="flex items-center gap-4">
            <img src={currentSong.cover_image} alt="" className="w-12 h-12 rounded" />
            <div>
              <h4>{currentSong.title}</h4>
              <p className="text-gray-400 text-sm">{currentSong.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SkipBack className="w-5 h-5 cursor-pointer" />
            <button
              className="bg-green-400 w-10 h-10 flex items-center justify-center rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <SkipForward className="w-5 h-5 cursor-pointer" />
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleMute}>
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>

          <YouTubePlayer ref={playerRef} videoId={currentSong.videoId} />
        </>
      ) : (
        <p className="text-gray-400">No song playing</p>
      )}
    </div>
  );
}
