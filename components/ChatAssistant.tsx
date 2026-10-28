import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { CUSTOMER_DATA, RISK_TABLE_DATA, POLICY_CHECKS, REPORT_DATA, DECISION_RECOMMENDATION } from '../constants';
import { OrchestrationState } from '../types';

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-400">
      {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
    </button>
  );
};

interface ChatAssistantProps {
  orchestration: OrchestrationState;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ orchestration }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: `Hello! I am your Underwriting Assistant. I have full real-time access to ${CUSTOMER_DATA.name}'s application file, Creditinfo bureau reports, and GBTI multi-agent risk calculations. How can I assist your review?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasSummarized, setHasSummarized] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (orchestration.isComplete && orchestration.consolidatedSummary && !hasSummarized) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `**Orchestration Complete.** Key Takeaway for Underwriter:\n\n${orchestration.consolidatedSummary}\n\nYou can ask about DBR/FOIR sensitivity, property title validation, or restructured sanction terms.` 
      }]);
      setHasSummarized(true);
    }
  }, [orchestration.isComplete, orchestration.consolidatedSummary, hasSummarized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-2.5-flash";
      
      const context = {
        applicant: CUSTOMER_DATA,
        riskParameters: RISK_TABLE_DATA,
        policyChecks: POLICY_CHECKS,
        reports: REPORT_DATA,
        initialDecision: DECISION_RECOMMENDATION,
        orchestrationResults: orchestration.agents.map(a => ({ name: a.agentName, output: a.output })),
        finalSummary: orchestration.consolidatedSummary
      };

      const systemInstruction = `
        You are an expert AI Underwriting Assistant for GBTI Bank credit analysts and underwriters.
        You have full access to ${CUSTOMER_DATA.name}'s mortgage file and agent evaluation:
        ${JSON.stringify(context, null, 2)}

        Guidelines:
        1. Speak in a conversational, explainable, and supportive tone that empowers the underwriter.
        2. Deliver clear Key Takeaways and concise rationale.
        3. Highlight that the final approval authority rests with the underwriter in line with Bank of Guyana prudential guidelines.
      `;

      const chat = ai.chats.create({
        model: model,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      const assistantMessage = response.text || "I'm sorry, I couldn't process that request.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the AI inference service. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What is the Key Takeaway for this case?",
    "Review GBTI KYC and GECOM ID status",
    "Check property legal search & valuation",
    "Explain FOIR / DBR policy compliance"
  ];

  const handleSuggestedClick = (q: string) => {
    setInput(q);
    setTimeout(() => {
      const sendBtn = document.getElementById('chat-send-btn');
      sendBtn?.click();
    }, 10);
  };

  return (
    <>
      {/* Floating Action Button - Newgen Orange Primary Accent */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-3.5 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center gap-2 cursor-pointer ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } bg-[#F26522] hover:bg-[#d85213] text-white group`}
      >
        <MessageSquare size={20} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-xs">
          AI Underwriting Copilot
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[420px] h-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 z-50 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-3.5 bg-[#0B3564] text-white rounded-t-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-bold text-xs uppercase tracking-tight">AI Underwriting Copilot</h3>
              <div className="flex items-center gap-1.5 text-[10px] text-blue-200">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span>Active File: {CUSTOMER_DATA.name}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setMessages([{ role: 'assistant', content: `Hello! I am your Underwriting Assistant. I have full real-time access to ${CUSTOMER_DATA.name}'s application file. How can I assist your review?` }])}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white"
              title="Reset Conversation"
            >
              <RefreshCw size={14} />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-slate-300 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-slate-50/50">
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-2 mb-3">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedClick(q)}
                  className="p-2 bg-white border border-slate-200/80 rounded-lg text-[10px] text-[#0B3564] hover:bg-blue-50/60 transition-colors text-left font-medium shadow-2xs cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`mt-1 p-1 rounded-md shrink-0 ${
                  msg.role === 'user' ? 'bg-[#0B3564] text-white' : 'bg-white border border-slate-200 text-slate-600 shadow-2xs'
                }`}>
                  {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                </div>
                <div className={`p-2.5 rounded-xl text-xs leading-relaxed shadow-2xs relative group/msg ${
                  msg.role === 'user' 
                    ? 'bg-[#0B3564] text-white rounded-tr-xs' 
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.role === 'assistant' && (
                    <div className="absolute -bottom-5 right-0 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                      <CopyButton text={msg.content} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[85%]">
                <div className="mt-1 p-1 rounded-md shrink-0 bg-white border border-slate-200 text-slate-400">
                  <Bot size={13} />
                </div>
                <div className="p-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl rounded-tl-xs flex items-center gap-2 text-xs shadow-2xs">
                  <Loader2 size={13} className="animate-spin text-[#0B3564]" />
                  <span>Synthesizing underwriting response...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 bg-white rounded-b-2xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question about this application..."
              className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-[#0B3564] focus:border-[#0B3564] transition-all"
            />
            <button
              id="chat-send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 p-1.5 bg-[#F26522] text-white rounded-[4px] hover:bg-[#d85213] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send size={13} />
            </button>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-400 font-medium px-1">
            <span>Enterprise Underwriting AI</span>
            <span className="flex items-center gap-1">
              <Sparkles size={10} className="text-amber-500" />
              Powered by Gemini 2.5
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;
