export type AnswerValue = 'yes' | 'no' | 'not_sure';

export interface AssessmentQuestion {
  id: number;
  question: string;
  category: 'Device Hardware' | 'Authentication' | 'System Permissions' | 'Financial & Transactions' | 'Application Integrity';
  explanation: string;
  factKey: keyof WorkingMemoryFacts;
  impactWeight: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface WorkingMemoryFacts {
  unknown_app: boolean;
  battery_drain: boolean;
  phone_hot: boolean;
  unknown_login: boolean;
  unauthorized_messages: boolean;
  unauthorized_transaction: boolean;
  unusual_permissions: boolean;
  suspicious_otp: boolean;
  abnormal_behavior: boolean;
  unknown_device: boolean;
}

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ExpertRule {
  id: string; // e.g. "RB-01"
  name: string;
  category: 'Device Integrity' | 'Account Takeover' | 'Surveillance & Privacy' | 'Financial Fraud' | 'Social Engineering & Credentials';
  conditionDescription: string;
  requiredFacts: (keyof WorkingMemoryFacts)[];
  evaluate: (facts: WorkingMemoryFacts) => boolean;
  riskContribution: number;
  severityFloor?: SeverityLevel;
  rationale: string;
  actionGuidance: string;
}

export interface TriggeredRule {
  ruleId: string;
  ruleName: string;
  category: string;
  conditionDescription: string;
  matchedFacts: { key: string; label: string; value: boolean }[];
  riskContribution: number;
  rationale: string;
  actionGuidance: string;
}

export interface InferenceResult {
  rawScore: number;
  normalizedScore: number; // 0 - 100
  severity: SeverityLevel;
  severityColor: string;
  triggeredRules: TriggeredRule[];
  detectedIndicators: string[];
  riskAreas: string[];
  reasoningSummary: string;
  facts: WorkingMemoryFacts;
  answers: Record<number, AnswerValue>;
  evaluatedAt: string;
}

export interface NetworkInfo {
  ip: string;
  isMasked: boolean;
  status: 'Protected / Monitored' | 'Local Network' | 'Public Gateway';
  connectionType: string;
  detectionTime: string;
  safetyNotice: string;
}

export interface IncidentReport {
  incidentId: string;
  timestamp: string;
  assessmentType: string;
  networkInfo: NetworkInfo;
  inferenceResult: InferenceResult;
  userNotes?: string;
  status: 'READY' | 'EVALUATED' | 'DEMO_SUBMITTED';
  submissionRef?: string;
  submissionDept?: string;
}

export type AppView = 
  | 'home' 
  | 'dashboard' 
  | 'assessment' 
  | 'expert-analysis' 
  | 'knowledge-base' 
  | 'incident-reports' 
  | 'history' 
  | 'how-it-works' 
  | 'privacy';
