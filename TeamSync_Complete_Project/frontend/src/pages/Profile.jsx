import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [saved, setSaved] = useState(false);
  const imageInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeName(file.name);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      <div className="orb-purple w-80 h-80 -top-40 -right-40 opacity-40" />
      <div className="orb-cyan w-60 h-60 -bottom-20 -left-20 opacity-30" />

      <motion.div {...fadeUp(0)} className="glass-card overflow-hidden">
        {/* Cover */}
        <div className="h-40 sm:h-52 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>

        <div className="px-6 sm:px-10 pb-10 relative">
          {/* Avatar + Save button row */}
          <div className="flex justify-between items-end mb-10 -mt-16">
            <motion.div
              {...fadeUp(0.1)}
              className="w-28 h-28 sm:w-32 sm:h-32 bg-slate-800 rounded-full border-4 border-[#0B1120] flex items-center justify-center shadow-2xl relative overflow-hidden cursor-pointer group"
              onClick={() => imageInputRef.current.click()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-black text-3xl">GS</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input type="file" hidden ref={imageInputRef} onChange={handleImageChange} accept="image/*" />
            </motion.div>

            <motion.button
              {...fadeUp(0.2)}
              onClick={handleSave}
              className={`text-sm flex items-center gap-2 font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ${
                saved
                  ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                  : 'btn-secondary'
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {saved ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Profile
                </>
              )}
            </motion.button>
          </div>

          {/* Form */}
          <div className="space-y-8">
            {/* Name + Roll */}
            <motion.div {...fadeUp(0.15)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                </label>
                <input type="text" className="input-field text-base font-medium" defaultValue="Gourav Sen" />
              </div>
              <div>
                <label className="label">
                  <span className="text-sm font-bold">#</span>
                  Roll Number
                </label>
                <input type="text" className="input-field text-base font-medium" defaultValue="2501940061" />
              </div>
            </motion.div>

            {/* Course + GitHub */}
            <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Course & Branch
                </label>
                <input type="text" className="input-field text-base font-medium" defaultValue="MCA AIML — Section A" />
              </div>
              <div>
                <label className="label">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </label>
                <input type="text" className="input-field text-base font-medium" defaultValue="github.com/gouravsen" />
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div {...fadeUp(0.25)}>
              <label className="label">Technical Skills</label>
              <textarea
                className="input-field resize-none h-24 text-base font-medium"
                defaultValue="Python, React, Machine Learning, FastAPI, MongoDB, Scikit-Learn, TailwindCSS"
              />
              <p className="text-xs text-slate-500 mt-2">Separate skills with commas. These are used by the AI matchmaking model.</p>
            </motion.div>

            {/* Resume */}
            <motion.div {...fadeUp(0.3)}>
              <label className="label">Resume Upload</label>
              <div
                className="border-2 border-dashed border-slate-700/60 rounded-xl p-8 text-center bg-slate-900/30 hover:bg-slate-800/40 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group"
                onClick={() => resumeInputRef.current.click()}
              >
                {resumeName ? (
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-emerald-400 font-semibold text-sm">{resumeName}</p>
                    <p className="text-slate-500 text-xs">Click to change file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                      Click to upload your resume
                    </p>
                    <p className="text-slate-600 text-xs">PDF or DOCX — max 10MB</p>
                  </div>
                )}
              </div>
              <input type="file" hidden ref={resumeInputRef} onChange={handleResumeChange} accept=".pdf,.doc,.docx" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
