import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart } from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
      pathname === path ? "bg-[#282828]" : "hover:bg-[#1f1f1f]"
    }`; // <-- Removed the extra "]" here

  return (
    <div className="w-60 bg-black p-4 flex flex-col gap-2">
      <Link to="/" className={linkStyle("/")}>
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link to="/search" className={linkStyle("/search")}>
        <Search size={20} />
        <span>Search</span>
      </Link>
      <Link to="/liked" className={linkStyle("/liked")}>
        <Heart size={20} />
        <span>Liked Songs</span>
      </Link>
    </div>
  );
};

export default Sidebar;
