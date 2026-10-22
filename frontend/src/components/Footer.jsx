import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer({ onSubscribeNewsletter, onSelectCategory, onFindStore }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    onSubscribeNewsletter(email);
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer className="bg-white border-t border-zinc-100 pt-16 sm:pt-20">
      {/* Main Top Footer Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Brand & Newsletter Subscription */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            <a href="#" className="text-3xl font-black tracking-[0.2em] text-black">
              MILAN
            </a>

            <p className="text-xs sm:text-[12px] font-semibold text-zinc-500 uppercase tracking-[0.16em] leading-relaxed max-w-sm">
              GET NEWSLETTER UPDATE FOR UPCOMING PRODUCTS AND BEST OFFERS AND DISCOUNT FOR ALL ITEMS
            </p>

            {/* Newsletter Input Form Matching Reference Design */}
            <form onSubmit={handleSubmit} className="pt-2 max-w-md">
              {submitted ? (
                <div className="flex items-center gap-2 py-3 px-4 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Thank you! You have been subscribed to MILAN updates.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="YOUR EMAIL"
                      className="w-full px-5 py-3 rounded-full border border-zinc-300 text-xs tracking-widest uppercase placeholder:text-zinc-400 placeholder:tracking-widest focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-black text-white text-xs font-bold tracking-[0.2em] rounded-full uppercase hover:bg-zinc-800 transition-all active:scale-95 shadow-sm"
                  >
                    SUBMIT
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right Columns: Links matching reference exact wording */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: PRODUCT */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-950 mb-4">
                PRODUCT
              </h4>
              <ul className="space-y-2.5">
                {[
                  'T-SHIRT',
                  'HOODIE',
                  'JACKET',
                  'JEANS',
                  'HAND BAGS',
                  'SNEAKERS'
                ].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => onSelectCategory(item)}
                      className="text-xs text-zinc-500 hover:text-black tracking-wider uppercase transition-colors font-medium"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: CATEGORIES */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-950 mb-4">
                CATEGORIES
              </h4>
              <ul className="space-y-2.5">
                {[
                  'MEN',
                  'WOMEN',
                  'KIDS',
                  'GIFT',
                  'COLLECTION',
                  'NEW ARRIVALS'
                ].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => onSelectCategory(item)}
                      className="text-xs text-zinc-500 hover:text-black tracking-wider uppercase transition-colors font-medium"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: HELP */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-950 mb-4">
                HELP
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'CUSTOMER SERVICE', action: null },
                  { name: 'MY MFW', action: null },
                  { name: 'FIND A STORE', action: onFindStore },
                  { name: 'LEGAL & PRIVACY', action: null },
                  { name: 'CONTACT', action: null },
                  { name: 'COOKIE NOTICE', action: null }
                ].map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={link.action || undefined}
                      className="text-xs text-zinc-500 hover:text-black tracking-wider uppercase transition-colors font-medium text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching reference: Dark full-width bar */}
      <div className="bg-[#121212] py-4 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto text-center sm:text-left">
          <p className="text-[11px] font-medium tracking-[0.25em] text-zinc-400 uppercase">
            © 2025 MILAN ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
