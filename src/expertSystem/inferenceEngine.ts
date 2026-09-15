import { 
  AnswerValue, 
  InferenceResult, 
  SeverityLevel, 
  TriggeredRule, 
  WorkingMemoryFacts 
} from '../types';
import { KNOWLEDGE_BASE_RULES } from './knowledgeBase';
import { ASSESSMENT_QUESTIONS, QUESTION_FACT_LABELS } from './questions';

/**
 * PHASE 1: FACT EXTRACTION (Working Memory)
 * Transforms user questionnaire responses into rigorous propositional facts.
 */
export function extractFactsFromAnswers(answers: Record<number, AnswerValue>): WorkingMemoryFacts {
  const facts: WorkingMemoryFacts = {
    unknown_app: false,
    battery_drain: false,
    phone_hot: false,
    unknown_login: false,
    unauthorized_messages: false,
    unauthorized_transaction: false,
    unusual_permissions: false,
    suspicious_otp: false,
    abnormal_behavior: false,
    unknown_device: false,
  };

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const userAns = answers[q.id];
    // In our academic model, 'yes' yields a positive fact (TRUE)
    // 'not_sure' is treated as potential low-certainty anomaly (0.3 weight in fine scoring, but false for strict binary rules)
    if (userAns === 'yes') {
      facts[q.factKey] = true;
    }
  });

  return facts;
}

/**
 * PHASE 2: INFERENCE ENGINE & FORWARD CHAINING
 * Evaluates working memory against the rule-based knowledge base.
 */
export function runInferenceEngine(answers: Record<number, AnswerValue>): InferenceResult {
  const facts = extractFactsFromAnswers(answers);
  const triggeredRules: TriggeredRule[] = [];
  const detectedIndicatorsSet = new Set<string>();
  const riskAreasSet = new Set<string>();

  // Count positive indicators and uncertainties
  let affirmativeCount = 0;
  let uncertaintyCount = 0;

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const ans = answers[q.id];
    if (ans === 'yes') {
      affirmativeCount++;
      detectedIndicatorsSet.add(QUESTION_FACT_LABELS[q.factKey]);
    } else if (ans === 'not_sure') {
      uncertaintyCount++;
    }
  });

  // Evaluate each rule in the Knowledge Base
  let rawScore = 0;
  let hasCriticalFloor = false;
  let hasHighFloor = false;

  for (const rule of KNOWLEDGE_BASE_RULES) {
    if (rule.evaluate(facts)) {
      // Rule condition matched!
      const matchedFacts = rule.requiredFacts.map((factKey) => ({
        key: factKey,
        label: QUESTION_FACT_LABELS[factKey] || factKey,
        value: facts[factKey],
      }));

      triggeredRules.push({
        ruleId: rule.id,
        ruleName: rule.name,
        category: rule.category,
        conditionDescription: rule.conditionDescription,
        matchedFacts,
        riskContribution: rule.riskContribution,
        rationale: rule.rationale,
        actionGuidance: rule.actionGuidance,
      });

      rawScore += rule.riskContribution;

      if (rule.category === 'Financial Fraud') {
        riskAreasSet.add('Unauthorized Financial Access & Fraud');
      } else if (rule.category === 'Account Takeover') {
        riskAreasSet.add('Account Ecosystem Compromise');
      } else if (rule.category === 'Surveillance & Privacy') {
        riskAreasSet.add('Covert Surveillance & Sensor Snooping');
      } else if (rule.category === 'Device Integrity') {
        riskAreasSet.add('Operating System & Application Integrity Anomaly');
      } else if (rule.category === 'Social Engineering & Credentials') {
        riskAreasSet.add('Phishing & Credential Interception');
      }

      if (rule.severityFloor === 'CRITICAL') {
        hasCriticalFloor = true;
      }
      if (rule.severityFloor === 'HIGH') {
        hasHighFloor = true;
      }
    }
  }

  // CONFLICT RESOLUTION & NORMALIZATION MODULE
  // Prevents linear explosion when multiple compound rules fire,
  // while ensuring non-zero positive answers register appropriately.
  let normalizedScore = 0;

  if (affirmativeCount === 0 && uncertaintyCount === 0) {
    normalizedScore = 0;
  } else if (affirmativeCount === 0 && uncertaintyCount > 0) {
    // Only uncertainties provided - minor baseline hygiene caution
    normalizedScore = Math.min(20, uncertaintyCount * 4);
  } else {
    // Mathematical dampening function to normalize aggregated rule weight between 0 and 100
    // As rawScore increases from compound rules, it approaches asymptotic maximum 100 cleanly
    const baseCalculated = Math.round(
      100 * (1 - Math.exp(-rawScore / 45)) + (uncertaintyCount * 2)
    );

    normalizedScore = Math.min(100, Math.max(12, baseCalculated));

    // Guarantee severity floors for severe breaches
    if (hasCriticalFloor && normalizedScore < 78) {
      normalizedScore = 82;
    } else if (hasHighFloor && normalizedScore < 55) {
      normalizedScore = 60;
    }
  }

  // SEVERITY CLASSIFICATION MODULE
  // Strictly mapped according to project requirements:
  // 0–24: LOW
  // 25–49: MEDIUM
  // 50–74: HIGH
  // 75–100: CRITICAL
  let severity: SeverityLevel = 'LOW';
  let severityColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';

  if (normalizedScore >= 75) {
    severity = 'CRITICAL';
    severityColor = 'text-rose-400 border-rose-500/40 bg-rose-950/30';
  } else if (normalizedScore >= 50) {
    severity = 'HIGH';
    severityColor = 'text-amber-400 border-amber-500/40 bg-amber-950/30';
  } else if (normalizedScore >= 25) {
    severity = 'MEDIUM';
    severityColor = 'text-yellow-400 border-yellow-500/40 bg-yellow-950/30';
  } else {
    severity = 'LOW';
    severityColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
  }

  // Synthesize default risk areas if none fired directly
  if (riskAreasSet.size === 0) {
    if (normalizedScore > 0) {
      riskAreasSet.add('General Device Hygiene & Monitoring');
    } else {
      riskAreasSet.add('No Critical Risk Indicators Identified');
    }
  }

  // EXPLANATION SUMMARY
  const reasoningSummary = triggeredRules.length > 0
    ? `Forward-chaining inference engine evaluated ${KNOWLEDGE_BASE_RULES.length} production rules against 10 working memory facts. Exactly ${triggeredRules.length} rule condition(s) satisfied, resulting in a cumulative normalized risk coefficient of ${normalizedScore}/100.`
    : `No active malicious indicators or rule preconditions were satisfied. System assessment baseline remains within nominal parameters.`;

  return {
    rawScore,
    normalizedScore,
    severity,
    severityColor,
    triggeredRules,
    detectedIndicators: Array.from(detectedIndicatorsSet),
    riskAreas: Array.from(riskAreasSet),
    reasoningSummary,
    facts,
    answers,
    evaluatedAt: new Date().toISOString(),
  };
}

/**
 * RECOMMENDED ACTIONS MODULE
 * Delivers contextual actions mapped to assessed severity tier.
 */
export function getRecommendedActions(severity: SeverityLevel): { title: string; desc: string; priority: 'Immediate' | 'Important' | 'Recommended' }[] {
  switch (severity) {
    case 'CRITICAL':
      return [
        {
          title: "Disconnect from Suspicious Networks Immediately",
          desc: "Switch the device into Airplane Mode or power down Wi-Fi and mobile data to immediately sever potential active Command & Control (C2) or remote exfiltration sockets.",
          priority: "Immediate",
        },
        {
          title: "Use an Independent, Trusted Device to Secure Accounts",
          desc: "Do not attempt to reset sensitive credentials on the suspected compromised phone. Log in from a clean secondary computer to reset primary email, banking, and social credentials.",
          priority: "Immediate",
        },
        {
          title: "Contact Financial Institutions Promptly",
          desc: "If unauthorized payment anomalies or financial SMS activity were detected, immediately contact card issuers and bank fraud lines to request urgent card cancellations or temporary transaction freezing.",
          priority: "Immediate",
        },
        {
          title: "Preserve Digital Forensics & Screenshots",
          desc: "Take photos or retain screenshots of suspicious messages, transaction timestamps, unknown applications, and abnormal login notifications before modifying device state. Do not delete evidence.",
          priority: "Important",
        },
        {
          title: "Prepare Official Cybercrime Incident Filing",
          desc: "Document the timeline of events and file a report with your organization's IT security team, university CERT, or regional national cybercrime authority.",
          priority: "Important",
        },
      ];

    case 'HIGH':
      return [
        {
          title: "Isolate Device and Revoke Suspicious Access",
          desc: "Disconnect from untrusted public Wi-Fi networks and disable Bluetooth and hotspot sharing while anomalous behavior persists.",
          priority: "Immediate",
        },
        {
          title: "Rotate Passwords & Terminate Foreign Sessions",
          desc: "From a trusted device, perform a global session termination across Google/Apple accounts, change passwords, and enforce hardware or app-based 2FA tokens.",
          priority: "Important",
        },
        {
          title: "Audit App Permissions & Remove Unknown Packages",
          desc: "Inspect Settings > Apps > Special App Access (Device Admin, Accessibility, Display over other apps). Uninstall all packages not originating from verified stores.",
          priority: "Important",
        },
        {
          title: "Monitor Banking & Credit Transactions",
          desc: "Check bank and credit card statement feeds daily for micro-charges often used by adversaries to test stolen credentials.",
          priority: "Recommended",
        },
        {
          title: "Retain Suspicious SMS / OTP Records",
          desc: "Save verification codes and caller numbers associated with unexpected password-reset requests for forensic records.",
          priority: "Recommended",
        },
      ];

    case 'MEDIUM':
      return [
        {
          title: "Change Important Account Passwords",
          desc: "Update credentials for your primary email, cloud storage, and key communications accounts with strong, unique 16+ character passphrases.",
          priority: "Important",
        },
        {
          title: "Review Active Account Sessions",
          desc: "Navigate to security panels on Google, iCloud, Microsoft, and messaging apps to review all active authorized devices and revoke unfamiliar ones.",
          priority: "Important",
        },
        {
          title: "Remove Unused & Unknown Applications",
          desc: "Uninstall rarely used applications, sideloaded utilities, and third-party keyboard or flashlight extensions that request broad permissions.",
          priority: "Recommended",
        },
        {
          title: "Enable Multi-Factor Authentication (MFA)",
          desc: "Upgrade SMS-based 2FA to authenticator apps (like Aegis, Google Authenticator) or physical security keys to prevent SIM-swap bypasses.",
          priority: "Recommended",
        },
        {
          title: "Verify Operating System Security Patches",
          desc: "Ensure the mobile operating system and installed browsers are updated to the latest vendor security patch level.",
          priority: "Recommended",
        },
      ];

    case 'LOW':
    default:
      return [
        {
          title: "Maintain Routine Software Updates",
          desc: "Keep the mobile OS, security patches, and application store apps updated to shield against known CVE vulnerabilities.",
          priority: "Recommended",
        },
        {
          title: "Conduct Periodic Installed App Audits",
          desc: "Review your installed application list once a month to remove apps that are no longer needed or maintained.",
          priority: "Recommended",
        },
        {
          title: "Enforce Strong Screen Locks & Biometrics",
          desc: "Ensure device PIN has at least 6 digits or an alphanumeric passphrase, and disable notification content preview on the locked screen.",
          priority: "Recommended",
        },
        {
          title: "Enable Multi-Factor Authentication Everywhere",
          desc: "Protect your primary email and cloud ecosystem accounts with multi-factor authentication as standard cyber hygiene.",
          priority: "Recommended",
        },
      ];
  }
}
