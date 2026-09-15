import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Layers, 
  Terminal,
  ShieldAlert,
  Info
} from 'lucide-react';
import { KNOWLEDGE_BASE_RULES } from '../expertSystem/knowledgeBase';
import { ExpertRule } from '../types';

export const KnowledgeBaseView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>(null);

  const categories = ['ALL', 'Device Integrity', 'Account Takeover', 'Surveillance & Privacy', 'Financial Fraud', 'Social Engineering & Credentials'];

  const filteredRules = KNOWLEDGE_BASE_RULES.filter((rule) => {
    const matchesSearch = 
      rule.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.conditionDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.rationale.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || rule.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedRuleId(expandedRuleId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Rule-Based Expert System Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          CyberShield Knowledge Base
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          The codified cybersecurity repository containing 18 deterministic IF–THEN production rules engineered for mobile incident diagnosis.
        </p>
      </div>

      {/* Architecture Explanation Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-3 text-xs">
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Expert System Rule Structure (Academic Specification)</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          Each production rule consists of an <strong>Antecedent (IF Condition)</strong> evaluated against the user's working memory facts, and a <strong>Consequent (THEN Action)</strong> that adds a weighted risk increment and triggers targeted mitigation guidance.
        </p>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
          <code>RULE &lt;ID&gt;: IF (Fact_A == TRUE ∧ Fact_B == TRUE) THEN AssertRisk(+Points) ∧ Flag(Category)</code>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center text-xs">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rule ID, condition, or keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Table (Format requested in prompt) */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-bold">Rule ID</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">IF Condition (Antecedent)</th>
                <th className="py-3.5 px-4 font-bold">THEN Action (Consequent)</th>
                <th className="py-3.5 px-4 font-bold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filteredRules.map((rule: ExpertRule) => {
                const isExpanded = expandedRuleId === rule.id;
                return (
                  <React.Fragment key={rule.id}>
                    <tr
                      id={`kb-rule-row-${rule.id}`}
                      onClick={() => toggleExpand(rule.id)}
                      className="hover:bg-slate-850/60 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                        {rule.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                          {rule.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        <code className="text-amber-300/90 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                          {rule.conditionDescription}
                        </code>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                        +{rule.riskContribution} Risk Points
                        {rule.severityFloor && (
                          <span className="ml-2 text-[10px] text-rose-400 font-normal">
                            (Floor: {rule.severityFloor})
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(rule.id);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-white"
                          aria-label="Expand Rule Details"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Detail Row */}
                    {isExpanded && (
                      <tr className="bg-slate-950/70">
                        <td colSpan={5} className="p-5 border-t border-slate-800/80 space-y-3">
                          <div className="space-y-1">
                            <h4 className="font-bold text-white text-sm">
                              {rule.name}
                            </h4>
                            <p className="text-slate-400 leading-relaxed text-xs">
                              {rule.rationale}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                              <span className="font-semibold text-slate-300 block mb-1">
                                Propositional Logic Antecedent:
                              </span>
                              <code className="text-cyan-300 font-mono text-[11px] block">
                                {rule.conditionDescription}
                              </code>
                              <span className="text-[10px] text-slate-500 block mt-1">
                                Requires facts: {rule.requiredFacts.join(', ')}
                              </span>
                            </div>

                            <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-cyan-200">
                              <span className="font-semibold text-cyan-300 block mb-1">
                                Action Guidance Generated:
                              </span>
                              <p className="text-[11px] text-slate-300">
                                {rule.actionGuidance}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
