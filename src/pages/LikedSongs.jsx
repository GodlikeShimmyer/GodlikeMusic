import React from "react";
import { useLikes } from "@/hooks/useLikes";
import { Button } from "@/components/ui/button";

export default function LikedSongs() {
  const { liked, toggleLike } = useLikes();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Liked Songs</h1>
      {liked.length === 0 ? (
        <p className="text-gray-400">You haven't liked any songs yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {liked.map(s => (
            <div key={s.id} className="bg-[#111] p-3 rounded">
              <img src={s.thumbnail} alt={s.title} className="rounded mb-2 w-full" />
              <div className="font-semibold">{s.title}</div>
              <div className="text-xs text-gray-400">{s.channel}</div>
              <div className="flex gap-2 mt-2">
                <Button onClick={() => toggleLike(s)}>💔 Unlike</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
