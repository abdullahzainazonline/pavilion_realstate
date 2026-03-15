"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, ClipboardList } from "lucide-react";

function WhatsAppIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
    );
}

/* ── Tooltip Bubble ─────────────────────────────────── */
function TooltipBubble({ visible, text }: { visible: boolean; text: string }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="tooltip"
                    initial={{ opacity: 0, x: 12, scale: 0.88 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 12, scale: 0.88 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-[calc(100%+14px)] bottom-1/2 translate-y-1/2 pointer-events-none"
                >
                    <div
                        className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(8,7,12,0.92) 0%, rgba(20,18,24,0.96) 100%)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(196,154,56,0.3)",
                            boxShadow:
                                "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,154,56,0.1)",
                            color: "#C49A38",
                        }}
                    >
                        {text}

                        {/* Arrow */}
                        <span
                            className="absolute left-full top-1/2 -translate-y-1/2"
                            style={{
                                borderTop: "6px solid transparent",
                                borderBottom: "6px solid transparent",
                                borderLeft: "7px solid rgba(20,18,24,0.96)",
                                filter: "drop-shadow(1px 0 0 rgba(196,154,56,0.2))",
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function FloatingIcon({ icon: Icon, text, link, isPrimary = false }: { icon: any, text: string, link: string, isPrimary?: boolean }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="relative flex items-center justify-center group/wrapper">
            <TooltipBubble visible={hovered} text={text} />
            
            {/* Primary Sonar Ping Effect */}
            {isPrimary && (
                <>
                    <div className="absolute inset-0 rounded-full bg-[#25D366]/20 blur-md animate-pulse pointer-events-none" />
                    <div className="absolute inset-0 rounded-full border border-[#25D366]/50 opacity-0 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" style={{ animationDelay: '1s' }} />
                    <div className="absolute inset-0 rounded-full border border-[#25D366]/30 opacity-0 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
                </>
            )}

            <motion.a
                href={link}
                target={link.startsWith("http") ? "_blank" : undefined}
                rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full select-none focus:outline-none ${isPrimary ? 'bg-[#25D366] border-2 border-white/20' : 'bg-[#090b10] border-[1.5px] border-[#c9a84c]'} shadow-[0_4px_25px_rgba(0,0,0,0.9)] overflow-hidden group z-10`}
            >
                {/* Rotating Gleam Interior */}
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-[-50%] pointer-events-none ${isPrimary ? 'opacity-20' : 'opacity-40'}`}
                    style={{
                        background: isPrimary 
                            ? "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.05) 70%, transparent 100%)"
                            : "conic-gradient(from 0deg, transparent 0%, rgba(196,154,56,0.05) 30%, rgba(255,215,0,0.6) 50%, rgba(196,154,56,0.05) 70%, transparent 100%)",
                    }}
                />

                {/* Depth & Hover Fill Overlay */}
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,transparent_100%)] pointer-events-none" />
                <span className={`absolute inset-0 rounded-full ${isPrimary ? 'bg-gradient-to-tr from-[#25D366]/0 via-white/10 to-white/30' : 'bg-gradient-to-tr from-[#c9a84c]/0 via-[#c9a84c]/5 to-[#ffd700]/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Animated Icon */}
                <motion.span 
                    className={`relative z-10 ${isPrimary ? 'text-white' : 'text-[#c9a84c]'} transition-all duration-300 group-hover:text-white ${isPrimary ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'drop-shadow-[0_0_10px_rgba(196,154,56,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]'}`}
                    animate={hovered ? { rotate: [0, -15, 12, -10, 8, 0], scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${isPrimary ? 'w-7 h-7 sm:w-8 sm:h-8' : ''}`} strokeWidth={isPrimary ? 2.5 : 2} />
                </motion.span>
            </motion.a>
        </div>
    );
}

/* ── Main Floating Buttons ───────────────────────────── */
export default function WhatsAppButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show buttons after scrolling past 50% of the viewport height (e.g. leaving the hero)
            if (window.scrollY > window.innerHeight * 0.5) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        // Attach listener
        window.addEventListener("scroll", handleScroll);
        
        // Initial check in case they load the page already scrolled down
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const WHATSAPP_URL = "https://wa.link/kgsiw7";

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 40, right: -40 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        right: 24 // 1.5rem / bottom-6 right-6 context
                    }}
                    exit={{ opacity: 0, scale: 0.5, y: 40, right: -40 }}
                    transition={{
                        duration: 0.5, ease: "backOut"
                    }}
                    className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-5 min-[400px]:gap-6"
                    style={{ willChange: "transform, right, opacity" }}
                >
                    {/* WhatsApp Button */}
                    <FloatingIcon 
                        icon={WhatsAppIcon} 
                        text="WhatsApp Enquiry" 
                        link={WHATSAPP_URL} 
                        isPrimary={true}
                    />
                    
                    {/* Register Button */}
                    <FloatingIcon 
                        icon={ClipboardList} 
                        text="Book Appointment" 
                        link="#contact" 
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
