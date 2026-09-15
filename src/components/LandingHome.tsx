import React from 'react';
import { 
  Shield, 
  Smartphone, 
  Cpu, 
  AlertTriangle, 
  FileText, 
  ChevronRight, 
  Lock, 
  Terminal, 
  Sparkles,
  Info
} from 'lucide-react';
import { AppView } from '../types';

interface LandingHomeProps {
  onNavigate: (view: AppView) => void;
  onStartAssessment: () => void;
}

export const LandingHome: React.FC<LandingHomeProps> = ({
  onNavigate,
  onStartAssessment,
}) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 md:pt-12">
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>College Academic Project Prototype</span>
              <span className="text-slate-400">·</span>
              <span className="text-amber-400 font-mono">Demo Mode</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                CyberShield
                <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 mt-2">
                  Mobile Cyber Security Expert System
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Detect suspicious security indicators, assess incident severity, and generate a structured cyber incident report using a rule-based AI reasoning engine.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-start-assessment-btn"
                onClick={onStartAssessment}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Smartphone className="w-4 h-4 text-slate-950" />
                <span>Start Security Assessment</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                id="hero-how-it-works-btn"
                onClick={() => onNavigate('how-it-works')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>How It Works</span>
              </button>
            </div>

            {/* Academic Notice Banner */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-200">Academic Prototype Notice:</strong> Operating in strict <strong>Demo Mode</strong>. 
                This expert system evaluates heuristic indicators through classical propositional logic. It does not perform invasive hacking, remote tracing, or automated law enforcement dispatch.
              </p>
            </div>
          </div>

          {/* Hero Right Visual Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
              {/* Terminal-like top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">soc.engine.cybershield</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  RULE-ENGINE: ACTIVE
                </span>
              </div>

              {/* Graphic Center Shield */}
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-950/80 via-blue-950/60 to-slate-900 border-2 border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.25)]">
                  <Shield className="w-14 h-14 text-cyan-400" />
                  <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 animate-spin-slow" />
                </div>
                <h3 className="mt-4 font-bold text-white text-base">Mobile Heuristic Shield</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">18 Production Rules · 10 Facts Base</p>
              </div>

              {/* Real-time telemetry indicators */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    Inference Paradigm
                  </span>
                  <span className="text-emerald-400 font-medium">Forward Chaining</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-400" />
                    Working Memory
                  </span>
                  <span className="text-cyan-300 font-medium">Propositional Logic</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Severity Output
                  </span>
                  <span className="text-amber-300 font-medium">Explainable XAI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Cards Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Academic Expert System Architecture
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Engineered to demonstrate classical Artificial Intelligence inference methods applied to modern mobile device cybersecurity incidents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div 
            id="feature-card-1"
            className="group p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                1. Smart Security Assessment
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Evaluates 10 critical symptom vectors including rogue applications, anomalous thermal spikes, unauthorized financial activity, and unprompted MFA requests.
              </p>
            </div>
            <button 
              onClick={onStartAssessment}
              className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
            >
              <span>Begin Questionnaire</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div 
            id="feature-card-2"
            className="group p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                2. Rule-Based Expert System
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Matches observed facts against a transparent knowledge base of 18 IF–THEN production rules, handling conflict resolution and multi-indicator compounding.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('knowledge-base')}
              className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300"
            >
              <span>Inspect Rules Base</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 */}
          <div 
            id="feature-card-3"
            className="group p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-800/60 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                3. Risk & Severity Analysis
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Calculates a normalized 0–100 risk score and categorizes severity into LOW, MEDIUM, HIGH, or CRITICAL with full Explainable AI reasoning chains.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300"
            >
              <span>View Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4 */}
          <div 
            id="feature-card-4"
            className="group p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                4. Incident Report Generation
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Produces formal cyber incident briefs with unique incident tracking IDs, triggered rule traces, downloadable files, and simulated CERT submission.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('incident-reports')}
              className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
            >
              <span>View Sample Brief</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
