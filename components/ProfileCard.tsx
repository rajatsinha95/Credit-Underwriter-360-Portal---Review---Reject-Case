import React from 'react';
import { CustomerProfile } from '../types';

interface ProfileCardProps {
  data: CustomerProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col items-center mb-2 shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 mb-1 shadow-inner">
          <img 
            src="https://picsum.photos/200/200?random=1" 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="text-lg font-bold text-gray-800 leading-none">{data.name}</h2>
        <p className="text-[11px] text-gray-500 mt-1">{data.designation}</p>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar space-y-2 pr-1">
        <div className="grid grid-cols-3 gap-2 text-[11px] border-b border-gray-100 pb-1.5">
           <span className="text-gray-400 font-medium">DOB</span>
           <span className="col-span-2 text-gray-700 font-medium text-right">{data.dob}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[11px] border-b border-gray-100 pb-1.5">
           <span className="text-gray-400 font-medium">Mobile</span>
           <span className="col-span-2 text-gray-700 font-medium text-right">{data.mobile}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[11px] border-b border-gray-100 pb-1.5">
           <span className="text-gray-400 font-medium">Email</span>
           <span className="col-span-2 text-gray-700 font-medium text-right truncate">{data.email}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[11px] border-b border-gray-100 pb-1.5">
           <span className="text-gray-400 font-medium">Address</span>
           <span className="col-span-2 text-gray-700 font-medium text-right line-clamp-1">{data.address}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[11px] border-b border-gray-100 pb-1.5">
           <span className="text-gray-400 font-medium">Sourcing</span>
           <span className="col-span-2 text-indigo-600 font-bold text-right">{data.connectionType} - {data.relationshipYears}Y</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[11px] pb-0.5">
           <span className="text-gray-400 font-medium">Conn. status</span>
           <span className="col-span-2 text-blue-600 font-medium text-right">{data.connectionType}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
