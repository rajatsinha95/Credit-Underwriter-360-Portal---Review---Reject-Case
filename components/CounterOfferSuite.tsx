import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Circle, TrendingDown, Clock, Wallet, ShieldCheck } from 'lucide-react';
import { CounterOfferSuiteItem } from '../types';

interface CounterOfferSuiteProps {
  offers: CounterOfferSuiteItem[];
}

const CounterOfferSuite: React.FC<CounterOfferSuiteProps> = ({ offers }) => {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(offers.find(o => o.recommended)?.id || null);

  return (
    <div className="bg-white rounded-md shadow-xs border border-slate-300 flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="px-5 py-2.5 flex items-center justify-between border-b border-slate-200 bg-slate-100/80">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs shrink-0">
            1
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xs tracking-tight leading-none mb-1 uppercase">AI Structured Counter-Offer Suite</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Simulating Path to Direct Approval</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Evaluation Mode:</span>
            <div className="px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-[9px] font-bold text-[#0B3564] uppercase tracking-widest">
              NBO Optimizer
            </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {offers.map((offer) => (
            <div 
              key={offer.id}
              onClick={() => setSelectedOffer(offer.id)}
              className={`group relative flex flex-col p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer h-full ${
                selectedOffer === offer.id 
                  ? 'bg-white border-indigo-600 shadow-2xl shadow-indigo-100 ring-4 ring-indigo-50 transform scale-[1.02] z-10' 
                  : 'bg-white/80 border-gray-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl'
              }`}
            >
              {/* Radio Selector */}
              <div className="absolute top-5 right-5">
                {selectedOffer === offer.id ? (
                  <CheckCircle2 className="text-indigo-600 w-6 h-6 fill-indigo-50" />
                ) : (
                  <Circle className="text-gray-200 w-6 h-6" />
                )}
              </div>

              {/* Title & Badge */}
              <div className="mb-5 pr-8">
                <div className="text-[14px] font-black text-gray-900 leading-tight uppercase tracking-tight mb-1">{offer.title}</div>
                <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className={selectedOffer === offer.id ? "text-indigo-500" : "text-gray-300"} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedOffer === offer.id ? "text-indigo-600" : "text-gray-400"}`}>
                        {offer.approvalIntent}
                    </span>
                </div>
              </div>

              {/* Parameters Table-like View */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between group-hover:px-1 transition-all">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <Wallet size={12} className="text-indigo-400" />
                    Revised Amount
                  </div>
                  <div className="text-[15px] font-black text-gray-900">GYD {offer.loanAmount}</div>
                </div>
                
                <div className="flex items-center justify-between group-hover:px-1 transition-all">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <Clock size={12} className="text-indigo-400" />
                    Revised Tenure
                  </div>
                  <div className="text-[12px] font-black text-gray-700 uppercase tracking-tighter">{offer.tenure}</div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 mt-2">
                  <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-indigo-50/50 transition-colors">
                    <div className="text-[8px] font-black text-gray-400 uppercase mb-1">EMI</div>
                    <div className="text-[11px] font-black text-gray-900 leading-none">GYD {offer.emi}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-indigo-50/50 transition-colors">
                    <div className="text-[8px] font-black text-gray-400 uppercase mb-1">DBR</div>
                    <div className="text-[11px] font-black text-rose-600 leading-none">{offer.dbr}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-indigo-50/50 transition-colors">
                    <div className="text-[8px] font-black text-gray-400 uppercase mb-1">LTV</div>
                    <div className="text-[11px] font-black text-indigo-600 leading-none">{offer.ltv}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                className={`mt-auto w-full py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${
                  selectedOffer === offer.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {selectedOffer === offer.id ? 'Offer Selected' : 'Choose Offer'}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="px-5 py-3 border-t border-gray-50 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingDown size={14} className="text-emerald-500" />
          <p className="text-[10px] text-gray-400 font-bold tracking-tight uppercase">
            Optimization Target: 0.85% Marginal Risk Reduction
          </p>
        </div>
        <div className="flex items-center gap-4">
            <button className="text-[10px] font-black text-gray-400 hover:text-indigo-600 uppercase tracking-widest flex items-center gap-1 transition-colors">
              Reset Suite
            </button>
            <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest flex items-center gap-1 transition-colors">
              Advanced Simulation
            </button>
        </div>
      </div>
    </div>
  );
};

export default CounterOfferSuite;
