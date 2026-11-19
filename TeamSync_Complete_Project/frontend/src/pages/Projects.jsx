import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const projectsData = [
  {
    id: 1,
    title: 'TeamSync AI Platform',
    desc: 'An AI-powered innovation matchmaking platform that analyzes users\' skills, interests, and project experiences to recommend suitable teammates using Machine Learning models.',
    skills: ['Python', 'Machine Learning', 'React', 'FastAPI', 'MongoDB'],
    status: 'Active',
    statusColor: 'emerald',
    team: 3,
    progress: 72,
  },
  {
    id: 2,
    title: 'Smart Campus Navigator',
    desc: 'A mobile-first campus navigation app with indoor positioning, real-time crowd heatmaps, and AI-suggested routes for students.',
    skills: ['React Native', 'Node.js', 'Firebase', 'Maps API'],
    status: 'Planning',
    statusColor: 'amber',
    team: 0,
    progress: 15,
  },
];

export default function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.status.toLowerCase() === filter);

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      <div className="orb-cyan w-80 h-80 -top-40 -right-40 opacity-40" />

      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">My Projects</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your AI-powered project portfolio</p>
        </div>
        <button
          onClick={() => navigate('/workspace')}
          className="btn-secondary text-sm flex items-center gap-2 w-fit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </motion.div>

      {/* Filter tabs */}
      <motion.div {...fadeUp(0.1)} className="flex gap-2">
        {['all', 'active', 'planning'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-all duration-300 capitalize ${
              filter === f
                ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                : 'text-slate-400 border-slate-700/50 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Project cards */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              {...fadeUp(0.15 + i * 0.1)}
              layout
              exit={{ opacity: 0, y: -20 }}
              className="glass-card-hover p-6 sm:p-8 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:gradient-text transition-all">
                      {project.title}
                    </h2>
                    <span className={`tag-${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-medium">Progress</span>
                  <span className="text-xs text-cyan-400 font-bold">{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.skills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-900/60 text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-cyan-500/15">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-700/40">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.team} members
                  </div>
                </div>
                <button
                  onClick={() => navigate('/workspace')}
                  className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find Teammates
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
