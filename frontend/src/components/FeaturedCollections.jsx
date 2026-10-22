import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedCollections({ onSelectCollection }) {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* Header Matching Reference */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-zinc-950 uppercase font-sans">
          FEATURED COLLECTIONS
        </h2>
        <p className="mt-3 text-xs sm:text-sm tracking-[0.25em] text-zinc-500 uppercase font-medium">
          TOP NEW COLLECTIONS WITH HARFA BRANDS EXPLOR NOW
        </p>
      </div>

      {/* 3-Column Bento Grid Matching Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {/* Column 1: JEANS (top) & T-SHIRTS (bottom) */}
        <div className="flex flex-col gap-5 lg:gap-6">
          {/* JEANS Card */}
          <div
            onClick={() => onSelectCollection('Jeans')}
            className="group relative h-48 sm:h-56 rounded-3xl overflow-hidden bg-[#18181b] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src="/assets/bento-jeans.png"
              alt="Jeans Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-md">
                JEANS
              </span>
            </div>
          </div>

          {/* T-SHIRTS Card */}
          <div
            onClick={() => onSelectCollection('T-Shirts')}
            className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden bg-[#ededed] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src="/assets/bento-tshirt.png"
              alt="T-Shirts Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-zinc-800 uppercase drop-shadow-sm">
                T-SHIRTS
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: HOODIE Hero (top) & SNEAKERS (bottom) */}
        <div className="flex flex-col gap-5 lg:gap-6">
          {/* Featured Center HOODIE Card */}
          <div
            onClick={() => onSelectCollection('Hoodies')}
            className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden bg-[#f0eee9] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6"
          >
            <img
              src="/assets/bento-hoodie.png"
              alt="Hoodie Collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/20 transition-colors" />

            {/* Centered Typography & Discover Button Overlay */}
            <div className="relative z-10 text-center flex flex-col items-center my-auto">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.15em] text-zinc-950 uppercase font-sans">
                HOODIE
              </span>
              <p className="text-[11px] font-bold tracking-[0.18em] text-zinc-700 uppercase mt-1 max-w-[200px]">
                OPEN WITH BUY AND APPLY CODE GET OFFERS
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCollection('Hoodies');
                }}
                className="mt-4 px-7 py-2.5 bg-black text-white text-xs font-bold tracking-[0.2em] rounded-full uppercase transition-all duration-300 hover:bg-zinc-800 hover:scale-105 active:scale-95 shadow-md shadow-black/20"
              >
                DISCOVER
              </button>
            </div>
          </div>

          {/* SNEAKERS Card */}
          <div
            onClick={() => onSelectCollection('Footwear')}
            className="group relative h-48 sm:h-56 rounded-3xl overflow-hidden bg-[#e5e5e7] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src="/assets/bento-sneakers.png"
              alt="Sneakers Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-md">
                SNEAKERS
              </span>
            </div>
          </div>
        </div>

        {/* Column 3: BAGS (top) & JACKET (bottom) */}
        <div className="flex flex-col gap-5 lg:gap-6">
          {/* BAGS Card */}
          <div
            onClick={() => onSelectCollection('Accessories')}
            className="group relative h-48 sm:h-56 rounded-3xl overflow-hidden bg-[#2d2d2d] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src="/assets/bento-bags.png"
              alt="Bags Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-md">
                BAGS
              </span>
            </div>
          </div>

          {/* JACKET Card */}
          <div
            onClick={() => onSelectCollection('Outerwear')}
            className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden bg-[#e8e9eb] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src="/assets/bento-jacket.png"
              alt="Jacket Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-zinc-900 uppercase drop-shadow-sm">
                JACKET
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
