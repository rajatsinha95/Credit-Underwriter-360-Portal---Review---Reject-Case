import { 
  CustomerProfile, 
  RiskParameter, 
  PolicyCheckItem, 
  ReportMetric, 
  DecisionRecommendation, 
  ConsistencyCheck, 
  BehaviourInsight, 
  FraudResult, 
  CollateralDetailsResult, 
  CounterOffer, 
  BureauSummaryData, 
  FinancingSummaryData, 
  CounterOfferSuiteItem, 
  CreditNarrative, 
  CaseSummarisation,
  DocumentAttachment
} from './types';

export const BUREAU_SUMMARY_DATA: BureauSummaryData = {
  bureauScore: 598,
  activeLoanAccounts: 4,
  loansTakenLast6Months: 1,
  closedAccounts: 3,
  creditEnquiriesLast12Months: 5,
  nonCreditEnquiriesLast12Months: 2,
  noOfDpds: 3,
  worstDpd: 45,
  assetClass: "Sub-Standard / Watchlist",
  noOfPastDueAccounts: 1,
  overdueAmount: "128,500.00",
  outstandingLoanAmount: "14,850,000.00",
  repaymentTrack: 6,
  noOfSettledAccount: 0,
  settledAmountLast36Months: "0.00",
  noOfWriteOffAccount: 0,
  noOfRestructuredLoans: 0,
  suitFiledStatus: "No Adverse Record",
  writeOffAmountLast36Months: "0.00",
  missedPayment: 2,
};

export const FINANCING_SUMMARY_DATA: FinancingSummaryData = {
  productType: "Residential Mortgage",
  purposeOfLoan: "Purchase Residential Property",
  loanAmountRequired: "GYD 32,500,000.00",
  tenure: "240 months",
  installments: "GYD 282,450.00",
};

export const CUSTOMER_DATA: CustomerProfile = {
  name: "Marcus Anthony Persaud",
  title: "Mr.",
  firstName: "Marcus",
  middleName: "Anthony",
  lastName: "Persaud",
  designation: "Operations Manager",
  company: "Demerara Distillers Limited (DDL)",
  dob: "22-06-1988",
  age: "38 Years",
  gender: "Male",
  nationalId: "GY-DEMO-884216",
  fatherName: "Daniel Persaud",
  motherName: "Anita Persaud",
  maritalStatus: "Married",
  qualification: "Post Graduate",
  nationality: "Guyanese",
  residenceStatus: "Fully Owned",
  periodOfStay: 9,
  dependents: 3,
  mobile: "5926517394",
  email: "marcus.persaud@gmail.com",
  address: "42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana",
  addressLine1: "42 Sheriff Street",
  addressLine2: "Apartment 3A",
  postalCode: "N/A",
  city: "Georgetown",
  parish: "Demerara-Mahaica",
  country: "Guyana",
  rejectedPast12Months: 0,
  connectionType: "ETB",
  relationshipYears: 9,
  bureauScore: 598,
  loanAmount: "32,500,000.00",
  eligibleAmount: "18,200,000.00",
  approvedAmount: "0.00",
  tenure: "240 months",
  ltv: 90.28,
  dbr: 85.07,
  grossIncome: "620,000.00",
  netIncome: "485,000.00",
  monthlyExpenses: "210,000.00",
  existingLiabilities: "14,850,000.00",
  outstandingBalance: "14,850,000.00",
  monthlyRepayment: "245,000.00",
  collateralValue: "36,000,000.00"
};

export const ATTACHED_DOCUMENTS: DocumentAttachment[] = [
  {
    id: 'doc-1',
    name: 'Water Bill – Marcus Persaud',
    category: 'Proof of Address',
    status: 'Attached',
    uploadDate: '12 Oct 2026',
    size: '1.2 MB',
    type: 'PDF',
    verified: true
  },
  {
    id: 'doc-2',
    name: 'Utility Bill – Marcus Persaud',
    category: 'Proof of Address',
    status: 'Attached',
    uploadDate: '18 Oct 2026',
    size: '840 KB',
    type: 'PDF',
    verified: true
  },
  {
    id: 'doc-3',
    name: 'National ID (NIC) – GY-DEMO-884216',
    category: 'Identity Proof',
    status: 'Attached',
    uploadDate: '08 Oct 2026',
    size: '2.4 MB',
    type: 'PDF',
    verified: true
  },
  {
    id: 'doc-4',
    name: 'GRA Tax Identification (TIN) Certificate',
    category: 'Tax Verification',
    status: 'Attached',
    uploadDate: '08 Oct 2026',
    size: '1.1 MB',
    type: 'PDF',
    verified: true
  }
];

export const RISK_TABLE_DATA: RiskParameter[] = [
  { id: '1', parameter: 'Age at Maturity', value: '58 Yrs', expectedValue: '≤ 65 Yrs', policyOutput: 'Pass', isAlert: false },
  { id: '2', parameter: 'Current Employment Length', value: '4 Yrs 2 Mos', expectedValue: '≥ 2 Yrs', policyOutput: 'Pass', isAlert: false },
  { id: '3', parameter: 'Judgement', value: 'Nil / Clear Record', expectedValue: 'No Adverse Judgement', policyOutput: 'Pass', isAlert: false },
  { id: '4', parameter: 'TDSR / FOIR', value: '85.07%', expectedValue: '≤ 45.00%', policyOutput: 'Fail', isAlert: true },
  { id: '5', parameter: 'Gross Income', value: 'GYD 620,000 / mo', expectedValue: '≥ GYD 350,000 / mo', policyOutput: 'Pass', isAlert: false },
  { id: '6', parameter: 'Credit History', value: '9 Yrs with GBTI (ETB)', expectedValue: 'Clean / Satisfactory', policyOutput: 'Pass', isAlert: false },
  { id: '7', parameter: 'Total Exposure', value: 'GYD 47,350,000.00', expectedValue: '≤ GYD 60,000,000.00', policyOutput: 'Pass', isAlert: false },
  { id: '8', parameter: 'Number of Past Applications Rejected (Last 12 Months)', value: '0', expectedValue: '≤ 1', policyOutput: 'Pass', isAlert: false },
  { id: '9', parameter: 'Creditinfo Bureau Score', value: '598', expectedValue: '> 710', policyOutput: 'Fail', isAlert: true },
  { id: '10', parameter: 'Loan to Value (LTV)', value: '90.28%', expectedValue: '≤ 75.00%', policyOutput: 'Fail', isAlert: true },
  { id: '11', parameter: 'Residence Vintage', value: '9 Years (108 Mos)', expectedValue: '> 6 Months', policyOutput: 'Pass', isAlert: false },
  { id: '12', parameter: 'Health Status', value: 'Good', expectedValue: 'Good', policyOutput: 'Pass', isAlert: false },
  { id: '13', parameter: 'Assets to Liability Ratio', value: '1.42', expectedValue: '> 2.0', policyOutput: 'Fail', isAlert: true },
  { id: '14', parameter: 'No. of Active Loan Accounts', value: '4', expectedValue: '< 5', policyOutput: 'Pass', isAlert: false },
  { id: '15', parameter: 'Existing Loan O/s to Current Loan Amount Ratio', value: '0.46', expectedValue: '< 0.35', policyOutput: 'Fail', isAlert: true },
  { id: '16', parameter: 'Request for Facilities (Last 4 Months)', value: '1', expectedValue: '≤ 3', policyOutput: 'Pass', isAlert: false },
  { id: '17', parameter: 'Worst DPD', value: '45 DPD', expectedValue: '≤ 60 DPD', policyOutput: 'Pass', isAlert: false },
  { id: '18', parameter: 'Overdue Amount', value: 'GYD 128,500.00', expectedValue: '≤ GYD 10,000.00', policyOutput: 'Fail', isAlert: true },
  { id: '19', parameter: 'Legal Filed Loans', value: 'No', expectedValue: 'No', policyOutput: 'Pass', isAlert: false },
  { id: '20', parameter: 'Conduct of Account', value: 'Multiple active debts with occasional delays', expectedValue: 'Satisfactory Conduct', policyOutput: 'Pass', isAlert: false },
  { id: '21', parameter: 'Marketability of Asset', value: 'Sheriff Street Urban Residential', expectedValue: 'Standard or Higher', policyOutput: 'Pass', isAlert: false },
];

export const POLICY_CHECKS: PolicyCheckItem[] = [
  { id: '1', label: 'Creditinfo Score', value: '598 (Subprime Grade C)', status: 'fail', iconType: 'file' },
  { id: '2', label: 'Gross Monthly Income', value: 'GYD 620,000.00', status: 'pass', iconType: 'wallet' },
  { id: '3', label: 'TDSR / DBR', value: '85.07% (Limit: ≤ 45.00%)', status: 'fail', iconType: 'briefcase' },
  { id: '4', label: 'LTV Ratio', value: '90.28% (Limit: ≤ 75.00%)', status: 'fail', iconType: 'home' },
  { id: '5', label: 'Overdue Liabilities', value: 'GYD 128,500.00 (Limit: ≤ GYD 10,000.00)', status: 'fail', iconType: 'wallet' },
  { id: '6', label: 'Age at Maturity', value: '58 Yrs (≤ 65 Yrs)', status: 'pass', iconType: 'user' },
  { id: '7', label: 'Employment Length', value: '4 Yrs 2 Mos (DDL)', status: 'pass', iconType: 'briefcase' },
  { id: '8', label: 'Collateral Transport', value: '42 Sheriff St, Georgetown', status: 'pass', iconType: 'home' },
  { id: '9', label: 'Residence Vintage', value: '9 Yrs (Fully Owned)', status: 'pass', iconType: 'clock' },
  { id: '10', label: 'Judgement Record', value: 'Clean / No Judgements', status: 'pass', iconType: 'user' },
];

export const REPORT_DATA: ReportMetric[] = [
  {
    title: "Collateral Report",
    type: "collateral",
    points: [
      "Collateral located at 42 Sheriff Street, Georgetown, Demerara-Mahaica",
      "Appraised Market Valuation of GYD 36,000,000.00 with verified Transport Title",
      "Assessed LTV of 90.28% breaches the Bank of Guyana and GBTI policy ceiling of 75.00%"
    ]
  },
  {
    title: "Risk Analysis Report",
    type: "risk",
    points: [
      "Critical Policy Failure: TDSR of 85.07% significantly exceeds the institutional ceiling of 45.00%",
      "Creditinfo Bureau Score of 598 indicates elevated default risk with GYD 128,500.00 overdue balance",
      "6 out of 21 risk & credit policy parameters failed institutional benchmarks; Recommend: Review - Reject"
    ]
  }
];

export const SCORECARD_TAGS = [
  { label: "Grade C Subprime", color: "bg-rose-600" },
  { label: "Review - Reject", color: "bg-rose-600" },
  { label: "Excessive TDSR (85.07%)", color: "bg-rose-500" },
  { label: "Over-LTV (90.28%)", color: "bg-rose-500" },
  { label: "Active Overdue Debt", color: "bg-rose-500" },
];

export const COLLATERAL_DETAILS = {
  propertyType: "Residential Property",
  location: "42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana",
  area: "1,450 sq. ft.",
  marketValue: "36,000,000.00",
  valuationDate: "12 Oct 2026",
  legalStatus: "Clear Transport / Title",
  occupancy: "Fully Owned",
  amenities: ["Gated Compound", "Utility Hookup", "Paved Access", "Perimeter Wall"],
  neighborhoodRisk: "Moderate",
  priceTrend: "Appreciating @ 4.5% annually"
};

export const CONSISTENCY_CHECKS: ConsistencyCheck[] = [
  { 
    source: 'Creditinfo vs GRA Return', 
    status: 'Match', 
    details: 'Income levels match across Creditinfo Guyana and GRA tax return filings.' 
  },
  { 
    source: 'GBTI Bank vs Payslip', 
    status: 'Match', 
    details: 'Net pay verified with automated direct payroll credit at Demerara Distillers Limited.',
    comparison: [
      { 
        field: 'Monthly Net Pay', 
        sourceA: { name: 'GBTI Statement', value: 'GYD 485,000.00' }, 
        sourceB: { name: 'DDL Salary Slip', value: 'GYD 485,000.00' } 
      },
      { 
        field: 'Employer Name', 
        sourceA: { name: 'Bank Statement', value: 'DEMERARA DISTILLERS LTD' }, 
        sourceB: { name: 'Salary Slip', value: 'Demerara Distillers Limited (DDL)' } 
      }
    ]
  },
  { 
    source: 'KYC vs Application', 
    status: 'Match', 
    details: 'Guyana National ID (GY-DEMO-884216), GRA TIN (108-421-992), and Water Bill / Utility Bill addresses verified.' 
  },
];

export const BEHAVIOUR_INSIGHTS: BehaviourInsight[] = [
  { category: 'Repayment', insight: '45-day past due recorded on existing secondary loan; overdue balance of GYD 128,500.00.', score: 'Negative' },
  { category: 'Spending', insight: 'Elevated monthly liabilities (GYD 245,000.00) severely restrict unencumbered cash cushion.', score: 'Negative' },
  { category: 'Digital', insight: 'Consistent payroll direct deposit from DDL, but monthly debt servicing absorbs 85.07% of income.', score: 'Neutral' },
];

export const FRAUD_RESULT: FraudResult = {
  status: 'Low Risk',
  alerts: [],
  flags: [
    { label: 'Identity Verified (GECOM NIC #GY-DEMO-884216)', severity: 'Low' },
    { label: 'GRA TIN In Good Standing (108-421-992)', severity: 'Low' },
    { label: 'Physical Address Verified (42 Sheriff Street)', severity: 'Low' },
  ]
};

export const COLLATERAL_RESULT: CollateralDetailsResult = {
  propertyType: "Residential Property",
  location: "42 Sheriff Street, Apartment 3A, Georgetown, Guyana",
  marketValue: "GYD 36,000,000.00",
  ltv: "90.28%",
  ownershipStatus: "Freehold / Clear Transport Title",
  legalVerification: "Verified",
  confidence: 94,
  riskFlags: ["LTV of 90.28% exceeds institutional 75.00% benchmark ceiling"]
};

export const COUNTER_OFFER: CounterOffer = {
  loanAmount: "0.00",
  tenure: "0 months",
  interestRate: "N/A",
  rationale: "Review - Reject: Facility cannot be accommodated under current policy. Borrower's TDSR of 85.07% and LTV of 90.28% both violate maximum regulatory and GBTI credit standards. Maximum theoretical capacity under policy is capped at GYD 18,200,000.00."
};

export const AI_COUNTER_OFFER_SUITE: CounterOfferSuiteItem[] = [
  {
    id: 'co-1',
    title: 'Requested Facility (Declined)',
    loanAmount: '32,500,000',
    tenure: '240 months',
    emi: '282,450',
    dbr: '85.1%',
    ltv: '90.3%',
    approvalIntent: 'Review - Reject',
    recommended: false
  },
  {
    id: 'co-2',
    title: 'Policy Constrained Facility (Theoretical Limit)',
    loanAmount: '18,200,000',
    tenure: '240 months',
    emi: '158,180',
    dbr: '65.0%',
    ltv: '50.6%',
    approvalIntent: 'Requires Debt Restructuring',
    recommended: false
  }
];

export const DECISION_RECOMMENDATION: DecisionRecommendation = {
  decision: 'Review - Reject',
  confidence: 94,
  riskScore: 78,
  probabilityOfDefault: 48.5,
  featureImportance: [
    { feature: 'TDSR / Debt Burden Ratio (85.07%)', importance: 95, impact: 'negative' },
    { feature: 'Assessed Loan to Value (90.28%)', importance: 88, impact: 'negative' },
    { feature: 'Creditinfo Bureau Score (598 Subprime)', importance: 84, impact: 'negative' },
    { feature: 'Active Bureau Overdue Amount (GYD 128.5K)', importance: 76, impact: 'negative' },
    { feature: 'Existing Bureau Debt Exposure (GYD 14.85M)', importance: 70, impact: 'negative' },
    { feature: 'Employment Stability (4+ Yrs at DDL)', importance: 42, impact: 'positive' }
  ],
  reasoning: "Review - Reject: Marcus Anthony Persaud does not satisfy GBTI credit risk benchmarks. The proposed mortgage creates an unsustainable Total Debt Service Ratio (TDSR) of 85.07% against the 45.00% institutional threshold. In addition, the requested amount of GYD 32,500,000.00 results in an LTV of 90.28% against collateral valued at GYD 36,000,000.00, well above the 75.00% policy ceiling. Creditinfo Score of 598 is in the subprime category with an active overdue liability of GYD 128,500.00.",
  primaryDrivers: [
    'TDSR Exceeds Limit (85.07% vs ≤ 45.00%)', 
    'LTV Exceeds Ceiling (90.28% vs ≤ 75.00%)', 
    'Creditinfo Bureau Score Below Benchmark (598 vs > 710)', 
    'Bureau Overdue Balance (GYD 128,500.00)'
  ],
  suggestedAdjustments: [
    { parameter: 'Loan Amount', currentValue: 'GYD 32,500,000.00', suggestedValue: 'GYD 18,200,000.00', impact: 'Reduces LTV to 50.56%' },
    { parameter: 'Existing Debt Payoff', currentValue: 'GYD 14,850,000.00', suggestedValue: 'GYD 0.00', impact: 'Clears existing monthly obligation of GYD 245,000.00' }
  ]
};

export const AI_CASE_SUMMARY: CaseSummarisation = {
  executiveSummary: "Review - Reject: Marcus Anthony Persaud presents an unserviceable debt profile for the requested residential mortgage facility of GYD 32,500,000.00 at 240 months.\n\nWhile the applicant is an established Operations Manager at Demerara Distillers Limited (DDL) with a verified gross monthly income of GYD 620,000.00 (net GYD 485,000.00) and owns residential property at 42 Sheriff Street, Apartment 3A, Georgetown, the financial evaluation reveals severe policy breaches. Total monthly debt obligations (existing liabilities of GYD 245,000.00 plus proposed loan installment of GYD 282,450.00) total GYD 527,450.00, pushing the Total Debt Service Ratio (TDSR) to 85.07%, far exceeding the 45.00% institutional limit.\n\nFurthermore, the requested loan results in a Loan-to-Value (LTV) ratio of 90.28% against the appraised collateral valuation of GYD 36,000,000.00, breaching the 75.00% maximum policy benchmark. Creditinfo Bureau records indicate a subprime score of 598, 4 active debt facilities with GYD 14,850,000.00 outstanding balance, and an active overdue amount of GYD 128,500.00 with past-due DPDs.\n\nUnderwriting Outcome: Review - Reject. Application declined in its current structure due to compounding policy breaches across leverage, collateral coverage, and credit bureau performance.",
  keyStrengths: [
    "Applicant is an ETB customer with 9 years banking relationship at GBTI",
    "Verified employment of 4 Yrs 2 Mos at Demerara Distillers Limited (DDL)",
    "Clean legal and sanctions screening with zero adverse court judgements",
    "0 past loan applications rejected in the last 12 months"
  ],
  primaryConcerns: [
    "Critical Policy Breach: TDSR of 85.07% far exceeds institutional limit of 45.00%",
    "Excessive LTV of 90.28% breaches maximum 75.00% collateral ceiling",
    "Subprime Creditinfo Bureau score of 598 with active overdue amount of GYD 128,500.00",
    "Existing debt burden of GYD 14,850,000.00 with GYD 245,000.00 monthly commitments"
  ],
  finalVerdict: "Review - Reject: Facility declined due to critical policy failures in debt service capacity (TDSR 85.07%), collateral coverage (LTV 90.28%), and adverse credit bureau standing (Score 598)."
};

export const AI_CAM_PREVIEW = `
# CREDIT APPRAISAL MEMORANDUM (CAM) — ADVERSE ACTION / REJECT
**Ref:** GBTI-CAM-2026-REJ-8842 | **Date:** 27 Oct 2026 | **Bank:** GBTI Bank Limited, Guyana

## 1. Executive Summary & Adverse Recommendation
The applicant, Marcus Anthony Persaud (National ID: GY-DEMO-884216), was assessed for a Residential Mortgage facility of GYD 32,500,000.00. Based on institutional risk underwriting benchmarks, the recommended outcome is REVIEW - REJECT.

## 2. Income & Cashflow Analysis (Policy Breach)
- Gross Monthly Income: GYD 620,000.00 | Net Monthly Income: GYD 485,000.00
- Existing Debt Service: GYD 245,000.00 / month across 4 bureau accounts
- Proposed Facility Installment: GYD 282,450.00 / month
- Total Debt Service Ratio (TDSR): 85.07% (CRITICAL BREACH: Maximum allowed is 45.00%)

## 3. Collateral & Valuation Assessment
- Property Location: 42 Sheriff Street, Apartment 3A, Georgetown, Demerara-Mahaica, Guyana
- Appraised Market Value: GYD 36,000,000.00
- Assessed LTV: 90.28% (POLICY BREACH: Maximum allowed is 75.00%)

## 4. Creditinfo Bureau & Repayment Track
- Creditinfo Bureau Score: 598 (Subprime Grade C - Benchmark > 710)
- Total Outstanding Liabilities: GYD 14,850,000.00
- Active Overdue Amount: GYD 128,500.00 (Worst DPD: 45 Days)

## 5. Final Recommendation
DECISION: REVIEW - REJECT
Application declined due to multiple critical credit policy breaches: excessive TDSR (85.07%), inadequate collateral margin (LTV 90.28%), and subprime credit bureau performance.
`;

export const CREDIT_NARRATIVE: CreditNarrative = {
  decision: "Review - Reject — Adverse Credit Policy Outcome",
  contributingFactors: [
    { label: "Excessive Debt Service (TDSR)", detail: "Total monthly debt obligations of GYD 527,450.00 consume 85.07% of gross income, severely breaching the 45.00% benchmark." },
    { label: "Inadequate Collateral Margin", detail: "Requested loan of GYD 32,500,000.00 against property value of GYD 36,000,000.00 results in an LTV of 90.28% (ceiling 75.00%)." },
    { label: "Bureau Delinquency", detail: "Creditinfo Score of 598 with active overdue amount of GYD 128,500.00 across 4 loan facilities." },
    { label: "Employment Standing", detail: "Applicant maintains stable employment at Demerara Distillers Limited (DDL), but income cannot support leverage." }
  ],
  riskSignals: [
    { label: "TDSR Policy Breach", severity: "High", detail: "Current TDSR is 85.07%, leaving negative disposable surplus after living expenses of GYD 210,000.00." },
    { label: "Collateral Coverage Deficit", severity: "High", detail: "LTV of 90.28% leaves insufficient bank cushion in the event of default on 42 Sheriff Street." },
    { label: "Past-Due DPDs", severity: "High", detail: "Worst DPD of 45 days with GYD 128,500.00 past-due balance recorded on Creditinfo bureau report." }
  ],
  policyAlignments: [
    { policy: "Minimum Income Benchmark", status: "Pass", detail: "Verified gross income of GYD 620,000.00 exceeds standard GBTI minimum retail benchmark." },
    { policy: "Debt Service Ratio (TDSR)", status: "Fail", detail: "TDSR of 85.07% violates maximum allowed institutional threshold of 45.00%." },
    { policy: "Loan-to-Value (LTV)", status: "Fail", detail: "Assessed LTV of 90.28% breaches the 75.00% prudential ceiling." },
    { policy: "Creditinfo Bureau Score", status: "Fail", detail: "Bureau score of 598 fails to meet the minimum prime threshold of 710." },
    { policy: "Overdue Credit Balance", status: "Fail", detail: "Overdue balance of GYD 128,500.00 breaches maximum allowed policy threshold of GYD 10,000.00." },
    { policy: "KYC & Residence Verification", status: "Pass", detail: "Verified across GECOM National ID (GY-DEMO-884216), GRA TIN, and attached Water & Utility bills." }
  ],
  tradeOffs: [
    "Recommended Action: Review - Reject. No loan sanction approved under current debt structure.",
    "Theoretical maximum policy eligibility of GYD 18,200,000.00 would require full liquidation of existing GYD 14,850,000.00 bureau liabilities."
  ]
};
