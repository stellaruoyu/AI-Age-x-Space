import React from 'react';
import { Globe, Rocket, Moon, Compass, Stars, Cpu, Sparkles, RefreshCw, Menu, X } from 'lucide-react';
import { AgeType } from '../types';

interface SidebarProps {
  currentAge: AgeType;
  onChangeAge: (age: AgeType) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ currentAge, onChangeAge, mobileOpen, setMobileOpen }: SidebarProps) {
  const menuItems = [
    { id: 'Earth' as AgeType, label: 'Earth (Age 0)', icon: Globe },
    { id: 'LEO' as AgeType, label: 'LEO (Age 1)', icon: Rocket },
    { id: 'Moon' as AgeType, label: 'Moon (Age 2)', icon: Moon },
    { id: 'Mars' as AgeType, label: 'Mars (Age 3)', icon: Compass },
    { id: 'Interstellar' as AgeType, label: 'Interstellar', icon: Stars },
  ];

  const getSubheader = () => {
    switch (currentAge) {
      case 'Earth': return "Origins Phase";
      case 'LEO': return "Precise Sync";
      case 'Moon': return "End-to-End Coding";
      case 'Mars': return "Multi-Agent Mesh";
      case 'Interstellar':
      default:
        return "Beyond Age 3";
    }
  };

  const getFooterWidget = () => {
    switch (currentAge) {
      case 'Earth':
        return (
          <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-1">
            <span className="font-label-caps text-[9px] text-on-surface-variant/40 uppercase block font-space">
              Human Era
            </span>
            <p className="text-xs text-on-surface font-sans font-medium">Biological Supremacy</p>
          </div>
        );
      case 'LEO':
        return (
          <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
            <span className="font-label-caps text-[9px] text-primary/60 uppercase block font-space tracking-wider">
              UPLINK HEALTH
            </span>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[80%]"></div>
            </div>
          </div>
        );
      case 'Moon':
        return (
          <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-label-caps text-[9px] text-primary/60 uppercase block font-space">
                SYNC STATUS
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <p className="text-[10px] text-on-surface-variant font-mono">NOMINAL - L2 COMMITS</p>
          </div>
        );
      case 'Mars':
        return (
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]"></div>
              <span className="font-label-caps text-[9px] text-white uppercase block font-space">
                AGENT MESH ACTIVE
              </span>
            </div>
            <div className="text-on-surface-variant text-[9px] font-mono opacity-50">SYNC: DECEN_NOMINAL</div>
          </div>
        );
      case 'Interstellar':
      default:
        return (
          <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
            <span className="font-label-caps text-[9px] text-primary/60 uppercase block font-space">
              MASTERY LEVEL
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary font-space">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              GALACTIC CORE
            </div>
          </div>
        );
    }
  };

  const handleSelect = (id: AgeType) => {
    onChangeAge(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2.5 bg-surface-container/60 backdrop-blur-xl border border-white/10 rounded-xl text-primary"
        id="sidebar-toggle-btn"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Side Navigation Bar container */}
      <aside className={`fixed top-0 bottom-0 left-0 h-full w-64 bg-surface-container/25 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between py-8 z-40 transition-all duration-300 md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="space-y-10">
          {/* Logo Brand Header */}
          <div className="px-6 space-y-1">
            <h2 className="text-2xl font-space font-bold text-primary tracking-tighter flex items-center gap-2">
              <Cpu className="w-6 h-6 text-primary" />
              AI Age
            </h2>
            <p className="font-label-caps text-[9px] text-on-surface-variant/60 uppercase mt-1 tracking-widest block font-space">
              {getSubheader()}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 px-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentAge === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 text-left rounded-lg text-xs font-space uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-primary font-bold border-r-2 border-primary bg-primary/5 shadow-[0_0_15px_rgba(34,211,238,0.05)]'
                      : 'text-on-surface-variant opacity-60 hover:opacity-100 hover:bg-white/5'
                  }`}
                  id={`sidebar-item-${item.id}`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer contextual stats widget */}
        <div className="px-6 mt-auto">
          {getFooterWidget()}
        </div>
      </aside>
    </>
  );
}
