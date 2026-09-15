import React, { useState, useEffect } from 'react';
import { 
  AppView, 
  AnswerValue, 
  IncidentReport, 
  NetworkInfo 
} from './types';
import { runInferenceEngine } from './expertSystem/inferenceEngine';
import { 
  getInitialNetworkInfo, 
  generateIncidentId, 
  getStoredHistory, 
  saveAssessmentToHistory, 
  clearStoredHistory 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { LandingHome } from './components/LandingHome';
import { DashboardView } from './components/DashboardView';
import { SecurityAssessment } from './components/SecurityAssessment';
import { InferenceAnimationModal } from './components/InferenceAnimationModal';
import { SeverityResultView } from './components/SeverityResultView';
import { IncidentReportModal } from './components/IncidentReportModal';
import { SimulatedReportingModal } from './components/SimulatedReportingModal';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { HowItWorksView } from './components/HowItWorksView';
import { HistoryView } from './components/HistoryView';
import { PrivacyView } from './components/PrivacyView';
import { Shield, AlertTriangle, Check, Info } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeIncidentId, setActiveIncidentId] = useState<string>(() => generateIncidentId());
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentReport, setCurrentReport] = useState<IncidentReport | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>(() => getInitialNetworkInfo());
  const [history, setHistory] = useState<IncidentReport[]>(() => getStoredHistory());
  const [isInferenceRunning, setIsInferenceRunning] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isSimulatedReportModalOpen, setIsSimulatedReportModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-hide toast notification
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleAnswerChange = (questionId: number, value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleResetAssessment = () => {
    setAnswers({});
    showToast('Assessment questionnaire cleared.');
  };

  const handleLoadPreset = (type: 'critical' | 'medium' | 'clean') => {
    if (type === 'critical') {
      setAnswers({
        1: 'yes', // unknown app
        2: 'yes', // battery drain
        3: 'yes', // hot phone
        4: 'yes', // login alert
        5: 'yes', // unauthorized messages
        6: 'yes', // unauthorized transaction
        7: 'yes', // mic/cam access
        8: 'yes', // suspicious OTP
        9: 'yes', // slow/abnormal
        10: 'yes', // unknown device
      });
      showToast('Loaded: Critical Multi-Vector Cyber Incident scenario.');
    } else if (type === 'medium') {
      setAnswers({
        1: 'yes', // unknown app
        2: 'yes', // battery drain
        3: 'no',
        4: 'no',
        5: 'no',
        6: 'no',
        7: 'not_sure',
        8: 'no',
        9: 'yes', // sluggish
        10: 'no',
      });
      showToast('Loaded: Medium Suspicion (App & Battery Anomaly) scenario.');
    } else {
      setAnswers({
        1: 'no',
        2: 'no',
        3: 'no',
        4: 'no',
        5: 'no',
        6: 'no',
        7: 'no',
        8: 'no',
        9: 'no',
        10: 'no',
      });
      showToast('Loaded: Clean Baseline (No Anomalies) scenario.');
    }
  };

  const handleTriggerAnalysis = () => {
    setIsInferenceRunning(true);
  };

  const handleInferenceCompleted = () => {
    setIsInferenceRunning(false);

    // Run inference engine
    const inferenceResult = runInferenceEngine(answers);

    const report: IncidentReport = {
      incidentId: activeIncidentId,
      timestamp: new Date().toISOString(),
      assessmentType: 'Mobile Phone Security Assessment (Standard 10-Indicator)',
      networkInfo,
      inferenceResult,
      status: 'EVALUATED',
    };

    setCurrentReport(report);
    saveAssessmentToHistory(report);
    setHistory(getStoredHistory());

    setCurrentView('expert-analysis');
    showToast(`Inference complete: Severity assessed as ${inferenceResult.severity}.`);
  };

  const handleSimulatedSubmit = (referenceNumber: string, department: string) => {
    if (!currentReport) return;

    const updatedReport: IncidentReport = {
      ...currentReport,
      status: 'DEMO_SUBMITTED',
      submissionRef: referenceNumber,
      submissionDept: department,
    };

    setCurrentReport(updatedReport);
    saveAssessmentToHistory(updatedReport);
    setHistory(getStoredHistory());
    showToast(`Simulation recorded with Reference: ${referenceNumber}`);
  };

  const handleSelectHistoryReport = (report: IncidentReport) => {
    setCurrentReport(report);
    setActiveIncidentId(report.incidentId);
    setIsReportModalOpen(true);
  };

  const handleClearAllHistory = () => {
    clearStoredHistory();
    setHistory([]);
    showToast('Assessment history cleared.');
  };

  const handleStartNewAssessment = () => {
    const newId = generateIncidentId();
    setActiveIncidentId(newId);
    setAnswers({});
    setCurrentReport(null);
    setCurrentView('assessment');
    showToast(`Started new session: ${newId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-3.5 rounded-xl bg-slate-900 border border-cyan-500/50 shadow-xl shadow-cyan-950/40 text-xs font-medium text-slate-200 flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        activeIncidentId={activeIncidentId}
        isAssessmentInProgress={Object.keys(answers).length > 0}
      />

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Dynamic Route Switching */}
        {currentView === 'home' && (
          <LandingHome
            onNavigate={setCurrentView}
            onStartAssessment={() => setCurrentView('assessment')}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            currentReport={currentReport}
            activeIncidentId={activeIncidentId}
            networkInfo={networkInfo}
            answers={answers}
            onUpdateNetworkInfo={setNetworkInfo}
            onNavigate={setCurrentView}
            onStartAssessment={() => setCurrentView('assessment')}
          />
        )}

        {currentView === 'assessment' && (
          <SecurityAssessment
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onAnalyze={handleTriggerAnalysis}
            onReset={handleResetAssessment}
            onLoadPreset={handleLoadPreset}
          />
        )}

        {currentView === 'expert-analysis' && (
          currentReport ? (
            <SeverityResultView
              inferenceResult={currentReport.inferenceResult}
              onNavigate={setCurrentView}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onOpenSimulatedReportModal={() => setIsSimulatedReportModalOpen(true)}
              onRetest={handleStartNewAssessment}
            />
          ) : (
            <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4 max-w-xl mx-auto my-12">
              <Shield className="w-12 h-12 text-slate-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">No Assessment Evaluated Yet</h3>
                <p className="text-xs text-slate-400">
                  Please complete the 10-indicator questionnaire to prime the Expert System's propositional working memory.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('assessment')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
              >
                Go to Assessment
              </button>
            </div>
          )
        )}

        {currentView === 'knowledge-base' && (
          <KnowledgeBaseView />
        )}

        {currentView === 'incident-reports' && (
          currentReport ? (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Current Incident Brief</h1>
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  Open Full Screen Report
                </button>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block">INCIDENT ID</span>
                    <span className="text-cyan-400 font-bold">{currentReport.incidentId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">RISK SCORE</span>
                    <span className="text-white font-bold">{currentReport.inferenceResult.normalizedScore} / 100</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">SEVERITY</span>
                    <span className="text-rose-400 font-bold">{currentReport.inferenceResult.severity}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">RULES TRIGGERED</span>
                    <span className="text-emerald-400 font-bold">{currentReport.inferenceResult.triggeredRules.length} rules</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    View Printable Document & Download →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4 max-w-xl mx-auto my-12">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">No Active Report Generated</h3>
                <p className="text-xs text-slate-400">
                  Run the diagnostic assessment or inspect past incident evaluations from History.
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setCurrentView('assessment')}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  Start Assessment
                </button>
                <button
                  onClick={() => setCurrentView('history')}
                  className="px-5 py-2.5 rounded-xl font-medium text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  View History
                </button>
              </div>
            </div>
          )
        )}

        {currentView === 'history' && (
          <HistoryView
            history={history}
            onSelectReport={handleSelectHistoryReport}
            onClearHistory={handleClearAllHistory}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksView onNavigate={setCurrentView} />
        )}

        {currentView === 'privacy' && (
          <PrivacyView />
        )}
      </main>

      {/* 5-Step Inference Progress Modal */}
      {isInferenceRunning && (
        <InferenceAnimationModal onComplete={handleInferenceCompleted} />
      )}

      {/* Full Incident Report Modal */}
      {isReportModalOpen && currentReport && (
        <IncidentReportModal
          report={currentReport}
          onClose={() => setIsReportModalOpen(false)}
          onSubmitDemo={() => {
            setIsReportModalOpen(false);
            setIsSimulatedReportModalOpen(true);
          }}
        />
      )}

      {/* Simulated Incident Submission to Cyber Security Dept */}
      {isSimulatedReportModalOpen && currentReport && (
        <SimulatedReportingModal
          report={currentReport}
          onClose={() => setIsSimulatedReportModalOpen(false)}
          onConfirmSubmitted={handleSimulatedSubmit}
        />
      )}

      {/* Professional Cybersecurity Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">CyberShield</span>
            <span>– Mobile Cyber Security Expert System</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setCurrentView('privacy')} className="hover:text-cyan-400 transition-colors">
              Privacy & Disclaimer
            </button>
            <span>·</span>
            <button onClick={() => setCurrentView('how-it-works')} className="hover:text-cyan-400 transition-colors">
              Expert System Architecture
            </button>
            <span>·</span>
            <button onClick={() => setCurrentView('knowledge-base')} className="hover:text-cyan-400 transition-colors">
              Knowledge Base
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60 font-mono text-[10px] font-bold">
              DEMO / PROTOTYPE MODE
            </span>
            <span className="text-[11px] text-slate-600">Academic Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
