import { Outlet, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderKanban, MessageSquare, UserCircle, LogOut } from 'lucide-react';

export default function Layout({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <span className="text-2xl font-bold tracking-tight">TeamSync</span>
              <div className="hidden md:flex space-x-4">
                <Link to="/" className="flex items-center gap-2 hover:bg-indigo-500 px-3 py-2 rounded-md transition"><LayoutDashboard size={18}/> Dashboard</Link>
                <Link to="/projects" className="flex items-center gap-2 hover:bg-indigo-500 px-3 py-2 rounded-md transition"><FolderKanban size={18}/> Projects</Link>
                <Link to="/messages" className="flex items-center gap-2 hover:bg-indigo-500 px-3 py-2 rounded-md transition"><MessageSquare size={18}/> Messages</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 hover:text-indigo-200 transition"><UserCircle size={24}/></Link>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm transition"><LogOut size={16}/> Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}