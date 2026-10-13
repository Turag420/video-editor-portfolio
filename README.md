# 🎬 TURAG // Cinematic Video Editor & Motion Designer Portfolio

A cinematic, motion-graphics-styled portfolio website engineered for professional video editors, motion graphic artists, and colorists.

---

## 🌟 Key Features

### 1. 🎥 Cinematic & Motion Graphic Visual Aesthetic
- **OLED Cinema Theme**: Deep dark backgrounds with subtle 35mm film grain texture, neon cyber/amber accents, and anamorphic lighting glows.
- **Hero Showcase**: Fullscreen cinematic video loop with live blinking `REC [00:24:18:09]` indicator, dynamic typography, and statistics counter (50+ Projects, 10M+ Views, 4K HDR ACES Color).
- **Interactive Showreel Marquee**: Running editing suite tape highlighting Premiere Pro, DaVinci Resolve Studio, After Effects, and sound design foley.

### 2. 🎞️ Curated Video Gallery & Theater Lightbox
- **Categorized Archive**: Filter by *Commercials*, *Music Videos*, *Motion Graphics*, *VFX & Color Grade*, and *Showreels*.
- **Live Hover Preview**: Hovering on any card automatically previews the video snippet.
- **4K Cinema Theater Lightbox**: Fullscreen theater player supporting uploaded direct video files, YouTube, and Vimeo embeds.
- **Story & Caption Viewer**: In-depth breakdown left by the editor detailing the rhythm sync, color science, sound design, and challenges overcome.

### 3. 🎨 Interactive Before/After Color Grading Lab
- Draggable split-slider comparing un-graded flat **RAW LOG (ARRI/Sony S-Log3)** footage against the **Final Graded 4K Cinema Film (Kodak 2383 LUT / ACES)**.

### 4. 🔒 Built-in Admin Studio (Upload Videos & Leave Captions)
- **Passkey-Protected**: Default master passkey: `turag2026` (also accepts `admin`).
- **Direct Video File Uploads**: Upload `.mp4`, `.mov`, `.webm` directly to the server via Multer or link YouTube/Vimeo URLs.
- **Custom Poster / Thumbnail**: Upload high-resolution cover photos.
- **Captions & Notes**: Rich textarea dedicated for the editor to leave captions and director's notes for each project.
- **Software Badges & Aspect Ratio**: Tag tools like Premiere Pro, After Effects, DaVinci Resolve, Blender, and choose aspect ratios (16:9, 9:16 vertical reels, 2.39:1 anamorphic).
- **CRUD Video Manager**: Edit existing captions, change titles, or delete old videos at any time.
- **Persistence**: All edits and uploaded files persist in `data/videos.json` and `uploads/`.

### 5. 📬 Direct Contact & Instant Hire Integration
- **WhatsApp Direct**: One-click chat to **+8801628103879** (`https://wa.me/8801628103879`) with pre-filled project brief message.
- **Email Contact**: Direct link to **turag111@gmail.com** (`mailto:turag111@gmail.com`) with instant clipboard copy.
- **Interactive Project Brief Form**: Clients can select their project category, budget range, and timeline to request quotes.

---

## 🚀 How to Run

### Development Mode (with Live Hot Reloading)
```powershell
cd "C:\Users\Administrator\.gemini\antigravity\scratch\video-editor-portfolio"
npm run dev
```
- Frontend runs at: `http://localhost:5173`
- Backend API runs at: `http://localhost:5000`

### Production Server
```powershell
cd "C:\Users\Administrator\.gemini\antigravity\scratch\video-editor-portfolio"
npm start
```
- Unified app live at: `http://localhost:5000`

---

## 🔑 Admin Credentials
- **Default Master Passkey**: `turag2026`
- Click the **"Admin"** lock button in the top navigation bar to unlock the studio.
