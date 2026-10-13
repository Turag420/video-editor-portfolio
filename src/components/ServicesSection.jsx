import React from 'react';
import { Film, Zap, Palette, Volume2, Sparkles, Smartphone, ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Film,
      number: "01",
      title: "Cinematic & Music Video Editing",
      desc: "Beat-synchronized editing, dynamic pacing, non-linear narrative progression, and match-cuts designed to command full viewer retention.",
      tags: ["Rhythm Sync", "Speed Ramps", "Multi-Cam", "Montages"]
    },
    {
      icon: Zap,
      number: "02",
      title: "Motion Graphics & Kinetic Titles",
      desc: "Stylized title sequences, 3D logo stings, glowing cyberpunk HUD graphics, lower-thirds, and broadcast motion graphic packages.",
      tags: ["After Effects", "3D Titles", "HUD Overlays", "Transitions"]
    },
    {
      icon: Palette,
      number: "03",
      title: "DaVinci Resolve Color Grading",
      desc: "Cinema-grade color transformation. Kodak 2383 film stock emulation, ACES color management, skin tone isolation, and rich mood sculpting.",
      tags: ["ACEScc", "Film Emulation", "Shot Matching", "LUT Design"]
    },
    {
      icon: Volume2,
      number: "04",
      title: "Sound Design & Audio Engineering",
      desc: "Deep sub-bass impacts, crisp cinematic risers, immersive foley sound effects, audio ducking, and surgical dialogue restoration.",
      tags: ["Foley Mixing", "Impact Hits", "Audio Cleanup", "5.1 Surround"]
    },
    {
      icon: Sparkles,
      number: "05",
      title: "VFX Compositing & Cleanups",
      desc: "Planar tracking, screen replacements, rotoscoping, object removal, sky enhancements, and Topaz AI detail upscaling.",
      tags: ["Mocha Pro", "Rotoscoping", "Keying", "Topaz AI"]
    },
    {
      icon: Smartphone,
      number: "06",
      title: "High-Retention Vertical Reels",
      desc: "Mobile-first 9:16 cuts engineered for Instagram Reels, YouTube Shorts, and TikTok with viral sound bites and instant hook visuals.",
      tags: ["9:16 Format", "Viral Hooks", "Subtitles", "Fast Pacing"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-cinema-950 relative border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-red-500 font-tech text-xs tracking-[0.25em] uppercase mb-2">
            <span className="w-6 h-[2px] bg-red-500"></span>
            POST-PRODUCTION SERVICES
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            WHAT I DELIVER // <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
              FULL POST-PRODUCTION CAPABILITIES
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base font-light">
            From raw camera rushes to final 4K master delivery, every frame is polished with meticulous attention to pacing, sound, and visual mood.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-cinema-900/60 border border-white/10 glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-slate-700 group-hover:text-red-500/60 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-red-400 transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-tech text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
