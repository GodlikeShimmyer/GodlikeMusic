import React from "react";
import { useLikes } from "@/hooks/useLikes";
import { Button } from "@/components/ui/button";

export default function LikedSongs() {
  const { liked, toggleLike } = useLikes();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Liked Songs</h1>
      {liked.length === 0 ? (
        <p>No liked songs yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {liked.map((song) => (
            <div
              key={song.id}
              className="bg-[#181818] p-3 rounded-lg hover:bg-[#222] transition"
            >
              <img src={song.thumbnail} alt={song.title} className="rounded-lg" />
              <h2 className="mt-2 font-semibold text-sm">{song.title}</h2>
              <p className="text-xs text-gray-400">{song.channel}</p>
              <Button
                onClick={() => toggleLike(song)}
                className="mt-2 text-sm w-full"
              >
                💔 Unlike
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
