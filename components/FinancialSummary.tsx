import React from 'react';
import { CounterOffer, CollateralDetailsResult } from '../types';
import { DollarSign, Percent, Bot, Loader2, Home } from 'lucide-react';
import CollateralCard from './CollateralCard';

interface FinancialSummaryProps {
  collateralDetails: CollateralDetailsResult | null;
  counterOffer: CounterOffer | null;
  isCached?: boolean;
  isRunning?: boolean;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ collateralDetails, counterOffer, isCached, isRunning }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Collateral Details Card */}
      <CollateralCard details={collateralDetails} isCached={isCached} isRunning={isRunning} />

      {/* Counter Offer Card */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex flex-col h-full overflow-hidden relative">
        <div className="flex items-center gap-2 mb-3">
           <div className="p-2 bg-orange-50 rounded-full">
               {isRunning ? (
                 <Loader2 size={18} className="text-orange-500 animate-spin" />
               ) : (
                 <Bot size={18} className="text-orange-500" />
               )}
           </div>
           <h3 className="font-semibold text-gray-800 text-sm">
             {isRunning ? 'Calculating Counter Offer...' : 'Suggested Counter Offer'}
           </h3>
        </div>
        {counterOffer ? (
          <div className={`flex flex-col gap-2 transition-opacity duration-500 ${isRunning ? 'opacity-40' : ''}`}>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Proposed Amount</span>
              <span className="text-sm font-bold text-orange-600">G$ {counterOffer.loanAmount}</span>
            </div>
            <div className="text-[10px] text-gray-500 bg-orange-50 p-2 rounded border border-orange-100 italic">
              "{counterOffer.rationale}"
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-6">
            <Loader2 size={24} className="animate-spin text-gray-200" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialSummary;
