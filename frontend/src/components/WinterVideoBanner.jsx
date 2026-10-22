import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

export default function WinterVideoBanner({ onPlayVideo, onShopNow }) {
  return (
    <section className="py-8 sm:py-14 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      <div className="relative w-full aspect-[16/7] sm:aspect-[21/9] min-h-[340px] rounded-[32px] overflow-hidden group shadow-xl shadow-black/5 bg-[#eceae6]">
        {/* Cinematic Winter Background Image */}
        <img
          src="/assets/winter-video-banner.png"
          alt="WEAR TO WINTER Campaign Film"
          className="w-full h-full object-cover object-center filter brightness-[0.98] transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Subtle dark gradient overlay to guarantee text and button legibility */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/15 transition-colors pointer-events-none" />

        {/* Top-Left Heading Overlay */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10 max-w-md pointer-events-none">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 uppercase font-sans drop-shadow-sm">
            WEAR TO WINTER
          </h2>
          <p className="text-[10px] sm:text-xs tracking-[0.2em] font-medium text-zinc-700 uppercase mt-1">
            LET US LOVE WINTER FOR IT IS THE SPRING OF GENIUS
          </p>
        </div>

        {/* Center Floating Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={onPlayVideo}
            className="group/btn relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl shadow-black/40 border border-white/20"
            aria-label="Play Campaign Video"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-30 pointer-events-none" />
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white ml-1 transition-transform group-hover/btn:scale-110" />
          </button>
        </div>

        {/* Bottom-Right "↗ SHOP NOW" Pill Button */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20">
          <button
            onClick={onShopNow}
            className="inline-flex items-center gap-2 px-7 sm:px-9 py-3 sm:py-3.5 bg-black/90 hover:bg-black text-white text-xs sm:text-sm font-bold tracking-widest rounded-full uppercase backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-black/25 border border-white/10"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>SHOP NOW</span>
          </button>
        </div>
      </div>
    </section>
  );
}
