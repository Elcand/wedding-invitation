"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const VIDEO_SOURCES = [
  "/assets/videos/video-placeholder.mp4",
  "/assets/videos/video-placeholder1.mp4",
  "/assets/videos/video-placeholder2.mp4",
];

const MOBILE_VIDEO_SOURCES = [
  "/assets/videos/mobile/video-placeholder-mobile.mp4",
  "/assets/videos/mobile/video-placeholder1-mobile.mp4",
  "/assets/videos/mobile/video-placeholder2-mobile.mp4",
];

const MOBILE_QUERY = "(max-width: 768px)";

const getIsMobile = () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

const getServerIsMobile = () => false;

const subscribeToMobile = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

type VideoState = {
  active: number;
  previous: number | null;
};

type VideoLayerProps = {
  source: string;
  active: boolean;
};

function VideoLayer({ source, active }: VideoLayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    if (active) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, source]);

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
        active ? "opacity-100" : "opacity-0"
      }`}
      autoPlay={active}
      muted
      loop
      playsInline
      preload={active ? "auto" : "metadata"}
      tabIndex={-1}
      disablePictureInPicture
    >
      <source src={source} type="video/mp4" />
    </video>
  );
}

export default function BackgroundVideo() {
  const [videoState, setVideoState] = useState<VideoState>({ active: 0, previous: null });
  const isMobile = useSyncExternalStore(subscribeToMobile, getIsMobile, getServerIsMobile);

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

      setVideoState((current) => (current.active === nextVideo ? current : { active: nextVideo, previous: current.active }));
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
    if (videoState.previous === null) return;

    const timeout = window.setTimeout(() => {
      setVideoState((current) => (current.previous === videoState.previous ? { ...current, previous: null } : current));
    }, 1100);

    return () => window.clearTimeout(timeout);
  }, [videoState.previous]);

  const sources = isMobile ? MOBILE_VIDEO_SOURCES : VIDEO_SOURCES;
  const visibleVideos = videoState.previous === null ? [videoState.active] : [videoState.previous, videoState.active];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-dvh w-screen overflow-hidden bg-[#171815]" aria-hidden="true">
      {visibleVideos.map((index) => (
        <VideoLayer key={index} source={sources[index]} active={index === videoState.active} />
      ))}
      <div className="absolute inset-0 bg-[#171815]/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(23,24,21,0.48)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#171815]/45 to-transparent" />
    </div>
  );
}
