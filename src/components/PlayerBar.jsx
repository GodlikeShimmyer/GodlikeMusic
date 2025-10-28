import React, { useState, useRef } from 'react';
import YouTubePlayer from './YouTubePlayer';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

export default function PlayerBar({ currentSong }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-between px-4">
      {currentSong && (
        <>
          <div className="flex items-center gap-4">
            <img
              src={currentSong.cover_image}
              alt={currentSong.title}
              className="w-16 h-16 rounded"
            />
            <div>
              <h4>{currentSong.title}</h4>
              <p className="text-sm text-gray-400">{currentSong.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SkipBack />
            <button onClick={togglePlay}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <SkipForward />
            <Volume2 />
          </div>
          <YouTubePlayer videoId={currentSong.youtubeId} isPlaying={isPlaying} />
        </>
      )}
    </div>
  );
}
