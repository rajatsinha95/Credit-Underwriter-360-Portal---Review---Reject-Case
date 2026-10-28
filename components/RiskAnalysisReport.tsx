import React, { useState } from 'react';
import { RiskParameter } from '../types';
import { 
  CheckCircle2, 
  Check, 
  RefreshCw,
  HelpCircle,
  FileCheck2,
  XCircle,
  X
} from 'lucide-react';

interface RiskAnalysisReportProps {
  riskData: RiskParameter[];
}

const RiskAnalysisReport: React.FC<RiskAnalysisReportProps> = ({ riskData }) => {
  const [recommendedDecision, setRecommendedDecision] = useState<'Approve' | 'Review' | 'Decline'>('Review');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const failedCount = riskData.filter(r => r.policyOutput?.toLowerCase() === 'fail' || r.isAlert).length;
  const passedCount = riskData.length - failedCount;

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      if (failedCount > 0) {
        setSimulationResult(`Credit Policy Simulation: ${failedCount} of ${riskData.length} risk & credit parameters failed GBTI benchmarks (TDSR 85.07%, LTV 90.28%, Score 598). Recommended Decision: Review - Reject.`);
      } else {
        setSimulationResult("Credit Policy Simulation: All 21 risk & credit parameters satisfy GBTI Credit Policy v4.2 benchmarks. Recommended Decision: APPROVE.");
      }
      setTimeout(() => setSimulationResult(null), 5000);
    }, 750);
  };

  return (
    <div id="section-risk-analysis" className="bg-white rounded-[4px] border border-slate-300 shadow-xs overflow-hidden flex flex-col font-sans">
      
      {/* Newgen Enterprise Section Header */}
      <div className="px-4 py-2.5 bg-slate-100/90 border-b border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-[3px] bg-[#F26522] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            8
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
              Risk Analysis & Parameters
            </h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
          {failedCount > 0 ? (
            <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-300 px-2 py-0.5 rounded-[3px] flex items-center gap-1 shadow-2xs">
              <XCircle size={11} className="text-red-600" />
              {passedCount}/{riskData.length} Criteria Passed • {failedCount} Failed (Review - Reject)
            </span>
          ) : (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-[3px] flex items-center gap-1">
              <CheckCircle2 size={11} className="text-emerald-600" />
              {riskData.length}/{riskData.length} Criteria Passed (Approve Case)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-[11px] text-slate-600 font-medium">
            Currency: <strong className="text-slate-800">Guyana Dollars (GYD)</strong>
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 bg-white space-y-3.5">
        
        {/* Simulation Result Notification */}
        {simulationResult && (
          <div className={`p-2.5 rounded-[3px] text-xs font-semibold flex items-center gap-2 transition-all ${
            failedCount > 0 
              ? 'bg-red-50 border border-red-300 text-red-900' 
              : 'bg-emerald-50 border border-emerald-300 text-emerald-900'
          }`}>
            {failedCount > 0 ? (
              <XCircle size={14} className="text-red-600 shrink-0" />
            ) : (
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            )}
            <span>{simulationResult}</span>
          </div>
        )}

        {/* Clean Newgen Workitem Tabular Grid */}
        <div className="border border-slate-300 rounded-[3px] overflow-hidden shadow-2xs">
          <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 bg-slate-100 text-slate-700 border-b border-slate-300 z-10 shadow-2xs">
                <tr>
                  <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px] w-2/5 border-r border-slate-200">
                    Parameter
                  </th>
                  <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px] w-1/4 border-r border-slate-200">
                    Actual Value
                  </th>
                  <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px] w-1/5 border-r border-slate-200">
                    Expected Value
                  </th>
                  <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px] text-center">
                    Decision
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {riskData.map((row, idx) => {
                  const isFail = row.policyOutput?.toLowerCase() === 'fail' || row.isAlert;

                  return (
                    <tr 
                      key={row.id || idx} 
                      className={`transition-colors ${
                        isFail 
                          ? 'bg-red-50/70 border-l-4 border-l-red-600 hover:bg-red-100/50' 
                          : idx % 2 === 1 ? 'bg-slate-50/50 hover:bg-amber-50/30' : 'bg-white hover:bg-amber-50/30'
                      }`}
                    >
                      <td className={`py-2 px-3.5 font-semibold border-r border-slate-200 ${
                        isFail ? 'text-red-950 font-bold' : 'text-slate-800'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          {isFail && <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />}
                          <span>{row.parameter}</span>
                        </div>
                      </td>
                      <td className={`py-2 px-3.5 font-mono font-bold border-r border-slate-200 ${
                        isFail ? 'text-red-700 font-bold' : 'text-slate-900'
                      }`}>
                        {row.value}
                      </td>
                      <td className={`py-2 px-3.5 font-medium border-r border-slate-200 ${
                        isFail ? 'text-red-900/80 font-medium' : 'text-slate-600'
                      }`}>
                        {row.expectedValue}
                      </td>
                      <td className="py-2 px-3.5 text-center">
                        {isFail ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[3px] text-[10px] font-black bg-red-100 text-red-700 border border-red-400 shadow-2xs">
                            <X size={10} className="text-red-600 stroke-[3]" />
                            {row.policyOutput}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[3px] text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                            <Check size={10} className="text-emerald-600 stroke-[3]" />
                            {row.policyOutput}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Decision and Simulation Controls with Newgen Signature Orange Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-[3px]">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-800 whitespace-nowrap">
              Recommended Decision
            </label>
            <select 
              value={recommendedDecision}
              onChange={(e) => setRecommendedDecision(e.target.value as any)}
              className="text-xs font-bold px-3 py-1.5 bg-white border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-[#F26522] min-w-[140px]"
            >
              <option value="Approve">Approve</option>
              <option value="Review">Review</option>
              <option value="Decline">Decline</option>
            </select>
          </div>

          {/* Newgen Primary Action Button in Orange */}
          <button 
            type="button"
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#F26522] hover:bg-[#d85213] text-white font-bold text-xs rounded-[3px] shadow-xs transition-colors cursor-pointer active:scale-98"
          >
            {isSimulating ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                <span>Simulating Policy...</span>
              </>
            ) : (
              <span>Credit Policy Simulation</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default RiskAnalysisReport;
