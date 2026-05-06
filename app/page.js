"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '@/app/context/AppContext';
import { AlertCircle, Check } from 'lucide-react';

import Header from '@/app/components/Header';
import LandingPage from '@/app/components/LandingPage';
import LoginPage from '@/app/components/LoginPage';
import OnboardingWizard from '@/app/components/OnboardingWizard';
import ChatInterface from '@/app/components/ChatInterface';
import DashboardView from '@/app/components/DashboardView';
import DiscoverDirectory from '@/app/components/DiscoverDirectory';

export default function Home() {
  const [activeTab, setActiveTab] = useState('landing');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { user, toast, loading } = useApp();

  // Track mouse coordinates for interactive cursor-following backdrop blob!
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 1. On mount: Read 'tab' parameter from URL to preserve page refreshes!
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab) {
        setActiveTab(tab);
      }
    }
  }, []);

  // 2. Synchronize activeTab with URL parameters to support browser Next/Back clicks!
  useEffect(() => {
    if (typeof window !== 'undefined' && !loading) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') !== activeTab) {
        params.set('tab', activeTab);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({ tab: activeTab }, '', newUrl);
      }
    }
  }, [activeTab, loading]);

  // 3. Listen to browser Back and Forward navigation clicks!
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.tab) {
        setActiveTab(event.state.tab);
      } else {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab) {
          setActiveTab(tab);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route guarding / automatic tab redirection on load
  useEffect(() => {
    if (!loading) {
      if (user) {
        if (user.isProfileComplete) {
          if (activeTab === 'login' || activeTab === 'onboarding') {
            setActiveTab('dashboard');
          }
        } else {
          if (activeTab !== 'onboarding') {
            setActiveTab('onboarding');
          }
        }
      } else {
        if (activeTab !== 'landing' && activeTab !== 'login') {
          setActiveTab('landing');
        }
      }
    }
  }, [user, loading, activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-500">Loading ScholarAI Core...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-dvh bg-gradient-mesh bg-slate-50 flex flex-col selection:bg-indigo-500/10 selection:text-indigo-600 relative overflow-hidden">
      {/* Premium Looping Background Gradient Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-25 transition-opacity duration-1000"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-liquid-gradient-under-glowing-light-41561-large.mp4" type="video/mp4" />
      </video>

      {/* Dynamic Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-400/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none animate-blob-1 z-0"></div>
      <div className="absolute top-1/2 right-1/10 w-80 sm:w-96 h-80 sm:h-96 bg-purple-400/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none animate-blob-2 z-0"></div>
      <div className="absolute bottom-1/10 left-1/3 w-72 sm:w-80 h-72 sm:h-80 bg-pink-400/5 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none animate-blob-1 z-0"></div>

      {/* Interactive Mouse-Reactive Follower Blob (GPU-Optimized 120 FPS!) */}
      <div 
        className="fixed pointer-events-none rounded-full bg-indigo-500/10 blur-[100px] transition-transform duration-[700ms] ease-out z-0 hidden lg:block"
        style={{
          top: 0,
          left: 0,
          width: '300px',
          height: '300px',
          transform: `translate3d(${mousePos.x - 150}px, ${mousePos.y - 150}px, 0)`
        }}
      />

      {/* Shared Reusable Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-xl border flex items-center gap-2 shadow-xl ${
              toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              toast.type === 'info' ? 'bg-slate-50 border-slate-200 text-slate-800' :
              'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-red-500" /> : <Check className="w-4 h-4 text-emerald-500" />}
            <span className="text-sm font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Routing Body */}
      <main className="flex-1 flex flex-col z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {activeTab === 'landing' && <LandingPage setActiveTab={setActiveTab} />}
            {activeTab === 'login' && <LoginPage setActiveTab={setActiveTab} />}
            {activeTab === 'onboarding' && <OnboardingWizard setActiveTab={setActiveTab} />}
            {activeTab === 'chat' && <ChatInterface />}
            {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} />}
            {activeTab === 'discover' && <DiscoverDirectory />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Footer */}
      <footer className="glass-panel border-t border-indigo-100/40 py-6 px-6 mt-12 z-10 relative shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-bold">
          <span>&copy; {new Date().getFullYear()} ScholarAI. Built as a premium Indian SaaS Portfolio Project.</span>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-slate-600 transition">Privacy Policy</span>
            <span className="cursor-pointer hover:text-slate-600 transition">MahaDBT Portal Sync</span>
            <span className="cursor-pointer hover:text-slate-600 transition">Contact Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
