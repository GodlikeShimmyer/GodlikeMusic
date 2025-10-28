import { useEffect, useState } from "react";

export function useLikes() {
  const [liked, setLiked] = useState(() => {
    try {
      if (typeof window === "undefined") return [];
      const raw = localStorage.getItem("likedSongs");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("likedSongs", JSON.stringify(liked));
    } catch {}
  }, [liked]);

  const toggleLike = (song) => {
    setLiked(prev => {
      const exists = prev.find(s => s.id === song.id);
      const updated = exists ? prev.filter(s => s.id !== song.id) : [...prev, song];
      return updated;
    });
  };

  return { liked, toggleLike };
}
