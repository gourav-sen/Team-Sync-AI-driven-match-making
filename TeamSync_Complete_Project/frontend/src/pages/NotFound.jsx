import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-6 relative overflow-hidden bg-grid">
      <div className="orb-cyan w-96 h-96 -top-48 -left-48" />
      <div className="orb-purple w-96 h-96 -bottom-48 -right-48" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-8xl sm:text-9xl font-black gradient-text mb-4"
        >
          404
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => navigate(-1)} className="btn-ghost text-sm">
            Go Back
          </button>
          <button onClick={() => navigate('/')} className="btn-primary text-sm">
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
