import React from 'react';
import { Home, Search, Library, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navItems = [
    { name: 'Home', icon: <Home />, path: '/' },
    { name: 'Search', icon: <Search />, path: '/search' },
    { name: 'Your Library', icon: <Library />, path: '/library' },
    { name: 'Liked Songs', icon: <Heart />, path: '/likedsongs' },
  ];

  return (
    <div className="w-60 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">GodlikeMusic</h1>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded hover:bg-gray-800 ${
              isActive ? 'bg-gray-800' : ''
            }`
          }
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
