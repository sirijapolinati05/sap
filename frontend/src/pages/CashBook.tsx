import React, { useState } from 'react';
import { Search, ChevronDown, Calendar } from 'lucide-react';
import CashBookForm from '../components/forms/CashBookForm';

const CashBook: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cashbook' | 'expenses'>('cashbook');
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  return (
    <div className="md:space-y-4 flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Tabs */}
      <div className="flex space-x-6 mb-2">
        <button 
          onClick={() => setActiveTab('cashbook')}
          className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
            activeTab === 'cashbook' 
              ? 'bg-[#5a6c8e] text-white shadow-sm border border-[#4a5a75] active:scale-95 active:shadow-sm' 
              : 'text-[#3c7ab7] hover:text-[#2d6195]'
          }`}
        >
          Cash Book
        </button>
        <button 
          onClick={() => setActiveTab('expenses')}
          className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
            activeTab === 'expenses' 
              ? 'bg-[#5a6c8e] text-white shadow-sm border border-[#4a5a75] active:scale-95 active:shadow-sm' 
              : 'text-[#3c7ab7] hover:text-[#2d6195]'
          }`}
        >
          Expenses
        </button>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border-none flex flex-col overflow-hidden mb-2">
        
        {activeTab === 'cashbook' ? (
          <>
            {/* Toolbar */}
            <div className="border-none flex flex-wrap items-center justify-between gap-4 bg-white">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-2">
                  <Search className="w-4 h-4 text-gray-400 ml-2" />
                  <input type="text" placeholder="Search" className="border-none py-2 px-2 text-sm w-48 bg-transparent focus:outline-none" />
                </div>
                <button className="bg-white hover:shadow-sm text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-sm border-none">Go</button>
                
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-sm text-slate-600 font-medium">Rows</span>
                  <select className="appearance-none border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-4 py-1.5 text-sm focus:outline-none">
                    <option>50</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm font-medium bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span className="text-slate-800">Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
            </div>

            {/* Data Table */}
            <div className="flex-1 overflow-auto mx-4 mb-4 shadow-sm bg-white rounded-xl">
              <table className="w-full text-sm text-left whitespace-nowrap border border-gray-300">
                <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 flex items-center space-x-1 border-r border-gray-300">
                      <span>Transaction Date</span>
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                    </th>
                    <th className="px-4 py-3 border-r border-gray-300">DR/CR</th>
                    <th className="px-4 py-3 text-right border-r border-gray-300">Amount</th>
                    <th className="px-4 py-3 border-r border-gray-300">Source</th>
                    <th className="px-4 py-3 border-r border-gray-300">Ref ID</th>
                    <th className="px-4 py-3 border-r border-gray-300">Note</th>
                    <th className="px-4 py-3 border-r border-gray-300">Description</th>
                    <th className="px-4 py-3 border-r border-gray-300">Created By</th>
                    <th className="px-4 py-3">Created Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 text-slate-600">
                  {[
                    { date: '21-Sep-2026', type: 'CR', amt: '203', source: 'SALES', ref: '154876', note: 'UPI', by: 'SILPA', cdate: '21 hours ago' },
                    { date: '21-Sep-2026', type: 'CR', amt: '530', source: 'SALES', ref: '154369', note: 'UPI', by: 'SILPA', cdate: '21 hours ago' },
                    { date: '21-Sep-2026', type: 'CR', amt: '718', source: 'SALES', ref: '153803', note: 'UPI', by: 'SILPA', cdate: '21 hours ago' },
                    { date: '16-Sep-2026', type: 'CR', amt: '578', source: 'SALES', ref: '145894', note: 'UPI', by: 'SILPA', cdate: '6 days ago' },
                    { date: '16-Sep-2026', type: 'CR', amt: '275', source: 'SALES', ref: '148921', note: 'CASH', by: 'SILPA', cdate: '6 days ago' },
                    { date: '16-Sep-2026', type: 'CR', amt: '85', source: 'SALES', ref: '150857', note: 'UPI', by: 'HARSHITHA', cdate: '6 days ago' },
                    { date: '16-Sep-2026', type: 'CR', amt: '135', source: 'SALES', ref: '151425', note: 'UPI', by: 'HARSHITHA', cdate: '6 days ago' },
                    { date: '14-Sep-2026', type: 'CR', amt: '604', source: 'SALES', ref: '144508', note: 'UPI', by: 'SILPA', cdate: '7 days ago' },
                    { date: '14-Sep-2026', type: 'CR', amt: '448', source: 'SALES', ref: '140925', note: 'UPI', by: 'SILPA', cdate: '7 days ago' },
                    { date: '13-Sep-2026', type: 'CR', amt: '66', source: 'SALES', ref: '136703', note: 'UPI', by: 'SILPA', cdate: '8 days ago' },
                    { date: '12-Sep-2026', type: 'CR', amt: '720', source: 'SALES', ref: '132843', note: 'UPI', by: 'SILPA', cdate: '9 days ago' },
                    { date: '12-Sep-2026', type: 'CR', amt: '855', source: 'SALES', ref: '135180', note: 'UPI', by: 'SILPA', cdate: '9 days ago' },
                  ].map((row, idx) => (
                    <tr key={idx} className="bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors">
                      <td className="px-4 py-3 border-r border-gray-300">{row.date}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.type}</td>
                      <td className="px-4 py-3 text-right font-medium border-r border-gray-300">{row.amt}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.source}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.ref}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.note}</td>
                      <td className="px-4 py-3 border-r border-gray-300"></td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.by}</td>
                      <td className="px-4 py-3">{row.cdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {/* Expenses Toolbar */}
            <div className="border-none flex flex-wrap items-center gap-4 bg-white">
              <div className="flex items-center space-x-2 border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-2">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input type="text" placeholder="Search" className="border-none py-2 px-2 text-sm w-48 bg-transparent focus:outline-none" />
              </div>
              <button className="bg-white hover:shadow-sm text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-sm border-none">Go</button>
              
              <div className="flex items-center space-x-2 ml-4">
                <span className="text-sm text-slate-600 font-medium">Rows</span>
                <select className="appearance-none border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-4 py-1.5 text-sm focus:outline-none">
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-sm font-medium ml-4 bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span className="text-slate-800">Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>

              <div className="ml-auto">
                <button 
                  onClick={() => setIsAddExpenseModalOpen(true)}
                  className="bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none"
                >
                  Create
                </button>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 pb-20">
              <Search className="w-12 h-12 mb-2 text-gray-300" strokeWidth={1} />
              <p className="text-sm">No data found.</p>
            </div>
          </>
        )}
      </div>

      {/* Add Expense Modal */}
      <CashBookForm 
        isOpen={isAddExpenseModalOpen} 
        onClose={() => setIsAddExpenseModalOpen(false)} 
      />

    </div>
  );
};

export default CashBook;
