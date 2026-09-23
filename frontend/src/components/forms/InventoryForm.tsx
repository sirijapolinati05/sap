import React from 'react';
import { X, ChevronDown, Minus } from 'lucide-react';

interface InventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div className="bg-gray-50 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,1)] border border-gray-300 w-full max-w-4xl flex flex-col h-[650px] max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-slate-800">Add/Edit Items</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto bg-white">
          <div className="space-y-6 max-w-4xl">
            
            {/* Category */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 z-10 rounded-tl-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
              <select className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] ">
                <option>Category</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>
            
            {/* Item Name/Title */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 z-10 rounded-tl-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
              <input type="text" placeholder="Item Name/Title" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] " />
            </div>
            
            {/* Item Description/Subtitle */}
            <div className="relative">
              <input type="text" placeholder="Item Description/Subtitle" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] " />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Item Code */}
              <div className="relative">
                <input type="text" placeholder="Item Code" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] " />
              </div>
              
              {/* HSN/SAC */}
              <div className="relative">
                <input type="text" placeholder="HSN/SAC" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] " />
              </div>
              
              {/* Reorder Quantity */}
              <div className="relative">
                <input type="text" placeholder="Reorder Quantity" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] " />
              </div>
              
              {/* Tags */}
              <div className="relative">
                <select className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] ">
                  <option>Tags</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>
            
            {/* Status Toggle */}
            <div>
              <label className="text-[11px] text-gray-500 font-medium block mb-1">Status</label>
              <div className="w-10 h-5 bg-[#3a8697] rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Pricing Info Section */}
            <div className="pt-2">
              <div className="flex items-center space-x-2 font-semibold text-slate-800 mb-4">
                <Minus className="w-4 h-4" />
                <span>Pricing Info</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:pl-6">
                {/* UoM */}
                <div className="relative">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500 font-medium z-10">UoM</label>
                  <select className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] ">
                    <option>--Select--</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
                
                {/* Purchase Price */}
                <div className="relative">
                  <input type="text" placeholder="Purchase Price" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] " />
                </div>
                
                {/* MRP */}
                <div className="relative">
                  <input type="text" placeholder="MRP" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] " />
                </div>
                
                {/* Sales Price */}
                <div className="relative">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 z-10 rounded-tl-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                  <input type="text" placeholder="Sales Price" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] " />
                </div>
                
                {/* Tax */}
                <div className="relative md:col-span-2 mt-2">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500 font-medium z-10">Tax</label>
                  <select className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] ">
                    <option>--Select--</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Item Image Section */}
            <div className="pt-2">
              <label className="text-[11px] text-gray-500 font-medium block mb-1">Item Image</label>
              <div className="border border-dashed border-gray-300 rounded-md p-3 flex items-center bg-white shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,1)] border border-gray-400/60">
                <span className="bg-white border border-gray-200 px-3 py-1.5 text-sm rounded shadow-sm cursor-pointer hover:bg-gray-50 transition-colors text-slate-700">Choose File</span>
              </div>
            </div>

          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between rounded-b-lg mt-auto">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-slate-700 font-bold text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-[#2a2a2a] text-white font-bold text-sm rounded hover:bg-black transition-colors">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
