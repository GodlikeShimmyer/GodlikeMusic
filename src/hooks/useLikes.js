import { useState, useEffect } from "react";

export function useLikes() {
  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem("likedSongs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(liked));
  }, [liked]);

  function toggleLike(song) {
    setLiked((prev) => {
      const exists = prev.find((s) => s.id === song.id);
      if (exists) return prev.filter((s) => s.id !== song.id);
      return [...prev, song];
    });
  }

  return { liked, toggleLike };
}
