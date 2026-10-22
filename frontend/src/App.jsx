import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WinterCollections from './components/WinterCollections';
import HarfaBanner from './components/HarfaBanner';
import WinterVideoBanner from './components/WinterVideoBanner';
import FeaturedCollections from './components/FeaturedCollections';
import Demographics from './components/Demographics';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import VideoModal from './components/VideoModal';
import StoreLocatorModal from './components/StoreLocatorModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import { initialProducts, additionalProducts } from './data/products';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Men's");
  const [siteContent, setSiteContent] = useState(null);

  // Persistent Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('milan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('milan_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1']; // default wishlist item from mockup
    } catch {
      return ['prod-1'];
    }
  });

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // Fetch dynamic content & catalog from Backend API
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const contentRes = await fetch('http://localhost:5000/api/content');
        if (contentRes.ok) {
          const contentJson = await contentRes.json();
          if (contentJson?.data) {
            setSiteContent(contentJson.data);
          }
        }
      } catch {
        // Fallback silently to default local assets
      }

      try {
        const prodRes = await fetch('http://localhost:5000/api/products');
        if (prodRes.ok) {
          const prodJson = await prodRes.json();
          if (prodJson?.data && prodJson.data.length > 0) {
            // Normalize backend products to fit UI
            const formatted = prodJson.data.map((p) => ({
              ...p,
              id: p._id || p.id,
              mrpText: p.mrpText || 'MRP INCLUSIVE OF ALL TAXES'
            }));
            setProducts(formatted);
          }
        }
      } catch {
        // Fallback silently to initialProducts
      }
    };

    fetchBackendData();
  }, []);

  // Save Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('milan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('milan_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Helper to trigger toast
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Wishlist toggle handler
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        'wishlist',
        exists ? 'REMOVED FROM WISHLIST' : 'SAVED TO WISHLIST',
        exists ? 'Item removed from your saved list.' : 'Item saved to your curated wishlist.'
      );
      return updated;
    });
  };

  // Add to Bag handler
  const handleAddToCart = (itemToAdd) => {
    const size = itemToAdd.selectedSize || (itemToAdd.sizes ? itemToAdd.sizes[0] : 'M');
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (i) => i.id === itemToAdd.id && i.selectedSize === size
      );

      if (existingIndex > -1) {
        const copy = [...prevCart];
        copy[existingIndex].quantity += itemToAdd.quantity || 1;
        return copy;
      } else {
        return [
          ...prevCart,
          {
            ...itemToAdd,
            selectedSize: size,
            quantity: itemToAdd.quantity || 1
          }
        ];
      }
    });

    showToast('cart', 'ADDED TO BAG', `${itemToAdd.name} (Size: ${size}) added.`);
  };

  // Cart update quantity
  const handleUpdateQuantity = (productId, selectedSize, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Cart remove item
  const handleRemoveItem = (productId, selectedSize) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  // Checkout complete
  const handleCheckout = async () => {
    // Post order to backend
    try {
      await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          subtotal: cart.reduce((s, i) => s + i.price * i.quantity, 0),
          totalAmount: cart.reduce((s, i) => s + i.price * i.quantity, 0)
        })
      });
    } catch {
      // Ignore background post failure if offline
    }

    setCart([]);
    showToast(
      'success',
      'ORDER CONFIRMED',
      'Thank you! Confirmation and tracking link sent to your email.'
    );
  };

  // Load more products
  const handleLoadMore = () => {
    setProducts((prev) => [...prev, ...additionalProducts]);
    setHasMoreProducts(false);
    showToast('info', 'COLLECTION EXPANDED', '4 additional Winter pieces loaded.');
  };

  // Smooth scroll helper
  const scrollToCollections = () => {
    const el = document.getElementById('winter-collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle category / gender filter selection
  const handleSelectDemographic = (gender) => {
    setActiveCategory(gender === 'MEN' ? "Men's" : gender === 'WOMEN' ? "woman's" : "Kid's");
    scrollToCollections();
    showToast('info', `${gender} SELECTION`, `Browsing ${gender} Winter edit.`);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white flex flex-col font-sans">
      {/* 1. Header / Navbar */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => {
          showToast('wishlist', 'SAVED WISHLIST', `You have ${wishlist.length} curated items.`);
          scrollToCollections();
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Page Flow Matching Reference Layout */}
      <main className="flex-1">
        {/* 2. Hero Section (Dynamic from backend) */}
        <Hero
          heroData={siteContent?.hero}
          onExploreCollections={scrollToCollections}
          onShopNow={scrollToCollections}
        />

        {/* 3. Winter Collections Section */}
        <WinterCollections
          products={products}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onOpenQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={handleAddToCart}
          onLoadMore={handleLoadMore}
          hasMoreProducts={hasMoreProducts}
        />

        {/* 4. Editorial Banner (Harfa Sty Paris) */}
        <HarfaBanner onFindStore={() => setIsStoreLocatorOpen(true)} />

        {/* 5. Campaign Video Banner (Wear to Winter) */}
        <WinterVideoBanner
          onPlayVideo={() => setIsVideoOpen(true)}
          onShopNow={scrollToCollections}
        />

        {/* 6. Featured Collections (Bento Grid) */}
        <FeaturedCollections
          onSelectCollection={(collectionName) => {
            scrollToCollections();
            showToast('info', `${collectionName.toUpperCase()} EDIT`, `Viewing ${collectionName} items.`);
          }}
        />

        {/* 7. Target Demographic Portrait Cards (MEN, WOMEN, KIDS) */}
        <Demographics onSelectGender={handleSelectDemographic} />
      </main>

      {/* 8. Footer */}
      <Footer
        onSubscribeNewsletter={async (email) => {
          try {
            await fetch('http://localhost:5000/api/newsletter', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            });
          } catch {
            // Ignore if offline
          }
          showToast('success', 'SUBSCRIBED', `${email} added to VIP list.`);
        }}
        onSelectCategory={(cat) => {
          scrollToCollections();
          showToast('info', `${cat}`, `Filtering ${cat} styles.`);
        }}
        onFindStore={() => setIsStoreLocatorOpen(true)}
      />

      {/* Drawers and Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        isLiked={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={[...initialProducts, ...additionalProducts]}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          showToast('success', 'WELCOME BACK', `Logged in as ${user.name}`);
        }}
      />

      {/* Floating Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
