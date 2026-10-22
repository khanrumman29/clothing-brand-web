import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Check, Tag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = rawSubtotal * appliedDiscount;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingFee;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'HARFA87' || code === 'WINTER87') {
      setAppliedDiscount(0.87);
      setPromoMessage('87% Harfa Paris discount applied!');
    } else if (code === 'MILAN20' || code === 'WINTER20') {
      setAppliedDiscount(0.20);
      setPromoMessage('20% Milan exclusive discount applied!');
    } else {
      setPromoMessage('Invalid promo code. Try "HARFA87" or "MILAN20"');
    }
  };

  const handleCheckoutClick = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setTimeout(() => {
        onCheckout();
        setCheckoutComplete(false);
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <aside className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-zinc-950" />
              <h2 className="text-sm font-bold tracking-[0.18em] uppercase text-zinc-950">
                SHOPPING BAG ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-zinc-50 px-6 py-3 border-b border-zinc-100">
            <div className="flex justify-between items-center text-xs font-medium text-zinc-600 mb-1.5">
              <span>
                {amountNeededForFreeShipping > 0
                  ? `Add $${amountNeededForFreeShipping.toFixed(2)} more for Free Shipping`
                  : 'You unlocked Free Worldwide Shipping!'}
              </span>
              <span className="font-bold text-zinc-900">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-900 rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Item List / Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wider">
                  Your bag is empty
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Explore the Winter Collection and Harfa Paris releases to add items.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-7 py-3 bg-black text-white text-xs font-bold tracking-widest uppercase rounded-full hover:bg-zinc-800 transition-colors"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-4 pb-6 border-b border-zinc-100 last:border-0"
                >
                  {/* Item Image */}
                  <div className="w-20 h-24 bg-[#F5F5F7] rounded-xl overflow-hidden p-2 flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wide">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        Size: <span className="font-semibold text-zinc-800">{item.selectedSize || 'M'}</span>
                      </p>
                      <div className="text-xs font-bold text-zinc-950 mt-1">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-zinc-900 ml-auto">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-zinc-50 border-t border-zinc-200 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PROMO CODE (e.g. HARFA87)"
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase tracking-wider border border-zinc-200 rounded-lg focus:outline-none focus:border-black bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold tracking-wider rounded-lg uppercase hover:bg-black"
                >
                  APPLY
                </button>
              </form>
              {promoMessage && (
                <p className={`text-[11px] font-medium ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">${rawSubtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-zinc-900">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total (Inc. Taxes)</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              {checkoutComplete ? (
                <div className="w-full py-3.5 bg-emerald-600 text-white rounded-full flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase">
                  <Check className="w-4 h-4" /> ORDER PLACED SUCCESSFULLY!
                </div>
              ) : (
                <button
                  onClick={handleCheckoutClick}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-black text-white text-xs font-bold tracking-[0.2em] rounded-full uppercase hover:bg-zinc-800 transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-black/10 disabled:opacity-75"
                >
                  {isCheckingOut ? (
                    <span className="animate-pulse">PROCESSING SECURE PAYMENT...</span>
                  ) : (
                    <>
                      <span>CHECKOUT • ${grandTotal.toFixed(2)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
