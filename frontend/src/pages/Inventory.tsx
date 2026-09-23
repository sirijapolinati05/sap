import React, { useState } from 'react';
import { Settings, Moon, BarChart2, Star, CheckSquare, Edit, Menu, Image as ImageIcon, Search, ChevronDown, Filter, ArrowUp } from 'lucide-react';
import InventoryForm from '../components/forms/InventoryForm';

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'products' | 'categories' | 'opening-stock'>('products');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 space-y-4 flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('summary')}
          className={`pb-2 font-medium text-sm px-2 transition-colors ${
            activeTab === 'summary' ? 'text-slate-800 border-b-2 border-[#54976a] bg-[#4a6b93] text-white rounded-t-lg' : 'text-slate-500 hover:text-slate-700'
          }`}
          style={activeTab === 'summary' ? { backgroundColor: '#4a6b93', color: 'white', borderRadius: '9999px', padding: '6px 24px', marginBottom: '8px', border: 'none' } : { padding: '6px 24px', marginBottom: '8px' }}
        >
          Inventory Summary
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`pb-2 font-medium text-sm px-4 transition-colors ${
            activeTab === 'products' ? 'bg-[#4a6b93] text-white rounded-full' : 'text-slate-500 hover:text-slate-700'
          }`}
          style={activeTab === 'products' ? { padding: '6px 24px', marginBottom: '8px' } : { padding: '6px 24px', marginBottom: '8px' }}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`pb-2 font-medium text-sm px-4 transition-colors ${
            activeTab === 'categories' ? 'bg-[#4a6b93] text-white rounded-full' : 'text-slate-500 hover:text-slate-700'
          }`}
          style={activeTab === 'categories' ? { padding: '6px 24px', marginBottom: '8px' } : { padding: '6px 24px', marginBottom: '8px' }}
        >
          Categories
        </button>
        <button 
          onClick={() => setActiveTab('opening-stock')}
          className={`pb-2 font-medium text-sm px-4 transition-colors ${
            activeTab === 'opening-stock' ? 'bg-[#4a6b93] text-white rounded-full' : 'text-slate-500 hover:text-slate-700'
          }`}
          style={activeTab === 'opening-stock' ? { padding: '6px 24px', marginBottom: '8px' } : { padding: '6px 24px', marginBottom: '8px' }}
        >
          Opening Stock - Update
        </button>
      </div>

      <div className="flex-1 bg-white rounded shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        
        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
          <>
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-white">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search" className="border-none py-1 focus:ring-0 text-sm w-40 outline-none" />
              </div>
              <button className="bg-gray-100 px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200">Go</button>
              
              <select className="border border-gray-300 rounded py-1.5 px-3 text-sm focus:outline-none focus:border-blue-500 min-w-[150px]">
                <option>1. Primary Report</option>
              </select>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600 ml-4">
                <span>Rows</span>
                <select className="border border-gray-300 rounded py-1 px-2 focus:outline-none">
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center space-x-3">
              <Filter className="w-4 h-4 text-slate-600" />
              <div className="flex items-center space-x-1 border border-gray-300 bg-white rounded overflow-hidden">
                <div className="px-2 py-1 bg-gray-100 border-r border-gray-300"><CheckSquare className="w-3.5 h-3.5 text-green-600" /></div>
                <div className="px-2 py-1 flex items-center space-x-1 text-xs font-medium">
                  <Star className="w-3 h-3 text-slate-500" />
                  <span className="bg-[#cd7579] text-white px-2 py-0.5 rounded text-[10px] uppercase">Critical Stock</span>
                </div>
                <button className="px-2 py-1 hover:bg-gray-100 border-l border-gray-300"><X className="w-3.5 h-3.5 text-slate-500" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-[#2b4c7e] font-bold border-b border-gray-200 bg-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3">Category Name</th>
                    <th className="px-4 py-3 flex items-center space-x-1">
                      <span>Item name</span>
                      <ArrowUp className="w-3 h-3 text-slate-400" />
                    </th>
                    <th className="px-4 py-3 text-right">Stock In</th>
                    <th className="px-4 py-3 text-right">Stock Out</th>
                    <th className="px-4 py-3 text-right">Stock Balance</th>
                    <th className="px-4 py-3 text-right">Reorder Qty</th>
                    <th className="px-4 py-3 text-center">Manage<br/>Inventory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-700">
                  {[
                    { cat: 'Cottage - Long Sticks', item: '16" 5 sticks Jasmine Long Sticks', in: '4', out: '4', bal: '0', reorder: '0' },
                    { cat: 'Cottage - Long Sticks', item: '16" 5 sticks Mattipal Cottage Long Sticks', in: '0', out: '', bal: '0', reorder: '0' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">{row.cat}</td>
                      <td className="px-4 py-3">{row.item}</td>
                      <td className="px-4 py-3 text-right">{row.in}</td>
                      <td className="px-4 py-3 text-right">{row.out}</td>
                      <td className="px-4 py-3 text-right font-medium">{row.bal}</td>
                      <td className="px-4 py-3 text-right">{row.reorder}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center space-x-1.5">
                          <button className="p-1 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 text-slate-600"><Settings className="w-3.5 h-3.5" /></button>
                          <button className="p-1 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 text-slate-600"><Moon className="w-3.5 h-3.5" /></button>
                          <button className="p-1 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 text-slate-600"><BarChart2 className="w-3.5 h-3.5" /></button>
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
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-white">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search" className="border-none py-1 focus:ring-0 text-sm w-40 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex space-x-1 border border-gray-300 rounded bg-gray-100">
                <button className="px-2 py-1 bg-[#d5d5d5] rounded shadow-sm"><Settings className="w-4 h-4 text-slate-700" /></button>
                <button className="px-2 py-1 hover:bg-gray-200 rounded"><BarChart2 className="w-4 h-4 text-slate-600" /></button>
              </div>
              
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
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#2d525e] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
                >
                  Add new item
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-[13px] text-left">
                <thead className="text-[11px] font-bold text-[#1e293b] border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 w-10"></th>
                    <th className="px-4 py-3">Category Name</th>
                    <th className="px-4 py-3">Item Name</th>
                    <th className="px-4 py-3 text-right">MRP</th>
                    <th className="px-4 py-3">UoM</th>
                    <th className="px-4 py-3">Tax</th>
                    <th className="px-4 py-3">Language</th>
                    <th className="px-4 py-3">Item<br/>Status</th>
                    <th className="px-4 py-3 text-center">Item Image</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-700">
                  {[
                    { cat: 'Cottage - Long Sticks', hsn: '-', item: '16" 5 sticks Jasmine Long Sticks', mrp: '135', uom: '', tax: '', lang: '', active: true, img: 'img1' },
                    { cat: 'Cottage - Long Sticks', hsn: '-', item: '16" 5 sticks Mattipal Cottage Long Sticks', mrp: '163', uom: 'Nos', tax: '5% GST', lang: '', active: true, img: '' },
                    { cat: 'Cottage - Long Sticks', hsn: '-', item: '16" 5 sticks Parijat Long Sticks', mrp: '135', uom: '', tax: '', lang: '', active: true, img: '' },
                    { cat: 'Books', hsn: '-', item: 'A 60-Year Voyage twixt Matter and Spirit: Sri Aurobindo Ashram--Delhi Branch', mrp: '150', uom: '', tax: '', lang: 'English', active: true, img: '' },
                    { cat: 'Books', hsn: '-', item: 'A Call to the Youth of India', mrp: '85', uom: '', tax: '', lang: 'English', active: true, img: 'img2' },
                    { cat: 'Books', hsn: '-', item: 'A Commentary on Sri Aurobindos Poem Ilion', mrp: '250', uom: '', tax: '', lang: 'English', active: true, img: '' },
                    { cat: 'Books', hsn: '-', item: 'A Dual Power of God', mrp: '60', uom: '', tax: '', lang: 'English', active: true, img: 'img3' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-center">
                        <button className="text-[#3b82f6] hover:text-blue-700"><Edit className="w-4 h-4" /></button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800">{row.cat}</div>
                        <div className="text-xs text-slate-500">HSN/SAC {row.hsn}</div>
                      </td>
                      <td className="px-4 py-3">{row.item}</td>
                      <td className="px-4 py-3 text-right">{row.mrp}</td>
                      <td className="px-4 py-3">{row.uom}</td>
                      <td className="px-4 py-3">{row.tax}</td>
                      <td className="px-4 py-3">{row.lang}</td>
                      <td className="px-4 py-3">
                        {row.active ? (
                          <span className="bg-[#e6f4ea] text-[#1e8e3e] px-2 py-0.5 rounded text-[11px] font-medium">Active</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[11px] font-medium">Inactive</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.img === 'img1' && <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mx-auto"><ImageIcon className="w-5 h-5 text-gray-400" /></div>}
                        {row.img === 'img2' && <div className="w-8 h-10 bg-red-400 mx-auto rounded shadow-sm"></div>}
                        {row.img === 'img3' && <div className="w-8 h-10 bg-yellow-300 mx-auto rounded shadow-sm"></div>}
                        {!row.img && <div className="w-10 h-10 mx-auto"></div>}
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
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-white">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-2 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>

              <button className="font-medium text-sm text-slate-700 hover:text-black ml-2">Edit</button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#2d525e] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                Save
              </button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#2d525e] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                Add New Category
              </button>

              <div className="ml-auto text-sm text-slate-400 flex items-center cursor-pointer hover:text-slate-600">
                <Settings className="w-4 h-4 mr-1" /> Reset
              </div>
            </div>

            {/* Filter tags */}
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center space-x-3">
              <Filter className="w-4 h-4 text-slate-600" />
              <div className="flex items-center space-x-1 border border-gray-300 bg-white rounded overflow-hidden">
                <div className="px-2 py-1 bg-gray-100 border-r border-gray-300"><CheckSquare className="w-3.5 h-3.5 text-green-600" /></div>
                <div className="px-2 py-1 flex items-center space-x-1 text-xs font-medium">
                  <Star className="w-3 h-3 text-slate-500" />
                  <span className="bg-[#e49b5c] text-white px-2 py-0.5 rounded text-[10px] uppercase">Inactive Category</span>
                </div>
                <button className="px-2 py-1 hover:bg-gray-100 border-l border-gray-300"><X className="w-3.5 h-3.5 text-slate-500" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-[13px] text-left">
                <thead className="text-[11px] font-bold text-[#1e293b] border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 w-10"></th>
                    <th className="px-4 py-3 w-10"></th>
                    <th className="px-4 py-3">Category<br/>Type</th>
                    <th className="px-4 py-3">Parent Category</th>
                    <th className="px-4 py-3">Category<br/>Code</th>
                    <th className="px-4 py-3">Category Name</th>
                    <th className="px-4 py-3">HSN/SAC<br/>Code</th>
                    <th className="px-4 py-3">Preferred<br/>Vendor</th>
                    <th className="px-4 py-3">Tax</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">#Products<br/>count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-700">
                  {[
                    { type: 'Product', parent: 'Agarbatti', code: 'AS-BULK-5...', name: 'AS - Bulk 50G Incense', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Inactive', count: 0, inactive: true },
                    { type: 'Product', parent: 'Agarbatti', code: 'AS-CENT', name: 'AS - Centenary', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 5 },
                    { type: 'Product', parent: '', code: 'AS-ECO-B...', name: 'AS - ECONOMY/BULK PACKING - 50 gm', hsn: '', vendor: 'Auroshikha', tax: '5% GST', status: 'Active', count: 8 },
                    { type: 'Product', parent: '', code: 'AS-EXP-10', name: 'AS - Export Quality 10G', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 2 },
                    { type: 'Product', parent: '', code: 'CI-109-AR...', name: 'AS - Gift Set', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 1 },
                    { type: 'Product', parent: '', code: 'AS-LS', name: 'AS - LONG STICKS', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 6 },
                    { type: 'Product', parent: '', code: 'AS-ART-OI...', name: 'AS - Massage Oil', hsn: '', vendor: 'Auroshikha', tax: '', status: 'Active', count: 1 },
                  ].map((row, idx) => (
                    <tr key={idx} className={`${row.inactive ? 'bg-[#f49c54] text-white' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" defaultChecked={idx === 0} className="rounded border-gray-300" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Menu className="w-4 h-4 text-slate-400" />
                      </td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3">{row.parent}</td>
                      <td className="px-4 py-3">{row.code}</td>
                      <td className="px-4 py-3">{row.name}</td>
                      <td className="px-4 py-3">{row.hsn}</td>
                      <td className="px-4 py-3">{row.vendor}</td>
                      <td className="px-4 py-3">{row.tax}</td>
                      <td className="px-4 py-3">{row.status}</td>
                      <td className="px-4 py-3">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-2 border-t border-gray-200 text-xs text-slate-500 flex justify-between bg-white">
              <span>1 rows selected</span>
              <span>Total 27</span>
            </div>
          </>
        )}

        {/* OPENING STOCK TAB */}
        {activeTab === 'opening-stock' && (
          <>
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-white">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-2 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>

              <button className="font-medium text-sm text-slate-700 hover:text-black ml-2">Edit</button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#2d525e] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                Save
              </button>

              <div className="ml-auto text-sm text-slate-400 flex items-center cursor-pointer hover:text-slate-600">
                <Settings className="w-4 h-4 mr-1" /> Reset
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-[13px] text-left">
                <thead className="text-[11px] font-bold text-[#1e293b] border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 w-10"></th>
                    <th className="px-4 py-3">Category Name</th>
                    <th className="px-4 py-3">Item name</th>
                    <th className="px-4 py-3">Batch No</th>
                    <th className="px-4 py-3">Opening Date</th>
                    <th className="px-4 py-3 text-right">MRP</th>
                    <th className="px-4 py-3 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-700">
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
                    <tr key={idx} className={`${row.highlight ? 'bg-[#e2f0f5]' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" defaultChecked={idx === 0} className="rounded border-gray-300" />
                      </td>
                      <td className="px-4 py-3">{row.cat}</td>
                      <td className="px-4 py-3">{row.item}</td>
                      <td className="px-4 py-3">{row.batch}</td>
                      <td className="px-4 py-3">{row.date}</td>
                      <td className="px-4 py-3 text-right">{row.mrp}</td>
                      <td className="px-4 py-3 text-right">{row.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-2 border-t border-gray-200 text-xs text-slate-500 flex justify-between bg-white">
              <span>1 rows selected</span>
              <span>Total 915</span>
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

