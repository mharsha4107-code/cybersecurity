import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  ArrowDown, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  RotateCcw, 
  Send, 
  BookOpen, 
  ExternalLink,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { InferenceResult, TriggeredRule, AppView } from '../types';
import { getRecommendedActions } from '../expertSystem/inferenceEngine';

interface SeverityResultViewProps {
  inferenceResult: InferenceResult;
  onNavigate: (view: AppView) => void;
  onOpenReportModal: () => void;
  onOpenSimulatedReportModal: () => void;
  onRetest: () => void;
}

export const SeverityResultView: React.FC<SeverityResultViewProps> = ({
  inferenceResult,
  onNavigate,
  onOpenReportModal,
  onOpenSimulatedReportModal,
  onRetest,
}) => {
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>(
    inferenceResult.triggeredRules[0]?.ruleId || null
  );

  const recommendations = getRecommendedActions(inferenceResult.severity);
  const isCritical = inferenceResult.severity === 'CRITICAL';
  const isHigh = inferenceResult.severity === 'HIGH';

  const toggleRuleExpand = (ruleId: string) => {
    setExpandedRuleId(expandedRuleId === ruleId ? null : ruleId);
  };

  // Circular progress calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (inferenceResult.normalizedScore / 100) * circumference;

  // Dynamic colors for score gauge
  let ringColor = '#10b981'; // emerald
  let glowColor = 'rgba(16, 185, 129, 0.3)';
  if (inferenceResult.severity === 'CRITICAL') {
    ringColor = '#f43f5e'; // rose
    glowColor = 'rgba(244, 63, 94, 0.4)';
  } else if (inferenceResult.severity === 'HIGH') {
    ringColor = '#f59e0b'; // amber
    glowColor = 'rgba(245, 158, 11, 0.4)';
  } else if (inferenceResult.severity === 'MEDIUM') {
    ringColor = '#eab308'; // yellow
    glowColor = 'rgba(234, 179, 8, 0.35)';
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Critical Emergency Warning Banner (Section 16 requirement) */}
      {isCritical && (
        <div 
          id="emergency-warning-banner"
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-950/90 via-slate-900 to-rose-950/90 border-2 border-rose-500/80 shadow-[0_0_30px_rgba(244,63,94,0.35)] space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-900/80 text-rose-300 animate-bounce">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-wide text-rose-300 flex items-center gap-2">
                🚨 CRITICAL SECURITY RISK DETECTED
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Multiple severe heuristic indicators were identified in working memory. Immediate containment and account lockdown is advised.
              </p>
            </div>
          </div>
          <p className="text-xs text-rose-200/90 bg-rose-950/60 p-3 rounded-xl border border-rose-800/60 leading-relaxed">
            Consider contacting an appropriate cybercrime or university IT security authority immediately. Disconnect from suspicious cellular/Wi-Fi links and preserve transaction evidence before altering device logs.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#recommended-actions-section"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-lg"
            >
              View Emergency Recommendations
            </a>
            <button
              onClick={onOpenSimulatedReportModal}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/50 text-rose-300 text-xs font-semibold transition-colors"
            >
              Simulate Cyber Incident Filing
            </button>
          </div>
        </div>
      )}

      {/* Main Assessment Completed Card & Circular Gauge */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-6 border-b border-slate-800">
          {/* Assessment Header */}
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Forward-Chaining Evaluation Complete</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              SECURITY ASSESSMENT COMPLETE
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              The rule-based expert system has evaluated all 10 propositional facts against the cybersecurity knowledge base.
            </p>
            {/* Required cautious academic phrasing */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-200">Academic Assessment Notice:</strong> Indicators suggest possible compromise and require further investigation. This tool serves as a diagnostic prototype and does not provide an absolute forensic guarantee.
              </p>
            </div>
          </div>

          {/* Circular Progress Gauge */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="relative flex items-center justify-center">
              <svg className="w-44 h-44 transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="88"
                  cy="88"
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Active Dynamic Score Ring */}
                <circle
                  cx="88"
                  cy="88"
                  r={radius}
                  stroke={ringColor}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    filter: `drop-shadow(0 0 10px ${glowColor})`,
                    transition: 'stroke-dashoffset 1s ease-in-out',
                  }}
                />
              </svg>

              {/* Center Score Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-white font-mono tracking-tight">
                  {inferenceResult.normalizedScore}
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                  OUT OF 100
                </span>
              </div>
            </div>

            {/* Severity Pill */}
            <div className="mt-3">
              <span
                id="severity-badge-result"
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border shadow-lg ${inferenceResult.severityColor}`}
              >
                {isCritical ? '🚨 ' : isHigh ? '⚠️ ' : '🛡️ '}
                {inferenceResult.severity} SEVERITY
              </span>
            </div>
          </div>
        </div>

        {/* Quick Indicators & Risk Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detected Indicators List */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Detected Indicators ({inferenceResult.detectedIndicators.length})</span>
            </h3>
            {inferenceResult.detectedIndicators.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {inferenceResult.detectedIndicators.map((ind, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-700/80 font-medium"
                  >
                    • {ind}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                No positive risk indicators were affirmed during the assessment questionnaire.
              </p>
            )}
          </div>

          {/* Possible Risk Areas */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Possible Risk Areas</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {inferenceResult.riskAreas.map((area, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="result-view-report-btn"
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>View Full Incident Report</span>
            </button>

            <button
              id="result-simulated-submit-btn"
              onClick={onOpenSimulatedReportModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              <span>Submit Report – Demo</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('knowledge-base')}
              className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Inspect Full Knowledge Base"
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={onRetest}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retest</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 11: EXPLAINABLE AI / RULE REASONING (Crucial Academic Viva Requirement) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Expert Reasoning & Rule Firing Analysis (Explainable AI)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Transparent causal inference chain demonstrating how propositional working memory triggered specific production rules.
            </p>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold self-start sm:self-auto">
            Rules Triggered: {inferenceResult.triggeredRules.length}
          </span>
        </div>

        {/* Causal Flow Model Graphic */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
          <div className="flex flex-wrap items-center justify-between gap-3 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">FACT (Input)</span>
              <span>→</span>
              <span className="text-blue-400 font-bold">RULE (Knowledge Base)</span>
              <span>→</span>
              <span className="text-amber-400 font-bold">RESULT (Inference)</span>
              <span>→</span>
              <span className="text-emerald-400 font-bold">RISK (+Contribution)</span>
            </div>
            <span className="text-slate-500 text-[11px]">Forward-Chaining Model</span>
          </div>
        </div>

        {/* Expandable List of Triggered Rules */}
        {inferenceResult.triggeredRules.length > 0 ? (
          <div className="space-y-3">
            {inferenceResult.triggeredRules.map((rule: TriggeredRule) => {
              const isExpanded = expandedRuleId === rule.ruleId;
              return (
                <div
                  key={rule.ruleId}
                  id={`triggered-rule-${rule.ruleId}`}
                  className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleRuleExpand(rule.ruleId)}
                    className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-slate-850 transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                        {rule.ruleId}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {rule.ruleName}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {rule.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/50">
                        +{rule.riskContribution} pts
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="p-5 pt-1 border-t border-slate-800/80 bg-slate-950/60 space-y-4 text-xs">
                      {/* Step-by-Step Causal Trace Box */}
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 font-mono">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">
                            FACTS MATCHED IN WORKING MEMORY:
                          </span>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {rule.matchedFacts.map((mf, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 text-[11px]"
                              >
                                {mf.key} = {mf.value ? 'TRUE' : 'FALSE'} ({mf.label})
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800">
                          <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">
                            PRODUCTION RULE LOGIC:
                          </span>
                          <code className="text-amber-300 font-semibold text-[11px] block mt-0.5">
                            {rule.conditionDescription}
                          </code>
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">
                            INFERENCE RESULT: <strong className="text-emerald-300">Rule {rule.ruleId} Fired Successfully</strong>
                          </span>
                          <span className="text-amber-400 font-bold">
                            RISK CONTRIBUTION: +{rule.riskContribution} pts
                          </span>
                        </div>
                      </div>

                      {/* Domain Rationale */}
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-300">Expert System Domain Rationale:</span>
                        <p className="text-slate-400 leading-relaxed">
                          {rule.rationale}
                        </p>
                      </div>

                      {/* Action Guidance */}
                      <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-cyan-200">
                        <strong className="font-semibold text-cyan-300 block mb-0.5">
                          Targeted Triage Recommendation:
                        </strong>
                        {rule.actionGuidance}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
            No specific production rules met firing criteria. Operating within baseline parameters.
          </div>
        )}
      </section>

      {/* SECTION 13: RECOMMENDED IMMEDIATE ACTIONS */}
      <section id="recommended-actions-section" className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Recommended Immediate Actions
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Tailored to <strong className="text-white">{inferenceResult.severity}</strong> Severity
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((action, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    STEP {idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase ${
                      action.priority === 'Immediate'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                        : action.priority === 'Important'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {action.priority}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {action.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {action.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
