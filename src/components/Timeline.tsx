import React from 'react';
import { AgeType } from '../types';

interface TimelineProps {
  currentAge: AgeType;
  onChangeAge: (age: AgeType) => void;
}

export function Timeline({ currentAge, onChangeAge }: TimelineProps) {
  // Render contextual timeline nodes based on the current active view
  const renderTimelineContent = () => {
    switch (currentAge) {
      case 'Earth':
        return {
          title: "EVOLUTIONARY PROGRESS",
          subtitle: "ERA: BIOLOGICAL DOMINANCE",
          nodes: [
            { id: 'Earth' as AgeType, label: 'AGE 0 (EARTH)', active: true },
            { id: 'LEO' as AgeType, label: 'AGE 1' },
            { id: 'Moon' as AgeType, label: 'AGE 2' },
            { id: 'Mars' as AgeType, label: 'AGE 3' },
            { id: 'Interstellar' as AgeType, label: 'AGE 4+' }
          ],
          activeIdx: 0,
          gradientWidth: '15%'
        };

      case 'LEO':
        return {
          title: "AI MASTERY FRAMEWORK",
          subtitle: "STAGE: LEO COGNITIVE DIRECTIVES",
          nodes: [
            { id: 'Earth' as AgeType, label: 'Age 0: Human Lead' },
            { id: 'LEO' as AgeType, label: 'Age 1: LEO / Instructions', active: true },
            { id: 'Moon' as AgeType, label: 'Age 2: Moon / Planning' },
            { id: 'Mars' as AgeType, label: 'Age 3: Mars / Agents' },
            { id: 'Interstellar' as AgeType, label: 'Age 4: Deep Space / AGI' }
          ],
          activeIdx: 1,
          gradientWidth: '35%'
        };

      case 'Moon':
        return {
          title: "TIMELINE PROTOCOLS",
          subtitle: "STAGE: MOON AUTONOMOUS SYNAPSE",
          nodes: [
            { id: 'Earth' as AgeType, label: 'Earth' },
            { id: 'LEO' as AgeType, label: 'LEO' },
            { id: 'Moon' as AgeType, label: 'Moon (Age 2)', active: true },
            { id: 'Mars' as AgeType, label: 'Mars' },
            { id: 'Interstellar' as AgeType, label: 'Interstellar' }
          ],
          activeIdx: 2,
          gradientWidth: '55%'
        };

      case 'Mars':
        return {
          title: "AI MASTERY EVOLUTION ROADMAP",
          subtitle: "FRAMEWORK PROGRESSION",
          nodes: [
            { id: 'Earth' as AgeType, label: 'Age 1: Earth' },
            { id: 'LEO' as AgeType, label: 'Age 2: Moon' },
            { id: 'Mars' as AgeType, label: 'Age 3: Mars', active: true },
            { id: 'Interstellar' as AgeType, label: 'Age 4: Jupiter' },
            { id: 'Interstellar' as AgeType, label: 'Age 5: Interstellar' }
          ],
          activeIdx: 2, // Mars centered
          gradientWidth: '75%'
        };

      case 'Interstellar':
      default:
        return {
          title: "EVOLUTIONARY TIMELINE",
          subtitle: "STAGE: INTERSTELLAR MASTERY",
          nodes: [
            { id: 'Earth' as AgeType, label: '2024: GENESIS' },
            { id: 'LEO' as AgeType, label: '2042: MARS BASIS' },
            { id: 'Moon' as AgeType, label: '2089: SOLAR SYNC' },
            { id: 'Interstellar' as AgeType, label: '2124: INTERSTELLAR', active: true },
            { id: 'Interstellar' as AgeType, label: '????: TRANSCENDENCE', disabled: true }
          ],
          activeIdx: 3,
          gradientWidth: '85%'
        };
    }
  };

  const data = renderTimelineContent();

  return (
    <div className="w-full glass-card rounded-2xl p-6 md:p-8 overflow-hidden border border-white/5 relative z-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant font-space block">
          {data.title}
        </h3>
        <div className="text-primary font-space font-semibold text-xs tracking-wider">
          {data.subtitle}
        </div>
      </div>

      <div className="relative pt-6 pb-2">
        {/* Timeline Horizontal Track Line */}
        <div className="h-[2px] w-full bg-white/10 relative">
          <div 
            className="absolute top-0 left-0 h-full timeline-gradient transition-all duration-500"
            style={{ width: data.gradientWidth }}
          ></div>
        </div>

        {/* Timeline Clickable Node Markers */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-2 sm:px-4">
          {data.nodes.map((node, idx) => {
            const isActive = node.active;
            const isDisabled = node.disabled;

            return (
              <button
                key={idx}
                disabled={isDisabled}
                onClick={() => node.id && onChangeAge(node.id)}
                className={`flex flex-col items-center gap-2 group transition-all focus:outline-none ${
                  isDisabled 
                    ? 'opacity-20 cursor-not-allowed' 
                    : isActive 
                      ? 'text-primary scale-105 font-bold' 
                      : 'opacity-40 hover:opacity-100 cursor-pointer'
                }`}
                id={`timeline-node-${idx}`}
              >
                {/* Visual Dot */}
                {isActive ? (
                  <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#22D3EE] scale-110 transition-transform"></div>
                ) : (
                  <div className="w-3 h-3 bg-white rounded-full group-hover:scale-125 transition-all"></div>
                )}

                {/* Text label */}
                <span className={`font-label-caps text-[9px] md:text-[10px] tracking-wider text-center max-w-[80px] sm:max-w-[120px] line-clamp-2 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {node.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
