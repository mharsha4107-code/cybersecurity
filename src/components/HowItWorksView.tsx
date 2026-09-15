import React, { useState } from 'react';
import { 
  Cpu, 
  ArrowDown, 
  Layers, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  Activity, 
  Sparkles,
  GitBranch,
  Terminal
} from 'lucide-react';
import { AppView } from '../types';

interface HowItWorksViewProps {
  onNavigate: (view: AppView) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const pipelineSteps = [
    {
      step: 1,
      title: "USER INPUT",
      desc: "User observes anomalous mobile symptoms and answers 10 structured diagnostic questions.",
      detail: "Captures raw human observations regarding battery discharge, unauthorized sessions, payment anomalies, and uninitiated OTP spam.",
      codeSnippet: "answer[Q1] = 'YES', answer[Q2] = 'YES', answer[Q6] = 'NO'...",
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
    },
    {
      step: 2,
      title: "FACTS (Working Memory)",
      desc: "Raw responses are converted into propositional logic truth values.",
      detail: "Initializes the dynamic working memory state: unknown_app = TRUE, battery_drain = TRUE, unauthorized_transaction = FALSE.",
      codeSnippet: "WorkingMemory = { unknown_app: true, battery_drain: true, phone_hot: true... }",
      color: "border-blue-500/40 text-blue-400 bg-blue-950/30",
    },
    {
      step: 3,
      title: "KNOWLEDGE BASE",
      desc: "Codified repository of 18 domain-specific cybersecurity IF–THEN production rules.",
      detail: "Constructed using empirical mobile malware threat heuristics (banking Trojans, stalkerware, botnets, and credential theft).",
      codeSnippet: "RULE RB-01: IF unknown_app ∧ battery_drain THEN risk += 15",
      color: "border-indigo-500/40 text-indigo-400 bg-indigo-950/30",
    },
    {
      step: 4,
      title: "INFERENCE ENGINE",
      desc: "Forward-chaining pattern matcher evaluating working memory against rule preconditions.",
      detail: "Iterates through production rules, comparing current factual assertions against antecedent clauses.",
      codeSnippet: "engine.forwardChain(workingMemory, knowledgeBase.rules)",
      color: "border-purple-500/40 text-purple-400 bg-purple-950/30",
    },
    {
      step: 5,
      title: "RULE MATCHING & CONFLICT RESOLUTION",
      desc: "Handles multi-rule activations and eliminates linear score runaway.",
      detail: "Compound signatures fire concurrently (e.g. RAT Triad + Background Exfiltration). Conflict resolution dampens redundant indicators.",
      codeSnippet: "FiredRules = [RB-01, RB-05, RB-09]; ConflictResolution(AggregatedWeights)",
      color: "border-amber-500/40 text-amber-400 bg-amber-950/30",
    },
    {
      step: 6,
      title: "RISK SCORE CALCULATION",
      desc: "Synthesizes mathematical risk coefficient bounded between 0 and 100.",
      detail: "Calculated via non-linear exponential asymptote: Score = 100 * (1 - e^(-rawScore / 45)) with categorical floor enforcement.",
      codeSnippet: "NormalizedScore = 82 / 100",
      color: "border-orange-500/40 text-orange-400 bg-orange-950/30",
    },
    {
      step: 7,
      title: "SEVERITY DETERMINATION",
      desc: "Maps quantitative risk score into qualitative categorical tiers.",
      detail: "Strict classification brackets: 0–24 (LOW), 25–49 (MEDIUM), 50–74 (HIGH), 75–100 (CRITICAL).",
      codeSnippet: "Score 82 >= 75 -> Severity: 'CRITICAL'",
      color: "border-rose-500/40 text-rose-400 bg-rose-950/30",
    },
    {
      step: 8,
      title: "RECOMMENDATIONS",
      desc: "Generates prioritized triage and forensic preservation advice.",
      detail: "Matches immediate steps based on severity (network disconnection, session revocation, card freezes, evidence preservation).",
      codeSnippet: "Actions = [DisconnectNetworksImmediately, ResetPasswordsFromTrustedDevice...]",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    },
    {
      step: 9,
      title: "INCIDENT REPORT GENERATION",
      desc: "Produces an audit-ready cyber incident brief with unique tracking ID.",
      detail: "Compiles date/time, network status, propositional facts, fired rules, reasoning chains, and simulated CERT submission capability.",
      codeSnippet: "Report = GenerateBrief(CS-2026-0001, Timestamp, Telemetry, RulesFired)",
      color: "border-cyan-500/40 text-cyan-300 bg-cyan-950/30",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      {/* Title */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Academic AI / Expert System Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How the Expert System Works
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          A step-by-step examination of the forward-chaining inference pipeline, working memory management, and Explainable AI (XAI) reasoning module.
        </p>
      </div>

      {/* Explicit Academic Viva Components (Section 25 Requirement) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span>Core Academic Architecture Modules</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-300 font-mono text-xs block">1. KNOWLEDGE BASE</span>
            <p className="text-slate-400 leading-relaxed">
              Permanent repository storing 18 IF–THEN production rules representing cybersecurity heuristic knowledge regarding mobile malware and account takeover.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-blue-300 font-mono text-xs block">2. WORKING MEMORY</span>
            <p className="text-slate-400 leading-relaxed">
              Temporary runtime storage holding the current session's propositional facts extracted from user assessment answers (e.g. unknown_app = TRUE).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-purple-300 font-mono text-xs block">3. INFERENCE ENGINE</span>
            <p className="text-slate-400 leading-relaxed">
              The forward-chaining pattern matcher that compares facts in working memory against rule preconditions to determine which rules fire.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 font-mono text-xs block">4. CONFLICT RESOLUTION</span>
            <p className="text-slate-400 leading-relaxed">
              When multiple rules fire simultaneously, resolves weight competition and synthesizes normalized 0–100 risk score without double-counting identical symptoms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-rose-300 font-mono text-xs block">5. DECISION MODULE</span>
            <p className="text-slate-400 leading-relaxed">
              Maps aggregated quantitative risk scores into explicit discrete security tiers: LOW (0–24), MEDIUM (25–49), HIGH (50–74), and CRITICAL (75–100).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-300 font-mono text-xs block">6. EXPLANATION MODULE</span>
            <p className="text-slate-400 leading-relaxed">
              Explainable AI (XAI) subsystem that traces every conclusion back to specific satisfied rules and factual preconditions for human review.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Step-by-Step Flowchart (Section 18 Requirement) */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Visual Inference Pipeline
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            USER INPUT → FACTS → KNOWLEDGE BASE → INFERENCE ENGINE → RULE MATCHING → RISK SCORE → SEVERITY → RECOMMENDATIONS → INCIDENT REPORT
          </p>
        </div>

        <div className="space-y-3">
          {pipelineSteps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <React.Fragment key={step.step}>
                <div
                  id={`pipeline-step-${step.step}`}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? `${step.color} shadow-lg ring-1 ring-cyan-400/50 scale-[1.01]`
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-cyan-400">
                        {step.step}
                      </span>
                      <h3 className="font-mono text-sm font-bold tracking-wide">
                        {step.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-slate-400">
                      Phase {step.step} of 9
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-9">
                    {step.desc}
                  </p>

                  {isSelected && (
                    <div className="mt-3 pl-9 space-y-2 text-xs border-t border-slate-800/80 pt-3">
                      <p className="text-slate-400">{step.detail}</p>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                        <code>{step.codeSnippet}</code>
                      </div>
                    </div>
                  )}
                </div>

                {/* Arrow indicator between steps */}
                {idx < pipelineSteps.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-4 h-4 text-cyan-500/60 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">
          Ready to test the Expert System in action?
        </h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Execute a diagnostic run to see how propositional inputs are parsed into facts, matched against the knowledge base, and explained in the incident brief.
        </p>
        <button
          onClick={() => onNavigate('assessment')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
        >
          <Cpu className="w-4 h-4 text-slate-950" />
          <span>Launch Interactive Assessment</span>
        </button>
      </div>
    </div>
  );
};
