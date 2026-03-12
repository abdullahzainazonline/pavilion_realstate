"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Gem, MapPin, Maximize } from "lucide-react";

/* ── Hero Stats HUD (Compact) ─────────────────────────── */
function HeroStats() {
  const stats = [
    { icon: Gem, label: "Units", value: "Fully Furnished", suffix: "" },
    { icon: MapPin, label: "Location", value: "Bukit Bintang", suffix: "" },
    { icon: Maximize, label: "Area", value: "504 - 1272", suffix: " sq.ft" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
      className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-[98%] sm:w-auto flex justify-center"
    >
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-row items-center gap-2 min-[400px]:gap-4 sm:gap-6 lg:gap-8 bg-[#0a0c10]/85 backdrop-blur-[16px] px-3 min-[400px]:px-5 py-3 sm:px-8 sm:py-4 rounded-full border border-[#c9a84c]/30 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.9)] hover:border-[#c9a84c]/60 transition-all duration-500 w-auto min-w-max relative overflow-hidden"
      >
        {/* Subtle internal glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-1.5 min-[400px]:gap-3 sm:gap-4 group relative z-10 shrink-0
              ${i !== 0 ? 'border-l border-white/10 pl-2 min-[400px]:pl-4 sm:pl-6 lg:pl-8' : ''}
            `}
          >
            <div className={`relative w-7 h-7 min-[400px]:w-9 min-[400px]:h-9 sm:w-10 sm:h-10 rounded-full bg-[#161820] shrink-0 flex items-center justify-center border border-[#c9a84c]/30 group-hover:bg-[#c9a84c]/20 group-hover:scale-110 transition-all duration-500 overflow-hidden shadow-inner`}>
              <stat.icon className="w-3.5 h-3.5 min-[400px]:w-4 min-[400px]:h-4 sm:w-5 sm:h-5 text-[#c9a84c] group-hover:text-white transition-colors duration-500 relative z-10" />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="text-[10px] min-[380px]:text-[11px] min-[420px]:text-[13px] sm:text-base lg:text-lg font-heading font-black text-white leading-tight group-hover:text-[#ffd700] transition-colors block whitespace-nowrap">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-[7px] min-[420px]:text-[8px] sm:text-[10px] sm:mt-0.5 uppercase tracking-[0.2em] text-[#c9a84c]/80 block font-bold whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Main Hero Component ──────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const images = [
    "/page_3_img_1.jpeg",
    "/page_4_img_1.jpeg",
    "/page_6_img_1.jpeg",
    "/page_8_img_1.jpeg",
    "/page_9_img_1.jpeg",
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-[100dvh] sm:min-h-screen overflow-hidden bg-[#0e0f1a]">
      {/* ▸ Layer 0: High-Impact Static Background with Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              priority
              sizes="100vw"
              quality={100}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0f1a]/60 via-transparent to-[#0e0f1a]/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0e0f1a]/80 via-transparent to-transparent pointer-events-none" />
      </div>



      {/* ▸ Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-end justify-start min-h-screen px-4 sm:px-16 md:px-24 pt-[20vh] sm:pt-[25vh] pointer-events-none">
        {/* Subtle glow behind text to ensure legibility on complex backgrounds */}
        <div className="absolute right-0 top-[20vh] sm:top-[25vh] w-[80vw] sm:w-[50vw] h-[40vh] bg-black/20 blur-[100px] pointer-events-none mix-blend-multiply" />
        
        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="w-full relative z-10 flex flex-col items-end text-right"
        >
          <motion.h1
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.9] font-heading font-black text-white tracking-tighter drop-shadow-lg whitespace-nowrap"
          >
            <span className="block text-white/95">PAVILION</span>
            <span className="inline-block relative gold-gradient-text drop-shadow-md">
              SQUARE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            className="mt-6 md:mt-10 text-xs sm:text-lg md:text-2xl uppercase tracking-[0.3em] font-extrabold flex items-center gap-3 sm:gap-6 text-white bg-black/10 backdrop-blur-sm px-6 py-2 rounded-l-full border-y border-l border-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          >
            <span className="w-8 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-gold" />
            <span className="bg-gradient-to-r from-white to-gold/80 text-transparent bg-clip-text drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
              BUKIT BINTANG, KL
            </span>
          </motion.p>
        </motion.div>
      </div>
      
      <HeroStats />
    </section>
  );
}
