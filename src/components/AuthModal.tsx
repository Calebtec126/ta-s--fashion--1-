import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: formData.name || formData.email.split('@')[0], email: formData.email });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-brand-ink/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[110] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-brand-paper p-8 shadow-2xl"
          >
            <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-brand-ink/5">
              <X className="h-5 w-5" />
            </button>

            <h2 className="mb-2 font-display text-4xl font-semibold tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join VogueVibe'}
            </h2>
            <p className="mb-8 text-sm tracking-wide text-brand-ink/60 underline cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest opacity-60">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full border-b border-brand-ink/20 bg-transparent py-2 text-sm focus:border-brand-ink focus:outline-none"
                  />
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest opacity-60">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full border-b border-brand-ink/20 bg-transparent py-2 text-sm focus:border-brand-ink focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest opacity-60">Password</label>
                <input
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 w-full border-b border-brand-ink/20 bg-transparent py-2 text-sm focus:border-brand-ink focus:outline-none"
                />
              </div>
              <button className="mt-4 w-full rounded-full bg-brand-ink py-4 text-xs font-bold tracking-[0.2em] text-brand-paper transition-transform active:scale-95">
                {isLogin ? 'LOG IN' : 'CREATE ACCOUNT'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
