import React, { useRef, useEffect, useState } from "react";
import YouTubePlayer from "@/components/YouTubePlayer";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayer } from "@/stores/playerStore";

export default function PlayerBar() {
  const playerRef = useRef(null);
  const { queue, index, setIndex, setQueue } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const current = queue[index];

  useEffect(() => {
    if (playerRef.current) playerRef.current.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (!current) return;
    // autoplay: the user must interact at least once in the session to allow audio in many browsers
    setIsPlaying(true);
  }, [current?.id]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const next = () => {
    if (index + 1 < queue.length) setIndex(index + 1);
  };
  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <>
      <div className="fixed bottom-0 left-64 right-0 bg-[#041018] border-t border-[#111] p-3 flex items-center gap-4 z-40">
        <div className="flex items-center gap-3 w-1/3">
          <div className="w-14 h-14 bg-[#222] rounded overflow-hidden">
            {current?.thumbnail && <img src={current.thumbnail} alt={current.title} className="w-full h-full object-cover" />}
          </div>
          <div>
            <div className="font-semibold">{current?.title || "Nothing playing"}</div>
            <div className="text-xs text-gray-400">{current?.channel}</div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-6">
          <button onClick={prev}><SkipBack /></button>
          <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center">
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={next}><SkipForward /></button>
        </div>

        <div className="flex items-center gap-3 w-1/3 justify-end">
          <Volume2 />
          <input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => setVolume(Number(e.target.value))} />
        </div>
      </div>

      <YouTubePlayer ref={playerRef} videoId={current?.id} onStateChange={(state) => {
        // state: -1(unstarted),0(ended),1(playing),2(paused),3(buffering)
        if (state === 0) {
          // ended -> next
          if (index + 1 < queue.length) setIndex(index + 1);
        }
      }} />
    </>
  );
}
