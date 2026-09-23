import React, { useState } from 'react';
import { BarChart, Bar, XAxis as RechartsXAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Printer, Edit, List, Search, ChevronDown, ArrowUp } from 'lucide-react';
import SalesForm from '../components/forms/SalesForm';

const customersData = [
  { title: 'Mr', firstName: 'Adithya', lastName: '', mobile: '+91 9959993095', email: '', orders: 1 },
  { title: 'Mr', firstName: 'Biplav', lastName: '', mobile: '+91 9538412155', email: '', orders: 1 },
  { title: 'Ms', firstName: 'Deepanvitha', lastName: '', mobile: '+91 7205767768', email: '', orders: 1 },
  { title: 'Ms', firstName: 'Hasini', lastName: 'Muthyalapati', mobile: '+91 9866589905', email: '', orders: 1 },
  { title: 'Mr', firstName: 'Jena', lastName: 'P.K', mobile: '+91 7978686701', email: '', orders: 1, bg: 'bg-gray-50' },
  { title: 'Mr', firstName: 'Sdhgsdhn', lastName: 'Dfhdfh', mobile: '+91 7893525665', email: '', orders: 1 },
  { title: 'Mr', firstName: 'Sharbodeb', lastName: '', mobile: '+91 8825291649', email: '', orders: 1 },
  { title: 'Mrs', firstName: 'Subhankar', lastName: 'Linda', mobile: '+91 9547042927', email: '', orders: 1 },
  { title: 'Mr', firstName: 'Uday', lastName: '', mobile: '+91 7702944483', email: '', orders: 0 },
];

const paymentMixData = [
  { name: 'UPI', value: 6000 },
  { name: 'CASH', value: 500 },
];

const Sales: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'customers'>('customers');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('invoices')}
          className={`pb-2 font-medium text-sm px-2 transition-colors ${
            activeTab === 'invoices' ? 'text-slate-800 border-b-2 border-[#54976a]' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Sales Invoices
        </button>
        <button 
          onClick={() => setActiveTab('customers')}
          className={`pb-2 font-medium text-sm px-2 transition-colors ${
            activeTab === 'customers' ? 'text-slate-800 border-b-2 border-[#54976a]' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Customers
        </button>
      </div>

      {activeTab === 'invoices' ? (
        <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#65b98b] text-white p-4 rounded shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">Total Annual Sales</div>
          <div className="text-3xl font-light">7908</div>
        </div>
        
        <div className="bg-[#c2ce64] text-white p-4 rounded shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">Monthly Sales</div>
          <div className="text-3xl font-light">7908</div>
        </div>
        
        <div className="bg-[#5c98ce] text-white p-4 rounded shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">Annual Transactions</div>
          <div className="text-3xl font-light">18</div>
        </div>
        
        <div className="bg-[#dd5c63] text-white p-4 rounded shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">Monthly Transactions</div>
          <div className="text-3xl font-light">18</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Table Area */}
        <div className="flex-1 space-y-4">
          
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" placeholder="Search" className="border-none py-1.5 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="bg-gray-100 px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200">Go</button>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <span>Rows</span>
                <select className="border border-gray-300 rounded py-1 px-2 focus:outline-none">
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm font-medium">
              <span>Actions</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-[#2b4c7e] font-bold border-b border-gray-200 bg-white">
                <tr>
                  <th className="px-4 py-3">Invoice No</th>
                  <th className="px-4 py-3 flex items-center space-x-1">
                    <span>Invoice Date</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                  </th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3 text-right">Total Amount</th>
                  <th className="px-4 py-3">Invoice Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-slate-700">
                {[
                  { id: '0025', date: '21-Sep-2026', customer: 'Adithya', amount: '203', status: 'Paid' },
                  { id: '0024', date: '21-Sep-2026', customer: 'Jena P.K', amount: '530', status: 'Paid' },
                  { id: '0023', date: '21-Sep-2026', customer: 'Srivalli Teja', amount: '718', status: 'Paid' },
                  { id: '0022', date: '16-Sep-2026', customer: 'Sdhgsdhn Dfhdfh', amount: '135', status: 'Cancel' },
                  { id: '0021', date: '16-Sep-2026', customer: 'A Mangamma', amount: '85', status: 'Paid' },
                  { id: '0020', date: '16-Sep-2026', customer: 'Harish', amount: '775', status: 'Paid' },
                  { id: '0019', date: '16-Sep-2026', customer: 'Biplav', amount: '578', status: 'Paid' },
                  { id: '0018', date: '14-Sep-2026', customer: 'Sharbodeb', amount: '604', status: 'Paid' },
                ].map((row, idx) => (
                  <tr key={idx} className="bg-white transition-colors group hover:bg-[#dd7a7a] hover:text-white cursor-pointer">
                    <td className="px-4 py-3 font-medium">{row.id}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.customer}</td>
                    <td className="px-4 py-3 text-right font-medium">{row.amount}</td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-1 rounded w-fit overflow-hidden border transition-colors bg-gray-100 group-hover:bg-white/20 border-gray-200 group-hover:border-white/30">
                        <button className="p-1.5 transition-colors text-slate-600 group-hover:text-white hover:bg-white/30"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 border-l border-r transition-colors border-gray-200 group-hover:border-white/30 text-slate-600 group-hover:text-white hover:bg-white/30"><Printer className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 transition-colors text-slate-600 group-hover:text-white hover:bg-white/30"><List className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-72 space-y-6 flex-shrink-0">
          
          {/* Payment Mix Chart */}
          <div className="bg-white rounded shadow-sm border border-gray-100 p-4">
            <h3 className="text-slate-800 font-medium mb-4">Payment Mix</h3>
            <div className="flex bg-gray-100 p-1 rounded-md text-xs font-medium w-fit mb-6">
              <button className="px-3 py-1 text-slate-600 hover:text-slate-800">This FY</button>
              <button className="px-3 py-1 bg-[#333] text-white rounded shadow-sm">This Month</button>
            </div>
            
            <div className="h-40 w-full relative">
              {/* Fake Y Axis lines */}
              <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6 z-0">
                <div className="border-t border-gray-200 w-full h-0"></div>
                <div className="border-t border-gray-200 w-full h-0"></div>
                <div className="border-t border-gray-200 w-full h-0"></div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentMixData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <RechartsXAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} axisLine={{stroke: '#cbd5e1'}} tickLine={false} />
                  <YAxis tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} ticks={[0, 3000, 6000]} tickFormatter={(val) => val === 0 ? '0' : val.toLocaleString()} />
                  <Bar dataKey="value" barSize={40}>
                    {paymentMixData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'UPI' ? '#4a7a8c' : '#739e9e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top 5 Products */}
          <div className="bg-white rounded shadow-sm border border-gray-100 p-4">
            <div className="flex items-center space-x-2 text-slate-800 font-medium mb-4 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              <h3>Top 5 moving products</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Category</label>
                <select className="w-full border border-gray-300 rounded py-1.5 px-3 text-sm focus:outline-none focus:border-blue-500">
                  <option>Books</option>
                </select>
              </div>
              
              <div className="space-y-4 pt-2">
                {[
                  { name: 'A Call to the Youth of India', value: 4, max: 5, color: 'bg-red-500' },
                  { name: 'Burning Brazier', value: 4, max: 5, color: 'bg-orange-400' },
                  { name: 'Ideal Child', value: 3, max: 5, color: 'bg-amber-300' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="text-slate-500">{item.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${(item.value / item.max) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
      </>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 p-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search" 
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[200px]"
              />
            </div>
            <button className="font-semibold text-sm text-slate-800 hover:text-black">
              Go
            </button>
            
            <div className="flex items-center ml-4 space-x-2">
              <span className="text-sm text-slate-600">Rows</span>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>50</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center ml-4 space-x-1 cursor-pointer hover:bg-gray-200 p-1.5 rounded-md transition-colors">
              <span className="text-sm text-slate-800 font-medium">Actions</span>
              <ChevronDown className="w-4 h-4 text-slate-800" />
            </div>
            
            <div className="ml-auto">
              <button 
                onClick={() => setIsCustomerModalOpen(true)}
                className="font-semibold text-sm text-slate-800 hover:text-black transition-colors"
              >
                Add New Customer
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-[11px] font-bold text-[#1e293b] border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 w-10"></th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3 flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                    <span>First Name</span>
                    <ArrowUp className="w-3 h-3" />
                  </th>
                  <th className="px-4 py-3">Last Name</th>
                  <th className="px-4 py-3">Mobile Number</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">#No Of<br/>Orders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customersData.map((customer, index) => (
                  <tr key={index} className={`${customer.bg || 'bg-white'} text-slate-700 hover:bg-gray-50 transition-colors`}>
                    <td className="px-4 py-3 border-r border-gray-100">
                      <button className="p-1 rounded text-blue-500 hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100">{customer.title}</td>
                    <td className="px-4 py-3 border-r border-gray-100">{customer.firstName}</td>
                    <td className="px-4 py-3 border-r border-gray-100">{customer.lastName}</td>
                    <td className="px-4 py-3 border-r border-gray-100">{customer.mobile}</td>
                    <td className="px-4 py-3 border-r border-gray-100">{customer.email}</td>
                    <td className="px-4 py-3">{customer.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-3 border-t border-gray-200 text-xs font-medium text-slate-600 flex justify-end">
            1 - 9
          </div>
        </div>
      )}

      {/* Customer Modal */}
      <SalesForm 
        isOpen={isCustomerModalOpen} 
        onClose={() => setIsCustomerModalOpen(false)} 
      />
    </div>
  );
};

export default Sales;
