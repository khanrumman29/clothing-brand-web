import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

export default function WinterCollections({
  products,
  wishlist,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart,
  onLoadMore,
  hasMoreProducts
}) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  const filterTabs = ['All', 'Outerwear', 'Hoodies', 'Accessories', 'Footwear'];

  const filteredProducts = products.filter((prod) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Outerwear') return prod.category === 'Outerwear';
    if (selectedFilter === 'Hoodies') return prod.category === 'Hoodies' || prod.category === 'T-Shirts';
    if (selectedFilter === 'Accessories') return prod.category === 'Accessories' || prod.category === 'Jeans';
    if (selectedFilter === 'Footwear') return prod.category === 'Footwear';
    return true;
  });

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="winter-collections" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* Section Header Matching Reference */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-zinc-950 uppercase font-sans">
          WINTER COLLECTIONS
        </h2>
        <p className="mt-3 text-xs sm:text-sm tracking-[0.25em] text-zinc-500 uppercase font-medium">
          LET US LOVE WINTER FOR IT IS THE SPRING OF GENIUS
        </p>

        {/* Interactive Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                selectedFilter === tab
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Column Product Grid Matching Reference UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
        {filteredProducts.map((product) => {
          const isLiked = wishlist.includes(product.id);
          const isJustAdded = addedAnimationId === product.id;

          return (
            <div
              key={product.id}
              className="group flex flex-col cursor-pointer transition-all duration-300"
              onClick={() => onOpenQuickView(product)}
            >
              {/* Product Image Card Container */}
              <div className="relative w-full aspect-[4/5] bg-[#F5F5F7] rounded-3xl overflow-hidden flex items-center justify-center p-6 border border-zinc-100/80 group-hover:shadow-xl group-hover:shadow-black/5 transition-all duration-500">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Heart / Wishlist Button at Top-Right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200/60 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
                  aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isLiked
                        ? 'fill-rose-500 text-rose-500 scale-110'
                        : 'text-zinc-500 group-hover:text-zinc-800'
                    }`}
                  />
                </button>

                {/* Hover Quick Action Buttons */}
                <div className="absolute inset-x-4 bottom-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuickView(product);
                    }}
                    className="flex-1 py-2.5 px-3 bg-white/95 backdrop-blur-sm text-zinc-900 rounded-xl text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Quick View
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="py-2.5 px-3 bg-zinc-900 text-white rounded-xl text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-black flex items-center justify-center gap-1.5 transition-all"
                  >
                    {isJustAdded ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <ShoppingBag className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Product Info Block Under Image */}
              <div className="mt-4 flex items-start justify-between gap-2 px-1">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wide group-hover:text-zinc-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase mt-0.5">
                    {product.mrpText}
                  </p>
                </div>

                <div className="text-right whitespace-nowrap">
                  <div className="text-sm font-bold text-zinc-950">
                    ${product.price.toFixed(2)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-[11px] font-medium text-zinc-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* "LOAD MORE PRODUCTS" Button */}
      {hasMoreProducts && (
        <div className="mt-14 text-center">
          <button
            onClick={onLoadMore}
            className="px-9 py-3.5 bg-black text-white text-xs font-bold tracking-[0.2em] rounded-full uppercase transition-all duration-300 hover:bg-zinc-800 hover:scale-105 active:scale-95 shadow-md shadow-black/10"
          >
            LOAD MORE PRODUCTS
          </button>
        </div>
      )}
    </section>
  );
}
