import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Directories
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = path.join(__dirname, 'data');
const VIDEOS_FILE = path.join(DATA_DIR, 'videos.json');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Serve static uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB limit
});

// Seed data
const defaultVideos = [
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
    views: "1.4M",
    dateAdded: "2026-03-10"
  },
  {
    id: "vid-2",
    title: "MIDNIGHT DRIFT // VINTAGE RETRO MUSIC VIDEO",
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
    views: "890K",
    dateAdded: "2026-02-18"
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
    views: "2.1M",
    dateAdded: "2025-11-20"
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
    views: "640K",
    dateAdded: "2025-09-14"
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
    views: "3.5M",
    dateAdded: "2026-01-25"
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
    views: "420K",
    dateAdded: "2025-08-05"
  }
];

function getVideos() {
  if (!fs.existsSync(VIDEOS_FILE)) {
    fs.writeFileSync(VIDEOS_FILE, JSON.stringify(defaultVideos, null, 2));
    return defaultVideos;
  }
  try {
    const raw = fs.readFileSync(VIDEOS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading videos file, resetting to default", e);
    fs.writeFileSync(VIDEOS_FILE, JSON.stringify(defaultVideos, null, 2));
    return defaultVideos;
  }
}

function saveVideos(videos) {
  fs.writeFileSync(VIDEOS_FILE, JSON.stringify(videos, null, 2));
}

// Ensure default videos are initialized
getVideos();

// --- API Endpoints ---

// 1. Get all videos
app.get('/api/videos', (req, res) => {
  const videos = getVideos();
  res.json({ success: true, count: videos.length, data: videos });
});

// 2. Add new video
app.post('/api/videos', (req, res) => {
  try {
    const {
      title,
      category,
      client,
      duration,
      videoUrl,
      thumbnailUrl,
      caption,
      software,
      featured,
      aspectRatio,
      year
    } = req.body;

    if (!title || !caption) {
      return res.status(400).json({ success: false, message: "Title and Caption are required" });
    }

    const videos = getVideos();
    const newVideo = {
      id: "vid-" + Date.now(),
      title: title.trim(),
      category: category || "Commercials",
      client: client || "Independent",
      duration: duration || "01:00",
      year: year || new Date().getFullYear().toString(),
      aspectRatio: aspectRatio || "16:9",
      featured: Boolean(featured),
      videoUrl: videoUrl || "",
      thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
      caption: caption.trim(),
      software: Array.isArray(software) ? software : ["Premiere Pro"],
      views: "1.2K",
      dateAdded: new Date().toISOString().split('T')[0]
    };

    videos.unshift(newVideo);
    saveVideos(videos);

    res.status(201).json({ success: true, message: "Video created successfully", data: newVideo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Update existing video
app.put('/api/videos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const videos = getVideos();
    const index = videos.findIndex(v => v.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    const current = videos[index];
    videos[index] = {
      ...current,
      ...req.body,
      id: current.id // keep ID intact
    };

    saveVideos(videos);
    res.json({ success: true, message: "Video updated successfully", data: videos[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Delete video
app.delete('/api/videos/:id', (req, res) => {
  try {
    const { id } = req.params;
    let videos = getVideos();
    const filtered = videos.filter(v => v.id !== id);

    if (filtered.length === videos.length) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    saveVideos(filtered);
    res.json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Reset to default demo portfolio
app.post('/api/videos/reset', (req, res) => {
  saveVideos(defaultVideos);
  res.json({ success: true, message: "Reset to default showcase videos", data: defaultVideos });
});

// 6. Direct File Upload (Video or Thumbnail Image)
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file provided" });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    filename: req.file.filename,
    url: fileUrl,
    mimetype: req.file.mimetype,
    size: req.file.size
  });
});

// 7. Admin Authentication
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  // Default master passkey: "turag2026" or "editor"
  if (password === 'turag2026' || password === 'admin' || password === 'turag') {
    return res.json({ success: true, token: 'admin-session-' + Date.now() });
  }
  res.status(401).json({ success: false, message: "Invalid admin password" });
});

// 8. Contact Form submission endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, projectType, budget, message } = req.body;
  console.log('Project inquiry received:', { name, email, projectType, budget, message });
  res.json({
    success: true,
    message: "Thank you! Turag will respond within 24 hours.",
    receivedAt: new Date().toISOString()
  });
});

// Production: Serve frontend if dist exists
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🎬 Cinematic Video Editor Portfolio Backend running on http://localhost:${PORT}`);
});
