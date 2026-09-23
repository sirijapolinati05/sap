import React, { useState } from 'react';
import { Search, ChevronDown, Calendar } from 'lucide-react';
import CashBookForm from '../components/forms/CashBookForm';

const CashBook: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cashbook' | 'expenses'>('expenses');
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 space-y-4 flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-transparent">
        <button 
          onClick={() => setActiveTab('cashbook')}
          className={`px-6 py-1.5 rounded-full shadow-sm font-medium text-sm transition-colors ${
            activeTab === 'cashbook' ? 'bg-[#4a6b93] text-white' : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Cash Book
        </button>
        <button 
          onClick={() => setActiveTab('expenses')}
          className={`px-6 py-1.5 rounded-full shadow-sm font-medium text-sm transition-colors ${
            activeTab === 'expenses' ? 'bg-[#4a6b93] text-white' : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Expenses
        </button>
      </div>

      <div className="flex-1 bg-white rounded shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        
        {activeTab === 'cashbook' ? (
          <>
            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-white">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
                </div>
                <button className="bg-gray-100 px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200">Go</button>
                
                <div className="flex items-center space-x-2 text-sm text-slate-600 ml-4">
                  <span>Rows</span>
                  <select className="border border-gray-300 rounded py-1 px-2 focus:outline-none bg-white">
                    <option>50</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-sm font-medium cursor-pointer text-slate-700">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Data Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-[#2b4c7e] font-bold border-b border-gray-200 bg-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 flex items-center space-x-1">
                      <span>Transaction Date</span>
                      <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                    </th>
                    <th className="px-4 py-3">DR/CR</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Ref ID</th>
                    <th className="px-4 py-3">Note</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Created By</th>
                    <th className="px-4 py-3">Created Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-700">
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
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">{row.date}</td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3 text-right font-medium">{row.amt}</td>
                      <td className="px-4 py-3">{row.source}</td>
                      <td className="px-4 py-3">{row.ref}</td>
                      <td className="px-4 py-3">{row.note}</td>
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3">{row.by}</td>
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
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-white">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600 ml-4">
                <span>Rows</span>
                <select className="border border-gray-300 rounded py-1 px-2 focus:outline-none bg-white">
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>

              <div className="ml-auto">
                <button 
                  onClick={() => setIsAddExpenseModalOpen(true)}
                  className="bg-[#2a2a2a] text-white font-medium text-sm px-4 py-1.5 rounded hover:bg-black transition-colors"
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
