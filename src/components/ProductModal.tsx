import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[120] bg-brand-ink/60 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed left-1/2 top-1/2 z-[130] flex w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-brand-paper shadow-2xl md:h-[70vh]"
      >
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full bg-brand-paper p-2 text-brand-ink transition-colors hover:bg-brand-ink hover:text-brand-paper"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex w-full flex-col md:flex-row">
          <div className="h-64 w-full bg-brand-ink/5 md:h-full md:w-1/2">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
            <span className="text-[10px] font-bold tracking-[0.3em] text-brand-ink/40 uppercase">
              {product.category}
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {product.name}
            </h2>
            <p className="mt-2 text-2xl font-light tracking-tight text-brand-ink/80">
              ${product.price}
            </p>
            
            <div className="mt-8">
              <h4 className="border-b border-brand-ink/10 pb-2 text-[10px] font-bold tracking-[0.1em] uppercase">Description</h4>
              <p className="mt-4 text-sm leading-relaxed text-brand-ink/60">
                {product.description}
              </p>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <button 
                onClick={() => { onAddToCart(product); onClose(); }}
                className="flex flex-1 items-center justify-center gap-3 rounded-full bg-brand-ink py-4 text-xs font-bold tracking-[0.2em] text-brand-paper transition-transform active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" /> ADD TO BAG
              </button>
              <button className="rounded-full border border-brand-ink px-4 py-4 transition-colors hover:bg-brand-ink hover:text-brand-paper active:scale-95">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-brand-ink/10 pt-8">
              <div>
                <h5 className="text-[9px] font-bold tracking-widest opacity-40 uppercase">Material</h5>
                <p className="mt-1 text-xs">Premium Grade</p>
              </div>
              <div>
                <h5 className="text-[9px] font-bold tracking-widest opacity-40 uppercase">Shipping</h5>
                <p className="mt-1 text-xs">Standard (3-5 days)</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
