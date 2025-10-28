import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

export default function YouTubePlayer({ videoId, isPlaying }) {
  const playerRef = useRef();

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) playerRef.current.internalPlayer.playVideo();
      else playerRef.current.internalPlayer.pauseVideo();
    }
  }, [isPlaying]);

  return (
    <div className="hidden">
      <YouTube
        videoId={videoId}
        opts={{ playerVars: { autoplay: 0, controls: 0 } }}
        ref={playerRef}
      />
    </div>
  );
}
