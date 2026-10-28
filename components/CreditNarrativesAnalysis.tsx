import React, { useState } from 'react';
import { BookOpen, AlertCircle, CheckCircle2, RefreshCcw, Edit3, Save, Info } from 'lucide-react';
import { CreditNarrative } from '../types';

interface CreditNarrativesAnalysisProps {
  narrative: CreditNarrative;
}

const CreditNarrativesAnalysis: React.FC<CreditNarrativesAnalysisProps> = ({ narrative }) => {
  const [underwriterNotes, setUnderwriterNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-md shadow-xs border border-slate-300 flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="px-5 py-2.5 flex items-center justify-between border-b border-slate-200 bg-slate-100/80">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs shrink-0">
            2
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs tracking-tight leading-none mb-1 uppercase">Credit Narratives — Analysis</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Automated Reasoning & Policy Logic</p>
          </div>
        </div>
        <div className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded text-[9px] font-bold text-emerald-700 uppercase tracking-widest">
          Verified Decision Logic
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: AI Reasoning */}
        <div className="space-y-6">
          {/* Decision Recommendation */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-3">AI Recommendation Context</label>
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-emerald-700">
                <CheckCircle2 size={16} />
                <span className="text-[13px] font-black uppercase tracking-tight">{narrative.decision}</span>
              </div>
              <p className="text-[11px] text-emerald-900/70 font-medium leading-relaxed italic">
                Reasoning is based on multi-agent triangulation of bureau, AA, and collateral signals.
              </p>
            </div>
          </div>

          {/* Contributing Factors */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-3">Key Contributing Factors</label>
            <div className="space-y-3">
              {narrative.contributingFactors.map((factor, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-black text-gray-900 uppercase tracking-wide">{factor.label}: </span>
                    <span className="text-[11px] text-gray-600 leading-tight font-medium">{factor.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Signals */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-3">Critical Risk Signals</label>
            <div className="grid grid-cols-1 gap-2">
              {narrative.riskSignals.map((signal, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className={signal.severity === 'High' ? 'text-rose-500' : 'text-amber-500'} />
                    <span className="text-[11px] font-bold text-gray-800">{signal.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-gray-500 font-medium">{signal.detail}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                      signal.severity === 'High' ? 'bg-rose-100 text-rose-700' : 
                      signal.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {signal.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Policy & Human in Loop */}
        <div className="space-y-6">
          {/* Policy Alignments */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-3">Policy Alignments & Trade-offs</label>
            <div className="space-y-2 mb-4">
              {narrative.policyAlignments.map((policy, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    {policy.status === 'Pass' ? (
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    ) : policy.status === 'Fail' ? (
                      <AlertCircle size={14} className="text-red-600" />
                    ) : (
                      <RefreshCcw size={14} className="text-amber-500" />
                    )}
                    <span className={`text-[11px] font-black uppercase tracking-tight ${policy.status === 'Fail' ? 'text-red-950' : 'text-gray-900'}`}>{policy.policy}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-500 font-medium">{policy.detail}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
                      policy.status === 'Pass' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
                      policy.status === 'Fail' ? 'text-red-700 bg-red-100 border border-red-300' :
                      'text-amber-700 bg-amber-50 border border-amber-200'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-indigo-700">
                <RefreshCcw size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Trade-offs Considered</span>
              </div>
              <ul className="space-y-2">
                {narrative.tradeOffs.map((tradeOff, idx) => (
                  <li key={idx} className="text-[10px] text-indigo-900/70 font-medium leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-1.5 h-1 w-1 bg-indigo-400 rounded-full" />
                    {tradeOff}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Underwriter Notes Section */}
          <div className="relative group">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
                <Edit3 size={12} className="text-indigo-500" />
                Underwriter Notes
              </label>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 flex items-center gap-1 transition-colors"
              >
                {isEditing ? <><Save size={12} /> Save Notes</> : <><Edit3 size={12} /> Edit Notes</>}
              </button>
            </div>
            
            <div className={`relative transition-all duration-300 ${isEditing ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}>
              <textarea 
                value={underwriterNotes}
                onChange={(e) => setUnderwriterNotes(e.target.value)}
                disabled={!isEditing}
                placeholder="Enter contextual comments, overrides, or justifications for final decision sign-off..."
                className={`w-full min-h-[160px] p-4 bg-gray-50 border border-gray-200 rounded-2xl text-[12px] font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all custom-scrollbar ${!isEditing ? 'cursor-not-allowed opacity-80' : ''}`}
              />
              {!isEditing && !underwriterNotes && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="flex flex-col items-center gap-2">
                    <Info size={20} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">No Notes Added</span>
                  </div>
                </div>
              )}
            </div>
            
            <p className="mt-3 text-[9px] text-gray-400 font-medium italic">
              * Notes are persisted in the audit trail and required for regulatory compliance reports.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-50 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info size={14} className="text-blue-500" />
          <p className="text-[10px] text-gray-400 font-bold tracking-tight uppercase">
            Human-in-the-loop: Analyst Verification Required
          </p>
        </div>
        <div className="flex items-center gap-4">
            <button className="px-6 py-1.5 bg-primary-dark text-accent-yellow rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-dark/20 hover:scale-105 transition-all">
              Final Decision Sign-off
            </button>
        </div>
      </div>
    </div>
  );
};

export default CreditNarrativesAnalysis;
