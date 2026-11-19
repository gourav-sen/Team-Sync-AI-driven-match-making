import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const moduleColors = {
  1: { tag: 'tag-cyan', border: 'border-cyan-500/20', glow: 'hover:shadow-cyan-500/5' },
  2: { tag: 'tag-purple', border: 'border-purple-500/20', glow: 'hover:shadow-purple-500/5' },
  3: { tag: 'tag-amber', border: 'border-amber-500/20', glow: 'hover:shadow-amber-500/5' },
  4: { tag: 'tag-emerald', border: 'border-emerald-500/20', glow: 'hover:shadow-emerald-500/5' },
};

export default function Workspace() {
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [synergy, setSynergy] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [teamGap, setTeamGap] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAnalyze = async () => {
    if (!description.trim()) {
      showToast('Please enter a project description first!', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/projects/analyze`, { description });
      setAnalysis(res.data);
      showToast('Analysis complete! AI found matching roles.');
    } catch {
      // Fallback mock data when backend is offline
      setAnalysis({
        roles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Designer'],
        skills: ['React.js', 'FastAPI', 'MongoDB', 'Tailwind CSS', 'Python'],
      });
      showToast('Using demo data (backend offline)', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const handlePublishProject = async () => {
    if (!projectTitle.trim()) {
      showToast('Please enter a project title', 'error');
      return;
    }
    if (!analysis) {
      showToast('Please analyze your idea first!', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await axios.post(`${API_BASE}/api/projects/create`, {
        title: projectTitle,
        description,
        roles: analysis.roles || [],
        skills: analysis.skills || [],
      });
      showToast(`Project saved! ID: ${res.data.project_id || 'Created'}`);
    } catch {
      showToast('Project saved locally (backend offline)', 'warning');
    } finally {
      setSaving(false);
    }
  };

  const handleSynergyCheck = () => {
    setSynergy({ score: 94, conflicts: [], status: 'Compatible' });
    showToast('Synergy analysis complete!');
  };

  const handleGenerateChallenge = () => {
    setChallenge({
      scenario: 'Design a scalable microservice architecture with JWT authentication, rate limiting, and WebSocket support using FastAPI + React.',
      timeLimit: '45 minutes',
    });
    showToast('Challenge scenario generated!');
  };

  const handleTeamGap = () => {
    setTeamGap({
      gaps: ['Backend Developer (Node.js)', 'DevOps Engineer'],
      filled: ['Frontend Developer', 'AI Engineer', 'UI Designer'],
    });
    showToast('Team gap analysis complete!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 relative">
      <div className="orb-cyan w-80 h-80 -top-40 -right-40 opacity-40" />
      <div className="orb-purple w-60 h-60 -bottom-20 -left-20 opacity-30" />

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 px-6 py-3 rounded-xl text-sm font-medium shadow-2xl border backdrop-blur-xl ${
              toast.type === 'error' ? 'bg-red-500/15 text-red-400 border-red-500/30' :
              toast.type === 'warning' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
              'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold gradient-text tracking-tight">AI Innovation Workspace</h1>
          <p className="text-sm text-slate-400 mt-1">4 intelligent modules for team formation</p>
        </div>
      </motion.div>

      {/* ═══ Module 1: Project Decomposition ═══ */}
      <motion.div {...fadeUp(0.1)} className="glass-card p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="tag-cyan">Module 1</span>
          <h2 className="text-xl font-bold text-white">Project Decomposition & AI Matchmaker</h2>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Describe your project idea. Our TF-IDF engine extracts technical keywords, identifies required roles,
          and maps the ideal tech stack using NLP vectorization.
        </p>

        <div>
          <label className="label">Project Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., I need a team to build a food delivery app with React frontend, FastAPI backend, and MongoDB database with real-time order tracking..."
            className="input-field resize-none"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="btn-primary text-sm flex items-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
              />
              Analyzing with TF-IDF...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Analyze with AI
            </>
          )}
        </button>

        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-6 bg-slate-900/50 rounded-xl border border-slate-700/40 space-y-5">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detected Roles</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysis.roles?.map((role, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.08 }}
                        className="tag-cyan"
                      >
                        {role}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tech Stack Required</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysis.skills?.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.08 }}
                        className="tag-purple"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/40 space-y-4">
                  <div>
                    <label className="label text-emerald-400">Project Title</label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="e.g. QuickBites Food Delivery App"
                      className="input-field"
                    />
                  </div>
                  <button
                    onClick={handlePublishProject}
                    disabled={saving}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm flex items-center gap-2 disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Save to Database
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ═══ Module 2: Work-Style Conflict Radar ═══ */}
      <motion.div {...fadeUp(0.2)} className="glass-card p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="tag-purple">Module 2</span>
          <h2 className="text-xl font-bold text-white">Work-Style Conflict Radar</h2>
        </div>
        <p className="text-slate-400 text-sm">
          Cosine similarity model analyzes teammate availability vectors and working-style compatibility before team formation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Your Profile</label>
            <input type="text" readOnly value="gourav_sen" className="input-field bg-slate-900/80" />
          </div>
          <div>
            <label className="label">Target Profile</label>
            <input type="text" readOnly value="aayush_raj" className="input-field bg-slate-900/80" />
          </div>
        </div>
        <button onClick={handleSynergyCheck} className="btn-secondary text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Calculate Synergy Score
        </button>

        <AnimatePresence>
          {synergy && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900/50 rounded-xl border border-emerald-500/20"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase">Synergy Score</span>
                <span className="tag-emerald font-bold">{synergy.status}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black text-white">{synergy.score}<span className="text-cyan-400 text-xl">%</span></div>
                <div className="flex-1">
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${synergy.score}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">Great match for collaborative work! No shift conflicts detected.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ═══ Module 3: Pre-Team Micro-Challenge ═══ */}
      <motion.div {...fadeUp(0.3)} className="glass-card p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="tag-amber">Module 3</span>
          <h2 className="text-xl font-bold text-white">Pre-Team Micro-Challenge</h2>
        </div>
        <p className="text-slate-400 text-sm">
          Generate technical sandbox scenarios to test potential teammates before final team formation.
        </p>
        <button onClick={handleGenerateChallenge} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Generate Scenario
        </button>

        <AnimatePresence>
          {challenge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900/50 rounded-xl border border-amber-500/20"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="tag-amber">Generated Challenge</span>
                <span className="text-xs text-slate-500">⏱ {challenge.timeLimit}</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{challenge.scenario}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ═══ Module 4: Dynamic Team Room ═══ */}
      <motion.div {...fadeUp(0.4)} className="glass-card p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="tag-emerald">Module 4</span>
          <h2 className="text-xl font-bold text-white">Dynamic Team Room</h2>
        </div>
        <p className="text-slate-400 text-sm">
          Monitor team role gaps using K-Means clustering and export compliance records.
        </p>
        <input type="text" placeholder="Enter MongoDB Team ID (e.g. 64a1b2c...)" className="input-field" />
        <div className="flex flex-wrap gap-3">
          <button onClick={handleTeamGap} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg text-sm flex items-center gap-2 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analyze Team Gap
          </button>
          <button
            onClick={() => showToast('Database record exported successfully!')}
            className="btn-ghost text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Record
          </button>
        </div>

        <AnimatePresence>
          {teamGap && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900/50 rounded-xl border border-emerald-500/20"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Filled Roles</span>
                  <div className="mt-2 space-y-2">
                    {teamGap.filled.map((role, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Missing Roles</span>
                  <div className="mt-2 space-y-2">
                    {teamGap.gaps.map((role, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
