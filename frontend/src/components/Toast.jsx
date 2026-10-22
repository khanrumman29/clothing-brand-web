import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const iconMap = {
    cart: <ShoppingBag className="w-4 h-4 text-zinc-950" />,
    wishlist: <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />,
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    info: <Info className="w-4 h-4 text-zinc-700" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm">
      <div className="bg-white border border-zinc-200 shadow-2xl rounded-2xl p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0">
          {iconMap[toast.type] || iconMap.info}
        </div>
        <div className="flex-1 pr-2">
          <p className="text-xs font-bold text-zinc-950 uppercase tracking-wide">
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-[11px] text-zinc-500 mt-0.5">{toast.message}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-black p-1 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
