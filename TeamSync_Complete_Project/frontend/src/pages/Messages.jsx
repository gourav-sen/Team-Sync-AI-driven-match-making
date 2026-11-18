import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Messages() {
  const [activeChat, setActiveChat] = useState('Harsh');
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState({
    Harsh: [],
    Aditya: []
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setChatMessages({
      ...chatMessages,
      [activeChat]: [...chatMessages[activeChat], { sender: 'You', text: messageText }]
    });
    setMessageText('');
  };

  return (
    <div className="min-h-screen bg-[#0B1120] p-8 font-sans text-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8 tracking-tight"
        >
          Team Messages & Chats
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden h-[600px]">
          
          <div className="border-r border-slate-700/50 p-4 space-y-3 bg-slate-900/30">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-4">Conversations</h2>
            
            {['Harsh', 'Aditya'].map((name) => (
              <div 
                key={name}
                onClick={() => setActiveChat(name)}
                className={`p-4 rounded-xl cursor-pointer transition-all flex items-center justify-between ${activeChat === name ? 'bg-purple-600/20 border border-purple-500/40 text-white' : 'hover:bg-slate-800/50 text-slate-400'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{name}</h4>
                    <p className="text-xs text-slate-400 truncate w-32">Select to chat</p>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              </div>
            ))}
          </div>

          <div className="col-span-2 flex flex-col justify-between bg-slate-900/20">
            <div className="p-6 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                  {activeChat[0]}
                </div>
                <div>
                  <h3 className="font-bold text-white">{activeChat}</h3>
                  <span className="text-xs text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online</span>
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {chatMessages[activeChat].length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <p>No messages yet. Start a conversation below.</p>
                </div>
              ) : (
                chatMessages[activeChat].map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md p-4 rounded-2xl text-sm ${msg.sender === 'You' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none shadow-lg shadow-purple-500/10' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700/50 bg-slate-800/20 flex gap-4">
              <input 
                type="text"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1 bg-slate-900/60 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all text-sm"
              />
              <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all">
                Send
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}