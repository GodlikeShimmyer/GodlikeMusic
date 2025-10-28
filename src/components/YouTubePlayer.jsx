// src/components/YouTubePlayer.jsx
import React from "react";

const YouTubePlayer = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <div className="w-full h-64 md:h-96 bg-black flex justify-center items-center">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
