import { ExpertRule, WorkingMemoryFacts } from '../types';

export const KNOWLEDGE_BASE_RULES: ExpertRule[] = [
  {
    id: "RB-01",
    name: "Background Process Infiltration",
    category: "Device Integrity",
    conditionDescription: "IF unknown_app = TRUE AND battery_drain = TRUE",
    requiredFacts: ["unknown_app", "battery_drain"],
    evaluate: (f: WorkingMemoryFacts) => f.unknown_app && f.battery_drain,
    riskContribution: 15,
    rationale: "An unrecognized application operating alongside abnormal battery depletion strongly suggests persistent background daemon execution or covert data collection.",
    actionGuidance: "Inspect Android/iOS battery usage breakdown to identify which package name is consuming disproportionate background power."
  },
  {
    id: "RB-02",
    name: "Cryptomining or Heavy Background Execution",
    category: "Device Integrity",
    conditionDescription: "IF phone_hot = TRUE AND abnormal_behavior = TRUE",
    requiredFacts: ["phone_hot", "abnormal_behavior"],
    evaluate: (f: WorkingMemoryFacts) => f.phone_hot && f.abnormal_behavior,
    riskContribution: 12,
    rationale: "Thermal spikes during idle periods combined with system UI latency indicate heavy computational workloads such as web cryptojacking or rogue processes.",
    actionGuidance: "Reboot device into Safe Mode to check if CPU throttling subsides, and audit recent browser caches and downloaded files."
  },
  {
    id: "RB-03",
    name: "Critical Financial Exfiltration",
    category: "Financial Fraud",
    conditionDescription: "IF unauthorized_transaction = TRUE",
    requiredFacts: ["unauthorized_transaction"],
    evaluate: (f: WorkingMemoryFacts) => f.unauthorized_transaction,
    riskContribution: 30,
    severityFloor: "HIGH",
    rationale: "Confirmed unauthorized money movement directly validates that either mobile payment tokens, banking credentials, or device biometric authenticators have been bypassed.",
    actionGuidance: "Immediately freeze affected debit/credit cards and alert bank fraud hotlines; demand temporary account holds."
  },
  {
    id: "RB-04",
    name: "Credential Harvesting & Session Hijacking",
    category: "Account Takeover",
    conditionDescription: "IF unknown_login = TRUE AND unknown_device = TRUE",
    requiredFacts: ["unknown_login", "unknown_device"],
    evaluate: (f: WorkingMemoryFacts) => f.unknown_login && f.unknown_device,
    riskContribution: 25,
    rationale: "Concurrent sign-in alerts coupled with unfamiliar device IDs in session management verify active unauthorized account possession by an external actor.",
    actionGuidance: "Trigger 'Sign out of all other sessions' from account security dashboards and change primary passwords from a separate, known clean computer."
  },
  {
    id: "RB-05",
    name: "Stalkerware / Surveillance Payload Signature",
    category: "Surveillance & Privacy",
    conditionDescription: "IF unusual_permissions = TRUE AND unknown_app = TRUE",
    requiredFacts: ["unusual_permissions", "unknown_app"],
    evaluate: (f: WorkingMemoryFacts) => f.unusual_permissions && f.unknown_app,
    riskContribution: 25,
    rationale: "Unsolicited hardware sensor activation (mic/camera/location) combined with unknown software presence matches standard stalkerware/spyware profiles.",
    actionGuidance: "Review 'Special App Access' and 'Accessibility Services' under device settings. Revoke admin privileges for suspicious applications."
  },
  {
    id: "RB-06",
    name: "Active Multi-Factor Interception Attempt",
    category: "Social Engineering & Credentials",
    conditionDescription: "IF suspicious_otp = TRUE AND unknown_device = TRUE",
    requiredFacts: ["suspicious_otp", "unknown_device"],
    evaluate: (f: WorkingMemoryFacts) => f.suspicious_otp && f.unknown_device,
    riskContribution: 20,
    rationale: "Adversary possesses valid username/password and is actively soliciting one-time verification tokens to bind a rogue device to your identity.",
    actionGuidance: "Never disclose OTPs or approve authenticator prompts. Immediately update master passwords and upgrade to FIDO2 hardware keys or app-based MFA."
  },
  {
    id: "RB-07",
    name: "SMS Trojan / Mobile Worm Propagation",
    category: "Device Integrity",
    conditionDescription: "IF unauthorized_messages = TRUE AND abnormal_behavior = TRUE",
    requiredFacts: ["unauthorized_messages", "abnormal_behavior"],
    evaluate: (f: WorkingMemoryFacts) => f.unauthorized_messages && f.abnormal_behavior,
    riskContribution: 22,
    rationale: "Autonomous message dispatch accompanied by system abnormalities indicates automated propagation mechanisms (e.g. FluBot or TeaBot worm vectors).",
    actionGuidance: "Switch phone into Airplane Mode immediately to stop outbound SMS transmission and contact mobile carrier to block premium SMS billing."
  },
  {
    id: "RB-08",
    name: "Overlay Banking Trojan Attack",
    category: "Financial Fraud",
    conditionDescription: "IF unauthorized_transaction = TRUE AND suspicious_otp = TRUE",
    requiredFacts: ["unauthorized_transaction", "suspicious_otp"],
    evaluate: (f: WorkingMemoryFacts) => f.unauthorized_transaction && f.suspicious_otp,
    riskContribution: 28,
    severityFloor: "HIGH",
    rationale: "Simultaneous fraudulent debit and intercepted verification codes signify that the threat actor is actively intercepting or spoofing transactional authorizations.",
    actionGuidance: "File an emergency cyber fraud complaint with your bank and local cybercrime bureau. Retain transaction reference numbers and SMS records."
  },
  {
    id: "RB-09",
    name: "Remote Access Trojan (RAT) Triad",
    category: "Surveillance & Privacy",
    conditionDescription: "IF unknown_app = TRUE AND unusual_permissions = TRUE AND unknown_device = TRUE",
    requiredFacts: ["unknown_app", "unusual_permissions", "unknown_device"],
    evaluate: (f: WorkingMemoryFacts) => f.unknown_app && f.unusual_permissions && f.unknown_device,
    riskContribution: 28,
    severityFloor: "CRITICAL",
    rationale: "The combination of unknown app presence, sensor surveillance, and remote hardware sessions indicates a comprehensive Remote Access Trojan compromise.",
    actionGuidance: "Disconnect Wi-Fi and Cellular data immediately. Backup essential media to an external drive without running executable backups, then factory reset."
  },
  {
    id: "RB-10",
    name: "Sustained Resource Exploitation Vector",
    category: "Device Integrity",
    conditionDescription: "IF battery_drain = TRUE AND phone_hot = TRUE AND abnormal_behavior = TRUE",
    requiredFacts: ["battery_drain", "phone_hot", "abnormal_behavior"],
    evaluate: (f: WorkingMemoryFacts) => f.battery_drain && f.phone_hot && f.abnormal_behavior,
    riskContribution: 18,
    rationale: "Concurrently exhibiting severe thermal elevation, rapid discharge, and interface lag signifies uncontrolled multi-threaded background abuse.",
    actionGuidance: "Audit active process lists via developer options or third-party open-source process monitors. Check for sideloaded APKs or profiles."
  },
  {
    id: "RB-11",
    name: "Full Account Takeover (ATO) In Progress",
    category: "Account Takeover",
    conditionDescription: "IF unknown_login = TRUE AND suspicious_otp = TRUE AND unknown_device = TRUE",
    requiredFacts: ["unknown_login", "suspicious_otp", "unknown_device"],
    evaluate: (f: WorkingMemoryFacts) => f.unknown_login && f.suspicious_otp && f.unknown_device,
    riskContribution: 26,
    severityFloor: "CRITICAL",
    rationale: "Coordinated foreign login, credential reset spam, and unauthorized session generation reflect an orchestrated hostile identity acquisition.",
    actionGuidance: "Access recovery emails and primary provider portals from a hardened separate device to revoke API tokens, recovery numbers, and app passwords."
  },
  {
    id: "RB-12",
    name: "Stealth Data Exfiltration Conduit",
    category: "Surveillance & Privacy",
    conditionDescription: "IF unusual_permissions = TRUE AND battery_drain = TRUE",
    requiredFacts: ["unusual_permissions", "battery_drain"],
    evaluate: (f: WorkingMemoryFacts) => f.unusual_permissions && f.battery_drain,
    riskContribution: 16,
    rationale: "Sensory or location access paired with continuous battery depletion indicates persistent streaming of audio, camera frames, or GPS telemetry to a C2 server.",
    actionGuidance: "Review location permissions set to 'Allow all the time' and restrict them to 'Allow only while using the app' or disable completely."
  },
  {
    id: "RB-13",
    name: "Spam Relay / Command-and-Control Bot",
    category: "Device Integrity",
    conditionDescription: "IF unauthorized_messages = TRUE AND unknown_app = TRUE",
    requiredFacts: ["unauthorized_messages", "unknown_app"],
    evaluate: (f: WorkingMemoryFacts) => f.unauthorized_messages && f.unknown_app,
    riskContribution: 20,
    rationale: "Unknown application actively utilizing SMS or messaging protocols without user initiation acts as a malicious relay for phishing botnets.",
    actionGuidance: "Uninstall the unrecognized app immediately. Notify contacts that messages sent within the past 24 hours may contain deceptive links."
  },
  {
    id: "RB-14",
    name: "Isolated Rogue Application Flag",
    category: "Device Integrity",
    conditionDescription: "IF unknown_app = TRUE",
    requiredFacts: ["unknown_app"],
    evaluate: (f: WorkingMemoryFacts) => f.unknown_app,
    riskContribution: 10,
    rationale: "Any unidentified binary or application package on mobile storage represents an untrusted code execution risk.",
    actionGuidance: "Locate the package in App Management, inspect its developer certificate and install source, then uninstall."
  },
  {
    id: "RB-15",
    name: "Isolated Rogue Session Anomaly",
    category: "Account Takeover",
    conditionDescription: "IF unknown_device = TRUE",
    requiredFacts: ["unknown_device"],
    evaluate: (f: WorkingMemoryFacts) => f.unknown_device,
    riskContribution: 12,
    rationale: "Presence of unknown hardware in account management portals indicates a stale or compromised session cookie.",
    actionGuidance: "Terminate the unrecognized session and review recent login IP ranges."
  },
  {
    id: "RB-16",
    name: "Credential Brute-Force / Phishing Precursor",
    category: "Social Engineering & Credentials",
    conditionDescription: "IF suspicious_otp = TRUE",
    requiredFacts: ["suspicious_otp"],
    evaluate: (f: WorkingMemoryFacts) => f.suspicious_otp,
    riskContribution: 10,
    rationale: "Unprompted verification messages signal that third-party breach dumps containing your password are being actively tested against online services.",
    actionGuidance: "Check HaveIBeenPwned for recent credential leaks and implement unique passwords across all critical services."
  },
  {
    id: "RB-17",
    name: "Unregulated Sensor Access Anomaly",
    category: "Surveillance & Privacy",
    conditionDescription: "IF unusual_permissions = TRUE",
    requiredFacts: ["unusual_permissions"],
    evaluate: (f: WorkingMemoryFacts) => f.unusual_permissions,
    riskContribution: 12,
    rationale: "Sensors accessing microphone or camera without corresponding user-initiated apps reflect potential privacy leakage or misconfigured permissions.",
    actionGuidance: "Use privacy dashboard tools to audit timeline of hardware sensor access."
  },
  {
    id: "RB-18",
    name: "Catastrophic Multi-Vector Cyber Attack",
    category: "Financial Fraud",
    conditionDescription: "IF unauthorized_transaction = TRUE AND unknown_login = TRUE AND unknown_app = TRUE",
    requiredFacts: ["unauthorized_transaction", "unknown_login", "unknown_app"],
    evaluate: (f: WorkingMemoryFacts) => f.unauthorized_transaction && f.unknown_login && f.unknown_app,
    riskContribution: 30,
    severityFloor: "CRITICAL",
    rationale: "Simultaneous financial exfiltration, unauthorized account access, and foreign application residency confirms a coordinated high-impact cybersecurity breach.",
    actionGuidance: "Institute full incident response: freeze all banking accounts, sever mobile network connections, preserve digital evidence, and file official reports."
  }
];
