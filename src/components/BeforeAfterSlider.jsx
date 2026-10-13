import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="color-lab" className="py-24 bg-cinema-900/60 relative border-t border-white/5 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[160px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-600/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-red-500 font-tech text-xs tracking-[0.25em] uppercase mb-2">
            <span className="w-6 h-[2px] bg-red-500"></span>
            COLOR SCIENCE & VFX SUITE
            <span className="w-6 h-[2px] bg-red-500"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            THE COLOR LAB // <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-red-500">
              BEFORE & AFTER BREAKDOWN
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base font-light">
            Drag the interactive slider below to inspect raw LOG sensor capture transformed into custom 35mm film emulation, highlight rolloff, and rich skin tone color science.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black select-none cursor-ew-resize group"
          >
            {/* After Image (Full width background - Graded) */}
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80"
              alt="Final Graded 4K Cinema Film"
              className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-125"
            />
            
            {/* Label: Final Grade */}
            <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-300 font-tech text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>FINAL GRADE (DaVinci Resolve ACES)</span>
              </div>
            </div>

            {/* Before Image (Clipped with width - Raw Flat Log) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80"
                alt="Raw LOG Flat Capture"
                className="absolute inset-0 w-full h-full object-cover filter saturate-40 brightness-110 contrast-75 max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
              />

              {/* Label: Raw Log */}
              <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-slate-300 font-tech text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span>RAW FLAT LOG (ARRI / Sony S-Log3)</span>
                </div>
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-1 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] relative -left-0.5">
                {/* Center Knob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center border-2 border-white shadow-xl group-hover:scale-110 transition-transform">
                  <Sliders className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Drag Hint at center */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-tech text-slate-300 pointer-events-none uppercase tracking-wider">
              ⇄ Drag slider to inspect grade
            </div>

          </div>

          {/* Colorist Capabilities Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-tech font-bold text-white uppercase tracking-wider">ACEScc Color Pipeline</h4>
                <p className="text-xs text-slate-400 mt-1">Wide-gamut mathematical accuracy ensuring broadcast compliance.</p>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-tech font-bold text-white uppercase tracking-wider">Analog Film Emulation</h4>
                <p className="text-xs text-slate-400 mt-1">Custom Kodak 5207, 2383 print stock halation, grain, and gate weave.</p>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-tech font-bold text-white uppercase tracking-wider">Skin Tone Isolation</h4>
                <p className="text-xs text-slate-400 mt-1">Flawless natural skin hues preserved across stylized neon environments.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
