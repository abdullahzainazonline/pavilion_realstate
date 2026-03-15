"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function LocationFacts() {
  return (
    <section id="location" className="relative w-full overflow-hidden bg-[#2D1606] py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen">
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12 relative z-10 flex flex-col items-center w-full px-4"
      >
        <div className="section-badge mb-5 bg-[#c9a84c]/10 border-[#c9a84c]/30 text-[#ffd700]">
          <MapPin className="w-3 h-3 text-[#ffd700]" />
          Prime Location
        </div>
        <h2 className="text-[12vw] sm:text-6xl md:text-7xl lg:text-[6rem] font-heading font-black tracking-tight text-white leading-[0.9] drop-shadow-xl w-full text-center">
          <em style={{ fontStyle: "normal", WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))" }}>
            LOCATION
          </em>
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ transformOrigin: "center" }}
          className="w-16 h-1 mt-6 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"
        />
      </motion.div>

      {/* Main Map Container Wrapper (Scrollable on Mobile) */}
      <div className="w-full relative px-0 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full flex flex-col items-center gap-6 lg:gap-8 z-10 overflow-x-auto overflow-y-hidden pb-6 scrollbar-hide [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Scrollable Container Content */}
          <div className="flex flex-row items-end w-max lg:w-full min-w-[900px] sm:min-w-0 px-4 sm:px-0 mx-auto">
            {/* Base SVG Map */}
            <div className="relative w-full lg:w-[85%] flex-shrink-0 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[1.8/1]">
                <Image 
                  src="/new_location_map.svg" 
                  alt="Pavilion Square Location Map"
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Bouncing Pin Pointing Effect */}
                {/* Exact coordinates pointing precisely to the map plot */}
                <div className="absolute left-[64%] top-[46%] lg:left-[66.5%] lg:top-[49%] w-[20%] sm:w-[18%] lg:w-[22%] aspect-[1.1] z-20 pointer-events-none origin-bottom -translate-x-[50%] -translate-y-[90%] md:-translate-y-[85%]">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
                  >
                    <Image 
                      src="/new_location_pin.svg" 
                      alt="Pavilion Square Location Indicator"
                      fill
                      className="object-contain object-bottom"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Desktop Legends */}
            <div className="flex-shrink-0 w-[160px] lg:w-[15%] pl-4 lg:pl-8 pb-4 lg:pb-8 flex flex-col items-end justify-end">
              <div className="relative w-full aspect-[1/2]">
                <Image 
                  src="/new_location_legends.svg" 
                  alt="Map Legends"
                  fill
                  className="object-contain object-bottom opacity-90"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Swipe Indicator Overlay (Hidden on Desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute bottom-4 left-0 right-0 flex justify-center items-center z-30 pointer-events-none sm:hidden"
        >
          <div className="flex justify-center items-center text-[#c9a84c] drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            <div className="mx-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7.828 11.0003L20 11.0003V13.0003H7.828L13.192 18.3643L11.778 19.7783L4 12.0003L11.778 4.22232L13.192 5.63632L7.828 11.0003Z" fill="currentColor"></path>
              </svg>
            </div>
            
            <motion.div 
              className="mx-6"
              animate={{ x: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M29.2237 13.3805C29.2237 12.6598 28.7863 11.9954 28.0783 11.6431C27.4012 11.3098 26.5595 11.3098 25.8803 11.6473C25.7819 11.6951 25.6884 11.7542 25.5991 11.814C25.3931 11.3541 25.0218 10.9576 24.5254 10.7058C23.7759 10.3219 22.8449 10.3247 22.0947 10.7058C21.7516 10.8809 21.4682 11.1263 21.2573 11.416C21.0449 11.1263 20.7637 10.8788 20.4177 10.7058C19.6675 10.3219 18.7366 10.3219 17.9863 10.7058C17.8176 10.7888 17.6678 10.895 17.53 11.0124L17.3507 4.94443C17.3177 3.47068 16.2799 2.76334 15.3299 2.73662C14.2886 2.71341 13.2072 3.44677 13.082 4.94654L12.8324 16.4124L12.2404 15.087C11.5591 13.853 10.7364 13.0965 9.79423 12.8342C8.99477 12.6113 8.11516 12.759 7.25102 13.2554C7.00915 13.3967 6.85727 13.5837 6.79681 13.8179C6.67798 14.2932 6.98454 14.784 7.40712 15.4639C7.53438 15.6699 7.67642 15.8942 7.8072 16.1199C8.41962 17.356 8.66993 18.4367 8.91392 19.4829C9.29079 21.1142 9.64938 22.6498 11.2722 24.4245C13.1741 26.4622 13.8871 27.616 13.9181 27.9577L13.9722 29.8062C13.9764 31.9515 14.714 33.2628 18.2409 33.2628H22.5341C25.2384 33.2628 26.8056 32.694 26.8056 29.7894L26.8183 27.879C26.8759 26.9164 27.2599 26.4165 27.7408 25.8033C28.4059 24.9575 29.2328 23.9056 29.2286 21.3554L29.2237 13.3805ZM25.9759 29.7908C25.9759 31.8657 25.2341 32.4324 22.5341 32.4324H18.2402C15.5402 32.4324 14.8012 31.8657 14.8012 29.7908L14.7674 28.6074H25.9759V29.7908ZM27.0876 25.2915C26.5898 25.925 26.0821 26.5838 25.9928 27.7756H25.997L25.9928 27.777V27.7756H14.7281C14.5241 26.8419 13.0863 25.1487 11.8867 23.8606C10.4116 22.2483 10.0952 20.8794 9.72602 19.2952C9.47431 18.2019 9.21204 17.0726 8.54267 15.729C8.39501 15.4702 8.24946 15.2375 8.11798 15.0251C7.88876 14.6581 7.57798 14.1582 7.96118 13.8706C8.34649 13.5844 8.98634 13.4726 9.57556 13.6351C10.2941 13.8347 10.9488 14.4577 11.5007 15.4583L12.8388 18.4578C13.0448 18.9204 13.622 18.7454 13.6319 18.2975L13.9152 4.99013C13.9989 3.98045 14.6634 3.53466 15.3067 3.56701C15.8524 3.58318 16.4985 3.95935 16.521 4.96271L16.7334 12.6535C16.7502 13.2554 17.5483 13.1204 17.5673 12.6472C17.5834 12.1571 17.8738 11.6965 18.3674 11.4448C18.8835 11.1804 19.5255 11.1804 20.0423 11.4448C20.5359 11.6965 20.8424 12.1571 20.8424 12.6472C20.8424 12.8736 21.0302 13.062 21.2587 13.062C21.4879 13.062 21.6735 12.8736 21.6735 12.6472C21.6735 12.1571 21.9822 11.6965 22.4737 11.4448C22.9926 11.1804 23.6338 11.1804 24.1499 11.4448C24.6435 11.6965 24.9501 12.1571 24.9501 12.6472C24.9501 13.0599 25.5252 13.1928 25.7214 12.8637C25.836 12.6683 26.0238 12.5037 26.2523 12.3905C26.7023 12.1676 27.2606 12.1676 27.7106 12.3905C28.1212 12.593 28.375 12.9579 28.3898 13.3496C28.387 13.3594 28.3799 13.3707 28.3799 13.3826L28.3961 21.3582C28.4003 23.6222 27.7309 24.4702 27.0876 25.2915Z" fill="currentColor"></path>
              </svg>
            </motion.div>

            <div className="mx-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.172 12.9997L4 12.9997V10.9997H16.172L10.808 5.63568L12.222 4.22168L20 11.9997L12.222 19.7777L10.808 18.3637L16.172 12.9997Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

