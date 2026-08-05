"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#020817]/80 backdrop-blur-xl border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Trophy className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-colors" />
          <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            CHAMPIONS TIMELINE
          </span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="/leagues" className="hover:text-white transition-colors">Leagues</Link>
          <Link href="/players" className="hover:text-white transition-colors">Players</Link>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <Link href="/api-docs" className="hover:text-white transition-colors">API</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold hover:text-blue-400 transition-colors">Sign In</button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
