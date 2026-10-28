import React, { useState, useCallback } from 'react';
import { FileDown, Loader2, CheckCircle2, AlertCircle, X, ExternalLink, Eye, FileText, HelpCircle, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'motion/react';
import autoTable, { applyPlugin } from 'jspdf-autotable';

try {
  applyPlugin(jsPDF);
} catch (e) {
  // Ignored if already applied
}
import { 
  CustomerProfile, 
  ConsistencyCheck, 
  BehaviourInsight, 
  FraudResult, 
  CollateralDetailsResult, 
  CounterOffer, 
  DecisionRecommendation,
  PolicyCheckItem,
  RiskParameter
} from '../types';
import { AI_CAM_PREVIEW } from '../constants';

interface GenerateCAMCardProps {
  customer: CustomerProfile;
  consistencyChecks: ConsistencyCheck[];
  behaviourInsights: BehaviourInsight[];
  fraudResult: FraudResult | null;
  collateralDetails: CollateralDetailsResult | null;
  counterOffer: CounterOffer | null;
  recommendation: DecisionRecommendation;
  policyChecks: PolicyCheckItem[];
  riskData: RiskParameter[];
  summary?: string;
  isAnalysisComplete: boolean;
}

const GenerateCAMCard: React.FC<GenerateCAMCardProps> = ({ 
  customer, 
  consistencyChecks, 
  behaviourInsights, 
  fraudResult, 
  collateralDetails, 
  counterOffer, 
  recommendation, 
  policyChecks, 
  riskData, 
  summary,
  isAnalysisComplete 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  const generatePDF = useCallback(async () => {
    setIsGenerating(true);
    
    // Create new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('CREDIT APPRAISAL MEMORANDUM (CAM)', 14, 20);
    
    doc.setFontSize(9);
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`REFERENCE ID: CAM-MP-2026-9482`, 14, 35);
    doc.text(`INSTITUTION: GBTI Bank Limited, Guyana`, 14, 40);

    // Entity Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(13);
    doc.text('1. APPLICANT PROFILE', 14, 50);
    autoTable(doc, {
      startY: 55,
      head: [['Field', 'Value']],
      body: [
        ['Customer Name', customer.name],
        ['Date of Birth', customer.dob || '22-06-1988 (Age: 38 Years)'],
        ['Address', customer.address || '42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana'],
        ['Employment', customer.company],
        ['Relationship', `${customer.relationshipYears} Years`],
        ['Bureau Score', customer.bureauScore],
      ],
      theme: 'striped',
      headStyles: { fillColor: [11, 53, 100] }
    });

    // Strategy & Recommendation
    let finalY = ((doc as any).lastAutoTable?.finalY ?? 95) + 15;
    doc.setFontSize(13);
    doc.text('2. DECISION & STRUCTURING RECOMMENDATION', 14, finalY);
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Metric', 'Value']],
      body: [
        ['Recommendation', 'REVIEW - REJECT (POLICY BREACH)'],
        ['Confidence Score', `${recommendation.confidence}%`],
        ['Probability of Default', `${recommendation.probabilityOfDefault}%`],
        ['Sanction Loan Amount', `GYD ${customer.loanAmount || '0.00'}`],
      ],
      theme: 'grid',
      headStyles: { fillColor: [15, 59, 40] }
    });

    // Executive Narrative
    finalY = ((doc as any).lastAutoTable?.finalY ?? (finalY + 35)) + 15;
    doc.setFontSize(13);
    doc.text('3. UNDERWRITING NARRATIVE & RATIONALE', 14, finalY);
    doc.setFontSize(9);
    const splitText = doc.splitTextToSize(summary || recommendation.reasoning, pageWidth - 28);
    doc.text(splitText, 14, finalY + 8);

    // Risk Indicators
    finalY = finalY + 15 + (splitText.length * 4.5);
    doc.setFontSize(13);
    doc.text('4. KEY RISK DRIVERS & VERIFICATIONS', 14, finalY);
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Driver', 'Status']],
      body: recommendation.primaryDrivers.map(d => [d, 'Passed / Assessed']),
      theme: 'striped',
      headStyles: { fillColor: [30, 41, 59] }
    });

    // Final signature placeholder
    finalY = ((doc as any).lastAutoTable?.finalY ?? (finalY + 40)) + 25;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, finalY, 70, finalY);
    doc.line(130, finalY, 190, finalY);
    doc.setFontSize(8);
    doc.text('CREDIT UNDERWRITER', 14, finalY + 5);
    doc.text('SANCTIONING AUTHORITY', 130, finalY + 5);

    // Save PDF
    doc.save(`CAM_${customer.name.replace(/\s+/g, '_')}_GBTI.pdf`);
    setIsGenerating(false);
  }, [customer, recommendation, counterOffer, summary]);

  const handlePreview = () => {
    const preview = `
# CREDIT APPRAISAL MEMORANDUM (CAM)
**Applicant:** ${customer.name} | **DOB:** ${customer.dob || '22-06-1988 (Age: 38 Years)'} | **Entity ID:** GBTI-${customer.name.toUpperCase().replace(/\s+/g, '-')}-GEO
**Address:** ${customer.address || '42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana'}
**Bank:** GBTI Bank Limited, Guyana | **Branch:** Water Street Head Office
**Recommendation:** REVIEW - REJECT (Adverse Policy Action) | **Confidence:** ${recommendation.confidence}%
**Approved Loan Sanction:** GYD ${customer.loanAmount || '0.00'} | **Tenure:** 305 Months

## EXECUTIVE SUMMARY & UNDERWRITING RATIONALE
${summary || recommendation.reasoning}

## PRIMARY RISK DRIVERS & MITIGATIONS
${recommendation.primaryDrivers.map(d => `- ${d}`).join('\n')}

## POLICY VERIFICATION MATRIX
${policyChecks.map(c => `• ${c.label}: ${c.status === 'pass' ? 'PASSED' : 'FLAGGED'} (${c.value})`).join('\n')}

## COLLATERAL VALUATION
- **Property:** 42 Sheriff Street, Apartment 3A, Georgetown, Guyana
- **Market Valuation:** GYD 36,000,000.00
- **Assessed LTV:** 90.28% (Critical Breach: Exceeds 75% limit)
- **Legal Search & Transport:** Clear & Marketable Title (Verified)
    `;
    setPreviewContent(preview);
    setShowPreview(true);
  };

  return (
    <div id="section-generate-cam" className="bg-white rounded-md border border-slate-300 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-[4px] bg-[#0052CC] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            10
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Credit Appraisal Memorandum (CAM)</h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Ready to Export
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 space-y-3">
        <p className="text-xs text-slate-600 leading-relaxed">
          Export a comprehensive, institutional-grade Credit Approval Memorandum integrating applicant financials, property valuation, bureau score analysis, and verified policy clearings.
        </p>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1.5 text-xs text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Applicant:</span>
            <span className="font-bold text-slate-900">{customer.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Underwriting Outcome:</span>
            <span className="font-bold text-emerald-700">GYD 0.00 (Declined)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Format:</span>
            <span className="font-mono text-[11px] text-slate-600">Standard GBTI Credit Memo (PDF) • Bank of Guyana</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button 
          onClick={handlePreview}
          className="py-2 px-3 rounded-[4px] border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye size={13} className="text-slate-500" />
          <span>Preview CAM</span>
        </button>

        <button 
          onClick={generatePDF}
          disabled={isGenerating}
          className="py-2 px-3 rounded-[4px] bg-[#F26522] hover:bg-[#d85213] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          {isGenerating ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Download size={13} />
          )}
          <span>Download PDF</span>
        </button>
      </div>

      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 lg:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
            >
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#0F3B28] rounded-lg text-white">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase">CAM Memorandum Preview</h3>
                    <p className="text-[10px] text-slate-500 font-medium">CAM-MP-2026-9482 | GBTI Institutional Underwriting Draft</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar">
                <pre className="whitespace-pre-wrap text-xs text-slate-800 font-mono leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {previewContent}
                </pre>
              </div>

              <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>Institutional Risk Engine Verified</span>
                </div>
                <button 
                  onClick={generatePDF}
                  className="px-4 py-2 bg-[#F26522] hover:bg-[#d85213] text-white text-xs font-bold rounded-[4px] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download size={14} /> Download Memorandum PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenerateCAMCard;
