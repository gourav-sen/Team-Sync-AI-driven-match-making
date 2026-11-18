import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [resumeName, setResumeName] = useState("");

  const imageInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
    }
  };

  const inputStyle = "w-full bg-slate-900/50 border-b border-slate-700 text-white p-3 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/50 transition-all font-medium text-lg";
  const labelStyle = "text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-[#0B1120] p-8 font-sans text-slate-200">
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden relative"
        >
          <div className="h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="px-10 pb-10 relative">
            
            <div className="flex justify-between items-end mb-12 -mt-16">
              
              <div 
                className="w-32 h-32 bg-slate-800 rounded-full border-4 border-slate-800 flex items-center justify-center shadow-xl relative overflow-hidden cursor-pointer group"
                onClick={() => imageInputRef.current.click()}
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-slate-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-semibold">Change</span>
                </div>
                <input type="file" hidden ref={imageInputRef} onChange={handleImageChange} accept="image/*" />
              </div>

              <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
                Save Profile
              </button>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelStyle}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Full Name
                  </label>
                  <input type="text" className={inputStyle} defaultValue="Gourav Sen" />
                </div>
                <div>
                  <label className={labelStyle}>
                    <span className="text-sm">#</span> Roll Number
                  </label>
                  <input type="text" className={inputStyle} defaultValue="2501940061" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelStyle}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    Course & Branch
                  </label>
                  <input type="text" className={inputStyle} defaultValue="MCA AIML - A" />
                </div>
                <div>
                  <label className={labelStyle}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                    GitHub Profile
                  </label>
                  <input type="text" className={inputStyle} defaultValue="github.com/gouravsen" />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Technical Skills (Comma Separated)</label>
                <textarea 
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:border-cyan-500 focus:bg-slate-800/50 transition-all font-medium text-lg h-24"
                  defaultValue="Python, React, Machine Learning, FastAPI"
                ></textarea>
              </div>

              <div>
                <label className={labelStyle}>Resume Upload</label>
                <div 
                  className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center bg-slate-900/30 hover:bg-slate-800/50 hover:border-cyan-500/50 transition-all cursor-pointer"
                  onClick={() => resumeInputRef.current.click()}
                >
                  {resumeName ? (
                    <>
                      <svg className="w-8 h-8 text-emerald-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p className="text-emerald-400 font-semibold">{resumeName}</p>
                      <p className="text-slate-500 text-xs mt-1">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      <p className="text-slate-400 text-sm">Click to upload your resume (PDF/DOCX)</p>
                    </>
                  )}
                </div>
                <input type="file" hidden ref={resumeInputRef} onChange={handleResumeChange} accept=".pdf,.doc,.docx" />
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}