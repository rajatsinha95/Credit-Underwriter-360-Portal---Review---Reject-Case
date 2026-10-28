import { GoogleGenAI } from "@google/genai";
import { RiskParameter, DecisionRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function runAgent(agentName: string, context: any): Promise<any> {
  const prompts: Record<string, string> = {
    'Collateral Agent': `Analyze the property (collateral) details and provide a structured assessment.
      Return a JSON object with:
      - propertyType: (e.g., 'Residential Property')
      - location: (e.g., 'Bel Air Park, Georgetown')
      - marketValue: (e.g., '$85M GYD')
      - ltv: (e.g., '50.8%')
      - ownershipStatus: (e.g., 'Freehold / Clear Transport Title')
      - legalVerification: (e.g., 'Verified')
      - confidence: (number 0-100)
      - riskFlags: (array of strings)
      Context: ${JSON.stringify(context)}`,
    
    'Triangulation Agent': `Compare Creditinfo Guyana, GBTI Bank Statements, and GRA Tax Returns / Payslips for consistency.
      Context: ${JSON.stringify(context)}
      Return a JSON array of objects with fields: source, status ('Match', 'Mismatch', 'Partial'), details, and an optional 'comparison' array for mismatches.
      The 'comparison' array should contain objects with: field, sourceA { name, value }, sourceB { name, value }.`,
    
    'Behavioural Agent': `Analyze digital footprint, payment behavior, and social signals.
      Context: ${JSON.stringify(context)}
      Return a JSON array of objects with fields: category, insight, and score ('Positive', 'Neutral', 'Negative').`,
    
    'AI Decision Recommendation Agent': `Provide an explainable approval/reject suggestion and a comprehensive risk assessment.
      Context: ${JSON.stringify(context)}
      Return a JSON object matching the DecisionRecommendation type, but also include:
      - probabilityOfDefault: (number 0-100, e.g., 4.2)
      - featureImportance: (array of objects with: feature, importance (0-100), impact ('positive' | 'negative'))
      - riskPoints: (array of strings for the risk analysis report)`,
    
    'Fraud Agent': `Analyze the customer context for fraud red flags, AML indicators, and identity verification status.
      Analyze the context for red flags in employment, address consistency, and legal history.
      Return a JSON object with 'status' (e.g., 'Low Risk', 'Medium Risk', 'High Risk'), 'alerts' (array of strings), and 'flags' (array of objects with label and severity).
      Context: ${JSON.stringify(context)}`,
    
    'Counter Offer Agent': `Suggest revised loan targets and terms if the decision is not a straight approval.
      Context: ${JSON.stringify(context)}
      Return a JSON object with fields: loanAmount, tenure, interestRate, rationale.`,
    
    'Approved Amount Agent': `Determine the final approved loan amount and provide a comprehensive, conversational, yet decision-oriented narrative for an underwriter.
      The summary must cover:
      - Applicant Profile & Financials: Summarize the applicant's status and core financial health.
      - Behaviour & Risk: Highlight key behavioral patterns (repayment history, spending trends) and critical risk indicators.
      - Positives & Concerns: Explicitly call out what makes this case strong and what requires caution.
      - Recommended Action: Provide a clear direction (e.g., 'Approve' or 'Review') with a concise, transparent rationale.
      - Note: Ensure the tone is supportive and professional, reinforcing that the underwriter holds the final decision-making power.
      - Formatting: Use standard paragraph breaks (\n\n) for readability.
      Context: ${JSON.stringify(context)}
      Return a JSON object with 'approvedAmount' (formatted as e.g. 0.00) and a 'summary' field containing the holistic narrative.`,
  };

  const prompt = prompts[agentName] || `Execute task for ${agentName}. Context: ${JSON.stringify(context)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error(`Error in ${agentName}:`, error);
    return {};
  }
}

export async function generateDecisionRecommendation(riskData: RiskParameter[]): Promise<Partial<DecisionRecommendation>> {
  const prompt = `
    As a senior credit underwriter AI, analyze the following risk parameters and provide a concise decision recommendation for a loan.
    
    Risk Data:
    ${JSON.stringify(riskData, null, 2)}
    
    Provide your response in JSON format with the following fields:
    - decision: 'APPROVE', 'DECLINE', or 'REFER'
    - confidence: (number between 0-100)
    - probabilityOfDefault: (A predicted probability of default between 0-100, (e.g., 4.2))
    - featureImportance: (An array of the top 5 contributing factors with their relative importance (0-100) and impact ('positive' or 'negative'))
    - reasoning: (A professional 2-3 sentence explanation for the underwriter)
    - primaryDrivers: (An array of the top 3 parameters causing this decision)
    - suggestedAdjustments: (An array of objects if decision is not APPROVE, each with: parameter, currentValue, suggestedValue, impact)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Error generating recommendation:", error);
    return {};
  }
}
