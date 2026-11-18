import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1120] p-8 font-sans text-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight"
          >
            My Projects
          </motion.h1>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/workspace')}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
          >
            Create New Project
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-colors shadow-xl group"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">TeamSync AI Platform</h2>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1.5 rounded-full">Active</span>
          </div>
          
          <p className="text-slate-400 mb-6 text-lg max-w-3xl leading-relaxed">
            An AI-powered innovation matchmaking platform that analyzes users skills, interests, and project experiences to recommend suitable teammates.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {['Python', 'Machine Learning', 'React'].map((skill, index) => (
              <span key={index} className="bg-slate-900/80 text-cyan-300 text-sm font-semibold px-4 py-2 rounded-lg border border-cyan-500/20">
                {skill}
              </span>
            ))}
          </div>

          <button 
            onClick={() => navigate('/workspace')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            Find Teammates (AI Match)
          </button>
        </motion.div>
      </div>
    </div>
  );
}