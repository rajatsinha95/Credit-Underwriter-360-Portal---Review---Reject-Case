import React from 'react';
import { SuggestedAdjustment } from '../types';
import { Lightbulb, ArrowRight, TrendingDown } from 'lucide-react';

interface SuggestedValuesProps {
  adjustments: SuggestedAdjustment[];
}

const SuggestedValues: React.FC<SuggestedValuesProps> = ({ adjustments }) => {
  if (!adjustments || adjustments.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md border border-amber-100 overflow-hidden h-full flex flex-col">
      <div className="px-3 py-2 border-b border-amber-100 flex items-center gap-2 bg-amber-50">
        <Lightbulb size={14} className="text-amber-600" />
        <h3 className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Suggested Adjustments for Approval</h3>
      </div>
      
      <div className="p-3 space-y-2">
        {adjustments.map((adj, index) => (
          <div key={index} className="flex flex-col gap-1.5 p-2.5 bg-white rounded-xl border border-amber-100 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{adj.parameter}</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 rounded text-[10px] font-bold text-green-700 border border-green-100">
                <TrendingDown size={10} />
                {adj.impact}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-medium">Current</span>
                <span className="text-sm font-bold text-gray-500 line-through opacity-50">{adj.currentValue}</span>
              </div>
              
              <ArrowRight size={14} className="text-amber-400 mt-3" />
              
              <div className="flex flex-col">
                <span className="text-[10px] text-amber-600 font-bold uppercase">Target</span>
                <span className="text-sm font-black text-amber-700">{adj.suggestedValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-3 py-1.5 bg-amber-50/80 text-[9px] text-amber-700 font-medium italic border-t border-amber-100">
        * These adjustments are calculated to bring the application within standard policy thresholds.
      </div>
    </div>
  );
};

export default SuggestedValues;
