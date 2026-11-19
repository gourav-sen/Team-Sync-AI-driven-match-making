import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI-Powered Matching',
    desc: 'TF-IDF vectorization and cosine similarity analyze your skills to find the perfect teammates.',
    color: 'cyan',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'K-Means Team Clusters',
    desc: 'Machine learning clusters users into optimal teams based on skills and work-style compatibility.',
    color: 'purple',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Conflict Detection',
    desc: 'Synergy scoring identifies work-style mismatches before team formation to prevent conflicts.',
    color: 'amber',
  },
];

const stats = [
  { value: '3', label: 'ML Models', suffix: '' },
  { value: '94', label: 'Match Accuracy', suffix: '%' },
  { value: '500', label: 'Teams Formed', suffix: '+' },
  { value: '24', label: 'Avg Match Time', suffix: 'h' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1120] overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="orb-cyan w-[500px] h-[500px] -top-48 -left-48 animate-float" />
      <div className="orb-purple w-[600px] h-[600px] -bottom-64 -right-64 animate-float-delayed" />
      <div className="orb-pink w-[300px] h-[300px] top-1/2 left-1/3 animate-float" />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-6 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <span className="text-white font-black text-sm">TS</span>
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">TeamSync<span className="text-cyan-400">.</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors hidden sm:block"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary text-sm px-5 py-2.5"
          >
            Get Started Free
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 sm:pt-24 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 text-xs font-bold px-4 py-2 rounded-full border border-cyan-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Powered by 3 Machine Learning Models
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            Find Your Dream{' '}
            <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Teammates
            </span>
            <br />
            <span className="text-slate-400">with AI Precision</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            TeamSync uses TF-IDF analysis, cosine similarity matching, and K-Means clustering to intelligently
            match you with compatible teammates for hackathons, projects, and innovation challenges.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/login')} className="btn-primary text-base px-10 py-4 w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                Start Matching
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button onClick={() => navigate('/login')} className="btn-ghost text-base px-10 py-4 w-full sm:w-auto">
              View Demo
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.4)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center group hover:border-cyan-500/30 transition-all duration-500">
              <div className="text-3xl sm:text-4xl font-black text-white mb-1 group-hover:gradient-text transition-all">
                {stat.value}
                <span className="text-cyan-400">{stat.suffix}</span>
              </div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="tag-cyan mb-4 inline-block">How it works</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
            ML-Powered Team Intelligence
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Three machine learning models work together to analyze, match, and cluster your ideal team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 + i * 0.1)}
              className="glass-card-hover p-8 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                feature.color === 'cyan'
                  ? 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:shadow-lg group-hover:shadow-cyan-500/10'
                  : feature.color === 'purple'
                  ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:shadow-lg group-hover:shadow-purple-500/10'
                  : 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 group-hover:shadow-lg group-hover:shadow-amber-500/10'
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          {...fadeUp(0)}
          className="glass-card p-10 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="orb-cyan w-64 h-64 -top-32 -right-32" />
          <div className="orb-purple w-48 h-48 -bottom-24 -left-24" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Build Your Dream Team?
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
              Join hundreds of students using AI to find the perfect teammates for their next big project.
            </p>
            <button onClick={() => navigate('/login')} className="btn-primary text-base px-10 py-4">
              Get Started Now — It's Free
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-black text-[8px]">TS</span>
            </div>
            TeamSync AI — MCA AIML Project
          </div>
          <p className="text-slate-600 text-xs">Built with React, FastAPI, MongoDB & Scikit-Learn</p>
        </div>
      </footer>
    </div>
  );
}
