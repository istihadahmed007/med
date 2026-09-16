import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  ShieldCheck, 
  AlertCircle, 
  Bot, 
  User, 
  Globe, 
  CheckCircle2, 
  ExternalLink,
  Info
} from 'lucide-react';
import { ApiService } from '../../services/apiService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  visualFlowchart?: string[];
  citations?: string[];
  isConfigured?: boolean;
}

export const AiTutorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'tutor',
      text: 'Good day! I am your MedX Grounded AI Medical Tutor. I assist with BM&DC curriculum concepts, conceptual flowcharts, and high-yield exam points based strictly on verified curriculum lessons and accredited textbooks (Davidson, Guyton, Robbins, Katzung). How can I assist your studies today?',
      citations: [
        'BM&DC National MBBS Syllabus (2020/2026)',
        'Davidson\'s Principles and Practice of Medicine 24th ed.',
        'Robbins & Cotran Pathologic Basis of Disease 10th ed.',
        'Guyton and Hall Textbook of Medical Physiology 14th ed.'
      ]
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await ApiService.askAiTutor(userText, language);
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: response.answer,
        visualFlowchart: response.visualCascade,
        citations: response.citations,
        isConfigured: response.isConfigured
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: language === 'bn'
          ? 'দুঃখিত, তথ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে ডেভিডসন বা গাইটন পাঠ্যবই অনুসরণ করুন।'
          : 'Unable to complete evidence retrieval. Please refer directly to BM&DC curriculum textbooks.',
        citations: ['BM&DC National Curriculum (2020/2026)']
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              Grounded AI Medical Tutor
            </span>
            <span className="text-xs text-slate-400 font-mono">BM&DC Curated RAG</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-2">
            Evidence-Grounded AI Learning Companion
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Generate physiological cascades, analyze pathophysiology, and retrieve verified BM&DC textbook explanations in English & Bangla.
          </p>
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border self-start sm:self-auto ${
            language === 'bn'
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-glow-cyan'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>{language === 'bn' ? 'বাংলা (Bangla)' : 'English (EN)'}</span>
        </button>
      </div>

      {/* Trust & Transparency Banner */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <span className="font-bold text-indigo-300">Strict Grounding Guarantee:</span>
          <p>
            All generated answers cite official BM&DC syllabus references and recognized textbook editions. Never trust unverified AI outputs for clinical decision-making.
          </p>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="p-4 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 min-h-[420px] max-h-[560px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-glow-cyan'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-4 space-y-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line font-sans">{msg.text}</div>

              {/* Step-by-Step Visual Flowchart Cascade */}
              {msg.visualFlowchart && msg.visualFlowchart.length > 0 && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/20 space-y-2">
                  <div className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Step-by-Step Pathophysiological Cascade
                  </div>
                  <div className="space-y-1">
                    {msg.visualFlowchart.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Citations & Evidence References */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 space-y-0.5">
                  <span className="font-bold text-slate-400 block font-mono uppercase">
                    Citations & Authoritative Sources:
                  </span>
                  {msg.citations.map((cite, i) => (
                    <div key={i} className="flex items-center gap-1 text-slate-400">
                      <span>•</span>
                      <span>{cite}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Searching verified curriculum evidence...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder={
            language === 'bn'
              ? 'যেকোনো মেডিকেল বিষয় বা কনসেপ্ট লিখুন (যেমন: Wiggers diagram, STEMI, Mitral Stenosis)...'
              : 'Ask any MBBS topic, clinical cascade, or pharmacology mechanism...'
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          disabled={isLoading}
          className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
        />

        <button
          onClick={handleSend}
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-glow-cyan"
        >
          <span>Ask Tutor</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
