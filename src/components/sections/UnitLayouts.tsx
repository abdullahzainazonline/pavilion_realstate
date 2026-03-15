"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  BedDouble, Bath, Maximize2, ChevronLeft, ChevronRight,
  X, Building2, Star, Eye, Home, Sparkles, UtensilsCrossed,
  Sunset, LayoutGrid, Sofa,
} from "lucide-react";

/* ── Feature icon map ─────────────────────────────── */
const FEATURE_CONFIG: Record<string, { icon: React.ElementType }> = {
  "Open-plan layout": { icon: LayoutGrid },
  "Premium finishes": { icon: Sparkles },
  "City view": { icon: Building2 },
  "Fully furnished": { icon: Home },
  "Separate bedroom": { icon: BedDouble },
  "Balcony": { icon: Sunset },
  "Designer kitchen": { icon: UtensilsCrossed },
  "Flexi room": { icon: LayoutGrid },
  "Generous living area": { icon: Sofa },
  "Wraparound views": { icon: Sunset },
  "Luxury bathroom": { icon: Bath },
  "Dual master": { icon: BedDouble },
  "Full kitchen": { icon: UtensilsCrossed },
  "Entertainment area": { icon: Sofa },
  "Corner unit": { icon: LayoutGrid },
  "Panoramic views": { icon: Sunset },
  "Double vanity": { icon: Bath },
  "Premium floor level": { icon: Building2 },
  "Extended balcony": { icon: Sunset },
  "High-spec fit-out": { icon: Sparkles },
  "Dual-aspect view": { icon: Sunset },
  "Walk-in wardrobe": { icon: Star },
  "Luxury bathtub": { icon: Bath },
  "Flagship unit": { icon: Star },
  "Sky views all sides": { icon: Sunset },
  "3 en-suite baths": { icon: Bath },
};

/* ── Unit types ── */
const residentialUnits = [
  {
    type: "Type A", label: "Studio",
    sqft: 504, sqm: 46.8, beds: 0, baths: 1,
    floors: "Residential Tower",
    image: "/page_15_img_1.jpeg",
    bgImage: "/page_15_img_1.jpeg",
    price: "Contact for Price",
    // features: ["Open-plan layout", "Premium finishes", "City view"],
    highlight: false,
  },
  {
    type: "Type B1", label: "1+1 Rooms",
    sqft: 770, sqm: 71.5, beds: 1, baths: 1,
    floors: "Residential Tower",
    image: "/page_15_img_2.jpeg",
    bgImage: "/page_15_img_2.jpeg",
    price: "Contact for Price",
    features: [],
    highlight: false,
  },
  {
    type: "Type B2", label: "1+1 Rooms",
    sqft: 772, sqm: 71.7, beds: 1, baths: 1,
    floors: "Residential Tower",
    image: "/page_15_img_3.jpeg",
    bgImage: "/page_15_img_3.jpeg",
    price: "Contact for Price",
    // features: ["Balcony"],
    highlight: false,
  },
  {
    type: "Type B3", label: "2 Rooms",
    sqft: 966, sqm: 89.7, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_4.jpeg",
    bgImage: "/page_15_img_4.jpeg",
    price: "Contact for Price",
    // features: ["Dual master", "Full kitchen", "Entertainment area"],
    highlight: true,
  },
  {
    type: "Type C1", label: "2+1 Rooms",
    sqft: 978, sqm: 90.9, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_5.jpeg",
    bgImage: "/page_15_img_5.jpeg",
    price: "Contact for Price",
    // features: ["Panoramic views", "Double vanity"],
    highlight: false,
  },
  {
    type: "Type C2", label: "2+1 Rooms",
    sqft: 1100, sqm: 102.2, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_1.jpeg",
    bgImage: "/page_15_img_1.jpeg",
    price: "Contact for Price",
    // features: ["Premium floor level", "Extended balcony", "High-spec fit-out"],
    highlight: false,
  },
  {
    type: "Type C3", label: "2+1 Rooms",
    sqft: 1272, sqm: 118.2, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_2.jpeg",
    bgImage: "/page_15_img_2.jpeg",
    price: "Contact for Price",
    // features: ["Dual-aspect view", "Walk-in wardrobe", "Luxury bathtub"],
    highlight: true,
  },
  {
    type: "Type D", label: "3 Rooms",
    sqft: 1255, sqm: 116.6, beds: 3, baths: 3,
    floors: "Residential Tower",
    image: "/page_15_img_4.jpeg",
    bgImage: "/page_15_img_4.jpeg",
    price: "Contact for Price",
    // features: ["Flagship unit", "Sky views all sides", "3 en-suite baths"],
    highlight: true,
  },
];

type Unit = typeof residentialUnits[0];

/* ── Section BG ── */
function UnitBg({ unit }: { unit: Unit }) {
  return (
    <div className="absolute inset-0">
      <motion.div
        key={unit.type}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image src={unit.bgImage} alt={unit.label} fill sizes="100vw" priority className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/98 via-[#060914]/88 to-[#060914]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-transparent to-[#060914]/70" />
    </div>
  );
}



export default function UnitLayouts() {
  const units = residentialUnits;
  const [activeIdx, setActiveIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const activeUnit = units[activeIdx] as Unit;

  const navigate = (delta: number) => {
    setDir(delta);
    setActiveIdx((i) => (i + delta + units.length) % units.length);
  };

  const select = (i: number) => {
    setDir(i > activeIdx ? 1 : -1);
    setActiveIdx(i);
  };

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  return (
    <section id="units" className="relative overflow-hidden bg-[#060914] flex flex-col justify-center py-12 lg:py-16">

      {/* Dynamic BG */}
      <AnimatePresence>
        <UnitBg key={`unit-bg-${activeIdx}`} unit={activeUnit} />
      </AnimatePresence>

      {/* ── Global Desktop Arrow Navigation ── */}
      <div className="hidden lg:flex absolute inset-y-0 left-4 xl:left-8 items-center z-30 pointer-events-none">
        <button onClick={() => navigate(-1)} aria-label="Previous Unit" className="pointer-events-auto w-14 h-14 rounded-full border border-[#c9a84c]/50 bg-[#08070c]/60 backdrop-blur-xl flex items-center justify-center text-[#ffd700] hover:bg-[#c9a84c]/40 hover:border-[#ffd700] hover:scale-110 transition-all duration-300 shadow-[0_4px_25px_rgba(196,162,101,0.2)]">
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="hidden lg:flex absolute inset-y-0 right-4 xl:right-8 items-center z-30 pointer-events-none">
        <button onClick={() => navigate(1)} aria-label="Next Unit" className="pointer-events-auto w-14 h-14 rounded-full border border-[#c9a84c]/50 bg-[#08070c]/60 backdrop-blur-xl flex items-center justify-center text-[#ffd700] hover:bg-[#c9a84c]/40 hover:border-[#ffd700] hover:scale-110 transition-all duration-300 shadow-[0_4px_25px_rgba(196,162,101,0.2)]">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-5">

        {/* ── Header ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-3"
          >
            <Building2 className="w-3 h-3" />
            Luxury Residences
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[11vw] sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.9] tracking-tight drop-shadow-2xl"
          >
            Unit{" "}
            <em style={{
              fontStyle: "normal",
              WebkitTextFillColor: "transparent",
              background: "linear-gradient(135deg,#c9a84c,#ffd700)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}>
              Layouts
            </em>
          </motion.h2>
          <div className="section-divider mt-3" />
        </div>

        {/* ── Unit pill tabs ── */}
        <div className="flex gap-2 sm:gap-3 pb-3 border-b border-white/10 overflow-x-auto hide-scrollbar snap-x touch-pan-x">
          {units.map((u, i) => {
            const isActive = i === activeIdx;
            return (
              <motion.button
                key={u.type}
                onClick={() => select(i)}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className={`tab-pill relative overflow-hidden flex-shrink-0 min-w-fit px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border ${isActive ? "border-[#c9a84c] bg-[#c9a84c]/10" : "border-white/10 bg-white/5"} flex items-center justify-center gap-1.5 snap-center transition-colors`}
              >
                {isActive && (
                  <motion.span
                    layoutId="pill-active-bg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9a84c]/20 to-[#ffd700]/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative text-xs sm:text-sm font-black whitespace-nowrap tracking-wider drop-shadow-md ${isActive ? "text-[#ffd700]" : "text-[#c9a84c]/80"}`}>{u.type}</span>
                <span className={`relative whitespace-nowrap text-[10px] sm:text-[11px] drop-shadow-sm ${isActive ? "text-white flex" : "text-white/50 hidden lg:flex"}`}>· {u.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* ── Active Layout Display ── */}
        <div className="mt-4 sm:mt-8">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={`layout-${activeIdx}`}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) {
                  navigate(1);
                } else if (swipe > 50) {
                  navigate(-1);
                }
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center cursor-grab active:cursor-grabbing"
            >

              {/* Left: Interactive Image Viewer */}
              <div className="order-last lg:order-first col-span-1 lg:col-span-7 relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-[#0a0c14]/80 backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] border border-[#c9a84c]/20 shadow-[0_0_50px_rgba(201,168,76,0.08)] flex items-center justify-center p-6 sm:p-10 group overflow-hidden pointer-events-none sm:pointer-events-auto">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#c9a84c15_0,transparent_75%)] pointer-events-none" />

                <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <Image
                    src={activeUnit.image}
                    alt={activeUnit.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    priority
                  />
                </div>

                {/* Slider Nav Buttons overlay on image */}
                <div className="absolute inset-y-0 left-2 right-2 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none z-20 lg:hidden">
                  <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#c9a84c]/40 bg-[#08070c]/70 backdrop-blur-md flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#08070c] transition-all duration-300 pointer-events-auto transform hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 -ml-0.5" />
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#c9a84c]/40 bg-[#08070c]/70 backdrop-blur-md flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#08070c] transition-all duration-300 pointer-events-auto transform hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
                  >
                    <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 -mr-0.5" />
                  </button>
                </div>
              </div>

              {/* Right: Info Panel */}
              <div className="order-first lg:order-last col-span-1 lg:col-span-5 flex flex-col justify-center h-full gap-6 sm:gap-8 lg:pr-4">

                {/* Header */}
                <div className="flex flex-col gap-2 relative z-10 w-fit mx-auto lg:mx-0 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <div className="w-[3px] h-8 rounded-full bg-gradient-to-b from-[#c9a84c] to-[#ffd700]" />
                    <div className="text-[#c9a84c] font-black uppercase tracking-[0.3em] text-sm sm:text-xs drop-shadow-md">
                      Floor Plan Details
                    </div>
                  </div>
                  <h3 className="text-5xl sm:text-5xl lg:text-7xl font-heading font-black text-white leading-[1.05] drop-shadow-2xl">
                    {activeUnit.type}
                    <span className="block text-2xl sm:text-3xl text-white/70 font-normal mt-2 lg:mt-3 tracking-wide drop-shadow-lg">
                      {activeUnit.label}
                    </span>
                  </h3>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 p-5 sm:p-7 bg-[#0a0c14]/70 border border-[#c9a84c]/20 rounded-[1.5rem] shadow-2xl backdrop-blur-md w-full relative z-10">

                  {/* Size */}
                  <div className="flex flex-col gap-1.5 p-1">
                    <div className="flex items-center gap-2 text-[#c9a84c]/90 drop-shadow-sm">
                      <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-xs font-black uppercase tracking-[0.2em] opacity-90">Size</span>
                    </div>
                    <div className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-none drop-shadow-lg">{activeUnit.sqft} <span className="text-sm sm:text-[13px] font-medium text-white/60 tracking-normal">sq.ft.</span></div>
                  </div>

                  {/* Bed */}
                  <div className="flex flex-col gap-1.5 p-1 border-l border-white/5 pl-4 sm:pl-5">
                    <div className="flex items-center gap-2 text-[#c9a84c]/90 drop-shadow-sm">
                      <BedDouble className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-xs font-black uppercase tracking-[0.2em] opacity-90">Bedrooms</span>
                    </div>
                    <div className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-none drop-shadow-lg">{activeUnit.beds > 0 ? activeUnit.beds : "Studio"}</div>
                  </div>

                  {/* Bath */}
                  <div className="flex flex-col gap-1.5 p-1 border-t border-white/5 pt-4 sm:pt-5">
                    <div className="flex items-center gap-2 text-[#c9a84c]/90 drop-shadow-sm">
                      <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-xs font-black uppercase tracking-[0.2em] opacity-90">Bathrooms</span>
                    </div>
                    <div className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-none drop-shadow-lg">{activeUnit.baths}</div>
                  </div>

                  {/* Tower */}
                  <div className="flex flex-col gap-1.5 p-1 border-t border-l border-white/5 pt-4 sm:pt-5 pl-4 sm:pl-5">
                    <div className="flex items-center gap-2 text-[#c9a84c]/90 drop-shadow-sm">
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-xs font-black uppercase tracking-[0.2em] opacity-90">Tower</span>
                    </div>
                    <div className="text-lg sm:text-[17px] font-bold text-white tracking-tight leading-snug truncate pr-2 mt-0.5 drop-shadow-md" title={activeUnit.floors}>{activeUnit.floors.replace(" Tower", "")}</div>
                  </div>

                </div>

                {/* Features Pill list */}
                {activeUnit.features && activeUnit.features.length > 0 && (
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 relative z-10">
                    {activeUnit.features.map((feat, idx) => {
                      const FeatIcon = FEATURE_CONFIG[feat]?.icon || Sparkles;
                      return (
                        <div key={idx} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-white/90 text-sm sm:text-[12px] font-medium backdrop-blur shadow-sm drop-shadow-md">
                          <FeatIcon className="w-3 h-3 text-[#c9a84c] shrink-0" />
                          {feat}
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-md mx-auto lg:max-w-none lg:mx-0 relative z-10">
            <a
              href={`https://wa.me/60122705608?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(activeUnit.type)}%20at%20Pavilion%20Square`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group relative overflow-hidden flex justify-center items-center gap-2 px-5 py-4 sm:py-3.5 rounded-xl bg-[#c9a84c] text-[#060914] font-bold text-sm sm:text-[15px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_25px_rgba(201,168,76,0.35)] hover:shadow-[0_6px_35px_rgba(201,168,76,0.55)]"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] relative z-10 shrink-0">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span className="relative z-10 drop-shadow-md">E-Brochure</span>
            </a>

            <a
              href={`https://wa.me/60122705608?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(activeUnit.type)}%20at%20Pavilion%20Square`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group relative overflow-hidden flex justify-center items-center gap-2 px-5 py-4 sm:py-3.5 rounded-xl border-2 border-[#c9a84c]/60 bg-[#060914]/40 backdrop-blur-md text-[#25D366] font-bold text-sm sm:text-[15px] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] relative z-10 shrink-0 fill-[#25D366] group-hover:fill-[#20b858] transition-colors duration-300">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span className="relative z-10 whitespace-nowrap drop-shadow-md">WhatsApp Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
    </section>
  );
}
