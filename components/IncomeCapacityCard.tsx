import React from 'react';
import { Landmark, Wallet, Coffee, PiggyBank } from 'lucide-react';

const IncomeCapacityCard: React.FC = () => {
  return (
    <div className="bg-white rounded-md shadow-xs border border-slate-300 flex flex-col h-full overflow-hidden font-sans">
      {/* Header */}
      <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-slate-200 bg-slate-100/80">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs shrink-0">
            6
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-[11px] tracking-tight leading-none mb-0.5 uppercase truncate whitespace-nowrap">Income & Capacity</h3>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none truncate whitespace-nowrap">CASHFLOW ANALYSIS</p>
          </div>
        </div>
        <div className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 rounded text-[8px] font-bold text-emerald-700 uppercase tracking-tighter shrink-0 ml-2">
          LIVE AA
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-50 flex items-center justify-center text-emerald-600">
                <Wallet size={10} />
              </div>
              <span className="text-[9px] font-bold text-gray-500 uppercase">Income</span>
            </div>
            <span className="text-[12px] font-black text-gray-900">GYD 485,000.00</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-50 flex items-center justify-center text-rose-500">
                <Coffee size={10} />
              </div>
              <span className="text-[9px] font-bold text-gray-500 uppercase">Burn</span>
            </div>
            <span className="text-[12px] font-black text-gray-900">GYD 542,000</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-xl border border-dashed border-emerald-200">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                <PiggyBank size={10} />
              </div>
              <span className="text-[9px] font-black text-emerald-700 uppercase">Surplus</span>
            </div>
            <span className="text-[13px] font-black text-emerald-800">GYD 878,000</span>
          </div>
        </div>

        <div className="mt-auto pt-1.5 border-t border-gray-50">
          <p className="text-[7px] text-gray-400 font-medium leading-tight">
            * Verified via direct payroll & bank statement. High repayment capacity for EMI of GYD 261,310.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncomeCapacityCard;
