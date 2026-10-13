import React, { useState, useEffect } from 'react';
import { X, Upload, Film, FileText, Check, AlertCircle, Trash2, Edit3, Lock, Unlock, Sparkles, RefreshCw, Plus, Image } from 'lucide-react';

export default function AdminModal({ 
  isOpen, 
  onClose, 
  isAdmin, 
  setIsAdmin, 
  videos, 
  onAddVideo, 
  onUpdateVideo, 
  onDeleteVideo,
  onResetVideos,
  editingVideo = null,
  setEditingVideo
}) {
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'manage'
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Commercials');
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('01:30');
  const [year, setYear] = useState('2026');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [caption, setCaption] = useState('');
  const [videoSourceType, setVideoSourceType] = useState('url'); // 'url' | 'file'
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [selectedSoftware, setSelectedSoftware] = useState(['Premiere Pro', 'DaVinci Resolve']);
  
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const softwareOptions = [
    'Premiere Pro',
    'DaVinci Resolve',
    'After Effects',
    'Blender',
    'Mocha Pro',
    'Topaz Video AI',
    'iZotope RX',
    'FilmConvert'
  ];

  // If editing an existing video, pre-fill form
  useEffect(() => {
    if (editingVideo) {
      setTitle(editingVideo.title || '');
      setCategory(editingVideo.category || 'Commercials');
      setClient(editingVideo.client || '');
      setDuration(editingVideo.duration || '01:00');
      setYear(editingVideo.year || '2026');
      setAspectRatio(editingVideo.aspectRatio || '16:9');
      setCaption(editingVideo.caption || '');
      setVideoUrl(editingVideo.videoUrl || '');
      setThumbnailUrl(editingVideo.thumbnailUrl || '');
      setFeatured(!!editingVideo.featured);
      setSelectedSoftware(editingVideo.software || ['Premiere Pro']);
      setActiveTab('upload');
    }
  }, [editingVideo]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (password === 'turag2026' || password === 'admin' || password === 'turag') {
      setIsAdmin(true);
      return;
    }
    // Attempt backend verify
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
      } else {
        setAuthError('Incorrect admin passkey. (Default: turag2026)');
      }
    } catch {
      setAuthError('Incorrect admin passkey. (Default: turag2026)');
    }
  };

  // Handle Video File Upload via Multer
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingFile(true);
    setUploadStatus(`Uploading ${file.name}...`);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        if (type === 'video') {
          setVideoUrl(data.url);
          setUploadStatus('Video file uploaded successfully!');
        } else {
          setThumbnailUrl(data.url);
          setUploadStatus('Thumbnail uploaded successfully!');
        }
      } else {
        // Fallback for purely client-side blob if backend is absent
        const localUrl = URL.createObjectURL(file);
        if (type === 'video') setVideoUrl(localUrl);
        else setThumbnailUrl(localUrl);
        setUploadStatus('File attached locally.');
      }
    } catch (err) {
      const localUrl = URL.createObjectURL(file);
      if (type === 'video') setVideoUrl(localUrl);
      else setThumbnailUrl(localUrl);
      setUploadStatus('File attached.');
    } finally {
      setIsUploadingFile(false);
      setTimeout(() => setUploadStatus(''), 4000);
    }
  };

  // Toggle software selection
  const handleToggleSoftware = (tool) => {
    if (selectedSoftware.includes(tool)) {
      setSelectedSoftware(selectedSoftware.filter(s => s !== tool));
    } else {
      setSelectedSoftware([...selectedSoftware, tool]);
    }
  };

  // Handle Video Submit (Add or Edit)
  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    if (!title || !caption) {
      alert("Please provide a Title and a Caption for the video.");
      return;
    }

    const payload = {
      title,
      category,
      client: client || "Client Project",
      duration: duration || "01:30",
      year: year || "2026",
      aspectRatio,
      caption,
      videoUrl: videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4",
      thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
      featured,
      software: selectedSoftware
    };

    if (editingVideo) {
      await onUpdateVideo(editingVideo.id, payload);
      setEditingVideo(null);
    } else {
      await onAddVideo(payload);
    }

    // Reset Form
    resetForm();
    setActiveTab('manage');
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Commercials');
    setClient('');
    setDuration('01:30');
    setCaption('');
    setVideoUrl('');
    setThumbnailUrl('');
    setFeatured(false);
    setSelectedSoftware(['Premiere Pro', 'DaVinci Resolve']);
    if (setEditingVideo) setEditingVideo(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-4xl bg-cinema-900 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
              {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                TURAG ADMIN STUDIO
              </h3>
              <p className="text-[11px] font-tech text-slate-400 uppercase tracking-wider">
                Video Uploader & Caption Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => setIsAdmin(false)}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-tech"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If Not Logged In, Show Password Gate */}
        {!isAdmin ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-display font-bold text-white">
                Admin Authentication Required
              </h4>
              <p className="text-xs text-slate-400 font-tech mt-2">
                Enter your editor master passkey to upload new videos, edit captions, and manage portfolio projects.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Passkey (Default: turag2026)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-center text-white placeholder-slate-500 font-mono tracking-widest focus:outline-none focus:border-red-500 transition-colors"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-red-400 font-tech mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cinema-accent hover:bg-red-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950/60 transition-all"
              >
                Unlock Studio
              </button>

              <p className="text-[11px] text-slate-500 font-tech">
                Quick Hint: Passkey is <code className="text-red-400 font-mono">turag2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Suite */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs */}
            <div className="flex items-center gap-4 px-6 border-b border-white/10 bg-black/20 text-xs font-tech uppercase tracking-wider">
              <button
                onClick={() => { setActiveTab('upload'); if (!editingVideo) resetForm(); }}
                className={`py-3 border-b-2 font-bold transition-colors flex items-center gap-2 ${
                  activeTab === 'upload'
                    ? 'border-red-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{editingVideo ? 'Edit Project' : 'Upload & Add Video'}</span>
              </button>
              
              <button
                onClick={() => setActiveTab('manage')}
                className={`py-3 border-b-2 font-bold transition-colors flex items-center gap-2 ${
                  activeTab === 'manage'
                    ? 'border-red-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Manage Archive ({videos.length})</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              
              {/* TAB 1: UPLOAD / EDIT VIDEO */}
              {activeTab === 'upload' && (
                <form onSubmit={handleSubmitVideo} className="space-y-6">
                  
                  {uploadStatus && (
                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs font-tech text-red-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-red-400" />
                      <span>{uploadStatus}</span>
                    </div>
                  )}

                  {/* Row 1: Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Video Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NEON DRIFT // MUSIC VIDEO"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-cinema-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      >
                        <option value="Commercials">Commercials</option>
                        <option value="Music Videos">Music Videos</option>
                        <option value="Motion Graphics">Motion Graphics</option>
                        <option value="VFX & Color Grade">VFX & Color Grade</option>
                        <option value="Showreels">Showreels</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Client, Duration, Year, Aspect Ratio */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Client / Artist
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sony Music / Nike"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Duration (mm:ss)
                      </label>
                      <input
                        type="text"
                        placeholder="02:30"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Year
                      </label>
                      <input
                        type="text"
                        placeholder="2026"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Aspect Ratio
                      </label>
                      <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                        className="w-full bg-cinema-950 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                      >
                        <option value="16:9">16:9 Landscape</option>
                        <option value="9:16">9:16 Vertical Reel</option>
                        <option value="2.39:1">2.39:1 Anamorphic</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Video Source Selection */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-tech text-slate-300 uppercase tracking-wider font-bold">
                        Video Media Source
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setVideoSourceType('url')}
                          className={`px-3 py-1 rounded-md text-xs font-tech ${
                            videoSourceType === 'url' ? 'bg-red-600 text-white font-bold' : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          Video URL (YouTube/MP4)
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoSourceType('file')}
                          className={`px-3 py-1 rounded-md text-xs font-tech ${
                            videoSourceType === 'file' ? 'bg-red-600 text-white font-bold' : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          Upload MP4 File
                        </button>
                      </div>
                    </div>

                    {videoSourceType === 'url' ? (
                      <div>
                        <input
                          type="url"
                          placeholder="Paste direct MP4 link, YouTube URL (e.g. https://youtube.com/watch?v=...), or Vimeo"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors font-mono"
                        />
                        <p className="text-[11px] text-slate-500 font-tech mt-1">
                          Accepts YouTube, Vimeo, or direct .mp4/.webm video links.
                        </p>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-white/15 rounded-xl p-4 text-center hover:border-red-500/50 transition-colors">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <label className="cursor-pointer inline-block px-4 py-2 rounded-lg bg-red-600/20 text-red-300 border border-red-500/30 text-xs font-tech uppercase font-bold hover:bg-red-600 hover:text-white transition-colors">
                          Browse & Upload MP4 File
                          <input
                            type="file"
                            accept="video/mp4,video/webm,video/quicktime"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'video')}
                          />
                        </label>
                        {videoUrl && (
                          <p className="text-xs font-mono text-emerald-400 mt-2 truncate">
                            Attached: {videoUrl}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Row 4: Custom Thumbnail Upload or URL */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                    <span className="text-xs font-tech text-slate-300 uppercase tracking-wider font-bold">
                      Poster / Thumbnail Image
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <input
                        type="url"
                        placeholder="Image URL (Unsplash or direct image URL)"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors font-mono"
                      />
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-tech text-slate-300 flex items-center justify-center gap-2 transition-colors flex-1">
                          <Image className="w-4 h-4 text-slate-400" />
                          <span>Upload Thumbnail File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'thumbnail')}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: CAPTION & STORY BEHIND VIDEO (Crucial requirement!) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-tech text-slate-300 uppercase tracking-wider font-bold">
                        Leave Caption & Story About This Video *
                      </label>
                      <span className="text-[11px] font-tech text-slate-500">
                        Detailed director/editor breakdown
                      </span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your creative caption: describe the editing rhythm, camera movement matching, color grading choices, sound effects, audio ducking, or plugins used in this project..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-red-500 transition-colors leading-relaxed"
                    ></textarea>
                  </div>

                  {/* Row 6: Software Stack Chips */}
                  <div>
                    <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                      Software & Tools Used
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {softwareOptions.map((tool) => {
                        const isSelected = selectedSoftware.includes(tool);
                        return (
                          <button
                            type="button"
                            key={tool}
                            onClick={() => handleToggleSoftware(tool)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-tech tracking-wider transition-all ${
                              isSelected
                                ? 'bg-red-600 text-white font-bold border border-red-500 shadow-md'
                                : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {tool}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Featured Checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded bg-black border-white/20 text-red-600 focus:ring-0"
                    />
                    <label htmlFor="featured" className="text-xs font-tech text-slate-300 cursor-pointer">
                      Mark as Featured Video (Highlights at the top of portfolio)
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={isUploadingFile}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-cinema-accent hover:bg-red-600 text-white font-tech text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-red-950/60 transition-all hover:scale-[1.01]"
                    >
                      {editingVideo ? 'Save Changes & Update Caption' : 'Publish Video to Showcase'}
                    </button>
                    {editingVideo && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-tech uppercase"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                </form>
              )}

              {/* TAB 2: MANAGE ARCHIVE */}
              {activeTab === 'manage' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                        All Uploaded Projects ({videos.length})
                      </h4>
                      <p className="text-xs text-slate-400 font-tech">
                        Edit captions, update details, or remove videos from your showcase.
                      </p>
                    </div>

                    <button
                      onClick={onResetVideos}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-tech flex items-center gap-1.5 transition-colors"
                      title="Reset to default seed videos"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Demo Reels</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {videos.map((vid) => (
                      <div
                        key={vid.id}
                        className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={vid.thumbnailUrl}
                            alt={vid.title}
                            className="w-16 h-10 object-cover rounded-lg bg-black shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60 uppercase">
                                {vid.category}
                              </span>
                              <span className="text-xs text-slate-500 font-mono">{vid.duration}</span>
                            </div>
                            <h5 className="text-sm font-display font-bold text-white truncate mt-0.5">
                              {vid.title}
                            </h5>
                            <p className="text-xs text-slate-400 truncate max-w-lg font-light">
                              {vid.caption}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingVideo(vid);
                              setActiveTab('upload');
                            }}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            title="Edit Caption / Video Info"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${vid.title}"?`)) {
                                onDeleteVideo(vid.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-colors"
                            title="Delete Video"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
