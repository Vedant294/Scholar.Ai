"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { scholarships } from '@/app/data/scholarships';
import { calculateEligibility } from '@/app/lib/matching';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load initial states from LocalStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('scholarai_user');
    const storedSaved = localStorage.getItem('scholarai_saved');
    const storedApplied = localStorage.getItem('scholarai_applied');
    const storedConvs = localStorage.getItem('scholarai_convs');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedSaved) setSavedIds(JSON.parse(storedSaved));
    if (storedApplied) setAppliedIds(JSON.parse(storedApplied));
    
    if (storedConvs) {
      const parsedConvs = JSON.parse(storedConvs);
      setConversations(parsedConvs);
      if (parsedConvs.length > 0) setActiveConvId(parsedConvs[0].id);
    }
    setLoading(false);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveUserData = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('scholarai_user', JSON.stringify(updatedUser));
  };

  const toggleSaveScholarship = (id) => {
    let updated;
    if (savedIds.includes(id)) {
      updated = savedIds.filter(item => item !== id);
      showToast("Removed from Saved list", "info");
    } else {
      updated = [...savedIds, id];
      showToast("Saved to Dashboard tracker!");
    }
    setSavedIds(updated);
    localStorage.setItem('scholarai_saved', JSON.stringify(updated));
  };

  const toggleApplyScholarship = (id) => {
    let updated;
    if (appliedIds.includes(id)) {
      updated = appliedIds.filter(item => item !== id);
    } else {
      updated = [...appliedIds, id];
      showToast("Marked as Applied! Best of luck! 🎓");
      try {
        import('canvas-confetti').then((confetti) => confetti.default({ particleCount: 50, spread: 60 }));
      } catch (e) {}
    }
    setAppliedIds(updated);
    localStorage.setItem('scholarai_applied', JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem('scholarai_user');
    localStorage.removeItem('scholarai_saved');
    localStorage.removeItem('scholarai_applied');
    localStorage.removeItem('scholarai_convs');
    setUser(null);
    setSavedIds([]);
    setAppliedIds([]);
    setConversations([]);
    setActiveConvId(null);
    showToast("Logged out successfully");
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser: saveUserData,
      savedIds,
      toggleSaveScholarship,
      appliedIds,
      toggleApplyScholarship,
      conversations,
      setConversations,
      activeConvId,
      setActiveConvId,
      toast,
      showToast,
      logout,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
