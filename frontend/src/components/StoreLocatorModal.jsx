import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, ExternalLink, Check } from 'lucide-react';
import { storeLocations } from '../data/products';

export default function StoreLocatorModal({ isOpen, onClose }) {
  const [selectedCity, setSelectedCity] = useState(storeLocations[0]);
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const handleCopyAddress = (address, index) => {
    navigator.clipboard.writeText(address);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-[32px] max-w-3xl w-full shadow-2xl p-6 sm:p-10 z-10 border border-zinc-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-black flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <span className="text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase">
            FLAGSHIPS & ATELIERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight mt-1">
            FIND A MILAN STORE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Visit our physical retail spaces worldwide for tailored fittings, private viewings, and exclusive drops.
          </p>
        </div>

        {/* Store Directory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {storeLocations.map((store, idx) => (
            <div
              key={store.city}
              className={`p-5 rounded-2xl border transition-all ${
                selectedCity.city === store.city
                  ? 'border-black bg-zinc-50/80 shadow-md'
                  : 'border-zinc-200 hover:border-zinc-400 bg-white'
              }`}
              onClick={() => setSelectedCity(store)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wide">
                  {store.city}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-800">
                  {store.type}
                </span>
              </div>

              <div className="space-y-2 text-xs text-zinc-600 mt-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span>{store.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span>{store.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyAddress(store.address, idx);
                  }}
                  className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  {copiedId === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <span>Copy Address</span>
                  )}
                </button>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1 hover:underline"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
