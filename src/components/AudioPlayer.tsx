"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7">
      <audio ref={audioRef} loop preload="none" src="/music.mp3" />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#e0c79c]/35 bg-[#171815]/75 text-[#e0c79c] shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all hover:border-[#e0c79c] hover:bg-[#e0c79c] hover:text-[#171815]"
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="pointer-events-none absolute -left-1 -top-9 whitespace-nowrap rounded bg-[#171815]/80 px-2 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-[#f5f2eb]/75 opacity-0 transition-opacity group-hover:opacity-100">
          {isPlaying ? "Music on" : "Play music"}
        </span>
      </button>
    </div>
  );
}
