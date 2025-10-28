import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Heart, Library } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-60 bg-gray-850 flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-400">GodlikeMusic</h1>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-green-400' : 'text-white'}>
          <Home className="inline mr-2" /> Home
        </NavLink>
        <NavLink to="/likedsongs" className={({ isActive }) => isActive ? 'text-green-400' : 'text-white'}>
          <Heart className="inline mr-2" /> Liked Songs
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive ? 'text-green-400' : 'text-white'}>
          <Library className="inline mr-2" /> Library
        </NavLink>
      </nav>
    </div>
  );
}
