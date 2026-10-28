import React from 'react';
import { BrainCircuit, Loader2, Info, AlertTriangle, CheckCircle2, ShieldCheck, XCircle, HelpCircle } from 'lucide-react';
import { DecisionRecommendation } from '../types';

interface AIRecommendationProps {
  recommendation: DecisionRecommendation;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

const AIRecommendation: React.FC<AIRecommendationProps> = ({ 
  recommendation, 
  status
}) => {
  const isRunning = status === 'running';

  const getDecisionStyles = (decisionStr: string) => {
    const isReject = decisionStr.toLowerCase().includes('reject') || decisionStr.toLowerCase().includes('decline');
    
    if (isReject) {
      return { 
        text: 'REVIEW - REJECT', 
        badge: 'bg-rose-50 text-rose-800 border-rose-300', 
        pill: 'bg-rose-600 text-white',
        desc: 'Institutional Policy Breach • Over-leveraged TDSR (85.07%), Collateral LTV (90.28%), and Subprime Bureau (598)',
        isNegative: true
      };
    }

    return { 
      text: 'APPLICATION APPROVED', 
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-300', 
      pill: 'bg-emerald-600 text-white',
      desc: 'Customer Approved for Requested Facility • Policy Benchmarks Satisfied',
      isNegative: false
    };
  };

  const decision = getDecisionStyles(recommendation.decision || 'Review - Reject');

  return (
    <div id="section-ai-recommendation" className="bg-white rounded-[2px] border border-slate-300 shadow-2xs overflow-hidden flex flex-col h-full font-sans">
      {/* Header */}
      <div className="px-3.5 py-2 bg-slate-100/90 border-b border-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[2px] bg-[#F26522] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            2
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">AI Decision Recommendation</h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>
        {isRunning ? (
          <Loader2 size={13} className="animate-spin text-slate-600" />
        ) : (
          <span className="text-[10px] font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-[2px] border border-slate-300">
            {recommendation.confidence}% Confidence
          </span>
        )}
      </div>

      <div className={`p-3.5 space-y-3 flex-1 flex flex-col justify-between transition-opacity duration-300 ${isRunning ? 'opacity-40' : ''}`}>
        {/* Recommendation Badge Banner */}
        <div className={`p-2.5 rounded-[2px] border ${decision.badge} space-y-1`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {decision.isNegative ? (
                <XCircle size={14} className="text-rose-600 shrink-0" />
              ) : (
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              )}
              <span className="text-xs font-bold uppercase tracking-tight">{decision.text}</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-[2px] bg-white border border-current">
              PD: {recommendation.probabilityOfDefault}%
            </span>
          </div>
          <p className="text-[11px] font-medium leading-tight">
            {decision.desc}
          </p>
        </div>

        {/* Primary Drivers */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
            Primary Decision Drivers
          </span>
          <div className="flex flex-wrap gap-1.5">
            {recommendation.primaryDrivers.map((driver, idx) => (
              <span key={idx} className={`text-[10px] font-semibold px-2 py-0.5 rounded-[2px] border ${
                decision.isNegative 
                  ? 'text-rose-900 bg-rose-50/80 border-rose-200' 
                  : 'text-slate-800 bg-slate-100 border border-slate-200'
              }`}>
                {driver}
              </span>
            ))}
          </div>
        </div>

        {/* Executive Rationale Quote */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
            Underwriter Advisory
          </span>
          <p className="text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-[2px] border border-slate-200 leading-relaxed italic">
            "{recommendation.reasoning}"
          </p>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="px-3.5 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5">
          {decision.isNegative ? (
            <>
              <AlertTriangle size={12} className="text-rose-600" />
              <span className="font-semibold text-rose-800">Review - Reject Recommended</span>
            </>
          ) : (
            <>
              <ShieldCheck size={12} className="text-emerald-600" />
              <span className="font-semibold text-emerald-800">Straight-Through Approval</span>
            </>
          )}
        </div>
        <span className="font-medium text-slate-400">
          {decision.isNegative ? 'Multiple Policy Exceptions' : 'Zero Policy Exceptions'}
        </span>
      </div>
    </div>
  );
};

export default AIRecommendation;
