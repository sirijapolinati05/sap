import React from 'react';
import { X, ChevronDown } from 'lucide-react';

interface SalesFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalesForm: React.FC<SalesFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div className="bg-gray-50 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,1)] border border-gray-300 w-full max-w-4xl flex flex-col h-[600px] max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-slate-800">Add/Edit Customer Info</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 flex-1 overflow-y-auto bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-3xl">
            {/* Title */}
            <div className="md:col-span-3">
              <div className="relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500 font-medium z-10">Title</label>
                <select className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:border-blue-500">
                  <option>--Select--</option>
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>
            
            {/* First Name */}
            <div className="md:col-span-4">
              <div className="relative">
                <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-red-500 rounded-l-md z-10"></div>
                <input type="text" placeholder="First Name" className="w-full border border-gray-400/60 border-l-0 rounded-md rounded-l-none py-3 px-3 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:border-blue-500" />
              </div>
              <div className="text-[10px] text-gray-400 text-right mt-1">Required</div>
            </div>
            
            {/* Last Name */}
            <div className="md:col-span-5">
              <div className="relative">
                <input type="text" placeholder="Last Name" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* ISD Code */}
            <div className="md:col-span-3">
              <div className="relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500 font-medium z-10">Isd Code</label>
                <select className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:border-blue-500">
                  <option>+ 91(India)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>
            
            {/* Mobile Number */}
            <div className="md:col-span-9">
              <div className="relative">
                <input type="text" placeholder="Mobile Number" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            
            {/* Email */}
            <div className="md:col-span-12">
              <div className="relative">
                <input type="email" placeholder="Email" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-slate-700 font-bold text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-[#2a2a2a] text-white font-bold text-sm rounded hover:bg-black transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;
