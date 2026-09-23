import React, { useState, useEffect } from 'react';
import { Settings, Moon, BarChart2, Star, CheckSquare, Edit, Menu, Image as ImageIcon, Search, ChevronDown, Filter, ArrowUp, X } from 'lucide-react';
import InventoryForm from '../components/forms/InventoryForm';

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'products' | 'categories' | 'opening-stock'>('summary');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/inventory')
      .then(res => res.json())
      .then(data => setInventoryItems(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-4 flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Tabs */}
      <div className="flex space-x-6 mb-2">
        <button 
          onClick={() => setActiveTab('summary')}
          className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
            activeTab === 'summary' 
              ? 'bg-[#5a6c8e] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#4a5a75] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]' 
              : 'text-[#3c7ab7] hover:text-[#2d6195]'
          }`}
        >
          Inventory Summary
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
            activeTab === 'products' 
              ? 'bg-[#5a6c8e] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#4a5a75] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]' 
              : 'text-[#3c7ab7] hover:text-[#2d6195]'
          }`}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
            activeTab === 'categories' 
              ? 'bg-[#5a6c8e] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#4a5a75] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]' 
              : 'text-[#3c7ab7] hover:text-[#2d6195]'
          }`}
        >
          Categories
        </button>
        <button 
          onClick={() => setActiveTab('opening-stock')}
          className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
            activeTab === 'opening-stock' 
              ? 'bg-[#5a6c8e] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#4a5a75] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]' 
              : 'text-[#3c7ab7] hover:text-[#2d6195]'
          }`}
        >
          Opening Stock - Update
        </button>
      </div>

      <div className="flex-1 bg-[#f0f0f3] rounded-xl shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] border-none flex flex-col overflow-hidden mb-2">
        
        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
          <>
            <div className="p-4 border-none flex flex-wrap items-center gap-4 bg-[#f0f0f3]">
              <div className="flex items-center space-x-2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg px-2">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input type="text" placeholder="Search" className="border-none py-2 px-2 text-sm w-40 bg-transparent focus:outline-none" />
              </div>
              <button className="bg-[#f0f0f3] hover:shadow-[inset_2px_2px_5px_#cbced1,inset_-2px_-2px_5px_#ffffff] text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] border-none">Go</button>
              
              <select className="appearance-none border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg py-2 px-4 text-sm focus:outline-none min-w-[150px]">
                <option>1. Primary Report</option>
              </select>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600 ml-4">
                <span>Rows</span>
                <select className="appearance-none border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg px-4 py-1.5 text-sm focus:outline-none">
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-sm font-medium ml-4 bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span className="text-slate-800">Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
            </div>

            <div className="px-4 py-3 bg-[#f0f0f3] border-none flex items-center space-x-3 mb-2 mx-4 rounded-xl shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]">
              <Filter className="w-4 h-4 text-slate-600" />
              <div className="flex items-center space-x-1 border-none bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] rounded-lg overflow-hidden">
                <div className="px-2 py-1 bg-transparent border-r border-gray-300"><CheckSquare className="w-3.5 h-3.5 text-green-600" /></div>
                <div className="px-2 py-1 flex items-center space-x-1 text-xs font-medium bg-transparent">
                  <Star className="w-3 h-3 text-slate-500" />
                  <span className="bg-[#cd7579] text-white px-2 py-0.5 rounded text-[10px] uppercase shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">Critical Stock</span>
                </div>
                <button className="px-2 py-1 hover:shadow-[inset_1px_1px_3px_#cbced1,inset_-1px_-1px_3px_#ffffff] border-l border-gray-300 bg-transparent transition-all"><X className="w-3.5 h-3.5 text-slate-500" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-auto mx-4 mb-4 p-4 shadow-[inset_5px_5px_10px_#cbced1,inset_-5px_-5px_10px_#ffffff] bg-[#f0f0f3] rounded-xl">
              <table className="w-full text-sm text-left whitespace-nowrap border border-gray-300">
                <thead className="text-xs text-gray-500 font-bold border-b border-gray-300 bg-transparent uppercase tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 border-r border-gray-300">Category Name</th>
                    <th className="px-4 py-3 flex items-center space-x-1 border-r border-gray-300">
                      <span>Item name</span>
                      <ArrowUp className="w-3 h-3 text-gray-400" />
                    </th>
                    <th className="px-4 py-3 text-right border-r border-gray-300">Stock In</th>
                    <th className="px-4 py-3 text-right border-r border-gray-300">Stock Out</th>
                    <th className="px-4 py-3 text-right border-r border-gray-300">Stock Balance</th>
                    <th className="px-4 py-3 text-right border-r border-gray-300">Reorder Qty</th>
                    <th className="px-4 py-3 text-center">Manage<br/>Inventory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 text-slate-600">
                  {inventoryItems.map((row, idx) => (
                    <tr key={idx} className="bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors">
                      <td className="px-4 py-3 border-r border-gray-300">{row.item_category}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.item_name}</td>
                      <td className="px-4 py-3 text-right border-r border-gray-300">{row.opening_qty || 0}</td>
                      <td className="px-4 py-3 text-right border-r border-gray-300">0</td>
                      <td className="px-4 py-3 text-right font-medium border-r border-gray-300">{row.opening_qty || 0}</td>
                      <td className="px-4 py-3 text-right border-r border-gray-300">{row.reorder_level || 0}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center space-x-1.5">
                          <button className="p-1.5 rounded-lg bg-[#f0f0f3] shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] text-slate-600 transition-all border-none"><Settings className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 rounded-lg bg-[#f0f0f3] shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] text-slate-600 transition-all border-none"><Moon className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 rounded-lg bg-[#f0f0f3] shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] text-slate-600 transition-all border-none"><BarChart2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <>
            <div className="p-4 border-none flex flex-wrap items-center gap-4 bg-[#f0f0f3]">
              <div className="flex items-center space-x-2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg px-2">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input type="text" placeholder="Search" className="border-none py-2 px-2 text-sm w-40 bg-transparent focus:outline-none" />
              </div>
              <button className="bg-[#f0f0f3] hover:shadow-[inset_2px_2px_5px_#cbced1,inset_-2px_-2px_5px_#ffffff] text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] border-none">Go</button>
              
              <div className="flex space-x-2 border-none bg-[#f0f0f3] p-1 rounded-lg shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]">
                <button className="px-3 py-1 bg-[#5a6c8e] text-white rounded-md shadow-sm transition-all text-sm font-medium border-none"><Settings className="w-4 h-4" /></button>
                <button className="px-3 py-1 hover:bg-[#d5d5d5] rounded-md transition-all text-slate-600 border-none"><BarChart2 className="w-4 h-4" /></button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600 ml-4">
                <span>Rows</span>
                <select className="appearance-none border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg px-4 py-1.5 text-sm focus:outline-none">
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-sm font-medium ml-4 bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span className="text-slate-800">Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>

              <div className="ml-auto">
                <button 
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none"
                >
                  Add new item
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto mx-4 mb-4 p-4 shadow-[inset_5px_5px_10px_#cbced1,inset_-5px_-5px_10px_#ffffff] bg-[#f0f0f3] rounded-xl">
              <table className="w-full text-sm text-left whitespace-nowrap border border-gray-300">
                <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 w-10 border-r border-gray-300"></th>
                    <th className="px-4 py-3 border-r border-gray-300">Category Name</th>
                    <th className="px-4 py-3 border-r border-gray-300">Item Name</th>
                    <th className="px-4 py-3 text-right border-r border-gray-300">MRP</th>
                    <th className="px-4 py-3 border-r border-gray-300">UoM</th>
                    <th className="px-4 py-3 border-r border-gray-300">Tax</th>
                    <th className="px-4 py-3 border-r border-gray-300">Language</th>
                    <th className="px-4 py-3 border-r border-gray-300">Item<br/>Status</th>
                    <th className="px-4 py-3 text-center">Item Image</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 text-slate-600">
                  {inventoryItems.map((row, idx) => (
                    <tr key={idx} className="bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors">
                      <td className="px-4 py-3 text-center border-r border-gray-300">
                        <button className="text-[#3c7ab7] hover:text-[#2d6195]"><Edit className="w-4 h-4" /></button>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">
                        <div className="font-semibold text-slate-700">{row.item_category}</div>
                        <div className="text-xs text-slate-500 opacity-70">HSN/SAC {row.hsn_code || '-'}</div>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.item_name}</td>
                      <td className="px-4 py-3 text-right border-r border-gray-300">{row.opening_rate || 0}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.measure_unit}</td>
                      <td className="px-4 py-3 border-r border-gray-300">-</td>
                      <td className="px-4 py-3 border-r border-gray-300">-</td>
                      <td className="px-4 py-3 border-r border-gray-300">
                        <span className="bg-[#8ebc7f] text-[#2b4c23] px-2 py-0.5 rounded text-[11px] font-semibold shadow-sm border border-[#7ca96d]">Active</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mx-auto shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff]"><ImageIcon className="w-5 h-5 text-gray-400" /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <>
            <div className="p-4 border-none flex flex-wrap items-center gap-4 bg-[#f0f0f3]">
              <div className="flex items-center space-x-2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg px-2">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-2 px-2 text-sm w-48 bg-transparent focus:outline-none" />
              </div>
              <button className="bg-[#f0f0f3] hover:shadow-[inset_2px_2px_5px_#cbced1,inset_-2px_-2px_5px_#ffffff] text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] border-none">Go</button>
              
              <div className="flex items-center space-x-2 text-sm font-medium ml-2 bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span className="text-slate-800">Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>

              <button className="bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none ml-2">Edit</button>
              <button className="bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none">
                Save
              </button>
              <button className="bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none">
                Add New Category
              </button>

              <div className="ml-auto flex items-center text-gray-500 cursor-pointer hover:text-gray-700 transition-colors bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg font-semibold text-sm border-none">
                <Settings className="w-4 h-4 mr-1" /> <span>Reset</span>
              </div>
            </div>

            {/* Filter tags */}
            <div className="px-4 py-3 bg-[#f0f0f3] border-none flex items-center space-x-3 mb-2 mx-4 rounded-xl shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]">
              <Filter className="w-4 h-4 text-slate-600" />
              <div className="flex items-center space-x-1 border-none bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] rounded-lg overflow-hidden">
                <div className="px-2 py-1 bg-transparent border-r border-gray-300"><CheckSquare className="w-3.5 h-3.5 text-green-600" /></div>
                <div className="px-2 py-1 flex items-center space-x-1 text-xs font-medium bg-transparent">
                  <Star className="w-3 h-3 text-slate-500" />
                  <span className="bg-[#e49b5c] text-white px-2 py-0.5 rounded text-[10px] uppercase shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">Inactive Category</span>
                </div>
                <button className="px-2 py-1 hover:shadow-[inset_1px_1px_3px_#cbced1,inset_-1px_-1px_3px_#ffffff] border-l border-gray-300 bg-transparent transition-all"><X className="w-3.5 h-3.5 text-slate-500" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-auto mx-4 mb-4 p-4 shadow-[inset_5px_5px_10px_#cbced1,inset_-5px_-5px_10px_#ffffff] bg-[#f0f0f3] rounded-xl">
              <table className="w-full text-[13px] text-left border border-gray-300">
                <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 w-10 border-r border-gray-300"></th>
                    <th className="px-4 py-3 w-10 border-r border-gray-300"></th>
                    <th className="px-4 py-3 border-r border-gray-300">Category<br/>Type</th>
                    <th className="px-4 py-3 border-r border-gray-300">Parent Category</th>
                    <th className="px-4 py-3 border-r border-gray-300">Category<br/>Code</th>
                    <th className="px-4 py-3 border-r border-gray-300">Category Name</th>
                    <th className="px-4 py-3 border-r border-gray-300">HSN/SAC<br/>Code</th>
                    <th className="px-4 py-3 border-r border-gray-300">Preferred<br/>Vendor</th>
                    <th className="px-4 py-3 border-r border-gray-300">Tax</th>
                    <th className="px-4 py-3 border-r border-gray-300">Status</th>
                    <th className="px-4 py-3">#Products<br/>count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 text-slate-600">
                  {[
                    { type: 'Product', parent: 'Agarbatti', code: 'AS-BULK-5...', name: 'AS - Bulk 50G Incense', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Inactive', count: 0, inactive: true },
                    { type: 'Product', parent: 'Agarbatti', code: 'AS-CENT', name: 'AS - Centenary', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 5 },
                    { type: 'Product', parent: '', code: 'AS-ECO-B...', name: 'AS - ECONOMY/BULK PACKING - 50 gm', hsn: '', vendor: 'Auroshikha', tax: '5% GST', status: 'Active', count: 8 },
                    { type: 'Product', parent: '', code: 'AS-EXP-10', name: 'AS - Export Quality 10G', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 2 },
                    { type: 'Product', parent: '', code: 'CI-109-AR...', name: 'AS - Gift Set', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 1 },
                    { type: 'Product', parent: '', code: 'AS-LS', name: 'AS - LONG STICKS', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 6 },
                    { type: 'Product', parent: '', code: 'AS-ART-OI...', name: 'AS - Massage Oil', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 1 },
                  ].map((row, idx) => (
                    <tr key={idx} className={`${row.inactive ? 'bg-[#ffeedd]' : 'bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23]'} transition-colors`}>
                      <td className="px-4 py-3 text-center border-r border-gray-300">
                        <input type="checkbox" defaultChecked={idx === 0} className="rounded text-blue-600 focus:ring-blue-500" />
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-300">
                        <Menu className="w-4 h-4 text-slate-400" />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.type}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.parent}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.code}</td>
                      <td className="px-4 py-3 font-semibold border-r border-gray-300">{row.name}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.hsn}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.vendor}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.tax}</td>
                      <td className="px-4 py-3 border-r border-gray-300">
                        {row.status === 'Active' ? (
                          <span className="bg-[#8ebc7f] text-[#2b4c23] px-2 py-0.5 rounded text-[11px] font-semibold shadow-sm border border-[#7ca96d]">Active</span>
                        ) : (
                          <span className="bg-[#cbced1] text-slate-600 px-2 py-0.5 rounded text-[11px] font-medium">Inactive</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-bold text-center text-slate-700">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 mx-4 mb-4 rounded-xl shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] text-xs font-semibold text-slate-600 flex justify-between items-center bg-[#f0f0f3]">
              <span>1 rows selected</span>
              <span className="font-semibold text-slate-800">Total 27</span>
            </div>
          </>
        )}

        {/* OPENING STOCK TAB */}
        {activeTab === 'opening-stock' && (
          <>
            <div className="p-4 border-none flex flex-wrap items-center gap-4 bg-[#f0f0f3]">
              <div className="flex items-center space-x-2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg px-2">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-2 px-2 text-sm w-48 bg-transparent focus:outline-none" />
              </div>
              <button className="bg-[#f0f0f3] hover:shadow-[inset_2px_2px_5px_#cbced1,inset_-2px_-2px_5px_#ffffff] text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] border-none">Go</button>
              
              <div className="flex items-center space-x-2 text-sm font-medium ml-2 bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span className="text-slate-800">Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>

              <button className="bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none ml-2">Edit</button>
              <button className="bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg font-semibold text-sm text-slate-800 transition-all border-none">
                Save
              </button>

              <div className="ml-auto flex items-center text-gray-500 cursor-pointer hover:text-gray-700 transition-colors bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg font-semibold text-sm border-none">
                <Settings className="w-4 h-4 mr-1" /> <span>Reset</span>
              </div>
            </div>

            <div className="flex-1 overflow-auto mx-4 mb-4 p-4 shadow-[inset_5px_5px_10px_#cbced1,inset_-5px_-5px_10px_#ffffff] bg-[#f0f0f3] rounded-xl">
              <table className="w-full text-[13px] text-left border border-gray-300">
                <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 w-10 border-r border-gray-300"></th>
                    <th className="px-4 py-3 border-r border-gray-300">Category Name</th>
                    <th className="px-4 py-3 border-r border-gray-300">Item name</th>
                    <th className="px-4 py-3 border-r border-gray-300">Batch No</th>
                    <th className="px-4 py-3 border-r border-gray-300">Opening Date</th>
                    <th className="px-4 py-3 text-right border-r border-gray-300">MRP</th>
                    <th className="px-4 py-3 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 text-slate-600">
                  {[
                    { cat: 'Cottage - Long Sticks', item: '16" 5 sticks Mattipal Cottage Long Sticks', batch: '073667', date: '30 Aug 2026', mrp: '163', qty: '0', highlight: true },
                    { cat: 'Cottage - Long Sticks', item: '16" 5 sticks Parijat Long Sticks', batch: '04854', date: '16-Jul-2026', mrp: '168', qty: '0' },
                    { cat: 'Books', item: 'A 60-Year Voyage twixt Matter and Spirit: Sri Aurobindo Ashram--Del...', batch: '01108', date: '26 May 2026', mrp: '150', qty: '0' },
                    { cat: 'Books', item: 'A Commentary on Sri Aurobindos Poem Ilion', batch: '01307', date: '26-May-2026', mrp: '250', qty: '0' },
                    { cat: 'Books', item: 'A Dual Power of God', batch: '01348', date: '26-May-2026', mrp: '60', qty: '0' },
                    { cat: 'Books', item: 'A Focused Journey Through Sri Aurobindos Savitri', batch: '01363', date: '26-May-2026', mrp: '600', qty: '0' },
                    { cat: 'Books', item: 'A Glimpse of the Mother\'s Love and Action', batch: '05000', date: '17-Jul-2026', mrp: '75', qty: '0' },
                    { cat: 'Books', item: 'A Glimpse of the Mothers Love and Action', batch: '01034', date: '26-May-2026', mrp: '75', qty: '0' },
                  ].map((row, idx) => (
                    <tr key={idx} className={`${row.highlight ? 'bg-[#97c5e2] text-[#1f4a66] font-medium' : 'bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23]'} transition-colors`}>
                      <td className="px-4 py-3 text-center border-r border-gray-300">
                        <input type="checkbox" defaultChecked={idx === 0} className="rounded text-blue-600 focus:ring-blue-500" />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.cat}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.item}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.batch}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.date}</td>
                      <td className="px-4 py-3 text-right border-r border-gray-300">{row.mrp}</td>
                      <td className="px-4 py-3 text-right">{row.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 mx-4 mb-4 rounded-xl shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] text-xs font-semibold text-slate-600 flex justify-between items-center bg-[#f0f0f3]">
              <span>1 rows selected</span>
              <span className="font-semibold text-slate-800">Total 915</span>
            </div>
          </>
        )}

      </div>

      {/* Add Item Modal */}
      <InventoryForm 
        isOpen={isAddItemModalOpen} 
        onClose={() => setIsAddItemModalOpen(false)} 
      />
    </div>
  );
};

export default Inventory;

