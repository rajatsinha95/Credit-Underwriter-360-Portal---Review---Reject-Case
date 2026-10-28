import React from 'react';
import { Home, MapPin, DollarSign, Percent, ShieldCheck, Scale, AlertTriangle, Loader2, ChevronDown } from 'lucide-react';
import { CollateralDetailsResult } from '../types';

interface CollateralCardProps {
  details: CollateralDetailsResult | null;
  isCached?: boolean;
  isRunning?: boolean;
}

const CollateralCard: React.FC<CollateralCardProps> = ({ details, isCached, isRunning }) => {
  const hasRiskFlags = details?.riskFlags && details.riskFlags.length > 0;
  const isCautious = details?.confidence && details.confidence < 85;

  const getStatus = () => {
    if (hasRiskFlags) return { label: 'Critical', color: 'bg-rose-50 text-rose-500', border: 'border-l-rose-500' };
    if (isCautious) return { label: 'Cautious', color: 'bg-amber-50 text-amber-500', border: 'border-l-amber-500' };
    return { label: 'Secure', color: 'bg-emerald-50 text-emerald-500', border: 'border-l-emerald-500' };
  };

  const status = getStatus();

  return (
    <div className={`bg-white rounded-md shadow-xs border border-slate-300 flex flex-col h-full overflow-hidden relative border-l-4 ${status.border}`}>
      <div className="p-3 pb-2 bg-slate-50/70 border-b border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs shrink-0">
              14
            </div>
            <div className="min-w-0">
              <h3 className="text-[11px] font-bold text-slate-900 tracking-tight uppercase leading-none mb-0.5 truncate whitespace-nowrap">Sector & Macro Valuation</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none truncate whitespace-nowrap">Collateral Market Context</p>
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
            {isCautious 
              ? "Steel utilization at 72%; HRC prices down 14% YTD."
              : "Market conditions remain stable; valuation supported."}
          </p>
        </div>
      </div>

      {/* Detailed Content - Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-3 pt-0 border-t border-gray-50 pt-2.5">
        {!details ? (
          <div className="flex flex-col items-center justify-center py-4 h-full">
            <Loader2 size={18} className="animate-spin text-gray-200" />
            <span className="text-[9px] text-gray-400 mt-2 uppercase font-bold tracking-widest">Valuating...</span>
          </div>
        ) : (
          <div className={`flex flex-col gap-1.5 transition-opacity duration-500 pt-1.5 ${isRunning ? 'opacity-40' : ''}`}>
            {/* Property Type & Location */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <MapPin size={9} className="text-indigo-400" />
                <span className="text-[7px] text-gray-400 uppercase font-black">Location</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-gray-800 leading-tight truncate">{details.propertyType}</span>
                <span className="text-[8px] text-gray-500 leading-tight truncate">{details.location}</span>
              </div>
            </div>

            {/* Market Value & LTV */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-1 px-1.5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-1 mb-0.5">
                  <DollarSign size={7} className="text-emerald-500" />
                  <span className="text-[7px] text-gray-400 uppercase font-bold leading-none">Value</span>
                </div>
                <span className="text-[10px] font-black text-emerald-600 leading-none">{details.marketValue}</span>
              </div>
              <div className="p-1 px-1.5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-1 mb-0.5">
                  <Percent size={7} className="text-rose-500" />
                  <span className="text-[7px] text-gray-400 uppercase font-bold leading-none">LTV</span>
                </div>
                <span className="text-[10px] font-black text-rose-600 leading-none">{details.ltv}</span>
              </div>
            </div>

            {/* Ownership & Legal */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="flex items-center justify-between bg-blue-50/50 p-1 px-1.5 rounded-lg border border-blue-100">
                <span className="text-[8px] text-blue-700 font-bold uppercase leading-none">Owner</span>
                <span className="text-[8px] font-bold text-blue-800 leading-none truncate ml-1">{details.ownershipStatus}</span>
              </div>
              <div className="flex items-center justify-between bg-emerald-50/50 p-1 px-1.5 rounded-lg border border-emerald-100">
                <span className="text-[8px] text-emerald-700 font-bold uppercase leading-none">Legal</span>
                <span className="text-[8px] font-bold text-emerald-800 leading-none truncate ml-1">{details.legalVerification}</span>
              </div>
            </div>

            {/* Confidence & Flags */}
            <div className="mt-auto pt-1.5 border-t border-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[7px] text-gray-400 uppercase font-bold">Conf.</span>
                <span className="text-[8px] font-black text-indigo-600">{details.confidence}%</span>
              </div>
              <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-1000" 
                  style={{ width: `${details.confidence}%` }}
                ></div>
              </div>
              
              {details.riskFlags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {details.riskFlags.slice(0, 2).map((flag, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-red-50 px-1 py-0.5 rounded border border-red-100">
                      <AlertTriangle size={7} className="text-red-500" />
                      <span className="text-[7px] font-bold text-red-600 uppercase tracking-tighter truncate">{flag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollateralCard;
