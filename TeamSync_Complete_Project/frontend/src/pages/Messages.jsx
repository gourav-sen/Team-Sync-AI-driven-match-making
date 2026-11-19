import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const contacts = [
  { name: 'Harsh Kumar', role: 'Backend Developer', avatar: 'HK', status: 'online', color: 'from-purple-500 to-pink-600' },
  { name: 'Aditya Singh', role: 'AI Engineer', avatar: 'AS', status: 'online', color: 'from-cyan-500 to-blue-600' },
  { name: 'Aayush Raj', role: 'Frontend Developer', avatar: 'AR', status: 'away', color: 'from-amber-500 to-orange-600' },
];

const initialMessages = {
  'Harsh Kumar': [
    { sender: 'Harsh Kumar', text: 'Hey! I saw your project on TeamSync. The FastAPI backend looks great!', time: '10:30 AM' },
    { sender: 'Harsh Kumar', text: 'I can help with the Django integration if you need it.', time: '10:32 AM' },
  ],
  'Aditya Singh': [
    { sender: 'Aditya Singh', text: 'The ML model training is complete. K-Means clustering results look promising!', time: '9:15 AM' },
  ],
  'Aayush Raj': [],
};

export default function Messages() {
  const [activeChat, setActiveChat] = useState('Harsh Kumar');
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMsg = { sender: 'You', text: messageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg],
    }));
    setMessageText('');
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const activeContact = contacts.find((c) => c.name === activeChat);

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="orb-purple w-80 h-80 -top-40 -right-40 opacity-40" />

      <motion.div {...fadeUp(0)} className="mb-6">
        <h1 className="text-3xl font-extrabold gradient-text-pink tracking-tight">Messages</h1>
        <p className="text-sm text-slate-400 mt-1">Chat with your team in real-time</p>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="glass-card overflow-hidden flex" style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}>
        {/* Sidebar */}
        <div className="w-80 border-r border-slate-700/40 flex flex-col bg-slate-900/30 hidden sm:flex">
          <div className="p-4">
            <div className="relative">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="input-field pl-10 py-2.5 text-xs"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {filteredContacts.map((contact) => {
              const lastMsg = chatMessages[contact.name]?.slice(-1)[0];
              const unread = contact.name === 'Harsh Kumar' && activeChat !== 'Harsh Kumar';
              return (
                <button
                  key={contact.name}
                  onClick={() => setActiveChat(contact.name)}
                  className={`w-full p-3 rounded-xl transition-all duration-300 flex items-center gap-3 text-left ${
                    activeChat === contact.name
                      ? 'bg-purple-500/15 border border-purple-500/30'
                      : 'hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                      {contact.avatar}
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                      contact.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white truncate">{contact.name}</span>
                      {lastMsg && <span className="text-[10px] text-slate-500">{lastMsg.time}</span>}
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : contact.role}
                    </p>
                  </div>
                  {unread && (
                    <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="px-6 py-4 border-b border-slate-700/40 flex items-center justify-between bg-slate-800/20">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeContact?.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                {activeContact?.avatar}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{activeChat}</h3>
                <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeContact?.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  {activeContact?.status === 'online' ? 'Online' : 'Away'}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">{activeContact?.role}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages[activeChat]?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-slate-500 text-sm mb-1">No messages yet</p>
                <p className="text-slate-600 text-xs">Start a conversation with {activeChat}</p>
              </div>
            ) : (
              <AnimatePresence>
                {chatMessages[activeChat].map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] ${msg.sender === 'You' ? '' : 'flex items-end gap-2'}`}>
                      {msg.sender !== 'You' && (
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${activeContact?.color} flex items-center justify-center text-white font-bold text-[8px] flex-shrink-0 mb-1`}>
                          {activeContact?.avatar}
                        </div>
                      )}
                      <div>
                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.sender === 'You'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md shadow-lg shadow-purple-500/10'
                            : 'bg-slate-800/80 text-slate-200 rounded-bl-md border border-slate-700/50'
                        }`}>
                          {msg.text}
                        </div>
                        <span className={`text-[10px] text-slate-600 mt-1 block ${msg.sender === 'You' ? 'text-right' : ''}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700/40 bg-slate-800/20 flex gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="input-field flex-1"
            />
            <button
              type="submit"
              className="btn-secondary text-sm px-5 flex items-center gap-2 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
