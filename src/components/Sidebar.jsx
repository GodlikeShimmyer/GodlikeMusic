import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Music, Heart } from "lucide-react";

export default function Sidebar() {
  const loc = useLocation();
  const itemClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded text-sm ${loc.pathname === path ? "bg-[#121416]" : "hover:bg-[#0f1113"]}`;

  return (
    <aside className="w-64 bg-[#050608] border-r border-[#111] p-4 flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">GodlikeMusic</h2>
      </div>

      <nav className="flex-1 space-y-1">
        <Link to="/" className={itemClass("/")}>
          <Home size={16} /> Home
        </Link>

        <Link to="/search" className={itemClass("/search")}>
          <Search size={16} /> Search
        </Link>

        <Link to="/library" className={itemClass("/library")}>
          <Music size={16} /> Library
        </Link>

        <Link to="/liked" className={itemClass("/liked")}>
          <Heart size={16} /> Liked
        </Link>
      </nav>

      <div className="mt-6">
        <p className="text-xs text-gray-500 mb-2">Playlists</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-300 hover:text-white">Godlike Vibes</li>
          <li className="text-sm text-gray-300 hover:text-white">Chill</li>
        </ul>
      </div>
    </aside>
  );
}
