import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, X, Send, Sparkles, Activity, Wind, Droplets, Thermometer, BrainCircuit, Mic } from 'lucide-react';
import { ChatMessage, Sender } from '../types';
import { SPORCBOT_CONTEXT, generateSporcbotResponse, playClickSound, playReceiveSound, SPORCBOT_FAQ } from '../constants';
import Button from './Button';

const Sporcbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Initial Greeting when opened first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: ChatMessage = {
        id: 'init-1',
        sender: 'bot',
        text: `Hello. I am Sporcbot, monitoring Chamber ${SPORCBOT_CONTEXT.chamberId}. \n\nI've detected critical deviations in CO2 and Humidity for the current ${SPORCBOT_CONTEXT.variety} pinning phase. \n\nHow can I help you resolve this?`,
        timestamp: new Date()
      };
      setMessages([greeting]);
      playReceiveSound();
    }
  }, [isOpen]);

  const toggleOpen = () => {
    playClickSound();
    if (isOpen) {
      // Reset messages when closing the chat
      setMessages([]);
      setIsTyping(false);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    playClickSound();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const responseText = generateSporcbotResponse(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      playReceiveSound();
    }, 1200 + Math.random() * 800); // Random delay between 1.2s and 2s
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          onClick={toggleOpen}
          aria-label="Open Sporcbot"
          className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-green-400/40 dark:shadow-green-900/40 flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={{ scale: 0.95 }}
        >
          <Bot className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </motion.button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-end sm:justify-end sm:p-6 pointer-events-none">
          {/* Overlay to close */}
          <div className="absolute inset-0 bg-black/20 pointer-events-auto sm:hidden" onClick={toggleOpen}></div>
          
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="bg-white dark:bg-gray-800 w-full sm:w-[400px] h-[85vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden pointer-events-auto"
          >
            
            {/* Header */}
            <div className="p-4 bg-primary text-white flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    Sporcbot AI
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/20 font-mono">BETA</span>
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    <p className="text-xs text-green-100">Online • Chamber {SPORCBOT_CONTEXT.chamberId}</p>
                  </div>
                </div>
              </div>
              <button onClick={toggleOpen} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Context Banner */}
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 flex justify-between items-center border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
               <div className="flex gap-3">
                 <span className="flex items-center gap-1"><Thermometer className="w-3 h-3" /> {SPORCBOT_CONTEXT.sensors.temp}°C</span>
                 <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> {SPORCBOT_CONTEXT.sensors.humidity}%</span>
                 <span className="flex items-center gap-1 text-alert-red font-bold animate-pulse"><Wind className="w-3 h-3" /> {SPORCBOT_CONTEXT.sensors.co2} PPM</span>
               </div>
               <span className="uppercase font-bold text-primary">{SPORCBOT_CONTEXT.phase}</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 dark:bg-gray-900/50 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm relative
                    ${msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-600'}
                  `}>
                    {msg.sender === 'bot' && (
                       <Sparkles className="w-3 h-3 text-primary absolute -top-1.5 -left-1.5 bg-white dark:bg-gray-800 rounded-full" />
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className={`text-[10px] block mt-1 opacity-70 ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-600 shadow-sm flex gap-1 items-center">
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                   </div>
                </div>
              )}

              {/* Suggested prompts (FAQ) - show after greeting */}
              {messages.length === 1 && !isTyping && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {SPORCBOT_FAQ.slice(0, 6).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setInput(item.q); handleSend(); }}
                      className="text-left px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              )}

              {/* Show FAQ after each bot response (excluding initial greeting) */}
              {messages.length > 1 && messages.length % 2 === 0 && !isTyping && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {SPORCBOT_FAQ.slice(0, 6).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setInput(item.q); handleSend(); }}
                      className="text-left px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about CO2, humidity, tasks..."
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                autoFocus
              />
              <button 
                type="button"
                onClick={() => playClickSound()}
                className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all"
                aria-label="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="bg-primary text-white p-3 rounded-xl hover:bg-green-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-green-200 dark:shadow-none"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sporcbot;