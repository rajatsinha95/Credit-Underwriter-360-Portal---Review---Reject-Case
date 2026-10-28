import React from 'react';
import { PolicyCheckItem } from '../types';
import { CheckCircle2, XCircle, Home, Briefcase, User, Wallet, Clock, FileText, ShieldCheck, HelpCircle, AlertTriangle } from 'lucide-react';

interface RightPanelProps {
  checks: PolicyCheckItem[];
}

const getIcon = (type: string) => {
    switch (type) {
        case 'home': return <Home size={12} className="text-emerald-600" />;
        case 'briefcase': return <Briefcase size={12} className="text-blue-600" />;
        case 'user': return <User size={12} className="text-indigo-600" />;
        case 'wallet': return <Wallet size={12} className="text-amber-600" />;
        case 'clock': return <Clock size={12} className="text-sky-600" />;
        case 'file': return <FileText size={12} className="text-slate-600" />;
        default: return <FileText size={12} className="text-slate-600" />;
    }
};

const RightPanel: React.FC<RightPanelProps> = ({ checks }) => {
  const passedCount = checks.filter(c => c.status === 'pass').length;
  const totalCount = checks.length;
  const failedCount = totalCount - passedCount;

  return (
    <div className="bg-white rounded-md border border-slate-300 shadow-xs overflow-hidden flex flex-col h-full font-sans">
      {/* Header */}
      <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            7
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Policy Verification</h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>
        
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
          failedCount > 0 
            ? 'bg-rose-50 text-rose-800 border-rose-200' 
            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          {failedCount > 0 ? (
            <>
              <AlertTriangle size={11} className="text-rose-600" />
              <span>{passedCount}/{totalCount} Passed • {failedCount} Failed</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={11} className="text-emerald-600" />
              <span>{passedCount} / {totalCount} Passed</span>
            </>
          )}
        </div>
      </div>

      <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-1.5">
            {checks.map((check) => {
              const isFail = check.status === 'fail';

              return (
                <div 
                  key={check.id} 
                  className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                    isFail 
                      ? 'bg-red-50/80 border-red-300 shadow-2xs' 
                      : 'bg-slate-50/70 border-slate-200/70'
                  }`}
                >
                    <div className="flex items-center gap-2 min-w-0">
                        <div className={`p-1 bg-white rounded-md shadow-2xs border shrink-0 ${
                          isFail ? 'border-red-300' : 'border-slate-200'
                        }`}>
                            {getIcon(check.iconType)}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className={`text-[9px] font-bold uppercase tracking-tight leading-none mb-0.5 truncate ${
                              isFail ? 'text-red-700' : 'text-slate-400'
                            }`}>
                              {check.label}
                            </span>
                            <span className={`text-xs font-semibold leading-none truncate ${
                              isFail ? 'text-red-950 font-bold' : 'text-slate-800'
                            }`}>
                              {check.value}
                            </span>
                        </div>
                    </div>
                    <div className="shrink-0 ml-2 flex items-center gap-1.5">
                        {isFail ? (
                            <>
                              <span className="px-1.5 py-0.5 rounded-[2px] text-[9px] font-black uppercase tracking-wider bg-red-100 text-red-700 border border-red-400">
                                Fail
                              </span>
                              <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center" title="Policy Benchmark Failed">
                                  <XCircle className="text-red-600" size={11} />
                              </div>
                            </>
                        ) : (
                            <>
                              <span className="px-1.5 py-0.5 rounded-[2px] text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
                                Pass
                              </span>
                              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                  <CheckCircle2 className="text-emerald-600" size={11} />
                              </div>
                            </>
                        )}
                    </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
