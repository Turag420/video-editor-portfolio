import React, { useState, useEffect } from 'react';
import { Film, MessageCircle, Lock, Unlock, Menu, X, Sparkles, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ isAdmin, onOpenAdmin, onLogoutAdmin, isFilmGrain, setIsFilmGrain }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recBlink, setRecBlink] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blinking REC dot
  useEffect(() => {
    const timer = setInterval(() => {
      setRecBlink(prev => !prev);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-cinema-950/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/80 py-3' 
        : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cinema-accent to-red-900 flex items-center justify-center shadow-lg shadow-red-950/50 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-wider text-white group-hover:text-red-400 transition-colors">
                  TURAG
                </span>
                <span className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60 uppercase tracking-widest flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full bg-red-500 ${recBlink ? 'opacity-100' : 'opacity-20'}`}></span>
                  REC
                </span>
              </div>
              <p className="text-[11px] font-tech text-slate-400 tracking-widest uppercase">
                Video Editor & Motion Designer
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#showreel" className="text-sm font-tech text-slate-300 hover:text-white transition-colors tracking-wide">
              Showreel
            </a>
            <a href="#works" className="text-sm font-tech text-slate-300 hover:text-white transition-colors tracking-wide">
              Works
            </a>
            <a href="#color-lab" className="text-sm font-tech text-slate-300 hover:text-white transition-colors tracking-wide">
              Color Lab
            </a>
            <a href="#services" className="text-sm font-tech text-slate-300 hover:text-white transition-colors tracking-wide">
              Services
            </a>
            <a href="#arsenal" className="text-sm font-tech text-slate-300 hover:text-white transition-colors tracking-wide">
              Software
            </a>
            <a href="#contact" className="text-sm font-tech text-slate-300 hover:text-white transition-colors tracking-wide">
              Contact
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Film Grain Toggle */}
            <button
              onClick={() => setIsFilmGrain(!isFilmGrain)}
              title={isFilmGrain ? "Turn off film grain effect" : "Turn on film grain effect"}
              className={`p-2 rounded-lg border text-xs font-tech transition-all flex items-center gap-1.5 ${
                isFilmGrain 
                  ? 'bg-red-500/10 border-red-500/40 text-red-300' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grain: {isFilmGrain ? 'ON' : 'OFF'}</span>
            </button>

            {/* Direct WhatsApp Button */}
            <a
              href="https://wa.me/8801628103879?text=Hi%20Turag,%20I%20love%20your%20portfolio.%20I%20have%20a%20video%20editing%20project%20I%20would%20like%20to%20discuss."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-tech text-xs font-medium tracking-wide transition-all shadow-lg hover:shadow-emerald-950/50"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Admin Access Button */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-500/40 rounded-lg p-1">
                <button
                  onClick={onOpenAdmin}
                  className="px-3 py-1 rounded bg-cinema-accent hover:bg-red-600 text-white text-xs font-tech font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Unlock className="w-3 h-3" />
                  Admin Studio
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="px-2 py-1 text-slate-400 hover:text-white text-xs font-tech"
                  title="Logout Admin"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-tech text-xs tracking-wider transition-all"
                title="Admin Studio (Upload & Manage Videos)"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-tech flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-3 pb-3 bg-cinema-900/95 p-4 rounded-xl backdrop-blur-xl">
            <nav className="flex flex-col space-y-3 font-tech text-sm">
              <a 
                href="#showreel" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Showreel 2026
              </a>
              <a 
                href="#works" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Portfolio Gallery
              </a>
              <a 
                href="#color-lab" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Color Grading Lab
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Services
              </a>
              <a 
                href="#arsenal" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Software & Gear
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="https://wa.me/8801628103879?text=Hi%20Turag,%20I%20love%20your%20portfolio.%20I%20have%20a%20video%20editing%20project%20I%20would%20like%20to%20discuss."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-tech text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+8801628103879)</span>
              </a>
              <a
                href="mailto:turag111@gmail.com"
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 text-white font-tech text-xs"
              >
                turag111@gmail.com
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
