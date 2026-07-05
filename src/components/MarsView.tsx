import React, { useState, useEffect } from 'react';
import { Network, Award, Compass, LayoutList, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface MarsViewProps {
  onOpenMeshMatrix: () => void;
}

export function MarsView({ onOpenMeshMatrix }: MarsViewProps) {
  const [coordination, setCoordination] = useState(98.2);
  const [showDocs, setShowDocs] = useState(false);

  // Fluctuating coordination indicator for high telemetry realism
  useEffect(() => {
    const interval = setInterval(() => {
      setCoordination(prev => {
        const val = prev + (Math.random() - 0.5) * 0.15;
        return parseFloat(Math.min(100, Math.max(95, val)).toFixed(1));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-gutter max-w-7xl mx-auto w-full">
      {/* Dashboard Header Title block */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-space font-bold text-primary tracking-tight">
            AI AGE 3 · MULTI-AGENT COLLABORATION
          </h1>
          <div className="self-start md:self-end px-3.5 py-1.5 border border-primary/40 rounded text-[10px] text-primary font-bold tracking-widest bg-primary/5 uppercase font-space">
            Milestone: OpenClaw Release (Jan 2026)
          </div>
        </div>
        <div className="orbital-divider"></div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Core Collective Intelligence Panel (Left Column) */}
        <div className="md:col-span-8 glass-panel p-8 rounded-xl flex flex-col justify-between relative group overflow-hidden border border-white/5">
          {/* Subtle star particles background indicator */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-all duration-1000"></div>

          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div className="max-w-xl space-y-2">
                <span className="font-label-caps text-label-caps text-primary/60 uppercase block font-space font-semibold">
                  Framework Evolution
                </span>
                <h3 className="text-xl md:text-2xl font-space font-bold text-white">
                  Autonomous Collective Intelligence
                </h3>
                <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
                  Designing secure systems where multiple specialized AI agents work collaboratively—researching, writing, reviewing, publishing—for days or weeks on end without human feedback cycles.
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="font-label-caps text-label-caps text-on-surface-variant block font-space">Architecture</span>
                <span className="text-primary font-space text-sm font-bold uppercase tracking-wider">Decentralized Mesh</span>
              </div>
            </div>

            {/* Sub Metrics inside the main card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2 p-5 bg-white/5 rounded-xl border border-white/5">
                <span className="font-label-caps text-[10px] text-primary uppercase block tracking-wider font-space">Primary Metric</span>
                <h4 className="text-base font-space font-medium text-white">Autonomous Time</h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-space font-semibold text-primary">Days to Weeks</span>
                </div>
                <div className="w-full bg-white/10 h-[2px] rounded-full mt-4 overflow-hidden">
                  <div className="bg-primary h-full progress-fill" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="space-y-2 p-5 bg-white/5 rounded-xl border border-white/5">
                <span className="font-label-caps text-[10px] text-primary uppercase block tracking-wider font-space">Secondary Metric</span>
                <h4 className="text-base font-space font-medium text-white">Supervision</h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-space font-semibold text-primary">Off-the-loop</span>
                </div>
                <div className="w-full bg-white/10 h-[2px] rounded-full mt-4 overflow-hidden">
                  <div className="bg-primary h-full progress-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 relative z-10">
            <button 
              onClick={onOpenMeshMatrix}
              className="bg-primary text-surface-dim px-6 py-3 font-space font-semibold text-xs uppercase tracking-wider rounded flex items-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:scale-95"
              id="initialize-agent-mesh-btn"
            >
              <Network className="w-4 h-4" /> 
              INITIALIZE AGENT MESH
            </button>
            <button 
              onClick={() => setShowDocs(!showDocs)}
              className="border border-primary/30 text-primary px-6 py-3 font-space font-semibold text-xs uppercase tracking-wider rounded hover:bg-primary/10 transition-colors"
              id="architecture-docs-btn"
            >
              {showDocs ? "CLOSE BLUEPRINT" : "ARCHITECTURE DOCS"}
            </button>
          </div>
        </div>

        {/* Sidebar Telemetry Logs (Right Column) */}
        <div className="md:col-span-4 space-y-gutter">
          {/* Key Skills */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 relative">
            <Award className="absolute top-6 right-6 text-primary/30 w-5 h-5" />
            <span className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase mb-4 block font-space">
              Key Mastery Skills
            </span>
            <div className="space-y-3 font-sans">
              {[
                { title: 'Loop Engineering', desc: 'Reciprocal verification cycles' },
                { title: 'Multi-Agent Architecture', desc: 'Specialized node deployment' },
                { title: 'Observability Systems', desc: 'Real-time telemetry logging' }
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  <div>
                    <div className="text-white text-xs font-medium">{skill.title}</div>
                    <div className="text-[10px] text-on-surface-variant/70">{skill.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coordination Panel */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase font-space">
                Coordination Efficiency
              </span>
              <span className="font-mono text-primary font-bold text-sm">{coordination}%</span>
            </div>
            <div className="relative h-1 w-full bg-white/5 rounded-full">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/20 to-primary rounded-full transition-all duration-300" 
                style={{ width: `${coordination}%` }}
              ></div>
            </div>
            <p className="text-[11px] font-sans text-on-surface-variant/90 leading-relaxed">
              Active collaboration arrays between Research, Strategy, and Execution nodes are yielding 4.2x faster task iteration loops without human feedback blocks.
            </p>
          </div>

          {/* Performance stats */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 flex flex-col gap-4">
            <span className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase font-space">
              Mesh Performance Matrix
            </span>
            <div className="grid grid-cols-2 gap-4 font-sans text-xs">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-on-surface-variant">Throughput</span>
                  <span className="text-primary font-bold">82%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-on-surface-variant">Accuracy</span>
                  <span className="text-primary font-bold">94%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Architecture docs */}
      {showDocs && (
        <div className="glass-panel p-6 rounded-xl border border-primary/20 animate-fade-in space-y-4" id="architecture-docs-panel">
          <div className="flex justify-between items-center">
            <h4 className="font-space font-semibold text-sm text-primary uppercase">
              DECENTRALIZED MESH ARCHITECTURE SPECIFICATION
            </h4>
            <button 
              onClick={() => setShowDocs(false)} 
              className="text-xs font-mono text-on-surface-variant hover:text-primary"
              id="close-blueprint-btn"
            >
              CLOSE
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans text-on-surface-variant leading-relaxed">
            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/5">
              <h5 className="font-space font-semibold text-white uppercase text-xs">1. Node Specialization</h5>
              <p>
                Each node is configured with distinct system boundaries. The Research agent compiles raw corpus indexes, the Strategy agent formulates task hierarchies, and the Execution agent writes target structures.
              </p>
            </div>
            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/5">
              <h5 className="font-space font-semibold text-white uppercase text-xs">2. Consensus Negotiation</h5>
              <p>
                Instead of simple procedural loops, agents negotiate target outputs over decentralized evaluation logs. If a compiled layout fails the integrity review, correct parameters are re-negotiated.
              </p>
            </div>
            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/5">
              <h5 className="font-space font-semibold text-white uppercase text-xs">3. Self-Healing Integration</h5>
              <p>
                Continuous telemetry monitors the network. When a node experiences processing exceptions, adjacent units redistribute task tokens dynamically to maintain 98%+ efficiency rating.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
