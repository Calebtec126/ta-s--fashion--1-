import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-brand-ink/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-brand-paper p-6 shadow-2xl sm:p-8"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-brand-ink/10 pb-6">
                <h2 className="text-2xl font-semibold tracking-tight">Shopping Bag</h2>
                <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-brand-ink/5">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <ShoppingBag className="mb-4 h-12 w-12 opacity-20" />
                    <p className="text-sm tracking-widest text-brand-ink/50 uppercase">Your bag is empty</p>
                    <button 
                      onClick={onClose}
                      className="mt-6 text-xs font-bold tracking-widest underline underline-offset-4"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-24 w-20 flex-shrink-0 bg-brand-ink/5">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-sm font-medium">{item.name}</h4>
                              <p className="text-[10px] uppercase tracking-widest text-brand-ink/50">{item.category}</p>
                            </div>
                            <p className="text-sm font-bold tracking-tight">${item.price}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="rounded border border-brand-ink/10 p-1 transition-colors hover:bg-brand-ink/5"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="rounded border border-brand-ink/10 p-1 transition-colors hover:bg-brand-ink/5"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button 
                              onClick={() => onRemove(item.id)}
                              className="text-[10px] font-bold tracking-widest text-brand-ink/40 transition-colors hover:text-brand-ink"
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-brand-ink/10 pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs tracking-widest opacity-60">SUBTOTAL</span>
                    <span className="text-lg font-bold tracking-tight">${total}</span>
                  </div>
                  <button className="w-full rounded-full bg-brand-ink py-4 text-xs font-bold tracking-[0.2em] text-brand-paper transition-transform active:scale-95">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
