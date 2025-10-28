import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTubePlayer from "@/components/YouTubePlayer";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/stores/playerStore";
import { useLikes } from "@/hooks/useLikes";

export default function VideoPage() {
  const { id } = useParams();
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToQueue, setQueue, setIndex } = usePlayer();
  const { liked, toggleLike } = useLikes();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/video?id=${encodeURIComponent(id)}`);
        const data = await res.json();
        setMeta(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (!meta) return <div className="p-6 text-white">Video not found</div>;

  const toSong = { id: meta.id, title: meta.title, thumbnail: meta.thumbnails?.high?.url, channel: meta.channel };

  return (
    <div className="p-6 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black rounded p-2">
            {/* visible video iframe to show video as well as play audio */}
            <iframe
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${meta.id}?rel=0&modestbranding=1`}
              title={meta.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded"
            />
          </div>

          <h1 className="text-2xl font-bold mt-4">{meta.title}</h1>
          <p className="text-sm text-gray-400">{meta.channel}</p>

          <div className="flex gap-3 mt-4">
            <Button onClick={() => { setQueue([toSong]); setIndex(0); }}>Play</Button>
            <Button onClick={() => addToQueue(toSong)}>Add to Queue</Button>
            <Button onClick={() => toggleLike(toSong)}>{liked.some(s => s.id === toSong.id) ? "💚 Liked" : "🤍 Like"}</Button>
          </div>

          <div className="mt-6 text-gray-300">
            <h3 className="font-semibold mb-2">Description</h3>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: meta.description.replace(/\n/g, "<br/>") }} />
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Comments</h3>
            {meta.comments?.length ? meta.comments.map(c => (
              <div key={c.id} className="bg-[#0f1113] p-3 rounded mb-2">
                <div className="text-sm font-semibold">{c.author}</div>
                <div className="text-xs text-gray-400" dangerouslySetInnerHTML={{ __html: c.text }} />
                <div className="text-xs text-gray-500 mt-1">❤ {c.likeCount}</div>
              </div>
            )) : <p className="text-gray-500">No comments or comments disabled.</p>}
          </div>
        </div>

        <aside>
          <div className="bg-[#0f1113] p-3 rounded">
            <h4 className="font-semibold mb-2">Video Info</h4>
            <div className="text-sm text-gray-400">Views: {meta.stats?.viewCount || "—"}</div>
            <div className="text-sm text-gray-400">Likes: {meta.stats?.likeCount || "—"}</div>
            <div className="text-sm text-gray-400">Duration: {meta.contentDetails?.duration || "—"}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
