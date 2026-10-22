import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onExploreCollections, onShopNow, heroData }) {
  const heading = heroData?.heading || 'IN THE RIGHT OUTFIT\nANYTHING IS POSSIBLE';
  const subheading = heroData?.subheading || "WINTER '25 EDITORIAL CAMPAIGN";
  const rawImage = heroData?.image || '/assets/milan-hero.jpg';

  // Format image URL if uploaded to backend
  const heroImage = rawImage.startsWith('/uploads')
    ? `http://localhost:5000${rawImage}`
    : rawImage;

  // Split lines for formatting
  const headingLines = heading.split('\n');

  return (
    <section className="relative w-full overflow-hidden bg-[#242426]">
      {/* Editorial Hero Background Image */}
      <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] flex items-center justify-center">
        {/* Crisp high fashion photography */}
        <img
          src={heroImage}
          alt="MILAN Winter Editorial Collection"
          className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.03]"
        />

        {/* Subtle gradient vignette overlay to make text pop while keeping photographic fidelity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent pointer-events-none" />

        {/* Central Overlay Typography & CTAs */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white tracking-[0.03em] leading-[1.08] hero-overlay-text uppercase font-sans drop-shadow-md select-none">
            {headingLines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < headingLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          {/* Interactive Dual CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-4 sm:gap-5">
            {/* COLLECTIONS Button */}
            <button
              onClick={onExploreCollections}
              className="px-8 sm:px-10 py-3 sm:py-3.5 bg-white text-zinc-900 text-xs sm:text-sm font-semibold tracking-widest rounded-full uppercase transition-all duration-300 hover:bg-zinc-100 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
            >
              COLLECTIONS
            </button>

            {/* SHOP NOW Button */}
            <button
              onClick={onShopNow}
              className="px-8 sm:px-10 py-3 sm:py-3.5 bg-[#121212] text-white text-xs sm:text-sm font-semibold tracking-widest rounded-full uppercase border border-white/20 transition-all duration-300 hover:bg-black hover:border-white hover:scale-105 active:scale-95 shadow-lg shadow-black/30"
            >
              SHOP NOW
            </button>
          </div>
        </div>

        {/* Subtle floating badge */}
        <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md text-white/90 text-xs px-4 py-2 rounded-full border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{subheading}</span>
        </div>
      </div>
    </section>
  );
}
