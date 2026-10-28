import React from 'react';
import { Bot, CheckCircle2, AlertCircle, Info, Zap, Fingerprint, Activity, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const formatCurrency = (val: number) => {
  return `GYD ${val.toLocaleString()}`;
};

const FinSightAgentCard: React.FC = () => {
  return (
    <div className="bg-white rounded-md shadow-xs border border-slate-300 flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-200 bg-slate-100/80 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs shrink-0">
            3
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase mb-0.5">FinSight Agent</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none flex items-center gap-2">
              Identity Verification <ArrowRight size={8} /> <span className="text-[#0B3564] font-bold">All 18 Sources Verified</span>
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group cursor-pointer">
          <Zap size={13} className="text-[#0B3564] fill-[#0B3564] group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold text-[#0B3564] uppercase tracking-widest leading-none">Regenerate Analysis</span>
        </button>
      </div>

      <div className="p-8 space-y-12">
        {/* Section 1: Customer Demographics Comparison */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fingerprint className="text-indigo-400 w-4 h-4" />
              <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em]">Demographic Verification Comparison</h4>
            </div>
            <p className="text-[9px] text-gray-400 font-bold italic tracking-tight uppercase italic">Source: Unified Guyana KYC API Integration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-indigo-50 rounded-3xl overflow-hidden shadow-sm relative">
              <div className="px-5 py-3 bg-indigo-50/60 border-b border-indigo-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-indigo-950 uppercase tracking-widest">Self-Declared (Application)</span>
                <Info size={12} className="text-indigo-300" />
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: "Customer Name", value: "Marcus Anthony Persaud" },
                  { label: "Date of Birth", value: "22-06-1988 (38 Years)" },
                  { label: "Residential Address", value: "42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana" },
                  { label: "Gender", value: "Male" },
                  { label: "Phone & Email", value: "+592 624 8842 | marcus.persaud@gmail.com" }
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-1.5 px-1">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{row.label}</span>
                    <span className="text-[13px] font-bold text-indigo-950 tracking-tight">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-900 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/10 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] -mr-16 -mt-16" />
              <div className="px-5 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Bureau & Government Data (GECOM)</span>
                <CheckCircle2 size={12} className="text-emerald-400" />
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: "Customer Name", value: "Marcus Anthony Persaud" },
                  { label: "Date of Birth", value: "22-06-1988 (38 Years)" },
                  { label: "Residential Address", value: "42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana" },
                  { label: "Gender", value: "Male" },
                  { label: "Identity Hash", value: "GY-DEMO-884216" }
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-1.5 px-1">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{row.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-white tracking-tight">{row.value}</span>
                      <div className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/10 rounded text-[7px] font-black uppercase tracking-widest">Matched</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Income, Loans & EMI Comparison */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="text-indigo-400 w-4 h-4" />
              <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em]">Income & Liability Cross-Analysis</h4>
            </div>
            <p className="text-[9px] text-gray-400 font-bold italic tracking-tight uppercase italic">Dynamic Synthesis of Bank, Bureau & GRA Taxes</p>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Financial Parameter</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Declared Value</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Verified Result (AI)</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Observation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { label: "Net Monthly Income", declared: formatCurrency(1420000), verified: formatCurrency(1420000), status: "ACCURATE", color: "text-emerald-500" },
                  { label: "Total Active Loans", declared: "2", verified: "2", status: "VERIFIED", color: "text-emerald-500" },
                  { label: "Aggregate EMIs", declared: formatCurrency(261310), verified: formatCurrency(261310), status: "MATCHED", color: "text-emerald-500" },
                  { label: "Debt Serviceability (DBR)", declared: "18.39%", verified: "18.4%", status: "OPTIMAL", color: "text-indigo-500" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-black text-indigo-950 uppercase tracking-tight">{row.label}</span>
                        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Parameter ID: 00{i+1}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[12px] font-bold text-gray-600 text-center">{row.declared}</td>
                    <td className="px-8 py-5 text-[12px] font-black text-indigo-600 text-center">{row.verified}</td>
                    <td className="px-8 py-5 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black ${row.color} border border-current/20 uppercase tracking-widest`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Footer Insight Layer */}
      <div className="px-8 py-6 bg-indigo-50/50 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Confidence Score</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[94%]" />
              </div>
              <span className="text-[12px] font-black text-gray-900">94.2%</span>
            </div>
          </div>
          <div className="w-[1px] h-8 bg-gray-200" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Synthesis Speed</span>
            <span className="text-[12px] font-black text-gray-900">~1.2s Real-time</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-xl">
             <Layers size={16} className="text-indigo-600" />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-[140px] leading-tight">
            Multi-layer neural synthesis complete.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinSightAgentCard;
