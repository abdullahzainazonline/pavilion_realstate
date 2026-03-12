"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Navigation, Maximize2, X, MapPin } from "lucide-react";

export default function LocationFacts() {
  const [enlarged, setEnlarged] = useState(false);

  return (
    <>
      {/* ── Enlarged Map Lightbox ── */}
      <AnimatePresence>
        {enlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setEnlarged(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.95)] border border-[#c9a84c]/30"
              style={{ aspectRatio: "16/9" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src="/location_map.jpg" alt="Bukit Bintang Location Map" fill className="object-cover" quality={100} />
              {/* Gold overlay label */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-[#c9a84c]/40 backdrop-blur">
                <MapPin className="w-3.5 h-3.5 text-[#ffd700]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffd700]">Bukit Bintang, KL</span>
              </div>
              <button
                onClick={() => setEnlarged(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-[#c9a84c] hover:border-[#c9a84c] transition-all duration-300"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Section ── */}
      <section id="location" className="relative w-full overflow-hidden bg-[#060914] group/map cursor-pointer" style={{ minHeight: "100svh" }} onClick={() => setEnlarged(true)}>

        {/* ── Background Map — Interactive Blur Teaser ── */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 w-full h-full transition-all duration-1000 ease-out group-hover/map:scale-105"
          >
            <Image
              src="/location_map.jpg"
              alt="Bukit Bintang Map"
              fill
              quality={95}
              sizes="100vw"
              className="object-cover object-center transition-all duration-700 ease-in-out blur-[6px] group-hover/map:blur-[2px] brightness-[0.4] saturate-[1.2] group-hover/map:brightness-[0.6]"
            />
          </motion.div>
          {/* Edge fades */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060914]/90 via-transparent via-40% to-[#060914]/90 pointer-events-none" />
          {/* Center dark gradient to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-700 group-hover/map:opacity-20" />
        </div>

        {/* ── Corner Brackets ── */}
        <div className="absolute top-6 left-6 z-10 hidden sm:block pointer-events-none">
          <div className="w-8 h-8 border-l border-t border-[#c9a84c]/40" />
        </div>
        <div className="absolute top-6 right-6 z-10 hidden sm:block pointer-events-none">
          <div className="w-8 h-8 border-r border-t border-[#c9a84c]/40" />
        </div>
        <div className="absolute bottom-6 left-6 z-10 hidden sm:block pointer-events-none">
          <div className="w-8 h-8 border-l border-b border-[#c9a84c]/40" />
        </div>
        <div className="absolute bottom-6 right-6 z-10 hidden sm:block pointer-events-none">
          <div className="w-8 h-8 border-r border-b border-[#c9a84c]/40" />
        </div>

        {/* ── Title Block — compact, top-centre ── */}
        <div className="relative z-10 flex flex-col items-center justify-between min-h-[100svh] px-4 pt-20 pb-12">

          {/* TOP: Title */}
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mt-4 relative w-full pointer-events-none"
          >
            {/* Elegant dark glass backing to guarantee text visibility */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] sm:w-[80%] md:w-[60%] h-[140%] sm:h-[160%] bg-[#060914]/40 backdrop-blur-md rounded-[100%] pointer-events-none shadow-[0_0_80px_60px_rgba(6,9,20,0.4)] border border-white/5 z-0 transition-opacity duration-700 group-hover/map:opacity-80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_0%,transparent_65%)] pointer-events-none blur-2xl z-0" />

            {/* Seamless, perfectly sized title */}
            <div className="relative z-10 px-4 py-2">
              <h2 className="font-heading font-black tracking-tighter leading-[0.88] text-center drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <span className="block text-[10vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                  BUKIT BINTANG
                </span>
                <span
                  className="block text-[12vw] sm:text-7xl md:text-8xl lg:text-[6.5rem] italic mt-0.5 sm:-mt-1"
                  style={{
                    background: "linear-gradient(135deg, #ffd700 0%, #ffffff 40%, #ffd700 60%, #c9a84c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(196,162,101,0.4))",
                  }}
                >
                  LANDMARK
                </span>
              </h2>
            </div>
            
            {/* Call to action hint */}
            <div className="mt-8 flex items-center justify-center gap-3 opacity-90 transition-all duration-300 group-hover/map:translate-y-2 group-hover/map:opacity-100">
               <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold text-white/50 group-hover/map:text-[#ffd700] transition-colors">Click anywhere to open map</span>
            </div>
          </motion.div>

          {/* BOTTOM: View Full Map CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-3"
          >
            <button
              onClick={() => setEnlarged(true)}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#c9a84c]/50 bg-[#08070c]/50 backdrop-blur-xl px-8 py-3.5 text-[#ffd700] shadow-[0_0_30px_rgba(196,162,101,0.15)] transition-all duration-400 hover:shadow-[0_0_40px_rgba(196,162,101,0.4)] hover:border-[#ffd700] hover:bg-[#c9a84c]/15"
            >
              {/* Animated shine sweep */}
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#ffd700]/15 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

              <span className="relative w-7 h-7 rounded-full border border-[#c9a84c]/60 flex items-center justify-center bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/30 transition-all duration-300">
                <Maximize2 size={13} />
              </span>
              <span className="relative text-[11px] font-bold uppercase tracking-[0.3em]">View Full Map</span>
            </button>

            <p className="text-white/30 text-[9px] uppercase tracking-[0.3em]">75A Jalan Raja Chulan, Bukit Bintang</p>
          </motion.div>

        </div>
      </section>
    </>
  );
}
