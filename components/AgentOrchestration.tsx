import React from 'react';
import { OrchestrationState } from '../types';
import { Bot, CheckCircle2, Loader2, ArrowRight, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface AgentOrchestrationProps {
  orchestration: OrchestrationState;
  isAnalysisStarted?: boolean;
}

const getCategory = (name: string) => {
  const mapping: Record<string, string> = {
    'Collateral Agent': 'Asset Valuation',
    'Triangulation Agent': 'Data Integrity',
    'Behavioural Agent': 'Behavioural Risk',
    'AI Decision Recommendation Agent': 'Risk Modelling',
    'Fraud Agent': 'Compliance Risk',
    'Eligibility & Sanction Agent': 'Facility Structuring',
    'STP Decision Agent': 'Final Assessment',
    'Counter Offer Agent': 'Facility Structuring',
    'Approved Amount Agent': 'Final Assessment'
  };
  return mapping[name] || 'Risk Assessment';
};

const AgentOrchestration: React.FC<AgentOrchestrationProps> = ({ orchestration, isAnalysisStarted }) => {
  const completedCount = orchestration.agents.filter(a => a.status === 'completed').length;

  return (
    <div id="section-agent-orchestration" className="bg-white rounded-md border border-slate-300 shadow-xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            11
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Multi-Agent Orchestration</h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/70 px-2 py-0.5 rounded-full text-[10px] font-bold">
            <div className={`w-2 h-2 rounded-full ${isAnalysisStarted && !orchestration.isComplete ? 'bg-amber-500 animate-pulse' : orchestration.isComplete ? 'bg-emerald-500' : 'bg-emerald-400'}`} />
            <span>{orchestration.isComplete ? '7/7 Agents Synced' : isAnalysisStarted ? 'Executing Chain...' : 'Pipeline Synchronized'}</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Progress Pipeline */}
        <div className="relative px-2">
          {/* Connection Line */}
          <div className="absolute top-[28px] left-8 right-8 h-[2px] bg-slate-100 z-0">
            <div 
              className="h-full bg-[#0B3564] transition-all duration-700 ease-out"
              style={{ width: `${(completedCount / orchestration.agents.length) * 100}%` }}
            />
          </div>
          
          <div className="relative z-10 flex justify-between items-start gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {orchestration.agents.map((agent, i) => (
              <div key={i} className="flex flex-col items-center gap-2 shrink-0 min-w-[110px]">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                  agent.status === 'completed' ? 'border-emerald-500/60 bg-emerald-50/50 shadow-xs' :
                  agent.status === 'running' ? 'border-amber-400 bg-amber-50/50 shadow-md ring-2 ring-amber-300' :
                  'border-slate-200 bg-slate-50 opacity-60'
                }`}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                    {agent.status === 'completed' ? (
                      <CheckCircle2 size={20} className="text-emerald-600" />
                    ) : agent.status === 'running' ? (
                      <Loader2 size={20} className="text-amber-600 animate-spin" />
                    ) : (
                      <Bot size={20} className="text-slate-400" />
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <span className={`text-[11px] font-bold tracking-tight leading-tight ${
                    agent.status === 'pending' ? 'text-slate-400' : 'text-slate-800'
                  }`}>
                    {agent.agentName.replace(' Agent', '')}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400 mt-0.5">
                    {getCategory(agent.agentName)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[10px] text-slate-500 font-medium">Underwriting Rules: RBI / CAG Model Framework</span>
          <div className="flex items-center gap-1 text-[#0B3564] hover:underline cursor-pointer font-semibold text-[11px]">
            <span>View Execution Trace</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentOrchestration;
