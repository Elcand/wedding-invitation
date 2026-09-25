"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SOURCES = [
  "/assets/videos/video-placeholder.mp4",
  "/assets/videos/video-placeholder1.mp4",
  "/assets/videos/video-placeholder2.mp4",
];

export default function BackgroundVideo() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateActiveVideo = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-background-video]"));
      if (sections.length === 0) return;

      const focusPoint = window.innerHeight * 0.45;
      let nextVideo = 0;

      for (const section of sections) {
        const bounds = section.getBoundingClientRect();
        if (bounds.top <= focusPoint && bounds.bottom > focusPoint) {
          nextVideo = Number(section.dataset.backgroundVideo) || 0;
          break;
        }
        if (bounds.top > focusPoint) break;
      }

      setActiveVideo((current) => (current === nextVideo ? current : nextVideo));
    };

    const scheduleUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateActiveVideo();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeVideo) {
        video.muted = true;
        void video.play().catch(() => undefined);
      } else if (!video.paused) {
        video.pause();
      }
    });
  }, [activeVideo]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-dvh w-screen overflow-hidden bg-[#171815]" aria-hidden="true">
      {VIDEO_SOURCES.map((source, index) => (
        <video
          key={source}
          ref={(element) => {
            videoRefs.current[index] = element;
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeVideo ? "opacity-100" : "opacity-0"
          }`}
          autoPlay={index === 0}
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        >
          <source src={source} type="video/mp4" />
        </video>
      ))}
      <div className="absolute inset-0 bg-[#171815]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(23,24,21,0.48)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#171815]/45 to-transparent" />
    </div>
  );
}
