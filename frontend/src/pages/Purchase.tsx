import React, { useState, useEffect } from 'react';
import { Search, Search as SearchIcon, Edit, ChevronDown, Calendar, CalendarDays, ArrowRight, Check, Plus, AlertCircle, ShoppingCart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import VendorForm from '../components/forms/VendorForm';

type Tab = 'dashboard' | 'vendors' | 'po' | 'invoice' | 'add-purchase' | 'add-invoice';

const vendorsData = [
  { name: 'Auroshikha', gstin: '', addr1: '', addr2: '', addr3: '', city: '', pin: '', state: '', country: '' },
  { name: 'Collage', gstin: '', addr1: '', addr2: '', addr3: '', city: '', pin: '', state: '', country: '' },
  { name: 'SABDA', gstin: '', addr1: '', addr2: '', addr3: '', city: 'PUDUCHERRY', pin: '', state: '', country: '' },
];

const Purchase: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as Tab) || 'dashboard';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab') as Tab;
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const renderTab = () => {
    switch(activeTab) {
      case 'vendors':
        return (
          <div className="bg-white rounded-xl shadow-sm border-none overflow-hidden flex flex-col min-h-[500px]">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-4 border-none bg-white">
              <div className="flex items-center space-x-2 border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-2">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="border-none bg-transparent py-2 px-2 text-sm focus:outline-none min-w-[200px]"
                />
              </div>
              <button className="bg-white hover:shadow-sm text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-sm border-none">
                Go
              </button>
              
              <div className="flex items-center ml-4 space-x-2">
                <span className="text-sm text-slate-600 font-medium">Rows</span>
                <div className="relative">
                  <select className="appearance-none border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-4 py-1.5 pr-8 text-sm focus:outline-none">
                    <option>50</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center ml-4 space-x-2 text-sm font-medium bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span className="text-slate-800">Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <div className="ml-auto">
                <button 
                  onClick={() => setIsVendorModalOpen(true)}
                  className="bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none"
                >
                  Create
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto flex-1 mx-4 mb-4 shadow-sm bg-white rounded-xl">
              <table className="w-full text-sm text-left whitespace-nowrap border border-gray-300">
                <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 w-10 border-r border-gray-300"></th>
                    <th className="px-4 py-3 border-r border-gray-300">Vendor Name</th>
                    <th className="px-4 py-3 border-r border-gray-300">GSTIN</th>
                    <th className="px-4 py-3 border-r border-gray-300">Address 1</th>
                    <th className="px-4 py-3 border-r border-gray-300">Address 2</th>
                    <th className="px-4 py-3 border-r border-gray-300">Address 3</th>
                    <th className="px-4 py-3 border-r border-gray-300">City</th>
                    <th className="px-4 py-3 border-r border-gray-300">Pincode</th>
                    <th className="px-4 py-3 border-r border-gray-300">State</th>
                    <th className="px-4 py-3">Country</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {vendorsData.map((vendor, index) => (
                    <tr key={index} className="bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors text-slate-600">
                      <td className="px-4 py-3 border-r border-gray-300">
                        <button className="p-1.5 rounded-md bg-white shadow-sm hover:shadow-sm text-blue-500">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">{vendor.name}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{vendor.gstin}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{vendor.addr1}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{vendor.addr2}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{vendor.addr3}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{vendor.city}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{vendor.pin}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{vendor.state}</td>
                      <td className="px-4 py-3">{vendor.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mx-4 mb-4 rounded-xl shadow-sm text-xs font-semibold text-slate-600 flex justify-end">
              1 - 3
            </div>
          </div>
        );
      case 'invoice':
        return (
          <div className="bg-white rounded-xl shadow-sm border-none overflow-hidden flex flex-col min-h-[500px]">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-4 border-none bg-white">
              <div className="flex items-center space-x-2 border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-2">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="border-none bg-transparent py-2 px-2 text-sm focus:outline-none min-w-[200px]"
                />
              </div>
              <button className="bg-white hover:shadow-sm text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-sm border-none">
                Go
              </button>
              
              <div className="flex items-center ml-4 space-x-2 text-sm font-medium bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span className="text-slate-800">Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <div className="ml-auto">
                <button 
                  onClick={() => setActiveTab('add-invoice')}
                  className="bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none"
                >
                  Add New
                </button>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <SearchIcon className="w-10 h-10 mb-2 opacity-50" />
              <p className="text-sm">No GRN/Purchase Invoice has been created yet.</p>
            </div>
          </div>
        );
      case 'po':
        return (
          <div className="bg-white rounded-xl shadow-sm border-none overflow-hidden flex flex-col min-h-[500px]">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-4 border-none bg-white">
              <div className="flex items-center space-x-2 border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-2">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="border-none bg-transparent py-2 px-2 text-sm focus:outline-none min-w-[200px]"
                />
              </div>
              <button className="bg-white hover:shadow-sm text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-sm border-none">
                Go
              </button>
              
              <div className="flex items-center ml-4 space-x-2">
                <span className="text-sm text-slate-600 font-medium">Rows</span>
                <div className="relative">
                  <select className="appearance-none border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-4 py-1.5 pr-8 text-sm focus:outline-none">
                    <option>50</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center ml-4 space-x-2 text-sm font-medium bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span className="text-slate-800">Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <div className="ml-auto">
                <button 
                  onClick={() => setActiveTab('add-purchase')}
                  className="bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none"
                >
                  Add Purchase
                </button>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <SearchIcon className="w-10 h-10 mb-2 opacity-50" />
              <p className="text-sm">No data found.</p>
            </div>
          </div>
        );
      case 'add-purchase':
        return (
          <div className="bg-white min-h-[500px] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-[#3b5998] font-medium text-sm mb-1">Purchase Order List \</div>
                <h2 className="text-xl font-bold text-slate-800">Add/Edit Purchase Details</h2>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setActiveTab('po')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">
                  Create
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">Purchase Date</label>
                  <input 
                    type="text" 
                    defaultValue="22-Sep-2026"
                    className="w-full border border-gray-300 border-l-4 border-l-red-500 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="absolute right-0 top-0 bottom-0 bg-gray-100 border-l border-gray-300 rounded-r flex items-center justify-center px-3">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">Purchase Number</label>
                  <input 
                    type="text" 
                    defaultValue="2"
                    className="w-full border border-gray-300 border-l-4 border-l-red-500 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="relative mb-2">
                <select className="w-full border border-gray-300 border-l-4 border-l-red-500 rounded px-3 py-3 text-sm bg-slate-50 shadow-inner appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Vendor</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-4 pointer-events-none" />
                <div className="absolute right-0 -bottom-5 text-[10px] text-gray-400">Required</div>
              </div>
            </div>

            {/* Data Table Section */}
            <div className="bg-white rounded-xl shadow-sm border-none overflow-hidden flex flex-col flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-4 border-none bg-white">
                <div className="flex items-center space-x-2 border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-2">
                  <Search className="w-4 h-4 text-gray-400 ml-2" />
                  <input 
                    type="text" 
                    placeholder="Search: All Text Columns" 
                    className="border-none bg-transparent py-2 px-2 text-sm focus:outline-none min-w-[200px]"
                  />
                </div>
                <button className="bg-white hover:shadow-sm text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-sm border-none">Go</button>
                <div className="flex items-center space-x-2 text-sm font-medium bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer ml-4">
                  <span className="text-slate-800">Actions</span>
                  <ChevronDown className="w-4 h-4 text-slate-800" />
                </div>
                <button className="bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none">Edit</button>
                <button className="bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none">Add Row</button>
                <div className="ml-auto flex items-center text-gray-500 cursor-pointer hover:text-gray-700 transition-colors bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm border-none">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  <span>Reset</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mx-4 mb-4 shadow-sm bg-white rounded-xl">
                <table className="w-full text-sm text-left whitespace-nowrap border border-gray-300">
                  <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                    <tr>
                      <th className="px-4 py-3 w-10 border-r border-gray-300">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                      </th>
                      <th className="px-2 py-3 w-10 border-r border-gray-300"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></th>
                      <th className="px-4 py-3 border-r border-gray-300">Item</th>
                      <th className="px-4 py-3 text-right border-r border-gray-300">Quantity</th>
                      <th className="px-4 py-3 text-right border-r border-gray-300">Purchase Price</th>
                      <th className="px-4 py-3 text-right">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr className="bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors text-slate-600">
                      <td className="px-4 py-3 border-r border-gray-300">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                      </td>
                      <td className="px-2 py-3 border-r border-gray-300"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></td>
                      <td className="px-4 py-3 border-r border-gray-300 text-gray-500">--Select--</td>
                      <td className="px-4 py-3 border-r border-gray-300 text-right"></td>
                      <td className="px-4 py-3 border-r border-gray-300 text-right"></td>
                      <td className="px-4 py-3 text-right"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mx-4 mb-4 rounded-xl shadow-sm text-xs font-semibold text-slate-600 flex justify-between items-center bg-white mt-auto">
                <span>1 rows selected</span>
                <span className="font-semibold text-slate-800">Total 1</span>
              </div>
            </div>
          </div>
        );
      case 'add-invoice':
        return (
          <div className="bg-white min-h-[500px] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-[#3b5998] font-medium text-sm mb-1">Purchase Invoice List \</div>
                <h2 className="text-xl font-bold text-slate-800">Add/Edit Purchase Invoice</h2>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setActiveTab('invoice')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">
                  Save
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">PO No</label>
                  <select className="w-full border border-gray-300 border-l-4 border-l-red-500 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 shadow-inner appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>--Select PO --</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-4 pointer-events-none" />
                </div>
                
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    placeholder="Vendor Sales Invoice No"
                    className="w-full border border-gray-300 rounded px-3 py-3 text-sm bg-slate-50 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">GRN/Purchase Invoice No</label>
                  <input 
                    type="text" 
                    defaultValue="2026-27/1"
                    className="w-full border border-gray-300 border-l-4 border-l-red-500 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div className="relative">
                  <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">GRN/Purchase Invoice Date</label>
                  <input 
                    type="text" 
                    defaultValue="22-Sep-2026"
                    className="w-full border border-gray-300 border-l-4 border-l-red-500 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="absolute right-0 top-0 bottom-0 bg-gray-100 border-l border-gray-300 rounded-r flex items-center justify-center px-3">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <select className="w-full border border-gray-300 border-l-4 border-l-red-500 rounded px-3 py-3 text-sm bg-slate-50 shadow-inner appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Vendor</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-4 pointer-events-none" />
              </div>
            </div>

            {/* Data Table Section */}
            <div className="bg-white rounded-xl shadow-sm border-none overflow-hidden flex flex-col flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-4 border-none bg-white">
                <div className="flex items-center space-x-2 border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 px-2">
                  <Search className="w-4 h-4 text-gray-400 ml-2" />
                  <input 
                    type="text" 
                    placeholder="Search: All Text Columns" 
                    className="border-none bg-transparent py-2 px-2 text-sm focus:outline-none min-w-[200px]"
                  />
                </div>
                <button className="bg-white hover:shadow-sm text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-sm border-none">Go</button>
                <div className="flex items-center space-x-2 text-sm font-medium bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer ml-4">
                  <span className="text-slate-800">Actions</span>
                  <ChevronDown className="w-4 h-4 text-slate-800" />
                </div>
                <button className="bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none">Edit</button>
                <button className="bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none">Add Row</button>
                <div className="ml-auto flex items-center text-gray-500 cursor-pointer hover:text-gray-700 transition-colors bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg font-semibold text-sm border-none">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  <span>Reset</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mx-4 mb-4 shadow-sm bg-white rounded-xl">
                <table className="w-full text-sm text-left whitespace-nowrap border border-gray-300">
                  <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                    <tr>
                      <th className="px-4 py-3 w-10 border-r border-gray-300">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                      </th>
                      <th className="px-2 py-3 w-10 border-r border-gray-300"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></th>
                      <th className="px-4 py-3 border-r border-gray-300">Item Name</th>
                      <th className="px-4 py-3 text-right border-r border-gray-300">Quantity</th>
                      <th className="px-4 py-3 text-right border-r border-gray-300">MRP</th>
                      <th className="px-4 py-3 text-right border-r border-gray-300">Purchase<br/>Price</th>
                      <th className="px-4 py-3 text-right border-r border-gray-300">Discount<br/>Type</th>
                      <th className="px-4 py-3 text-right border-r border-gray-300">Discount<br/>Value</th>
                      <th className="px-4 py-3 text-right border-r border-gray-300">Net Price</th>
                      <th className="px-4 py-3 text-right border-r border-gray-300">Tax</th>
                      <th className="px-4 py-3 text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr className="bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors text-slate-600">
                      <td className="px-4 py-3 border-r border-gray-300">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                      </td>
                      <td className="px-2 py-3 border-r border-gray-300"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></td>
                      <td className="px-4 py-3 border-r border-gray-300 text-gray-500">--Select--</td>
                      <td className="px-4 py-3 border-r border-gray-300 text-right"></td>
                      <td className="px-4 py-3 border-r border-gray-300 text-right"></td>
                      <td className="px-4 py-3 border-r border-gray-300 text-right"></td>
                      <td className="px-4 py-3 border-r border-gray-300 text-right">P</td>
                      <td className="px-4 py-3 border-r border-gray-300 text-right"></td>
                      <td className="px-4 py-3 border-r border-gray-300 text-right"></td>
                      <td className="px-4 py-3 border-r border-gray-300 text-gray-500 text-right">--Select--</td>
                      <td className="px-4 py-3 text-right"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mx-4 mb-4 rounded-xl shadow-sm text-xs font-semibold text-slate-600 flex justify-between items-center bg-white mt-auto">
                <span>1 rows selected</span>
                <span className="font-semibold text-slate-800">Total 1</span>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="w-full space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-end mb-8 mt-2">
              <div>
                <h3 className="text-[#c39b5b] font-bold text-[11px] tracking-[0.2em] uppercase mb-3">Purchasing Overview</h3>
                <h1 className="text-[32px] font-serif text-[#0c3f50] font-bold tracking-tight">Good morning, Mrs Sharada Attili</h1>
                <p className="text-slate-500 mt-1 font-medium text-[15px]">Manage your vendors and procurements.</p>
              </div>
              <div className="flex items-center text-slate-500 font-medium text-[15px] pb-1">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* Banner */}
            <div className="bg-[#fef9e8] border border-[#f3e5c4] rounded-xl p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 bg-[#f7eacc] rounded-xl flex items-center justify-center text-[#c98330]">
                   <ShoppingCart className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-[#0c3f50] font-bold text-[16px]">5 Purchase Orders pending approval</h3>
                  <p className="text-slate-500 text-[14px] mt-0.5">Review and approve these POs before the deadline.</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('po')}
                className="flex items-center text-[#a17223] font-bold text-[14px] hover:text-[#8a5d1b] transition-colors group">
                View POs <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="space-y-6">
                
                {/* Pending POs Card */}
                <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden flex flex-col">
                  <div className="px-6 py-5 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center space-x-3 text-[#0c3f50]">
                      <ShoppingCart className="w-[22px] h-[22px] stroke-[1.5]" />
                      <h2 className="text-[19px] font-serif font-bold">Recent POs</h2>
                    </div>
                    <div className="bg-[#fdf4e8] text-[#c98330] px-3 py-1 rounded-full text-[12px] font-bold">5 pending</div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                      <ShoppingCart className="w-10 h-10 mb-3 stroke-[1]" />
                      <p className="text-sm font-medium text-slate-600">No recent POs</p>
                      <p className="text-xs mt-1 text-center">Your recent purchase orders will appear here.</p>
                    </div>
                  </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden flex flex-col">
                  <div className="px-6 py-5 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center space-x-3 text-[#0c3f50]">
                      <AlertCircle className="w-[22px] h-[22px] stroke-[1.5]" />
                      <h2 className="text-[19px] font-serif font-bold">Low Stock Alerts</h2>
                    </div>
                    <div className="bg-[#e8f1ec] text-[#1b5e40] px-3 py-1 rounded-full text-[12px] font-bold">3 items</div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                      <AlertCircle className="w-10 h-10 mb-3 stroke-[1]" />
                      <p className="text-sm font-medium text-slate-600">No low stock items</p>
                      <p className="text-xs mt-1 text-center">Items that fall below their reorder level will be listed here.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* My Tasks Card */}
                <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden h-[240px] flex flex-col">
                  <div className="px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-[#0c3f50]">
                      <Check className="w-[22px] h-[22px] stroke-[2] p-[1px] border-2 border-current rounded-md" />
                      <h2 className="text-[19px] font-serif font-bold">My tasks</h2>
                    </div>
                    <button className="flex items-center space-x-1.5 border border-[#cbe1d8] bg-[#f2f9f6] text-[#1b5e40] hover:bg-[#e6f4ed] transition-colors px-3 py-1.5 rounded-lg text-[13px] font-bold shadow-sm">
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Add task</span>
                    </button>
                  </div>
                  
                  <div className="flex-1 flex flex-col border-t border-gray-50 mx-6 py-4 overflow-y-auto">
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <Check className="w-6 h-6 stroke-[2] mb-2" />
                      <p className="text-sm font-medium text-slate-600">No tasks to display</p>
                      <p className="text-xs mt-1">Add a task to keep your next action visible.</p>
                    </div>
                  </div>
                </div>

                {/* Top Vendors Card */}
                <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden h-[280px] flex flex-col">
                  <div className="px-6 py-5 flex items-center space-x-3 text-[#0c3f50]">
                    <Check className="w-[22px] h-[22px] stroke-[1.5]" />
                    <h2 className="text-[19px] font-serif font-bold">Top Vendors</h2>
                  </div>
                  <div className="px-6 pb-2 text-slate-500 text-[13px] -mt-1">
                    Current month
                  </div>
                  <div className="flex-1 flex flex-col mx-6 border-t border-gray-50">
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <Check className="w-6 h-6 stroke-[1.5] mb-2" />
                      <p className="text-sm font-medium text-slate-600">No vendor ranking shown</p>
                      <p className="text-xs mt-1 text-center">Monthly vendor records will be listed here when available.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 bg-white min-h-[500px] border border-gray-100 rounded-lg shadow-sm flex flex-col items-center justify-center text-slate-400">
            <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content (Pending)</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Tabs - Only show when not in add-purchase or add-invoice view */}
      {activeTab !== 'add-purchase' && activeTab !== 'add-invoice' && (
        <div className="flex space-x-6 mb-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
              activeTab === 'dashboard' 
                ? 'bg-[#5a6c8e] text-white shadow-sm border border-[#4a5a75] active:scale-95 active:shadow-sm' 
                : 'text-[#3c7ab7] hover:text-[#2d6195]'
            }`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('vendors')}
            className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
              activeTab === 'vendors' 
                ? 'bg-[#5a6c8e] text-white shadow-sm border border-[#4a5a75] active:scale-95 active:shadow-sm' 
                : 'text-[#3c7ab7] hover:text-[#2d6195]'
            }`}
          >
            Vendors
          </button>
          <button 
            onClick={() => setActiveTab('po')}
            className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
              activeTab === 'po' 
                ? 'bg-[#5a6c8e] text-white shadow-sm border border-[#4a5a75] active:scale-95 active:shadow-sm' 
                : 'text-[#3c7ab7] hover:text-[#2d6195]'
            }`}
          >
            PO List
          </button>
          <button 
            onClick={() => setActiveTab('invoice')}
            className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
              activeTab === 'invoice' 
                ? 'bg-[#5a6c8e] text-white shadow-sm border border-[#4a5a75] active:scale-95 active:shadow-sm' 
                : 'text-[#3c7ab7] hover:text-[#2d6195]'
            }`}
          >
            Purchase Invoice/GRN
          </button>
        </div>
      )}

      {renderTab()}

      {/* Vendor Modal */}
      <VendorForm 
        isOpen={isVendorModalOpen} 
        onClose={() => setIsVendorModalOpen(false)} 
      />
    </div>
  );
};

export default Purchase;
