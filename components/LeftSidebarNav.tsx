import React from 'react';
import { 
  UserCheck, 
  MapPin, 
  FileText, 
  Briefcase, 
  BrainCircuit, 
  Bot, 
  Home, 
  MessageSquare, 
  History, 
  FileDown, 
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface LeftSidebarNavProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenCAM?: () => void;
}

const LeftSidebarNav: React.FC<LeftSidebarNavProps> = ({ 
  activeSection, 
  onSelectSection,
  onOpenCAM 
}) => {
  const sections = [
    { id: 'applicant-kyc', num: '1', label: 'Applicant & KYC', badge: '6/6', icon: UserCheck, isComplete: true },
    { id: 'ai-recommendation', num: '2', label: 'AI Recommendation', badge: 'Approved', icon: BrainCircuit, isComplete: true },
    { id: 'property-location', num: '3', label: 'Property & Location', badge: '✓ GPS', icon: MapPin, isComplete: true },
    { id: 'credit-bureau', num: '4', label: 'Credit Bureau & Loans', badge: '3 Accs', icon: FileText, isComplete: true },
    { id: 'business-income', num: '5', label: 'Financing Summary', badge: 'GYD 32.5M', icon: Briefcase, isComplete: true },
    { id: 'decision-engine', num: '6', label: 'Default Risk & Policy', badge: 'Pass', icon: ShieldCheck, isComplete: true },
    { id: 'risk-analysis', num: '8', label: 'Risk Analysis & Parameters', badge: '21/21', icon: ShieldCheck, isComplete: true },
    { id: 'case-summarisation', num: '9', label: 'AI Case Summary & CAM', badge: 'Ready', icon: FileText, isComplete: true },
    { id: 'agent-orchestration', num: '11', label: 'Agent Orchestration', badge: '7 Agents', icon: Bot, isComplete: true },
  ];

  return (
    <aside className="w-60 shrink-0 bg-white rounded-xl border border-slate-200/90 shadow-sm p-3.5 flex flex-col justify-between h-fit sticky top-[138px]">
      <div className="space-y-4">
        {/* Navigation Header */}
        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2.5 block mb-2">
            ASSESSMENT SECTIONS
          </span>

          <nav className="space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;

              return (
                <button
                  key={sec.id}
                  onClick={() => onSelectSection(sec.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#F26522] text-white shadow-sm' 
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#0F3B28]/10 text-[#0F3B28]'
                    }`}>
                      {sec.num}
                    </span>
                    <span className="truncate">{sec.label}</span>
                  </div>

                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ml-1 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : sec.isComplete 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sec.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Tools */}
        <div className="pt-3 border-t border-slate-200/80">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2.5 block mb-2">
            QUICK TOOLS
          </span>

          <div className="space-y-1 text-xs">
            <button 
              onClick={onOpenCAM}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors font-medium text-left"
            >
              <FileDown size={13} className="text-emerald-600" />
              <span>CAM Memorandum</span>
            </button>

            <button 
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors font-medium text-left"
            >
              <History size={13} className="text-blue-600" />
              <span>Activity Log</span>
            </button>

            <button 
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors font-medium text-left"
            >
              <HelpCircle size={13} className="text-amber-600" />
              <span>Help & Underwriting Policy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Basel Status Badge */}
      <div className="mt-4 pt-3 border-t border-slate-200/80 bg-slate-50 p-2.5 rounded-lg text-center">
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-emerald-700">
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>Basel III Policy Engine</span>
        </div>
        <span className="text-[8px] text-slate-400 font-medium block mt-0.5">Rule v4.2 • Verified</span>
      </div>
    </aside>
  );
};

export default LeftSidebarNav;
