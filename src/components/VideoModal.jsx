import React, { useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, MessageCircle, Mail, Film, Layers, Calendar, Clock, Share2 } from 'lucide-react';

export default function VideoModal({ video, onClose, onPrev, onNext }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!video) return null;

  // Helper for YouTube Embed
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0` 
      : null;
  };

  // Helper for Vimeo Embed
  const getVimeoEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/vimeo.*\/(\d+)/i);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : null;
  };

  const youtubeEmbed = getYouTubeEmbedUrl(video.videoUrl);
  const vimeoEmbed = getVimeoEmbedUrl(video.videoUrl);
  const isEmbed = !!(youtubeEmbed || vimeoEmbed);

  const whatsappMessage = encodeURIComponent(
    `Hi Turag, I watched your video "${video.title}" (${video.category}) on your portfolio. I have a similar project and would like to discuss working together!`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-6xl bg-cinema-900 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black overflow-hidden flex flex-col my-auto max-h-[95vh]">
        
        {/* Top Bar with Cinema Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-tech text-xs tracking-widest text-slate-400 uppercase">
              CINEMA THEATER MODE // 4K PREVIEW
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-red-400">
              {video.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split Video & Story */}
        <div className="overflow-y-auto flex-1 flex flex-col lg:flex-row">
          
          {/* Left / Top: Video Player Canvas */}
          <div className="lg:w-7/12 bg-black flex flex-col justify-center relative min-h-[300px] sm:min-h-[420px]">
            {isEmbed ? (
              <div className="relative w-full aspect-video">
                <iframe
                  src={youtubeEmbed || vimeoEmbed}
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : video.videoUrl ? (
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video bg-cinema-950 flex flex-col items-center justify-center p-6 text-center">
                <Film className="w-12 h-12 text-slate-600 mb-3" />
                <p className="text-sm font-tech text-slate-400">Video source url pending</p>
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-30" 
                />
              </div>
            )}
          </div>

          {/* Right / Bottom: Project Information & Story */}
          <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-cinema-900/60 overflow-y-auto">
            
            <div className="space-y-6">
              
              {/* Category, Year, Client */}
              <div>
                <div className="flex items-center gap-2 text-xs font-tech text-red-400 uppercase tracking-wider mb-1.5">
                  <span>{video.client || 'Client Project'}</span>
                  <span>•</span>
                  <span>{video.year || '2026'}</span>
                  <span>•</span>
                  <span>{video.duration || '01:00'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                  {video.title}
                </h3>
              </div>

              {/* Caption / Director Note / Story */}
              <div>
                <h4 className="text-xs font-tech font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-2">
                  <Film className="w-3.5 h-3.5 text-red-400" />
                  EDITOR'S CAPTION & CREATIVE STORY
                </h4>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 font-sans text-sm text-slate-200 leading-relaxed font-light whitespace-pre-line">
                  {video.caption || "No caption provided for this project."}
                </div>
              </div>

              {/* Technical Pipeline */}
              {video.software && video.software.length > 0 && (
                <div>
                  <h4 className="text-xs font-tech font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    POST-PRODUCTION PIPELINE
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {video.software.map((sw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-tech text-slate-300"
                      >
                        {sw}
                      </span>
                    ))}
                    <span className="px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/20 text-xs font-tech text-red-300">
                      Aspect: {video.aspectRatio || '16:9'}
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Direct Hire / Contact CTA */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              <a
                href={`https://wa.me/8801628103879?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-tech text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss Similar Edit on WhatsApp</span>
              </a>

              <a
                href={`mailto:turag111@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(video.title)}&body=Hi%20Turag,%0A%0AI%20am%20interested%20in%20working%20with%20you%20for%20a%20project%20similar%20to%20"${encodeURIComponent(video.title)}".`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-tech text-xs tracking-wider uppercase transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email Turag (turag111@gmail.com)</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
