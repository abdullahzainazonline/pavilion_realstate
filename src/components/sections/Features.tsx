"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  Star, ChevronLeft, ChevronRight, ClipboardList, MapPin, Building2, Dumbbell, Sofa, Waves, Link2
} from "lucide-react";

/* ── Features data from official website ─────────────────────────────────────── */
const featuresData = [
  {
    id: "Golden Triangle",
    headline: "Located in Kuala Lumpur’s Golden Triangle",
    tagline: "A Prestigious Address",
    description: "Situated within Kuala Lumpur’s Golden Triangle area, providing immediate access to business, retail, and lifestyle amenities in the surrounding vibrant vicinity.",
    image: "/features/4.png",
    bgImage: "/features/4.png",
    accent: "#f59e0b",
    icon: MapPin,
  },
  {
    id: "Link Bridge",
    headline: "Direct Covered Link Bridge to Pavilion Mall",
    tagline: "Seamless Retail Access",
    description: "Planned covered link bridge connection providing convenient, weather-proof access directly to Pavilion Kuala Lumpur's celebrated retail, dining, and luxury entertainment offerings.",
    image: "/features/Untitled-design.png",
    bgImage: "/features/Untitled-design.png",
    accent: "#c9a84c",
    icon: Link2,
  },
  {
    id: "Furnished",
    headline: "Fully Furnished with Integrated Appliances",
    tagline: "Move-In Ready Luxury",
    description: "Selected units are offered with integrated premium fittings and appliances such as refrigerator, washer, microwave, hood, and hob, providing a seamless transition to luxurious living.",
    image: "/features/5.png",
    bgImage: "/features/5.png",
    accent: "#8b5cf6",
    icon: Sofa,
  },
  {
    id: "Infinity Pool",
    headline: "118-Metre Infinity Pool with City Views",
    tagline: "A Sublime Sky Retreat",
    description: "Includes an approximately 118-metre infinity pool designed to offer elevated, unobstructed views of the Kuala Lumpur skyline — the perfect sanctuary above the city.",
    image: "/features/6.png",
    bgImage: "/features/6.png",
    accent: "#06b6d4",
    icon: Waves,
  },
  {
    id: "Gym",
    headline: "Extensive Gym Facility in KLCC",
    tagline: "15,000 sq.ft. Fitness Oasis",
    description: "Features a spacious private gym facility of approximately 15,000 sq ft, offering a range of fitness equipment for residents to maintain peak health and well-being in the heart of the city.",
    image: "/features/1.png",
    bgImage: "/features/1.png",
    accent: "#10b981",
    icon: Dumbbell,
  },
  {
    id: "Exchange 106",
    headline: "Proximity to The Exchange 106",
    tagline: "The Business Epicentre",
    description: "Located within Kuala Lumpur’s central business district, with unparalleled accessibility to surrounding commercial and office landmarks including the iconic Exchange 106 Office Tower.",
    image: "/features/3.png",
    bgImage: "/features/3.png",
    accent: "#0ea5e9",
    icon: Building2,
  },
];

export default function Features() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = featuresData[activeIdx];

  const nextSlide = () => setActiveIdx((prev) => (prev + 1) % featuresData.length);
  const prevSlide = () => setActiveIdx((prev) => (prev - 1 + featuresData.length) % featuresData.length);
  const selectFeature = (i: number) => setActiveIdx(i);

  return (
    <section id="features" className="relative min-h-screen w-full bg-[#060914] pt-20 pb-20 overflow-hidden">
      {/* Full-bleed background per feature */}
      {featuresData.map((f, i) => (
        <motion.div
          key={f.id}
          className="absolute inset-0"
          animate={{ opacity: i === activeIdx ? 1 : 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <Image src={f.bgImage} alt={f.headline} fill sizes="100vw" priority={i === 0} className="object-cover kb-zoom-bg" style={{ filter: "brightness(0.35) saturate(0.8)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/96 via-[#0e0c14]/80 to-[#060914]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-transparent to-[#060914]/50" />
        </motion.div>
      ))}

      {/* ── Global Desktop Arrow Navigation ── */}
      <div className="hidden lg:flex absolute inset-y-0 left-4 xl:left-8 items-center z-30 pointer-events-none">
        <button onClick={prevSlide} aria-label="Previous feature" className="pointer-events-auto w-14 h-14 rounded-full border border-[#c9a84c]/50 bg-[#08070c]/60 backdrop-blur-xl flex items-center justify-center text-[#ffd700] hover:bg-[#c9a84c]/40 hover:border-[#ffd700] hover:scale-110 transition-all duration-300 shadow-[0_4px_25px_rgba(196,162,101,0.2)]">
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="hidden lg:flex absolute inset-y-0 right-4 xl:right-8 items-center z-30 pointer-events-none">
        <button onClick={nextSlide} aria-label="Next feature" className="pointer-events-auto w-14 h-14 rounded-full border border-[#c9a84c]/50 bg-[#08070c]/60 backdrop-blur-xl flex items-center justify-center text-[#ffd700] hover:bg-[#c9a84c]/40 hover:border-[#ffd700] hover:scale-110 transition-all duration-300 shadow-[0_4px_25px_rgba(196,162,101,0.2)]">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-20 lg:py-28">

        {/* Section heading */}
        <div className="mb-10 min-[390px]:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <Star className="w-3 h-3" />
            Signature Highlights
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[11vw] min-[390px]:text-[12vw] sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.9] tracking-tight"
          >
            Pavilion Square <em style={{ fontStyle: "normal", WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Features</em>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left center" }}
            className="section-divider mt-4"
          />
        </div>

        {/* Level tabs - Horizontal scroll on all devices to keep it on one line */}
        <div className="flex flex-nowrap overflow-x-auto items-center justify-start gap-2.5 sm:gap-3 lg:gap-2 xl:gap-4 mb-8 sm:mb-14 pb-4 sm:pb-0 snap-x snap-mandatory w-[calc(100vw-2rem)] max-w-full lg:w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-1 px-1 sm:mx-0 sm:px-0 relative z-20">
          {featuresData.map((f, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={f.id}
                onClick={() => selectFeature(i)}
                className={`snap-center shrink-0 relative flex items-center gap-1.5 sm:gap-2 lg:gap-1.5 xl:gap-2.5 px-4 sm:px-5 lg:px-4 xl:px-6 py-2.5 sm:py-3 lg:py-2.5 xl:py-3.5 rounded-full border transition-all duration-300 font-bold tracking-wide active:scale-95 ${isActive
                  ? "text-[#060914] border-[#c9a84c] bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] shadow-[0_4px_24px_rgba(201,168,76,0.5)]"
                  : "text-[#c9a84c]/80 border-[#c9a84c]/30 bg-[#c9a84c]/5 hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/80 hover:text-[#ffd700]"
                  }`}
              >
                <f.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 xl:w-5 xl:h-5 ${isActive ? "text-[#060914]" : ""}`} />
                <span className="text-[11px] sm:text-[12px] lg:text-[11px] xl:text-[13px] uppercase whitespace-nowrap">{f.id}</span>
              </button>
            );
          })}
        </div>

        {/* Main content area */}
        <div className="flex-1 grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Left — Details & Utilities */}
          <div className="lg:col-span-3 flex flex-col justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 min-[390px]:mb-6 w-fit text-[10px] min-[390px]:text-[11px] uppercase tracking-widest font-bold shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  style={{ background: `${active.accent}18`, border: `1px solid ${active.accent}35`, color: active.accent }}>
                  <active.icon className="w-3.5 h-3.5" />
                  Premium Offering
                </div>

                <h3 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-heading font-black text-white mb-4 min-[390px]:mb-5 leading-[1.05] tracking-tight drop-shadow-lg max-w-[95%]">
                  {active.headline}
                </h3>

                <div className="text-[#c9a84c]/90 text-[15px] min-[390px]:text-[16px] sm:text-xl md:text-2xl mb-6 min-[390px]:mb-8 font-medium bg-gradient-to-r from-[#c9a84c]/15 to-transparent p-4 rounded-xl border-l-4 border-[#c9a84c] leading-snug w-fit pr-10 shadow-lg backdrop-blur-sm">
                  {active.tagline}
                </div>

                <p
                  className="text-white/90 text-[16px] sm:text-[18px] leading-[1.8] max-w-[95%] xl:max-w-[90%] font-light tracking-wide lg:pr-8 mb-5"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                >
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons - Rendered statically outside the animated slide so they don't fade out and in.
                On mobile, we hide this block and show a duplicate block below the image. */}
            <div className="hidden lg:flex flex-row items-center justify-start gap-4 sm:gap-5 mt-4 sm:mt-10 lg:mt-6 relative z-20">
              <a href="#contact" className="btn-gold rounded-xl py-3.5 px-6 sm:px-8 justify-center min-w-[200px] shadow-[0_4px_24px_rgba(201,168,76,0.25)]">
                <ClipboardList className="w-5 h-5 mr-1.5" />Book Appointment
              </a>
              <a
                href="https://wa.link/kgsiw7"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl py-3.5 px-6 sm:px-8 justify-center min-w-[200px] flex items-center gap-2 bg-[#060914]/40 text-[#25D366] hover:text-[#20b858] border-2 border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300 shadow-[0_4px_24px_rgba(201,168,76,0.15)] font-bold tracking-wide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366] transition-colors duration-300">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp Now
              </a>
            </div>
          </div>

          {/* Right — Creative Image Container */}
          <div className="lg:col-span-2 flex flex-col justify-center h-full w-full py-4 lg:py-0 mt-8 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${active.id}`}
                initial={{ opacity: 0, x: 40, scale: 0.95, rotateY: 5 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, x: -40, scale: 0.95, rotateY: -5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -60 || velocity.x < -400) {
                    nextSlide();
                  } else if (offset.x > 60 || velocity.x > 400) {
                    prevSlide();
                  }
                }}
                className="relative w-full rounded-3xl overflow-hidden img-card-hover aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] group shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:-translate-y-2 transition-transform duration-700 mx-auto cursor-grab active:cursor-grabbing touch-pan-y"
              >
                {/* Main image - Pure and Beautiful */}
                <Image
                  src={active.image}
                  alt={active.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-[#060914]/10 transition-opacity duration-700 pointer-events-none" />

                {/* Mobile Slide Controls inside Image Card */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 lg:hidden z-20 pointer-events-none">
                  <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} aria-label="Previous feature" className="w-10 h-10 rounded-full bg-[#08070c]/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 pointer-events-auto shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} aria-label="Next feature" className="w-10 h-10 rounded-full bg-[#08070c]/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 pointer-events-auto shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* CTA Buttons - Mobile Only (Displayed below the image) */}
            <div className="flex lg:hidden flex-col items-center justify-center gap-4 mt-6 w-full relative z-20">
              <a href="#contact" className="btn-gold rounded-xl py-3.5 px-6 justify-center w-full max-w-sm shadow-[0_4px_24px_rgba(201,168,76,0.25)]">
                <ClipboardList className="w-5 h-5 mr-1.5" />Book Appointment
              </a>
              <a
                href="https://wa.link/kgsiw7"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl py-3.5 px-6 justify-center w-full max-w-sm flex items-center gap-2 bg-[#060914]/40 text-[#25D366] hover:text-[#20b858] border-2 border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300 shadow-[0_4px_24px_rgba(201,168,76,0.15)] font-bold tracking-wide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366] transition-colors duration-300">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
    </section>
  );
}
