import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ApplicantKYCCard from './components/ApplicantKYCCard';
import PropertyLocationCard from './components/PropertyLocationCard';
import BureauSummary from './components/BureauSummary';
import FinancingSummary from './components/FinancingSummary';
import DecisionEngine from './components/DecisionEngine';
import RightPanel from './components/RightPanel';
import RiskAnalysisReport from './components/RiskAnalysisReport';
import CaseSummaryCard from './components/CaseSummaryCard';
import GenerateCAMCard from './components/GenerateCAMCard';
import AgentOrchestration from './components/AgentOrchestration';
import LiveEligibilityCard from './components/LiveEligibilityCard';
import AIRecommendation from './components/AIRecommendation';
import BehaviouralCard from './components/BehaviouralCard';
import CollateralCard from './components/CollateralCard';
import FraudAgentCard from './components/FraudAgentCard';
import ChatAssistant from './components/ChatAssistant';

import { 
  CUSTOMER_DATA, 
  RISK_TABLE_DATA, 
  POLICY_CHECKS, 
  REPORT_DATA, 
  DECISION_RECOMMENDATION, 
  COLLATERAL_DETAILS, 
  CONSISTENCY_CHECKS, 
  BEHAVIOUR_INSIGHTS, 
  FRAUD_RESULT, 
  COLLATERAL_RESULT, 
  COUNTER_OFFER, 
  BUREAU_SUMMARY_DATA, 
  FINANCING_SUMMARY_DATA, 
  AI_CASE_SUMMARY
} from './constants';
import { runAgent } from './services/geminiService';
import { 
  ConsistencyCheck, 
  BehaviourInsight, 
  CounterOffer, 
  OrchestrationState, 
  ReportMetric, 
  DecisionRecommendation, 
  PolicyCheckItem, 
  FraudResult, 
  CollateralDetailsResult 
} from './types';

function App() {
  const [reports, setReports] = useState<ReportMetric[]>(REPORT_DATA);
  const [consistencyChecks, setConsistencyChecks] = useState<ConsistencyCheck[]>(CONSISTENCY_CHECKS);
  const [behaviourInsights, setBehaviourInsights] = useState<BehaviourInsight[]>(BEHAVIOUR_INSIGHTS);
  const [recommendation, setRecommendation] = useState<DecisionRecommendation>(DECISION_RECOMMENDATION);
  const [fraudResult, setFraudResult] = useState<FraudResult | null>(FRAUD_RESULT);
  const [collateralDetails, setCollateralDetails] = useState<CollateralDetailsResult | null>(COLLATERAL_RESULT);
  const [policyChecks, setPolicyChecks] = useState<PolicyCheckItem[]>(POLICY_CHECKS);
  const [counterOffer, setCounterOffer] = useState<CounterOffer | null>(COUNTER_OFFER);
  const [approvedAmount, setApprovedAmount] = useState<string>("GYD 0.00");
  const [isAnalysisStarted, setIsAnalysisStarted] = useState(false);
  
  const [orchestration, setOrchestration] = useState<OrchestrationState>({
    agents: [
      { agentName: 'Collateral Agent', status: 'completed' },
      { agentName: 'Triangulation Agent', status: 'completed' },
      { agentName: 'Behavioural Agent', status: 'completed' },
      { agentName: 'AI Decision Recommendation Agent', status: 'completed' },
      { agentName: 'Fraud Agent', status: 'completed' },
      { agentName: 'Facility Structuring Agent', status: 'completed' },
      { agentName: 'STP Decision Agent', status: 'completed' },
    ],
    isComplete: true,
    consolidatedSummary: AI_CASE_SUMMARY.executiveSummary
  });

  useEffect(() => {
    if (!isAnalysisStarted) return;

    const executeNextAgent = async () => {
      const nextAgentIndex = orchestration.agents.findIndex(a => a.status === 'pending');
      if (nextAgentIndex === -1) {
        if (!orchestration.isComplete) {
          setOrchestration(prev => ({ ...prev, isComplete: true }));
        }
        return;
      }

      const agent = orchestration.agents[nextAgentIndex];
      
      setOrchestration(prev => ({
        ...prev,
        agents: prev.agents.map((a, i) => i === nextAgentIndex ? { ...a, status: 'running' } : a)
      }));

      const context = {
        customer: CUSTOMER_DATA,
        riskData: RISK_TABLE_DATA,
        collateral: COLLATERAL_DETAILS,
        previousResults: orchestration.agents.filter(a => a.status === 'completed').map(a => ({ name: a.agentName, output: a.output }))
      };

      const result = await runAgent(agent.agentName, context);

      if (agent.agentName === 'Collateral Agent') {
        setCollateralDetails(result);
        setReports(prev => prev.map(r => r.type === 'collateral' ? { ...r, points: result.confidence || r.points } : r));
      } else if (agent.agentName === 'Triangulation Agent') {
        setConsistencyChecks(result || []);
      } else if (agent.agentName === 'Behavioural Agent') {
        setBehaviourInsights(result || []);
      } else if (agent.agentName === 'AI Decision Recommendation Agent') {
        setRecommendation(prev => ({ ...prev, ...result }));
        if (result.riskPoints) {
          setReports(prev => prev.map(r => r.type === 'risk' ? { ...r, points: result.riskPoints } : r));
        }
      } else if (agent.agentName === 'Fraud Agent') {
        setFraudResult(result);
        if (result.status.toLowerCase().includes('high')) {
          setRecommendation(prev => ({ ...prev, decision: 'DECLINE', reasoning: `Fraud Alert: ${result.alerts[0] || 'High risk detected'}. ${prev.reasoning}` }));
        }
      } else if (agent.agentName === 'Facility Structuring Agent' || agent.agentName === 'Counter Offer Agent') {
        setCounterOffer(result);
      } else if (agent.agentName === 'STP Decision Agent' || agent.agentName === 'Approved Amount Agent') {
        setApprovedAmount(result.approvedAmount || "GYD 0.00");
        setOrchestration(prev => ({ ...prev, consolidatedSummary: result.summary || "" }));
      }

      setOrchestration(prev => ({
        ...prev,
        agents: prev.agents.map((a, i) => i === nextAgentIndex ? { ...a, status: 'completed', output: result } : a)
      }));
    };

    const timer = setTimeout(executeNextAgent, 800);
    return () => clearTimeout(timer);
  }, [orchestration, isAnalysisStarted]);

  const handleStartAnalysis = () => {
    setOrchestration(prev => ({
      ...prev,
      agents: prev.agents.map(a => ({ ...a, status: 'pending' })),
      isComplete: false
    }));
    setIsAnalysisStarted(true);
  };

  const recommendationAgent = orchestration.agents.find(a => a.agentName === 'AI Decision Recommendation Agent');
  const status = recommendationAgent?.status || 'pending';
  const isComplete = orchestration.isComplete;
  const isCached = !isComplete;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] text-slate-900 font-sans antialiased selection:bg-[#F26522] selection:text-white">
      {/* Top Multi-Bar Header */}
      <Header 
        customer={CUSTOMER_DATA} 
        approvedAmount={approvedAmount}
        recommendation={recommendation}
        onStartAnalysis={handleStartAnalysis}
        isAnalysisStarted={isAnalysisStarted}
        isAnalysisComplete={isComplete}
      />
      
      {/* Newgen Workitem Tab Navigation */}
      <div className="bg-[#EBECEF] border-b border-[#CBD5E1]">
        <div className="w-full px-4 lg:px-6 pt-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button 
              className="px-3.5 py-1.5 text-xs font-bold rounded-t-[2px] border-t border-l border-r border-[#CBD5E1] border-t-2 border-t-[#F26522] border-b-2 border-b-white bg-white text-[#F26522] -mb-[1px] flex items-center gap-1.5"
            >
              <span>Primary Underwriting File</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs pb-1">
            <span className="text-slate-500 hidden sm:inline">Entity: <strong className="text-slate-800 font-semibold">{CUSTOMER_DATA.name}</strong></span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">File: <strong className="font-mono text-slate-800">GBTI-GEO-2026-889</strong></span>
          </div>
        </div>
      </div>

      {/* Master Workspace */}
      <main className="flex-1 w-full px-4 lg:px-6 py-3 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-[1720px] mx-auto space-y-3.5">
              {/* 1 & 2. Applicant & KYC Profile and AI Decision Recommendation (2-Column Grid) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ApplicantKYCCard customer={CUSTOMER_DATA} />
                <AIRecommendation recommendation={recommendation} status={status} />
              </div>

              {/* 3. Property & Collateral Location */}
              <PropertyLocationCard />

              {/* 4 & 5. Bureau & Financing Summary Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <BureauSummary data={BUREAU_SUMMARY_DATA} />
                <FinancingSummary data={FINANCING_SUMMARY_DATA} counterOffer={counterOffer} />
              </div>

              {/* 6 & 7. Decision Engine & Policy Matrix Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DecisionEngine recommendation={recommendation} />
                <RightPanel checks={policyChecks} />
              </div>

              {/* 8. Risk Analysis Report */}
              <div className="w-full">
                <RiskAnalysisReport riskData={RISK_TABLE_DATA} />
              </div>

              {/* 9 & 10. AI Case Summarization & Generate CAM Card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CaseSummaryCard 
                  summary={orchestration.consolidatedSummary}
                  isGenerating={orchestration.agents.some(a => a.status === 'running')}
                />
                <GenerateCAMCard 
                  customer={CUSTOMER_DATA}
                  consistencyChecks={consistencyChecks}
                  behaviourInsights={behaviourInsights}
                  fraudResult={fraudResult}
                  collateralDetails={collateralDetails}
                  counterOffer={counterOffer}
                  recommendation={recommendation}
                  policyChecks={policyChecks}
                  riskData={RISK_TABLE_DATA}
                  summary={orchestration.consolidatedSummary}
                  isAnalysisComplete={orchestration.isComplete}
                />
              </div>

              {/* 11. Multi-Agent Orchestration Pipeline & Telemetry */}
              <AgentOrchestration orchestration={orchestration} isAnalysisStarted={isAnalysisStarted} />

              {/* 12, 13, 14. Multi-Agent Deep-Dive Audit Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BehaviouralCard 
                  insights={behaviourInsights} 
                  isCached={isCached} 
                  isRunning={orchestration.agents.find(a => a.agentName === 'Behavioural Agent')?.status === 'running'} 
                />
                <FraudAgentCard 
                  result={fraudResult} 
                  isCached={isCached} 
                  isRunning={orchestration.agents.find(a => a.agentName === 'Fraud Agent')?.status === 'running'} 
                />
                <CollateralCard 
                  details={collateralDetails} 
                  isCached={isCached} 
                  isRunning={orchestration.agents.find(a => a.agentName === 'Collateral Agent')?.status === 'running'} 
                />
              </div>

              {/* 15. Facility Capacity & Sanction (Moved to End of the Page) */}
              <div className="w-full">
                <LiveEligibilityCard 
                  counterOffer={counterOffer}
                  onAmountChange={(amt) => setApprovedAmount(amt)}
                />
              </div>

        </div>
      </main>

      {/* Floating AI Underwriting Assistant */}
      <ChatAssistant orchestration={orchestration} />
      
      {/* Status Footer */}
      <footer className="bg-slate-900 text-slate-400 px-4 lg:px-6 py-2.5 border-t border-slate-800">
        <div className="w-full flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-300">SYSTEM: ALL AGENTS OPERATIONAL</span>
            </div>
            <span className="text-slate-500">Telemetry: Latency 18ms</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-300">BANK OF GUYANA & AML/CFT COMPLIANT</span>
            <span className="text-slate-600">|</span>
            <span>© 2026 GBTI Bank Underwriting 360</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
