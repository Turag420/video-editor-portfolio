import React from 'react';
import { Cpu, HardDrive, Monitor, Layers } from 'lucide-react';

export default function SoftwareStack() {
  const tools = [
    {
      name: "Adobe Premiere Pro",
      role: "NLE Master Assembly & Narrative Pacing",
      level: "Expert",
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20"
    },
    {
      name: "DaVinci Resolve Studio",
      role: "Color Grading, ACEScc & Mastering",
      level: "Expert",
      color: "border-amber-500/40 text-amber-400 bg-amber-950/20"
    },
    {
      name: "Adobe After Effects",
      role: "Motion Graphics, VFX & Kinetic Type",
      level: "Expert",
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/20"
    },
    {
      name: "Blender 3D",
      role: "3D Camera Projection & Environment FX",
      level: "Advanced",
      color: "border-orange-500/40 text-orange-400 bg-orange-950/20"
    },
    {
      name: "Boris FX Mocha Pro",
      role: "Planar 2D/3D Tracking & Screen Inserts",
      level: "Advanced",
      color: "border-blue-500/40 text-blue-400 bg-blue-950/20"
    },
    {
      name: "Topaz Video AI",
      role: "Neural Deinterlacing, Upscaling & Interpolation",
      level: "Advanced",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
    },
    {
      name: "iZotope RX Studio",
      role: "Spectral Audio Cleanup & Vocal Isolation",
      level: "Advanced",
      color: "border-rose-500/40 text-rose-400 bg-rose-950/20"
    },
    {
      name: "FilmConvert Nitrate",
      role: "Photochemical 35mm Grain & Halation",
      level: "Expert",
      color: "border-red-500/40 text-red-400 bg-red-950/20"
    }
  ];

  return (
    <section id="arsenal" className="py-24 bg-cinema-900/40 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-red-500 font-tech text-xs tracking-[0.25em] uppercase mb-2">
              <span className="w-6 h-[2px] bg-red-500"></span>
              ARSENAL & HARDWARE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              TOOLS OF THE CRAFT // <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">
                INDUSTRY STANDARD SOFTWARE
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-light">
            Engineered on a dedicated RTX workstation with 100% DCI-P3 calibrated displays and high-speed NVMe scratch storage.
          </p>
        </div>

        {/* Software Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tools.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-cinema-900/80 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-tech font-bold uppercase border ${item.color}`}>
                    {item.level}
                  </span>
                  <span className="text-slate-600 font-mono text-xs">0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-1.5">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Workstation Specs Strip */}
        <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-around gap-6 text-xs font-tech text-slate-300">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-red-400" />
            <span>NVIDIA RTX High-Performance Multi-GPU Acceleration</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Monitor className="w-4 h-4 text-amber-400" />
            <span>10-Bit Calibrated 4K HDR Reference Color Monitor</span>
          </div>
          <div className="flex items-center gap-2.5">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <span>Gen4 NVMe RAID Scratch Disks (7000MB/s Read/Write)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
