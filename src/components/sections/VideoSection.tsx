"use client";

export default function VideoSection() {
  return (
    <section className="relative w-full h-[100dvh] sm:h-screen bg-[#060914] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Plain HTML iframe — bypasses Next.js CSP entirely, video loads from Supabase via vanilla HTML */}
        <iframe
          src="/video-player.html"
          className="absolute inset-0 w-full h-full border-0"
          style={{ border: 'none' }}
          allow="autoplay; fullscreen"
          title="Pavilion Square Video"
        />

        {/* Soft dark vignette gradients to blend with edge sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060914]/90 via-transparent to-[#060914]/90 opacity-80 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
      </div>

      {/* Decorative Gold Elements styling */}
      <div className="absolute top-6 left-6 z-20 hidden sm:block pointer-events-none opacity-50">
        <div className="w-8 h-8 border-l border-t border-[#c9a84c]/40" />
      </div>
      <div className="absolute bottom-6 right-6 z-20 hidden sm:block pointer-events-none opacity-50">
        <div className="w-8 h-8 border-r border-b border-[#c9a84c]/40" />
      </div>
    </section>
  );
}

