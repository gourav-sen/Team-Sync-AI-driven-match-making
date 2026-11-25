import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, CheckCheck, Circle } from 'lucide-react';

export default function Messages() {
  const [activeChat, setActiveChat] = useState('Aayush Raj');
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState({
    'Aayush Raj': [
      { sender: 'Aayush Raj', text: 'Hey Gourav! Saw your task management project idea in the workspace. I have hands-on React & Tailwind experience, would love to collaborate on the frontend!' },
      { sender: 'You', text: 'Hi Aayush! That would be fantastic. Have you worked with real-time WebSockets or server-sent events?' },
      { sender: 'Aayush Raj', text: 'Yes, built real-time notifications in my previous project. Let’s do this!' }
    ],
    'Harsh': [
      { sender: 'Harsh', text: 'Hello Gourav! I saw the ML Synergy score between our profiles is 91%. I can handle the Python and SQL data pipeline.' }
    ],
    'Aditya Singh': [
      { sender: 'Aditya Singh', text: 'Hey Gourav, I saw the micro-challenge scenario in the Innovation Workspace. I can help set up the FastAPI microservices.' }
    ]
  });

  const teammates = [
    { name: 'Aayush Raj', role: 'Frontend Developer', status: 'Online', unread: 0 },
    { name: 'Harsh', role: 'Backend Developer', status: 'Online', unread: 1 },
    { name: 'Aditya Singh', role: 'AI & FastAPI Engineer', status: 'Away', unread: 1 },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setChatMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), { sender: 'You', text: messageText }]
    }));
    setMessageText('');
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 tracking-tight flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-purple-400" />
          Teammate Channels & Messages
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Direct communication channels with AI-matched teammates and project partners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden h-[620px]">
        
        {/* Left Conversations Sidebar */}
        <div className="border-r border-slate-700/50 p-4 space-y-3 bg-slate-900/40 overflow-y-auto">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">
            Active Collaborators
          </h2>
          
          {teammates.map((member) => (
            <div 
              key={member.name}
              onClick={() => setActiveChat(member.name)}
              className={`p-3.5 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                activeChat === member.name 
                  ? 'bg-purple-600/20 border border-purple-500/40 text-white shadow-sm' 
                  : 'hover:bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {member.name[0]}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${member.status === 'Online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{member.name}</h4>
                  <p className="text-[11px] text-slate-400 truncate w-32">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Chat Thread */}
        <div className="col-span-2 flex flex-col justify-between bg-slate-900/30">
          
          {/* Active Chat Header */}
          <div className="p-4 sm:p-5 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                {activeChat[0]}
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{activeChat}</h3>
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active in TeamSync Channel
                </span>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
            {(!chatMessages[activeChat] || chatMessages[activeChat].length === 0) ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
                <p>No messages yet. Send a message to initiate collaboration.</p>
              </div>
            ) : (
              chatMessages[activeChat].map((msg, index) => {
                const isMe = msg.sender === 'You';
                return (
                  <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md p-4 rounded-2xl text-sm leading-relaxed ${
                      isMe 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none shadow-lg shadow-purple-500/10' 
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/60'
                    }`}>
                      <p className="font-semibold text-[11px] mb-1 opacity-75">{msg.sender}</p>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700/50 bg-slate-800/30 flex gap-3">
            <input 
              type="text"
              placeholder={`Message ${activeChat}...`}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 bg-slate-900/80 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all text-sm font-medium"
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}