import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Info, Globe, ShieldCheck, Heart, Moon, Compass, Stars } from 'lucide-react';
import { AgeType, AssessmentResult } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { EarthView } from './components/EarthView';
import { LeoView } from './components/LeoView';
import { MoonView } from './components/MoonView';
import { MarsView } from './components/MarsView';
import { InterstellarView } from './components/InterstellarView';
import { 
  AssessmentModal, 
  PromptGridModal, 
  AgentMeshModal, 
  SettingsModal 
} from './components/InteractiveModals';

export default function App() {
  // Navigation & View coordinating state
  const [currentAge, setCurrentAge] = useState<AgeType>('Interstellar');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modal display states
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [promptGridOpen, setPromptGridOpen] = useState(false);
  const [meshMatrixOpen, setMeshMatrixOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Settings & Customization
  const [grainOpacity, setGrainOpacity] = useState(0.03);
  const [timezone, setTimezone] = useState('UTC');

  // Parallax dynamic cursor state
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Persistent User Self-Test Result
  const [userResult, setUserResult] = useState<AssessmentResult | null>(null);

  // Galactic Prime Directive Protocol popup state
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  // Spasmodic status indicator messages
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Load persistent scores from local storage
  useEffect(() => {
    const saved = localStorage.getItem('ai_age_assessment');
    if (saved) {
      try {
        setUserResult(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading assessment log:", e);
      }
    }
  }, []);

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setUserResult(result);
    localStorage.setItem('ai_age_assessment', JSON.stringify(result));
    setAssessmentOpen(false);

    // Trigger visual feedback notification
    triggerAlert(`Cognitive level synchronized: ${result.level} validated successfully.`);
    
    // Switch to the scored view automatically to show active highlight!
    if (result.level === 'Age 0') setCurrentAge('Earth');
    else if (result.level === 'Age 1') setCurrentAge('LEO');
    else if (result.level === 'Age 2') setCurrentAge('Moon');
    else if (result.level === 'Age 3') setCurrentAge('Mars');
  };

  const handleReset = () => {
    localStorage.removeItem('ai_age_assessment');
    setUserResult(null);
    setCurrentAge('Interstellar');
    triggerAlert("Emergency reset completed. Autonomy scores purged from core buffer.");
  };

  const triggerAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 5000);
  };

  // Parallax effect on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseMoveEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
      setParallaxOffset({ x: moveX, y: moveY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Map contextual cinematic backgrounds for each state!
  const getBackgroundImage = () => {
    switch (currentAge) {
      case 'Earth':
        return "https://lh3.googleusercontent.com/aida/AP1WRLuHhQkKqgegUvo5KWZJA0WGL3L_7dLM8q-YTwPCupAPMsesm_5w3On3G574a2IjbKcTPEwnAlA0GkwXJErOqIhPsi6M8ToSv1yxN9dhrqxqF8N-ZL-aM-P_FQoIfu99vMRP_qgE4CeMiZlPhFoaoCU1WeyJ7f4GbUOSiNh0wtq_KWYvaDS4Q61KYGiRreHkDA_V7Atiby1a39kLwNIh9nt97-7_ZYdc2c_uo0Zhew59cyJaidSP96vGNpE";
      case 'LEO':
        return "https://lh3.googleusercontent.com/aida/AP1WRLukGAFRFFgDmVxgLAyIwCu9KzpBiGRLT-FREGPqkx8awcz4gNGOFgal-QLYEknRF-e9VDrJ-M78cbA2sg2ehAlVrK8gpTiZ3EY_kKS9XtXkdFl5oUPAqHugYq4CwSax6O5fMqO82y2aFK-SBRuz9KRyVO1DZld1vALYu42T6z66F3XVlcTDo7udm1zJiqUPv-Zv7oXBfc9IkPuTllbeyJ13gI7EQiogbMAIYd_0bkwbKVUN28_FfXywuw";
      case 'Moon':
        return "https://lh3.googleusercontent.com/aida/AP1WRLv_PQTZjT9lq3jKoUDP323KChXB8R2y80p58cZMPmI70XsMKj2GNWS6vMa-u8TZ3y-VArfth471imCjyJ3M_8kThEJCeNcKs0mtdY7UuK1tHZdFuIQg5jCrHW8XY9sul3CJ2TovKfy6KkAbT1x7sPxrKNzvOZzcnPNep9WveDSGtYkU-ZJ2OYiPdiD1Nos2UGX4PON3M3q6KQ5aQ2Ifgx2b3BIzbJ1tmpQx4FQLu_LPpqNUfFPBvxAQA68";
      case 'Mars':
        return "https://lh3.googleusercontent.com/aida/AP1WRLvrR1Vyjtp_iFh6cE4Xdev002sVSyvnL0DoQVfR0HqR1w6i2iV0tZfnDJ4VyekJe2rylcHPH37M5KbmmKdZDdf1CravShEIrEQ-PZk0903Nz9Ep7TmnytmFZErM68CI2MGUOo5Lo0ifiZVyjLTOkOgVQR5WlgTVamIDa2oiNNpGOj-GFHbR7dtvhD0VF-R1Eu7Aqs7l5E9N6h2GQKTisND2_u9-FzLopd-YqwZjX7YefIzUJqaO1y2fSQ";
      case 'Interstellar':
      default:
        return "https://lh3.googleusercontent.com/aida-public/AB6AXuCSsWftqhdMBKl1jtCnFRzqvagkwLR5DjElTy1pWmJSBEm9xuLaFo9nYgh3XodxA049BwsrCKLT5IELGGDJt3tLLnY1svgpk7xkNZH4QMPg8fZ1ky6K4AUYAwBLtNHH4VPlaCxhlie0yKYQ1kTrCYNJzZ2rsV5pBvBZngsAtGG_e0OCjpH2-uXacvv-1qWY2gX9yzdqxdHq6c6pTQYCehdSMPWMzGMDr1XH8SLM3V1cXuAPlYR39X0f";
    }
  };

  const renderActiveView = () => {
    switch (currentAge) {
      case 'Earth':
        return <EarthView onOpenAssessment={() => setAssessmentOpen(true)} />;
      case 'LEO':
        return <LeoView onOpenPromptGrid={() => setPromptGridOpen(true)} />;
      case 'Moon':
        return <MoonView />;
      case 'Mars':
        return <MarsView onOpenMeshMatrix={() => setMeshMatrixOpen(true)} />;
      case 'Interstellar':
      default:
        return (
          <InterstellarView 
            onOpenAssessment={() => setAssessmentOpen(true)} 
            userResult={userResult} 
          />
        );
    }
  };

  // Spark random cyber-warnings on the HUD
  const triggerTelemetrySpark = () => {
    const alerts = [
      "Quantum sync integrity rating: 99.98% nominal.",
      "Solar radiation flare detected in Sector L-4. Adjusting grid screens.",
      "Sync validation completed. Core database synchronized successfully.",
      "Antigravity stabilizer adjusted to 1.0003 G.",
      "Observability matrix reported zero logic errors.",
      "Satellite terminal link switched to redundant backup channel."
    ];
    const randomMsg = alerts[Math.floor(Math.random() * alerts.length)];
    triggerAlert(randomMsg);
  };

  const getFooterYear = () => {
    switch (currentAge) {
      case 'Earth': return '2024';
      case 'LEO': return '2025';
      case 'Moon': return '2025';
      case 'Mars': return '2026';
      case 'Interstellar':
      default:
        return '2124';
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/30 text-on-surface">
      
      {/* Filmic Ambient Noise Grain Overlay */}
      <div 
        className="filmic-grain" 
        style={{ opacity: grainOpacity }}
      ></div>

      {/* Fullscreen Parallax Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/45 z-10"></div>
        <div 
          className="absolute inset-0 scale-110 blur-[0.5px] bg-cover bg-center transition-transform duration-300 ease-out"
          style={{ 
            backgroundImage: `url("${getBackgroundImage()}")`,
            transform: `scale(1.1) translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`
          }}
        ></div>
      </div>

      {/* Cyber Brackets overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-8 h-8 border border-t-2 border-l-2 border-primary/40"></div>
        <div className="absolute top-1/4 right-1/4 w-8 h-8 border border-t-2 border-r-2 border-primary/40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 border border-b-2 border-l-2 border-primary/40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 border border-b-2 border-r-2 border-primary/40"></div>
        <div className="scan-line absolute inset-x-0 h-px bg-primary/20 blur-sm"></div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex relative z-20 min-h-screen">
        
        {/* Navigation Sidebar */}
        <Sidebar 
          currentAge={currentAge} 
          onChangeAge={setCurrentAge}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />

        {/* Core Main Area */}
        <div className="flex-1 flex flex-col justify-between pl-0 md:pl-64 pt-24 pb-12 px-4 md:px-margin-desktop min-h-screen">
          
          {/* Top telemetry bar */}
          <Header 
            currentAge={currentAge}
            onOpenSettings={() => setSettingsOpen(true)}
            userResult={userResult}
            timezoneSetting={timezone}
          />

          {/* Dynamic Interactive View */}
          <main className="flex-1 flex flex-col justify-center py-8 relative z-20">
            {renderActiveView()}
          </main>

          {/* Bottom Roadmap Timeline Navigation */}
          <div className="mt-8">
            <Timeline 
              currentAge={currentAge}
              onChangeAge={setCurrentAge}
            />
          </div>

          {/* Persistent Footer and credits */}
          <footer className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-white/5 text-xs text-on-surface-variant/60 font-sans">
            <div>
              © {getFooterYear()} AI Age Exploration. All systems nominal.
            </div>
            <div className="flex gap-6 font-label-caps text-[10px] tracking-wider font-space">
              <button 
                onClick={() => setActiveProtocol('prime_directive')} 
                className="hover:text-primary transition-colors cursor-pointer uppercase"
                id="footer-protocol-btn"
              >
                Galactic Protocol
              </button>
              <button 
                onClick={() => setActiveProtocol('privacy_matrix')} 
                className="hover:text-primary transition-colors cursor-pointer uppercase"
                id="footer-privacy-btn"
              >
                Privacy Matrix
              </button>
              <button 
                onClick={() => setActiveProtocol('contact_command')} 
                className="hover:text-primary transition-colors cursor-pointer uppercase"
                id="footer-contact-btn"
              >
                Contact Command
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Telemetry alert HUD notification */}
      {alertMessage && (
        <div className="fixed bottom-24 left-4 md:left-margin-desktop bg-surface-dim/95 border border-primary/30 p-4 rounded-xl text-xs font-mono text-primary shadow-[0_0_20px_rgba(34,211,238,0.15)] z-50 flex items-center gap-3 animate-fade-in" id="hud-alert">
          <Terminal className="w-4 h-4 text-primary animate-pulse" />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* Ambient Spark Floating Action Button */}
      <div className="fixed bottom-6 right-6 md:bottom-margin-desktop md:right-margin-desktop z-50">
        <button 
          onClick={triggerTelemetrySpark}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_24px_rgba(34,211,238,0.3)] hover:scale-[0.93] transition-transform active:scale-90 cursor-pointer group"
          title="Send Telemetry Ping"
          id="spark-ping-btn"
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-black group-hover:rotate-45 transition-transform" />
        </button>
      </div>

      {/* Interactive Information Modals */}
      <AssessmentModal 
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
        onComplete={handleAssessmentComplete}
      />

      <PromptGridModal 
        isOpen={promptGridOpen}
        onClose={() => setPromptGridOpen(false)}
      />

      <AgentMeshModal 
        isOpen={meshMatrixOpen}
        onClose={() => setMeshMatrixOpen(false)}
      />

      <SettingsModal 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        grainOpacity={grainOpacity}
        setGrainOpacity={setGrainOpacity}
        timezone={timezone}
        setTimezone={setTimezone}
        onReset={handleReset}
      />

      {/* Prime Directive Galactic Protocol Modals */}
      {activeProtocol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md p-8 glass-card rounded-2xl border-primary/20 relative" id="protocol-modal">
            <button 
              onClick={() => setActiveProtocol(null)}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
              id="close-protocol-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {activeProtocol === 'prime_directive' && (
              <>
                <div className="mb-4">
                  <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-1">prime directive</span>
                  <h3 className="text-xl font-space font-semibold text-white">Galactic Protocol</h3>
                </div>
                <div className="space-y-3 text-xs text-on-surface-variant font-sans leading-relaxed">
                  <p>
                    1. <strong className="text-white">Autonomy Conservation:</strong> Machine entities must operate at maximum self-healing capacities before prompting biological command vectors.
                  </p>
                  <p>
                    2. <strong className="text-white">Loop Verification:</strong> Every generated code block must suffer compiler validation and unit telemetry assertions before merging with production orbits.
                  </p>
                  <p>
                    3. <strong className="text-white">Luminance Integrity:</strong> High-contrast readable interface layouts must be maintained across all terminal hubs near Earth, Moon, Mars, and Deep space grids.
                  </p>
                </div>
              </>
            )}

            {activeProtocol === 'privacy_matrix' && (
              <>
                <div className="mb-4">
                  <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-1">SECURE ENCRYPTED ENVELOPE</span>
                  <h3 className="text-xl font-space font-semibold text-white">Privacy Matrix</h3>
                </div>
                <div className="space-y-3 text-xs text-on-surface-variant font-sans leading-relaxed">
                  <p>
                    All telemetry logs, self-test assessments, and sandbox code edits remain strictly encapsulated on the local memory buffer of Explorer Node-01. No sensitive coordinates are leaked into public neural networks or unencrypted satellite arrays.
                  </p>
                  <p>
                    Uplink securely managed via AES-256 standard protocols. Zero telemetry metrics are sold, traded, or archived for non-exploration motives.
                  </p>
                </div>
              </>
            )}

            {activeProtocol === 'contact_command' && (
              <>
                <div className="mb-4">
                  <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-1">quantum distress frequency</span>
                  <h3 className="text-xl font-space font-semibold text-white">Contact Command</h3>
                </div>
                <div className="space-y-4 text-xs text-on-surface-variant font-sans leading-relaxed">
                  <p>
                    To establish direct synchronization or report logical anomalies with the Deep Space cluster telemetry systems, broadcast to:
                  </p>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl font-mono text-center text-primary">
                    leon.zheng2016@gmail.com
                  </div>
                  <p className="text-[10px] text-center opacity-60">
                    Transmissions queued over hyper-light solar network bands. Response average time: 0.0001 ms.
                  </p>
                </div>
              </>
            )}

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setActiveProtocol(null)}
                className="px-4 py-2 bg-primary text-black font-space font-semibold text-[10px] uppercase tracking-wider rounded hover:bg-primary/90"
                id="acknowledge-protocol-btn"
              >
                Acknowledge Directive
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Simple close helper import
import { X } from 'lucide-react';
import { MouseEvent as ReactMouseEvent } from 'react';

// MouseMoveEvent matching standard types
interface MouseMoveEvent {
  clientX: number;
  clientY: number;
}
