import React from 'react';
import { Users, TrendingUp } from 'lucide-react';

const PeerIndexCard: React.FC = () => {
  return (
    <div className="bg-white rounded-md shadow-xs border border-slate-300 flex flex-col h-full overflow-hidden font-sans">
      {/* Header */}
      <div className="px-3.5 py-2.5 flex items-center gap-2 border-b border-slate-200 bg-slate-100/80">
        <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs shrink-0">
          4
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900 text-[11px] tracking-tight leading-none mb-0.5 uppercase truncate whitespace-nowrap">Peer Index Benchmark</h3>
          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none truncate whitespace-nowrap">NEWGEN SOFTWARE SOLUTIONS</p>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col gap-3">
        <div className="space-y-2.5">
          <div>
            <label className="block text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">BUREAU SCORE TRENDS</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-[9px] font-black text-emerald-600 whitespace-nowrap">+15% Peer Alpha</span>
            </div>
          </div>

          <div>
            <label className="block text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">SAVINGS BEHAVIOUR</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-amber-50 px-2 py-1.5 rounded-lg border border-amber-100">
                <div className="text-[12px] font-black text-amber-700">High</div>
                <div className="text-[7px] font-bold text-amber-500 uppercase tracking-tighter">Consistency</div>
              </div>
              <div className="bg-blue-50 px-2 py-1.5 rounded-lg border border-blue-100">
                <div className="text-[12px] font-black text-blue-700">62%</div>
                <div className="text-[7px] font-bold text-blue-500 uppercase tracking-tighter">Centile</div>
              </div>
            </div>
            <p className="text-[8px] text-gray-500 mt-1 font-medium leading-tight">Maintains higher liquid reserves than company average.</p>
          </div>
        </div>

        <div className="mt-auto pt-1.5 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-[8px] font-black text-indigo-600">
            <TrendingUp size={10} />
            <span className="uppercase tracking-widest">Relative Alpha: +12.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerIndexCard;
