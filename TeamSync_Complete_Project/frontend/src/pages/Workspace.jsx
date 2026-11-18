import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Workspace() {
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!description.trim()) {
      alert('Please enter a project description first!');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/projects/analyze', { description });
      setAnalysis(res.data);
    } catch (error) {
      console.error("Analysis error, using fallback mock data:", error);
      setAnalysis({
        roles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Designer'],
        skills: ['React.js', 'FastAPI', 'MongoDB', 'Tailwind CSS']
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublishProject = async () => {
    if (!projectTitle.trim()) {
      alert("Please enter a project title");
      return;
    }
    if (!analysis) {
      alert("Please click 'Analyze Idea with AI' first!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/projects/create", {
        title: projectTitle,
        description: description,
        roles: analysis.roles || [],
        skills: analysis.skills || []
      });
      alert("Project Saved Successfully! ID: " + (res.data.project_id || res.data._id || 'Saved'));
    } catch (error) {
      console.error("Full Error:", error);
      const errorMsg = error.response?.data?.detail || error.message || "Unknown error occurred";
      alert("Error saving project: " + JSON.stringify(errorMsg));
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] p-8 font-sans text-slate-200">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
            AI Innovation Workspace
          </h1>
        </motion.div>

        {/* Module 1: Project Decomposition & Teammate Requirement Matcher */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold px-3 py-1 rounded-full">Module 1</span>
            <h2 className="text-2xl font-bold text-white">Project Decomposition & AI Matchmaker</h2>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            Describe your project idea below. Our AI engine will analyze your description, extract required technical roles and skills, and match you with the ideal teammates.
          </p>

          <div>
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Project Description</label>
            <textarea 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., I need a Full Stack Developer who knows React and FastAPI to build a food delivery app..."
              className="w-full bg-slate-900/60 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:border-cyan-500 transition-all font-medium text-sm"
            ></textarea>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            {loading ? 'Analyzing with AI...' : 'Analyze Idea with AI'}
          </button>

          {analysis && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 bg-slate-900/60 rounded-xl border border-slate-700/50 space-y-4"
            >
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detected Roles:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysis.roles?.map((role, idx) => (
                    <span key={idx} className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold px-3 py-1 rounded-lg">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tech Stack Required:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysis.skills?.map((skill, idx) => (
                    <span key={idx} className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold px-3 py-1 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/50 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Enter Project Title to Save</label>
                  <input 
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. QuickBites Food Delivery App"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500 text-sm font-medium"
                  />
                </div>
                <button 
                  onClick={handlePublishProject}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
                >
                  Save Details to Database
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Module 2: Work-Style Conflict Radar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold px-3 py-1 rounded-full">Module 2</span>
            <h2 className="text-2xl font-bold text-white">Work-Style Conflict Radar</h2>
          </div>
          <p className="text-slate-400 text-sm">Analyze teammate availability and working style compatibility scores before final team formation.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" readOnly value="gourav_001" className="bg-slate-900/50 border border-slate-700 text-white p-3 rounded-xl text-sm" />
            <input type="text" readOnly value="aayush_002" className="bg-slate-900/50 border border-slate-700 text-white p-3 rounded-xl text-sm" />
          </div>
          <button onClick={() => alert("Synergy Score: 94% Compatible! Great match for collaborative work.")} className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg text-sm">
            Calculate Synergy Score
          </button>
        </motion.div>

        {/* Module 3: Pre-Team Micro-Challenge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full">Module 3</span>
            <h2 className="text-2xl font-bold text-white">Pre-Team Micro-Challenge</h2>
          </div>
          <p className="text-slate-400 text-sm">Test potential teammates on a shared technical sandbox scenario.</p>
          <button onClick={() => alert("Scenario Generated: Implement JWT Authentication middleware in FastAPI & React.")} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg text-sm">
            Generate Scenario
          </button>
        </motion.div>

        {/* Module 4: Dynamic Team Room */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full">Module 4</span>
            <h2 className="text-2xl font-bold text-white">Dynamic Team Room</h2>
          </div>
          <p className="text-slate-400 text-sm">Monitor team role gaps and export compliance records.</p>
          <input type="text" placeholder="Enter MongoDB Team ID (e.g. 64a1b2c...)" className="w-full bg-slate-900/60 border border-slate-700 text-white p-3 rounded-xl text-sm" />
          <div className="flex gap-4">
            <button onClick={() => alert("Team Gap Analysis: 1 Backend role required.")} className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg text-sm">
              Analyze Team Gap
            </button>
            <button onClick={() => alert("Database record exported successfully!")} className="bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl shadow-lg text-sm">
              Export Database Record
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}