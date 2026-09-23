import React from 'react';
import { X, ChevronDown } from 'lucide-react';

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const VendorForm: React.FC<VendorFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-gray-50 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,1)] border border-gray-300 w-full max-w-3xl flex flex-col overflow-hidden max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-slate-800">Add/Edit Vendor Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 border border-gray-200 rounded p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4 space-y-4 overflow-y-auto">
          <div>
            <input 
              type="text" 
              placeholder="Vendor Name" 
              className="w-full border border-gray-400/60 rounded px-3 py-2 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <input 
              type="text" 
              placeholder="GSTIN" 
              className="w-full border border-gray-400/60 rounded px-3 py-2 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <input 
              type="text" 
              placeholder="Address 1" 
              className="w-full border border-gray-400/60 rounded px-3 py-2 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <input 
              type="text" 
              placeholder="Address 2" 
              className="w-full border border-gray-400/60 rounded px-3 py-2 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <input 
              type="text" 
              placeholder="Address 3" 
              className="w-full border border-gray-400/60 rounded px-3 py-2 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input 
                type="text" 
                placeholder="City" 
                className="w-full border border-gray-400/60 rounded px-3 py-2 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Pincode" 
                className="w-full border border-gray-400/60 rounded px-3 py-2 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">Country</label>
              <select className="w-full border border-gray-400/60 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>--Select--</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-4 pointer-events-none" />
            </div>
            <div className="relative">
              <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">State</label>
              <select className="w-full border border-gray-400/60 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)]  appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>--Select--</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-between">
          <button 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_6px_rgba(0,0,0,0.1)] border border-gray-300 active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
          >
            Cancel
          </button>
          <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#2d525e] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;

