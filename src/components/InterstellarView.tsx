import React, { useState, useEffect } from 'react';
import { ShieldCheck, Crosshair, Orbit, Compass, Cpu, Zap, Signal } from 'lucide-react';
import { AssessmentResult } from '../types';

interface InterstellarViewProps {
  onOpenAssessment: () => void;
  userResult: AssessmentResult | null;
}

export function InterstellarView({ onOpenAssessment, userResult }: InterstellarViewProps) {
  const [latency, setLatency] = useState(0.0001);
  const [activeStarNode, setActiveStarNode] = useState<string | null>(null);

  // Slightly oscillate latency to feel live
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = (Math.random() - 0.5) * 0.00001;
        return parseFloat(Math.min(0.0002, Math.max(0.00005, prev + delta)).toFixed(5));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const starNodes = [
    { id: 'sol', name: 'Sol Transit Station', coord: 'RA 12h 45m / Dec -24°', status: 'Operational' },
    { id: 'cygnus', name: 'Cygnus-X Star Cluster', coord: 'RA 20h 33m / Dec +41°', status: 'Signal Strong' },
    { id: 'sagittarius', name: 'Sagittarius A* Core', coord: 'RA 17h 45m / Dec -29°', status: 'Gravitational Singularity' }
  ];

  const currentLevel = userResult?.level || "Age 3";

  return (
    <div className="space-y-gutter max-w-7xl mx-auto w-full">
      {/* Upper Header block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-5xl font-space font-bold text-primary hud-glow uppercase tracking-tight">
            Beyond Age 3: The Future of Autonomy
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            The mastery gap is your greatest opportunity. AI Age isn't about your degree, certification, or job title—it's a critical skill system you can master to bridge the 6-17x productivity gap.
          </p>
        </div>
        <div className="glass-card px-5 py-3.5 rounded-xl flex items-center gap-3 self-start md:self-end border border-primary/20">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-label-caps text-[10px] text-white tracking-wider font-space">
            MILESTONE: TOWARD THE CORE
          </span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Central Interface: Mastery Self-Test */}
        <div className="md:col-span-8 glass-card rounded-xl p-8 relative overflow-hidden group border border-white/10">
          {/* Parallax scanning beam */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="scan-line absolute inset-x-0 h-px bg-primary/40"></div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <h3 className="text-xl md:text-2xl font-space font-bold text-white mb-2">Mastery Self-Test</h3>
              <div className="flex gap-4 items-center">
                <span className="font-label-caps text-[10px] text-primary font-space font-bold">CORE SYNCHRONIZATION</span>
                <span className="h-3 w-[1px] bg-white/20"></span>
                <span className="font-label-caps text-[10px] text-on-surface-variant font-space">NODE: AUTONOMY</span>
              </div>
            </div>
            <button 
              onClick={onOpenAssessment}
              className="bg-primary text-black font-space font-semibold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full hover:shadow-[0_0_15px_#22D3EE] hover:scale-95 transition-all"
              id="initiate-assessment-btn"
            >
              {userResult ? "RE-TAKE ASSESSMENT" : "INITIATE ASSESSMENT"}
            </button>
          </div>

          {/* Table representing mastery stages */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 font-label-caps text-on-surface-variant font-space text-[10px] tracking-wider">Daily AI Interaction Time</th>
                  <th className="py-3 font-label-caps text-primary font-space text-[10px] tracking-wider">Autonomy Level</th>
                  <th className="py-3 font-label-caps text-on-surface-variant font-space text-[10px] tracking-wider">Productivity Multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                <tr className={`hover:bg-white/5 transition-colors ${currentLevel === 'Age 0' ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary' : ''}`}>
                  <td className="py-3.5 pl-2">5 mins</td>
                  <td className="py-3.5 font-space font-medium">Age 0 (Can Chat)</td>
                  <td className="py-3.5 opacity-60">Baseline</td>
                </tr>
                <tr className={`hover:bg-white/5 transition-colors ${currentLevel === 'Age 1' ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary' : ''}`}>
                  <td className="py-3.5 pl-2">30 mins</td>
                  <td className="py-3.5 font-space font-medium">Age 1 (Precise)</td>
                  <td className="py-3.5 opacity-60">2x - 3x</td>
                </tr>
                <tr className={`hover:bg-white/5 transition-colors ${currentLevel === 'Age 2' ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary' : ''}`}>
                  <td className="py-3.5 pl-2">Few hours</td>
                  <td className="py-3.5 font-space font-medium">Age 2 (End-to-End)</td>
                  <td className="py-3.5 opacity-60">4x - 6x</td>
                </tr>
                <tr className={`hover:bg-white/5 transition-colors ${currentLevel === 'Age 3' ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary' : 'bg-primary/5'}`}>
                  <td className="py-3.5 pl-2 text-primary font-bold">Days to weeks</td>
                  <td className="py-3.5 text-primary font-bold font-space">Age 3 (Multi-Agent)</td>
                  <td className="py-3.5 text-primary font-bold">6x - 17x+</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* User Score card */}
          {userResult && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between" id="user-score-panel">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block font-space">VERIFIED ALIGNMENT SCORE</span>
                  <p className="text-xs text-on-surface-variant font-sans">
                    Computed metrics validate your autonomy rating at <span className="text-white font-bold">{userResult.level}</span>.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 block font-space uppercase">multiplier</span>
                <span className="text-emerald-400 font-space font-bold text-lg">{userResult.multiplier}</span>
              </div>
            </div>
          )}

          {/* Footer stats row */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mt-4">
            <div className="space-y-1">
              <div className="font-label-caps text-[10px] text-on-surface-variant font-space tracking-wider">LATENCY</div>
              <div className="text-sm md:text-base font-space font-semibold text-white font-mono">{latency} ms</div>
            </div>
            <div className="space-y-1">
              <div className="font-label-caps text-[10px] text-on-surface-variant font-space tracking-wider">MASTERY GAP</div>
              <div className="text-sm md:text-base font-space font-semibold text-primary uppercase">EXPONENTIAL</div>
            </div>
            <div className="space-y-1">
              <div className="font-label-caps text-[10px] text-on-surface-variant font-space tracking-wider">PHASE</div>
              <div className="text-sm md:text-base font-space font-semibold text-white uppercase">GALACTIC</div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Core Space Navigation Map */}
        <div className="md:col-span-4 flex flex-col gap-gutter">
          {/* Autonomy Relay stats */}
          <div className="glass-card rounded-xl p-6 flex-1 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-5 h-5 text-primary" />
              <h3 className="text-base font-space font-semibold text-white">Autonomy Relay</h3>
            </div>
            <div className="space-y-4 font-space text-[10px] tracking-wider text-on-surface-variant">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>COGNITIVE LEVERAGE</span>
                  <span className="text-white font-semibold">94%</span>
                </div>
                <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[94%]"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>SYNAPTIC FREQUENCY</span>
                  <span className="text-white font-semibold">28.4 GHz</span>
                </div>
                <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[78%]"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>CORE ALIGNMENT</span>
                  <span className="text-white font-semibold">99.9%</span>
                </div>
                <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[99.9%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Space Map with telemetry detail selection */}
          <div className="glass-card rounded-xl p-6 flex-1 flex flex-col justify-between border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-space font-semibold text-white">Core Mapping</h3>
              <Signal className="w-4 h-4 text-primary animate-pulse" />
            </div>

            {/* Interactive Space map representation */}
            <div className="flex-grow min-h-[140px] rounded-lg overflow-hidden relative border border-white/10 group/map">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale opacity-45 group-hover/map:grayscale-0 group-hover/map:scale-105 transition-all duration-700" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDy2nFyQe3Syl4cUk64WBhqxmD3lFZ82M0rAm_oYfXDtr2zvxY52BdnztqvWGeWmxEV0bQ6rhQ9lWu6310wIljXl2VMpQLPtSX3WVUHJURkelO4oJ-QbcbyKPI7EeNmam3SJm7nGh4g8fY2z2P2tvhOePZh22btQacs14sraykty5Rfi9-2l68AvyJvEFtbNVQdcgKr2rKyH9uYVvCnMdH31jCQ_dccZPk5n2oMZisFzgTvJf2rG-fk')" }}
              ></div>

              {/* Functional Hotspots on Map */}
              {starNodes.map((star, idx) => {
                const positions = [
                  { top: '35%', left: '30%' },
                  { top: '60%', left: '55%' },
                  { top: '45%', left: '75%' }
                ];
                return (
                  <button
                    key={star.id}
                    onClick={() => setActiveStarNode(star.id)}
                    className="absolute w-3.5 h-3.5 rounded-full bg-primary/20 border border-primary flex items-center justify-center hover:scale-125 transition-transform"
                    style={positions[idx]}
                    title={star.name}
                    id={`star-node-btn-${star.id}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  </button>
                );
              })}

              {/* Telemetry log Overlay */}
              {activeStarNode && (
                <div className="absolute bottom-2 left-2 right-2 p-2 bg-black/90 rounded-lg text-[9px] font-mono border border-primary/20 space-y-0.5 animate-fade-in" id="map-telemetry-panel">
                  <div className="flex justify-between font-bold text-primary">
                    <span>{starNodes.find(s => s.id === activeStarNode)?.name}</span>
                    <button onClick={() => setActiveStarNode(null)} className="text-[8px] text-white">X</button>
                  </div>
                  <div className="text-on-surface-variant">Coord: {starNodes.find(s => s.id === activeStarNode)?.coord}</div>
                  <div className="text-emerald-400">Status: {starNodes.find(s => s.id === activeStarNode)?.status}</div>
                </div>
              )}
            </div>

            <p className="font-label-caps text-[9px] mt-4 text-on-surface-variant text-center tracking-widest block font-space">
              TRAJECTORY: SINGULARITY CORE
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
