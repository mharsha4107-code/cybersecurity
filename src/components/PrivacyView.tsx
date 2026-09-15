import React from 'react';
import { 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  EyeOff, 
  Server, 
  FileCheck, 
  Info,
  GraduationCap
} from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Academic Research Prototype</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy, Ethics & Safety Disclosures
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Comprehensive compliance notice regarding data sandboxing, ethical guidelines, and non-operational demo boundaries.
        </p>
      </div>

      {/* Primary Disclosures List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Disclosure 1 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <GraduationCap className="w-4 h-4" />
            <span>1. Academic Prototype Scope</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            CyberShield is developed purely as an educational academic project to demonstrate the practical application of Rule-Based Expert Systems and Explainable AI (XAI) in mobile cybersecurity incident triage.
          </p>
        </div>

        {/* Disclosure 2 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>2. No Invasive Hacking / Penetration</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The application does not perform port scanning, packet injection, OS exploitation, firmware probing, or unauthorized credential access. It relies strictly on user-reported indicators.
          </p>
        </div>

        {/* Disclosure 3 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>3. No Forensic Guarantee</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Evaluation scores and severity classifications indicate heuristic risk patterns. They do not constitute a legal or technical guarantee that a device is or is not compromised.
          </p>
        </div>

        {/* Disclosure 4 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <EyeOff className="w-4 h-4" />
            <span>4. IP Privacy & Geolocation Reality</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            IP addresses are treated as sensitive network identifiers and masked by default. An IP address alone cannot reliably identify a specific human individual or pinpoint an exact street address.
          </p>
        </div>

        {/* Disclosure 5 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <Server className="w-4 h-4" />
            <span>5. Client-Side Sandboxing</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            All assessment questionnaire responses, working memory facts, and generated incident reports remain strictly within the local browser sandbox (`localStorage`). No tracking analytics or third-party telemetry is transmitted.
          </p>
        </div>

        {/* Disclosure 6 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <FileCheck className="w-4 h-4" />
            <span>6. Simulated Incident Reporting</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The “Submit Report – Demo” feature is a prototype simulation. It simulates the workflow of dispatching structured incident briefs without transmitting data to police, emergency services, or government systems.
          </p>
        </div>
      </div>

      {/* Bottom Educational Callout */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-white">College Viva / Academic Presentation Note</h4>
          <p className="leading-relaxed">
            During academic evaluation, this application serves to demonstrate Knowledge Representation, Propositional Fact Extraction, Forward-Chaining Inference, and Conflict Resolution Modules.
          </p>
        </div>
      </div>
    </div>
  );
};
