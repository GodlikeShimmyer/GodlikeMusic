import React, { forwardRef, useEffect } from 'react';

const YouTubePlayer = forwardRef(({ videoId }, ref) => {
  useEffect(() => {
    if (!videoId || !ref) return;
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      ref.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId,
        events: { onReady: (e) => e.target.playVideo() },
      });
    };
  }, [videoId]);

  return <div id="youtube-player"></div>;
});

export default YouTubePlayer;
