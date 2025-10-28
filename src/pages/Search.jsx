import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/stores/playerStore";
import { Link } from "react-router-dom";

export default function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setQueue, setIndex, addToQueue } = usePlayer();

  const doSearch = async (e) => {
    e?.preventDefault();
    if (!q) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const playNow = (idx) => {
    setQueue(results);
    setIndex(idx);
  };

  return (
    <div className="p-6">
      <form onSubmit={doSearch} className="flex gap-3 mb-6">
        <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search YouTube music..." />
        <Button type="submit">{loading ? "Searching..." : "Search"}</Button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((r, i) => (
          <div key={r.id} className="bg-[#111] p-3 rounded">
            <img src={r.thumbnail} alt={r.title} className="rounded mb-2 w-full" />
            <div className="font-semibold text-sm">{r.title}</div>
            <div className="text-xs text-gray-400">{r.channel}</div>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => playNow(i)}>Play</Button>
              <Button onClick={() => addToQueue(r)}>Add</Button>
              <Link to={`/video/${r.id}`} className="px-3 py-1 text-sm rounded bg-[#222] hover:bg-[#2b2b2b]">Open</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
