import React, { useEffect, useState } from 'react';
import { Cpu, Check, Activity, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

interface InferenceAnimationModalProps {
  onComplete: () => void;
}

const INFERENCE_STEPS = [
  { id: 1, label: "Collecting facts into working memory...", detail: "Parsing 10 user propositional inputs into binary knowledge state." },
  { id: 2, label: "Evaluating security rules...", detail: "Querying 18 IF–THEN production rules across 5 threat categories." },
  { id: 3, label: "Matching suspicious indicators...", detail: "Cross-referencing multi-factor vectors and compound attack signatures." },
  { id: 4, label: "Calculating risk score...", detail: "Applying non-linear dampening and conflict resolution algorithms." },
  { id: 5, label: "Determining severity...", detail: "Classifying risk baseline into LOW / MEDIUM / HIGH / CRITICAL." },
];

export const InferenceAnimationModal: React.FC<InferenceAnimationModalProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < INFERENCE_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 space-y-6 animate-in fade-in zoom-in duration-300">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Expert System Inference Engine
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Forward-Chaining Rule Evaluator
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold animate-pulse">
            PROCESSING
          </span>
        </div>

        {/* Center Animated Visual */}
        <div className="py-4 flex flex-col items-center justify-center text-center space-y-3">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-950 border-2 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.35)]">
            <Activity className="w-10 h-10 text-cyan-400 animate-pulse" />
            <div className="absolute -inset-1 rounded-2xl border border-cyan-400/20 animate-ping opacity-25" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-cyan-400 font-semibold">
              STEP {currentStepIndex + 1} OF {INFERENCE_STEPS.length}
            </p>
            <h4 className="text-base font-bold text-white">
              {INFERENCE_STEPS[currentStepIndex].label}
            </h4>
            <p className="text-xs text-slate-400 max-w-sm">
              {INFERENCE_STEPS[currentStepIndex].detail}
            </p>
          </div>
        </div>

        {/* 5-Step Progress Stack */}
        <div className="space-y-2 pt-2">
          {INFERENCE_STEPS.map((step, idx) => {
            const isFinished = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs font-mono ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-300'
                    : isFinished
                    ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                    : 'bg-slate-950/20 border-slate-900 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isFinished
                        ? 'bg-emerald-500 text-slate-950'
                        : isCurrent
                        ? 'bg-cyan-400 text-slate-950 animate-pulse'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isFinished ? <Check className="w-3 h-3 stroke-[3]" /> : step.id}
                  </div>
                  <span>{step.label}</span>
                </div>
                {isCurrent && (
                  <span className="text-[10px] text-cyan-400 animate-pulse">Running...</span>
                )}
                {isFinished && (
                  <span className="text-[10px] text-emerald-400">Done</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Terminal Line */}
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="truncate">exec: engine.forwardChain(facts, knowledgeBase.rules)</span>
        </div>
      </div>
    </div>
  );
};
