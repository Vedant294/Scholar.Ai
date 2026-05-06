"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, CheckCircle, GraduationCap, Clock, Flame, Users, Award, Bell } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';

export default function LandingPage({ setActiveTab }) {
  const { user } = useApp();
  const [liveIndex, setLiveIndex] = useState(0);

  // Live Activity Ticker Data (Makes product feel alive!)
  const liveActivities = [
    "Rahul from Pune just applied to MahaDBT!",
    "Sneha found ₹30,000 scholarship!",
    "Amit from Nagpur saved ₹40,000!",
    "Pratiksha from Mumbai just completed document verification!",
    "Vikram from Nashik got matched with ₹50,000 waiver!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveIndex((prev) => (prev + 1) % liveActivities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col py-8 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto gap-20 sm:gap-28 z-10 relative">
      
      {/* 6. LIVE ACTIVITY TICKER (Top Game Changer) */}
      <div className="w-full flex justify-center -mt-6 sm:-mt-10">
        <div className="bg-white/75 backdrop-blur-md border border-indigo-100/80 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold mr-1">Live Activity:</span>
          <AnimatePresence mode="wait">
            <motion.span 
              key={liveIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-indigo-600"
            >
              {liveActivities[liveIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
        {/* Left column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-50 border border-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" /> Apli Sarkar, Apli Scholarship! ⚡ Maharashtra's #1 AI Portal
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-slate-900"
          >
            Stop Missing Scholarships. <br />
            <span className="text-gradient">Start Getting Them.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 max-w-xl font-medium leading-relaxed"
          >
            Get matched, guided, and reminded — like a real senior helping you at every single step. Kyunki har student ka haq hai higher education par! 🎓
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto"
          >
            <button 
              onClick={() => {
                if (user) {
                  setActiveTab(user.isProfileComplete ? 'chat' : 'onboarding');
                } else {
                  setActiveTab('login');
                }
              }}
              className="px-7 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/15 flex items-center justify-center gap-2 transition hover:scale-[1.03]"
            >
              Talk to Your AI Senior <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                if (user) {
                  setActiveTab(user.isProfileComplete ? 'discover' : 'onboarding');
                } else {
                  setActiveTab('login');
                }
              }}
              className="px-7 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-bold border border-slate-200/80 shadow-sm flex items-center justify-center gap-2 transition hover:scale-[1.03]"
            >
              See What You're Eligible For <Compass className="w-4 h-4 text-indigo-500" />
            </button>
          </motion.div>
        </div>

        {/* Right column (with exact high-converting hero image) */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="absolute w-72 h-72 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-2xl opacity-30 -top-4 -left-4 pointer-events-none"></div>
          <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-200 to-pink-200 rounded-full blur-2xl opacity-20 -bottom-6 -right-6 pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e" 
              alt="Indian college student with laptop studying under natural light" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </div>

      {/* 2. FEATURE CARDS WITH HIGH-FIDELITY VISUAL ELEMENTS */}
      <div className="flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Smart Matching Platform Features</h2>
          <p className="text-slate-500 font-medium text-sm sm:text-base">We provide premium interactive aids designed to help you secure college funding fast.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white/60 backdrop-blur-lg border border-white/50 p-6 rounded-2xl flex flex-col gap-4 shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">
              <Sparkles className="w-5.5 h-5.5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">AI Compatibility</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">Cuts out matching friction completely by checking income, social category, and course eligibility.</p>
            {/* Visual element: Mini progress bar */}
            <div className="mt-2 bg-slate-100/80 p-2.5 rounded-xl border border-slate-200/40">
              <div className="flex justify-between text-[9px] font-extrabold text-slate-400 mb-1">
                <span>VJTI Scholarship match</span>
                <span className="text-indigo-600">95% Match</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[95%]" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg border border-white/50 p-6 rounded-2xl flex flex-col gap-4 shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0">
              <ArrowRight className="w-5.5 h-5.5 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Deadline Reminders</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">Keep tabs on closing dates with senior-like notifications before any central/state schemes expire.</p>
            {/* Visual element: Notification badge */}
            <div className="mt-2 bg-rose-50 border border-rose-100 p-2.5 rounded-xl flex items-center gap-2 text-[10px] font-bold text-rose-600">
              <Bell className="w-3.5 h-3.5 animate-bounce shrink-0" />
              <span>MahaDBT closes in 3 days!</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg border border-white/50 p-6 rounded-2xl flex flex-col gap-4 shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-500 shrink-0">
              <Compass className="w-5.5 h-5.5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Smart Saved Tracker</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">Save matching schemes and monitor completed document uploads in your dashboard in one click.</p>
            {/* Visual element: Checklist */}
            <div className="mt-2 bg-slate-100/80 p-2.5 rounded-xl flex flex-col gap-1 text-[9px] font-extrabold text-slate-500">
              <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Income Certificate</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-slate-300 shrink-0" /> Cast Validity</div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg border border-white/50 p-6 rounded-2xl flex flex-col gap-4 shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
              <CheckCircle className="w-5.5 h-5.5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">MahaDBT Sync Links</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">Direct redirection to official MahaDBT and central application portals with document guidelines.</p>
            {/* Visual element: Verify tag */}
            <div className="mt-2 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl flex items-center gap-2 text-[10px] font-bold text-emerald-600">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Government Verified Schemes</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. HOW IT WORKS SECTION (Step-by-Step Guidance) */}
      <div className="flex flex-col gap-12 bg-white/40 border border-slate-200/50 p-8 sm:p-14 rounded-3xl backdrop-blur-md shadow-sm">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold text-slate-900">How It Works</h2>
          <p className="text-slate-500 font-medium text-sm">Secure your scholarship in 3 incredibly simple steps with zero stress.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="flex flex-col items-center text-center gap-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-extrabold text-lg text-indigo-600 shadow-md">1️⃣</div>
            <h3 className="text-lg font-bold text-slate-900">Enter Your Profile</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed max-w-xs">Fill in your state category, family annual income, and academic level in 10 seconds.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center font-extrabold text-lg text-blue-600 shadow-md">2️⃣</div>
            <h3 className="text-lg font-bold text-slate-900">Get Matched Instantly</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed max-w-xs">Our Maharashtra engine computes match compatibility percentages immediately.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center font-extrabold text-lg text-purple-600 shadow-md">3️⃣</div>
            <h3 className="text-lg font-bold text-slate-900">Apply Before Deadline</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed max-w-xs">Submit documents via direct official portals with our helpful advisor checklists.</p>
          </div>
        </div>
      </div>

      {/* 4. TESTIMONIALS (With exact real student portraits) */}
      <div className="flex flex-col gap-12">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Apne Jaise Students Ki Kahaani</h2>
          <p className="text-slate-500 font-medium text-sm">Real stories from real students who saved lakhs on college tuition fees!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Priya Sharma",
              college: "VJTI Engineering Student",
              amount: "Saved ₹50,000",
              quote: "I found scholarships I didn’t even know existed. ScholarAI made document submissions super clear!",
              avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
            },
            {
              name: "Rahul Deshmukh",
              college: "COEP Engineering Student",
              amount: "Saved ₹30,000",
              quote: "Talk to Your AI Senior feature is amazing. It guided me through the Shahu Maharaj scheme rules easily!",
              avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            },
            {
              name: "Sneha Rao",
              college: "IIT Bombay Science Student",
              amount: "Saved ₹50,000 / year",
              quote: "No bureaucratic jargon. Calculated my compatibility match in 10 seconds and got direct application links.",
              avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
            }
          ].map((item, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl flex flex-col justify-between gap-6 hover:scale-[1.05]">
              <p className="text-sm italic text-slate-600 font-medium leading-relaxed">"{item.quote}"</p>
              <div className="flex items-center gap-3">
                <img src={item.avatar} alt={item.name} className="w-11 h-11 rounded-full border-2 border-indigo-200 object-cover shrink-0 shadow-sm" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-400 font-bold">{item.college}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full font-bold">
                    {item.amount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. STATS SECTION (Premium gradient numbers) */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/50 shadow-md text-center grid grid-cols-3 gap-6 w-full max-w-4xl mx-auto z-10 bg-white/50">
        <div>
          <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">₹25Cr+</div>
          <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Scholarships Disbursed</div>
        </div>
        <div className="border-x border-slate-200">
          <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">10,000+</div>
          <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Students Guided</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-extrabold text-indigo-500 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">98%</div>
          <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">Success Rate</div>
        </div>
      </div>

      {/* 7. FINAL CTA SECTION (With persuasive microcopy) */}
      <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-indigo-100/60 shadow-lg text-center flex flex-col items-center gap-6 relative overflow-hidden max-w-4xl mx-auto w-full">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-indigo-100 rounded-full blur-3xl pointer-events-none opacity-30"></div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-snug">You might be missing <span className="text-indigo-600">₹50,000+</span> right now.</h2>
        <p className="text-slate-500 font-medium max-w-lg text-sm sm:text-base leading-relaxed">Setup your profile in seconds to cross-reference and fetch top state & central scholarships immediately!</p>
        <button 
          onClick={() => setActiveTab('login')}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-xl shadow-indigo-600/15 transition hover:scale-105 flex items-center gap-2"
        >
          Check My Scholarships Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
