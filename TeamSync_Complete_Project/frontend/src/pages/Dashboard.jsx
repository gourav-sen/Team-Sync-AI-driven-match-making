import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center font-sans text-white">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 mb-6"
        ></motion.div>
        <motion.h2 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3 }} 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Connecting to TeamSync AI
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }} 
          className="text-slate-400 mt-2"
        >
          Fetching dynamic neural matches
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] p-8 font-sans text-slate-200 selection:bg-cyan-500/30 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl"
        >
          <h4 className="text-cyan-400 font-bold text-sm tracking-[0.2em] mb-2 uppercase">Dashboard Overview</h4>
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Ready to build your dream team?</h1>
          <p className="text-slate-400 mb-8 max-w-2xl text-lg leading-relaxed">
            Your AI Matchmaker is actively analyzing your profile. Based on your skills in Python and React, we have found new potential teammates for your next big project.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/projects')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Find Teammates
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="bg-slate-800 text-slate-300 border border-slate-600 font-semibold px-8 py-3 rounded-xl hover:bg-slate-700 hover:text-white transition-all duration-300"
            >
              Update Skills
            </button>
            <button 
              onClick={() => navigate('/workspace')} 
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Open AI Workspace
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => navigate('/profile')}
            className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div>
              <h4 className="text-slate-500 font-bold text-xs tracking-wider mb-3">PROFILE DETAILS</h4>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg">GS</div>
                <div>
                  <h3 className="font-bold text-white text-lg">Gourav Sen</h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-full border text-emerald-400 bg-emerald-400/10 border-emerald-400/20">MCA ACTIVE</span>
                </div>
              </div>
            </div>
            <span className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">→</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => navigate('/projects')}
            className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div>
              <h4 className="text-slate-500 font-bold text-xs tracking-wider mb-3">ACTIVE PROJECTS</h4>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-white">1</span>
                <div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full border text-cyan-400 bg-cyan-400/10 border-cyan-400/20">Smart Matchmaker</span>
                </div>
              </div>
            </div>
            <span className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">→</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => navigate('/messages')}
            className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <div>
              <h4 className="text-slate-500 font-bold text-xs tracking-wider mb-3">UNREAD MESSAGES</h4>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-white">2</span>
                <div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full border text-purple-400 bg-purple-400/10 border-purple-400/20">Harsh, Aditya</span>
                </div>
              </div>
            </div>
            <span className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">→</span>
          </motion.div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50"
          >
            <h4 className="font-bold text-white mb-6 flex items-center gap-2 text-lg">Top AI Matches For You</h4>
            <div className="space-y-4">
              {[
                { name: 'Aayush Raj', skills: 'React.js, Tailwind CSS', match: '94%' },
                { name: 'Aditi Sharma', skills: 'MongoDB, Node.js', match: '88%' }
              ].map((person, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                  <div>
                    <h5 className="font-bold text-white text-md">{person.name}</h5>
                    <p className="text-xs text-slate-400 mt-1">Skills: {person.skills}</p>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1.5 rounded-full">{person.match} Match</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50"
          >
            <h4 className="font-bold text-white mb-6 flex items-center gap-2 text-lg">Trending Skills Required</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {['Machine Learning', 'FastAPI', 'Next.js', 'Agentic AI', 'MongoDB'].map((skill, idx) => (
                <span key={idx} className="bg-slate-900/80 text-cyan-300 text-sm font-semibold px-4 py-2 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">Adding these trending skills to your profile will significantly increase your visibility for upcoming hackathons.</p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}