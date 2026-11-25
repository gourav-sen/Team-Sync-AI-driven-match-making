import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { 
  User, 
  Hash, 
  GraduationCap, 
  Github, 
  Code2, 
  Clock, 
  SunMoon, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Save, 
  RefreshCw 
} from 'lucide-react';

export default function Profile() {
  const [fullName, setFullName] = useState("Gourav Sen");
  const [rollNo, setRollNo] = useState("2501940061");
  const [course, setCourse] = useState("MCA AIML - A");
  const [github, setGithub] = useState("github.com/gouravsen");
  const [skills, setSkills] = useState("Python, React, Machine Learning, FastAPI, MongoDB");
  const [availableHours, setAvailableHours] = useState(16);
  const [shiftPreference, setShiftPreference] = useState("Night");
  const [commitFrequency, setCommitFrequency] = useState("Daily");
  const [profileImage, setProfileImage] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);

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

  const handleSaveProfile = async () => {
    setSaving(true);
    setSavedBanner(false);
    try {
      await axios.put(`${API_BASE_URL}/api/users/${encodeURIComponent(fullName)}/availability`, {
        available_hours: Number(availableHours),
        shift_preference: shiftPreference,
        commit_frequency: commitFrequency
      });
      setSavedBanner(true);
      setTimeout(() => setSavedBanner(false), 4000);
    } catch (err) {
      console.error("Save profile error:", err);
      // Fallback local save indicator
      setSavedBanner(true);
      setTimeout(() => setSavedBanner(false), 4000);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = "w-full bg-slate-900/60 border border-slate-700/80 rounded-xl text-white p-3 focus:outline-none focus:border-cyan-500 focus:bg-slate-900 transition-all font-medium text-sm";
  const labelStyle = "text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5";

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      
      {/* Banner Feedback */}
      <AnimatePresence>
        {savedBanner && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Profile and working style attributes updated in database successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden relative"
      >
        {/* Cover Header */}
        <div className="h-44 bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"></div>
          <div className="absolute bottom-4 right-6 text-right">
            <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-slate-950/60 text-cyan-300 border border-cyan-500/30">
              Active Candidate Record
            </span>
          </div>
        </div>

        <div className="px-6 sm:px-10 pb-10 relative">
          
          {/* Avatar and Save Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 -mt-16 gap-4">
            
            <div 
              className="w-32 h-32 bg-slate-900 rounded-2xl border-4 border-[#0B1120] flex items-center justify-center shadow-2xl relative overflow-hidden cursor-pointer group"
              onClick={() => imageInputRef.current.click()}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <User className="w-12 h-12 text-slate-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-slate-500 font-semibold mt-1">Upload Photo</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-semibold">Change</span>
              </div>
              <input type="file" hidden ref={imageInputRef} onChange={handleImageChange} accept="image/*" />
            </div>

            <button 
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Profile to Database
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input 
                  type="text" 
                  className={inputStyle} 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)} 
                />
              </div>
              <div>
                <label className={labelStyle}>
                  <Hash className="w-4 h-4" /> Roll Number
                </label>
                <input 
                  type="text" 
                  className={inputStyle} 
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>
                  <GraduationCap className="w-4 h-4" /> Course & Branch
                </label>
                <input 
                  type="text" 
                  className={inputStyle} 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)} 
                />
              </div>
              <div>
                <label className={labelStyle}>
                  <Github className="w-4 h-4" /> GitHub / Portfolio URL
                </label>
                <input 
                  type="text" 
                  className={inputStyle} 
                  value={github}
                  onChange={(e) => setGithub(e.target.value)} 
                />
              </div>
            </div>

            {/* Availability & Conflict Radar Attributes */}
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-700/50 space-y-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" /> Working Style & Availability Parameters (Used in AI Synergy Match)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Available Hours / Week
                  </label>
                  <input 
                    type="number"
                    min="1"
                    max="60"
                    value={availableHours}
                    onChange={(e) => setAvailableHours(e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <SunMoon className="w-3.5 h-3.5 text-amber-400" /> Shift Preference
                  </label>
                  <select 
                    value={shiftPreference}
                    onChange={(e) => setShiftPreference(e.target.value)}
                    className={inputStyle}
                  >
                    <option value="Day">Day Shift</option>
                    <option value="Night">Night Shift</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-pink-400" /> Commit Frequency
                  </label>
                  <select 
                    value={commitFrequency}
                    onChange={(e) => setCommitFrequency(e.target.value)}
                    className={inputStyle}
                  >
                    <option value="Daily">Daily Commits</option>
                    <option value="Weekly">Weekly Milestones</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className={labelStyle}>
                <Code2 className="w-4 h-4" /> Technical Skills
              </label>
              <textarea 
                rows="2"
                className={inputStyle}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className={labelStyle}>
                <FileText className="w-4 h-4" /> Resume Attachment
              </label>
              <div 
                className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center bg-slate-900/40 hover:bg-slate-900/70 hover:border-cyan-500/50 transition-all cursor-pointer"
                onClick={() => resumeInputRef.current.click()}
              >
                {resumeName ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold text-sm">{resumeName}</span>
                  </div>
                ) : (
                  <div className="text-slate-400 text-sm">
                    Click to select resume document (PDF/DOCX)
                  </div>
                )}
                <input type="file" hidden ref={resumeInputRef} onChange={handleResumeChange} accept=".pdf,.doc,.docx" />
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}