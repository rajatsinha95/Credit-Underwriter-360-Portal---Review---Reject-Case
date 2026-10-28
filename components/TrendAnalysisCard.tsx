import React from 'react';
import { Activity, Search, ShoppingCart, Clock, Wallet } from 'lucide-react';

const TrendAnalysisCard: React.FC = () => {
  return (
    <div className="bg-white rounded-md shadow-xs border border-slate-300 flex flex-col h-full overflow-hidden font-sans">
      {/* Header */}
      <div className="px-3.5 py-2.5 flex items-center gap-2 border-b border-slate-200 bg-slate-100/80">
        <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs shrink-0">
          5
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900 text-[11px] tracking-tight leading-none mb-0.5 uppercase truncate whitespace-nowrap">Trend Analysis</h3>
          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none truncate whitespace-nowrap">BEHAVIOURAL & TRANSACTIONAL</p>
        </div>
      </div>

      <div className="p-2.5 flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          {/* Bureau Enquiry Trends */}
          <div className="flex items-start gap-1.5 p-1.5 rounded-xl bg-gray-50/50 border border-gray-100">
            <Search size={12} className="text-gray-400 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <div className="text-[7px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Bureau Enquiries</div>
              <div className="text-[9px] font-bold text-gray-900 leading-tight">Downward Trend (-30% QoQ)</div>
            </div>
          </div>

          {/* Spending Patterns */}
          <div className="flex items-start gap-1.5 p-1.5 rounded-xl bg-gray-50/50 border border-gray-100">
            <ShoppingCart size={12} className="text-gray-400 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <div className="text-[7px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Spending Patterns</div>
              <div className="text-[9px] font-bold text-gray-900 leading-tight truncate">High Utility, Low Luxury</div>
            </div>
          </div>

          {/* Income Utilisation */}
          <div className="flex items-start gap-1.5 p-1.5 rounded-xl bg-gray-50/50 border border-gray-100">
            <Clock size={12} className="text-gray-400 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <div className="text-[7px] font-black text-gray-400 uppercase tracking-widest leading-none mb-0.5">Income Utilisation</div>
              <div className="text-[9px] font-bold text-gray-900 leading-tight">T+12 Days Velocity</div>
            </div>
          </div>

          {/* Final Uncommitted Savings */}
          <div className="flex items-start gap-1.5 p-1.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <Wallet size={12} className="text-emerald-600 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <div className="text-[7px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-0.5">Final Savings</div>
              <div className="text-[10px] font-black text-gray-900 leading-none">GYD 245,000 Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisCard;
