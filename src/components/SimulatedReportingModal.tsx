import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Shield, 
  Building2, 
  FileText, 
  Lock,
  Copy,
  Check
} from 'lucide-react';
import { IncidentReport } from '../types';

interface SimulatedReportingModalProps {
  report: IncidentReport;
  onClose: () => void;
  onConfirmSubmitted: (referenceNumber: string, department: string) => void;
}

export const SimulatedReportingModal: React.FC<SimulatedReportingModalProps> = ({
  report,
  onClose,
  onConfirmSubmitted,
}) => {
  const [selectedDept, setSelectedDept] = useState('Campus Cyber Incident Response Cell (Academic)');
  const [userRemarks, setUserRemarks] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(report.status === 'DEMO_SUBMITTED');
  const [copied, setCopied] = useState(false);

  const referenceNumber = report.submissionRef || `DEMO-${report.incidentId}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onConfirmSubmitted(referenceNumber, selectedDept);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 space-y-6 text-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Report to Cyber Security Department
              </h3>
              <p className="text-xs text-amber-400 font-medium">
                Academic Simulation Only · Demo Mode
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Simulated Reporting Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Safety Notice Box */}
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-200">Simulation Boundary:</span>
            <p className="text-amber-300/90 leading-relaxed">
              This is a prototype simulation. It does not directly transmit information to police or government systems.
            </p>
          </div>
        </div>

        {!isSubmitted ? (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 block">
                Target Simulated Department / CERT Unit:
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400 font-sans"
              >
                <option value="Campus Cyber Incident Response Cell (Academic)">
                  Campus Cyber Incident Response Cell (Academic)
                </option>
                <option value="State Computer Emergency Response Team (Demo-CERT)">
                  State Computer Emergency Response Team (Demo-CERT)
                </option>
                <option value="Financial Cyber Fraud Assistance Center (Demo)">
                  Financial Cyber Fraud Assistance Center (Demo)
                </option>
                <option value="Mobile Threat Defense Research Lab">
                  Mobile Threat Defense Research Lab
                </option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Incident Identifier:</span>
                <span className="text-cyan-400 font-bold">{report.incidentId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Evaluated Risk Score:</span>
                <span className="text-white font-bold">{report.inferenceResult.normalizedScore} / 100</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Assessed Severity:</span>
                <span className="text-rose-400 font-bold">{report.inferenceResult.severity}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 block">
                Additional Incident Observations / Notes (Optional):
              </label>
              <textarea
                value={userRemarks}
                onChange={(e) => setUserRemarks(e.target.value)}
                rows={3}
                placeholder="E.g., observed sudden battery drop after downloading file from third-party link..."
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                id="submit-simulated-report-btn"
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Submit Report – Demo</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="space-y-5 text-center py-2">
            <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">
                Incident report prepared successfully.
              </h4>
              <p className="text-xs text-slate-400">
                Simulated transmission dispatched to prototype receiving gateway.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-2">
              <div className="text-slate-400">Status:</div>
              <div className="text-sm font-bold text-emerald-400 tracking-wider">
                DEMO SUBMISSION COMPLETE
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-left">
                <div>
                  <div className="text-[10px] text-slate-500">REFERENCE NUMBER:</div>
                  <div className="text-cyan-300 font-bold text-sm">{referenceNumber}</div>
                </div>
                <button
                  onClick={handleCopyRef}
                  className="p-1.5 rounded bg-slate-900 hover:bg-slate-850 text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
                  title="Copy Reference"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 text-left pt-1">
                Dispatched To: <span className="text-slate-300">{selectedDept}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg"
            >
              Done & Return to Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
