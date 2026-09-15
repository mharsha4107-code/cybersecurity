import React from 'react';
import { 
  History, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { IncidentReport, AppView } from '../types';

interface HistoryViewProps {
  history: IncidentReport[];
  onSelectReport: (report: IncidentReport) => void;
  onClearHistory: () => void;
  onNavigate: (view: AppView) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectReport,
  onClearHistory,
  onNavigate,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>Local Evaluation History</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Assessment History (Prototype Records)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Locally stored incident evaluation records, risk classifications, and simulated submissions.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-950/50 hover:bg-rose-950 border border-rose-800/50 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Demo Records</span>
          </button>
        )}
      </div>

      {/* History Records Table & Cards */}
      {history.length > 0 ? (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Incident ID</th>
                  <th className="py-3.5 px-4 font-bold">Evaluation Date</th>
                  <th className="py-3.5 px-4 font-bold">Risk Score</th>
                  <th className="py-3.5 px-4 font-bold">Severity</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-sans">
                {history.map((item) => {
                  const sevColor = item.inferenceResult.severityColor.split(' ')[0];
                  return (
                    <tr
                      key={item.incidentId}
                      className="hover:bg-slate-850/60 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                        {item.incidentId}
                        {item.submissionRef && (
                          <span className="block text-[10px] text-slate-500 font-normal">
                            Ref: {item.submissionRef}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {new Date(item.timestamp).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {item.inferenceResult.normalizedScore} / 100
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${sevColor} bg-slate-950 border border-slate-800`}>
                          {item.inferenceResult.severity}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{item.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onSelectReport(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/60 transition-colors text-xs font-semibold"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Report</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
            <History className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No Assessment Records Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't performed any security assessments in this browser session. Complete a test questionnaire to generate an incident brief.
            </p>
          </div>
          <button
            onClick={() => onNavigate('assessment')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
          >
            Start Security Assessment
          </button>
        </div>
      )}
    </div>
  );
};
