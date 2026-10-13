import React, { useState } from 'react';
import { Play, Sparkles, MessageCircle, ArrowDown, Film, Layers, Monitor, Sliders } from 'lucide-react';

export default function Hero({ onWatchShowreel }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section id="showreel" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-cinema-950">
      
      {/* Background Cinematic Video Loop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover scale-105 filter brightness-[0.35] contrast-125 transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=80"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Ambient Glows & Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-cinema-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-950 via-transparent to-cinema-950"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full"></div>
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[350px] bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full"></div>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      {/* Top Meta Tag Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="text-xs font-tech text-slate-300 tracking-wider uppercase">
            Available For High-End Commercials • Music Videos • Motion Graphics
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-4xl">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-red-500 font-tech text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            <span className="w-8 h-[2px] bg-red-500"></span>
            POST-PRODUCTION & CINEMATOGRAPHY LAB
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight leading-[1.05] uppercase">
            TURAG <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
              CINEMATIC
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">
              EDITING.
            </span>
          </h1>

          {/* Subtitle / Bio */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-sans font-light leading-relaxed">
            Crafting rhythm-driven storytelling, motion graphic title sequences, and color grading for music videos, commercials, and brand films. Transforming raw footage into unforgettable cinematic experiences.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            
            {/* Showreel Button */}
            <button
              onClick={onWatchShowreel}
              className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-cinema-accent to-red-700 text-white font-tech font-bold text-sm tracking-wider uppercase shadow-xl shadow-red-950/60 hover:shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white text-white group-hover:text-cinema-accent transition-colors">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span>Watch 2026 Showreel</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 text-red-200 border border-white/10">
                01:45
              </span>
            </button>

            {/* Portfolio Link */}
            <a
              href="#works"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-tech font-medium text-sm tracking-wider uppercase transition-all hover:border-white/20"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Explore Works</span>
            </a>

            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/8801628103879?text=Hi%20Turag,%20I%20saw%20your%20portfolio%20and%20want%20to%20hire%20you%20for%20an%20edit."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 font-tech font-semibold text-xs tracking-wider uppercase transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +8801628103879</span>
            </a>

          </div>

          {/* Quick Contact & Location Indicator */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-tech text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online Now (GMT+6)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Email:</span>
              <a href="mailto:turag111@gmail.com" className="text-slate-300 hover:text-red-400 underline decoration-slate-700 underline-offset-4">
                turag111@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Remote:</span>
              <span className="text-slate-300">Worldwide Clients Welcomed</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Stats & Marquee Strip */}
      <div className="relative z-10 w-full mt-6">
        
        {/* Metric Badges */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            
            <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-bold text-white">50+</div>
                <div className="text-[11px] font-tech text-slate-400 uppercase tracking-wider">Completed Edits</div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-bold text-white">4K HDR</div>
                <div className="text-[11px] font-tech text-slate-400 uppercase tracking-wider">ACES Color Grade</div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-bold text-white">10M+</div>
                <div className="text-[11px] font-tech text-slate-400 uppercase tracking-wider">Total Video Views</div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-bold text-white">100%</div>
                <div className="text-[11px] font-tech text-slate-400 uppercase tracking-wider">Client Satisfaction</div>
              </div>
            </div>

          </div>
        </div>

        {/* Cinematic Marquee Ribbon */}
        <div className="border-y border-white/10 bg-black/60 backdrop-blur-md py-2.5 overflow-hidden whitespace-nowrap flex">
          <div className="flex animate-marquee gap-8 text-xs font-tech tracking-[0.2em] text-slate-400 uppercase">
            <span>• PREMIERE PRO</span>
            <span>• DAVINCI RESOLVE STUDIO</span>
            <span>• AFTER EFFECTS MOTION GRAPHICS</span>
            <span>• SOUND DESIGN & FOLEY MIXING</span>
            <span>• 35MM FILM GRAIN EMULATION</span>
            <span>• VFX COMPOSITING & 3D TRACKING</span>
            <span>• SPEED RAMPING & RHYTHMIC CUTS</span>
            <span>• KINETIC TYPOGRAPHY</span>
            <span>• COMMERCIALS & MUSIC VIDEOS</span>
            <span>• PREMIERE PRO</span>
            <span>• DAVINCI RESOLVE STUDIO</span>
            <span>• AFTER EFFECTS MOTION GRAPHICS</span>
            <span>• SOUND DESIGN & FOLEY MIXING</span>
          </div>
        </div>

      </div>

    </section>
  );
}
