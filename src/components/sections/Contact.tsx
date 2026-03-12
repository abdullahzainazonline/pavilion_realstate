"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone, Mail, MapPin, Clock, Facebook, Instagram, Globe,
  ExternalLink, CheckCircle, ChevronLeft, ChevronRight,
  MessageSquare, Send, AlertCircle, User, AtSign, Smartphone,
} from "lucide-react";

import { submitContactForm } from "@/actions/contact";

/* ── Gallery images ──────────────────────────────────── */
const gallery = [
  "/pavilionmainview.jpeg",
  "/page_4_img_1.jpeg",
  "/page_9_img_1.jpeg",
  "/page_8_img_1.jpeg",
  "/page_10_img_2.jpeg",
  "/page_11_img_1.jpeg",
  "/page_12_img_1.jpeg",
  "/page_13_img_1.jpeg",
  "/page_15_img_1.jpeg",
  "/page_15_img_4.jpeg",
  "/page_16_img_1.jpeg",
  "/page_17_img_1.jpeg",
  "/page_18_img_1.jpeg",
  "/page_4_img_2.jpeg",
];

/* ── Form options & unused constants removed ── */

/* ── Contact details ─────────────────────────────────── */
const contactInfo = [
  { icon: Phone, label: "Sales Line", value: "+603 2332 8808", href: "tel:+60323328808" },
  { icon: Phone, label: "Mobile / WhatsApp", value: "+6011 2880 8088", href: "https://wa.link/kgsiw7" },
  { icon: Mail, label: "Email Enquiry", value: "sales@pavilionsquarekl.com", href: "mailto:sales@pavilionsquarekl.com" },
  { icon: User, label: "Managed By", value: "Sheryl Yoong, representing Zeon Properties International Sdn Bhd", href: null },
  { icon: Clock, label: "Opening Hours", value: "Monday - Friday , 9am to 6pm", href: null },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/pavilionsquarekl" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/pavilionsquarekl" },
  { icon: Globe, label: "Website", href: "https://www.pavillionsquare.com.my" },
];

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "Location", href: "#location" },
  { label: "Facilities", href: "#facilities" },
  { label: "Units", href: "#units" },
  { label: "Features", href: "#features" },
  { label: "360 View", href: "#virtual-tour" },
];

/* ── Form field helper ───────────────────────────────── */
function InputField({ label, required, error, step, icon: Icon, children }: { label: string; required?: boolean; error?: string; step?: number; icon?: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {step && (
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c9a84c]/30 to-[#ffd700]/10 border border-[#c9a84c]/40 flex items-center justify-center text-[10px] font-bold text-[#c9a84c] flex-shrink-0">
            {step}
          </span>
        )}
        <label className="text-[13px] font-bold text-white/70 uppercase tracking-[0.15em]">
          {label} {required && <span className="text-[#c9a84c]">*</span>}
        </label>
      </div>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icon className="w-4 h-4 text-[#c9a84c]/50" />
          </div>
        )}
        {children}
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-red-400 text-[12px] mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full bg-[#060914] md:bg-[#060914]/60 border border-white/10 rounded-xl px-5 py-4 text-[15px] text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/30 focus:bg-[#060914] shadow-inner transition-all duration-300 md:backdrop-blur-md";

const inputWithIconCls =
  "w-full bg-[#060914] md:bg-[#060914]/60 border border-white/10 rounded-xl pl-11 pr-5 py-4 text-[15px] text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/30 focus:bg-[#060914] shadow-inner transition-all duration-300 md:backdrop-blur-md";

/* ── Component ───────────────────────────────────────── */
export default function Contact() {
  /* Gallery state */
  const [galIdx, setGalIdx] = useState(0);
  const galPaused = useRef(false);
  useEffect(() => {
    const t = setInterval(() => { if (!galPaused.current) setGalIdx((i) => (i + 1) % gallery.length); }, 3800);
    return () => clearInterval(t);
  }, []);
  const galPrev = () => { galPaused.current = true; setGalIdx((i) => (i - 1 + gallery.length) % gallery.length); setTimeout(() => { galPaused.current = false; }, 7000); };
  const galNext = () => { galPaused.current = true; setGalIdx((i) => (i + 1) % gallery.length); setTimeout(() => { galPaused.current = false; }, 7000); };

  /* Form state */
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k: string, v: string | boolean) => { setForm((f) => ({ ...f, [k]: v })); if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; }); };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSubmitting(true);

    // Call the Server Action
    const result = await submitContactForm({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrors({ form: "Failed to send message: " + result.error });
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#060914] pt-8">

      {/* ── BACKGROUND SLIDER ───────────────────────── */}
      {gallery.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 z-0"
          animate={{ opacity: i === galIdx ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt="Pavilion Square"
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover kb-zoom-bg"
            style={{ filter: "brightness(0.3) saturate(1.2)" }}
          />
        </motion.div>
      ))}

      {/* Dynamic Overlays for Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#060914]/95 via-[#060914]/80 to-[#060914]/30" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#060914] via-transparent to-[#060914]/60" />

      {/* ── CONTENT ───────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* ── FULL-WIDTH HEADING AREA ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          {/* Title & Subtitle */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-badge mb-3"
            >
              <Mail className="w-3 h-3" />
              Get In Touch
            </motion.div>

            <h2 className="text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-white leading-[1.05] mb-3 text-shadow-luxury">
              Register Your{" "}
              <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-[#c9a84c] via-[#ffd700] to-[#e8c050] drop-shadow-[0_0_30px_rgba(201,168,76,0.4)]">
                Enquiry
              </em>
            </h2>

            <div className="section-divider mb-3" />

            <p className="text-white/75 text-[15px] sm:text-base leading-relaxed">
              Speak with our dedicated sales consultants to schedule a private viewing at our gallery in the heart of KL City Centre.
            </p>
          </div>

          {/* Gallery controls top, Stat boxes bottom */}
          {/* Gallery slider controls */}


          {/* Stat Boxes SECOND (below) */}
          <div className="flex gap-3 mt-6 sm:mt-8">
            {[
              { num: "67", label: "Floors" },
              { num: "5★", label: "Luxury" },
              { num: "KLCC", label: "Location" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center w-[80px] h-[64px] min-[480px]:w-[100px] min-[480px]:h-[80px] rounded-2xl bg-[#060914]/90 min-[480px]:bg-white/[0.04] border border-white/10 min-[480px]:backdrop-blur-sm hover:border-[#c9a84c]/40 transition-all duration-300 group"
              >
                <span className="stat-number text-xl font-heading font-black group-hover:scale-110 transition-transform duration-300">
                  {stat.num}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── SINGLE COLUMN: FORM ── */}
        <div className="flex items-start justify-center w-full mt-8 sm:mt-12">
          {/* Main — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl h-full flex flex-col justify-start"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#060914]/40 backdrop-blur-2xl border border-[#c9a84c]/40 rounded-3xl p-12 flex flex-col items-center text-center gap-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a84c]/20 to-[#ffd700]/10 border border-[#c9a84c]/50 flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.3)]">
                    <CheckCircle className="w-10 h-10 text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-white mb-2">Thank You!</div>
                    <div className="text-white/70 text-[14px] leading-relaxed max-w-sm">
                      Your enquiry has been received. Our sales team will contact you within 24 hours via your preferred channel.
                    </div>
                  </div>
                  <a href="https://wa.link/kgsiw7" target="_blank" rel="noopener noreferrer" className="btn-gold rounded-xl px-8 py-3">
                    <MessageSquare className="w-4 h-4" />Also Reach Us on WhatsApp
                  </a>
                  <button onClick={() => setSubmitted(false)} className="text-[12px] font-bold text-white/40 hover:text-white transition-colors">Submit another enquiry</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="bg-[#060914]/40 backdrop-blur-3xl border border-[#c9a84c]/40 rounded-3xl p-6 sm:p-10 flex flex-col gap-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative"
                  noValidate
                >
                  {/* Gold accent bar at top */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent rounded-full" />

                  {/* Corner glow — top right */}
                  <div className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-bl from-[#c9a84c]/15 to-transparent rounded-3xl pointer-events-none" />

                  {/* Premium subtle glow overlay inside the form */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-3xl pointer-events-none" />

                  <div className="relative mb-6 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.3em] text-[#ffd700] font-black px-5 py-1.5 rounded-full bg-gradient-to-r from-[#c9a84c]/30 via-[#ffd700]/10 to-[#c9a84c]/30 border border-[#c9a84c]/60 shadow-[0_0_25px_rgba(201,168,76,0.4)] relative overflow-hidden">
                        <span className="absolute inset-0 bg-white/20 blur-md pointer-events-none animate-pulse" />
                        <span className="relative z-10">Register Now</span>
                      </span>
                    </div>
                    <h3 className="text-2xl min-[390px]:text-3xl sm:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/60 drop-shadow-md">
                      Show Unit Ready For Viewing
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-[#c9a84c]/80 font-medium">
                      Fill out the form below to secure your exclusive appointment
                    </p>
                  </div>

                  <InputField label="Full Name" required error={errors.name} step={1} icon={User}>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Jane Doe"
                      className={inputWithIconCls}
                    />
                  </InputField>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField label="Email Address" required error={errors.email} step={2} icon={AtSign}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="jane@example.com"
                        className={inputWithIconCls}
                      />
                    </InputField>
                    <InputField label="Phone Number" required error={errors.phone} step={3} icon={Smartphone}>
                      <input
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+60 12-345 6789"
                        className={inputWithIconCls}
                      />
                    </InputField>
                  </div>

                  <InputField label="Message (Optional)" step={4}>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={3}
                      placeholder="Tell us what you're looking for..."
                      className={inputCls + " resize-none"}
                    ></textarea>
                  </InputField>
                  {/* Buttons — perfectly inline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-[390px]:gap-5 pt-3 items-stretch">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold w-full rounded-xl min-h-[56px] py-4 text-[14px] font-bold text-center disabled:opacity-60 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      <span className="relative flex items-center justify-center gap-2 whitespace-nowrap">
                        {submitting ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="15" /></svg>
                            Submitting…
                          </>
                        ) : (
                          <><Send className="w-5 h-5" />Submit Enquiry</>
                        )}
                      </span>
                    </button>

                    <a
                      href="https://wa.link/kgsiw7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-gold w-full rounded-xl min-h-[56px] py-4 text-[14px] font-bold text-center flex items-center justify-center gap-2 group whitespace-nowrap hover:shadow-[0_0_24px_rgba(37,211,102,0.25)] hover:border-[#25d366]/60 transition-all duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current group-hover:text-[#25d366] transition-colors duration-300"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                      <span className="group-hover:text-[#25d366] transition-colors duration-300">WhatsApp for Pricing</span>
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer className="relative mt-12 sm:mt-16 w-full">
        {/* Animated Glow Border Wrapper - Oval Top Only */}
        <div className="relative rounded-t-[24px] sm:rounded-t-[32px] lg:rounded-t-[40px] pt-[2px] overflow-hidden group shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          {/* Animated conic gradients for the tracing border effect */}
          <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#c9a84c_330deg,#ffd700_360deg)] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ animation: 'spin 6s linear infinite' }} />
          <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_180deg,transparent_0_300deg,#c9a84c_330deg,#ffd700_360deg)] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ animation: 'spin 6s linear infinite' }} />

          {/* Inner Content Container */}
          <div className="relative bg-[#030611] overflow-hidden rounded-t-[22px] sm:rounded-t-[30px] lg:rounded-t-[38px] h-full w-full">

            {/* Animated Background Image */}
            <div className="absolute inset-0 z-0">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                className="w-full h-full relative"
              >
                <Image
                  src="/page_3_img_1.jpeg"
                  alt="Pavilion Square KL Night View"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Deep gradient overlays for legibility */}
              <div className="absolute inset-0 bg-[#030611]/70 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030611] via-[#030611]/90 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030611]/80 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 sm:pt-10 pb-4">

              <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">

                {/* Brand Section */}
                <div
                  className="lg:col-span-5 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-5 sm:gap-6 mb-4">
                    <a href="#hero" className="inline-block group h-16 sm:h-20 lg:h-24 flex items-center justify-start transition-transform duration-500 hover:scale-105 relative z-10">
                      <img
                        src="/pavilion-square-logo.png"
                        alt="Pavilion Square KL Logo"
                        className="h-full w-auto object-contain drop-shadow-[0_0_20px_rgba(196,162,101,0.4)] transition-all duration-500 group-hover:drop-shadow-[0_0_35px_rgba(196,162,101,0.7)] group-hover:brightness-110"
                      />
                    </a>
                    
                    {/* Golden Separator with Diamond */}
                    <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-transparent via-[#c9a84c]/60 to-transparent flex-shrink-0 relative">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-[#ffd700] shadow-[0_0_8px_#ffd700]" />
                    </div>
                    
                    <a href="https://zeonproperties.com" target="_blank" rel="noopener noreferrer" className="inline-block group flex flex-col items-start transition-transform duration-500 hover:scale-105 relative z-10 pl-1">
                      <div className="flex flex-col text-[#c9a84c] font-black tracking-[0.25em] uppercase mb-1.5 sm:mb-2">
                        <span className="text-[7px] sm:text-[9px] leading-tight">Appointed</span>
                        <span className="text-[7px] sm:text-[9px] leading-tight text-[#c9a84c]/80 mt-0.5">Agency</span>
                      </div>
                      <img
                        src="/zeon_group.png"
                        alt="Zeon Group Partner Logo"
                        className="h-8 sm:h-9 lg:h-11 w-auto object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.7)] group-hover:brightness-150 grayscale hover:grayscale-0 contrast-125 brightness-150 invert hover:invert-0 focus:invert-0"
                      />
                    </a>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-[18px] font-heading font-bold text-gold mb-2">About Us</h3>
                    <p className="text-[13px] text-white/70 leading-relaxed max-w-md font-light">
                      This site is independently managed by Sheryl Yoong, representing Zeon Properties International Sdn. Bhd. E(1) 2117 as the official appointed agency for Pavilion Square Kuala Lumpur. This is not the official developer website.
                    </p>
                  </div>

                  <div className="flex gap-4 mt-2">
                    {socials.map((s, i) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#c9a84c]/12 border border-[#c9a84c]/35 overflow-hidden hover:border-[#ffd700]/65 hover:-translate-y-1.5 hover:shadow-[0_10px_24px_-8px_rgba(201,168,76,0.55)] hover:bg-[#c9a84c]/22 transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <s.icon className="w-4 h-4 text-[#ffd700] group-hover:text-white group-hover:scale-110 relative z-10 transition-all duration-300" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div
                  className="lg:col-span-3"
                >
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c] font-bold mb-6 flex items-center gap-3">
                    <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
                    Navigation
                  </div>
                  <ul className="flex flex-col gap-3">
                    {quickLinks.map((l, i) => (
                      <li
                        key={l.label}
                      >
                        <a
                          href={l.href}
                          className="group flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-colors duration-300 w-fit"
                        >
                          <span className="w-0 h-px bg-[#c9a84c] transition-all duration-300 group-hover:w-4" />
                          <span className="relative overflow-hidden inline-block">
                            {l.label}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Information */}
                <div
                  className="lg:col-span-4"
                >
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c] font-bold mb-6 flex items-center gap-3">
                    <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
                    Contact Us
                  </div>

                  <div className="flex flex-col gap-5">
                    <a href="tel:+60122705608" className="group flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#c9a84c]/30 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Sales Line</div>
                        <div className="text-[15px] font-medium text-white/90 group-hover:text-[#ffd700] transition-colors">+60 12-270 5608</div>
                      </div>
                    </a>

                    <a href="https://wa.link/kgsiw7" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#c9a84c]/30 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_rgba(201,168,76,0.4)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4 fill-[#c9a84c]"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">WhatsApp</div>
                        <div className="text-[15px] font-medium text-white/90 group-hover:text-[#ffd700] transition-colors">+60 12-270 5608</div>
                      </div>
                    </a>

                    <a href="mailto:sherylyoong.d2co@gmail.com" className="group flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#c9a84c]/30 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Email Enquiry</div>
                        <div className="text-[15px] font-medium text-white/90 group-hover:text-[#ffd700] transition-colors">sherylyoong.d2co@gmail.com</div>
                      </div>
                    </a>

                    <div className="group flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#c9a84c]/30 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Address</div>
                        <a href="https://maps.google.com/?q=Menara+YNH,+163,+Mont+Kiara,+50480+Kuala+Lumpur" target="_blank" rel="noopener noreferrer" className="text-[13px] leading-relaxed text-white/70 hover:text-white transition-colors">
                          S-22-12, Menara YNH, 163, Mont Kiara, 50480 Kuala Lumpur, Wilayah<br />Persekutuan Kuala Lumpur
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Padding for the Footer */}
              <div className="pb-6"></div>

            </div>
          </div>
        </div >
      </footer >
    </section >
  );
}
