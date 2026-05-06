"use client";

import React, { useState } from 'react';
import { Sparkles, LogOut, Menu, X, LayoutDashboard, MessageSquare, Compass } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';

export default function Header({ activeTab, setActiveTab }) {
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-panel border-b border-indigo-100/50 px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm">
        {/* Brand logo */}
        <div className="flex items-center gap-2 cursor-pointer animate-fade-in" onClick={() => navigateTo('landing')}>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-2.5 rounded-xl text-white shadow-md shadow-indigo-500/10 hover:scale-105 transition">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Scholar<span className="text-indigo-600">AI</span>
          </span>
        </div>

        {/* Desktop Navigation Tabs */}
        {user && user.isProfileComplete && (
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'chat' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              AI Assistant
            </button>
            <button 
              onClick={() => setActiveTab('discover')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'discover' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Discover
            </button>
          </nav>
        )}

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2.5">
              <div 
                onClick={() => { if (user.isProfileComplete) navigateTo('dashboard'); }}
                className="flex items-center gap-2 bg-slate-100/60 hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200/50 cursor-pointer transition"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0 shadow-sm">
                  {user.name[0]}
                </div>
                <span className="text-xs font-bold text-slate-700 hidden sm:inline">{user.name.split(' ')[0]}</span>
              </div>

              {/* Hamburger Button for Mobile */}
              {user.isProfileComplete && (
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/40 rounded-xl transition"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}

              <button 
                onClick={logout}
                className="p-2.5 bg-slate-100/60 hover:bg-red-50 text-slate-500 hover:text-red-500 border border-slate-200/40 rounded-xl transition hidden sm:inline-flex"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setActiveTab('login')}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 hover:scale-[1.03] transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-[75px] left-4 right-4 bg-white/95 border border-slate-200/80 p-5 rounded-2xl flex flex-col gap-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => navigateTo('dashboard')}
                className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100/50'}`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>
              <button 
                onClick={() => navigateTo('chat')}
                className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition ${activeTab === 'chat' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100/50'}`}
              >
                <MessageSquare className="w-4 h-4" /> AI Assistant (Chat)
              </button>
              <button 
                onClick={() => navigateTo('discover')}
                className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition ${activeTab === 'discover' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100/50'}`}
              >
                <Compass className="w-4 h-4" /> Discover Directory
              </button>
            </div>

            <div className="border-t border-slate-200/60 pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pl-2">
                <span>Account: {user?.email}</span>
              </div>
              <button 
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-500 border border-red-200/50 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
