import React, { useState, useEffect } from 'react';
import { X, Check, Copy, Terminal as TerminalIcon, ShieldAlert, Sparkles, Send, Play, RefreshCw, Cpu, Globe } from 'lucide-react';
import { PromptTemplate, AssessmentResult } from '../types';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: AssessmentResult) => void;
}

export function AssessmentModal({ isOpen, onClose, onComplete }: AssessmentModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  if (!isOpen) return null;

  const questions = [
    {
      text: "How do you primarily formulate your queries for AI?",
      options: [
        { text: "Short search-like queries ('how to write a loop')", score: 0 },
        { text: "Structured templates with Role, Task, and Constraints", score: 1 },
        { text: "Providing full codebase context or uploading multi-files", score: 2 },
        { text: "Directing multiple specialized agents via state managers", score: 3 }
      ]
    },
    {
      text: "How much active daily session time do you delegate to AI tools?",
      options: [
        { text: "Ad-hoc, less than 5 minutes total", score: 0 },
        { text: "Around 30 minutes for single debugging tasks", score: 1 },
        { text: "Few hours of continuous software generation & testing", score: 2 },
        { text: "Days to weeks of autonomous, offline background task runs", score: 3 }
      ]
    },
    {
      text: "What level of human-in-the-loop oversight do your flows require?",
      options: [
        { text: "Continuous feedback for every query and line", score: 0 },
        { text: "Intermittent correction for logical components", score: 1 },
        { text: "Goal setting and final code review only", score: 2 },
        { text: "Off-the-loop autonomous consensus between mesh nodes", score: 3 }
      ]
    }
  ];

  const handleSelect = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate level
      const totalScore = newAnswers.reduce((sum, ansIdx, qIdx) => {
        return sum + questions[qIdx].options[ansIdx].score;
      }, 0);

      let level = "Age 0";
      let multiplier = "Baseline";
      if (totalScore >= 7) {
        level = "Age 3";
        multiplier = "6x - 17x+";
      } else if (totalScore >= 4) {
        level = "Age 2";
        multiplier = "4x - 6x";
      } else if (totalScore >= 2) {
        level = "Age 1";
        multiplier = "2x - 3x";
      }

      onComplete({ score: totalScore, level, multiplier });
      setStep(0);
      setAnswers([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg p-8 glass-card rounded-2xl border-primary/20 relative" id="assessment-container">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
          id="close-assessment-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-1">COGNITIVE SYNC assessment</span>
          <h3 className="text-2xl font-space font-semibold text-white">Determine Your AI Age</h3>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 h-1 rounded-full mb-8 relative">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="space-y-6">
          <p className="text-lg font-medium text-white mb-4">{questions[step].text}</p>
          <div className="space-y-3">
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-primary/40 hover:bg-primary/5 text-on-surface hover:text-white transition-all text-sm font-sans flex justify-between items-center group"
                id={`opt-btn-${step}-${idx}`}
              >
                <span>{opt.text}</span>
                <span className="opacity-0 group-hover:opacity-100 text-primary transition-opacity font-mono text-xs">select</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-on-surface-variant opacity-60">
          Step {step + 1} of {questions.length} • Autonomous Metrics Laboratory
        </div>
      </div>
    </div>
  );
}

interface PromptGridModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromptGridModal({ isOpen, onClose }: PromptGridModalProps) {
  const [role, setRole] = useState('Senior Systems Architect');
  const [task, setTask] = useState('Refactor the database connection pooling handler');
  const [context, setContext] = useState('High-throughput server running Express and PostgreSQL in Docker');
  const [format, setFormat] = useState('Clean typescript module with custom JSDoc comments and explicit error logging');
  const [constraints, setConstraints] = useState('No external dependencies, pool size limited to 20, handle network drops gracefully');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const promptOutput = `[Role]: ${role}
[Task]: ${task}
[Context]: ${context}
[Format]: ${format}
[Constraints]: ${constraints}

Please execute this instructions package strictly and report completion state.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadTemplate = (type: string) => {
    if (type === 'debug') {
      setRole('Expert Bug Hunter & Performance Analyst');
      setTask('Trace memory leaks and high CPU usage in the middleware stack');
      setContext('Production NodeJS v20 container scaling up to 10k concurrent WebSockets');
      setFormat('Formatted Markdown report with CPU flamegraph analysis and concrete source modifications');
      setConstraints('Do not modify process-level environments, use memory profiling snapshots');
    } else if (type === 'creative') {
      setRole('Futuristic Sci-Fi Narrative Designer');
      setTask('Generate background worldbuilding transcripts for a star-ship AI terminal log');
      setContext('Interactive cyber-narrative set in the year 2124 around a mining vessel near Mars');
      setFormat('A chronological list of 5 encrypted logs with high-fidelity sensory descriptions');
      setConstraints('Keep logs under 150 words each, include realistic telemetry logs');
    } else {
      setRole('Senior Systems Architect');
      setTask('Refactor the database connection pooling handler');
      setContext('High-throughput server running Express and PostgreSQL in Docker');
      setFormat('Clean typescript module with custom JSDoc comments and explicit error logging');
      setConstraints('No external dependencies, pool size limited to 20, handle network drops gracefully');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl p-8 glass-card rounded-2xl border-primary/20 relative" id="prompt-grid-container">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
          id="close-prompt-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-1">PROMPT ENGINEERING SANDBOX</span>
          <h3 className="text-2xl font-space font-semibold text-white">LEO Prompt Matrix Generator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div className="flex gap-2 mb-2">
              <button 
                onClick={() => loadTemplate('architect')}
                className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-on-surface hover:text-primary hover:border-primary/40 transition-all"
                id="template-architect-btn"
              >
                Architect
              </button>
              <button 
                onClick={() => loadTemplate('debug')}
                className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-on-surface hover:text-primary hover:border-primary/40 transition-all"
                id="template-debug-btn"
              >
                Debug
              </button>
              <button 
                onClick={() => loadTemplate('creative')}
                className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-on-surface hover:text-primary hover:border-primary/40 transition-all"
                id="template-creative-btn"
              >
                Creative Log
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-space font-semibold text-primary uppercase tracking-wider block">Role</label>
              <input 
                type="text" 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary"
                id="prompt-role-input"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-space font-semibold text-primary uppercase tracking-wider block">Task</label>
              <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary"
                id="prompt-task-input"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-space font-semibold text-primary uppercase tracking-wider block">Context</label>
              <textarea 
                rows={2}
                value={context} 
                onChange={(e) => setContext(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary resize-none"
                id="prompt-context-input"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-space font-semibold text-primary uppercase tracking-wider block">Format</label>
              <input 
                type="text" 
                value={format} 
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary"
                id="prompt-format-input"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-space font-semibold text-primary uppercase tracking-wider block">Constraints</label>
              <input 
                type="text" 
                value={constraints} 
                onChange={(e) => setConstraints(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary"
                id="prompt-constraints-input"
              />
            </div>
          </div>

          {/* Generated Code Output */}
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-2 flex-1 flex flex-col">
              <span className="text-[10px] font-space font-semibold text-on-surface-variant uppercase tracking-wider block">DEPLOYABLE PATTERN</span>
              <div className="flex-1 bg-surface-dim border border-white/10 rounded-xl p-4 font-mono text-xs text-primary/80 overflow-y-auto whitespace-pre-wrap leading-relaxed max-h-[310px] relative">
                {promptOutput}
              </div>
            </div>

            <button 
              onClick={handleCopy}
              className="mt-4 bg-primary text-black font-space font-semibold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
              id="copy-prompt-btn"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "COPIED TO CLIPBOARD" : "DEPLOY & COPY PROMPT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AgentMeshModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AgentMeshModal({ isOpen, onClose }: AgentMeshModalProps) {
  const [activeDirective, setActiveDirective] = useState('Infrastructure Setup');
  const [meshLogs, setMeshLogs] = useState<string[]>([
    "[Mesh] Initialized agent consensus matrix.",
    "[Research-Agent] Analyzing orbital trajectory options for optimal sun alignment.",
    "[Strategy-Agent] Formulated mission trajectory blueprint. Cost-efficiency ratio: 98.2%.",
    "[Execution-Agent] Deploying structural satellite shields near Phobos.",
    "[Review-Agent] Standard metrics validated. Integrity index: 99.4% nominal."
  ]);
  const [customMsg, setCustomMsg] = useState('');
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!isOpen || !running) return;

    const agentNames = ['Research-Agent', 'Strategy-Agent', 'Execution-Agent', 'Review-Agent'];
    const logsPool = [
      "Optimizing thermal grid mapping at Mars Equator.",
      "Identified dust storm trajectory in Sector Sol-12. Activating safety grids.",
      "Redundant storage relays mapped to decentralized blockchain mesh.",
      "Synaptic query processed in 0.04ms. No latency anomalies.",
      "Consensus synchronized. Stage milestone achievement rate +0.4%.",
      "Shield batteries recharged via ambient solar frequency radiation.",
      "Analyzing carbon dioxide converters at Mars South Icecap."
    ];

    const interval = setInterval(() => {
      const randomAgent = agentNames[Math.floor(Math.random() * agentNames.length)];
      const randomMsg = logsPool[Math.floor(Math.random() * logsPool.length)];
      setMeshLogs(prev => [...prev.slice(-9), `[${randomAgent}] ${randomMsg}`]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, running]);

  if (!isOpen) return null;

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    setMeshLogs(prev => [...prev.slice(-9), `[User-Command] ${customMsg}`]);
    setCustomMsg('');

    // Trigger mock response
    setTimeout(() => {
      setMeshLogs(prev => [...prev, `[Review-Agent] Command acknowledged. Restructuring consensus parameter arrays.`]);
    }, 1200);
  };

  const directives = ['Infrastructure Setup', 'Atmosphere Harvesting', 'Solar Relay Optimization', 'Singularity Synchronization'];

  const changeDirective = (dir: string) => {
    setActiveDirective(dir);
    setMeshLogs(prev => [
      ...prev,
      `[Mesh] Shifting primary mesh directive to [${dir.toUpperCase()}].`,
      `[Strategy-Agent] Computing secondary objective hierarchies for optimal resource delegation...`
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-3xl p-8 glass-card rounded-2xl border-primary/20 relative" id="agent-mesh-container">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
          id="close-mesh-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-1">MEMBER INTERFACE CONNECT</span>
          <h3 className="text-2xl font-space font-semibold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary animate-pulse" />
            Autonomous Agent Mesh Control Panel
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Directives list */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-space font-semibold text-on-surface-variant uppercase tracking-wider block">CHOOSE MISSION DIRECTIVE</span>
            <div className="space-y-2">
              {directives.map((dir, idx) => (
                <button
                  key={idx}
                  onClick={() => changeDirective(dir)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans transition-all flex items-center justify-between ${
                    activeDirective === dir
                      ? 'border-primary/50 bg-primary/10 text-white'
                      : 'border-white/10 bg-white/5 text-on-surface-variant hover:text-white hover:border-white/20'
                  }`}
                  id={`dir-btn-${idx}`}
                >
                  <span>{dir}</span>
                  {activeDirective === dir && <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>}
                </button>
              ))}
            </div>

            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-2">
              <div className="flex justify-between text-[10px] font-space text-primary font-bold">
                <span>MESH CONSENSUS</span>
                <span>ONLINE</span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed font-sans">
                Research and Strategy units are currently negotiating hardware payload layouts across Sol clusters.
              </p>
            </div>
          </div>

          {/* Active Logs & custom command console */}
          <div className="md:col-span-8 flex flex-col h-[350px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-space font-semibold text-on-surface-variant uppercase tracking-wider">LIVE MESH EXCHANGE FEED</span>
              <button 
                onClick={() => setRunning(!running)}
                className="text-[9px] font-mono text-primary border border-primary/20 px-2 py-0.5 rounded hover:bg-primary/5 transition-all"
                id="toggle-mesh-running-btn"
              >
                {running ? "PAUSE FEED" : "RESUME FEED"}
              </button>
            </div>

            {/* Terminal display */}
            <div className="flex-1 bg-surface-dim border border-white/10 rounded-xl p-4 font-mono text-[11px] text-primary/90 overflow-y-auto space-y-2.5 max-h-[260px] scrollbar-thin">
              {meshLogs.map((log, idx) => {
                let colorClass = "text-primary/75";
                if (log.startsWith("[Research")) colorClass = "text-emerald-400";
                else if (log.startsWith("[Strategy")) colorClass = "text-sky-400";
                else if (log.startsWith("[Execution")) colorClass = "text-amber-400";
                else if (log.startsWith("[Review")) colorClass = "text-violet-400";
                else if (log.startsWith("[User")) colorClass = "text-white font-bold";
                else if (log.startsWith("[Mesh")) colorClass = "text-primary font-bold";

                return (
                  <div key={idx} className={`${colorClass} leading-tight`}>
                    {log}
                  </div>
                );
              })}
            </div>

            {/* Command Input */}
            <form onSubmit={handleSendCustom} className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Broadcast command to mesh (e.g. 'Audit thermal shield arrays')..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-on-surface-variant/40 focus:outline-none focus:border-primary"
                id="mesh-command-input"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-black px-4 rounded-xl flex items-center justify-center transition-all hover:scale-95 active:scale-90"
                id="send-mesh-command-btn"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  grainOpacity: number;
  setGrainOpacity: (val: number) => void;
  timezone: string;
  setTimezone: (val: string) => void;
  onReset: () => void;
}

export function SettingsModal({ 
  isOpen, 
  onClose, 
  grainOpacity, 
  setGrainOpacity, 
  timezone, 
  setTimezone,
  onReset
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md p-8 glass-card rounded-2xl border-primary/20 relative" id="settings-container">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
          id="close-settings-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-1">SYSTEM CONTROLS</span>
          <h3 className="text-2xl font-space font-semibold text-white">Dashboard Calibration</h3>
        </div>

        <div className="space-y-6">
          {/* Filmic Grain Opacity */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-space text-on-surface">
              <span className="font-semibold uppercase tracking-wider">Filmic Grain Texture</span>
              <span className="text-primary font-mono">{Math.round(grainOpacity * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="0.1" 
              step="0.01" 
              value={grainOpacity}
              onChange={(e) => setGrainOpacity(parseFloat(e.target.value))}
              className="w-full accent-primary bg-white/10 rounded-lg h-1"
              id="settings-grain-range"
            />
            <p className="text-[11px] text-on-surface-variant/65">
              Simulate heavy cosmic static or clear telescope instrumentation views.
            </p>
          </div>

          {/* Timezone calibration */}
          <div className="space-y-2">
            <span className="text-xs font-space font-semibold text-on-surface uppercase tracking-wider block">Timezone Alignment</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Earth UTC', val: 'UTC' },
                { label: 'Mars Sol 142', val: 'SOL' },
                { label: 'Lunar Standard', val: 'LST' },
                { label: 'Singularity Core', val: 'CORE' }
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => setTimezone(item.val)}
                  className={`p-3 text-xs rounded-xl border font-sans text-center transition-all ${
                    timezone === item.val
                      ? 'border-primary bg-primary/10 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-on-surface-variant hover:text-white hover:border-white/20'
                  }`}
                  id={`tz-btn-${item.val}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="orbital-divider my-4"></div>

          {/* Core Master Reset */}
          <div className="space-y-2">
            <span className="text-xs font-space font-semibold text-on-surface uppercase tracking-wider block">Emergency Master Reset</span>
            <button
              onClick={() => {
                onReset();
                onClose();
              }}
              className="w-full py-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 font-space font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-rose-500/25 transition-all flex items-center justify-center gap-2"
              id="emergency-reset-btn"
            >
              <ShieldAlert className="w-4 h-4" />
              Reset Self-Test Scores & Sync Status
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] text-on-surface-variant opacity-60">
          Uplink status: Nominal • Secure Terminal Encryption 256-bit
        </div>
      </div>
    </div>
  );
}
