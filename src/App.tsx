/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ArrowRight, 
  MessageCircle, 
  Users, 
  Info, 
  Globe, 
  Mail, 
  Phone,
  Sparkles,
  ChevronRight,
  Download,
  BarChart3,
  Cloud,
  Lock,
  RefreshCcw,
  FileText,
  UserCheck,
  Monitor,
  Smartphone,
  Activity
} from 'lucide-react';

// --- Types & Constants ---

interface ParticipantResponse {
  id: string;
  before: number;
  after: number;
  word: string;
  timestamp: number;
}

const POSITIVE_WORDS = ['joy', 'connected', 'open', 'calm', 'inspired', 'hopeful', 'clear', 'grounded', 'present', 'peaceful', 'light'];
const CHALLENGING_WORDS = ['stressed', 'uncertain', 'overwhelmed', 'tired', 'distracted', 'anxious', 'stuck', 'heavy'];

const INITIAL_MOCK_WORDS = [
  'Connected', 'Grounded', 'Calm', 'Inspired', 'Open', 
  'Ready', 'Present', 'Shifted', 'Hopeful', 'Safe',
  'Aware', 'Thinking', 'Neutral', 'Processing', 'Listening',
  'Uncertain', 'Overwhelmed', 'Tired', 'Stressed'
];

export default function App() {
  // --- View Control ---
  const [viewMode, setViewMode] = useState<'audience' | 'stage'>('audience');

  // --- Individual State ---
  const [beforeValue, setBeforeValue] = useState<number>(5);
  const [afterValue, setAfterValue] = useState<number>(5);
  const [reflectionWord, setReflectionWord] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // --- Collective State (Simulated Shared State) ---
  const [roomResponses, setRoomResponses] = useState<ParticipantResponse[]>([]);

  // --- Simulation Engine ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Only simulate if someone has already started the conversation
      if (roomResponses.length === 0) return;

      const newResponse: ParticipantResponse = {
        id: `sim-${Date.now()}`,
        before: Math.floor(Math.random() * 6),
        after: Math.floor(Math.random() * 5) + 5,
        word: INITIAL_MOCK_WORDS[Math.floor(Math.random() * INITIAL_MOCK_WORDS.length)],
        timestamp: Date.now()
      };
      setRoomResponses(prev => [newResponse, ...prev.slice(0, 199)]);
    }, 6000); 

    return () => clearInterval(interval);
  }, [roomResponses.length]);

  // --- Derived Metrics ---
  const collectiveMetrics = useMemo(() => {
    const count = roomResponses.length;
    if (count === 0) return { avgBefore: 0, avgAfter: 0, shift: 0, wordCounts: {} as Record<string, number> };

    const sumBefore = roomResponses.reduce((acc, r) => acc + r.before, 0);
    const sumAfter = roomResponses.reduce((acc, r) => acc + r.after, 0);
    const avgBefore = parseFloat((sumBefore / count).toFixed(1));
    const avgAfter = parseFloat((sumAfter / count).toFixed(1));
    const shiftPercent = parseFloat(((avgAfter - avgBefore) / 10 * 100).toFixed(1));

    const wordCounts: Record<string, number> = {};
    roomResponses.forEach(r => {
      const w = r.word.toLowerCase();
      wordCounts[w] = (wordCounts[w] || 0) + 1;
    });

    return { avgBefore, avgAfter, shift: shiftPercent, wordCounts };
  }, [roomResponses]);

  const sortedWords = useMemo(() => {
    return (Object.entries(collectiveMetrics.wordCounts) as [string, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  }, [collectiveMetrics.wordCounts]);

  const engagementPulse = useMemo(() => {
    return Math.min(Math.round((roomResponses.length / 200) * 100), 100);
  }, [roomResponses]);

  // --- Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionWord) return;
    const myResponse: ParticipantResponse = {
      id: 'me',
      before: beforeValue,
      after: afterValue,
      word: reflectionWord,
      timestamp: Date.now()
    };
    setRoomResponses(prev => [myResponse, ...prev]);
    setHasSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExport = () => {
    setIsExporting(true);
    
    // Data Preparation
    const topWords = sortedWords.slice(0, 15).map(([w]) => w.charAt(0).toUpperCase() + w.slice(1)).join(', ');
    const samples = roomResponses.filter(r => r.word).slice(0, 5).map(r => r.word.toLowerCase());
    
    const reportHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Session Report - The Connection Meter</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
            color: #1e293b; 
            line-height: 1.6; 
            padding: 60px 40px; 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
          }
          .logo { 
            max-width: 200px; 
            display: block; 
            margin: 0 auto 30px; 
          }
          header { 
            text-align: center; 
            margin-bottom: 50px; 
            border-bottom: 2px solid #f1f5f9; 
            padding-bottom: 40px; 
          }
          .branding-name { 
            text-transform: uppercase; 
            letter-spacing: 0.5em; 
            font-size: 11px; 
            font-weight: 900; 
            color: #10b981; 
            margin-bottom: 12px; 
          }
          .branding-title { 
            font-style: italic; 
            font-weight: 900; 
            font-size: 32px; 
            margin: 0; 
            color: #0f172a;
            letter-spacing: -0.02em;
          }
          .branding-subtitle { 
            text-transform: uppercase; 
            letter-spacing: 0.4em; 
            font-size: 10px; 
            color: #64748b; 
            font-weight: 600; 
            margin-top: 12px; 
          }
          .metrics-grid { 
            display: grid; 
            grid-template-cols: 1fr 1fr; 
            gap: 24px; 
            margin-bottom: 40px; 
          }
          .metric-card { 
            background: #f8fafc; 
            padding: 30px; 
            border-radius: 24px; 
            text-align: center; 
            border: 1px solid #f1f5f9;
          }
          .metric-value { 
            font-size: 42px; 
            font-weight: 900; 
            display: block; 
            color: #0f172a;
            line-height: 1;
            margin-bottom: 8px;
          }
          .metric-label { 
            font-size: 10px; 
            text-transform: uppercase; 
            font-weight: 900; 
            color: #94a3b8; 
            letter-spacing: 0.2em; 
          }
          .shift-highlight { 
            grid-column: span 2; 
            background: #f0fdf4; 
            border: 1px solid #dcfce7; 
          }
          .shift-value { 
            color: #059669; 
          }
          .insight-line { 
            font-style: italic; 
            color: #64748b; 
            text-align: center; 
            margin-bottom: 60px; 
            font-size: 15px;
            font-weight: 500;
          }
          section {
            margin-bottom: 50px;
          }
          h3 { 
            font-size: 11px; 
            text-transform: uppercase; 
            letter-spacing: 0.25em; 
            color: #94a3b8; 
            border-bottom: 1px solid #f1f5f9; 
            padding-bottom: 12px; 
            margin-bottom: 24px; 
            font-weight: 900;
          }
          .word-list { 
            font-size: 18px; 
            font-style: italic; 
            color: #334155; 
            line-height: 1.8;
          }
          .reflection-item { 
            padding: 20px; 
            border-bottom: 1px solid #f8fafc; 
            font-style: italic; 
            font-family: Georgia, serif; 
            font-size: 20px; 
            color: #334155; 
          }
          .reflection-item:last-child {
            border-bottom: none;
          }
          .statement { 
            background: #f8fafc; 
            padding: 40px; 
            border-radius: 32px; 
            text-align: center; 
            margin-bottom: 60px; 
            border: 1px dashed #e2e8f0;
          }
          .statement-text { 
            font-size: 18px; 
            font-weight: 700; 
            color: #0f172a; 
            font-style: italic; 
            margin: 0;
            line-height: 1.5;
          }
          .statement-author {
            font-size: 13px; 
            color: #94a3b8; 
            margin-top: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          footer { 
            text-align: center; 
            border-top: 2px solid #f1f5f9; 
            padding-top: 40px; 
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          .contact-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
          }
          footer a { 
            color: #64748b; 
            text-decoration: none; 
            font-size: 12px; 
            font-weight: 700; 
            text-transform: uppercase; 
            letter-spacing: 0.1em; 
            transition: color 0.2s; 
          }
          footer a:hover { 
            color: #10b981; 
          }
          .footer-brand {
            font-weight: 900;
            font-size: 13px;
            color: #1e293b;
          }
          @media print {
            body { padding: 0; font-size: 12pt; }
            .no-print { display: none; }
            .metric-card { break-inside: avoid; }
            section { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <img src="logo.png" alt="Knoxville Happiness Coalition" class="logo" onerror="this.style.display='none'">
        
        <header>
          <div class="branding-name">Alexia Georghiou</div>
          <h1 class="branding-title">THE CONNECTION METER</h1>
          <div class="branding-subtitle">THE HAPPINESS HABITS METHOD</div>
        </header>

        <div class="metrics-grid">
          <div class="metric-card shift-highlight">
            <span class="metric-value shift-value">+${collectiveMetrics.shift}%</span>
            <span class="metric-label">Total Connection Shift</span>
          </div>
          <div class="metric-card">
            <span class="metric-value">${collectiveMetrics.avgBefore}</span>
            <span class="metric-label">Average Before Score</span>
          </div>
          <div class="metric-card">
            <span class="metric-value">${collectiveMetrics.avgAfter}</span>
            <span class="metric-label">Average After Score</span>
          </div>
        </div>

        <p class="insight-line">“This report reflects the collective shift in perceived connection during a shared experience.”</p>

        <section>
          <h3>Collective Word Cloud Summary</h3>
          <div class="word-list">
            ${topWords || 'No shared words captured yet.'}
          </div>
        </section>

        <section>
          <h3>What Participants Experienced</h3>
          <div class="reflections">
            ${samples.length > 0 
              ? samples.map(s => `<div class="reflection-item">“Feeling ${s}...”</div>`).join('') 
              : '<p style="color: #94a3b8; font-style: italic;">No reflections captured yet during this session.</p>'}
          </div>
        </section>

        <div class="statement">
          <p class="statement-text">“Happiness Habits practiced together foster unity, connection, and community. We can experience happiness even in uncertainty when we create connection.”</p>
          <div class="statement-author">~ Alexia Georghiou</div>
        </div>

        <footer>
          <div class="contact-links">
            <a href="https://www.knoxvillehappinesscoalition.com" target="_blank">www.knoxvillehappinesscoalition.com</a>
            <a href="tel:18652833605">865-283-3605</a>
            <a href="mailto:alexia@knoxvillehappinesscoalition.com">alexia@knoxvillehappinesscoalition.com</a>
          </div>
          <div class="footer-brand">KNOXVILLE HAPPINESS COALITION</div>
        </footer>

        <script>
          window.onload = () => {
            setTimeout(() => {
              window.print();
            }, 800);
          };
        </script>
      </body>
      </html>
    `;

    const reportWindow = window.open('', '_blank');
    if (reportWindow) {
      reportWindow.document.write(reportHtml);
      reportWindow.document.close();
    }
    
    setIsExporting(false);
  };

  // --- Sub-components ---

  const BrandHeader = ({ dark = false, centered = false }: { dark?: boolean, centered?: boolean }) => (
    <div className={`flex flex-col ${centered ? 'items-center text-center' : ''} ${dark ? 'text-white' : 'text-slate-900'}`}>
      <span className={`text-[10px] font-black uppercase tracking-[0.5em] mb-2 ${dark ? 'text-emerald-400' : 'text-emerald-600'}`}>
        Alexia Georghiou
      </span>
      <h1 className={`text-2xl md:text-3xl lg:text-4xl font-black italic tracking-tighter leading-none ${dark ? 'text-white' : 'text-slate-900'}`}>
        THE CONNECTION METER
      </h1>
      <span className={`text-[9px] uppercase tracking-[0.4em] font-medium mt-2 truncate ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
        THE HAPPINESS HABITS METHOD
      </span>
    </div>
  );

  const ModeToggle = ({ inline = false }: { inline?: boolean }) => (
    <button 
      onClick={() => setViewMode(viewMode === 'audience' ? 'stage' : 'audience')}
      className={`${inline ? 'relative' : 'fixed top-6 left-6 z-[100]'} px-6 py-4 rounded-full flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 ${
        viewMode === 'audience' 
        ? 'bg-slate-900 text-white hover:bg-slate-800' 
        : 'bg-white text-slate-900 hover:bg-slate-100'
      }`}
    >
      {viewMode === 'audience' ? (
        <><Smartphone size={14} /> Happiness Habits Frame Generator</>
      ) : (
        <><Users size={14} /> Back to Audience View</>
      )}
    </button>
  );

  const WordCloudView = ({ dark = false, limit = 15 }: { dark?: boolean, limit?: number }) => {
    if (roomResponses.length === 0) return (
      <div className="text-slate-500 font-serif italic text-sm opacity-20">Waiting for connections...</div>
    );

    return (
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
        {sortedWords.slice(0, limit).map(([word, count], i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.03 }}
            style={{ 
              fontSize: `${Math.min(Math.max(count * (dark ? 10 : 8) + (dark ? 20 : 14), 14), dark ? 60 : 48)}px` 
            }}
            className={`font-serif italic tracking-tight leading-none whitespace-nowrap transition-all duration-1000 ${
              dark 
              ? (POSITIVE_WORDS.includes(word) ? 'text-emerald-400 font-medium' : 'text-slate-500')
              : (POSITIVE_WORDS.includes(word) ? 'text-emerald-600' : 'text-slate-600')
            }`}
          >
            {word.charAt(0).toUpperCase() + word.slice(1)}
          </motion.span>
        ))}
      </div>
    );
  };

  // --- MAIN RENDER ---

  if (viewMode === 'stage') {
    return (
      <div className="h-screen w-screen bg-black text-white overflow-hidden flex flex-col font-sans relative">
         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300">
            <ModeToggle inline />
         </div>
        
        {/* Minimal Stage Header */}
        <header className="px-12 py-10 flex justify-center items-center shrink-0 relative z-10 w-full">
           <BrandHeader dark centered />
        </header>

        {/* Dominant Centerpiece Meter */}
        <main className="flex-1 flex flex-col items-center justify-center p-12 relative z-10 transition-all duration-1000">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-emerald-500/5 rounded-full blur-[15vw] pointer-events-none" />
           
           <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="max-w-4xl mx-auto px-6 mb-4"
              >
                 <p className="text-[4vw] md:text-[3vw] font-bold leading-tight text-white drop-shadow-lg tracking-tight">
                    Now that you’ve experienced the neuroscience of belonging, spread the word with your networks for a better and happier world.
                 </p>
              </motion.div>

              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8, duration: 1 }}
                 className="mt-12"
              >
                 <a 
                    href="https://knoxvillehappinesscoalition.github.io/happiness/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-full shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:bg-emerald-400 hover:scale-105 transition-all flex items-center gap-3"
                 >
                    <Download size={14} />
                    Open Frame Generator
                 </a>
              </motion.div>
           </div>
        </main>

        <footer className="h-24 flex items-center justify-center shrink-0 relative z-10 bg-black">
           <p className="text-[1.2vw] font-black uppercase tracking-[0.6em] text-slate-400 px-12 text-center">
              Collective Experience Live Data
           </p>
        </footer>
      </div>
    );
  }

  // --- AUDIENCE VIEW ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col pb-24">
      <header className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 gap-4">
         {/* INFO MODAL */}
        <AnimatePresence>
          {isInfoModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
              onClick={() => setIsInfoModalOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white max-w-xl w-full max-h-[80vh] overflow-y-auto rounded-3xl p-10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">The Connection Factor</h2>
                    <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-lg font-bold text-slate-800 leading-snug">
                      Connection is a key driver of human happiness and wellbeing.
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Long-term research shows that strong relationships are one of the most important factors linked to happiness, health, and resilience across life.
                    </p>
                    <p className="text-sm text-emerald-700 font-bold leading-relaxed bg-emerald-50 p-4 rounded-xl border border-emerald-100 italic">
                      “Happiness Habits practiced together foster unity, connection, and community. We can experience happiness even in uncertainty when we create connection.” ~Alexia Georghiou
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Key Insights:</h3>
                    <ul className="space-y-4">
                      {[
                        { icon: '🌱', text: 'Connection strongly supports long-term wellbeing' },
                        { icon: '❤️', text: 'Isolation is linked to lower happiness and health' },
                        { icon: '🤝', text: 'Supportive relationships build resilience' },
                        { icon: '🏆', text: 'Relationships matter more than status or wealth' }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="text-xl shrink-0">{item.icon}</span>
                          <span className="text-sm text-slate-700 font-medium">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong className="text-slate-900 block mb-1">What this means:</strong> 
                      Small daily moments of connection improve how people feel and how teams work together.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Research Reference</h3>
                    <div className="space-y-2">
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Waldinger, R. J., & Schulz, M. S. (2023). <em>The Good Life: Lessons from the world’s longest scientific study of happiness.</em> Simon & Schuster.
                      </p>
                      <p className="text-[11px] text-slate-500 leading-relaxed italic opacity-80">
                        Harvard Study of Adult Development. (1938–present). Harvard Medical School.
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsInfoModalOpen(false)}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-colors shadow-lg"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col md:flex-row justify-between items-center gap-4">
           <BrandHeader />
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsInfoModalOpen(true)}
                className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all border border-slate-100 shadow-sm"
                title="The Connection Factor Info"
              >
                 <Info size={20} />
              </button>
              <span className="text-[10px] uppercase font-black text-emerald-600 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                 <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                 Live Session
              </span>
           </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-12 flex flex-col space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input or Success */}
          <div className="md:col-span-12 lg:col-span-7 space-y-8">
            {!hasSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-12">
                <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Connection Capture</h3>
                   <Lock size={14} className="text-slate-200" />
                </div>

                <div className="space-y-14">
                  {/* LIVE SHIFT INDICATOR */}
                  <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Connection Shift</span>
                      <p className="text-xs text-white/60">Live impact calculation</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-4xl font-black tabular-nums">
                        {afterValue - beforeValue >= 0 ? `+${afterValue - beforeValue}` : afterValue - beforeValue}
                      </span>
                      <span className="text-[10px] font-bold text-white/40">
                        {((afterValue - beforeValue) / 10 * 100).toFixed(0)}% Shift
                      </span>
                    </div>
                  </div>

                  {/* Before Slider */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <label className="text-sm font-bold text-slate-700 leading-tight">
                        1. Before this experience, my level of connection in this room was:
                      </label>
                      <span className="text-3xl font-black text-slate-300 tabular-nums w-12 text-right">{beforeValue}</span>
                    </div>
                    <div className="px-2">
                       <input 
                        type="range" min="0" max="10" step="1"
                        value={beforeValue}
                        onChange={(e) => setBeforeValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-400 hover:accent-slate-500 transition-all"
                      />
                      <div className="flex justify-between text-[9px] uppercase tracking-tighter text-slate-300 font-black mt-3">
                         <span>Low (0)</span>
                         <span>Neutral (5)</span>
                         <span>High (10)</span>
                      </div>
                    </div>
                  </div>

                  {/* After Slider */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <label className="text-sm font-bold text-slate-700 leading-tight">
                        2. After this experience, my level of connection is:
                      </label>
                      <span className="text-3xl font-black text-emerald-500 tabular-nums w-12 text-right">{afterValue}</span>
                    </div>
                    <div className="px-2">
                      <input 
                        type="range" min="0" max="10" step="1"
                        value={afterValue}
                        onChange={(e) => setAfterValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-600 transition-all"
                      />
                      <div className="flex justify-between text-[9px] uppercase tracking-tighter text-slate-400 font-black mt-3">
                         <span>Low (0)</span>
                         <span>Neutral (5)</span>
                         <span>High (10)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-sm font-bold text-slate-700 leading-tight block">
                      3. One word that describes how I feel now:
                    </label>
                    <input 
                      type="text" required placeholder="..."
                      value={reflectionWord}
                      onChange={(e) => setReflectionWord(e.target.value)}
                      className="w-full border-b-2 border-slate-100 py-3 px-1 text-2xl font-serif italic text-slate-900 focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-100"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-3 group"
                  >
                    Complete Reflection
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-600 p-10 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden"
                 >
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                       <div>
                          <UserCheck size={32} className="mb-4 text-emerald-200" />
                          <h2 className="text-3xl font-black tracking-tight mb-2">Reflection Captured</h2>
                          <p className="text-emerald-100 italic opacity-80">You are part of a live collective reflection.</p>
                       </div>
                       <div className="bg-white/10 px-8 py-5 flex flex-col items-center rounded-3xl backdrop-blur-md">
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-1">Impact Shift</span>
                          <span className="text-5xl font-black">{afterValue - beforeValue >= 0 ? `+${afterValue - beforeValue}` : afterValue - beforeValue}</span>
                       </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                 </motion.div>

                 <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                       <h3 className="text-lg font-bold">Shared Awareness</h3>
                       <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">Live Room Stream</span>
                    </div>
                    <div className="space-y-6">
                       {roomResponses.slice(0, 4).map((resp) => (
                         <div key={resp.id} className="p-6 bg-white/5 rounded-3xl border border-white/5">
                            <p className="text-xl font-serif italic text-slate-200 leading-tight mb-2">“{resp.word.toLowerCase()}”</p>
                            <span className="text-[9px] uppercase tracking-widest font-black text-white/30">Anonymized Thought</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Right Column: Collective Data */}
          <div className="md:col-span-12 lg:col-span-5 h-full space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
               <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-slate-100 rounded-2xl text-slate-600"><Users size={20} /></div>
                  <div className="flex-1">
                     <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-0.5">Live Room Shift</span>
                     <h4 className="text-lg font-bold text-slate-900 leading-none italic">Collective Awareness</h4>
                  </div>
               </div>

               <div className="space-y-10">
                  <div className="flex flex-col items-center py-6 bg-slate-50/50 rounded-3xl border border-slate-50">
                     <span className="text-7xl font-black text-slate-900 tracking-tighter">+{collectiveMetrics.shift}%</span>
                     <span className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] mt-3">Connection Shift</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Avg Before</span>
                        <span className="text-2xl font-black text-slate-700">{collectiveMetrics.avgBefore}</span>
                     </div>
                     <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center">
                        <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Avg After</span>
                        <span className="text-2xl font-black text-emerald-700">{collectiveMetrics.avgAfter}</span>
                     </div>
                  </div>

                  <div className="pt-2">
                     <div className="flex items-center gap-3 mb-6">
                        <Cloud size={16} className="text-slate-300" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shared Language</span>
                     </div>
                     <WordCloudView />
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Session Summary</h3>
               <button 
                 onClick={handleExport} disabled={isExporting}
                 className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all disabled:opacity-50"
               >
                 {isExporting ? <RefreshCcw size={14} className="animate-spin" /> : <><Download size={14} /> Generate Session Report</>}
               </button>
            </div>
          </div>
        </div>
      </main>

      <div className="max-w-5xl mx-auto w-full px-6 md:px-12 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">The Core Insight</span>
              <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed italic">
                “What changes is not the situation — but the level of connection we feel within it.”
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500 opacity-[0.05] rounded-full -mr-32 -mt-32 blur-3xl" />
        </motion.div>
      </div>

      <footer className="bg-white border-t border-slate-200 px-8 py-24 flex flex-col items-center justify-center gap-8 text-[11px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-auto">
        <div className="mb-4">
           <ModeToggle inline />
        </div>
        
        <span className="text-slate-900 font-black text-xs normal-case tracking-normal">Alexia Georghiou</span>
        
        <div className="flex flex-col items-center gap-4 text-center">
           <a href="tel:0118652833605" className="text-emerald-600 font-black hover:text-emerald-700 transition-colors">011-865-283-3605</a>
           <a href="mailto:alexia@knoxvillehappinesscoalition.com" className="hover:text-emerald-600 transition-colors">alexia@knoxvillehappinesscoalition.com</a>
           <a href="https://www.knoxvillehappinesscoalition.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 font-black hover:text-emerald-600 transition-colors lowercase">www.knoxvillehappinesscoalition.com</a>
        </div>
      </footer>
    </div>
  );
}
