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
    features: ["Open-plan layout", "Premium finishes", "City view", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type B1", label: "1+1 Rooms",
    sqft: 770, sqm: 71.5, beds: 1, baths: 1,
    floors: "Residential Tower",
    image: "/page_15_img_2.jpeg",
    bgImage: "/page_15_img_2.jpeg",
    price: "Contact for Price",
    features: ["Separate bedroom", "Flexi room", "Designer kitchen", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type B2", label: "1+1 Rooms",
    sqft: 772, sqm: 71.7, beds: 1, baths: 1,
    floors: "Residential Tower",
    image: "/page_15_img_3.jpeg",
    bgImage: "/page_15_img_3.jpeg",
    price: "Contact for Price",
    features: ["Separate bedroom", "Flexi room", "Balcony", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type B3", label: "2 Rooms",
    sqft: 966, sqm: 89.7, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_4.jpeg",
    bgImage: "/page_15_img_4.jpeg",
    price: "Contact for Price",
    features: ["Dual master", "Full kitchen", "Entertainment area", "Fully furnished"],
    highlight: true,
  },
  {
    type: "Type C1", label: "2+1 Rooms",
    sqft: 978, sqm: 90.9, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_5.jpeg",
    bgImage: "/page_15_img_5.jpeg",
    price: "Contact for Price",
    features: ["Flexi room", "Panoramic views", "Double vanity", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type C2", label: "2+1 Rooms",
    sqft: 1100, sqm: 102.2, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_1.jpeg",
    bgImage: "/page_15_img_1.jpeg",
    price: "Contact for Price",
    features: ["Premium floor level", "Extended balcony", "High-spec fit-out", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type C3", label: "2+1 Rooms",
    sqft: 1272, sqm: 118.2, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_2.jpeg",
    bgImage: "/page_15_img_2.jpeg",
    price: "Contact for Price",
    features: ["Dual-aspect view", "Walk-in wardrobe", "Luxury bathtub", "Fully furnished"],
    highlight: true,
  },
  {
    type: "Type D", label: "3 Rooms",
    sqft: 1255, sqm: 116.6, beds: 3, baths: 3,
    floors: "Residential Tower",
    image: "/page_15_img_4.jpeg",
    bgImage: "/page_15_img_4.jpeg",
    price: "Contact for Price",
    features: ["Flagship unit", "Sky views all sides", "3 en-suite baths", "Fully furnished"],
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

/* ── Unit Detail Modal — shows full specs ── */
function UnitModal({ unit, onClose }: { unit: Unit; onClose: () => void }) {
  const specs = [
    { icon: Maximize2, label: "Size", value: `${unit.sqft} sq.ft.`, sub: `${unit.sqm} sqm` },
    { icon: BedDouble, label: "Bedrooms", value: unit.beds > 0 ? String(unit.beds) : "Studio", sub: unit.beds > 0 ? "Bedroom(s)" : "Open Plan" },
    { icon: Bath, label: "Bathrooms", value: String(unit.baths), sub: "Bathroom(s)" },
    { icon: Building2, label: "Tower", value: unit.floors, sub: "Pavilion Square" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#060914]/92 backdrop-blur-2xl" />
      <motion.div
        initial={{ scale: 0.96, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 30 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full sm:w-[92vw] lg:w-[88vw] max-w-7xl h-[92vh] sm:h-[88vh] bg-[#0a0c14] rounded-t-3xl sm:rounded-3xl border border-[#c9a84c]/20 overflow-hidden shadow-[0_0_80px_rgba(201,168,76,0.12)] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-[4px] h-10 rounded-full bg-gradient-to-b from-[#c9a84c] to-[#ffd700]" />
            <div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#c9a84c]/70 font-bold mb-0.5">Floor Plan</div>
              <div className="text-lg sm:text-2xl font-heading font-black text-white leading-none">
                {unit.type} <span className="text-sm sm:text-base font-normal text-white/50">· {unit.label}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#c9a84c]/15 hover:border-[#c9a84c]/40 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image - Flex to take maximum space */}
        <div className="relative flex-1 min-h-0 bg-white/3 overflow-hidden">
          {/* Mobile: Rotated landscape view to maximize space automatically */}
          <div className="absolute inset-0 sm:hidden origin-center -rotate-90 scale-[1.65] flex items-center justify-center">
            <Image src={unit.image} alt={unit.label} fill sizes="100vh" priority className="object-contain p-2" />
          </div>
          {/* Desktop: Standard proper view */}
          <div className="absolute inset-0 hidden sm:block">
            <Image src={unit.image} alt={unit.label} fill sizes="100vw" priority className="object-contain p-8" />
          </div>
        </div>

        {/* Spec bar — 2×2 on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#c9a84c]/10 border-t border-[#c9a84c]/15 shrink-0">
          {specs.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center gap-1.5 py-4 sm:py-5 px-3 bg-[#0a0c14] text-center">
              <s.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a84c] mb-0.5" />
              <div className="text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-[#c9a84c]/60 font-bold">{s.label}</div>
              <div className="text-sm sm:text-lg font-heading font-black text-white leading-tight">{s.value}</div>
              <div className="text-[10px] sm:text-xs text-white/35 font-medium">{s.sub}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function UnitLayouts() {
  const units = residentialUnits;
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalUnit, setModalUnit] = useState<Unit | null>(null);
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
            className="text-[11vw] sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.9] tracking-tight"
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
        <div className="flex flex-col gap-2 pb-3 border-b border-white/10">
          {[units.slice(0, 4), units.slice(4)].map((row, rowIdx) =>
            row.length > 0 ? (
              <div key={rowIdx} className="grid grid-cols-2 min-[430px]:grid-cols-4 gap-2 w-full">
                {row.map((u, localIdx) => {
                  const i = rowIdx * 4 + localIdx;
                  const isActive = i === activeIdx;
                  return (
                    <motion.button
                      key={u.type}
                      onClick={() => select(i)}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      className={`tab-pill relative overflow-hidden flex-shrink-0 w-full justify-center ${isActive ? "active" : ""}`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pill-active-bg"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9a84c]/15 to-[#ffd700]/10"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative text-[10px] font-black text-[#c9a84c] whitespace-nowrap tracking-wider">{u.type}</span>
                      <span className="relative whitespace-nowrap text-[11px] hidden sm:inline">· {u.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            ) : null
          )}
        </div>

        {/* ── Carousel: ◀ | card | ▶ ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 sm:gap-3">

            {/* ◀ Prev */}
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous unit"
              className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 border border-[#c9a84c]/35 backdrop-blur-md flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/70 hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_18px_rgba(201,168,76,0.18)]"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Image card */}
            <div className="relative flex-1" style={{ height: "clamp(240px, 44vh, 430px)" }}>
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={`img-${activeIdx}`}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onClick={() => setModalUnit(activeUnit)}
                  transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-[#c9a84c]/40 shadow-[0_0_60px_rgba(201,168,76,0.14)] group cursor-pointer"
                >
                  <Image
                    src={activeUnit.image}
                    alt={activeUnit.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  {/* Gradient for overlay legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-[#060914]/20 to-transparent" />

                  {/* Minimal overlay: label + Details button */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`overlay-${activeIdx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute bottom-0 left-0 right-0 px-4 py-4 sm:px-6 sm:py-5 flex items-end justify-between"
                    >
                      {/* Floor plan label */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-[3px] h-9 rounded-full bg-gradient-to-b from-[#c9a84c] to-[#ffd700] shrink-0" />
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.35em] text-[#c9a84c] font-bold mb-0.5">Floor Plan</div>
                          <div className="text-base sm:text-lg font-heading font-black text-white leading-none drop-shadow-lg">
                            {activeUnit.type}
                            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm font-normal text-white/55">· {activeUnit.label}</span>
                          </div>
                        </div>
                      </div>

                      {/* Details button */}
                      <button
                        onClick={() => setModalUnit(activeUnit)}
                        aria-label="View floor plan details"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#060914]/80 border border-[#c9a84c]/30 backdrop-blur-md text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest hover:bg-[#c9a84c]/18 hover:border-[#c9a84c]/60 active:scale-95 transition-all duration-300 shadow-lg"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Details</span>
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ▶ Next */}
            <button
              onClick={() => navigate(1)}
              aria-label="Next unit"
              className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 border border-[#c9a84c]/35 backdrop-blur-md flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/70 hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_18px_rgba(201,168,76,0.18)]"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* ── Buttons: gold-themed pill pair ── */}
          <div className="flex gap-3 sm:gap-4 justify-center px-12 sm:px-14">

            {/* E-Brochure — solid gold */}
            <a
              href="/pavilion-square-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center gap-2 sm:gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#c9a84c] bg-gradient-to-r from-[#c9a84c] via-[#e6c154] to-[#a07830] font-bold text-[12px] sm:text-[13px] text-[#060914] tracking-wide shadow-[0_4px_28px_rgba(201,168,76,0.4)] hover:shadow-[0_6px_40px_rgba(201,168,76,0.65)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] relative z-10 shrink-0">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span className="relative z-10 whitespace-nowrap">E-Brochure</span>
            </a>

            {/* WhatsApp — ghost gold */}
            <a
              href={`https://wa.me/60112880808?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(activeUnit.type)}%20at%20Pavilion%20Square`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center gap-2 sm:gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#c9a84c]/55 bg-transparent font-bold text-[12px] sm:text-[13px] text-[#c9a84c] tracking-wide shadow-[0_4px_24px_rgba(201,168,76,0.18)] hover:bg-[#c9a84c]/12 hover:border-[#c9a84c] hover:shadow-[0_6px_36px_rgba(201,168,76,0.38)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#c9a84c]/15 to-transparent transition-transform duration-700 ease-in-out" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] relative z-10 shrink-0 fill-[#c9a84c] group-hover:fill-[#ffd700] transition-colors duration-300">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span className="relative z-10 whitespace-nowrap">WhatsApp </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

      {/* Modal */}
      <AnimatePresence>
        {modalUnit && <UnitModal unit={modalUnit} onClose={() => setModalUnit(null)} />}
      </AnimatePresence>
    </section>
  );
}
