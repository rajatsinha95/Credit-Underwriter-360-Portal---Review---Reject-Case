import React from 'react';
import { CustomerProfile, DecisionRecommendation } from '../types';
import { 
  RefreshCw, 
  Sparkles, 
  XCircle
} from 'lucide-react';

interface HeaderProps {
  customer: CustomerProfile;
  approvedAmount?: string;
  recommendation?: DecisionRecommendation;
  onStartAnalysis?: () => void;
  isAnalysisStarted?: boolean;
  isAnalysisComplete?: boolean;
  activeSection?: string;
  onSelectSection?: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  customer, 
  approvedAmount, 
  recommendation, 
  onStartAnalysis, 
  isAnalysisStarted, 
  isAnalysisComplete 
}) => {
  return (
    <header className="w-full font-sans bg-[#FAFBFD] border-b border-[#CBD5E1] shadow-2xs">
      {/* Underwriting Outcome (Directly at the Top of Screen) */}
      <div className="w-full px-4 lg:px-6 py-2">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded-[2px] shrink-0">
              Underwriting Outcome
            </span>
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs font-black tracking-wide text-red-600 bg-red-50 border border-red-300 px-2.5 py-0.5 rounded-[2px] uppercase font-mono shadow-2xs">
                Review - Reject
              </span>
              <p className="text-xs text-slate-800 font-medium truncate">
                {isAnalysisComplete 
                  ? "Critical policy thresholds breached (TDSR: 85.07%, LTV: 90.28%, Creditinfo Score: 598). Rejection recommendation confirmed."
                  : isAnalysisStarted 
                  ? "Multi-agent evaluation completed: 6 credit policy exceptions detected."
                  : "Requested Facility of GYD 32,500,000.00 exceeds allowable risk benchmarks (TDSR 85.07%, LTV 90.28%)."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0">
            <div className="hidden lg:flex items-center gap-1.5 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Decision:</span>
              <span className="font-mono font-black text-red-600 bg-red-50 px-2.5 py-0.5 rounded-[2px] border border-red-300">
                Review - Reject
              </span>
            </div>

            {/* Re-verify Policy */}
            <button 
              id="header-run-ai-btn"
              onClick={onStartAnalysis}
              disabled={isAnalysisStarted && !isAnalysisComplete}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-[2px] font-bold text-xs transition-colors border ${
                isAnalysisComplete 
                  ? 'bg-rose-50 text-rose-800 border-rose-300 cursor-default' 
                  : isAnalysisStarted 
                  ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 active:scale-98 cursor-pointer'
              }`}
            >
              {isAnalysisComplete ? (
                <><XCircle size={13} className="text-rose-600" /> Decision Synced</>
              ) : isAnalysisStarted ? (
                <><RefreshCw size={13} className="animate-spin text-slate-500" /> Verifying...</>
              ) : (
                <><Sparkles size={13} className="text-amber-500" /> Re-verify Policy</>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
