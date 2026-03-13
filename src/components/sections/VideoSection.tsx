"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const FALLBACK_VIDEO_SRC =
  "https://si0ebnzpapdideac.public.blob.vercel-storage.com/Pavilion_Square_Luxury_Residences_Urban_Luxe_1080p.mp4";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? FALLBACK_VIDEO_SRC;
  
  // Only play the video if it's currently in the viewport to aggressively save resources
  const isInView = useInView(videoRef, { margin: "0px 0px -200px 0px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch((error) => {
        console.warn("Video autoplay failed", error);
      });
    } else {
      video.pause();
    }
  }, [isInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video to start if it crosses the 2:20 mark (140 seconds)
    const handleTimeUpdate = () => {
      // 2 minutes and 20 seconds = 140 seconds
      if (video.currentTime >= 140) {
        video.currentTime = 0;
        video.play().catch((error) => {
          console.warn("Video replay failed", error);
        });
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <section className="relative w-full h-[100dvh] sm:h-screen bg-[#060914] overflow-hidden flex items-center justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          onCanPlay={() => {
            if (isInView) {
              videoRef.current?.play().catch((error) => {
                console.warn("Video play onCanPlay failed", error);
              });
            }
          }}
          onError={(event) => {
            console.error("Video failed to load", event.currentTarget.error, videoSrc);
          }}
          className="w-full h-full object-cover"
        />
        
        {/* Soft dark vignette gradients to blend with edge sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060914]/80 via-transparent to-[#060914]/80 opacity-70" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
      
      {/* Decorative Gold Elements styling */}
      <div className="absolute top-6 left-6 z-10 hidden sm:block pointer-events-none opacity-50">
        <div className="w-8 h-8 border-l border-t border-[#c9a84c]/40" />
      </div>
      <div className="absolute bottom-6 right-6 z-10 hidden sm:block pointer-events-none opacity-50">
        <div className="w-8 h-8 border-r border-b border-[#c9a84c]/40" />
      </div>
    </section>
  );
}
