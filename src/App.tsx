/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
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
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [beforeValue, setBeforeValue] = useState<number>(5);
  const [afterValue, setAfterValue] = useState<number>(5);
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');

  const shiftScore = useMemo(() => afterValue - beforeValue, [beforeValue, afterValue]);

  const getShiftFeedback = (score: number) => {
    if (score < 1) return "Awareness is the first step to connection.";
    if (score >= 1 && score < 3) return "Connection is building in real time.";
    return "Shared experience is transforming how we feel together.";
  };

  // Simulated data for "The Room"
  const simulatedRoomData = useMemo(() => {
    return {
      avgBefore: 4.2,
      avgAfter: 7.8,
      totalParticipants: 124
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Context Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-end sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Alexia Georghiou
          </h1>
          <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">
            Happiness Habits Framework
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Human-Centered Leadership</p>
          <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Workplace Wellbeing</p>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-8 flex flex-col space-y-8">
        
        {/* Philosophy Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden shrink-0"
        >
          <div className="relative z-10 max-w-3xl">
            <p className="text-2xl font-light italic leading-relaxed mb-4 text-slate-100">
              “We can experience happiness even in uncertainty when we create connection.”
            </p>
            <p className="text-sm text-slate-400 font-medium border-l-2 border-blue-500 pl-4 py-1">
              What changes is not the situation — but the level of connection we feel within it.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full -mr-32 -mt-32 blur-3xl" />
        </motion.div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Connection Meter (Sliders + Score) */}
          <div className="md:col-span-12 lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 pb-2 border-b border-slate-50 italic">Reflection Instrument</h3>
            
            <div className="space-y-12 flex-1">
              {/* Before Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <label className="text-sm font-semibold text-slate-700 leading-tight flex-1">
                    Before this experience, my level of connection in this room is:
                  </label>
                  <span className="text-2xl font-bold text-slate-400 tabular-nums w-10 text-right">{beforeValue}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-slate-300 uppercase font-bold tracking-tighter">0</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="1"
                    value={beforeValue}
                    onChange={(e) => setBeforeValue(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-400 hover:accent-slate-500 transition-all"
                  />
                  <span className="text-[10px] font-mono text-slate-300 uppercase font-bold tracking-tighter">10</span>
                </div>
              </div>

              {/* After Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <label className="text-sm font-semibold text-slate-700 leading-tight flex-1">
                    After this experience, my level of connection in this room is:
                  </label>
                  <span className="text-2xl font-bold text-emerald-600 tabular-nums w-10 text-right">{afterValue}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-slate-300 uppercase font-bold tracking-tighter">0</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="1"
                    value={afterValue}
                    onChange={(e) => setAfterValue(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-700 transition-all"
                  />
                  <span className="text-[10px] font-mono text-slate-300 uppercase font-bold tracking-tighter">10</span>
                </div>
              </div>
            </div>

            {/* Shift Score & Feedback */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={shiftScore}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex-1 text-center md:text-left">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Impact Insight</p>
                  <p className="text-lg font-medium text-slate-800 leading-tight">{getShiftFeedback(shiftScore)}</p>
                </div>
                <div className="bg-emerald-50 px-8 py-3 rounded-2xl border border-emerald-100 flex flex-col items-center min-w-[140px] shadow-sm">
                   <p className="text-[9px] text-emerald-400 uppercase font-bold tracking-widest mb-1">Shift Score</p>
                   <span className="text-4xl font-black text-emerald-700">
                     {shiftScore >= 0 ? `+${shiftScore}` : shiftScore}
                   </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* Collective Insight Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Collective Awareness</h3>
              <p className="text-sm text-slate-600 mb-8 italic leading-snug">
                “This is not measurement as science — this is reflection as awareness.”
              </p>
              
              <div className="space-y-6 flex-1">
                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Avg Before</span>
                    <span className="text-slate-700 tabular-nums">{simulatedRoomData.avgBefore} / 10</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(simulatedRoomData.avgBefore / 10) * 100}%` }}
                      className="bg-slate-300 h-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-2">
                    <span className="text-emerald-500 uppercase tracking-wider font-bold">Avg After</span>
                    <span className="text-emerald-700 tabular-nums">{simulatedRoomData.avgAfter} / 10</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(simulatedRoomData.avgAfter / 10) * 100}%` }}
                      className="bg-emerald-600 h-full"
                    />
                  </div>
                </div>
                
                <div className="pt-6 mt-auto">
                  <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center">
                    <p className="text-[11px] text-slate-500 text-center font-medium leading-relaxed max-w-[200px]">
                      Connection is the real metric of cultural health in a room.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompts Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Reflection Prompts</h3>
              
              <div className="space-y-6">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-tight">One word describing how I feel now:</span>
                  <input 
                    type="text" 
                    placeholder="e.g. Grounded" 
                    value={reflection1}
                    onChange={(e) => setReflection1(e.target.value)}
                    className="text-base font-medium text-slate-800 border-b border-slate-100 py-2 focus:outline-none focus:border-blue-500 bg-transparent transition-colors placeholder:text-slate-200"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-tight">One thing I noticed today:</span>
                  <input 
                    type="text" 
                    placeholder="e.g. Shared experience matters" 
                    value={reflection2}
                    onChange={(e) => setReflection2(e.target.value)}
                    className="text-base font-medium text-slate-800 border-b border-slate-100 py-2 focus:outline-none focus:border-blue-500 bg-transparent transition-colors placeholder:text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-slate-400 uppercase font-bold tracking-widest mt-12 mb-0">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <a href="mailto:alexia@knoxvillehappinesscoalition.com" className="hover:text-slate-700 transition-colors">alexia@knoxvillehappinesscoalition.com</a>
          <a href="tel:865-283-3605" className="hover:text-slate-700 transition-colors">865-283-3605</a>
        </div>
        <div className="font-black text-slate-600">
          www.knoxvillehappinesscoalition.com
        </div>
      </footer>
    </div>
  );
}

