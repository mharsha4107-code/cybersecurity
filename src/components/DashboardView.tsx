import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  Clock, 
  Smartphone, 
  Cpu, 
  FileText, 
  ChevronRight, 
  AlertTriangle, 
  Layers, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { IncidentReport, NetworkInfo, AppView, AnswerValue } from '../types';
import { NetworkInfoSection } from './NetworkInfoSection';

interface DashboardViewProps {
  currentReport: IncidentReport | null;
  activeIncidentId: string;
  networkInfo: NetworkInfo;
  answers: Record<number, AnswerValue>;
  onUpdateNetworkInfo: (info: NetworkInfo) => void;
  onNavigate: (view: AppView) => void;
  onStartAssessment: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentReport,
  activeIncidentId,
  networkInfo,
  answers,
  onUpdateNetworkInfo,
  onNavigate,
  onStartAssessment,
}) => {
  const answeredCount = Object.keys(answers).length;
  const hasEvaluated = currentReport !== null;
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  const score = hasEvaluated ? currentReport.inferenceResult.normalizedScore : '--';
  const severity = hasEvaluated ? currentReport.inferenceResult.severity : 'PENDING';
  const systemStatus = hasEvaluated 
    ? 'EVALUATION COMPLETE' 
    : answeredCount > 0 
    ? `IN PROGRESS (${answeredCount}/10)` 
    : 'READY FOR ASSESSMENT';

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Incident Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
              INCIDENT ID: {activeIncidentId}
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 font-semibold">
              DEMO MODE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Security Operations Center (SOC) Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Automated mobile threat triage and expert inference dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>SYSTEM CLOCK</span>
            </div>
            <div className="text-white font-bold">{currentDate} · {currentTime}</div>
          </div>

          <button
            onClick={onStartAssessment}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
          >
            <Smartphone className="w-4 h-4 text-slate-950" />
            <span>{hasEvaluated ? 'Retest Assessment' : 'Launch Assessment'}</span>
            <ChevronRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>

      {/* 4 Core Dashboard KPI Cards (Section 5 Requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Security Status */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Security Status</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-extrabold text-cyan-300 tracking-wide font-mono flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              {systemStatus}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Rule engine inference readiness
            </span>
          </div>
        </div>

        {/* Card 2: Assessment Progress */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Assessment Progress</span>
            <Smartphone className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono">
              {answeredCount} <span className="text-sm font-normal text-slate-500">/ 10 Questions</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${(answeredCount / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Risk Score */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Calculated Risk Score</span>
            <Cpu className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-3xl font-black text-white font-mono">
              {score} <span className="text-sm font-normal text-slate-500">/ 100</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Dynamic rule weight aggregation
            </span>
          </div>
        </div>

        {/* Card 4: Current Severity */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Current Severity</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <div className="text-xl font-black font-mono">
              {hasEvaluated ? (
                <span className={currentReport.inferenceResult.severityColor.split(' ')[0]}>
                  {severity}
                </span>
              ) : (
                <span className="text-slate-500">AWAITING TEST</span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              LOW · MEDIUM · HIGH · CRITICAL
            </span>
          </div>
        </div>
      </div>

      {/* If evaluated, show Quick Results Spotlight */}
      {hasEvaluated && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Latest Evaluation Summary ({activeIncidentId})</span>
              </h3>
              <p className="text-xs text-slate-400">
                {currentReport.inferenceResult.reasoningSummary}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('expert-analysis')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900 transition-colors"
              >
                View Deep Reasoning
              </button>
              <button
                onClick={() => onNavigate('incident-reports')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
              >
                View Incident Brief
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="font-bold text-slate-300">Fired Rules ({currentReport.inferenceResult.triggeredRules.length}):</span>
              <div className="flex flex-wrap gap-1.5">
                {currentReport.inferenceResult.triggeredRules.length > 0 ? (
                  currentReport.inferenceResult.triggeredRules.map((tr) => (
                    <span key={tr.ruleId} className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono">
                      {tr.ruleId} (+{tr.riskContribution})
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 italic">No rules triggered</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="font-bold text-slate-300">Identified Vulnerability Focus:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentReport.inferenceResult.riskAreas.map((ra, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {ra}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 6: Network Information Section Component */}
      <NetworkInfoSection
        networkInfo={networkInfo}
        onUpdateNetworkInfo={onUpdateNetworkInfo}
      />
    </div>
  );
};
