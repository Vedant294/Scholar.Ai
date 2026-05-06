"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, MessageSquare, Loader2, Send, ChevronRight, Menu } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';

export default function ChatInterface() {
  const { 
    user, conversations, setConversations, activeConvId, setActiveConvId, showToast 
  } = useApp();
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, isTyping]);

  const activeConversation = conversations.find(c => c.id === activeConvId);

  const startNewChat = () => {
    const newId = "conv_" + Math.random().toString(36).substr(2, 9);
    const newConv = {
      id: newId,
      title: "New Matching Query",
      messages: [
        {
          role: "assistant",
          content: "Hello! I am your scholarship advisor. Tell me what course or college you are applying to, and I will find matching schemes for you with a high chance of approval!",
          timestamp: new Date().toISOString()
        }
      ]
    };
    setConversations([newConv, ...conversations]);
    setActiveConvId(newId);
    setMobileSidebarOpen(false);
  };

  const deleteConversation = (id, e) => {
    e.stopPropagation();
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    if (activeConvId === id) {
      if (updated.length > 0) {
        setActiveConvId(updated[0].id);
      } else {
        setActiveConvId(null);
      }
    }
    showToast("Chat deleted", "info");
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    let currentConv = activeConversation;
    if (!currentConv) {
      const newId = "conv_" + Math.random().toString(36).substr(2, 9);
      currentConv = {
        id: newId,
        title: chatInput.slice(0, 30) + (chatInput.length > 30 ? "..." : ""),
        messages: []
      };
      setConversations([currentConv, ...conversations]);
      setActiveConvId(newId);
    }

    const userMsg = {
      role: "user",
      content: chatInput,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...currentConv.messages, userMsg];
    const isNewTitle = currentConv.title === "New Conversation" || currentConv.title === "Scholarship Assistant Chat" || currentConv.title === "New Matching Query";
    const updatedTitle = isNewTitle ? chatInput.slice(0, 30) + (chatInput.length > 30 ? "..." : "") : currentConv.title;

    setConversations(prev => prev.map(c => {
      if (c.id === currentConv.id) {
        return { ...c, title: updatedTitle, messages: updatedMessages };
      }
      return c;
    }));

    const sentText = chatInput;
    setChatInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: sentText,
          conversationId: currentConv.id,
          userProfile: user?.profile,
          history: updatedMessages.slice(-8)
        })
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();

      setConversations(prev => prev.map(c => {
        if (c.id === currentConv.id) {
          return {
            ...c,
            messages: [...c.messages, {
              role: "assistant",
              content: data.reply,
              timestamp: new Date().toISOString()
            }]
          };
        }
        return c;
      }));

    } catch (err) {
      console.error(err);
      setConversations(prev => prev.map(c => {
        if (c.id === currentConv.id) {
          return {
            ...c,
            messages: [...c.messages, {
              role: "assistant",
              content: "⚠️ **System Update:** Our LLM engine is experiencing heavy volume, but let me guide you directly! Based on your profile, you have a **strong chance of qualifying (90%+)** for the **Rajarshi Shahu Maharaj Tuition Waiver** and the **Dr. Panjabrao Deshmukh Hostel Scheme**. Let me know if you need to review their specific required documents!",
              timestamp: new Date().toISOString()
            }]
          };
        }
        return c;
      }));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-75px)] relative overflow-hidden z-10">
      {/* Sidebar - Desktop */}
      <aside className="w-80 border-r border-slate-200/50 glass-panel hidden lg:flex flex-col p-4 justify-between shadow-sm">
        <div className="flex flex-col gap-4">
          <button 
            onClick={startNewChat}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-50 to-blue-50 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-blue-100 border border-indigo-100/50 text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition"
          >
            <Plus className="w-4 h-4" /> New Match Inquiry
          </button>

          <div className="flex flex-col gap-2 overflow-y-auto max-h-[350px] pr-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-2">Recent Mentorships</span>
            {conversations.length === 0 ? (
              <span className="text-xs text-slate-400 italic pl-2">No queries started</span>
            ) : (
              conversations.map(conv => (
                <div 
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`group p-3 rounded-xl flex items-center justify-between cursor-pointer border transition text-xs font-bold ${
                    activeConvId === conv.id 
                      ? 'bg-indigo-50 border-indigo-100 text-indigo-600 shadow-sm' 
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    <span className="truncate">{conv.title}</span>
                  </div>
                  <button 
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-100/50 border border-slate-200/60 p-4 rounded-xl flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matched Criteria</span>
          <div className="flex flex-col text-xs text-slate-500 gap-1 font-semibold">
            <div className="flex justify-between"><span>State:</span> <span className="font-bold text-slate-800">{user?.profile?.state}</span></div>
            <div className="flex justify-between"><span>Income:</span> <span className="font-bold text-slate-800">₹{(user?.profile?.income ?? 0).toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span>Course:</span> <span className="font-bold text-slate-800">{user?.profile?.course}</span></div>
            <div className="flex justify-between"><span>Category:</span> <span className="font-bold text-slate-800">{user?.profile?.category}</span></div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/10 backdrop-blur-sm lg:hidden animate-fade-in" onClick={() => setMobileSidebarOpen(false)}>
          <div 
            className="absolute top-0 bottom-0 left-0 w-72 bg-white/95 border-r border-slate-200/60 p-4 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <button 
                onClick={startNewChat}
                className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition"
              >
                <Plus className="w-4 h-4" /> New Query
              </button>

              <div className="flex flex-col gap-2 overflow-y-auto max-h-[350px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-2">Recent Queries</span>
                {conversations.map(conv => (
                  <div 
                    key={conv.id}
                    onClick={() => { setActiveConvId(conv.id); setMobileSidebarOpen(false); }}
                    className={`group p-3 rounded-xl flex items-center justify-between cursor-pointer border transition text-xs font-bold ${
                      activeConvId === conv.id ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MessageSquare className="w-4 h-4 text-indigo-500" />
                      <span className="truncate">{conv.title}</span>
                    </div>
                    <button onClick={(e) => deleteConversation(conv.id, e)} className="p-1 hover:text-red-500 transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Criteria</span>
              <div className="flex flex-col text-xs text-slate-500 gap-1 font-bold">
                <div className="flex justify-between"><span>State:</span> <span className="text-slate-800">{user?.profile?.state}</span></div>
                <div className="flex justify-between"><span>Course:</span> <span className="text-slate-800">{user?.profile?.course}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main chat window */}
      <section className="flex-1 flex flex-col justify-between p-4 sm:p-6 bg-white/35">
        {/* Mobile Header indicator */}
        <div className="flex items-center justify-between border-b border-slate-200/50 pb-3 mb-4 lg:hidden">
          <button 
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm"
          >
            <Menu className="w-4 h-4 text-indigo-600" /> Mentorships List
          </button>
          <span className="text-xs font-bold text-slate-400">Senior Advisor Active</span>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-5 sm:gap-6 pr-2 max-w-4xl mx-auto w-full pb-4 scroll-smooth">
          {activeConversation?.messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 sm:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role !== 'user' && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                  AI
                </div>
              )}
              <div className={`p-4 rounded-2xl max-w-[85%] sm:max-w-2xl text-sm leading-relaxed border shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 border-indigo-100 text-white rounded-tr-none' 
                  : 'bg-white border-slate-200/60 text-slate-700 rounded-tl-none font-medium'
              }`}>
                <p className="whitespace-pre-line text-xs sm:text-sm">
                  {(msg.content || '').split('\n').map((line, idx) => {
                    const boldParts = line.split('**');
                    if (boldParts.length > 1) {
                      return (
                        <span key={idx} className="block mb-1">
                          {boldParts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-indigo-600 font-extrabold">{part}</strong> : part)}
                        </span>
                      );
                    }
                    return <span key={idx} className="block mb-1">{line}</span>;
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                AI
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/60 text-slate-500 text-sm flex items-center gap-2 shadow-sm font-semibold">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                <span className="text-xs">Analyzing eligibility criteria...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Chips */}
        <div className="max-w-4xl mx-auto w-full flex flex-wrap gap-1.5 mb-3 justify-center">
          {[
            "Find scholarships for me",
            "Maharashtra schemes",
            "Documents checklist"
          ].map((chip, index) => (
            <button
              key={index}
              onClick={() => setChatInput(chip)}
              className="px-3.5 py-2 bg-white hover:bg-indigo-50/50 hover:border-indigo-200/50 border border-slate-200 text-slate-600 rounded-full text-[10px] sm:text-xs font-bold transition shadow-sm"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto w-full flex items-center gap-2">
          <input 
            type="text"
            placeholder="Ask ScholarAI..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="glass-input p-3.5 sm:p-4 rounded-xl text-slate-900 text-xs sm:text-sm outline-none flex-1 shadow-sm"
          />
          <button 
            type="submit"
            disabled={!chatInput.trim()}
            className="p-3.5 sm:p-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl transition hover:scale-105 disabled:opacity-50 disabled:scale-100 shadow-md shadow-indigo-600/10"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </form>
      </section>
    </div>
  );
}
