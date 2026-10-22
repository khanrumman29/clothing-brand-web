import React, { useState } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';

export default function Navbar({
  activeCategory,
  setActiveCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenAuth
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'men', label: "Men's" },
    { id: 'women', label: "woman's" },
    { id: 'kids', label: "Kid's" },
    { id: 'accessories', label: "Accessories" },
    { id: 'gifts', label: "Gifts" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all duration-200">
      {/* Top micro-announcement bar */}
      <div className="bg-zinc-900 text-white text-[11px] tracking-widest py-1.5 px-4 text-center font-medium uppercase">
        <span>Complimentary Express Shipping on Orders Over $150 • Free Returns</span>
      </div>

      <nav className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-2xl lg:text-3xl font-extrabold tracking-[0.18em] text-black hover:opacity-80 transition-opacity"
          >
            MILAN
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = activeCategory.toLowerCase() === link.id.toLowerCase() ||
              (activeCategory === 'All' && link.id === 'men');
            return (
              <li key={link.id} className="relative py-2">
                <button
                  onClick={() => {
                    setActiveCategory(link.label);
                    const el = document.getElementById('winter-collections');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-[15px] tracking-wide transition-colors duration-200 font-medium ${
                    isActive ? 'text-black font-semibold' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  {link.label}
                </button>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full transition-all duration-300" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Right Action Icons */}
        <div className="flex items-center gap-5 lg:gap-6 text-zinc-800">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-colors relative"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            className="p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-colors relative"
            aria-label="View Wishlist"
          >
            <Heart className={`w-5 h-5 stroke-[1.75] ${wishlistCount > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 text-[10px] bg-rose-600 text-white rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={onOpenCart}
            className="p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-colors relative"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] bg-black text-white rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button
            onClick={onOpenAuth}
            className="p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-colors hidden sm:flex"
            aria-label="Account details"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-900"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveCategory(link.label);
                setMobileMenuOpen(false);
                const el = document.getElementById('winter-collections');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full text-left py-2 text-base font-medium text-zinc-800 hover:text-black border-b border-zinc-100"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex items-center justify-between text-sm text-zinc-600">
            <button onClick={onOpenAuth} className="flex items-center gap-2 py-2">
              <User className="w-4 h-4" /> My Account
            </button>
            <button onClick={onOpenWishlist} className="flex items-center gap-2 py-2">
              <Heart className="w-4 h-4" /> Wishlist ({wishlistCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
