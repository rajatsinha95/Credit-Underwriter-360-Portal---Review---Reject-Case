export interface CustomerProfile {
  name: string;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  designation: string;
  company: string;
  dob: string;
  age?: number | string;
  gender?: string;
  nationalId?: string;
  fatherName?: string;
  motherName?: string;
  maritalStatus?: string;
  spouseName?: string;
  qualification?: string;
  nationality?: string;
  residenceStatus?: string;
  periodOfStay?: number;
  dependents?: number;
  mobile: string;
  email: string;
  address: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  parish?: string;
  country?: string;
  rejectedPast12Months?: number;
  connectionType: string; // e.g., ETB
  relationshipYears: number;
  bureauScore: number;
  loanAmount: string;
  eligibleAmount?: string;
  approvedAmount?: string;
  tenure: string;
  ltv: number;
  dbr: number;
  grossIncome?: string;
  netIncome?: string;
  monthlyExpenses?: string;
  existingLiabilities?: string;
  outstandingBalance?: string;
  monthlyRepayment?: string;
  collateralValue?: string;
}

export interface DocumentAttachment {
  id: string;
  name: string;
  category: string;
  status: 'Attached' | 'Pending' | 'Rejected';
  uploadDate: string;
  size: string;
  type: string;
  verified: boolean;
}

export interface RiskParameter {
  id: string;
  parameter: string;
  value: string;
  expectedValue: string;
  policyOutput: 'Rejected' | 'Review' | 'Pass' | 'Review – Approve' | 'Fail' | 'Review - Reject';
  isAlert: boolean;
}

export interface PolicyCheckItem {
  id: string;
  label: string;
  value: string;
  status: 'pass' | 'fail';
  iconType: 'home' | 'briefcase' | 'user' | 'wallet' | 'clock' | 'file';
}

export interface ReportMetric {
  title: string;
  points: string[];
  type: 'collateral' | 'risk' | 'consistency' | 'behaviour';
}

export interface ConsistencyCheck {
  source: string;
  status: 'Match' | 'Mismatch' | 'Partial';
  details: string;
  comparison?: {
    field: string;
    sourceA: { name: string; value: string };
    sourceB: { name: string; value: string };
  }[];
}

export interface BehaviourInsight {
  category: string;
  insight: string;
  score: 'Positive' | 'Neutral' | 'Negative';
}

export interface CounterOffer {
  loanAmount: string;
  tenure: string;
  interestRate: string;
  rationale: string;
}

export interface FraudFlag {
  label: string;
  severity: 'Low' | 'Medium' | 'High';
}

export interface FraudResult {
  status: string;
  alerts: string[];
  flags: FraudFlag[];
}

export interface CollateralDetailsResult {
  propertyType: string;
  location: string;
  marketValue: string;
  ltv: string;
  ownershipStatus: string;
  legalVerification: string;
  confidence: number;
  riskFlags: string[];
}

export interface PricingDetails {
  interestRate: string;
  tenure: string;
  processingFee: string;
  emi: string;
}

export interface AgentResult {
  agentName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: any;
  timestamp?: string;
}

export interface OrchestrationState {
  agents: AgentResult[];
  isComplete: boolean;
  consolidatedSummary?: string;
}

export interface SuggestedAdjustment {
  parameter: string;
  currentValue: string;
  suggestedValue: string;
  impact: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number; // 0-100
  impact: 'positive' | 'negative';
}

export interface DecisionRecommendation {
  decision: 'APPROVE' | 'DECLINE' | 'REFER' | 'REVIEW_APPROVE' | 'Review - Reject' | 'REJECT';
  confidence: number;
  reasoning: string;
  primaryDrivers: string[];
  riskScore: number;
  probabilityOfDefault?: number; // 0-100
  featureImportance?: FeatureImportance[];
  suggestedAdjustments?: SuggestedAdjustment[];
}

export interface BureauSummaryData {
  bureauScore: number;
  activeLoanAccounts: number;
  loansTakenLast6Months: number;
  closedAccounts: number;
  creditEnquiriesLast12Months: number;
  nonCreditEnquiriesLast12Months: number;
  noOfDpds: number;
  worstDpd: number;
  assetClass: string;
  noOfPastDueAccounts: number;
  overdueAmount: string;
  outstandingLoanAmount: string;
  repaymentTrack: number;
  noOfSettledAccount: number;
  settledAmountLast36Months: string;
  noOfWriteOffAccount: number;
  noOfRestructuredLoans: number;
  suitFiledStatus: string;
  writeOffAmountLast36Months: string;
  missedPayment: number;
}

export interface CreditNarrative {
  decision: string;
  contributingFactors: { label: string; detail: string }[];
  riskSignals: { label: string; severity: 'Low' | 'Medium' | 'High'; detail: string }[];
  policyAlignments: { policy: string; status: 'Pass' | 'Deviation'; detail: string }[];
  tradeOffs: string[];
}

export interface CounterOfferSuiteItem {
  id: string;
  title: string;
  loanAmount: string;
  tenure: string;
  emi: string;
  dbr: string;
  ltv: string;
  approvalIntent: string;
  recommended: boolean;
}

export interface CaseSummarisation {
  executiveSummary: string;
  keyStrengths: string[];
  primaryConcerns: string[];
  finalVerdict: string;
}

export interface FinancingSummaryData {
  productType: string;
  purposeOfLoan: string;
  loanAmountRequired: string;
  tenure: string;
  installments: string;
}
