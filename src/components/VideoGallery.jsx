import React, { useState, useMemo } from 'react';
import { Play, Filter, Search, Plus, Trash2, Edit3, Eye, Clock, Award, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

export default function VideoGallery({ 
  videos, 
  onSelectVideo, 
  isAdmin, 
  onOpenAdminUpload, 
  onEditVideo, 
  onDeleteVideo 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredVideoId, setHoveredVideoId] = useState(null);

  const categories = [
    'All',
    'Commercials',
    'Music Videos',
    'Motion Graphics',
    'VFX & Color Grade',
    'Showreels'
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
      const matchesSearch = 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.client && video.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (video.caption && video.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (video.software && video.software.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [videos, selectedCategory, searchQuery]);

  return (
    <section id="works" className="py-24 bg-cinema-950 relative border-t border-white/5">
      
      {/* Background ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-900/10 blur-[150px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-900/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-red-500 font-tech text-xs tracking-[0.25em] uppercase mb-2">
              <span className="w-6 h-[2px] bg-red-500"></span>
              PORTFOLIO ARCHIVE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              SELECTED WORKS & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
                MOTION GRAPHICS
              </span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl font-light">
              Click any project to play in the 4K Cinema Lightbox, view the color grade breakdown, and read the creative story behind each edit.
            </p>
          </div>

          {/* Admin Fast Upload Action */}
          {isAdmin && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAdminUpload}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cinema-accent hover:bg-red-600 text-white font-tech text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/60 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Video</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-none px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-tech tracking-wider uppercase whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-950/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[260px] px-2">
            <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, client, software..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cinema-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 font-tech focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

        </div>

        {/* Admin Notification Banner */}
        {isAdmin && (
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-red-900/20 to-black/60 border border-red-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-tech font-bold text-white uppercase tracking-wider">
                  Admin Editing Mode Active
                </h4>
                <p className="text-xs text-slate-400">
                  You can upload new videos, edit captions/details, or delete projects directly on each card below.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenAdminUpload}
              className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-tech text-xs font-semibold whitespace-nowrap"
            >
              + Add Video
            </button>
          </div>
        )}

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-20 bg-cinema-900/40 border border-white/5 rounded-2xl">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-display text-white">No projects found</h3>
            <p className="text-sm text-slate-400 font-tech mt-1">Try resetting the filter or search query.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-tech"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVideos.map((video) => {
              const isVertical = video.aspectRatio === '9:16';
              const isHovered = hoveredVideoId === video.id;

              return (
                <div
                  key={video.id}
                  className="group relative bg-cinema-900/80 border border-white/10 rounded-2xl overflow-hidden glass-panel-hover flex flex-col transition-all duration-300"
                  onMouseEnter={() => setHoveredVideoId(video.id)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                >
                  
                  {/* Media / Thumbnail Container */}
                  <div 
                    onClick={() => onSelectVideo(video)}
                    className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer"
                  >
                    {/* Thumbnail Image */}
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                        isHovered && video.videoUrl && !video.videoUrl.includes('youtube') && !video.videoUrl.includes('vimeo') 
                          ? 'opacity-0' 
                          : 'opacity-100'
                      }`}
                      loading="lazy"
                    />

                    {/* Quick Hover Video Preview if direct MP4 */}
                    {isHovered && video.videoUrl && !video.videoUrl.includes('youtube') && !video.videoUrl.includes('vimeo') && (
                      <video
                        src={video.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-transparent to-black/40 pointer-events-none"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-tech text-red-400 border border-red-500/30 uppercase tracking-widest font-bold">
                        {video.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {video.featured && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/80 text-black text-[9px] font-tech font-bold uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-black/70 text-slate-300 text-[10px] font-mono border border-white/10 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-slate-400" />
                          {video.duration}
                        </span>
                      </div>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl shadow-red-950/80 group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Aspect Ratio Ribbon */}
                    <div className="absolute bottom-2 right-3 pointer-events-none">
                      <span className="text-[10px] font-mono text-slate-400 bg-black/60 px-1.5 py-0.5 rounded border border-white/5">
                        {video.aspectRatio || '16:9'}
                      </span>
                    </div>

                  </div>

                  {/* Details Card */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Client & Year */}
                      <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
                        <span className="text-red-400 uppercase tracking-wider font-semibold">
                          {video.client || 'Client Project'}
                        </span>
                        <span className="font-mono text-slate-500">{video.year || '2026'}</span>
                      </div>

                      {/* Video Title */}
                      <h3 
                        onClick={() => onSelectVideo(video)}
                        className="text-lg font-display font-bold text-white group-hover:text-red-400 transition-colors cursor-pointer leading-tight mb-2"
                      >
                        {video.title}
                      </h3>

                      {/* Video Caption / Story */}
                      <p className="text-xs text-slate-300/90 line-clamp-2 font-sans font-light leading-relaxed mb-4">
                        {video.caption}
                      </p>
                    </div>

                    {/* Bottom Area: Software & Actions */}
                    <div>
                      {/* Software Chips */}
                      {video.software && video.software.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {video.software.map((tool, idx) => (
                            <span 
                              key={idx} 
                              className="text-[10px] font-tech px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <button
                          onClick={() => onSelectVideo(video)}
                          className="text-xs font-tech text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold group/btn"
                        >
                          <span>Watch & Read Story</span>
                          <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                        </button>

                        {/* Admin Action Buttons */}
                        {isAdmin && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditVideo(video);
                              }}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                              title="Edit Caption / Details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Delete project "${video.title}"?`)) {
                                  onDeleteVideo(video.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-colors"
                              title="Delete Video"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </section>
  );
}
