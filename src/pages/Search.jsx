import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchYouTube } from "@/lib/youtube";
import { useLikes } from "@/hooks/useLikes";

export default function Search() {
  const [query, setQuery] = useState("");
  const { liked, toggleLike } = useLikes();
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchYouTube(query),
    enabled: false
  });

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4 font-bold">Search Songs</h1>
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search YouTube music..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Loading..." : "Search"}
        </Button>
      </div>

      {data && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((song) => (
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
                {liked.some((s) => s.id === song.id)
                  ? "💚 Liked"
                  : "🤍 Like"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
