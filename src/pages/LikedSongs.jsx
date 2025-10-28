import React from "react";
import { useLikes } from "@/hooks/useLikes";
import { motion } from "framer-motion";

export default function LikedSongs() {
  const { likes } = useLikes();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#111] text-white p-8">
      <h1 className="text-5xl font-bold mb-8">❤️ Liked Songs</h1>

      {likes.length === 0 ? (
        <p className="text-gray-400 text-lg">You haven’t liked any songs yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {likes.map((song) => (
            <motion.a
              key={song.id}
              href={`https://www.youtube.com/watch?v=${song.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#181818] rounded-xl p-4 hover:bg-[#222] transition shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={song.thumbnail}
                alt={song.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-semibold truncate">
