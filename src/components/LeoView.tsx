import React, { useState } from 'react';
import { Sparkles, Terminal, Sliders, CheckSquare, BrainCircuit, Play } from 'lucide-react';

interface LeoViewProps {
  onOpenPromptGrid: () => void;
}

export function LeoView({ onOpenPromptGrid }: LeoViewProps) {
  const [contextDetail, setContextDetail] = useState(88);
  const [constraintRigidity, setConstraintRigidity] = useState(92);
  const [formatCompliance, setFormatCompliance] = useState(95);

  const getDetailLabel = (val: number) => {
    if (val > 85) return "High";
    if (val > 50) return "Optimal";
    return "Insufficient";
  };

  const getFormatLabel = (val: number) => {
    if (val > 90) return "Verified";
    if (val > 70) return "Standard";
    return "Warning";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter max-w-7xl mx-auto w-full">
      {/* Hero Mission Card (Left Column) */}
      <div className="md:col-span-8">
        <div className="glass-card rounded-2xl p-8 h-full flex flex-col justify-between relative overflow-hidden group">
          {/* Cyber scanline indicator */}
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <div className="scan-line absolute inset-x-0 h-px bg-primary/30 blur-sm"></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-label-caps text-label-caps text-primary uppercase">
                Milestone: Code Interpreter (Mar 2023)
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-space font-bold text-white leading-none">
              AI Age 1 · Precise Instructions
            </h1>

            <p className="font-sans text-sm md:text-base text-on-surface-variant/90 max-w-xl leading-relaxed">
              Giving clear, structured prompts. Letting AI complete one full task—like analyzing data, synthesizing datasets, or generating charts—without human handholding.
            </p>

            <div className="p-4 bg-primary/5 border border-primary/25 rounded-xl space-y-1">
              <span className="font-label-caps text-[10px] text-primary uppercase tracking-wider block font-space font-semibold">
                Key Skill Matrix
              </span>
              <p className="text-xs md:text-sm text-on-surface font-sans leading-relaxed">
                Prompt Engineering Formulation (Role + Task + Context + Format + Explicit Constraints).
              </p>
            </div>
          </div>

          {/* Core Telemetry metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-white/10 relative z-10">
            <div className="space-y-1">
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider font-space block">
                Autonomous Time
              </span>
              <p className="text-2xl md:text-3xl font-space font-semibold text-primary">~30 minutes</p>
            </div>
            <div className="space-y-1">
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider font-space block">
                Supervision Requirements
              </span>
              <p className="text-2xl md:text-3xl font-space font-semibold text-primary uppercase">In-the-loop</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats HUD & Deploy Sandbox (Right Column) */}
      <div className="md:col-span-4 flex flex-col gap-gutter">
        {/* Sliders widget */}
        <div className="glass-card rounded-2xl p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-2 mb-6">
            <h3 className="font-label-caps text-label-caps text-white uppercase flex items-center justify-between">
              Instructional HUD
              <Sliders className="w-4 h-4 text-primary" />
            </h3>
            <p className="text-[10px] text-on-surface-variant/70 font-sans">
              Calibrate instruction weights dynamically to update precision logs.
            </p>
          </div>

          <div className="space-y-6 flex-1">
            {/* Slider 1: Context Detail */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-space text-on-surface-variant">
                <span>Context Detail</span>
                <span className="text-primary font-semibold font-mono">{getDetailLabel(contextDetail)} ({contextDetail}%)</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="100" 
                value={contextDetail}
                onChange={(e) => setContextDetail(parseInt(e.target.value))}
                className="w-full accent-primary bg-white/10 h-[3px] rounded-full cursor-pointer focus:outline-none"
                id="leo-context-detail-slider"
              />
            </div>

            {/* Slider 2: Constraint Rigidity */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-space text-on-surface-variant">
                <span>Constraint Rigidity</span>
                <span className="text-primary font-semibold font-mono">{constraintRigidity}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={constraintRigidity}
                onChange={(e) => setConstraintRigidity(parseInt(e.target.value))}
                className="w-full accent-primary bg-white/10 h-[3px] rounded-full cursor-pointer focus:outline-none"
                id="leo-constraint-rigidity-slider"
              />
            </div>

            {/* Slider 3: Format Compliance */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-space text-on-surface-variant">
                <span>Format Compliance</span>
                <span className="text-primary font-semibold font-mono">{getFormatLabel(formatCompliance)} ({formatCompliance}%)</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={formatCompliance}
                onChange={(e) => setFormatCompliance(parseInt(e.target.value))}
                className="w-full accent-primary bg-white/10 h-[3px] rounded-full cursor-pointer focus:outline-none"
                id="leo-format-compliance-slider"
              />
            </div>
          </div>
        </div>

        {/* Primary Deploy trigger button */}
        <button 
          onClick={onOpenPromptGrid}
          className="bg-primary text-surface-dim font-space font-semibold tracking-wider text-xs uppercase py-5 rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-[0.98] transition-all group overflow-hidden relative"
          id="deploy-prompt-grid-btn"
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          <Terminal className="w-4 h-4 text-surface-dim group-hover:rotate-12 transition-transform" />
          DEPLOY PROMPT GRID
        </button>
      </div>
    </div>
  );
}
