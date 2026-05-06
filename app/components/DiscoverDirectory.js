"use client";

import React, { useState } from 'react';
import { Filter, Check, ExternalLink } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { scholarships } from '@/app/data/scholarships';
import { calculateEligibility } from '@/app/lib/matching';

export default function DiscoverDirectory() {
  const { user, savedIds, toggleSaveScholarship, appliedIds } = useApp();
  const [filterState, setFilterState] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterCourse, setFilterCourse] = useState('All');

  const filteredScholarships = scholarships.filter(s => {
    const matchesState = filterState === 'All' || s.state === filterState || s.state === 'All India';
    const matchesCategory = filterCategory === 'All' || s.eligibility.categories.includes(filterCategory);
    const matchesCourse = filterCourse === 'All' || s.eligibility.courses.includes(filterCourse);
    return matchesState && matchesCategory && matchesCourse;
  });

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 max-w-7xl mx-auto w-full flex flex-col gap-6 sm:gap-8 z-10 relative animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">Scholarships Directory</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-bold mt-1">Browse, filter, and discover compatible schemes from our real database.</p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
            <span className="text-slate-400 text-[10px] uppercase">State:</span>
            <select 
              value={filterState} 
              onChange={(e) => setFilterState(e.target.value)}
              className="bg-transparent text-slate-700 outline-none cursor-pointer text-xs font-bold"
            >
              <option value="All">All States</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
            <span className="text-slate-400 text-[10px] uppercase">Social:</span>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-slate-700 outline-none cursor-pointer text-xs font-bold"
            >
              <option value="All">All Categories</option>
              <option value="General">General / Open</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
            <span className="text-slate-400 text-[10px] uppercase">Course:</span>
            <select 
              value={filterCourse} 
              onChange={(e) => setFilterCourse(e.target.value)}
              className="bg-transparent text-slate-700 outline-none cursor-pointer text-xs font-bold"
            >
              <option value="All">All Courses</option>
              <option value="B.Tech">B.Tech / B.E.</option>
              <option value="B.Sc">B.Sc / Science</option>
              <option value="MBBS">MBBS / Medical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.length === 0 ? (
          <div className="col-span-full glass-card p-14 rounded-3xl text-center flex flex-col items-center gap-4 border-slate-200">
            <Filter className="w-12 h-12 text-slate-300 animate-pulse" />
            <span className="text-sm font-bold text-slate-700">No scholarships matching current filter criteria.</span>
            <button onClick={() => {setFilterState('All'); setFilterCategory('All'); setFilterCourse('All');}} className="text-xs text-indigo-600 font-bold hover:underline">Reset Filters</button>
          </div>
        ) : (
          filteredScholarships.map(s => {
            const score = calculateEligibility(user?.profile, s);
            const isSaved = savedIds.includes(s.id);
            return (
              <div key={s.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between gap-5 relative overflow-hidden">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] text-indigo-600 font-bold bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{s.provider.split(',')[0]}</span>
                    <h3 className="text-base font-extrabold text-slate-950 mt-2.5 line-clamp-2 tracking-tight leading-snug">{s.name}</h3>
                  </div>
                  <span className="text-xs font-extrabold bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded-lg shrink-0 shadow-inner">
                    {score}% Match
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 font-semibold line-clamp-2">{s.benefits.details}</p>

                <div className="flex flex-col gap-2 text-xs border-t border-slate-100 pt-3.5 font-semibold text-slate-500">
                  <div className="flex justify-between"><span>Scholarship Value:</span> <span className="font-extrabold text-emerald-600">₹{(s.benefits.amount ?? 0).toLocaleString('en-IN')} / {s.benefits.type.toLowerCase()}</span></div>
                  <div className="flex justify-between"><span>End Date:</span> <span className="font-extrabold text-slate-700">{s.deadline}</span></div>
                  <div className="flex justify-between"><span>State Category:</span> <span className="font-extrabold text-slate-700">{s.state}</span></div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleSaveScholarship(s.id)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isSaved 
                        ? 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200/50' 
                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-95 shadow-md shadow-indigo-600/10'
                    }`}
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5 animate-bounce" /> : null} {isSaved ? 'Saved to Tracker' : 'Save Details'}
                  </button>
                  <a 
                    href={s.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-3.5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-xl transition flex items-center justify-center shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
