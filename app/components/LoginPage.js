"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';

export default function LoginPage({ setActiveTab }) {
  const { setUser, showToast } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast("Please fill in all details", "error");
      return;
    }
    const newUser = {
      name: formData.name,
      email: formData.email,
      isProfileComplete: false,
      profile: {
        state: 'Maharashtra',
        gender: 'All',
        category: 'General',
        income: 500000,
        course: 'B.Tech',
        level: 'UG'
      }
    };
    setUser(newUser);
    setActiveTab('onboarding');
    showToast("Welcome to ScholarAI! Let's build your profile 👋");
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-6 z-10 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel max-w-md w-full p-8 sm:p-10 rounded-3xl border border-white shadow-xl flex flex-col gap-6"
      >
        <div className="text-center flex flex-col gap-1.5">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Student</span>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">Sign in with basic details to begin matching</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Vedant Deshmukh" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="glass-input p-3.5 rounded-xl text-slate-900 text-sm outline-none w-full"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="e.g. student@college.edu.in" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="glass-input p-3.5 rounded-xl text-slate-900 text-sm outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mt-2 pl-1 bg-indigo-50/40 p-2 rounded-lg border border-indigo-100/50">
            <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>localStorage Secured Sandbox Access</span>
          </div>

          <button 
            type="submit"
            className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl mt-3 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            Create Scholar Profile
          </button>
        </form>
      </motion.div>
    </div>
  );
}
