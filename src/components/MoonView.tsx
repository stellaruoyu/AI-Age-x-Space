import React, { useState, useEffect, useRef } from 'react';
import { Code, Clock, Eye, Play, Terminal, Square, Check, RefreshCw } from 'lucide-react';

export function MoonView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "> Initializing agentic loop...",
    "> Analyzing repository structure...",
    "> Identified bug in line 245 of core.ts",
    "> Executing 'npm test'...",
    "> Tests failed. Iterating on solution...",
    "> Applying fix v2.0.1...",
    "> Rerunning tests...",
    "> 24/24 tests passed.",
    "> Awaiting human review."
  ]);
  const [successRate, setSuccessRate] = useState(94.2);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom when logs update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  useEffect(() => {
    if (!isPlaying) return;

    const logPool = [
      "> Spawning sandbox environment...",
      "> Context loaded: src/server.ts (Express endpoint)",
      "> Analyzing syntax safety vectors...",
      "> [Linter] Warning: unused import on line 12",
      "> Rewriting route handler concept...",
      "> Bundling files via esbuild...",
      "> Launching mock Express container...",
      "> Testing endpoint GET /api/health...",
      "> Response Code: 200 OK (Latency: 1.2ms)",
      "> Initiating comprehensive unit tests...",
      "> [PASS] Health check integration",
      "> [PASS] Database pooling error safety",
      "> Success index: 98.4%",
      "> Compiling source mapping logs...",
      "> Staging changes for commit...",
      "> Completed. Waiting for supervisor clearance."
    ];

    let currentIndex = 0;
    setTerminalLogs(["> Initializing active agentic coding loop...", "> Connected to Moon Terminal v2.4"]);

    const interval = setInterval(() => {
      if (currentIndex < logPool.length) {
        setTerminalLogs(prev => [...prev, logPool[currentIndex]]);
        currentIndex++;
        // Slightly fluctuate success rate
        setSuccessRate(prev => {
          const val = prev + (Math.random() - 0.45) * 0.5;
          return parseFloat(Math.min(100, Math.max(90, val)).toFixed(1));
        });
      } else {
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleDeployAgent = () => {
    setIsPlaying(true);
  };

  return (
    <div className="space-y-gutter max-w-7xl mx-auto w-full">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Autonomous Time */}
        <div className="glass-vessel p-6 rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-space block">
              Autonomous Time
            </span>
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-space font-semibold text-white">Hours</span>
          </div>
          <div className="w-full bg-white/10 h-[2px] rounded-full mt-4">
            <div className="h-full bg-primary progress-comet" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* Metric 2: Supervision */}
        <div className="glass-vessel p-6 rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-space block">
              Supervision
            </span>
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-space font-semibold text-white">On-the-loop</span>
          </div>
          <div className="w-full bg-white/10 h-[2px] rounded-full mt-4">
            <div className="h-full bg-primary progress-comet" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Metric 3: System Status */}
        <div className="glass-vessel p-6 rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant font-space block">
              Agentic Loop Status
            </span>
            <RefreshCw className={`w-4 h-4 text-primary ${isPlaying ? 'animate-spin' : ''}`} />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-space font-semibold text-primary">
              {isPlaying ? 'RUNNING' : 'ACTIVE'}
            </span>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider font-space">
              CODEX INTEGRATED
            </span>
          </div>
        </div>
      </div>

      {/* Center Grid UI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Core Agent Capabilities */}
        <div className="lg:col-span-8">
          <div className="glass-vessel p-8 rounded-xl h-full flex flex-col justify-between border border-white/10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Code className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-2xl font-space font-semibold text-white tracking-tight">
                    AI Age 2 · End-to-End Coding
                  </h2>
                  <p className="text-xs text-on-surface-variant font-sans">
                    Milestone: Claude Code / Codex (Feb 2025)
                  </p>
                </div>
              </div>

              <div className="orbital-divider"></div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-label-caps text-[10px] text-primary uppercase tracking-wider font-space block">
                    Capabilities
                  </span>
                  <p className="text-sm md:text-base text-on-surface leading-relaxed font-sans">
                    Letting AI write, test, debug, and iterate on code autonomously until all requirements are met. You set the high-level goals, and inspect logs or verify final outputs.
                  </p>
                </div>

                <div className="pt-4 space-y-2">
                  <span className="font-label-caps text-[10px] text-primary uppercase tracking-wider font-space block">
                    Core Engineering Skills
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Agentic Coding Loop', 'End-to-end Tool Use', 'Context Engineering', 'Self-Repair Compiler'].map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-on-surface-variant/90 font-sans"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleDeployAgent}
                disabled={isPlaying}
                className={`px-8 py-3.5 rounded-full font-space font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                  isPlaying 
                    ? 'bg-primary/20 border border-primary/30 text-primary cursor-not-allowed'
                    : 'bg-primary text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-95'
                }`}
                id="deploy-agent-btn"
              >
                <Terminal className="w-4 h-4" />
                {isPlaying ? "AGENT COMPILING..." : "DEPLOY CODING AGENT"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Code Console Feed */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-vessel rounded-xl overflow-hidden flex flex-col h-[380px] border border-white/10">
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <span className="font-label-caps text-label-caps text-primary tracking-widest block font-space">
                Active Code Session
              </span>
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            </div>

            {/* Simulated Live Terminal Feed */}
            <div className="flex-1 bg-surface-dim/90 p-4 font-mono text-[11px] text-primary/75 leading-relaxed overflow-y-auto max-h-[250px] space-y-2 select-none relative">
              {terminalLogs.map((log, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {log}
                </div>
              ))}
              {isPlaying && (
                <div className="inline-block w-1.5 h-3.5 bg-primary animate-pulse ml-0.5"></div>
              )}
              <div ref={terminalEndRef}></div>
            </div>

            {/* Commits & success rate HUD footer */}
            <div className="p-5 bg-white/5 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-on-surface-variant">Last Commited Hash</span>
                <span className="font-label-caps text-primary font-mono font-bold">02:45 UTC (SHA-256)</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-on-surface-variant">Success Compiler Index</span>
                <span className="font-label-caps text-primary font-mono font-bold">{successRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
