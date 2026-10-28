import React from 'react';
import { BehaviourInsight } from '../types';
import { Activity, Loader2, ChevronDown } from 'lucide-react';

interface BehaviouralCardProps {
  insights: BehaviourInsight[];
  isCached?: boolean;
  isRunning?: boolean;
}

const BehaviouralCard: React.FC<BehaviouralCardProps> = ({ insights, isCached, isRunning }) => {
  return (
    <div className={`bg-white rounded-md shadow-xs border border-slate-300 flex flex-col h-full overflow-hidden relative border-l-4 ${insights.length > 0 ? 'border-l-emerald-500' : 'border-l-gray-300'}`}>
      <div className="p-3 pb-2 bg-slate-50/70 border-b border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs shrink-0">
              12
            </div>
            <div className="min-w-0">
              <h3 className="text-[11px] font-bold text-slate-900 tracking-tight uppercase leading-none mb-0.5 truncate whitespace-nowrap">Behavioural Agent</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none truncate whitespace-nowrap">Cash Flow Consistency</p>
            </div>
          </div>
          {isRunning ? (
            <Loader2 size={13} className="text-[#0B3564] animate-spin shrink-0" />
          ) : (
            <ChevronDown size={12} className="text-slate-300 shrink-0" />
          )}
        </div>

        {/* Status Badge & Summary */}
        <div className="flex flex-col gap-1.5 mb-1.5 border-b border-gray-50 pb-1.5">
          <div className={`self-start px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${insights.length > 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-400'}`}>
            {insights.length > 0 ? 'Complete' : isRunning ? 'Analyzing...' : 'Pending'}
          </div>
          <p className="text-[9px] text-gray-600 font-medium leading-tight">
            {insights.length > 0 
              ? "High income stability with 98% spending discipline score derived from 24-month history."
              : isRunning ? "Synthesizing transaction patterns and identifying discretionary surplus..." : "Awaiting agent execution for behavioural profiling."}
          </p>
        </div>
      </div>

      {/* Detailed Content - Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-3 pt-0">
        {insights.length > 0 ? (
          <div className={`space-y-2 transition-opacity duration-500 ${isRunning ? 'opacity-40' : 'opacity-100'}`}>
            {insights.map((insight, i) => (
              <div key={i} className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest leading-none truncate">{insight.category}</span>
                  <span className={`text-[7px] font-black px-1 py-0.5 rounded uppercase shrink-0 ml-2 ${
                    insight.score === 'Positive' ? 'bg-emerald-50 text-emerald-600' : 
                    insight.score === 'Neutral' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {insight.score}
                  </span>
                </div>
                <p className="text-[9px] text-gray-900 font-bold leading-snug">
                  {insight.insight}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 h-full">
            <Loader2 size={20} className={`animate-spin ${isRunning ? 'text-accent-yellow' : 'text-gray-100'}`} />
            <span className="text-[9px] text-gray-400 mt-2 uppercase font-bold tracking-widest">
              {isRunning ? 'Orchestrating...' : 'Awaiting Data'}
            </span>
          </div>
        )}
      </div>

      {/* Observational Note */}
      <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-100 italic">
        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider text-center">
          Intelligence persisted from historical bank statement graphs.
        </p>
      </div>
    </div>
  );
};

export default BehaviouralCard;
