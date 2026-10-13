import React from 'react';
import { Film, MessageCircle, Mail, Phone, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cinema-accent to-red-900 flex items-center justify-center text-white shadow-lg shadow-red-950/50">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-wider text-white">
                  TURAG
                </span>
                <span className="block text-[11px] font-tech text-red-500 uppercase tracking-widest font-semibold">
                  Cinematic Video Editor & Motion Designer
                </span>
              </div>
            </div>

            <p className="text-sm font-sans font-light text-slate-400 max-w-md leading-relaxed">
              Specializing in high-end commercial post-production, stylized music videos, 3D motion graphics, and DaVinci Resolve color grading for global clients.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/8801628103879"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-tech font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: +8801628103879</span>
              </a>

              <a
                href="mailto:turag111@gmail.com"
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-tech flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>turag111@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-tech font-bold uppercase tracking-widest text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-tech">
              <li>
                <a href="#showreel" className="hover:text-white transition-colors">Showreel 2026</a>
              </li>
              <li>
                <a href="#works" className="hover:text-white transition-colors">Portfolio Archive</a>
              </li>
              <li>
                <a href="#color-lab" className="hover:text-white transition-colors">Before & After Color Lab</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Post-Production Services</a>
              </li>
              <li>
                <a href="#arsenal" className="hover:text-white transition-colors">Software & Workstation</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Hire Turag</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Inquiry */}
          <div>
            <h4 className="text-xs font-tech font-bold uppercase tracking-widest text-white mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs font-tech">
              <li className="flex items-center gap-2">
                <span className="text-slate-500">Phone:</span>
                <a href="tel:+8801628103879" className="text-white hover:text-emerald-400 font-mono">
                  +8801628103879
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-500">WhatsApp:</span>
                <a href="https://wa.me/8801628103879" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  +8801628103879
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-500">Email:</span>
                <a href="mailto:turag111@gmail.com" className="text-white hover:text-red-400">
                  turag111@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-slate-300">Available For New Projects</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-slate-500">
          <div>
            © {new Date().getFullYear()} TURAG. All Rights Reserved. Mastered in 4K HDR.
          </div>

          <div className="flex items-center gap-6">
            <span>Dhaka, Bangladesh • Worldwide Remote Delivery</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
