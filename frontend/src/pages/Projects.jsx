import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { FolderKanban, Plus, Sparkles, ArrowRight, Tag, Layers, RefreshCw } from 'lucide-react';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      if (res.data && res.data.length > 0) {
        setProjects(res.data);
      } else {
        setProjects([
          {
            id: 'default_1',
            title: 'TeamSync AI Platform',
            description: 'An AI-powered innovation matchmaking platform that analyzes users skills, interests, and project experiences to recommend suitable teammates.',
            roles: ['Full Stack Developer', 'AI Engineer', 'Product Designer'],
            skills: ['Python', 'FastAPI', 'Machine Learning', 'React', 'MongoDB']
          }
        ]);
      }
    } catch (err) {
      console.log('Using default projects showcase');
      setProjects([
        {
          id: 'default_1',
          title: 'TeamSync AI Platform',
          description: 'An AI-powered innovation matchmaking platform that analyzes users skills, interests, and project experiences to recommend suitable teammates.',
          roles: ['Full Stack Developer', 'AI Engineer', 'Product Designer'],
          skills: ['Python', 'FastAPI', 'Machine Learning', 'React', 'MongoDB']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 tracking-tight flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-cyan-400" />
            Project Repository
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Projects analyzed, saved, and active in the TeamSync ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={fetchProjects}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Refresh Projects"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/workspace')}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create In Workspace
          </motion.button>
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-cyan-400" />
          <p className="text-sm font-medium">Fetching projects from MongoDB...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-800/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/40 transition-all shadow-xl group space-y-5"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                    {project.title}
                  </h2>
                  <span className="text-[11px] text-slate-500 font-mono">ID: {project.id}</span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
                {project.description}
              </p>

              {/* Roles */}
              {project.roles && project.roles.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Target Engineering Roles:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.roles.map((role, idx) => (
                      <span key={idx} className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold px-3 py-1 rounded-lg">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {project.skills && project.skills.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-purple-400" />
                    Required Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-900/80 text-purple-300 text-xs font-semibold px-3 py-1 rounded-lg border border-purple-500/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-wrap gap-3">
                <button 
                  onClick={() => navigate('/workspace')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2 text-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  Match Teammates for this Idea
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}