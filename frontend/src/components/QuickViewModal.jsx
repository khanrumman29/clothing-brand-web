import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  isLiked,
  onToggleWishlist,
  onAddToCart
}) {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '#000000');
  const [currentImage, setCurrentImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-[32px] overflow-hidden max-w-4xl w-full shadow-2xl z-10 border border-zinc-100 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-500 hover:text-black flex items-center justify-center transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Imagery Gallery */}
        <div className="md:w-1/2 bg-[#F5F5F7] p-8 flex flex-col justify-between items-center relative min-h-[360px] md:min-h-full">
          {/* Badge */}
          {product.discount && (
            <span className="absolute top-6 left-6 z-10 px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
              {product.discount}
            </span>
          )}

          {/* Main Displayed Image */}
          <div className="flex-1 flex items-center justify-center w-full py-6">
            <img
              src={currentImage}
              alt={product.name}
              className="max-h-[340px] md:max-h-[400px] w-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Thumbnail switcher if secondary image exists */}
          {product.secondaryImage && (
            <div className="flex gap-2 mt-4 z-10">
              <button
                onClick={() => setCurrentImage(product.image)}
                className={`w-14 h-14 rounded-xl overflow-hidden bg-white p-1 border-2 transition-all ${
                  currentImage === product.image ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-contain" />
              </button>
              <button
                onClick={() => setCurrentImage(product.secondaryImage)}
                className={`w-14 h-14 rounded-xl overflow-hidden bg-white p-1 border-2 transition-all ${
                  currentImage === product.secondaryImage ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Purchase Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-5">
            {/* Category & Title */}
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                MILAN {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-wide mt-1">
                {product.name}
              </h2>
              <p className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase mt-1">
                {product.mrpText}
              </p>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-zinc-950">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-semibold text-zinc-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold tracking-wider uppercase text-zinc-900">
                    Select Size: <span className="font-normal text-zinc-600">{selectedSize}</span>
                  </span>
                  <button className="text-[11px] underline text-zinc-500 hover:text-black">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-11 px-3 rounded-xl text-xs font-bold uppercase transition-all duration-200 border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-zinc-200 text-zinc-800 hover:border-zinc-400 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-zinc-900 block mb-2">
                  Color Option
                </span>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedColor === color
                          ? 'scale-125 border-zinc-950 ring-2 ring-zinc-300'
                          : 'border-zinc-200 hover:scale-110'
                      }`}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs: Add to Bag + Wishlist */}
          <div className="pt-6 border-t border-zinc-100 mt-6 space-y-3">
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-4 bg-black text-white text-xs font-bold tracking-[0.2em] rounded-full uppercase hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/15 active:scale-[0.98]"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-4 rounded-full border transition-all ${
                  isLiked
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-black bg-white'
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>

            {/* Editorial Perks */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-500 pt-2">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Express dispatch in 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                <span>30-day effortless returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
