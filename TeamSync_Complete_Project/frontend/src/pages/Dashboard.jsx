import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const matchData = [
  { name: 'Aayush Raj', skills: 'React.js, Tailwind CSS, JavaScript', match: 94, avatar: 'AR' },
  { name: 'Harsh Kumar', skills: 'Python, Django, SQL, APIs', match: 88, avatar: 'HK' },
  { name: 'Aditya Singh', skills: 'Machine Learning, TensorFlow', match: 82, avatar: 'AS' },
];

const activities = [
  { text: 'AI Model retrained with latest skill data', time: '2m ago', color: 'cyan' },
  { text: 'New match found: Aayush Raj (94%)', time: '15m ago', color: 'emerald' },
  { text: 'Project "TeamSync AI" updated', time: '1h ago', color: 'purple' },
  { text: 'K-Means clustering completed', time: '3h ago', color: 'amber' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-cyan-500 mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-slate-400 font-medium"
        >
          Loading neural matches...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Background orbs */}
      <div className="orb-cyan w-96 h-96 -top-48 -right-48 opacity-50" />
      <div className="orb-purple w-80 h-80 -bottom-40 -left-40 opacity-50" />

      {/* Welcome banner */}
      <motion.div {...fadeUp(0)} className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-bl-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="tag-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block mr-1.5" />
              AI Active
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Welcome back, <span className="gradient-text">Gourav</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-base leading-relaxed mb-6">
            Your AI Matchmaker has been analyzing profiles overnight. Based on your Python and React skills,
            we've found <span className="text-cyan-400 font-semibold">3 new potential teammates</span> for your projects.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/workspace')} className="btn-primary text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Open AI Workspace
            </button>
            <button onClick={() => navigate('/projects')} className="btn-ghost text-sm">
              View Projects
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'AI Matches', value: '3', change: '+2 today', icon: '🎯', color: 'cyan' },
          { label: 'Active Projects', value: '1', change: 'In progress', icon: '📂', color: 'purple' },
          { label: 'Team Synergy', value: '94%', change: 'Excellent', icon: '⚡', color: 'emerald' },
          { label: 'Messages', value: '2', change: 'Unread', icon: '💬', color: 'amber' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            {...fadeUp(0.1 + i * 0.05)}
            className="glass-card-hover p-5 group cursor-pointer"
            onClick={() => {
              if (stat.label === 'Messages') navigate('/messages');
              else if (stat.label === 'Active Projects') navigate('/projects');
              else if (stat.label === 'AI Matches') navigate('/workspace');
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <div className="text-3xl font-black text-white mb-1 group-hover:gradient-text transition-all">
              {stat.value}
            </div>
            <span className={`text-xs font-medium ${
              stat.color === 'cyan' ? 'text-cyan-400' :
              stat.color === 'purple' ? 'text-purple-400' :
              stat.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {stat.change}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI Matches */}
        <motion.div {...fadeUp(0.3)} className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Top AI Matches
            </h2>
            <button
              onClick={() => navigate('/workspace')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {matchData.map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-700/40 hover:border-cyan-500/30 hover:bg-slate-800/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/20 transition-shadow">
                    {person.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">{person.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{person.skills}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block">
                    <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${person.match}%` }}
                        transition={{ duration: 1, delay: 0.6 + idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                  <span className="tag-emerald text-[11px] font-bold">
                    {person.match}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div {...fadeUp(0.4)} className="glass-card p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Activity
          </h2>
          <div className="space-y-4">
            {activities.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-start gap-3 group"
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  act.color === 'cyan' ? 'bg-cyan-400' :
                  act.color === 'emerald' ? 'bg-emerald-400' :
                  act.color === 'purple' ? 'bg-purple-400' : 'bg-amber-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 group-hover:text-white transition-colors leading-snug">
                    {act.text}
                  </p>
                  <span className="text-[11px] text-slate-500">{act.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trending skills */}
      <motion.div {...fadeUp(0.5)} className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">🔥 Trending Skills</h2>
          <span className="text-xs text-slate-500">Updated daily</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Machine Learning', 'FastAPI', 'Next.js', 'Agentic AI', 'MongoDB', 'LangChain', 'TypeScript', 'Docker', 'RAG Systems', 'Vector DBs'].map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.04 }}
              className="bg-slate-800/60 text-slate-300 text-xs font-medium px-4 py-2 rounded-lg border border-slate-700/50 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-slate-800 transition-all duration-300 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
