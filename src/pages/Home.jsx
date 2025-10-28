import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/stores/playerStore";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const { setQueue, setIndex } = usePlayer();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/youtube?q=top+music+hits");
      const data = await res.json();
      setTrending(data || []);
    })();
  }, []);

  const playAll = () => {
    setQueue(trending);
    setIndex(0);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Trending</h1>
        <Button onClick={playAll}>Play All</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trending.map(t => (
          <div key={t.id} className="bg-[#111] p-3 rounded">
            <img src={t.thumbnail} alt={t.title} className="rounded mb-2 w-full" />
            <div className="font-semibold text-sm">{t.title}</div>
            <div className="text-xs text-gray-400">{t.channel}</div>
            <Button className="mt-2" onClick={() => {
              setQueue(trending);
              setIndex(trending.findIndex(x => x.id === t.id));
            }}>Play</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
