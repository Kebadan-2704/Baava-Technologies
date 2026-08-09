import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { uiSounds } from '../../utils/sounds';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am the Baava Tech Operations AI. How can I help you optimize your engineering workflows today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) uiSounds.clickOpen();
    else uiSounds.clickClose();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userMsg }]);
    setIsTyping(true);
    
    try {
      const prompt = encodeURIComponent(userMsg);
      const response = await fetch(`https://chatbot.codexapi.workers.dev/?prompt=${prompt}&model=gpt-5.1`);
      const data = await response.json();
      
      if (data && data.answer) {
        setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: data.answer }]);
        uiSounds.success();
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: "I'm having trouble connecting to my neural net right now. Please try again later." }]);
      uiSounds.error();
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-[340px] h-[480px] rounded-2xl glass-panel flex flex-col shadow-2xl overflow-hidden"
            style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between bg-surface-alt" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-warm)' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-elevated)' }}>
                  <Bot className="w-4 h-4" style={{ color: 'var(--color-primary-600)' }} />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Operations AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>Online</span>
                  </div>
                </div>
              </div>
              <button onClick={toggleChat} className="p-1.5 rounded-full hover:bg-black/5 transition-colors">
                <X className="w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide" style={{ background: 'var(--color-surface)' }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${msg.type === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                    style={msg.type === 'user' 
                      ? { background: 'var(--color-primary-600)', color: 'white' } 
                      : { background: 'var(--color-surface-elevated)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-subtle)' }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-elevated border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-elevated)' }}>
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-text-tertiary)' }} />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-text-tertiary)' }} />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-text-tertiary)' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t bg-surface-alt flex gap-2" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-warm)' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 bg-surface rounded-full px-4 py-2 text-[13px] outline-none border transition-colors shadow-inner"
                style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', borderColor: 'var(--color-border-subtle)' }}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50 transition-colors shadow-sm"
                style={{ background: 'var(--color-primary-600)', color: 'white' }}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(30,120,236,0.3)] flex items-center justify-center relative group overflow-hidden"
        style={{ background: 'var(--color-primary-600)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
