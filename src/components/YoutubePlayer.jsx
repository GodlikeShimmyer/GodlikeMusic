import React, { forwardRef, useEffect, useRef, useImperativeHandle } from "react";

const loadYT = () =>
  new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT);
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    document.body.appendChild(tag);
  });

const YouTubePlayer = forwardRef(({ videoId, onStateChange }, ref) => {
  const holderRef = useRef(null);
  const playerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play: () => playerRef.current && playerRef.current.playVideo(),
    pause: () => playerRef.current && playerRef.current.pauseVideo(),
    seekTo: (s) => playerRef.current && playerRef.current.seekTo(s, true),
    setVolume: (v) => playerRef.current && playerRef.current.setVolume(Math.round(v * 100)),
    getCurrentTime: () => (playerRef.current ? playerRef.current.getCurrentTime() : 0),
    getDuration: () => (playerRef.current ? playerRef.current.getDuration() : 0)
  }));

  useEffect(() => {
    let mounted = true;
    (async () => {
      const YT = await loadYT();
      if (!mounted) return;

      if (!playerRef.current) {
        playerRef.current = new YT.Player(holderRef.current, {
          height: "0",
          width: "0",
          videoId: videoId || "",
          playerVars: {
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1
          },
          events: {
            onStateChange: (e) => onStateChange && onStateChange(e.data),
            onReady: () => {}
          }
        });
      } else {
        if (videoId) playerRef.current.loadVideoById(videoId);
        else playerRef.current.stopVideo();
      }
    })();

    return () => {
      mounted = false;
      // keep player for re-use
    };
  }, [videoId, onStateChange]);

  return <div ref={holderRef} />;
});

export default YouTubePlayer;
