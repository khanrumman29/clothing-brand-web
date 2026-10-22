import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Check } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onLoginSuccess({ name: name || 'Valued Member', email });
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl p-8 z-10 border border-zinc-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-black flex items-center justify-center transition-colors"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-2xl font-black tracking-[0.2em] uppercase text-zinc-950">
            MILAN
          </span>
          <h3 className="text-base font-bold uppercase tracking-wider text-zinc-900 mt-2">
            {isSignUp ? 'Create Milan Account' : 'Sign In to Your Account'}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Access private sales, faster checkout, and order tracking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alexander McQueen"
                  className="w-full pl-10 pr-4 py-3 text-xs border border-zinc-300 rounded-xl focus:outline-none focus:border-black"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vip@milan-atelier.com"
                className="w-full pl-10 pr-4 py-3 text-xs border border-zinc-300 rounded-xl focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 text-xs border border-zinc-300 rounded-xl focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-black text-white text-xs font-bold tracking-[0.2em] rounded-full uppercase hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {submitted ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : isSignUp ? (
              'CREATE ACCOUNT'
            ) : (
              'SIGN IN'
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-zinc-100">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-zinc-600 hover:text-black font-medium underline"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account yet? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}
