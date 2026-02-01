
import React from 'react';
import CampaignGenerator from './CampaignGenerator';
import Chatbot from './Chatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">CampaignAI</h1>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Email Marketing Studio</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">How it works</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Contact</a>
            <button className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-md">Sign In</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
            Generate Campaigns <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">In 30 Seconds.</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-medium">
            Subject lines, persuasive copy, and studio-quality 4K visuals powered by Gemini 3.0.
          </p>
        </div>

        <CampaignGenerator />
      </main>

      {/* Chatbot */}
      <Chatbot />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">CampaignAI</h2>
            </div>
            <p className="max-w-sm mb-6">
              The world's first complete AI marketing engine that handles strategy, writing, and visuals in one unified workflow.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Email Studio</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">AI Image Lab</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Chat Assistant</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Integration API</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} CampaignAI Inc. All rights reserved. Powered by Google Gemini.
        </div>
      </footer>
    </div>
  );
};

export default App;
