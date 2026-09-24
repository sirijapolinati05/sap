import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Reports: React.FC = () => {
  const [currentReport, setCurrentReport] = useState<string | null>(null);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/inventory`)
      .then(res => res.json())
      .then(data => setInventoryItems(data))
      .catch(console.error);
    
    fetch(`${import.meta.env.VITE_API_URL}/invoices`)
      .then(res => res.json())
      .then(data => setInvoices(data))
      .catch(console.error);
  }, []);

  const filteredSales = React.useMemo(() => {
    if (!selectedProduct) return [];
    
    const sales: any[] = [];
    invoices.forEach(inv => {
      const items = inv.items || [];
      items.forEach((item: any) => {
        if (item.name === selectedProduct) {
          sales.push({
            date: inv.date,
            customer: inv.customer,
            invoiceId: inv.id,
            qty: item.quantity,
            amount: item.amount
          });
        }
      });
    });
    return sales;
  }, [invoices, selectedProduct]);

  if (currentReport === 'sales-summary') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentReport(null)}>
            Reports \
          </div>
          <h1 className="text-xl font-bold text-slate-900">Sales summary by product</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
            
            {/* Item Name Select */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <select 
                  className="w-full border border-gray-300 rounded py-2.5 px-3 text-sm appearance-none bg-[#f9fafb] focus:outline-none focus:border-blue-500 text-slate-500 shadow-inner"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Select Item Name...</option>
                  {inventoryItems.map((item, idx) => (
                    <option key={idx} value={item.item_name}>{item.item_name}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-white">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
            </div>

            {/* Data State */}
            {!selectedProduct ? (
              <div className="py-24 flex flex-col items-center justify-center text-slate-400">
                <Search className="w-10 h-10 mb-2 text-gray-300" strokeWidth={1.5} />
                <p className="text-sm">Please select a product to view its sales summary.</p>
              </div>
            ) : filteredSales.length === 0 ? (
              <div className="py-24 flex flex-col items-center justify-center text-slate-400">
                <Search className="w-10 h-10 mb-2 text-gray-300" strokeWidth={1.5} />
                <p className="text-sm">No sales summary found for this product.</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white uppercase">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Invoice No</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3 text-right">Quantity</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                    {filteredSales.map((sale, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">{sale.date}</td>
                        <td className="px-4 py-3 text-[#0088cc]">{sale.invoiceId}</td>
                        <td className="px-4 py-3">{sale.customer}</td>
                        <td className="px-4 py-3 text-right font-medium">{sale.qty}</td>
                        <td className="px-4 py-3 text-right">₹{parseFloat(sale.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-white border-t border-gray-200 font-bold text-slate-800">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right">Total:</td>
                      <td className="px-4 py-3 text-right">
                        {filteredSales.reduce((acc, s) => acc + (Number(s.qty) || 0), 0)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        ₹{filteredSales.reduce((acc, s) => acc + (Number(s.amount) || 0), 0).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
            
          </div>
        </div>
      </div>
    );
  }

  if (currentReport === 'sales-chart') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentReport(null)}>
            Reports \
          </div>
          <h1 className="text-xl font-bold text-slate-900">OCI_UPLOAD</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
            
            {/* Buckets Select */}
            <div className="border-b border-gray-200 bg-white">
              <div className="relative mb-6">
                <select className="w-full border border-gray-300 rounded py-2.5 px-3 text-sm appearance-none bg-white focus:outline-none focus:border-blue-500 shadow-inner">
                  <option>Buckets</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>

              {/* Upload File */}
              <div className="mb-4">
                <label className="text-[11px] text-gray-500 font-medium block mb-1">Upload File</label>
                <div className="border border-dashed border-gray-300 rounded-md p-2 flex items-center bg-white shadow-inner mb-3">
                  <span className="bg-white border border-gray-200 px-3 py-1 text-sm rounded cursor-pointer hover:bg-gray-50 transition-colors text-slate-700">Choose File</span>
                </div>
                <button className="bg-gray-200 px-4 py-1.5 text-sm font-medium rounded hover:bg-gray-300 text-slate-700 border border-gray-300">
                  Upload
                </button>
              </div>
            </div>

            {/* Objects Header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-slate-800 font-semibold text-sm">Objects</h2>
            </div>

            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-[#f9fafb]">
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
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white">
                  <tr>
                    <th className="px-4 py-3">Img Oci</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                  <tr>
                    <td className="px-4 py-6"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 text-xs text-slate-500 text-right bg-white border-t border-gray-200">
              1 - 1
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden h-fit">
          <div className="px-5 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-[#1e3a5f] font-semibold">Reports for Master Data</h2>
          </div>
          <div className="p-0">
            <a href="#" className="block px-5 py-4 text-[#0088cc] hover:bg-gray-50 transition-colors text-sm">
              Visitors List
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden h-fit">
          <div className="px-5 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-[#1e3a5f] font-semibold">Sales Report</h2>
          </div>
          <div className="p-0 divide-y divide-gray-50">
            <button 
              onClick={() => setCurrentReport('sales-summary')}
              className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <span className="text-[#0088cc] text-sm">Sales summary by product</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </button>
            
            <a href="#" className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <span className="text-[#0088cc] text-sm">Monthly Sales Report</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-[#8b8b8b] text-white text-[10px] px-2 py-0.5 rounded shadow-sm">Default for current month</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
            </a>
            
            <button 
              onClick={() => setCurrentReport('sales-chart')}
              className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <span className="text-[#0088cc] text-sm">Sales Chart</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-[#8b8b8b] text-white text-[10px] px-2 py-0.5 rounded shadow-sm">Based on last 12 month sales</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/purchase?tab=invoice')}
              className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <span className="text-[#0088cc] text-sm">Top Products</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </button>
            
            <button 
              onClick={() => navigate('/purchase?tab=add-invoice')}
              className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <span className="text-[#0088cc] text-sm">Top Customers</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reports;
