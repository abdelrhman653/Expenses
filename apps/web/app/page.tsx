"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, Globe, Activity, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const trendingLeagues = [
    { name: 'Premier League', country: 'England', years: '1888-2024', current: 'Manchester City' },
    { name: 'La Liga', country: 'Spain', years: '1929-2024', current: 'Real Madrid' },
    { name: 'Serie A', country: 'Italy', years: '1898-2024', current: 'Inter Milan' },
    { name: 'Bundesliga', country: 'Germany', years: '1963-2024', current: 'Bayer Leverkusen' }
  ];

  return (
    <main className="relative min-h-screen pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-[#020817] to-[#020817]" />
      
      <motion.div initial="hidden" animate="visible" variants={heroVariants} className="max-w-4xl z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
          <Activity className="w-4 h-4" />
          <span>Database Updated: 2023/24 Season Complete</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
          Generate <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">Cinematic History</span> In Seconds.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Browse every FIFA-recognized league in history and instantly generate beautiful 60FPS vertical videos showing every champion. Ready for TikTok, Reels, and Shorts.
        </p>

        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leagues, countries, or clubs..."
            className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-700 text-white text-lg rounded-full py-5 pl-16 pr-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-2xl"
          />
          <button className="absolute inset-y-2 right-2 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-full font-bold transition-colors flex items-center gap-2">
            Explore <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full mt-32 text-left z-10"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="text-blue-500 w-6 h-6" /> Trending Leagues
          </h2>
          <Link href="/leagues" className="text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-1">
            View All <ChevronDown className="w-4 h-4 -rotate-90" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingLeagues.map((league, i) => (
            <div key={i} className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <Play className="w-8 h-8 text-blue-500" />
              </div>
              <div className="w-16 h-16 bg-slate-800 rounded-2xl mb-6 flex items-center justify-center border border-slate-700">
                <span className="text-2xl font-black text-slate-400">{league.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{league.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{league.country}</p>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Current Champion</p>
                <p className="font-semibold text-slate-300">{league.current}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
