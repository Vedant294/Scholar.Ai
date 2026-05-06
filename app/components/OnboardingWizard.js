"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';

export default function OnboardingWizard({ setActiveTab }) {
  const { user, setUser, showToast, setConversations, setActiveConvId } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: 'Maharashtra',
    gender: 'All',
    category: 'General',
    income: '500000',
    course: 'B.Tech',
    level: 'UG'
  });

  const handleOnboardingSubmit = () => {
    const updatedUser = {
      ...user,
      isProfileComplete: true,
      profile: {
        state: formData.state,
        gender: formData.gender,
        category: formData.category,
        income: Number(formData.income),
        course: formData.course,
        level: formData.level
      }
    };
    setUser(updatedUser);

    // Initial conversation seed
    const initialConvId = "conv_initial";
    const initialConvs = [{
      id: initialConvId,
      title: "Scholarship Assistant Chat",
      messages: [
        {
          role: "assistant",
          content: `Hi **${updatedUser.name}**! 👋 I've just analyzed your profile. Based on your academic criteria (Annual Income: ₹${updatedUser.profile.income.toLocaleString('en-IN')}, Category: ${updatedUser.profile.category}, Course: ${updatedUser.profile.course} in ${updatedUser.profile.state}), I have computed your eligibility scores for our top matched scholarships.\n\nYou have a strong chance of qualification! Ask me anything about them or let me explain the process.`,
          timestamp: new Date().toISOString()
        }
      ]
    }];
    setConversations(initialConvs);
    setActiveConvId(initialConvId);
    
    setActiveTab('dashboard');
    showToast("🎉 Profile Configured! Welcome to your Dashboard.");

    try {
      import('canvas-confetti').then((confetti) => confetti.default());
    } catch (e) {}
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-6 z-10 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel max-w-xl w-full p-8 rounded-3xl border border-white shadow-xl flex flex-col gap-6"
      >
        <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Configure Scholar Profile</h2>
            <p className="text-xs text-slate-400 font-bold">This is used to calculate your compatibility percentage</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-3.5 py-1.5 rounded-full">Step {step} of 2</span>
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Home State</label>
                <select 
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="glass-input p-3.5 rounded-xl text-slate-900 text-sm outline-none cursor-pointer w-full"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="All India">Other / National</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Gender</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="glass-input p-3.5 rounded-xl text-slate-900 text-sm outline-none cursor-pointer w-full"
                >
                  <option value="All">Male / Other</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Social Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="glass-input p-3.5 rounded-xl text-slate-900 text-sm outline-none cursor-pointer w-full"
              >
                <option value="General">General / Open</option>
                <option value="OBC">OBC</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
              </select>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl mt-4 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-indigo-600/10"
            >
              Academic Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Academic Level</label>
                <select 
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="glass-input p-3.5 rounded-xl text-slate-900 text-sm outline-none cursor-pointer w-full"
                >
                  <option value="UG">Undergraduate (UG)</option>
                  <option value="PG">Postgraduate (PG)</option>
                  <option value="PhD">Doctorate (Ph.D)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Current Course</label>
                <select 
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="glass-input p-3.5 rounded-xl text-slate-900 text-sm outline-none cursor-pointer w-full"
                >
                  <option value="B.Tech">B.Tech / B.E.</option>
                  <option value="MBBS">MBBS / Medical</option>
                  <option value="B.Sc">B.Sc / Science</option>
                  <option value="B.Com">B.Com / Commerce</option>
                  <option value="B.A">B.A / Arts</option>
                  <option value="B.Pharm">B.Pharm</option>
                  <option value="MBA">MBA / MCA</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Annual Family Income (₹)</label>
              <input 
                type="number"
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                className="glass-input p-3.5 rounded-xl text-slate-900 text-sm outline-none w-full"
                placeholder="e.g. 500000"
              />
              <p className="text-[10px] text-slate-400 font-bold pl-1">Must match your income certificate for document verification</p>
            </div>

            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition border border-slate-200"
              >
                Back
              </button>
              <button 
                onClick={handleOnboardingSubmit}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-indigo-600/10"
              >
                Complete Profile
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
