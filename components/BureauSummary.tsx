import React from 'react';
import { BarChart3, ShieldCheck, Activity, AlertCircle, FileText, CheckCircle2, HelpCircle, AlertTriangle } from 'lucide-react';
import { BureauSummaryData } from '../types';

interface BureauSummaryProps {
  data: BureauSummaryData;
}

const BureauSummary: React.FC<BureauSummaryProps> = ({ data }) => {
  const isHealthy = data.bureauScore >= 710;

  return (
    <div id="section-credit-bureau" className="bg-white rounded-[2px] border border-slate-300 shadow-2xs overflow-hidden flex flex-col h-full font-sans">
      {/* Header */}
      <div className="px-3.5 py-2 bg-slate-100/90 border-b border-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[2px] bg-[#F26522] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            4
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Credit Bureau & Liabilities</h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isHealthy ? (
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-[2px] flex items-center gap-1">
              <CheckCircle2 size={11} className="text-emerald-600" />
              Creditinfo Prime
            </span>
          ) : (
            <span className="text-[10px] font-bold text-rose-800 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded-[2px] flex items-center gap-1">
              <AlertTriangle size={11} className="text-rose-600" />
              Creditinfo Alert • Subprime
            </span>
          )}
        </div>
      </div>

      <div className="p-3.5 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
        {/* Score & Key Stats */}
        <div className="grid grid-cols-2 gap-3 p-2.5 bg-slate-50 rounded-[2px] border border-slate-200">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-0.5">Creditinfo Score</span>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-xl font-mono font-bold ${isHealthy ? 'text-emerald-800' : 'text-rose-700'}`}>
                {data.bureauScore}
              </span>
              <span className={`text-[9px] font-bold px-1 py-0.2 rounded-[2px] uppercase ${
                isHealthy ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-rose-800 bg-rose-50 border border-rose-200'
              }`}>
                {isHealthy ? 'Prime Benchmark' : 'Below Benchmark (>710)'}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-0.5">Outstanding Balance</span>
            <span className="text-base font-mono font-bold text-slate-900">GYD {data.outstandingLoanAmount}</span>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="space-y-2.5">
          <div className="space-y-1.5">
            <h4 className="text-[9px] font-bold text-slate-500 tracking-widest uppercase pb-1 border-b border-slate-200">
              ACTIVITY LOG
            </h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              <ParamRow label="Active Accounts" value={data.activeLoanAccounts.toString()} isConcerning={data.activeLoanAccounts >= 4} />
              <ParamRow label="Loans (6M)" value={data.loansTakenLast6Months.toString()} isConcerning={data.loansTakenLast6Months > 0} />
              <ParamRow label="Hard Enquiries (12M)" value={data.creditEnquiriesLast12Months.toString()} isConcerning={data.creditEnquiriesLast12Months > 3} />
              <ParamRow label="Worst DPD" value={`${data.worstDpd} Days`} isConcerning={data.worstDpd > 0} />
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-[9px] font-bold text-slate-500 tracking-widest uppercase pb-1 border-b border-slate-200">
              RISK PARAMETERS & DELINQUENCIES
            </h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              <ParamRow label="Total DPDs" value={data.noOfDpds.toString()} isConcerning={data.noOfDpds > 0} />
              <ParamRow label="Overdue Amt" value={`GYD ${data.overdueAmount}`} isConcerning={parseFloat(data.overdueAmount.replace(/,/g, '')) > 0} />
              <ParamRow label="Missed Payments" value={data.missedPayment ? data.missedPayment.toString() : '2'} isConcerning={true} />
              <ParamRow label="Asset Class" value={data.assetClass} isConcerning={data.assetClass.includes('Sub-Standard') || data.assetClass.includes('Watchlist')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ParamRow: React.FC<{ label: string; value: string; isConcerning?: boolean }> = ({ label, value, isConcerning }) => (
  <div className="flex flex-col">
    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight mb-0.5">{label}</span>
    <span className={`text-[11px] font-mono font-bold ${isConcerning ? 'text-rose-600' : 'text-slate-900'}`}>{value}</span>
  </div>
);

export default BureauSummary;
