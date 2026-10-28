import React, { useState } from "react";
import { CustomerProfile, DocumentAttachment } from "../types";
import { ATTACHED_DOCUMENTS } from "../constants";
import { 
  User, 
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  Calendar, 
  Briefcase, 
  MapPin, 
  ShieldCheck, 
  FileText,
  BadgeCheck,
  UserCheck,
  ExternalLink,
  X,
  FileCheck,
  Building,
  Check,
  AlertCircle,
  Upload,
  Eye,
  Download,
  AlertTriangle,
  FolderOpen,
  Printer,
  QrCode
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ApplicantKYCCardProps {
  customer: CustomerProfile;
}

export const GUYANA_REGIONS = [
  "Demerara-Mahaica (Georgetown / Region 4)",
  "Barima-Waini (Region 1)",
  "Pomeroon-Supenaam (Region 2)",
  "Essequibo Islands-West Demerara (Region 3)",
  "Mahaica-Berbice (Region 5)",
  "East Berbice-Corentyne (Region 6)",
  "Cuyuni-Mazaruni (Region 7)",
  "Potaro-Siparuni (Region 8)",
  "Upper Takutu-Upper Essequibo (Region 9)",
  "Upper Demerara-Berbice (Region 10)"
];

export const GBTI_BRANCHES = [
  "GBTI Water Street Head Office",
  "GBTI Regent Street, Georgetown",
  "GBTI Diamond, East Bank Demerara",
  "GBTI Providence, East Bank Demerara",
  "GBTI Parika, East Bank Essequibo",
  "GBTI New Amsterdam, Berbice",
  "GBTI Anna Regina, Essequibo Coast",
  "GBTI Corriverton, Berbice",
  "GBTI Lethem, Region 9"
];

const ApplicantKYCCard: React.FC<ApplicantKYCCardProps> = ({ customer }) => {
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"identity" | "address" | "documents" | "employment" | "compliance">("identity");
  
  // Document preview state
  const [previewDoc, setPreviewDoc] = useState<DocumentAttachment | null>(null);
  
  // Localized form state for Marcus Anthony Persaud - Reject Case
  const [kycData, setKycData] = useState({
    title: "Mr.",
    firstName: "Marcus",
    middleName: "Anthony",
    lastName: "Persaud",
    fullName: "Marcus Anthony Persaud",
    customerType: "ETB",
    nationalId: "GY-DEMO-884216",
    dob: "22-06-1988",
    age: "38 Years",
    gender: "Male",
    fatherName: "Daniel Persaud",
    motherName: "Anita Persaud",
    maritalStatus: "Married",
    mobileNumber: "5926517394",
    qualification: "Post Graduate",
    nationality: "Guyanese",
    residenceStatus: "Fully Owned",
    periodOfStay: "9",
    noOfDependents: "3",
    email: "marcus.persaud@gmail.com",
    pastRejected12Months: "0",
    // Address Details
    addressLine1: "42 Sheriff Street",
    addressLine2: "Apartment 3A",
    postalCode: "N/A",
    city: "Georgetown",
    parish: "Demerara-Mahaica",
    country: "Guyana",
    // Employment & Financials
    employer: customer.company || "Demerara Distillers Limited (DDL)",
    designation: customer.designation || "Operations Manager",
    monthlyGrossIncome: "GYD 620,000.00",
    monthlyNetPay: "GYD 485,000.00",
    monthlyExpenses: "GYD 210,000.00",
    existingLiabilities: "GYD 14,850,000.00",
    gbtiBranch: "GBTI Water Street Head Office",
    graTin: "108-421-992",
    nisNumber: "B-884216-9",
    passportNumber: "GY-P 884216",
    pepStatus: "Non-PEP (Standard Retail Risk)",
    fiuScreening: "Clean • 0 Matches on FIU Guyana & UN Sanctions Database",
    bureauScore: "598 (Subprime Grade C)",
  });

  const [documents, setDocuments] = useState<DocumentAttachment[]>(ATTACHED_DOCUMENTS);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsDossierOpen(false);
    }, 1200);
  };

  const handleSimulateUpload = (docName: string) => {
    setUploadNotice(`Re-uploaded / verified: ${docName}`);
    setTimeout(() => setUploadNotice(null), 3000);
  };

  // Dedicated real PDF download handler
  const handleDownloadDocument = (doc: DocumentAttachment) => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Header Banner
      pdf.setFillColor(11, 53, 100);
      pdf.rect(0, 0, pageWidth, 28, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(doc.name.toUpperCase(), 14, 13);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.text("GBTI Bank Guyana Underwriting 360 • Official Workitem Attachment", 14, 21);

      // Status Badge
      pdf.setFillColor(242, 101, 34);
      pdf.rect(pageWidth - 62, 8, 48, 12, "F");
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "bold");
      pdf.text("VERIFIED COMPLIANT", pageWidth - 58, 16);

      // Meta Table
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("1. DOCUMENT METADATA", 14, 40);

      autoTable(pdf, {
        startY: 44,
        head: [["Field", "Details"]],
        body: [
          ["Document Name", doc.name],
          ["Applicant Name", kycData.fullName],
          ["National ID", kycData.nationalId],
          ["Address", `${kycData.addressLine1}, ${kycData.addressLine2}, ${kycData.city}, ${kycData.parish}, ${kycData.country}`],
          ["Mobile Number", kycData.mobileNumber],
          ["Category", doc.category],
          ["Upload & Verification Date", doc.uploadDate],
          ["File Format & Size", `${doc.type} (${doc.size})`],
          ["Verification Status", "Successfully Attached & Validated against Guyana Registries"]
        ],
        theme: "striped",
        headStyles: { fillColor: [11, 53, 100] }
      });

      let finalY = ((pdf as any).lastAutoTable?.finalY ?? 100) + 12;

      // Document Specific Details
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("2. EXTRACTED UTILITY / IDENTITY DATA", 14, finalY);

      let detailRows: string[][] = [];
      if (doc.name.includes("Water Bill")) {
        detailRows = [
          ["Utility Provider", "Guyana Water Incorporated (GWI)"],
          ["Account / Service No.", "GWI-WAT-8842-16"],
          ["Meter Serial", "MTR-GWI-09412"],
          ["Service Address", "42 Sheriff Street, Apartment 3A, Georgetown, Guyana"],
          ["Billing Period", "01 Sep 2026 – 30 Sep 2026"],
          ["Consumption", "28 m³ (Metered Residential)"],
          ["Total Billed Amount", "GYD 14,850.00"],
          ["Payment Status", "PAID IN FULL • GWI Ref: TX-99214"]
        ];
      } else if (doc.name.includes("Utility Bill")) {
        detailRows = [
          ["Utility Provider", "Guyana Power & Light Inc. (GPL)"],
          ["Account No.", "GPL-ACC-4209-881"],
          ["Meter Serial", "GPL-ELEC-77192"],
          ["Premises Location", "42 Sheriff Street, Apartment 3A, Georgetown, Guyana"],
          ["Billing Cycle", "10 Sep 2026 – 10 Oct 2026"],
          ["Energy Units", "480 kWh Billed"],
          ["Net Amount Payable", "GYD 28,450.00"],
          ["Payment Status", "SETTLED • Automated Bank Remittance Verified"]
        ];
      } else if (doc.name.includes("National ID")) {
        detailRows = [
          ["Issuing Authority", "Republic of Guyana Elections Commission (GECOM)"],
          ["National ID Number", "GY-DEMO-884216"],
          ["Holder Full Name", "Marcus Anthony Persaud"],
          ["Date of Birth", "22-06-1988 (Age: 38 Years)"],
          ["Gender", "Male"],
          ["Nationality", "Guyanese (Citizen by Birth)"],
          ["Registered Address", "42 Sheriff Street, Apartment 3A, Georgetown, Guyana"],
          ["Validation", "Active & Valid in National Register of Registrants"]
        ];
      } else {
        detailRows = [
          ["Issuing Body", "Guyana Revenue Authority (GRA)"],
          ["TIN Number", "108-421-992"],
          ["Taxpayer Name", "Marcus Anthony Persaud"],
          ["Registered Address", "42 Sheriff Street, Georgetown, Demerara-Mahaica"],
          ["Filing Standing", "Compliant • Individual Form 7B Active"]
        ];
      }

      autoTable(pdf, {
        startY: finalY + 4,
        head: [["Attribute", "Verification Record"]],
        body: detailRows,
        theme: "grid",
        headStyles: { fillColor: [15, 59, 40] }
      });

      // Verification Footnote & Signoff
      finalY = ((pdf as any).lastAutoTable?.finalY ?? 170) + 20;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(14, finalY, 80, finalY);
      pdf.line(pageWidth - 80, finalY, pageWidth - 14, finalY);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.text("KYC VERIFICATION OFFICER", 14, finalY + 5);
      pdf.text("GBTI COMPLIANCE DESK", pageWidth - 80, finalY + 5);

      const filename = `${doc.name.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation error, fallback to text download:", err);
      const blob = new Blob([
        `GBTI BANK GUYANA - DOCUMENT ATTACHMENT

Document: ${doc.name}
Applicant: ${kycData.fullName}
National ID: ${kycData.nationalId}
Address: ${kycData.addressLine1}, ${kycData.addressLine2}, ${kycData.city}, ${kycData.parish}, ${kycData.country}
Mobile: ${kycData.mobileNumber}
Status: ${doc.status} • Verified
Date: ${doc.uploadDate}`
      ], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${doc.name.replace(/[^a-zA-Z0-9_-]/g, "_")}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div id="section-applicant-kyc" className="bg-white rounded-[2px] border border-slate-300 shadow-2xs overflow-hidden flex flex-col font-sans">
        {/* Section Header */}
        <div className="px-3.5 py-2 bg-slate-100/90 border-b border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-[2px] bg-[#F26522] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
              1
            </div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Applicant & KYC Details</h3>
              <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDossierOpen(true)}
              className="text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-[2px] flex items-center gap-1 transition-colors cursor-pointer"
              title="Click to view complete GBTI Bank KYC Dossier"
            >
              <CheckCircle2 size={11} className="text-emerald-600" />
              KYC Dossier Verified
            </button>
            <span className="hidden sm:inline text-[10px] text-slate-500 font-medium">
              Sourcing: GBTI Retail • Georgetown
            </span>
          </div>
        </div>

        {/* Main Applicant Grid */}
        <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
          {/* Applicant Card Tile */}
          <div className="bg-slate-50 p-3 rounded-[2px] border border-slate-200 space-y-2.5">
            {/* User Identity */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-[2px] bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 shrink-0">
                <User size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                    {kycData.title} {kycData.fullName}
                  </h4>
                  <span className="text-[9px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded-[2px]">
                    {kycData.customerType} Customer
                  </span>
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-[2px] flex items-center gap-0.5">
                    <BadgeCheck size={10} /> ID Verified
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium truncate">
                  National ID: <strong className="font-mono text-slate-800">{kycData.nationalId}</strong> • {kycData.nationality}
                </span>
                <span className="text-[11px] text-[#0B3564] font-semibold truncate">
                  {kycData.employer} ({kycData.designation})
                </span>
              </div>
            </div>

            {/* Core Info 2x2 Grid: Date of Birth, Mobile Number, Residence Status, Past Rejections */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-200/80">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">DATE OF BIRTH & AGE</span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5">{kycData.dob} ({kycData.age})</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">MOBILE NUMBER</span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5 font-mono">{kycData.mobileNumber}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">RESIDENCE STATUS</span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5">{kycData.residenceStatus} ({kycData.periodOfStay} Yrs Stay)</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">PAST REJECTIONS (12M)</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-bold text-emerald-700">{kycData.pastRejected12Months}</span>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">No Past Rejections</span>
                </div>
              </div>
            </div>

            {/* Address Details Line */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] text-slate-600">
              <MapPin size={12} className="text-slate-400 shrink-0" />
              <span className="font-medium shrink-0">Permanent Address:</span>
              <span className="font-semibold text-slate-800 truncate" title={`${kycData.addressLine1}, ${kycData.addressLine2}, ${kycData.city}, ${kycData.parish}, ${kycData.country}`}>
                {kycData.addressLine1}, {kycData.addressLine2}, {kycData.city}, {kycData.parish}, {kycData.country}
              </span>
            </div>
          </div>

          {/* Verification Badges Row - Documents Attachments Display with Preview & Download */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                VERIFICATION & ATTACHED DOCUMENTS ({documents.length})
              </span>
              <button 
                onClick={() => { setActiveTab("documents"); setIsDossierOpen(true); }}
                className="text-[10px] font-bold text-[#0B3564] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                View All Attachments ({documents.length}) <ExternalLink size={10} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {documents.map((doc) => {
                const isWater = doc.name.includes("Water");
                const isUtil = doc.name.includes("Utility");
                const isNIC = doc.name.includes("National ID") || doc.name.includes("NIC");

                return (
                  <div 
                    key={doc.id}
                    className="flex items-center justify-between p-2 rounded-[2px] bg-white border border-slate-300 shadow-2xs hover:border-[#F26522] transition-colors"
                  >
                    <div 
                      onClick={() => setPreviewDoc(doc)}
                      className="flex items-center gap-2 min-w-0 cursor-pointer flex-1"
                      title={`Click to preview ${doc.name}`}
                    >
                      <FileText size={14} className={isWater ? "text-cyan-600 shrink-0" : isUtil ? "text-amber-600 shrink-0" : isNIC ? "text-blue-600 shrink-0" : "text-emerald-600 shrink-0"} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase truncate">
                          {isWater ? "Water Bill" : isUtil ? "Utility Bill" : isNIC ? "National ID (NIC)" : doc.category}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-800 truncate" title={doc.name}>
                          {doc.name}
                        </span>
                      </div>
                    </div>

                    {/* Preview & Download Quick Actions */}
                    <div className="flex items-center gap-1 shrink-0 ml-1.5">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setPreviewDoc(doc); }}
                        title="Preview Document within Application"
                        className="p-1 rounded-[2px] text-slate-500 hover:text-[#0B3564] hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
                      >
                        <Eye size={12} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDownloadDocument(doc); }}
                        title="Download Document"
                        className="p-1 rounded-[2px] text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer border border-slate-200"
                      >
                        <Download size={12} />
                      </button>
                      <CheckCircle2 size={12} className="text-emerald-600 ml-0.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* IN-APP DOCUMENT PREVIEW MODAL */}
      <AnimatePresence>
        {previewDoc && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewDoc(null)}
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl max-h-[88vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-300"
            >
              {/* Preview Header */}
              <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-emerald-400">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold tracking-tight text-white truncate">{previewDoc.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-300">
                      <span>{previewDoc.category}</span>
                      <span>•</span>
                      <span>Format: {previewDoc.type} ({previewDoc.size})</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                        <CheckCircle2 size={10} /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDownloadDocument(previewDoc)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F26522] hover:bg-[#d85213] text-white text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </button>
                  <button 
                    onClick={() => setPreviewDoc(null)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Realistic Document Render Canvas */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-slate-100 flex justify-center">
                <div className="w-full max-w-xl bg-white shadow-md border border-slate-300 p-6 rounded-[2px] font-sans text-slate-900 space-y-4">
                  {/* WATER BILL PREVIEW */}
                  {previewDoc.name.includes("Water") && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-cyan-700 pb-3 flex items-start justify-between">
                        <div>
                          <h2 className="text-base font-black text-cyan-900 uppercase tracking-tight">GUYANA WATER INCORPORATED (GWI)</h2>
                          <p className="text-[10px] text-cyan-700 font-medium">Head Office: Vlissengen Road & Church Street, Bel Air Park, Georgetown, Guyana</p>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5">Customer Care: +592 227 8701 • Web: www.gwi.gy</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded">
                            WATER SERVICE BILL
                          </span>
                          <p className="text-[10px] font-mono font-bold text-slate-700 mt-1">Ref: GWI-INV-2026-884216</p>
                        </div>
                      </div>

                      {/* Customer / Service Meta Grid */}
                      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded text-xs">
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Customer Name</span>
                          <span className="font-bold text-slate-900">{kycData.fullName}</span>
                          <span className="text-[10px] text-slate-500 block font-mono">National ID: {kycData.nationalId}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Account & Meter</span>
                          <span className="font-mono font-bold text-slate-900">ACC: GWI-WAT-8842-16</span>
                          <span className="text-[10px] text-slate-600 block font-mono">Meter No: MTR-GWI-09412</span>
                        </div>
                        <div className="col-span-2 pt-1 border-t border-slate-200">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Service Address (Verified Permanent Residence)</span>
                          <span className="font-semibold text-slate-800">42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana</span>
                        </div>
                      </div>

                      {/* Billing Breakdown */}
                      <div className="border border-slate-200 rounded overflow-hidden text-xs">
                        <div className="bg-slate-100 font-bold px-3 py-1.5 border-b border-slate-200 flex justify-between text-[10px] uppercase text-slate-600">
                          <span>Billing Item</span>
                          <span>Details / Amount</span>
                        </div>
                        <div className="p-3 space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Billing Period:</span>
                            <span className="font-mono font-medium">01 Sep 2026 – 30 Sep 2026</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Meter Reading (Previous → Current):</span>
                            <span className="font-mono font-medium">1,392 m³ → 1,420 m³ (28 m³)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Standard Domestic Water Tariff:</span>
                            <span className="font-mono">GYD 12,400.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Sewerage / Environmental Levy:</span>
                            <span className="font-mono">GYD 2,450.00</span>
                          </div>
                          <div className="flex justify-between font-bold text-sm pt-2 border-t border-slate-200">
                            <span className="text-slate-900">Total Current Charges:</span>
                            <span className="font-mono text-cyan-900">GYD 14,850.00</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment & GBTI Stamp */}
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            <span>OFFICIAL PAYMENT RECEIPT • PAID IN FULL</span>
                          </div>
                          <p className="text-[10px] text-emerald-900 mt-0.5 font-mono">
                            Txn Ref: GWI-TX-99214 • Bank Remittance Cleared
                          </p>
                        </div>
                        <div className="px-2 py-1 bg-white border border-emerald-300 rounded text-center">
                          <span className="text-[8px] font-black uppercase text-emerald-800 block">GBTI AUDIT</span>
                          <span className="text-[9px] font-bold text-emerald-700">VERIFIED</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UTILITY BILL PREVIEW (GPL ELECTRICITY) */}
                  {previewDoc.name.includes("Utility") && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-amber-600 pb-3 flex items-start justify-between">
                        <div>
                          <h2 className="text-base font-black text-amber-900 uppercase tracking-tight">GUYANA POWER & LIGHT INC. (GPL)</h2>
                          <p className="text-[10px] text-amber-800 font-medium">Main Office: 40 Main Street, Georgetown, Guyana</p>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5">Emergency & Inquiries: +592 226 2600 • www.gplinc.com</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded">
                            ELECTRICITY STATEMENT
                          </span>
                          <p className="text-[10px] font-mono font-bold text-slate-700 mt-1">GPL-ACC-4209-881</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded text-xs">
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Account Holder</span>
                          <span className="font-bold text-slate-900">{kycData.fullName}</span>
                          <span className="text-[10px] text-slate-500 block font-mono">Phone: {kycData.mobileNumber}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Meter Information</span>
                          <span className="font-mono font-bold text-slate-900">MTR-GPL-77192</span>
                          <span className="text-[10px] text-slate-600 block">Tariff: Residential B1</span>
                        </div>
                        <div className="col-span-2 pt-1 border-t border-slate-200">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Premises Address (Proof of Residence)</span>
                          <span className="font-semibold text-slate-800">42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana</span>
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded overflow-hidden text-xs">
                        <div className="bg-slate-100 font-bold px-3 py-1.5 border-b border-slate-200 flex justify-between text-[10px] uppercase text-slate-600">
                          <span>Billing Parameters</span>
                          <span>Value</span>
                        </div>
                        <div className="p-3 space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Billing Cycle:</span>
                            <span className="font-mono font-medium">10 Sep 2026 – 10 Oct 2026</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Electricity Units Billed:</span>
                            <span className="font-mono font-medium">480 kWh</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Energy Charges:</span>
                            <span className="font-mono">GYD 24,150.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Fuel Surcharge & Regulatory Fee:</span>
                            <span className="font-mono">GYD 4,300.00</span>
                          </div>
                          <div className="flex justify-between font-bold text-sm pt-2 border-t border-slate-200">
                            <span className="text-slate-900">Net Amount Due:</span>
                            <span className="font-mono text-amber-900">GYD 28,450.00</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            <span>PAYMENT RECEIVED • ACCOUNT IN GOOD STANDING</span>
                          </div>
                          <p className="text-[10px] text-emerald-900 mt-0.5 font-mono">
                            Auto-Debit Transaction #8842-GPL-PAY • No Arrears
                          </p>
                        </div>
                        <div className="px-2 py-1 bg-white border border-emerald-300 rounded text-center">
                          <span className="text-[8px] font-black uppercase text-emerald-800 block">GBTI KYC</span>
                          <span className="text-[9px] font-bold text-emerald-700">ACCEPTED</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NATIONAL ID PREVIEW */}
                  {previewDoc.name.includes("National ID") && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-blue-800 pb-3 flex items-start justify-between">
                        <div>
                          <h2 className="text-base font-black text-blue-900 uppercase tracking-tight">REPUBLIC OF GUYANA</h2>
                          <p className="text-xs font-bold text-slate-800 uppercase">ELECTIONS COMMISSION (GECOM)</p>
                          <p className="text-[10px] text-slate-500 font-medium">National Register of Registrants • National Identification Card</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-mono font-black text-blue-800 bg-blue-50 border border-blue-300 px-2 py-1 rounded">
                            {kycData.nationalId}
                          </span>
                        </div>
                      </div>

                      <div className="border-2 border-blue-200 rounded-lg p-4 bg-linear-to-br from-blue-50/40 to-slate-50 relative overflow-hidden">
                        <div className="grid grid-cols-3 gap-3 items-center">
                          <div className="col-span-1 flex flex-col items-center justify-center p-3 bg-white border border-slate-300 rounded text-slate-400">
                            <User size={48} className="text-slate-600" />
                            <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase">Official Photo</span>
                          </div>
                          <div className="col-span-2 space-y-1.5 text-xs">
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Full Name</span>
                              <p className="font-black text-slate-900 text-sm tracking-tight">{kycData.fullName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Date of Birth</span>
                                <p className="font-bold text-slate-800">{kycData.dob}</p>
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Gender</span>
                                <p className="font-bold text-slate-800">{kycData.gender}</p>
                              </div>
                            </div>
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Nationality</span>
                              <p className="font-semibold text-slate-800">{kycData.nationality}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Residential Address</span>
                              <p className="font-semibold text-slate-800 text-[11px]">42 Sheriff Street, Georgetown, Guyana</p>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer Barcode & Security MRZ */}
                        <div className="mt-4 pt-3 border-t border-slate-300 font-mono text-[9px] text-slate-600 flex justify-between items-center">
                          <span>IDGYD{kycData.nationalId.replace(/-/g, "")}PERSAUD&lt;&lt;MARCUS&lt;ANTHONY&lt;&lt;&lt;</span>
                          <span className="text-[8px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                            GECOM BIOMETRIC VALID
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                        <span className="font-bold text-slate-800">Verification Certificate:</span>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          The National Identification Card #<strong>{kycData.nationalId}</strong> was validated directly via the GECOM Electoral Register API and verified for Marcus Anthony Persaud.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* GRA TIN PREVIEW */}
                  {previewDoc.name.includes("GRA") && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-emerald-700 pb-3 flex items-start justify-between">
                        <div>
                          <h2 className="text-base font-black text-emerald-900 uppercase tracking-tight">GUYANA REVENUE AUTHORITY (GRA)</h2>
                          <p className="text-[10px] text-slate-600 font-medium">Tax Operations Department • 200-201 Camp Street, Georgetown, Guyana</p>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5">Official Taxpayer Registration Record</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                            TIN CERTIFICATE
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded text-xs space-y-2.5">
                        <div className="flex justify-between items-center pb-2 border-b border-emerald-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Tax Identification Number</span>
                          <span className="text-sm font-mono font-black text-emerald-950">{kycData.graTin}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[9px] font-bold text-slate-500 uppercase block">Taxpayer Name</span>
                            <span className="font-bold text-slate-900">{kycData.fullName}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-500 uppercase block">Associated National ID</span>
                            <span className="font-mono font-bold text-slate-800">{kycData.nationalId}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-500 uppercase block">Registered Tax Address</span>
                          <span className="font-medium text-slate-800">42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana</span>
                        </div>
                        <div className="flex justify-between text-[11px] pt-1">
                          <span className="text-slate-600">Tax Compliance Standing:</span>
                          <span className="font-bold text-emerald-700">IN GOOD STANDING (Current)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generic Fallback Preview */}
                  {!previewDoc.name.includes("Water") && !previewDoc.name.includes("Utility") && !previewDoc.name.includes("National ID") && !previewDoc.name.includes("GRA") && (
                    <div className="space-y-4">
                      <div className="border-b pb-3">
                        <h2 className="text-base font-bold text-slate-900">{previewDoc.name}</h2>
                        <p className="text-xs text-slate-500">{previewDoc.category} • Attached to Application GBTI-GEO-2026-889</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
                        <p><strong>Applicant:</strong> {kycData.fullName}</p>
                        <p><strong>National ID:</strong> {kycData.nationalId}</p>
                        <p><strong>Address:</strong> 42 Sheriff Street, Georgetown, Guyana</p>
                        <p><strong>Status:</strong> {previewDoc.status} • Verified</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Footer */}
              <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Official GBTI Underwriting Document Verification Record
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDownloadDocument(previewDoc)}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-[#F26522] hover:bg-[#d85213] text-white text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download File ({previewDoc.type})</span>
                  </button>
                  <button 
                    onClick={() => setPreviewDoc(null)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Comprehensive GBTI Bank KYC Dossier Modal */}
      <AnimatePresence>
        {isDossierOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDossierOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B3564] text-white flex items-center justify-center font-black shadow-sm shrink-0">
                    <ShieldCheck size={22} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">GBTI Bank • Applicant Profile & KYC Dossier</h3>
                      <span className="text-[9px] font-bold bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded-full">
                        Customer: ETB
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Guyana Bank for Trade and Industry • File: GBTI-GEO-2026-889 • National ID: {kycData.nationalId}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsDossierOpen(false)}
                  className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Navigation Tabs */}
              <div className="px-6 bg-white border-b border-slate-200 flex items-center gap-4 text-xs font-bold overflow-x-auto custom-scrollbar shrink-0">
                <button
                  onClick={() => setActiveTab("identity")}
                  className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === "identity" 
                      ? "text-[#0B3564] border-[#0B3564]" 
                      : "text-slate-500 border-transparent hover:text-slate-800"
                  }`}
                >
                  1. Applicant Details
                </button>
                <button
                  onClick={() => setActiveTab("address")}
                  className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === "address" 
                      ? "text-[#0B3564] border-[#0B3564]" 
                      : "text-slate-500 border-transparent hover:text-slate-800"
                  }`}
                >
                  2. Address Details
                </button>
                <button
                  onClick={() => setActiveTab("documents")}
                  className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === "documents" 
                      ? "text-[#0B3564] border-[#0B3564]" 
                      : "text-slate-500 border-transparent hover:text-slate-800"
                  }`}
                >
                  3. Document Attachments ({documents.length})
                </button>
                <button
                  onClick={() => setActiveTab("employment")}
                  className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === "employment" 
                      ? "text-[#0B3564] border-[#0B3564]" 
                      : "text-slate-500 border-transparent hover:text-slate-800"
                  }`}
                >
                  4. Employment & Financials
                </button>
                <button
                  onClick={() => setActiveTab("compliance")}
                  className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === "compliance" 
                      ? "text-[#0B3564] border-[#0B3564]" 
                      : "text-slate-500 border-transparent hover:text-slate-800"
                  }`}
                >
                  5. Compliance & Sanctions
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-slate-50/50">
                {uploadNotice && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>{uploadNotice}</span>
                  </div>
                )}

                {/* TAB 1: APPLICANT DETAILS */}
                {activeTab === "identity" && (
                  <div className="space-y-4">
                    <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-900">
                      <ShieldCheck size={16} className="text-[#0B3564] shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Applicant Details (Form Fields):</strong> Primary borrower record verified against Guyana National Registration and GBTI retail banking systems.
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Customer Type</label>
                        <input type="text" value={kycData.customerType} disabled className="w-full text-xs font-bold px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-800" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Title</label>
                        <input type="text" value={kycData.title} onChange={(e) => setKycData({...kycData, title: e.target.value})} className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">First Name</label>
                        <input type="text" value={kycData.firstName} onChange={(e) => setKycData({...kycData, firstName: e.target.value})} className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Middle Name</label>
                        <input type="text" value={kycData.middleName} onChange={(e) => setKycData({...kycData, middleName: e.target.value})} className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Last Name</label>
                        <input type="text" value={kycData.lastName} onChange={(e) => setKycData({...kycData, lastName: e.target.value})} className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">National ID Number</label>
                        <input type="text" value={kycData.nationalId} onChange={(e) => setKycData({...kycData, nationalId: e.target.value})} className="w-full text-xs font-mono font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Date of Birth</label>
                        <input type="text" value={kycData.dob} onChange={(e) => setKycData({...kycData, dob: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Age</label>
                        <input type="text" value={kycData.age} onChange={(e) => setKycData({...kycData, age: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                        <input type="text" value={kycData.gender} onChange={(e) => setKycData({...kycData, gender: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Father’s Name</label>
                        <input type="text" value={kycData.fatherName} onChange={(e) => setKycData({...kycData, fatherName: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mother’s Name</label>
                        <input type="text" value={kycData.motherName} onChange={(e) => setKycData({...kycData, motherName: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Marital Status</label>
                        <input type="text" value={kycData.maritalStatus} onChange={(e) => setKycData({...kycData, maritalStatus: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>

                      {/* Mobile Number replacing Spouse Name */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mobile Number</label>
                        <input 
                          type="text" 
                          value={kycData.mobileNumber} 
                          onChange={(e) => setKycData({...kycData, mobileNumber: e.target.value})} 
                          className="w-full text-xs font-mono font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Qualification</label>
                        <input type="text" value={kycData.qualification} onChange={(e) => setKycData({...kycData, qualification: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nationality</label>
                        <input type="text" value={kycData.nationality} onChange={(e) => setKycData({...kycData, nationality: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Residence Status</label>
                        <input type="text" value={kycData.residenceStatus} onChange={(e) => setKycData({...kycData, residenceStatus: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Period of Stay (in years)</label>
                        <input type="text" value={kycData.periodOfStay} onChange={(e) => setKycData({...kycData, periodOfStay: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. of Dependents</label>
                        <input type="text" value={kycData.noOfDependents} onChange={(e) => setKycData({...kycData, noOfDependents: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email ID</label>
                        <input type="email" value={kycData.email} onChange={(e) => setKycData({...kycData, email: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Past Applications Rejected (Last 12M)</label>
                        <input type="text" value={kycData.pastRejected12Months} disabled className="w-full text-xs font-bold px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: ADDRESS DETAILS */}
                {activeTab === "address" && (
                  <div className="space-y-4">
                    <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-950">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Address Details Grid:</strong> Populated exactly with required permanent residence specifications in Georgetown, Demerara-Mahaica, Guyana.
                      </div>
                    </div>

                    <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-100 text-slate-700 border-b border-slate-300">
                          <tr>
                            <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-[10px] w-1/2 border-r border-slate-200">
                              Grid Column
                            </th>
                            <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-[10px] w-1/2">
                              Required Value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          <tr className="hover:bg-slate-50/80">
                            <td className="py-2 px-4 font-bold text-slate-600 border-r border-slate-200">Address Line 1</td>
                            <td className="py-2 px-4 font-semibold text-slate-900">{kycData.addressLine1}</td>
                          </tr>
                          <tr className="hover:bg-slate-50/80">
                            <td className="py-2 px-4 font-bold text-slate-600 border-r border-slate-200">Address Line 2</td>
                            <td className="py-2 px-4 font-semibold text-slate-900">{kycData.addressLine2}</td>
                          </tr>
                          <tr className="hover:bg-slate-50/80">
                            <td className="py-2 px-4 font-bold text-slate-600 border-r border-slate-200">Postal Code</td>
                            <td className="py-2 px-4 font-semibold text-slate-900">{kycData.postalCode}</td>
                          </tr>
                          <tr className="hover:bg-slate-50/80">
                            <td className="py-2 px-4 font-bold text-slate-600 border-r border-slate-200">City</td>
                            <td className="py-2 px-4 font-semibold text-slate-900">{kycData.city}</td>
                          </tr>
                          <tr className="hover:bg-slate-50/80">
                            <td className="py-2 px-4 font-bold text-slate-600 border-r border-slate-200">Parish/Region</td>
                            <td className="py-2 px-4 font-semibold text-slate-900">{kycData.parish}</td>
                          </tr>
                          <tr className="hover:bg-slate-50/80">
                            <td className="py-2 px-4 font-bold text-slate-600 border-r border-slate-200">Country</td>
                            <td className="py-2 px-4 font-semibold text-slate-900">{kycData.country}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Edit Address Parameters</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Address Line 1</label>
                          <input type="text" value={kycData.addressLine1} onChange={(e) => setKycData({...kycData, addressLine1: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Address Line 2</label>
                          <input type="text" value={kycData.addressLine2} onChange={(e) => setKycData({...kycData, addressLine2: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">City</label>
                          <input type="text" value={kycData.city} onChange={(e) => setKycData({...kycData, city: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Parish / Region</label>
                          <input type="text" value={kycData.parish} onChange={(e) => setKycData({...kycData, parish: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: DOCUMENT ATTACHMENTS (Water Bill, Utility Bill, National ID, GRA TIN) */}
                {activeTab === "documents" && (
                  <div className="space-y-4">
                    <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-950">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Document Attachments & Verification:</strong> All requested documents (Water Bill – Marcus Persaud, Utility Bill – Marcus Persaud, and National ID – GY-DEMO-884216) are successfully attached, verified, and accessible for in-app preview and download.
                      </div>
                    </div>

                    {/* Document Attachments Table / Grid */}
                    <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-100 text-slate-700 border-b border-slate-300">
                          <tr>
                            <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px]">Document Name</th>
                            <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">Category</th>
                            <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">Date Attached</th>
                            <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">Format</th>
                            <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[10px]">Status</th>
                            <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2.5 px-3.5 font-bold text-slate-900 flex items-center gap-2">
                                <FileText size={14} className={doc.name.includes("Water") ? "text-cyan-600" : doc.name.includes("Utility") ? "text-amber-600" : "text-blue-600"} />
                                <span>{doc.name}</span>
                              </td>
                              <td className="py-2.5 px-3 text-slate-600 font-medium">{doc.category}</td>
                              <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{doc.uploadDate}</td>
                              <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{doc.type} • {doc.size}</td>
                              <td className="py-2.5 px-3">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-[2px]">
                                  <CheckCircle2 size={10} className="text-emerald-600" />
                                  Successfully Attached
                                </span>
                              </td>
                              <td className="py-2.5 px-3.5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button 
                                    onClick={() => setPreviewDoc(doc)}
                                    title="Preview Document within Application"
                                    className="flex items-center gap-1 px-2 py-1 text-slate-700 hover:text-[#0B3564] hover:bg-slate-100 rounded-[2px] transition-colors cursor-pointer border border-slate-300 text-[11px] font-semibold"
                                  >
                                    <Eye size={12} className="text-[#0B3564]" />
                                    <span>Preview</span>
                                  </button>
                                  <button 
                                    onClick={() => handleDownloadDocument(doc)}
                                    title="Download Document"
                                    className="flex items-center gap-1 px-2 py-1 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-[2px] transition-colors cursor-pointer border border-slate-300 text-[11px] font-semibold"
                                  >
                                    <Download size={12} className="text-emerald-600" />
                                    <span>Download</span>
                                  </button>
                                  <button 
                                    onClick={() => handleSimulateUpload(doc.name)}
                                    title="Re-upload or Update"
                                    className="text-[10px] font-bold text-slate-500 hover:text-slate-800 px-1 cursor-pointer"
                                  >
                                    Replace
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Upload new attachment box */}
                    <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 text-center flex flex-col items-center justify-center">
                      <Upload size={22} className="text-slate-400 mb-1.5" />
                      <p className="text-xs font-bold text-slate-700">Attach Additional Underwriting Document</p>
                      <p className="text-[10px] text-slate-500 mb-2">Supported formats: PDF, PNG, JPG (up to 25MB). Auto-verified with GECOM/GRA.</p>
                      <button 
                        onClick={() => handleSimulateUpload("Supplementary Document")}
                        className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-[2px] text-xs font-bold text-slate-700 cursor-pointer shadow-2xs"
                      >
                        Browse & Upload
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 4: EMPLOYMENT & FINANCIALS */}
                {activeTab === "employment" && (
                  <div className="space-y-4">
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-950">
                      <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Debt Service Warning:</strong> Gross monthly income of GYD 620,000.00 is heavily encumbered by existing liabilities of GYD 14,850,000.00 (Monthly debt payments: GYD 245,000.00).
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Employer Name</label>
                        <input type="text" value={kycData.employer} onChange={(e) => setKycData({...kycData, employer: e.target.value})} className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Designation</label>
                        <input type="text" value={kycData.designation} onChange={(e) => setKycData({...kycData, designation: e.target.value})} className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gross Monthly Income</label>
                        <input type="text" value={kycData.monthlyGrossIncome} disabled className="w-full text-xs font-mono font-bold px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-900" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Net Monthly Income</label>
                        <input type="text" value={kycData.monthlyNetPay} disabled className="w-full text-xs font-mono font-bold px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-900" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Monthly Living Expenses</label>
                        <input type="text" value={kycData.monthlyExpenses} disabled className="w-full text-xs font-mono font-bold px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-900" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Outstanding Liabilities</label>
                        <input type="text" value={kycData.existingLiabilities} disabled className="w-full text-xs font-mono font-bold px-3 py-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-800" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: COMPLIANCE & SANCTIONS */}
                {activeTab === "compliance" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Origination GBTI Branch</label>
                        <select value={kycData.gbtiBranch} onChange={(e) => setKycData({...kycData, gbtiBranch: e.target.value})} className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg">
                          {GBTI_BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">PEP Status</label>
                        <input type="text" value={kycData.pepStatus} disabled className="w-full text-xs font-semibold px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">FIU Guyana Screening</label>
                        <input type="text" value={kycData.fiuScreening} disabled className="w-full text-xs font-semibold px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Creditinfo Bureau Score</label>
                        <input type="text" value={kycData.bureauScore} disabled className="w-full text-xs font-bold px-3 py-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-800" />
                        <span className="text-[10px] text-rose-600 font-bold flex items-center gap-1 mt-1">
                          <AlertTriangle size={11} /> Subprime Score • Policy threshold is &gt; 710
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>GBTI Bank • Bank of Guyana Regulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsDossierOpen(false)}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Close Dossier
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-[#F26522] hover:bg-[#d85213] rounded-[4px] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {saveSuccess ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span>Saved & Synced</span>
                      </>
                    ) : (
                      <>
                        <FileCheck size={13} className="text-emerald-400" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ApplicantKYCCard;
