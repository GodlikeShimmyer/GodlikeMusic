import React from "react";
import Sidebar from "@/components/Sidebar";
import PlayerBar from "@/components/PlayerBar";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import VideoPage from "@/pages/VideoPage";
import Library from "@/pages/Library";
import LikedSongs from "@/pages/LikedSongs";

export default function App() {
  return (
    <div className="app flex h-screen bg-[#09101a] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/liked" element={<LikedSongs />} />
          </Routes>
        </main>
        <PlayerBar />
      </div>
    </div>
  );
}
