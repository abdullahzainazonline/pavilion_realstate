"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Gem, MapPin, Maximize } from "lucide-react";

function WhatsAppIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* ── Hero Stats HUD (Compact) ─────────────────────────── */
function HeroStats() {
  const stats = [
    { icon: Gem, label: "Units", value: "Fully Furnished", suffix: "" },
    { icon: MapPin, label: "Location", value: "Bukit Bintang", suffix: "" },
    { icon: Maximize, label: "Size", value: "504 - 1272", suffix: " sq.ft" },
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
            className={`flex items-center gap-1.5 min-[350px]:gap-2 min-[400px]:gap-3 sm:gap-4 group relative z-10 shrink-0
              ${i !== 0 ? 'border-l border-white/10 pl-2 min-[350px]:pl-3 min-[400px]:pl-4 sm:pl-6 lg:pl-8' : ''}
            `}
          >
            <div className={`relative w-6 h-6 min-[350px]:w-7 min-[350px]:h-7 min-[400px]:w-9 min-[400px]:h-9 sm:w-10 sm:h-10 rounded-full bg-[#161820] shrink-0 flex items-center justify-center border border-[#c9a84c]/30 group-hover:bg-[#c9a84c]/20 group-hover:scale-110 transition-all duration-500 overflow-hidden shadow-inner`}>
              <stat.icon className="w-3 h-3 min-[350px]:w-3.5 min-[350px]:h-3.5 min-[400px]:w-4 min-[400px]:h-4 sm:w-5 sm:h-5 text-[#c9a84c] group-hover:text-white transition-colors duration-500 relative z-10" />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="text-[9px] min-[350px]:text-[10px] min-[380px]:text-[11px] min-[420px]:text-[13px] sm:text-base lg:text-lg font-heading font-black text-white leading-tight group-hover:text-[#ffd700] transition-colors block whitespace-nowrap">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-[6px] min-[350px]:text-[7px] min-[420px]:text-[8px] sm:text-[10px] sm:mt-0.5 uppercase tracking-widest sm:tracking-[0.2em] text-[#c9a84c]/80 block font-bold whitespace-nowrap">
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
    "/page_6_img_1.jpeg",
    "/page_9_img_1.jpeg",
    "/pavilionmainview.jpeg",
    "/GalleryImg-dropoffcs-scaled.jpg",
    "/page_3_img_1.jpeg",
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
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
        
        {/* Subtle, smooth radial gradient behind the text to guarantee legibility while letting the edges of the image shine */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,transparent_60%)] z-1" />

        <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-[#0e0f1a] to-transparent pointer-events-none" />
      </div>



      {/* ▸ Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-16 md:px-24 pt-[15vh] sm:pt-[20vh] pointer-events-none pb-[12vh]">
        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="w-full relative z-10 flex flex-col items-center text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.9] font-heading font-black tracking-tighter whitespace-nowrap"
          >
            <span className="block text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">PAVILION</span>
            <span className="inline-block relative gold-gradient-text drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              SQUARE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="mt-6 md:mt-8 text-xs sm:text-base md:text-xl uppercase tracking-[0.2em] sm:tracking-[0.3em] font-extrabold flex items-center justify-center gap-3 sm:gap-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            <span className="w-6 sm:w-12 h-[2px] bg-gradient-to-r from-transparent to-gold" />
            <span className="text-[#c9a84c]">
              BUKIT BINTANG, KL
            </span>
            <span className="w-6 sm:w-12 h-[2px] bg-gradient-to-l from-transparent to-gold" />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            className="mt-8 sm:mt-12 pointer-events-auto"
          >
            <a
              href="https://wa.link/kgsiw7"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 sm:gap-4 bg-[#0a0c10]/80 hover:bg-[#c9a84c]/20 md:hover:bg-[#25D366]/10 backdrop-blur-md border border-[#c9a84c]/50 md:border-[#25D366]/30 px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.2)] md:hover:shadow-[0_0_40px_rgba(37,211,102,0.35)] hover:-translate-y-1"
            >
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border border-[#c9a84c]/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <div className="absolute inset-0 rounded-full border border-[#c9a84c]/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '1s' }} />
              
              {/* Button Inner Glow Overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/10 to-[#c9a84c]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 overflow-hidden" />
              
              <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9a84c] md:group-hover:text-[#25D366] relative z-10" />
              <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-wider uppercase relative z-10">
                Book Appointment
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <HeroStats />
    </section>
  );
}
