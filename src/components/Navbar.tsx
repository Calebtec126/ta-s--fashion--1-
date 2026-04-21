import { useState } from 'react';
import { ShoppingBag, User, Search, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  user: any;
}

export function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenAuth, 
  searchQuery, 
  onSearchChange,
  user
}: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Promo Banner */}
      <div className="bg-brand-ink py-2 text-center text-[10px] font-bold tracking-[0.2em] text-brand-paper uppercase">
        Complimentary standard shipping on orders over $500
      </div>
      
      <nav className="w-full border-b border-brand-ink/10 bg-brand-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <a href="/" className="font-display text-2xl font-semibold tracking-tighter sm:text-3xl">
            TA'S<span className="font-normal italic">FASHION</span>
          </a>
        </div>

        <div className="hidden lg:flex lg:gap-8 active-none">
          {['NEW ARRIVALS', 'WOMEN', 'MEN', 'ACCESSORIES'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-xs font-medium tracking-[0.2em] transition-colors hover:text-brand-ink/60"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-brand-ink/20 bg-brand-paper px-4 py-1.5 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-brand-ink/30"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative z-10 transition-transform active:scale-95"
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
          </div>

          <button 
            onClick={onOpenAuth}
            className="flex items-center gap-2 transition-transform active:scale-95"
          >
            <User className="h-5 w-5" />
            <span className="hidden text-xs font-medium tracking-widest sm:block">
              {user ? user.name.toUpperCase() : 'SIGN IN'}
            </span>
          </button>

          <button 
            onClick={onOpenCart}
            className="group relative flex items-center transition-transform active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-ink text-[10px] text-brand-paper"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </nav>
  </div>
);
}
