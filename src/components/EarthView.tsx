import React, { useState } from 'react';
import { Clock, Eye, Sparkles, Database, MessageSquare, Compass, Info, X } from 'lucide-react';

interface EarthViewProps {
  onOpenAssessment?: () => void;
}

export function EarthView({ onOpenAssessment }: EarthViewProps) {
  const [activeHistory, setActiveHistory] = useState<string | null>(null);

  const historyEvents = [
    {
      id: 'transformer',
      title: "2017: Attention Is All You Need",
      desc: "The publication of the Transformer architecture. Introduced self-attention mechanisms, replacing traditional recurrent networks and enabling massive parallel training.",
      stat: "Parameters: 65M"
    },
    {
      id: 'gpt3',
      title: "2020: GPT-3 Epoch",
      desc: "OpenAI launches GPT-3 with 175 billion parameters. Shows incredible zero-shot capabilities, marking the transition into massive LLM engineering.",
      stat: "Parameters: 175B"
    },
    {
      id: 'chatgpt',
      title: "Nov 2022: ChatGPT Public Release",
      desc: "An instructional fine-tuned model (RLHF) launched to the general public, hitting 100M users within 2 months and sparking the global consumer AI race.",
      stat: "Users: 100M+ in 60 days"
    },
    {
      id: 'codex',
      title: "2021-2022: Codex & Copilot",
      desc: "AI begins to assist directly in software production. Programmers transition from writing boilerplate code to instructing the compiler conceptually.",
      stat: "Boilerplate generated: 40%+"
    }
  ];

  return (
    <div className="space-y-gutter w-full">
      {/* Central HUD Card */}
      <div className="w-full glass-panel p-8 md:p-12 rounded-2xl flex flex-col items-center gap-8 relative overflow-hidden group">
        {/* Glowing atmospheric orb */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/15 transition-all duration-1000"></div>

        <div className="text-center space-y-4">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-2">
            MILESTONE: CHATGPT LAUNCH (NOV 2022)
          </span>
          <h1 className="text-4xl md:text-5xl font-space font-bold tracking-tight text-white">
            AI Age 0 <span className="text-primary/50">· Can Chat</span>
          </h1>
          <p className="max-w-xl mx-auto text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
            You ask questions, get answers, and move on. At this stage, AI is treated like a smarter search engine with manual, text-by-text interactions.
          </p>
          <div className="orbital-divider w-64 mx-auto"></div>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Stat 1: Autonomous Time */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/5 flex flex-col gap-2 relative overflow-hidden group/card hover:border-primary/20 transition-all">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover/card:opacity-20 transition-opacity">
              <Clock className="w-16 h-16 text-primary" />
            </div>
            <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase block">
              Autonomous Time
            </span>
            <div className="flex items-end gap-2">
              <span className="text-3xl md:text-4xl font-space font-bold text-white">~5</span>
              <span className="text-sm text-primary pb-1 font-space">Minutes</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full w-[5%] bg-primary progress-comet"></div>
            </div>
          </div>

          {/* Stat 2: Supervision */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/5 flex flex-col gap-2 relative overflow-hidden group/card hover:border-primary/20 transition-all">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover/card:opacity-20 transition-opacity">
              <Eye className="w-16 h-16 text-primary" />
            </div>
            <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase block">
              Supervision
            </span>
            <div className="flex items-end gap-2">
              <span className="text-3xl md:text-4xl font-space font-bold text-white uppercase">In-the-loop</span>
            </div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-2 font-space opacity-80">
              Continuous Human Oversight Required
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setActiveHistory(activeHistory ? null : 'transformer')}
          className="group relative px-10 py-4 bg-primary text-black font-space font-semibold text-xs tracking-wider rounded-full overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] active:scale-95"
          id="explore-history-btn"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Database className="w-4 h-4" />
            EXPLORE AGE 0 DATA RECORDS
          </span>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
      </div>

      {/* Historical Data Stream Container */}
      {activeHistory && (
        <div className="glass-panel p-6 rounded-xl animate-fade-in relative border border-primary/15" id="history-data-panel">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-label-caps text-label-caps text-primary uppercase">ARCHIVAL SYNAPSE TRANSMISSION</span>
            </div>
            <button 
              onClick={() => setActiveHistory(null)}
              className="text-on-surface-variant hover:text-primary transition-colors"
              id="close-history-panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {historyEvents.map((evt) => (
              <button
                key={evt.id}
                onClick={() => setActiveHistory(evt.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeHistory === evt.id
                    ? 'bg-primary/10 border-primary text-white'
                    : 'bg-white/5 border-white/5 text-on-surface-variant hover:text-white hover:border-white/10'
                }`}
                id={`history-node-${evt.id}`}
              >
                <div className="font-space font-semibold text-xs mb-1 text-primary">{evt.title}</div>
                <div className="text-[11px] font-mono opacity-60 mb-2">{evt.stat}</div>
                <p className="text-[11px] leading-relaxed line-clamp-3 font-sans">
                  {evt.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Active Detail Display */}
          <div className="mt-4 p-4 bg-surface-dim border border-white/10 rounded-xl flex gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-space font-semibold text-xs text-white uppercase">
                Historical Context Analyzer
              </div>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed font-sans">
                {historyEvents.find(e => e.id === activeHistory)?.desc || "Click on any milestone block above to inspect the structural changes in standard machine intelligence vectors during the proto-AGI epoch."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
