import React, { useState, useEffect } from 'react';
import { User, Settings, Sparkles, Orbit, Clock } from 'lucide-react';
import { AgeType, AssessmentResult } from '../types';

interface HeaderProps {
  currentAge: AgeType;
  onOpenSettings: () => void;
  userResult: AssessmentResult | null;
  timezoneSetting: string;
}

export function Header({ currentAge, onOpenSettings, userResult, timezoneSetting }: HeaderProps) {
  const [timeStr, setTimeStr] = useState('');

  // Dynamic time renderer supporting contextual space timezones!
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (timezoneSetting === 'SOL') {
        // Mars sol calculation simulation
        const baseSol = 142.345;
        const secondFraction = (now.getSeconds() + now.getMilliseconds() / 1000) / 86400;
        setTimeStr(`Sol ${(baseSol + secondFraction).toFixed(5)} MCD`);
      } else if (timezoneSetting === 'LST') {
        // Lunar standard time calculation simulation
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        setTimeStr(`${hours}:${minutes}:${seconds} LST`);
      } else if (timezoneSetting === 'CORE') {
        // Quantum singularity core ticker
        const quantumVal = Math.floor(now.getTime() * 1.618) % 100000000;
        setTimeStr(`Q-${quantumVal} SYNC`);
      } else {
        // Standard UTC
        setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezoneSetting]);

  const getBadgeLabel = () => {
    switch (currentAge) {
      case 'Earth': return "MASTERY: ORIGINS (EARTH)";
      case 'LEO': return "SECTOR: LEO_01";
      case 'Moon': return "SECTOR: MOON_v2.4";
      case 'Mars': return "MISSION: MARS DASHBOARD";
      case 'Interstellar':
      default:
        return "MASTERY: GALACTIC CORE";
    }
  };

  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-4 md:px-margin-desktop py-5 bg-transparent relative">
      {/* Invisible layer to blur top background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1416]/50 to-transparent pointer-events-none"></div>

      {/* Title logo and current active sector readouts */}
      <div className="flex items-center gap-4 relative z-10 pl-12 md:pl-0">
        <h1 className="font-space font-bold text-lg md:text-xl text-primary tracking-tighter uppercase">
          AI Age
        </h1>
        <div className="h-4 w-px bg-white/20"></div>
        <span className="font-label-caps text-[10px] text-on-surface-variant font-space tracking-widest uppercase opacity-75">
          {getBadgeLabel()}
        </span>
      </div>

      {/* Right controls: telemetry clock, settings profile */}
      <div className="flex items-center gap-4 md:gap-6 relative z-10">
        {/* Dynamic Space Clock */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-primary bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg">
          <Clock className="w-3 h-3 text-primary" />
          <span>{timeStr}</span>
        </div>

        {/* Profile indicator and action triggers */}
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center justify-center rounded-lg hover:bg-white/5"
            id="user-profile-btn"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Inline Profile popup */}
          {showProfile && (
            <div className="absolute right-0 mt-3 w-64 p-5 glass-card rounded-xl border border-primary/20 z-50 animate-fade-in" id="profile-popup">
              <span className="font-label-caps text-[9px] text-primary block uppercase tracking-wider mb-2 font-space">PILOT SIGNATURE</span>
              <div className="space-y-3 font-sans text-xs text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Class:</span>
                  <span className="text-white font-medium">Explorer Node-01</span>
                </div>
                <div className="flex justify-between">
                  <span>Autonomy Rating:</span>
                  <span className="text-white font-medium font-space uppercase">
                    {userResult ? userResult.level : "Age 3 (Consensus)"}
                  </span>
                </div>
                {userResult && (
                  <div className="flex justify-between border-t border-white/5 pt-2">
                    <span>Performance index:</span>
                    <span className="text-emerald-400 font-bold">{userResult.multiplier}</span>
                  </div>
                )}
                <div className="border-t border-white/5 pt-2 text-[10px] opacity-60 text-center">
                  Secure satellite uplink linked to leon.zheng2016@gmail.com
                </div>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={onOpenSettings}
          className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center justify-center rounded-lg hover:bg-white/5"
          id="global-settings-btn"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
