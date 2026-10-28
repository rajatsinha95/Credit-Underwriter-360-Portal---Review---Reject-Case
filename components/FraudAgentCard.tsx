import React from 'react';
import { Shield, AlertCircle, Flag, Loader2, ChevronDown } from 'lucide-react';
import { FraudResult } from '../types';

interface FraudAgentCardProps {
  result: FraudResult | null;
  isCached?: boolean;
  isRunning?: boolean;
}

const FraudAgentCard: React.FC<FraudAgentCardProps> = ({ result, isCached, isRunning }) => {
  const isHighRisk = result?.status.toLowerCase().includes('high');
  const isMediumRisk = result?.status.toLowerCase().includes('medium');

  const getStatus = () => {
    if (isHighRisk) return { label: 'Critical', color: 'bg-rose-50 text-rose-500', border: 'border-l-rose-500' };
    if (isMediumRisk) return { label: 'Elevated', color: 'bg-orange-50 text-orange-500', border: 'border-l-amber-500' };
    return { label: 'Low Risk', color: 'bg-emerald-50 text-emerald-500', border: 'border-l-emerald-500' };
  };

  const status = getStatus();

  return (
    <div className={`bg-white rounded-md shadow-xs border border-slate-300 flex flex-col h-full overflow-hidden relative border-l-4 ${status.border}`}>
      <div className="p-3 pb-2 bg-slate-50/70 border-b border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs shrink-0">
              13
            </div>
            <div className="min-w-0">
              <h3 className="text-[11px] font-bold text-slate-900 tracking-tight uppercase leading-none mb-0.5 truncate whitespace-nowrap">Contagion & Fraud Risk</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none truncate whitespace-nowrap">Group Exposure & AML</p>
            </div>
          </div>
          {isRunning ? (
            <Loader2 size={13} className="text-[#0B3564] animate-spin shrink-0" />
          ) : (
            <ChevronDown size={12} className="text-slate-300 shrink-0" />
          )}
        </div>

        {/* Status Badge & Summary */}
        <div className="flex flex-col gap-1.5 mb-1.5">
          <div className={`self-start px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${status.color}`}>
            {status.label}
          </div>
          <p className="text-[9px] text-gray-600 font-medium leading-tight">
            {isHighRisk 
              ? "Entities under restructuring — cross-default risk elevated."
              : "No significant contagion risks detected; within limits."}
          </p>
        </div>
      </div>

      {/* Detailed Content - Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-3 pt-0 border-t border-gray-50 pt-2">
        {!result ? (
          <div className="flex flex-col items-center justify-center py-4 h-full">
            <Loader2 size={18} className="animate-spin text-gray-200" />
            <span className="text-[9px] text-gray-400 mt-2 uppercase font-bold tracking-widest">Screening...</span>
          </div>
        ) : (
          <div className={`flex flex-col gap-2 transition-opacity duration-500 pt-1.5 ${isRunning ? 'opacity-40' : ''}`}>
            <div className="flex items-center justify-between bg-gray-50 p-1 rounded-lg border border-gray-100">
              <span className="text-[7px] text-gray-400 uppercase font-black">Status</span>
              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                isHighRisk ? 'bg-red-100 text-red-600' :
                isMediumRisk ? 'bg-orange-100 text-orange-600' :
                'bg-green-100 text-green-600'
              }`}>
                {result.status}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Flag size={9} className="text-gray-400" />
                <span className="text-[7px] text-gray-400 uppercase font-black">Flags</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {result.flags.map((flag, idx) => (
                  <span key={idx} className={`text-[7px] font-bold px-1 py-0.5 rounded border ${
                    flag.severity === 'High' ? 'bg-red-50 border-red-100 text-red-600' :
                    flag.severity === 'Medium' ? 'bg-orange-50 border-orange-100 text-orange-600' :
                    'bg-blue-50 border-blue-100 text-blue-600'
                  }`}>
                    {flag.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1 border-t border-gray-50 pt-1.5">
              <div className="flex items-center gap-1">
                <AlertCircle size={9} className="text-gray-400" />
                <span className="text-[7px] text-gray-400 uppercase font-black">Alerts</span>
              </div>
              <div className="space-y-1">
                {result.alerts.slice(0, 2).map((alert, idx) => (
                  <div key={idx} className="text-[9px] text-gray-600 bg-gray-50 p-1 rounded border-l-2 border-red-400 leading-tight">
                    {alert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudAgentCard;
