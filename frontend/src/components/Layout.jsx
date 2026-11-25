import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  FolderKanban, 
  MessageSquare, 
  UserCircle, 
  Zap 
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export default function Layout() {
  const [apiOnline, setApiOnline] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkApi = async () => {
      try {
        await axios.get(`${API_BASE_URL}/api/health`, { timeout: 3000 });
        setApiOnline(true);
      } catch (err) {
        setApiOnline(false);
      }
    };
    checkApi();
    const interval = setInterval(checkApi, 10000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'AI Workspace', path: '/workspace', icon: Sparkles, highlight: true },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Profile', path: '/profile', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] font-sans text-slate-200 selection:bg-cyan-500/30">
      {/* Top Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-white">TeamSync</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    AI 2.0
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Neural Team Matchmaker</p>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.path === '/' 
                  ? location.pathname === '/' || location.pathname === '/dashboard'
                  : location.pathname === item.path;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? item.highlight 
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-pink-300 border border-purple-500/40 shadow-sm'
                          : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? (item.highlight ? 'text-pink-400' : 'text-cyan-400') : 'text-slate-400'}`} />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>

            {/* Right Status & Profile */}
            <div className="flex items-center gap-4">
              {/* API Health Pill */}
              <div 
                className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                  apiOnline === true
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : apiOnline === false
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
                title={apiOnline ? `FastAPI Backend Online (${API_BASE_URL})` : `Connecting to ${API_BASE_URL}...`}
              >
                <span className={`w-2 h-2 rounded-full ${apiOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span>{apiOnline ? 'API Online' : 'Connecting API...'}</span>
              </div>

              {/* Profile Avatar Quick Link */}
              <Link 
                to="/profile" 
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  GS
                </div>
                <span className="hidden lg:inline text-xs font-semibold text-slate-300">Gourav Sen</span>
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}