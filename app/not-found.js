"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-mesh bg-dark-bg flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel max-w-md w-full p-8 rounded-2xl border border-white/10 flex flex-col items-center gap-6"
      >
        <div className="bg-brand-purple/10 border border-brand-purple/30 p-4 rounded-full text-brand-purple">
          <Sparkles className="w-8 h-8" />
        </div>
        
        <div>
          <h1 className="text-6xl font-extrabold text-white tracking-tight">404</h1>
          <h2 className="text-lg font-bold text-slate-200 mt-2">Scheme Not Found</h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            The scholarship pathway or page you are looking for has been relocated or doesn't exist. Let's get you back on track!
          </p>
        </div>

        <Link 
          href="/"
          className="px-6 py-3 bg-brand-purple hover:bg-brand-purple/95 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-brand-purple/20 transition hover:scale-105 w-full justify-center"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Safety
        </Link>
      </motion.div>
    </div>
  );
}
