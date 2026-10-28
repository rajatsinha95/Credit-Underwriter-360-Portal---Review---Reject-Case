import React from 'react';
import { DecisionRecommendation } from '../types';
import { Activity, Info, TrendingUp, TrendingDown, BarChart3, HelpCircle, AlertTriangle } from 'lucide-react';

interface DecisionEngineProps {
  recommendation: DecisionRecommendation;
}

const DecisionEngine: React.FC<DecisionEngineProps> = ({ recommendation }) => {
  const pd = recommendation.probabilityOfDefault || 0;
  const isReject = (recommendation?.decision || '').toLowerCase().includes('reject') || (recommendation?.decision || '').toLowerCase().includes('decline');
  
  const getPDColor = (val: number) => {
    if (val < 15) return 'text-emerald-800';
    if (val < 35) return 'text-amber-700';
    return 'text-rose-700';
  };

  const getPDBg = (val: number) => {
    if (val < 15) return 'bg-emerald-50 border-emerald-200';
    if (val < 35) return 'bg-amber-50 border-amber-200';
    return 'bg-rose-50 border-rose-200';
  };

  return (
    <div id="section-decision-engine" className="bg-white rounded-[2px] border border-slate-300 shadow-2xs overflow-hidden flex flex-col h-full font-sans">
      {/* Header */}
      <div className="px-3.5 py-2 bg-slate-100/90 border-b border-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[2px] bg-[#F26522] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            6
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Default Risk & Policy Scoring</h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-[2px] text-[10px] font-bold text-slate-700 border border-slate-300">
          <BarChart3 size={11} />
          GBTI Risk v4.2
        </div>
      </div>

      <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
        {/* Primary Outcome: PD */}
        <div className={`p-2.5 rounded-[2px] border flex items-center justify-between ${getPDBg(pd)}`}>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">Estimated PD (Default Risk)</span>
            <div className={`text-xl font-mono font-bold ${getPDColor(pd)}`}>
              {pd}%
            </div>
          </div>
          <div className="text-right">
            <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${
              pd < 15 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 
              pd < 35 ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
            }`}>
              {pd < 15 ? 'Low Risk' : pd < 35 ? 'Moderate Risk' : 'High Default Risk'}
            </span>
            <span className="text-[9px] text-slate-500 block mt-0.5">Confidence: {recommendation.confidence}%</span>
          </div>
        </div>

        {/* Feature Importance / Contributing Factors */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Risk Factors & Weighting</h4>
            <span className="text-[9px] font-bold text-slate-500 uppercase">Impact Weight</span>
          </div>
          
          <div className="space-y-2 pt-0.5">
            {recommendation.featureImportance?.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-0.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800 text-[11px]">{item.feature}</span>
                  <div className="flex items-center gap-1">
                    {item.impact === 'positive' ? (
                      <TrendingDown size={11} className="text-emerald-700" />
                    ) : (
                      <TrendingUp size={11} className="text-rose-600" />
                    )}
                    <span className={`font-mono font-bold text-xs ${item.impact === 'positive' ? 'text-emerald-800' : 'text-rose-700'}`}>
                      {item.importance}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-[1px] overflow-hidden border border-slate-200">
                  <div 
                    className={`h-full transition-all duration-700 ${
                      item.impact === 'positive' ? 'bg-[#0B5C9E]' : 'bg-rose-500'
                    }`}
                    style={{ width: `${item.importance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2 px-3.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
          <Info size={11} />
          <span>Bank of Guyana & Basel Underwriting Criteria</span>
        </div>
        <div className={`text-[9px] font-bold px-1.5 py-0.2 rounded-[2px] border ${
          isReject 
            ? 'text-rose-800 bg-rose-50 border-rose-300' 
            : 'text-emerald-800 bg-emerald-50 border border-emerald-300'
        }`}>
          {isReject ? 'Review - Reject • Multiple Breaches' : 'Passed All Criteria'}
        </div>
      </div>
    </div>
  );
};

export default DecisionEngine;
