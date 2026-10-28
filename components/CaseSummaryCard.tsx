import React from 'react';
import { FileText, Sparkles, Loader2, CheckCircle2, AlertTriangle, UserCheck, HelpCircle, XCircle } from 'lucide-react';
import { AI_CASE_SUMMARY } from '../constants';

interface CaseSummaryCardProps {
  summary?: string;
  isGenerating?: boolean;
}

const CaseSummaryCard: React.FC<CaseSummaryCardProps> = ({ summary, isGenerating }) => {
  const content = summary || AI_CASE_SUMMARY.executiveSummary;

  return (
    <div id="section-case-summarisation" className="bg-white rounded-md border border-slate-300 shadow-xs overflow-hidden flex flex-col h-full font-sans">
      {/* Header */}
      <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            9
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">AI Case Summarization</h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 text-rose-800 rounded-full border border-rose-200 font-bold text-[10px]">
          <AlertTriangle size={11} className="text-rose-600" />
          <span>Review - Reject Outcome</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400">
            <Loader2 size={24} className="text-[#0B3564] animate-spin mb-2" />
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Synthesizing Comprehensive Case Narrative...</span>
          </div>
        ) : (
          <>
            {/* Key Takeaway Highlight Callout */}
            <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200/80">
              <span className="text-[9px] font-black text-rose-800 uppercase tracking-wider block mb-1">
                KEY TAKEAWAY: REVIEW - REJECT
              </span>
              <p className="text-xs text-rose-950 font-semibold leading-relaxed">
                <strong className="text-rose-800 font-bold">Facility Declined.</strong> Marcus Anthony Persaud requested a mortgage facility of <strong className="text-[#0B3564]">GYD 32,500,000.00</strong> (TDSR: 85.07%, LTV: 90.28%, Creditinfo: 598). Review - Reject recommended due to multiple compounding credit policy failures.
              </p>
            </div>

            {/* Narrative Paragraphs */}
            <div className="text-xs text-slate-700 leading-relaxed font-normal space-y-2 bg-slate-50/60 p-3 rounded-xl border border-slate-200/60">
              {content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Findings List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/60 space-y-1">
                <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block">Strengths & Mitigants</span>
                <ul className="text-[11px] text-emerald-950 space-y-0.5 list-disc list-inside">
                  {AI_CASE_SUMMARY.keyStrengths.map((str, idx) => (
                    <li key={idx} className="truncate">{str}</li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200/60 space-y-1">
                <span className="text-[9px] font-bold text-rose-800 uppercase tracking-wider block">Policy Deviations (Basis for Reject)</span>
                <ul className="text-[11px] text-rose-950 space-y-0.5 list-disc list-inside">
                  {AI_CASE_SUMMARY.primaryConcerns.map((con, idx) => (
                    <li key={idx} className="truncate">{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CaseSummaryCard;
