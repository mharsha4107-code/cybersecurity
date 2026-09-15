import { IncidentReport, NetworkInfo } from '../types';
import { runInferenceEngine } from '../expertSystem/inferenceEngine';

const STORAGE_KEY = 'cybershield_assessment_history_v1';

export function getInitialNetworkInfo(): NetworkInfo {
  // Safe browser network information
  const connection = (navigator as unknown as { connection?: { effectiveType?: string; type?: string } }).connection;
  const connType = connection?.effectiveType ? `${connection.effectiveType.toUpperCase()} (Browser API)` : 'Broadband / Wi-Fi';

  return {
    ip: '192.168.1.104',
    isMasked: true,
    status: 'Protected / Monitored',
    connectionType: connType,
    detectionTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    safetyNotice: 'An IP address alone does not reliably identify a specific person or exact physical location.',
  };
}

export function generateIncidentId(counterOffset = 0): string {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000) + counterOffset;
  return `CS-${year}-${num}`;
}

export function getStoredHistory(): IncidentReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  // Generate sensible academic demo samples if empty
  const sample1Inference = runInferenceEngine({
    1: 'yes', // unknown app
    2: 'yes', // battery drain
    3: 'no',
    4: 'no',
    5: 'no',
    6: 'no',
    7: 'yes', // unusual mic/cam permissions
    8: 'no',
    9: 'not_sure',
    10: 'no',
  });

  const sample2Inference = runInferenceEngine({
    1: 'yes',
    2: 'yes',
    3: 'yes',
    4: 'yes', // login alert
    5: 'yes', // outbound messages
    6: 'yes', // unauthorized transaction
    7: 'yes',
    8: 'yes', // suspicious otp
    9: 'yes',
    10: 'yes', // unknown device
  });

  const sampleReports: IncidentReport[] = [
    {
      incidentId: 'CS-2026-0841',
      timestamp: '2026-09-02T14:32:00.000Z',
      assessmentType: 'Mobile Phone Security Assessment (Standard 10-Indicator)',
      networkInfo: {
        ip: '192.168.1.42',
        isMasked: true,
        status: 'Protected / Monitored',
        connectionType: '4G / Wi-Fi',
        detectionTime: '14:32:00 UTC',
        safetyNotice: 'An IP address alone does not reliably identify a specific person or exact physical location.',
      },
      inferenceResult: sample1Inference,
      userNotes: 'Detected strange flashlight app after visiting third-party APK mirror website.',
      status: 'DEMO_SUBMITTED',
      submissionRef: 'DEMO-CS-2026-0841',
      submissionDept: 'Academic Cyber Incident Response Cell',
    },
    {
      incidentId: 'CS-2026-0919',
      timestamp: '2026-09-04T09:15:00.000Z',
      assessmentType: 'Mobile Phone Security Assessment (Standard 10-Indicator)',
      networkInfo: {
        ip: '10.0.0.15',
        isMasked: true,
        status: 'Protected / Monitored',
        connectionType: '5G Mobile Link',
        detectionTime: '09:15:00 UTC',
        safetyNotice: 'An IP address alone does not reliably identify a specific person or exact physical location.',
      },
      inferenceResult: sample2Inference,
      userNotes: 'Multiple unauthorized banking debits and persistent OTP notifications occurred overnight.',
      status: 'DEMO_SUBMITTED',
      submissionRef: 'DEMO-CS-2026-0919',
      submissionDept: 'State Cyber Crime Investigation Center (Demo)',
    }
  ];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleReports));
  } catch {
    // ignore
  }

  return sampleReports;
}

export function saveAssessmentToHistory(report: IncidentReport): void {
  try {
    const current = getStoredHistory();
    const updated = [report, ...current.filter((r) => r.incidentId !== report.incidentId)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export function clearStoredHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
