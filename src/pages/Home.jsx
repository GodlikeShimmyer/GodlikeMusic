import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/youtube?type=trending");
      const data = await res.json();
      setTrending(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-black to-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">Godlike Trending</h1>

      {loading ? (
        <p>Loading hot tracks...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {trending.map((video) => (
            <motion.a
              href={`https://youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              key={video.id}
              className="block bg-[#181818] rounded-lg p-3 hover:bg-[#222] transition"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="rounded-md"
              />
              <h3 className="mt-2 text-sm font-semibold">{video.title}</h3>
              <p className="text-xs text-gray-400">{video.channel}</p>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
