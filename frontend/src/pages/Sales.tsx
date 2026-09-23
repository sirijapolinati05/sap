import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis as RechartsXAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Printer, Edit, List, Search, ChevronDown, ArrowUp, ShoppingCart } from 'lucide-react';
import SalesForm from '../components/forms/SalesForm';
import BuildInvoice from './BuildInvoice';

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

const Sales: React.FC = () => {
  const [currentView, setCurrentView] = useState<'invoices' | 'build-invoice'>('invoices');
  const [activeTab, setActiveTab] = useState<'Sales Invoices' | 'Customers'>('Sales Invoices');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [invoiceToPrint, setInvoiceToPrint] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [posMode, setPosMode] = useState(false);
  const [paymentMixPeriod, setPaymentMixPeriod] = useState<'FY' | 'Month'>('Month');
  const [topProductsCategory, setTopProductsCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:8000/invoices')
      .then(res => res.json())
      .then(data => {
        // sort by newest first (descending ID usually works if ID format is INV-0001, but date/time is better)
        setInvoicesData(data.reverse());
      })
      .catch(console.error);

    fetch('http://localhost:8000/members')
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(console.error);
  }, []);

  if (currentView === 'build-invoice' || invoiceToPrint) {
    return (
      <BuildInvoice 
        initialInvoice={invoiceToPrint}
        openInPreview={previewMode}
        openInPosMode={posMode}
        onBack={() => {
          setCurrentView('invoices');
          setInvoiceToPrint(null);
        }} 
        onSave={(newInvoice, returnToInvoices) => {
          if (!invoiceToPrint) {
            fetch('http://localhost:8000/invoices', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newInvoice)
            })
            .then(res => res.json())
            .then(saved => setInvoicesData(prev => [saved, ...prev]))
            .catch(console.error);
          } else {
            fetch(`http://localhost:8000/invoices/${newInvoice.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newInvoice)
            })
            .then(res => res.json())
            .then(saved => setInvoicesData(prev => prev.map(inv => inv.id === saved.id ? saved : inv)))
            .catch(console.error);
          }
          
          if (returnToInvoices) {
            setCurrentView('invoices');
            setInvoiceToPrint(null);
          } else {
            setInvoiceToPrint(newInvoice);
          }
        }}
      />
    );
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const annualInvoices = invoicesData.filter(inv => {
    const d = new Date(inv.date);
    return d.getFullYear() === currentYear;
  });

  const monthlyInvoices = annualInvoices.filter(inv => {
    const d = new Date(inv.date);
    return d.getMonth() === currentMonth;
  });

  const annualSales = annualInvoices.reduce((acc, inv) => acc + parseFloat(inv.amount || '0'), 0);
  const monthlySales = monthlyInvoices.reduce((acc, inv) => acc + parseFloat(inv.amount || '0'), 0);
  const annualTransactions = annualInvoices.length;
  const monthlyTransactions = monthlyInvoices.length;

  // Computed data for charts
  const relevantInvoices = paymentMixPeriod === 'FY' ? annualInvoices : monthlyInvoices;
  
  const paymentMixMap: Record<string, number> = {};
  relevantInvoices.forEach(inv => {
    (inv.payments || []).forEach((p: any) => {
      const method = p.method || 'Unknown';
      const amount = parseFloat(p.amount) || 0;
      paymentMixMap[method] = (paymentMixMap[method] || 0) + amount;
    });
  });

  const paymentMixData = Object.entries(paymentMixMap).map(([name, value]) => ({ name, value }));
  if (paymentMixData.length === 0) {
    paymentMixData.push({ name: 'No Data', value: 0 });
  }

  const maxPaymentMixValue = Math.max(...paymentMixData.map(d => d.value), 100);
  const yAxisTicks = [0, Math.ceil(maxPaymentMixValue / 2), Math.ceil(maxPaymentMixValue)];

  const productCountMap: Record<string, number> = {};
  annualInvoices.forEach(inv => {
    (inv.items || []).forEach((item: any) => {
      if (!item.product || !item.product.name) return;
      
      if (topProductsCategory !== 'All') {
        const parts = (item.product.sku || '').split(' - ');
        const category = parts.length > 1 ? parts[parts.length - 1].trim() : '';
        if (category !== topProductsCategory) return;
      }
      
      const qty = parseInt(item.qty) || 0;
      productCountMap[item.product.name] = (productCountMap[item.product.name] || 0) + qty;
    });
  });

  const topProductsData = Object.entries(productCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value], idx) => {
       const colors = ['bg-red-500', 'bg-orange-400', 'bg-amber-300', 'bg-emerald-400', 'bg-blue-400'];
       return { name, value, max: 0, color: colors[idx % colors.length] };
    });
    
  const maxProductValue = topProductsData.length > 0 ? topProductsData[0].value : 5;
  topProductsData.forEach(p => p.max = maxProductValue);

  // Available categories for dropdown
  const allCategories = new Set<string>();
  annualInvoices.forEach(inv => {
    (inv.items || []).forEach((item: any) => {
      if (!item.product || !item.product.name) return;
      const parts = (item.product.sku || '').split(' - ');
      if (parts.length > 1) allCategories.add(parts[parts.length - 1].trim());
    });
  });

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#f0f0f3] min-h-[calc(100vh-64px)]">
      {/* Top Tabs */}
      <div className="flex space-x-6 border-b border-gray-300/50 pb-2">
        <button 
          onClick={() => setActiveTab('Sales Invoices')}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'Sales Invoices' ? 'bg-[#f0f0f3] text-blue-600 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]' : 'text-slate-500 hover:text-slate-700 hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff]'}`}
        >
          Sales Invoices
        </button>
        <button 
          onClick={() => setActiveTab('Customers')}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'Customers' ? 'bg-[#f0f0f3] text-blue-600 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]' : 'text-slate-500 hover:text-slate-700 hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff]'}`}
        >
          Customers
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-slate-800">{activeTab}</h1>
        <button 
          onClick={() => { setCurrentView('build-invoice'); setPosMode(true); }}
          className="flex items-center space-x-1.5 bg-[#232f4e] hover:bg-slate-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>New Invoice</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#65b98b] text-white p-4 rounded shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">Total Annual Sales</div>
          <div className="text-3xl font-light">₹{annualSales.toFixed(2)}</div>
        </div>
        
        <div className="bg-[#c2ce64] text-white p-4 rounded shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">Monthly Sales</div>
          <div className="text-3xl font-light">₹{monthlySales.toFixed(2)}</div>
        </div>
        
        <div className="bg-[#5c98ce] text-white p-4 rounded shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">Annual Transactions</div>
          <div className="text-3xl font-light">{annualTransactions}</div>
        </div>
        
        <div className="bg-[#dd5c63] text-white p-4 rounded shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">Monthly Transactions</div>
          <div className="text-3xl font-light">{monthlyTransactions}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Table Area */}
        <div className="flex-1 space-y-4">
          
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#f0f0f3] shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff] p-4 rounded-xl border-none">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg px-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search" className="border-none py-1.5 focus:ring-0 text-sm w-48 bg-transparent outline-none" />
              </div>
              <button className="bg-[#f0f0f3] hover:shadow-[inset_2px_2px_5px_#cbced1,inset_-2px_-2px_5px_#ffffff] text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] border-none">Go</button>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <span>Rows</span>
                <select className="border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg py-1 px-2 focus:outline-none">
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm font-medium bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              {activeTab === 'Customers' && (
                <button className="text-sm font-bold text-slate-800 hover:text-black">
                  Add New Customer
                </button>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-[#f0f0f3] shadow-[inset_5px_5px_10px_#cbced1,inset_-5px_-5px_10px_#ffffff] rounded-xl overflow-x-auto p-4 mt-4">
            {activeTab === 'Sales Invoices' ? (
              <table className="w-full text-sm text-left whitespace-nowrap border border-gray-300">
                <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 border-r border-gray-300">Invoice No</th>
                    <th className="px-4 py-3 border-r border-gray-300 flex items-center justify-between">
                      <span>Invoice Date</span>
                      <ArrowUp className="w-3 h-3" />
                    </th>
                    <th className="px-4 py-3 border-r border-gray-300">Customer</th>
                    <th className="px-4 py-3 border-r border-gray-300 text-right">Total Amount</th>
                    <th className="px-4 py-3 border-r border-gray-300">Invoice Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {invoicesData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No sales invoices yet. Click 'New Invoice' to create one!
                      </td>
                    </tr>
                  ) : (
                    invoicesData.map((row, idx) => (
                      <tr key={idx} className="bg-transparent hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors cursor-pointer text-slate-600">
                        <td className="px-4 py-3 border-r border-gray-300 font-medium">{row.id}</td>
                        <td className="px-4 py-3 border-r border-gray-300">{row.date}</td>
                        <td className="px-4 py-3 border-r border-gray-300">{row.customer}</td>
                        <td className="px-4 py-3 border-r border-gray-300 text-right font-medium">{row.amount}</td>
                        <td className="px-4 py-3 border-r border-gray-300">{row.status}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-1 rounded w-fit overflow-hidden border-none shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] bg-[#f0f0f3] p-1">
                            <button className="p-1.5 transition-colors text-blue-500 hover:bg-blue-100 rounded" onClick={() => { setInvoiceToPrint(row); setPreviewMode(false); setPosMode(true); }}><Edit className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 transition-colors text-green-600 hover:bg-green-100 rounded" onClick={() => { setInvoiceToPrint(row); setPreviewMode(true); setPosMode(false); }}><Printer className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 transition-colors text-purple-600 hover:bg-purple-100 rounded" onClick={() => { setInvoiceToPrint(row); setPreviewMode(false); setPosMode(true); }}><List className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm text-left whitespace-nowrap border border-gray-300">
                <thead className="text-[11px] font-bold text-gray-800 uppercase tracking-wider border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 border-r border-gray-300 w-12 text-center"></th>
                    <th className="px-4 py-3 border-r border-gray-300">Title</th>
                    <th className="px-4 py-3 border-r border-gray-300 flex items-center justify-between">
                      <span>First Name</span>
                      <ArrowUp className="w-3 h-3 text-slate-400" />
                    </th>
                    <th className="px-4 py-3 border-r border-gray-300">Last Name</th>
                    <th className="px-4 py-3 border-r border-gray-300">Mobile Number</th>
                    <th className="px-4 py-3 border-r border-gray-300">Email</th>
                    <th className="px-4 py-3">#No Of Orders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {(() => {
                    const actualCustomers = customers.map(c => {
                      const fullName = [c.first_name, c.last_name].filter(Boolean).join(' ').trim();
                      const ordersCount = invoicesData.filter(inv => inv.customer === fullName).length;
                      return { ...c, ordersCount };
                    }).filter(c => c.ordersCount > 0);

                    if (actualCustomers.length === 0) {
                      return (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                            No customers yet. Customers will appear here when they have a sales invoice.
                          </td>
                        </tr>
                      );
                    }

                    return actualCustomers.map((row, idx) => (
                      <tr key={idx} className="bg-transparent hover:bg-gray-50 transition-colors text-slate-800">
                        <td className="px-4 py-3 border-r border-gray-300 text-center">
                          <button className="text-[#3b82f6] hover:text-blue-700 transition-colors"><Edit className="w-4 h-4 mx-auto" /></button>
                        </td>
                        <td className="px-4 py-3 border-r border-gray-300">{row.title || ''}</td>
                        <td className="px-4 py-3 border-r border-gray-300">{row.first_name || ''}</td>
                        <td className="px-4 py-3 border-r border-gray-300">{row.last_name || ''}</td>
                        <td className="px-4 py-3 border-r border-gray-300">{row.isd_code ? `${row.isd_code} ${row.contact_number}` : row.contact_number || ''}</td>
                        <td className="px-4 py-3 border-r border-gray-300">{row.email || ''}</td>
                        <td className="px-4 py-3">{row.ordersCount}</td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-72 space-y-6 flex-shrink-0">
          
          {/* Payment Mix Chart */}
          <div className="bg-white rounded shadow-sm border border-gray-100 p-4">
            <h3 className="text-slate-800 font-medium mb-4">Payment Mix</h3>
            <div className="flex bg-gray-100 p-1 rounded-md text-xs font-medium w-fit mb-6">
              <button onClick={() => setPaymentMixPeriod('FY')} className={`px-3 py-1 rounded shadow-sm ${paymentMixPeriod === 'FY' ? 'bg-[#333] text-white' : 'text-slate-600 hover:text-slate-800'}`}>This FY</button>
              <button onClick={() => setPaymentMixPeriod('Month')} className={`px-3 py-1 rounded shadow-sm ${paymentMixPeriod === 'Month' ? 'bg-[#333] text-white' : 'text-slate-600 hover:text-slate-800'}`}>This Month</button>
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
                  <YAxis tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} ticks={yAxisTicks} tickFormatter={(val) => val === 0 ? '0' : val.toLocaleString()} />
                  <Bar dataKey="value" barSize={40}>
                    {paymentMixData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'UPI' ? '#4a7a8c' : (entry.name === 'No Data' ? '#e2e8f0' : '#739e9e')} />
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
                <select 
                  value={topProductsCategory}
                  onChange={(e) => setTopProductsCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded py-1.5 px-3 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Categories</option>
                  {Array.from(allCategories).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-4 pt-2">
                {topProductsData.length > 0 ? topProductsData.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 truncate pr-2" title={item.name}>{item.name}</span>
                      <span className="text-slate-500 flex-shrink-0">{item.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${(item.value / item.max) * 100}%` }}></div>
                    </div>
                  </div>
                )) : (
                  <div className="text-sm text-slate-500 text-center py-4">No data available</div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Customer Modal */}
      <SalesForm 
        isOpen={isCustomerModalOpen} 
        onClose={() => setIsCustomerModalOpen(false)} 
      />
    </div>
  );
};

export default Sales;
