import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  AlertCircle, 
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';
import { AnswerValue } from '../types';
import { ASSESSMENT_QUESTIONS } from '../expertSystem/questions';

interface SecurityAssessmentProps {
  answers: Record<number, AnswerValue>;
  onAnswerChange: (questionId: number, value: AnswerValue) => void;
  onAnalyze: () => void;
  onReset: () => void;
  onLoadPreset: (type: 'critical' | 'medium' | 'clean') => void;
}

export const SecurityAssessment: React.FC<SecurityAssessmentProps> = ({
  answers,
  onAnswerChange,
  onAnalyze,
  onReset,
  onLoadPreset,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);

  const currentQ = ASSESSMENT_QUESTIONS[currentIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === totalQuestions;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectAnswer = (value: AnswerValue) => {
    onAnswerChange(currentQ.id, value);
    setShowIncompleteWarning(false);
    // Automatically advance to next question after selecting, unless it's the last question
    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
      }, 250);
    }
  };

  const handleAnalyzeClick = () => {
    if (!isComplete) {
      setShowIncompleteWarning(true);
      return;
    }
    onAnalyze();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Title & Subtitle */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Diagnostic Module</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Mobile Security Assessment
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Answer the following questions based on unusual activity you have noticed.
        </p>
      </div>

      {/* Preset Evaluation Scenarios Bar (High academic presentation utility) */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-semibold text-slate-200">Viva Demo Presets:</span>
          <span>Load sample test cases quickly:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { onLoadPreset('critical'); setShowIncompleteWarning(false); }}
            className="px-2.5 py-1 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-800/60 hover:bg-rose-900 transition-colors font-medium"
          >
            Critical Attack Scenario
          </button>
          <button
            onClick={() => { onLoadPreset('medium'); setShowIncompleteWarning(false); }}
            className="px-2.5 py-1 rounded-lg bg-yellow-950/80 text-yellow-300 border border-yellow-800/60 hover:bg-yellow-900 transition-colors font-medium"
          >
            Medium Suspicion Scenario
          </button>
          <button
            onClick={() => { onLoadPreset('clean'); setShowIncompleteWarning(false); }}
            className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900 transition-colors font-medium"
          >
            Clean Device Baseline
          </button>
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset All Answers"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar & Indicators */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-cyan-400 font-bold">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-slate-400">
            {answeredCount} of {totalQuestions} answered ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-between pt-2">
          {ASSESSMENT_QUESTIONS.map((q, idx) => {
            const hasAnswer = answers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 scale-110 shadow-lg'
                    : hasAnswer
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/80 text-slate-500 border border-slate-800 hover:border-slate-700'
                }`}
                title={`Jump to Question ${q.id}`}
              >
                {q.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl shadow-cyan-950/20 space-y-6">
        {/* Category & Weight Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60">
              Q{currentQ.id}
            </span>
            <span className="text-xs font-medium text-slate-400">
              Domain: <strong className="text-slate-200">{currentQ.category}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">Inference Fact:</span>
            <code className="text-cyan-300 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
              {currentQ.factKey}
            </code>
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {currentQ.question}
          </h2>
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-300">Cybersecurity Context:</strong> {currentQ.explanation}
            </p>
          </div>
        </div>

        {/* Interactive Answer Selection Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* YES Option */}
          <button
            id={`q-${currentQ.id}-option-yes`}
            onClick={() => handleSelectAnswer('yes')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
              answers[currentQ.id] === 'yes'
                ? 'bg-rose-950/40 border-rose-500 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.2)] scale-[1.02]'
                : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <CheckCircle2 className={`w-6 h-6 ${answers[currentQ.id] === 'yes' ? 'text-rose-400' : 'text-slate-400'}`} />
            <span className="font-bold text-base">YES</span>
            <span className="text-[11px] text-slate-400">Activity was observed</span>
          </button>

          {/* NO Option */}
          <button
            id={`q-${currentQ.id}-option-no`}
            onClick={() => handleSelectAnswer('no')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
              answers[currentQ.id] === 'no'
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-[1.02]'
                : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <XCircle className={`w-6 h-6 ${answers[currentQ.id] === 'no' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="font-bold text-base">NO</span>
            <span className="text-[11px] text-slate-400">Activity was NOT observed</span>
          </button>

          {/* NOT SURE Option */}
          <button
            id={`q-${currentQ.id}-option-not-sure`}
            onClick={() => handleSelectAnswer('not_sure')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
              answers[currentQ.id] === 'not_sure'
                ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-[1.02]'
                : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <HelpCircle className={`w-6 h-6 ${answers[currentQ.id] === 'not_sure' ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="font-bold text-base">NOT SURE</span>
            <span className="text-[11px] text-slate-400">Uncertain or unverifiable</span>
          </button>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500 bg-slate-900'
                : 'text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-mono text-slate-500">
            {answers[currentQ.id] ? (
              <span className="text-cyan-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Fact recorded: {answers[currentQ.id]?.toUpperCase()}
              </span>
            ) : (
              'Selection required'
            )}
          </span>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="assessment-submit-final-btn"
              onClick={handleAnalyzeClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            >
              <Cpu className="w-4 h-4 text-slate-950" />
              <span>Analyze Security Risk</span>
            </button>
          )}
        </div>
      </div>

      {/* Incomplete Warning Message */}
      {showIncompleteWarning && (
        <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-600/60 text-amber-300 flex items-start gap-3 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-200">Assessment Incomplete:</span>
            <p>
              Please answer all 10 diagnostic questions to establish the full propositional working memory required by the Expert System inference engine. ({answeredCount}/{totalQuestions} completed).
            </p>
          </div>
        </div>
      )}

      {/* Primary Bottom Action Bar when all questions are answered */}
      {isComplete && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-blue-950/50 border border-cyan-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Working Memory Primed (10/10 Facts Collected)</span>
            </div>
            <p className="text-xs text-slate-400">
              Ready to execute forward-chaining inference over 18 Knowledge Base rules.
            </p>
          </div>

          <button
            id="assessment-bottom-analyze-btn"
            onClick={onAnalyze}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Cpu className="w-4 h-4 text-slate-950" />
            <span>Analyze Security Risk</span>
            <ChevronRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      )}
    </div>
  );
};
