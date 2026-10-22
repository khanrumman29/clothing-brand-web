import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function HarfaBanner({ onFindStore }) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Editorial Photo with script text */}
        <div className="lg:col-span-6 relative group overflow-hidden rounded-[28px] bg-zinc-100 shadow-xl shadow-black/5 aspect-[4/3] sm:aspect-[16/11]">
          <img
            src="/assets/editorial-paris.png"
            alt="Harfa Collections Paris Atelier"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Column: Editorial Copy & 87% Discount Callout */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-zinc-950 leading-[1.12] uppercase font-sans">
            FIND YOUR PERFECT LOOK AT HARFA STY NEW ON PARIS
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed tracking-wide font-normal max-w-xl">
            Experience our newly inaugurated Paris flagship showcase. Designed with raw industrial concrete and warm European oak, discover limited-run winter tailoring, heavyweight shearling, and hand-finished outerwear crafted for cold climates.
          </p>

          <div className="pt-2">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-zinc-900 block mb-1">
              SALES AND DISCOUNT!
            </span>
            <div className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-950 font-sans">
              87<span className="text-4xl sm:text-5xl font-bold ml-1">%</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onFindStore}
              className="inline-flex items-center gap-3 px-9 py-4 bg-black text-white text-xs font-bold tracking-[0.2em] rounded-full uppercase transition-all duration-300 hover:bg-zinc-800 hover:scale-105 active:scale-95 shadow-lg shadow-black/15 group"
            >
              <MapPin className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              <span>FIND THE STORE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
