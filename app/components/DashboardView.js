"use client";

import React, { useState } from 'react';
import { Bookmark, CheckCircle, GraduationCap, ArrowRight, Clock, Trash2, Check, UserCheck, Calendar, Sparkles } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { scholarships } from '@/app/data/scholarships';
import { calculateEligibility } from '@/app/lib/matching';

export default function DashboardView({ setActiveTab }) {
  const { 
    user, savedIds, toggleSaveScholarship, appliedIds, toggleApplyScholarship 
  } = useApp();
  const [activeTrackerTab, setActiveTrackerTab] = useState('saved'); // 'saved' or 'applied'

  const averageEligibility = savedIds.length > 0 
    ? Math.round(savedIds.reduce((acc, id) => acc + calculateEligibility(user?.profile, scholarships.find(s => s.id === id)), 0) / savedIds.length) 
    : 85;

  const applicationsLeft = savedIds.length - appliedIds.length;
  const humanizedAlert = applicationsLeft > 0 
    ? `You’re on track — ${applicationsLeft} application${applicationsLeft > 1 ? 's' : ''} left to complete!`
    : "Excellent work! You’ve applied to all your saved scholarships! 🎉";

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 max-w-7xl mx-auto w-full flex flex-col gap-6 sm:gap-8 z-10 relative">
      {/* Welcome Banner Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200/60 p-5 sm:p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-extrabold text-lg sm:text-xl shrink-0 shadow-md">
            {user?.name[0]}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">Welcome back, {user?.name}!</h1>
            <p className="text-xs text-indigo-600 font-bold flex items-center gap-1.5 mt-0.5">
              <UserCheck className="w-4 h-4" /> Maharashtra Matching Engine: <span className="uppercase tracking-wider">Active ⚡</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs font-bold text-slate-500 w-full md:w-auto">
          <span className="bg-indigo-50/50 border border-indigo-100/60 px-3 py-1.5 rounded-xl text-indigo-600">Home: {user?.profile?.state}</span>
          <span className="bg-blue-50/50 border border-blue-100/60 px-3 py-1.5 rounded-xl text-blue-600">Category: {user?.profile?.category}</span>
          <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700">Annual Income: ₹{(user?.profile?.income ?? 0).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card p-4 sm:p-5 rounded-2xl flex items-center justify-between col-span-1">
          <div>
            <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Saved Matches</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">{savedIds.length}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0"><Bookmark className="w-4 h-4 sm:w-5 sm:h-5" /></div>
        </div>

        <div className="glass-card p-4 sm:p-5 rounded-2xl flex items-center justify-between col-span-1">
          <div>
            <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Applied</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 mt-0.5">{appliedIds.length}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /></div>
        </div>

        <div className="glass-card p-4 sm:p-5 rounded-2xl flex items-center justify-between col-span-1">
          <div>
            <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Avg Eligibility</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-0.5">{averageEligibility}%</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0"><GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" /></div>
        </div>

        <div className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col justify-center cursor-pointer hover:border-indigo-300 col-span-1" onClick={() => setActiveTab('chat')}>
          <span className="text-[10px] sm:text-xs text-indigo-600 font-bold flex items-center gap-1">Ask Senior Mentor <ArrowRight className="w-3.5 h-3.5 text-indigo-500" /></span>
          <p className="text-[9px] sm:text-[10px] text-slate-400 font-semibold mt-0.5 line-clamp-1">Solve eligibility & document doubts.</p>
        </div>
      </div>

      {/* Humanized Alert Banner */}
      <div className="bg-indigo-50 border border-indigo-100 px-4 py-3.5 rounded-xl text-xs sm:text-sm text-indigo-700 font-bold flex items-center gap-2 shadow-sm">
        <Sparkles className="w-4 h-4 text-indigo-500" />
        <span>{humanizedAlert}</span>
      </div>

      {/* Main Track Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTrackerTab('saved')}
                className={`text-sm sm:text-base font-extrabold pb-1.5 transition-all ${
                  activeTrackerTab === 'saved' ? 'text-slate-900 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Saved Tracker ({savedIds.length})
              </button>
              <button 
                onClick={() => setActiveTrackerTab('applied')}
                className={`text-sm sm:text-base font-extrabold pb-1.5 transition-all ${
                  activeTrackerTab === 'applied' ? 'text-slate-900 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Applied List ({appliedIds.length})
              </button>
            </div>
            <button onClick={() => setActiveTab('discover')} className="text-xs font-bold text-indigo-600 hover:underline">Explore Directory</button>
          </div>

          {activeTrackerTab === 'saved' && (
            savedIds.length === 0 ? (
              <div className="glass-card p-10 sm:p-14 rounded-3xl text-center flex flex-col items-center gap-4">
                <Bookmark className="w-10 h-10 text-slate-300" />
                <span className="text-sm font-bold text-slate-700">Let’s find your first scholarship!</span>
                <p className="text-xs text-slate-400 font-semibold max-w-sm leading-relaxed">Use our AI Advisor Chat or manual search discover panel to calculate compatibility scores and save matching schemes.</p>
                <button 
                  onClick={() => setActiveTab('discover')}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/10 transition"
                >
                  Browse Schemes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedIds.map(id => {
                  const s = scholarships.find(item => item.id === id);
                  if (!s) return null;
                  const score = calculateEligibility(user?.profile, s);
                  const isApplied = appliedIds.includes(s.id);
                  return (
                    <div key={s.id} className="glass-card p-5 rounded-2xl flex flex-col justify-between gap-4">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <span className="text-[9px] text-indigo-600 font-bold uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">{s.provider.split(',')[0]}</span>
                          <h3 className="text-sm font-extrabold text-slate-900 mt-2 line-clamp-2">{s.name}</h3>
                        </div>
                      </div>

                      {/* Score Indicator & Progress Bar */}
                      <div className="flex flex-col gap-1.5 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500">
                          <span>Eligibility Score:</span>
                          <span className="text-indigo-600 font-extrabold">{score}% Score</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 transition-all rounded-full" style={{ width: `${score}%` }}></div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 text-xs text-slate-500 font-semibold">
                        <div className="flex justify-between"><span>Benefit:</span> <span className="font-extrabold text-slate-800">₹{(s.benefits.amount ?? 0).toLocaleString('en-IN')} / {s.benefits.type.toLowerCase()}</span></div>
                        <div className="flex justify-between"><span>Deadline:</span> <span className="font-extrabold text-slate-800 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> {s.deadline}</span></div>
                      </div>

                      <div className="flex gap-2 mt-1">
                        <button 
                          onClick={() => toggleApplyScholarship(s.id)}
                          className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                            isApplied ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-95'
                          }`}
                        >
                          {isApplied ? <Check className="w-3.5 h-3.5" /> : null} {isApplied ? 'Applied' : 'Mark Applied'}
                        </button>
                        <button 
                          onClick={() => toggleSaveScholarship(s.id)}
                          className="p-2.5 bg-slate-100 hover:bg-red-50 border border-slate-200 text-slate-400 hover:text-red-500 rounded-xl transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}

          {activeTrackerTab === 'applied' && (
            appliedIds.length === 0 ? (
              <div className="glass-card p-10 sm:p-14 rounded-3xl text-center flex flex-col items-center gap-4">
                <CheckCircle className="w-10 h-10 text-slate-300" />
                <span className="text-sm font-bold text-slate-700">No applications marked yet</span>
                <p className="text-xs text-slate-400 font-semibold max-w-sm leading-relaxed">When you click "Mark Applied" on saved scholarships, they will appear here to help you stay organized!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                {appliedIds.map(id => {
                  const s = scholarships.find(item => item.id === id);
                  if (!s) return null;
                  return (
                    <div key={s.id} className="glass-card p-5 rounded-2xl flex flex-col justify-between border-emerald-100 bg-emerald-50/10">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[9px] text-emerald-600 font-bold uppercase bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Applied Scheme</span>
                          <h3 className="text-sm font-extrabold text-slate-900 mt-2 line-clamp-1">{s.name}</h3>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500 font-semibold mt-3 p-2 bg-white rounded-lg border border-slate-100 shadow-inner">
                        <span>Benefit Recurrent:</span>
                        <span className="font-extrabold text-emerald-600">₹{s.benefits.amount.toLocaleString('en-IN')}</span>
                      </div>
                      <button 
                        onClick={() => toggleApplyScholarship(s.id)}
                        className="w-full mt-3 py-2 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove from Applied
                      </button>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* Timelines Column */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-1.5 border-b border-slate-200/60 pb-3"><Calendar className="w-5 h-5 text-indigo-500" /> Critical Deadlines</h2>
          <div className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Closures</span>
            {scholarships.slice(0, 4).map(s => {
              const daysLeft = Math.ceil((new Date(s.deadline) - new Date()) / (1000 * 60 * 60 * 24));
              const urgencyText = daysLeft <= 3 
                ? `Don't miss this, deadline in ${daysLeft} days!`
                : `${daysLeft} days left`;

              return (
                <div key={s.id} className="flex gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center text-indigo-500 shrink-0 font-extrabold shadow-inner">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{s.name}</h4>
                    <div className="flex justify-between items-center mt-0.5">
                      <span className="text-[10px] text-slate-400 font-bold">{s.deadline}</span>
                      <span className={`text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full ${daysLeft <= 3 ? 'bg-red-50 text-red-500 border border-red-100 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>{urgencyText}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
