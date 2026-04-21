import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-ink/5">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-ink/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Quick View Button (Desktop only) */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-4 rounded-full bg-brand-paper/90 px-6 py-3 text-[10px] font-bold tracking-[0.2em] text-brand-ink opacity-0 transition-all duration-300 hover:bg-brand-ink hover:text-brand-paper group-hover:translate-y-[-50%] group-hover:opacity-100 lg:block active:scale-95"
        >
          QUICK VIEW
        </button>

        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 left-4 right-4 translate-y-4 rounded-full bg-brand-paper py-3 text-xs font-bold tracking-widest opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
        >
          ADD TO BAG
        </button>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="cursor-pointer" onClick={() => onQuickView(product)}>
          <h3 className="text-sm font-medium tracking-tight group-hover:underline underline-offset-4">{product.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-widest text-brand-ink/60">{product.category}</p>
        </div>
        <p className="text-sm font-bold">${product.price}</p>
      </div>
    </motion.div>
  );
}
