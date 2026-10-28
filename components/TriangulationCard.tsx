import React, { useState } from 'react';
import { ConsistencyCheck } from '../types';
import { ShieldCheck, Loader2, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TriangulationCardProps {
  checks: ConsistencyCheck[];
  isCached?: boolean;
  isRunning?: boolean;
}

const TriangulationCard: React.FC<TriangulationCardProps> = ({ checks, isCached, isRunning }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    if (isRunning) return;
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const hasMismatch = checks.some(c => c.status === 'Mismatch');

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden relative border-l-4 ${hasMismatch ? 'border-l-rose-500' : 'border-l-emerald-500'}`}>
      <div className="p-4 pb-2">
        {/* Inspiration Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-dark rounded-lg flex items-center justify-center shadow-lg shadow-primary-dark/20">
              {isRunning ? (
                <Loader2 size={16} className="text-accent-yellow animate-spin" />
              ) : (
                <ShieldCheck size={16} className="text-accent-yellow" />
              )}
            </div>
            <div>
              <h3 className="text-[11px] font-black text-gray-900 tracking-tight uppercase leading-none mb-0.5">FinSight Agent</h3>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">Financial Risk</p>
            </div>
          </div>
          <ChevronDown size={14} className="text-gray-300" />
        </div>

        {/* Status Badge & Summary */}
        <div className="flex flex-col gap-2 mb-2">
          <div className={`self-start px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${hasMismatch ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
            {hasMismatch ? 'High Risk' : 'Verified'}
          </div>
          <p className="text-[10px] text-gray-600 font-medium leading-tight">
            {hasMismatch 
              ? "Data discrepancies detected; manual check required."
              : "Consistently verified across all reporting sources."}
          </p>
        </div>
      </div>

      {/* Detailed Content - Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 pt-0 border-t border-gray-50 pt-3">
        {checks.length > 0 ? (
          <div className="space-y-1.5 pt-2">
            {checks.map((check, i) => {
              const isExpanded = expandedIndex === i;
              const isMismatch = check.status === 'Mismatch';
              
              return (
                <div key={i} className="flex flex-col gap-1">
                  <div 
                    onClick={() => isMismatch && toggleExpand(i)}
                    className={`flex items-center justify-between p-1.5 rounded-lg border transition-all duration-300 ${
                      isRunning ? 'opacity-40 bg-gray-50 border-gray-100' : 
                      isMismatch ? 'bg-red-50/30 border-red-100 cursor-pointer hover:bg-red-50/50' : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter leading-none">{check.source}</span>
                        {isMismatch && (
                          <span className="text-[7px] font-black text-red-500 uppercase animate-pulse leading-none">Action</span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-700 font-medium leading-tight truncate">{check.details}</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-2">
                      <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase ${
                        check.status === 'Match' ? 'bg-green-100 text-green-700' : 
                        check.status === 'Mismatch' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {check.status}
                      </span>
                      {isMismatch && (
                        <div className="text-gray-400 shrink-0">
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </div>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && check.comparison && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border border-red-100 rounded-lg p-2 mt-0.5 shadow-inner space-y-2">
                          <div className="flex items-center gap-1 text-red-600 mb-1">
                            <AlertTriangle size={10} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Comparison</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            {check.comparison.map((item, idx) => (
                              <div key={idx} className="grid grid-cols-2 gap-1.5">
                                <div className="col-span-2 text-[8px] font-bold text-gray-400 uppercase tracking-tighter border-b border-gray-50 pb-0.5">
                                  {item.field}
                                </div>
                                <div className="bg-gray-50 p-1 rounded border border-gray-100">
                                  <p className="text-[7px] text-gray-400 uppercase font-bold leading-none mb-1 truncate">{item.sourceA.name}</p>
                                  <p className="text-[10px] font-black text-gray-900 leading-none">{item.sourceA.value}</p>
                                </div>
                                <div className="bg-red-50/50 p-1 rounded border border-red-100">
                                  <p className="text-[7px] text-red-400 uppercase font-bold leading-none mb-1 truncate">{item.sourceB.name}</p>
                                  <p className="text-[10px] font-black text-red-700 leading-none">{item.sourceB.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 h-full text-gray-400">
            <Loader2 size={20} className="animate-spin mb-1 opacity-20" />
            <span className="text-[9px] italic">Waiting...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriangulationCard;
