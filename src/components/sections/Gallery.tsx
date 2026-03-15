"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const images = [
  { src: "/pavillionsquare_building.jpeg", alt: "Skyline Architecture", category: "Exterior" },
  { src: "/page_9_img_1.jpeg", alt: "118-Metre Infinity Pool", category: "Level 67" },
  { src: "/page_10_img_2.jpeg", alt: "Sky Lounge & Bar", category: "Level 67" },
  { src: "/page_12_img_1.jpeg", alt: "Fully Equipped Gym", category: "Level 66" },
  { src: "/page_7_img_1.jpeg", alt: "Grand Concierge", category: "Ground Floor" },
  { src: "/page_8_img_1.jpeg", alt: "Luxury Drop-Off", category: "Ground Floor" },
  { src: "/page_18_img_1.jpeg", alt: "Opulent Living Spaces", category: "Interior" },
];

const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ id: number, size: number, x: number, y: number, duration: number, delay: number, yOffset: number }[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const config = { damping: 40, stiffness: 100, bounce: 0 };
  const smoothMouseX = useSpring(mouseX, config);
  const smoothMouseY = useSpring(mouseY, config);

  const xTransformFar = useTransform(smoothMouseX, (v) => v * -0.05);
  const yTransformFar = useTransform(smoothMouseY, (v) => v * -0.05);
  const xTransformMid = useTransform(smoothMouseX, (v) => v * -0.15);
  const yTransformMid = useTransform(smoothMouseY, (v) => v * -0.15);
  const xTransformNear = useTransform(smoothMouseX, (v) => v * -0.3);
  const yTransformNear = useTransform(smoothMouseY, (v) => v * -0.3);

  useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768;

    setParticles(
      isMobile ? [] : Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        size: Math.random() > 0.8 ? Math.random() * 5 + 3 : Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 120,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * -20,
        yOffset: Math.random() * -100 - 50,
      }))
    );

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || particles.length === 0) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#c9a84c]/5 blur-[80px] rounded-full pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute left-1/2 top-1/2 w-[35vw] h-[35vw] max-w-[600px] max-h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/10 blur-[120px]"
        style={{ x: smoothMouseX, y: smoothMouseY }}
      />

      {particles.map((p) => {
        let xTrans = xTransformFar;
        let yTrans = yTransformFar;

        if (p.size > 5) {
          xTrans = xTransformNear;
          yTrans = yTransformNear;
        } else if (p.size > 2) {
          xTrans = xTransformMid;
          yTrans = yTransformMid;
        }

        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full shadow-[0_0_12px_rgba(201,168,76,0.8)]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: p.size > 3
                ? 'radial-gradient(circle at 30% 30%, #fff, #ffd700, #c9a84c)'
                : '#ffd700',
              x: xTrans,
              y: yTrans,
            }}
            animate={{
              y: [0, p.yOffset],
              opacity: [0, 0.7, 0],
              scale: [0, 1.3, 0],
              x: [0, Math.sin(p.duration) * 20, Math.cos(p.delay) * -20, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        );
      })}

      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#c9a84c]/15 blur-[150px] rounded-full"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3], x: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] bg-[#ffd700]/10 blur-[160px] rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2], y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
};

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Touch / swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Touch handlers for mobile swipe-to-change & tap-to-enlarge
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // Only handle horizontal swipes (dx > dy to avoid scroll interference)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) {
        paginate(1);   // swipe left → next
      } else {
        paginate(-1);  // swipe right → prev
      }
    } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      // It's a tap — open lightbox on mobile
      setLightboxOpen(true);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentImage = images[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 25 : -25,
      z: -400,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 25 : -25,
      z: -400,
    }),
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#02040c] overflow-hidden">
      {/* Dynamic Ambient Particles and Glow */}
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">

        {/* Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <Camera className="w-3 h-3" />
            Visual Experience
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white leading-tight"
          >
            The Pavilion{" "}
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-[#c9a84c] to-[#ffd700]">
              Gallery
            </em>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-24 bg-gradient-to-r from-[#c9a84c] to-transparent mt-6 origin-left"
          />
        </div>

        {/* 3D Carousel Image */}
        <div
          className="relative w-full max-w-5xl aspect-[4/3] min-[480px]:aspect-[16/10] md:aspect-[21/9] perspective-[1200px] mb-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                rotateY: { duration: 0.6 },
                z: { duration: 0.6 },
                scale: { duration: 0.6 },
              }}
              className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-cover"
                sizes="(max-w-screen-xl) 100vw, 1200px"
                priority
              />

              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060914]/90 via-[#060914]/40 to-transparent pointer-events-none" />

              {/* Image caption — bottom left */}
              <div className="absolute bottom-0 left-0 right-0 p-4 min-[480px]:p-6 md:p-10 flex justify-between items-end">
                <div>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-3 py-1 bg-[#c9a84c]/20 border border-[#c9a84c]/30 text-[#e6c154] text-xs font-semibold uppercase tracking-widest rounded-full mb-3"
                  >
                    {currentImage.category}
                  </motion.span>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg min-[480px]:text-2xl md:text-4xl font-heading font-bold text-white drop-shadow-lg"
                  >
                    {currentImage.alt}
                  </motion.h3>
                </div>

                {/* Enlarge button — visible on ALL screen sizes */}
                <motion.button
                  onClick={() => setLightboxOpen(true)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#060914]/60 backdrop-blur-md items-center justify-center border border-white/20 text-white hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-colors shadow-lg"
                  aria-label="Enlarge image"
                >
                  <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </div>

              {/* Mobile swipe hint — only shown on xs when first image */}
              {currentIndex === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-3 left-1/2 -translate-x-1/2 md:hidden px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/60 text-[10px] tracking-widest uppercase pointer-events-none select-none"
                >
                  Swipe or tap to explore
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Controls Row: prev | dots | next ── */}
        <div className="flex items-center gap-4 sm:gap-6 mt-2 mb-4">
          {/* Prev button */}
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all hover:scale-110 group shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform text-[#e6c154]" />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2 sm:gap-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                  ? "w-8 bg-gradient-to-r from-[#c9a84c] to-[#ffd700]"
                  : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all hover:scale-110 group shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform text-[#e6c154]" />
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-6 md:p-10"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="absolute inset-0 bg-[#060914]/90 backdrop-blur-2xl" />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full h-full max-h-[90vh] bg-[#060914]/50 rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="relative flex-1 w-full h-full min-h-0 flex items-center justify-center p-4 sm:p-8">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>

                {/* Subtle bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060914] to-transparent pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 rounded-full bg-[#060914]/70 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all backdrop-blur-md z-50 shadow-xl"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Lightbox navigation arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all group shadow-xl"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform text-[#e6c154]" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all group shadow-xl"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform text-[#e6c154]" />
                </button>

                {/* Essential Info Overlay */}
                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 pointer-events-none z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div className="bg-[#060914]/80 border border-[#c9a84c]/20 rounded-2xl p-4 sm:p-5 sm:max-w-max backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                    <div className="inline-flex px-3 py-1 bg-[#c9a84c]/20 border border-[#c9a84c]/30 text-[#e6c154] text-xs font-semibold uppercase tracking-widest rounded-full mb-2">
                      {currentImage.category}
                    </div>
                    <div className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
                      {currentImage.alt}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
