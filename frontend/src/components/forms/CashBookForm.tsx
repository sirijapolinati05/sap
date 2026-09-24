import React from 'react';
import { X, ChevronDown, Calendar } from 'lucide-react';

interface CashBookFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CashBookForm: React.FC<CashBookFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4">
      <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 w-full max-w-4xl flex flex-col h-[650px] max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-slate-800">Add/Edit Expense</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto bg-white">
          <div className="space-y-6 max-w-4xl">
            
            {/* Voucher No */}
            <div className="relative">
              <input type="text" placeholder="Voucher No" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
            </div>

            {/* Ref Vendor/Customer */}
            <div className="relative">
              <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500 font-medium z-10">Ref Vendor/Customer</label>
              <select className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-sm ">
                <option>--Select--</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>
            
            {/* Expense Type */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 z-10 rounded-tl-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
              <select className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-sm ">
                <option>Expense Type</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expense Date */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 z-10 rounded-tl-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500 font-medium z-10">Expense Date</label>
                <div className="flex w-full">
                  <input type="text" defaultValue="22-Sep-2026" className="w-full border border-gray-400/60 border-r-0 rounded-l-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
                  <div className="border border-gray-300 bg-gray-100 rounded-r-md px-3 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
              
              {/* Amount */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 z-10 rounded-tl-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                <input type="text" placeholder="Amount" className="w-full border border-gray-400/60 rounded-md py-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm " />
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-2">Payment Mode</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="radio" name="payment_mode" className="w-4 h-4 text-slate-800 focus:ring-slate-800" />
                  <span className="text-sm text-slate-800 font-medium">UPI</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="radio" name="payment_mode" defaultChecked className="w-4 h-4 text-slate-800 focus:ring-slate-800" />
                  <span className="text-sm text-slate-800 font-medium">Cash</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="radio" name="payment_mode" className="w-4 h-4 text-slate-800 focus:ring-slate-800" />
                  <span className="text-sm text-slate-800 font-medium">Cheque</span>
                </label>
              </div>
            </div>

            <div className="text-right text-xs text-gray-400 mt-8 mb-1">
              Required
            </div>
            
            {/* Note */}
            <div className="relative">
              <label className="absolute top-2 left-3 text-[11px] text-gray-500 font-medium z-10">Note</label>
              <textarea 
                placeholder="Add note regarding the expense" 
                className="w-full border border-gray-400/60 rounded-md pt-7 pb-3 px-3 text-sm bg-white focus:outline-none focus:border-blue-500 shadow-sm  resize-none h-32"
              ></textarea>
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
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashBookForm;
