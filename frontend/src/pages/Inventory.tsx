import React, { useState, useEffect } from 'react';
import { Settings, Moon, BarChart2, Star, CheckSquare, Edit, Menu, Image as ImageIcon, Search, ChevronDown, Filter, ArrowUp, X } from 'lucide-react';
import InventoryForm from '../components/forms/InventoryForm';

const InventorySearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg">
      <div className="relative h-full flex" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="flex items-center justify-center space-x-1 px-3 py-2 bg-[#dcdfe4] rounded-l-lg hover:bg-[#d0d3d8] transition-colors border-r border-gray-300 shadow-[inset_1px_1px_3px_#b8bba9,inset_-1px_-1px_3px_#ffffff]"
        >
          <Search className="w-4 h-4 text-slate-700" />
          <ChevronDown className="w-3 h-3 text-slate-700" />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-[0_10px_25px_rgba(0,0,0,0.1)] py-1 z-50 border border-gray-100">
            {['Row Search', 'Category Name', 'Item name', 'Stock In', 'Stock Out', 'Stock Balance', 'Reorder Qty', 'Manage Inventory'].map(item => (
              <div key={item} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-slate-700 transition-colors" onClick={() => setIsOpen(false)}>{item}</div>
            ))}
          </div>
        )}
      </div>
      <input type="text" placeholder="Search" className="border-none py-2 px-3 text-sm w-48 bg-transparent focus:outline-none" />
    </div>
  );
};

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'products' | 'categories' | 'opening-stock'>('summary');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [selectedTransactionItem, setSelectedTransactionItem] = useState<any | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/inventory')
      .then(res => res.json())
      .then(data => setInventoryItems(data))
      .catch(console.error);
    
    fetch('http://localhost:8000/invoices')
      .then(res => res.json())
      .then(data => setInvoices(data))
      .catch(console.error);
  }, []);

  // Compute total sold per item from real invoice data
  const salesByItem = React.useMemo(() => {
    const map = new Map<string, number>();
    invoices.forEach(inv => {
      const items = inv.items || [];
      items.forEach((item: any) => {
        const prev = map.get(item.name) || 0;
        map.set(item.name, prev + (Number(item.quantity) || 0));
      });
    });
    return map;
  }, [invoices]);

  const transactionDetails = React.useMemo(() => {
    if (!selectedTransactionItem) return [];
    const itemName = selectedTransactionItem.item_name;
    const itemCode = selectedTransactionItem.item_code;
    const transactions: any[] = [];
    
    // Add sales from invoices (real data)
    invoices.forEach(inv => {
      const items = inv.items || [];
      items.forEach((item: any) => {
        if (item.name === itemName) {
          transactions.push({
            date: inv.date,
            type: 'Sale',
            batchNo: itemCode,
            refNo: inv.id?.replace('HYD-INV-', '') || '',
            qty: item.quantity
          });
        }
      });
    });
    
    // Add opening balance (use earliest invoice date or today as reference)
    if (selectedTransactionItem.opening_qty) {
      const allDates = invoices.map(inv => inv.date).filter(Boolean).sort();
      const openingDate = allDates.length > 0 ? allDates[0] : new Date().toISOString().split('T')[0];
      transactions.push({
        date: openingDate,
        type: 'Opening Balance',
        batchNo: itemCode,
        refNo: '',
        qty: selectedTransactionItem.opening_qty
      });
    }
    
    // Sort by date descending
    transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return transactions;
  }, [selectedTransactionItem, invoices]);

  // Transaction Details View
  if (selectedTransactionItem) {
    return (
      <div className="p-4 md:p-6 space-y-4 flex flex-col h-[calc(100vh-3.5rem)]">
        <div>
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setSelectedTransactionItem(null)}>
            Inventory \
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Inventory Transaction Details - {selectedTransactionItem.item_name}
          </h1>
        </div>

        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80 rounded" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col">
          {/* Toolbar */}
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
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white uppercase sticky top-0">
                <tr>
                  <th className="px-4 py-3">Transaction Date <ArrowUp className="w-3 h-3 inline text-gray-400" /></th>
                  <th className="px-4 py-3">Transaction Type</th>
                  <th className="px-4 py-3">Batch No</th>
                  <th className="px-4 py-3">Reference No</th>
                  <th className="px-4 py-3 text-right">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                {transactionDetails.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-slate-400">
                      <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" strokeWidth={1.5} />
                      <p className="text-sm">No transactions found for this item.</p>
                    </td>
                  </tr>
                ) : (
                  transactionDetails.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">{tx.date}</td>
                      <td className="px-4 py-3">{tx.type}</td>
                      <td className="px-4 py-3">{tx.batchNo}</td>
                      <td className="px-4 py-3">{tx.refNo}</td>
                      <td className="px-4 py-3 text-right font-medium text-[#0088cc]">{tx.qty}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 text-xs text-slate-500 text-right bg-white border-t border-gray-200">
            1 - {transactionDetails.length}
          </div>
        </div>
      </div>
    );
  }

  const categoriesData = (() => {
    const map = new Map<string, any>();
    inventoryItems.forEach(item => {
      const catName = item.item_category;
      if (!map.has(catName)) {
        map.set(catName, {
          type: item.item_type || 'Product',
          parent: item.sub_group || '',
          code: item.item_code || '',
          name: catName,
          hsn: item.hsn_code || '',
          vendor: '-',
          tax: '',
          status: 'Active',
          count: 0
        });
      }
      map.get(catName).count += 1;
    });
    return Array.from(map.values());
  })();

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
              <InventorySearch />
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
                      <td className="px-4 py-3 text-right border-r border-gray-300">{salesByItem.get(row.item_name) || 0}</td>
                      <td className="px-4 py-3 text-right font-medium border-r border-gray-300">{(row.opening_qty || 0) - (salesByItem.get(row.item_name) || 0)}</td>
                      <td className="px-4 py-3 text-right border-r border-gray-300">{row.reorder_level || 0}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center space-x-1.5">
                          <button 
                            onClick={() => setSelectedTransactionItem(row)}
                            className="p-1.5 rounded-lg bg-[#f0f0f3] shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] text-slate-600 transition-all border-none"
                          ><Settings className="w-3.5 h-3.5" /></button>
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
              <InventorySearch />
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
              <InventorySearch />
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
                  {categoriesData.map((row, idx) => (
                    <tr key={idx} className={`bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors`}>
                      <td className="px-4 py-3 text-center border-r border-gray-300">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
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
              <span>0 rows selected</span>
              <span className="font-semibold text-slate-800">Total {categoriesData.length}</span>
            </div>
          </>
        )}

        {/* OPENING STOCK TAB */}
        {activeTab === 'opening-stock' && (
          <>
            <div className="p-4 border-none flex flex-wrap items-center gap-4 bg-[#f0f0f3]">
              <InventorySearch />
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
                  {inventoryItems.map((row, idx) => (
                    <tr key={idx} className="bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors">
                      <td className="px-4 py-3 text-center border-r border-gray-300">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.item_category}</td>
                      <td className="px-4 py-3 border-r border-gray-300">{row.item_name}</td>
                      <td className="px-4 py-3 border-r border-gray-300">-</td>
                      <td className="px-4 py-3 border-r border-gray-300">-</td>
                      <td className="px-4 py-3 text-right border-r border-gray-300">{row.opening_rate || 0}</td>
                      <td className="px-4 py-3 text-right">{row.opening_qty || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 mx-4 mb-4 rounded-xl shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] text-xs font-semibold text-slate-600 flex justify-between items-center bg-[#f0f0f3]">
              <span>0 rows selected</span>
              <span className="font-semibold text-slate-800">Total {inventoryItems.length}</span>
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

