import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, Check, Copy, Clock, Globe, Sparkles, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Commercial',
    budget: '$500 - $1,500',
    timeline: 'Within 1-2 Weeks',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('turag111@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+8801628103879');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true); // fall-through success for UX
    } finally {
      setIsSubmitting(false);
    }
  };

  const prefilledWhatsApp = encodeURIComponent(
    `Hi Turag, my name is ${formData.name || 'Client'}. I'm reaching out regarding a ${formData.projectType} project.\n\nBrief: ${formData.message || 'I would like to discuss video editing rates and timeline.'}\n\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}`
  );

  return (
    <section id="contact" className="py-24 bg-cinema-950 relative border-t border-white/5 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-red-600/10 blur-[180px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-600/5 blur-[180px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-red-500 font-tech text-xs tracking-[0.25em] uppercase mb-2">
            <span className="w-6 h-[2px] bg-red-500"></span>
            LET'S CREATE SOMETHING EXTRAORDINARY
            <span className="w-6 h-[2px] bg-red-500"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            GET IN TOUCH // <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              DIRECT WHATSAPP & EMAIL
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base font-light">
            Have a project in mind? Message directly on WhatsApp for immediate response, or send an email inquiry with your project brief.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-cinema-900 to-black border border-emerald-500/30 shadow-xl shadow-emerald-950/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-tech text-[10px] uppercase font-bold tracking-wider">
                  Fastest Response
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-white mb-1">
                WhatsApp & Direct Mobile
              </h3>
              <p className="text-xs text-slate-400 font-light mb-4">
                Available 7 days a week for immediate project consultation and file reviews.
              </p>

              {/* Number display */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-emerald-500/20 mb-4">
                <div className="font-mono text-base font-semibold text-emerald-400">
                  +8801628103879
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Copy Phone Number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp Launch Button */}
              <a
                href="https://wa.me/8801628103879?text=Hi%20Turag,%20I%20am%20reaching%20out%20from%20your%20portfolio%20website.%20I%20have%20a%20video%20project%20to%20discuss."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-tech text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open Chat on WhatsApp</span>
              </a>
            </div>

            {/* Email Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-cinema-900 via-cinema-900 to-black border border-white/10 shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 font-tech text-[10px] uppercase font-bold tracking-wider border border-white/10">
                  Direct Inbox
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-white mb-1">
                Official Email
              </h3>
              <p className="text-xs text-slate-400 font-light mb-4">
                Send creative briefs, scripts, Google Drive / Dropbox footage links, and RFPs.
              </p>

              {/* Email display */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-white/10 mb-4">
                <div className="font-mono text-sm sm:text-base font-semibold text-white truncate mr-2">
                  turag111@gmail.com
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email compose button */}
              <a
                href="mailto:turag111@gmail.com?subject=Video%20Editing%20Inquiry%20from%20Portfolio&body=Hi%20Turag,%0A%0AI%20am%20interested%20in%20hiring%20you%20for%20an%20edit.%20Here%20are%20my%20project%20details:"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-tech text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email to Turag</span>
              </a>
            </div>

            {/* Availability & Location Card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 font-tech text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Current Status: <strong className="text-emerald-400">Available For Bookings</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span>Location: Dhaka, Bangladesh • Global Remote Work</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Average Response Time: Under 2 Hours</span>
              </div>
            </div>

          </div>

          {/* Right Column: Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-cinema-900/80 border border-white/10 shadow-2xl backdrop-blur-xl">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Start a Project Brief
                  </h3>
                  <p className="text-xs text-slate-400 font-tech mt-1">
                    Fill out the form below to receive a personalized quote and timeline estimate.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white">
                    Inquiry Received!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
                    Thank you! Turag will review your brief and get back to you shortly at <span className="text-white font-mono">{formData.email}</span>.
                  </p>
                  
                  {/* Immediate WhatsApp Forward */}
                  <div className="pt-4">
                    <a
                      href={`https://wa.me/8801628103879?text=${prefilledWhatsApp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-tech text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/60"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send this Brief via WhatsApp for Instant Chat</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="block mx-auto text-xs font-tech text-slate-400 hover:text-white pt-3"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Your Name / Brand *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe / Apex Studios"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="client@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Project Category
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-cinema-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-red-500 transition-colors"
                      >
                        <option value="Commercial">Commercial / Brand Film</option>
                        <option value="Music Video">Music Video</option>
                        <option value="Motion Graphics">Motion Graphics & Titles</option>
                        <option value="Color Grading">DaVinci Resolve Color Grading</option>
                        <option value="VFX">VFX & Cleanups</option>
                        <option value="Short Form Reels">9:16 Social Reels & Shorts</option>
                        <option value="Full Post Production">Full Post-Production Package</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-cinema-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-red-500 transition-colors"
                      >
                        <option value="Under $500">Under $500</option>
                        <option value="$500 - $1,500">$500 - $1,500</option>
                        <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                        <option value="$3,000+">$3,000+ (High-End Production)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                      Project Details & Links *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your video, vision, footage length, reference videos, or any deadline constraints..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-red-500 transition-colors"
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-cinema-accent hover:bg-red-600 text-white font-tech text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-red-950/60 transition-all hover:scale-[1.01]"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                    </button>

                    <a
                      href={`https://wa.me/8801628103879?text=${prefilledWhatsApp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-tech text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
