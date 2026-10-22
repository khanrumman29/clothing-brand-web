import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularTags = ['Hoodie', 'Jacket', 'Scarf', 'Beanie', 'Sneakers', 'Jeans'];

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl p-6 sm:p-8 z-10 border border-zinc-100">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 border-b-2 border-zinc-900 pb-4">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search winter coats, hoodies, scarves, boots..."
            className="w-full text-base sm:text-lg font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none bg-transparent"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-black text-xs font-bold uppercase tracking-wider"
            >
              ESC
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mr-1">
            Trending:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-full uppercase tracking-wider transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Live Search Results */}
        <div className="mt-6 max-h-96 overflow-y-auto divide-y divide-zinc-100">
          {query.trim() && filtered.length === 0 && (
            <p className="text-center py-10 text-sm text-zinc-500 font-medium">
              No results found for "{query}". Try browsing "Hoodie" or "Jacket".
            </p>
          )}

          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                onSelectProduct(product);
                onClose();
              }}
              className="py-3 px-2 flex items-center justify-between hover:bg-zinc-50 rounded-2xl cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#F5F5F7] p-1 flex items-center justify-center flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wide group-hover:text-black">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-950">
                  ${product.price.toFixed(2)}
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
