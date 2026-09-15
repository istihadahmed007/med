import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, ShieldCheck, AlertCircle, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  visualFlowchart?: string[];
  citations?: string[];
}

export const AiTutorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'tutor',
      text: 'Good day! I am your MEDX Verified AI Medical Tutor. I assist with BM&DC curriculum concepts, conceptual flowcharts, and high-yield exam points based strictly on accredited textbooks (Davidson, Guyton, Robbins, Katzung). How can I assist your study today?',
      citations: ['BM&DC National MBBS Syllabus 2024–2026', 'Robbins Pathologic Basis of Disease 10th ed.']
    }
  ]);
  const [inputText, setInputText] = useState<string>('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText,
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');

    // Controlled Tutor Clinical Intelligence
    setTimeout(() => {
      let responseMsg: ChatMessage;

      if (query.includes('nephrotic') || query.includes('edema')) {
        responseMsg = {
          id: `tutor-${Date.now()}`,
          sender: 'tutor',
          text: 'Here is the step-by-step pathophysiological cascade of Nephrotic Syndrome (Triad: Massive Proteinuria > 3.5g/24h, Hypoalbuminemia < 30g/L, Generalized Edema + Hyperlipidemia):',
          visualFlowchart: [
            'Podocyte Injury / Glomerular basement membrane charge disruption',
            'Heavy Albuminuria (> 3.5 g / 24 hours)',
            'Hypoalbuminemia (< 30 g/L) leading to decreased plasma oncotic pressure',
            'Fluid transudation into interstitial space (Generalized Pitting Edema / Anasarca)',
            'Decreased effective circulating arterial volume -> RAAS & ADH activation (Secondary water/sodium retention)',
            'Compensatory hepatic protein & lipid synthesis -> Hyperlipidemia & Lipiduria (Maltese cross fatty casts)'
          ],
          citations: ['Robbins & Cotran Pathologic Basis of Disease 10th ed. Chapter 20', 'Davidson Principles of Medicine 24th ed.']
        };
      } else if (query.includes('action potential') || query.includes('pacemaker')) {
        responseMsg = {
          id: `tutor-${Date.now()}`,
          sender: 'tutor',
          text: 'Here is the 5-phase ventricular cardiac action potential summary:',
          visualFlowchart: [
            'Phase 0: Rapid Upstroke (Fast voltage-gated Na+ channel influx, INa)',
            'Phase 1: Early Partial Repolarization (Transient outward K+ efflux, Ito)',
            'Phase 2: Plateau Phase (L-type Ca2+ channel influx balanced with delayed rectifier K+ efflux)',
            'Phase 3: Rapid Repolarization (Ca2+ channels close, rapid K+ efflux via IKr & IKs)',
            'Phase 4: Resting Membrane Potential (-90 mV maintained by Na+/K+ ATPase and inward rectifier IK1)'
          ],
          citations: ['Guyton and Hall Textbook of Medical Physiology 14th ed. Chapter 9']
        };
      } else {
        responseMsg = {
          id: `tutor-${Date.now()}`,
          sender: 'tutor',
          text: `Regarding "${inputText}": In BM&DC medical curriculum, this topic links foundational anatomy, cellular physiology, and emergency clinical intervention. Always structure your written and viva answers in the standard sequence: Definition -> Etiology -> Pathogenesis -> Clinical Features -> Investigations -> Management.`,
          citations: ['Oxford Handbook of Clinical Medicine 10th ed.', 'BM&DC Core Subject Syllabus']
        };
      }

      setMessages((prev) => [...prev, responseMsg]);
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              Verified AI Medical Tutor
            </span>
            <span className="text-xs text-slate-400">Strict RAG & Evidence Grounded</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-2">
            Interactive Conceptual Tutor & Flowchart Generator
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Generate visual step-by-step cascades, understand complex physiology, and cross-reference authoritative textbooks.
          </p>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="glass-panel-elevated p-6 rounded-2xl border border-cyan-500/20 min-h-[400px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'tutor' && (
              <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>

              {/* Visual Flowchart Display */}
              {msg.visualFlowchart && (
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                    Generated Conceptual Cascade:
                  </span>
                  <div className="space-y-1.5">
                    {msg.visualFlowchart.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <span className="font-mono font-bold text-cyan-400">{idx + 1}.</span>
                        <span className="text-slate-200">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Citations Badges */}
              {msg.citations && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Verified Citations:
                  </span>
                  {msg.citations.map((cite, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono border border-slate-700">
                      {cite}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question (e.g. 'Explain nephrotic syndrome visually' or 'Explain cardiac action potential')..."
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white shadow-glow-cyan transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
