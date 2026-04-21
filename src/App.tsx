import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ProductModal } from './components/ProductModal';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, User } from './types';
import { ChevronRight, ArrowRight, Check } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsLetterSubscribed, setNewsLetterSubscribed] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsLetterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsLetterSubscribed(false), 5000);
    }
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen selection:bg-brand-ink selection:text-brand-paper">
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        user={user}
      />

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80"
            alt="Hero Fashion"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-ink/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-brand-paper">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-6xl font-light tracking-tight sm:text-8xl md:text-9xl"
            >
              Essential <span className="italic">Elegance</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-sm font-medium tracking-[0.3em] uppercase sm:text-base"
            >
              Spring Summer 2026 Collection
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex items-center gap-4 rounded-full border border-brand-paper px-8 py-4 text-xs font-bold tracking-[0.2em] transition-all hover:bg-brand-paper hover:text-brand-ink active:scale-95"
            >
              SHOP NEW ARRIVALS <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Our Catalog</h2>
              <div className="mt-4 flex flex-wrap gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "text-[10px] font-bold tracking-[0.2em] uppercase transition-all",
                      activeCategory === cat 
                        ? "text-brand-ink underline underline-offset-8" 
                        : "text-brand-ink/40 hover:text-brand-ink"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <p className="max-w-xs text-xs leading-relaxed tracking-widest text-brand-ink/60 uppercase">
              Curated for the modern individual who seeks quality in every stitch and silhouette.
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={setSelectedProduct}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-64 flex-col items-center justify-center text-center"
              >
                <p className="text-sm tracking-widest text-brand-ink/40 uppercase">No products found matching your search.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                  className="mt-4 text-xs font-bold underline underline-offset-4"
                >
                  CLEAR ALL FILTERS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Brand Philosophy */}
        <section className="bg-brand-ink py-24 text-brand-paper">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl sm:aspect-square lg:aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80" 
                    alt="Brand Philosophy" 
                    className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-105 hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <span className="text-[10px] font-bold tracking-[0.3em] opacity-50 uppercase">Since 2012</span>
                  <h3 className="mt-4 font-display text-5xl font-light leading-tight sm:text-6xl italic text-balance">
                    Crafting the future of fine tailoring through sustainable heritage.
                  </h3>
                </div>
                <p className="text-sm font-light leading-relaxed opacity-70 sm:text-lg">
                  At TA'S FASHION, we believe fashion is more than what you wear—it's a dialogue between craftsmanship and the individual. Each piece is meticulously designed in our studio, utilizing only the finest ethically sourced materials.
                </p>
                <button className="group flex items-center gap-4 text-xs font-bold tracking-[0.2em]">
                  DISCOVER OUR STORY <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-brand-ink/10 bg-brand-paper py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">Shop</h4>
              <ul className="mt-4 space-y-2 text-xs font-medium">
                <li><a href="#" className="hover:underline">Women</a></li>
                <li><a href="#" className="hover:underline">Men</a></li>
                <li><a href="#" className="hover:underline">Accessories</a></li>
                <li><a href="#" className="hover:underline">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">Company</h4>
              <ul className="mt-4 space-y-2 text-xs font-medium">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Sustainability</a></li>
                <li><a href="#" className="hover:underline">Press</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">Support</h4>
              <ul className="mt-4 space-y-2 text-xs font-medium">
                <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
                <li><a href="#" className="hover:underline">Size Guide</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">Newsletter</h4>
              <p className="mt-4 text-[10px] opacity-60 uppercase tracking-widest leading-relaxed">Sign up for early access and seasonal updates.</p>
              <div className="mt-4">
                {newsLetterSubscribed ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-[10px] font-bold text-brand-ink"
                  >
                    <Check className="h-4 w-4" /> THANK YOU FOR SUBSCRIBING
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex border-b border-brand-ink/20 pb-2">
                    <input 
                      type="email" 
                      required
                      placeholder="EMAIL ADDRESS" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-transparent text-[10px] outline-none"
                    />
                    <button type="submit" className="text-[10px] font-bold transition-transform active:scale-90">JOIN</button>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between border-t border-brand-ink/10 pt-8 sm:flex-row">
            <span className="font-display text-xl font-semibold tracking-tighter">TA'S<span className="font-normal italic">FASHION</span></span>
            <p className="mt-4 text-[10px] opacity-40 sm:mt-0">© 2026 TA'S FASHION. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(u) => setUser(u)}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
