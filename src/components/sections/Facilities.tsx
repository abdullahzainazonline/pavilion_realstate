"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Waves, Dumbbell, TreePine, CheckCircle, Flame, Star, ChevronLeft, ChevronRight
} from "lucide-react";

/* ── Levels data ─────────────────────────────────────── */
const levels = [
  {
    id: "L67",
    level: "Level 67",
    headline: "118-Metre Infinity Pool",
    tagline: "Highest Rooftop Pool in KL City Centre",
    description:
      "67 storeys above Kuala Lumpur — plunge into the longest rooftop infinity pool in the city. At 118 metres, this sky-high oasis offers breathtaking 360° panoramic views of the KL skyline, surrounded by a sun deck, sky lounge, and private Jacuzzi.",
    image: "/page_9_img_1.jpeg",
    bgImage: "/page_9_img_1.jpeg",
    stat: "118m",
    statLabel: "Pool Length",
    accent: "#06b6d4",
    features: ["118m Infinity Pool", "Sky Lounge & Bar", "Private Jacuzzi", "Sun Deck Cabanas", "Panoramic KL Views", "Poolside Dining"],
    icon: Waves,
  },
  {
    id: "L66",
    level: "Level 66",
    headline: "Sky Facilities Deck",
    tagline: "Entertainment Above the Clouds",
    description:
      "A curated sky-high sanctuary blending modern sophistication with peaceful retreat. BBQ terraces, private dining, an entertainment lounge — making Level 66 the ultimate destination for gatherings above Kuala Lumpur.",
    image: "/page_10_img_2.jpeg",
    bgImage: "/page_10_img_2.jpeg",
    stat: "Level 66",
    statLabel: "Sky Deck",
    accent: "#f59e0b",
    features: ["Sky Terrace", "BBQ & Dining", "Entertainment Lounge", "Outdoor Cinema", "Private Function Rooms", "Alfresco Seating"],
    icon: Flame,
  },
  {
    id: "L63A",
    level: "Level 63A",
    headline: "Sky Wellness Centre",
    tagline: "Largest Sky Gym in KL City Centre",
    description:
      "15,000 sq.ft. of world-class wellness facilities — the highest and most expansive Sky Wellness floor in Kuala Lumpur. World-class gym equipment, yoga studios, sauna & steam rooms, and outdoor fitness decks.",
    image: "/page_11_img_1.jpeg",
    bgImage: "/page_12_img_1.jpeg",
    stat: "15,000",
    statLabel: "sq.ft. Wellness",
    accent: "#10b981",
    features: ["Indoor Sky Gym", "Outdoor Fitness Deck", "Yoga & Pilates Studio", "Sauna & Steam Room", "Sports Lounge", "Meditation Garden"],
    icon: Dumbbell,
  },
  {
    id: "L12",
    level: "Level 12",
    headline: "Courtyard Garden",
    tagline: "A Community at the Heart of It All",
    description:
      "A lushly landscaped 30,000 sq.ft. garden paradise at 12 storeys above street level — featuring a serene walk trail, kids playground, yoga deck, BBQ deck, multi-purpose hall, karaoke, pool table, and a club lounge.",
    image: "/page_13_img_1.jpeg",
    bgImage: "/page_14_img_1.jpeg",
    stat: "30K sqft",
    statLabel: "Garden Level",
    accent: "#84cc16",
    features: ["Serene Trail & Garden", "Kids Playground", "BBQ Deck", "Multi-purpose Hall", "Club Lounge", "Karaoke & Games Room"],
    icon: TreePine,
  },
];


export default function Facilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = levels[activeIdx];

  const nextSlide = () => setActiveIdx((prev) => (prev + 1) % levels.length);
  const prevSlide = () => setActiveIdx((prev) => (prev - 1 + levels.length) % levels.length);
  const selectLevel = (i: number) => setActiveIdx(i);

  return (
    <section id="facilities" className="relative min-h-screen w-full bg-[#060914] pt-20 pb-20 overflow-hidden">

      {/* Full-bleed background per level */}
      {levels.map((l, i) => (
        <motion.div
          key={l.id}
          className="absolute inset-0"
          animate={{ opacity: i === activeIdx ? 1 : 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <Image src={l.bgImage} alt={l.headline} fill sizes="100vw" priority={i === 0} className="object-cover kb-zoom-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/96 via-[#0e0c14]/80 to-[#060914]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-transparent to-[#060914]/50" />
        </motion.div>
      ))}

      {/* ── Global Desktop Arrow Navigation ── */}
      <div className="hidden lg:flex absolute inset-y-0 left-4 xl:left-8 items-center z-30 pointer-events-none">
        <button onClick={prevSlide} className="pointer-events-auto w-14 h-14 rounded-full border border-[#c9a84c]/50 bg-[#08070c]/60 backdrop-blur-xl flex items-center justify-center text-[#ffd700] hover:bg-[#c9a84c]/40 hover:border-[#ffd700] hover:scale-110 transition-all duration-300 shadow-[0_4px_25px_rgba(196,162,101,0.2)]">
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="hidden lg:flex absolute inset-y-0 right-4 xl:right-8 items-center z-30 pointer-events-none">
        <button onClick={nextSlide} className="pointer-events-auto w-14 h-14 rounded-full border border-[#c9a84c]/50 bg-[#08070c]/60 backdrop-blur-xl flex items-center justify-center text-[#ffd700] hover:bg-[#c9a84c]/40 hover:border-[#ffd700] hover:scale-110 transition-all duration-300 shadow-[0_4px_25px_rgba(196,162,101,0.2)]">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-28">

        {/* Section heading */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <Star className="w-3 h-3" />
            World-Class Lifestyle Amenities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[12vw] min-[390px]:text-[13vw] sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.9] tracking-tight"
          >
            Sky-High <em style={{ fontStyle: "normal", WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Facilities</em>
            <br />Like No Other
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

        {/* Level tabs - Grid layout for mobile */}
        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-2 mb-2 sm:mb-6 px-4 sm:px-0 -mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-auto">
          {levels.map((l, i) => (
            <button
              key={l.id}
              onClick={() => selectLevel(i)}
              className={`tab-pill whitespace-nowrap justify-center w-full px-2 py-2.5 min-[390px]:py-3 sm:px-4 sm:py-2 ${i === activeIdx ? "active" : ""}`}
            >
              <span className="mr-1 min-[390px]:mr-1.5 text-[10px] min-[390px]:text-[11px] font-bold opacity-80">{l.id}</span>
              <span className="text-[11px] min-[390px]:text-[12px] truncate">{l.headline.split(" ").slice(0, 2).join(" ")}</span>
            </button>
          ))}
        </div>

        {/* Main content area */}
        <div className="flex-1 grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 items-center">

          {/* Left — Details & Facilities List */}
          <div className="lg:col-span-3 flex flex-col justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col justify-center"
              >
                {/* Level badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 min-[390px]:mb-6 w-fit text-[10px] min-[390px]:text-[11px] uppercase tracking-widest font-bold shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  style={{ background: `${active.accent}18`, border: `1px solid ${active.accent}35`, color: active.accent }}>
                  <active.icon className="w-3.5 h-3.5" />
                  {active.level}
                </div>

                <h3 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black text-white mb-3 min-[390px]:mb-4 leading-[1.05] tracking-tight">
                  {active.headline}
                </h3>

                <div className="text-[#c9a84c]/90 text-[14px] min-[390px]:text-[16px] sm:text-xl md:text-2xl mb-6 min-[390px]:mb-8 font-medium bg-gradient-to-r from-[#c9a84c]/15 to-transparent p-4 rounded-xl border-l-4 border-[#c9a84c] leading-snug w-fit pr-10">
                  {active.tagline}
                </div>

                {/* Description Paragraph */}
                <p 
                  className="text-white/95 text-[15px] sm:text-[17px] leading-[1.7] max-w-[95%] xl:max-w-[85%] font-light tracking-wide lg:pr-8"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,1)" }}
                >
                   {active.description}
                </p>

                {/* Progress Tracker (Desktop) */}
                <div className="hidden lg:flex items-center gap-3 mt-8 opacity-80">
                  <div className="text-[10px] font-mono tracking-[0.4em] text-white/50 font-bold uppercase flex items-center gap-2">
                    <span className="text-[#ffd700] text-[12px] bg-[#ffd700]/10 px-2.5 py-1 rounded border border-[#ffd700]/20">{String(activeIdx + 1).padStart(2, '0')}</span> 
                    <span className="mx-1">/</span> 
                    {String(levels.length).padStart(2, '0')}
                  </div>
                  <div className="h-px w-16 bg-gradient-to-r from-[#c9a84c]/40 to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — Creative Image Container (Title Only) */}
          <div className="lg:col-span-2 flex flex-col justify-center h-full w-full py-4 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${active.id}`}
                initial={{ opacity: 0, x: 40, scale: 0.95, rotateY: 5 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, x: -40, scale: 0.95, rotateY: -5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full rounded-3xl overflow-hidden img-card-hover aspect-[4/5] sm:aspect-[3/4] lg:aspect-square xl:aspect-[4/5] group shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:-translate-y-2 transition-transform duration-700"
              >
                {/* Main image */}
                <Image
                  src={active.image}
                  alt={active.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Minimalist overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-[#060914]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0" style={{ background: `radial-gradient(circle at top right, ${active.accent}20, transparent 60%)` }} />

                {/* Bottom title display */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="text-[10px] sm:text-[12px] uppercase tracking-[0.3em] font-bold mb-2 opacity-80" style={{ color: active.accent }}>
                      {active.statLabel || "Signature"}
                    </div>
                    <div className="text-3xl sm:text-4xl font-heading font-black text-white leading-tight drop-shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {active.headline}
                    </div>
                  </motion.div>
                </div>

                {/* Animated glowing border */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-colors duration-700"
                  style={{ boxShadow: `inset 0 0 0 1px ${active.accent}40` }}
                />

                {/* Mobile Slide Controls inside Image Card */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:hidden z-20 pointer-events-none">
                  <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="w-10 h-10 rounded-full bg-[#08070c]/70 backdrop-blur-md border border-[#c9a84c]/40 flex items-center justify-center text-[#ffd700] hover:bg-[#c9a84c]/30 hover:border-[#ffd700] transition-all duration-300 pointer-events-auto shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="w-10 h-10 rounded-full bg-[#08070c]/70 backdrop-blur-md border border-[#c9a84c]/40 flex items-center justify-center text-[#ffd700] hover:bg-[#c9a84c]/30 hover:border-[#ffd700] transition-all duration-300 pointer-events-auto shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>


      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
    </section>
  );
}
