import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login({ setAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("auth", "true");
    setAuth(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-800 p-10 rounded-xl shadow-2xl w-96 border border-slate-700">
        <h2 className="text-3xl font-extrabold text-center text-indigo-400 mb-8">TeamSync AI</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-600 bg-slate-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-slate-600 bg-slate-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your password" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300">Sign In</button>
        </form>
      </motion.div>
    </div>
  );
}