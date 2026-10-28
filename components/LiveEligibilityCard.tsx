import React, { useState } from "react";
import { 
  Calculator, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  SlidersHorizontal,
  Info,
  HelpCircle,
  AlertTriangle,
  XCircle,
  FileCheck
} from "lucide-react";
import { CounterOffer } from "../types";

interface LiveEligibilityCardProps {
  counterOffer?: CounterOffer | null;
  onAmountChange?: (amt: string) => void;
}

const LiveEligibilityCard: React.FC<LiveEligibilityCardProps> = ({ onAmountChange }) => {
  const [loanAmount, setLoanAmount] = useState<number>(32.50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setLoanAmount(val);
    if (onAmountChange) {
      onAmountChange(`GYD ${val.toFixed(2)}M`);
    }
  };

  return (
    <div className="bg-white text-slate-900 rounded-[2px] border border-slate-300 shadow-2xs overflow-hidden flex flex-col w-full font-sans">
      {/* Card Header */}
      <div className="px-4 py-2 bg-slate-100/90 border-b border-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[2px] bg-[#F26522] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            15
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Facility Capacity & Policy Matrix</h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-[2px] border border-rose-300 flex items-center gap-1">
            <AlertTriangle size={12} className="text-rose-600" />
            Review - Reject (Policy Breach)
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="p-3.5 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center bg-white">
        {/* Left Column: Hero Eligibility Amount */}
        <div className="lg:col-span-3 space-y-1.5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-3 lg:pb-0 lg:pr-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Assessed Sanction Facility
          </span>
          
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl lg:text-3xl font-mono font-bold text-slate-900 tracking-tight">
              GYD 0.00 M
            </span>
            <span className="text-[10px] font-bold text-rose-800 bg-rose-50 border border-rose-300 px-1.5 py-0.2 rounded-[2px]">
              Review - Reject
            </span>
          </div>

          <p className="text-[11px] text-slate-600 font-medium">
            Requested: GYD 32.50 M • 90.28% Assessed LTV Coverage
          </p>
        </div>

        {/* Center-Left Column: Dynamic Simulation Slider */}
        <div className="lg:col-span-4 space-y-1.5 bg-slate-50 p-2.5 rounded-[2px] border border-slate-200">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1 text-[11px]"><SlidersHorizontal size={12} /> Facility Capacity Stress Test</span>
            <span className="font-mono text-[#F26522] font-bold">GYD {loanAmount.toFixed(2)}M</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="35" 
            step="0.5"
            value={loanAmount}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-slate-200 rounded-[2px] appearance-none cursor-pointer accent-[#F26522]"
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>GYD 10.0M (Floor)</span>
            <span className="text-slate-600 font-bold">GYD 18.2M (Policy Cap)</span>
            <span className="text-rose-700 font-bold">GYD 32.5M (Requested)</span>
          </div>
        </div>

        {/* Center-Right Column: Metrics Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-1.5 text-xs">
          <div className="bg-rose-50/60 p-1.5 rounded-[2px] border border-rose-200 flex flex-col">
            <span className="text-[9px] font-bold text-rose-700 uppercase">FOIR / TDSR</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-mono font-bold text-rose-700 text-xs">85.07%</span>
              <span className="text-[8px] text-rose-600 font-bold">• Limit: ≤45%</span>
            </div>
          </div>

          <div className="bg-rose-50/60 p-1.5 rounded-[2px] border border-rose-200 flex flex-col">
            <span className="text-[9px] font-bold text-rose-700 uppercase">Assessed LTV</span>
            <span className="font-mono font-bold text-rose-700 text-xs mt-0.5">90.28% (Max 75%)</span>
          </div>

          <div className="bg-slate-50 p-1.5 rounded-[2px] border border-slate-200 flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Requested Tenure</span>
            <span className="font-mono font-bold text-slate-800 text-xs mt-0.5">240 mo</span>
          </div>

          <div className="bg-slate-50 p-1.5 rounded-[2px] border border-slate-200 flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Monthly EMI</span>
            <span className="font-mono font-bold text-rose-700 text-xs mt-0.5">GYD 282,450</span>
          </div>

          <div className="bg-slate-50 p-1.5 rounded-[2px] border border-slate-200 flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Net Income Verified</span>
            <span className="font-mono font-bold text-slate-800 text-xs mt-0.5">GYD 485,000</span>
          </div>

          <div className="bg-slate-50 p-1.5 rounded-[2px] border border-slate-200 flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Decision Engine</span>
            <span className="font-mono font-bold text-rose-700 mt-0.5 text-[10px]">Review - Reject</span>
          </div>
        </div>

        {/* Right Column: Action Button */}
        <div className="lg:col-span-2 flex flex-col justify-center h-full">
          <button className="w-full py-2 bg-[#F26522] hover:bg-[#d85213] text-white rounded-[2px] font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer">
            <FileCheck size={13} className="text-white" />
            <span>Generate Decision Notice</span>
          </button>
          <p className="text-[9px] text-center text-rose-600 mt-1 font-bold">
            Policy Criteria Breached
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveEligibilityCard;
