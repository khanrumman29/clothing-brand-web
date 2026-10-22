import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Demographics({ onSelectGender }) {
  const cards = [
    {
      id: 'men',
      name: 'MEN',
      image: '/assets/category-men.png',
      tag: 'Streetwear & Tailoring'
    },
    {
      id: 'women',
      name: 'WOMEN',
      image: '/assets/category-women.png',
      tag: 'Knitwear & Outerwear'
    },
    {
      id: 'kids',
      name: 'KIDS',
      image: '/assets/category-kids.png',
      tag: 'Urban Mini Collection'
    }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectGender(card.name)}
            className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-[32px] overflow-hidden bg-zinc-100 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Demographic Model Photo */}
            <img
              src={card.image}
              alt={`${card.name} Collection`}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient shadow overlay for high contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

            {/* Bottom Content Overlay matching reference */}
            <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col items-start">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.12em] text-white uppercase font-sans mb-3">
                {card.name}
              </span>

              <button
                type="button"
                className="px-7 py-2.5 bg-white text-zinc-950 text-xs font-bold tracking-[0.2em] rounded-full uppercase transition-all duration-300 group-hover:bg-zinc-100 group-hover:scale-105 active:scale-95 shadow-md shadow-black/20"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
