import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoGallery from './components/VideoGallery';
import VideoModal from './components/VideoModal';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ServicesSection from './components/ServicesSection';
import SoftwareStack from './components/SoftwareStack';
import ContactSection from './components/ContactSection';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import { MessageCircle, Film } from 'lucide-react';

// Default backup videos in case backend is initialising
const initialBackupVideos = [
  {
    id: "vid-1",
    title: "NEON PROTOCOL // CYBERPUNK TEASER",
    category: "Motion Graphics",
    client: "Aetheria Studios",
    duration: "01:45",
    year: "2026",
    aspectRatio: "16:9",
    featured: true,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    caption: "Full post-production suite: High-impact rhythmic pacing, custom holographic HUD typography in After Effects, 3D particle composites, and anamorphic neon color grading in DaVinci Resolve.",
    software: ["After Effects", "DaVinci Resolve", "Blender", "Premiere Pro"],
    views: "1.4M"
  },
  {
    id: "vid-2",
    title: "MIDNIGHT DRIFT // RETRO CINEMATIC MUSIC VIDEO",
    category: "Music Videos",
    client: "Sony Indie Records",
    duration: "03:22",
    year: "2026",
    aspectRatio: "16:9",
    featured: true,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-the-streets-of-a-night-city-43183-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
    caption: "Fast-cut rhythm-sync editing locked down to the millisecond of the kick drum. Authentic 35mm film halation, analog gate weave, lens distortion, and moody twilight palette.",
    software: ["Premiere Pro", "DaVinci Resolve", "FilmConvert"],
    views: "890K"
  },
  {
    id: "vid-3",
    title: "APEX // HIGH-OCTANE HYPERCAR COMMERCIAL",
    category: "Commercials",
    client: "Apex Motors Global",
    duration: "01:05",
    year: "2025",
    aspectRatio: "16:9",
    featured: true,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-curved-road-at-sunset-41727-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    caption: "Commercial launch film engineered for television broadcast and social release. Dynamic speed ramps, motion blur smoothing, 3D camera tracking, and deep contrast sunset color science.",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    views: "2.1M"
  },
  {
    id: "vid-4",
    title: "VOID RUNNER // 3D VFX & TITLE SEQUENCE",
    category: "VFX & Color Grade",
    client: "Hyperion Sci-Fi Films",
    duration: "02:15",
    year: "2025",
    aspectRatio: "2.39:1",
    featured: true,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-neon-lights-42999-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    caption: "Main opening title sequence integrating CGI spacecraft passes with live-action plates. Multi-layer compositing, rotoscoping, depth-of-field rack focus simulation, and ACES color management.",
    software: ["After Effects", "Blender", "DaVinci Resolve", "Mocha Pro"],
    views: "640K"
  },
  {
    id: "vid-5",
    title: "VELOCITY // KINETIC URBAN STREETWEAR REEL",
    category: "Showreels",
    client: "Vogue Streetwear",
    duration: "00:45",
    year: "2026",
    aspectRatio: "9:16",
    featured: false,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-in-the-city-at-night-42861-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    caption: "Vertical 9:16 mobile-first campaign. Seamless whip transitions, mask wipes, match cuts on subject motion, kinetic typography, and vibrant pop color palette.",
    software: ["Premiere Pro", "After Effects", "Topaz Video AI"],
    views: "3.5M"
  },
  {
    id: "vid-6",
    title: "CHRONOS // LUXURY BRAND MANIFESTO",
    category: "Commercials",
    client: "Timepiece Heritage",
    duration: "01:30",
    year: "2025",
    aspectRatio: "16:9",
    featured: false,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-watchmaker-repairing-a-watch-42880-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    caption: "Poetic storytelling cut driven by the cadence of a voiceover narrator. Macro mechanism sound design, subtle optical light leaks, and analog monochrome-to-color transition.",
    software: ["DaVinci Resolve", "Premiere Pro", "iZotope RX"],
    views: "420K"
  }
];

export default function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [isFilmGrain, setIsFilmGrain] = useState(true);

  // Load videos on mount from API or LocalStorage
  const loadVideos = async () => {
    try {
      const res = await fetch('/api/videos');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setVideos(json.data);
          localStorage.setItem('turag_portfolio_videos', JSON.stringify(json.data));
          return;
        }
      }
    } catch {
      console.log('Using local store fallback for videos');
    }

    // Fallback to local storage or defaults
    const local = localStorage.getItem('turag_portfolio_videos');
    if (local) {
      try {
        setVideos(JSON.parse(local));
        return;
      } catch (e) {
        console.error(e);
      }
    }
    setVideos(initialBackupVideos);
    localStorage.setItem('turag_portfolio_videos', JSON.stringify(initialBackupVideos));
  };

  useEffect(() => {
    loadVideos();
    const savedAdmin = sessionStorage.getItem('turag_admin_logged_in');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = (status) => {
    setIsAdmin(status);
    if (status) {
      sessionStorage.setItem('turag_admin_logged_in', 'true');
    } else {
      sessionStorage.removeItem('turag_admin_logged_in');
    }
  };

  // Add Video
  const handleAddVideo = async (newVideoData) => {
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVideoData)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setVideos(prev => [data.data, ...prev]);
        localStorage.setItem('turag_portfolio_videos', JSON.stringify([data.data, ...videos]));
        return;
      }
    } catch (err) {
      console.error(err);
    }

    // Client-side fallback
    const fallbackVideo = {
      ...newVideoData,
      id: "vid-" + Date.now(),
      views: "1.2K"
    };
    const updated = [fallbackVideo, ...videos];
    setVideos(updated);
    localStorage.setItem('turag_portfolio_videos', JSON.stringify(updated));
  };

  // Update Video
  const handleUpdateVideo = async (id, updatedData) => {
    try {
      await fetch(`/api/videos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
    } catch (err) {
      console.error(err);
    }

    const updated = videos.map(v => v.id === id ? { ...v, ...updatedData } : v);
    setVideos(updated);
    localStorage.setItem('turag_portfolio_videos', JSON.stringify(updated));
  };

  // Delete Video
  const handleDeleteVideo = async (id) => {
    try {
      await fetch(`/api/videos/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }

    const filtered = videos.filter(v => v.id !== id);
    setVideos(filtered);
    localStorage.setItem('turag_portfolio_videos', JSON.stringify(filtered));
  };

  // Reset to Demo Showcase
  const handleResetVideos = async () => {
    try {
      const res = await fetch('/api/videos/reset', { method: 'POST' });
      const json = await res.json();
      if (json.success && json.data) {
        setVideos(json.data);
        localStorage.setItem('turag_portfolio_videos', JSON.stringify(json.data));
        return;
      }
    } catch (err) {
      console.error(err);
    }
    setVideos(initialBackupVideos);
    localStorage.setItem('turag_portfolio_videos', JSON.stringify(initialBackupVideos));
  };

  return (
    <div className={`min-h-screen bg-cinema-950 text-slate-100 ${isFilmGrain ? 'bg-film-grain' : ''}`}>
      
      {/* Navigation */}
      <Navbar
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onLogoutAdmin={() => handleAdminLogin(false)}
        isFilmGrain={isFilmGrain}
        setIsFilmGrain={setIsFilmGrain}
      />

      <main>
        {/* Cinematic Hero */}
        <Hero
          onWatchShowreel={() => {
            if (videos.length > 0) setSelectedVideo(videos[0]);
          }}
        />

        {/* Video Works Gallery & Caption Showcase */}
        <VideoGallery
          videos={videos}
          onSelectVideo={(video) => setSelectedVideo(video)}
          isAdmin={isAdmin}
          onOpenAdminUpload={() => {
            setEditingVideo(null);
            setIsAdminModalOpen(true);
          }}
          onEditVideo={(video) => {
            setEditingVideo(video);
            setIsAdminModalOpen(true);
          }}
          onDeleteVideo={handleDeleteVideo}
        />

        {/* Before / After Color Grading Breakdown */}
        <BeforeAfterSlider />

        {/* Post-Production Services */}
        <ServicesSection />

        {/* Software & Hardware Arsenal */}
        <SoftwareStack />

        {/* Contact Turag (WhatsApp & Email) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Theater Mode Lightbox Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onPrev={() => {
            const idx = videos.findIndex(v => v.id === selectedVideo.id);
            if (idx > 0) setSelectedVideo(videos[idx - 1]);
            else setSelectedVideo(videos[videos.length - 1]);
          }}
          onNext={() => {
            const idx = videos.findIndex(v => v.id === selectedVideo.id);
            if (idx < videos.length - 1) setSelectedVideo(videos[idx + 1]);
            else setSelectedVideo(videos[0]);
          }}
        />
      )}

      {/* Admin Studio Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setEditingVideo(null);
        }}
        isAdmin={isAdmin}
        setIsAdmin={handleAdminLogin}
        videos={videos}
        onAddVideo={handleAddVideo}
        onUpdateVideo={handleUpdateVideo}
        onDeleteVideo={handleDeleteVideo}
        onResetVideos={handleResetVideos}
        editingVideo={editingVideo}
        setEditingVideo={setEditingVideo}
      />

      {/* Floating Quick WhatsApp Action Button */}
      <aside aria-label="Quick Contact Actions" className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <a
          href="https://wa.me/8801628103879?text=Hi%20Turag,%20I%20am%20interested%20in%20your%20video%20editing%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-tech text-xs font-bold uppercase tracking-wider shadow-2xl shadow-emerald-950/80 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
          title="Direct WhatsApp: +8801628103879"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          </div>
          <span className="hidden sm:inline">WhatsApp Turag</span>
        </a>
      </aside>

    </div>
  );
}
