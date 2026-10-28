import React from 'react';
import { 
  Building, 
  MapPin, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  ExternalLink,
  ShieldCheck,
  Maximize2,
  AlertTriangle
} from 'lucide-react';
import { COLLATERAL_DETAILS } from '../constants';

const PropertyLocationCard: React.FC = () => {
  return (
    <div id="section-property-location" className="bg-white rounded-[2px] border border-slate-300 shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="px-3.5 py-2 bg-slate-100/90 border-b border-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[2px] bg-[#F26522] text-white font-bold text-[11px] flex items-center justify-center shadow-2xs">
            3
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Property & Location Verification</h3>
            <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-[2px] flex items-center gap-1">
            <CheckCircle2 size={11} className="text-emerald-600" />
            GPS Verified • 1.8 km from branch
          </span>
          <span className="hidden sm:inline text-[10px] text-slate-500 font-medium">
            Geo-tag ID: MTG-GEO-8842
          </span>
        </div>
      </div>

      <div className="p-3.5 space-y-3">
        {/* Address & Valuation Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-[2px] border border-slate-200">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-white rounded-[2px] border border-slate-300 text-slate-700 shrink-0 mt-0.5">
              <Building size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-slate-900">{COLLATERAL_DETAILS.propertyType}</h4>
                <span className="text-[9px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.2 rounded-[2px]">
                  {COLLATERAL_DETAILS.occupancy}
                </span>
                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded-[2px]">
                  {COLLATERAL_DETAILS.legalStatus}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                {COLLATERAL_DETAILS.location} • {COLLATERAL_DETAILS.area}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-2 lg:pt-0 lg:pl-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase">Market Value</span>
              <span className="text-xs font-mono font-bold text-slate-900">GYD {COLLATERAL_DETAILS.marketValue}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-rose-600 uppercase flex items-center gap-0.5">
                <AlertTriangle size={10} /> Assessed LTV
              </span>
              <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded-[2px] border border-rose-200">
                90.28% (Exceeds 75%)
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase">Annual Trend</span>
              <span className="text-xs font-bold text-slate-700">{COLLATERAL_DETAILS.priceTrend}</span>
            </div>
          </div>
        </div>

        {/* Geotagged Property Photos Grid */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">GEOTAGGED PROPERTY INSPECTION PHOTOS (42 SHERIFF STREET)</span>
            <span className="text-[10px] text-[#0B5C9E] hover:underline cursor-pointer font-bold flex items-center gap-0.5">
              Open Map Route <ExternalLink size={10} />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Photo 1 */}
            <div className="rounded-[2px] border border-slate-300 overflow-hidden bg-white flex flex-col">
              <div className="h-24 bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <Building size={28} className="text-white/40" />
                <div className="absolute bottom-1 left-1.5 text-[9px] font-mono text-emerald-300 font-bold bg-black/70 px-1 py-0.2 rounded-[2px]">
                  GPS: 6.8042° N, 58.1488° W
                </div>
              </div>
              <div className="p-1.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-800">42 Sheriff St - Facade</span>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded-[2px]">Verified</span>
              </div>
            </div>

            {/* Photo 2 */}
            <div className="rounded-[2px] border border-slate-300 overflow-hidden bg-white flex flex-col">
              <div className="h-24 bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <Compass size={28} className="text-white/40" />
                <div className="absolute bottom-1 left-1.5 text-[9px] font-mono text-emerald-300 font-bold bg-black/70 px-1 py-0.2 rounded-[2px]">
                  GPS: 6.8044° N, 58.1490° W
                </div>
              </div>
              <div className="p-1.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-800">Apt 3A Elevation</span>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded-[2px]">Verified</span>
              </div>
            </div>

            {/* Photo 3 */}
            <div className="rounded-[2px] border border-slate-300 overflow-hidden bg-white flex flex-col">
              <div className="h-24 bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <MapPin size={28} className="text-white/40" />
                <div className="absolute bottom-1 left-1.5 text-[9px] font-mono text-emerald-300 font-bold bg-black/70 px-1 py-0.2 rounded-[2px]">
                  Boundary 1,450 sqft
                </div>
              </div>
              <div className="p-1.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-800">Perimeter Access</span>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded-[2px]">Verified</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocationCard;
