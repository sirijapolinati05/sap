import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus, Trash2 } from 'lucide-react';

const DUMMY_PRODUCTS = [
  { id: 1, type: 'ITEM', name: '16" 5 sticks Jasmine Long Sticks', sku: 'STK-001 - Incense sticks', stock: 42, price: 135.00 },
  { id: 2, type: 'ITEM', name: '16" 5 sticks Mattipal Cottage Long Sticks', sku: 'STK-002 - Incense sticks', stock: 17, price: 163.00 },
  { id: 3, type: 'ITEM', name: '16" 5 sticks Parijat Long Sticks', sku: 'STK-003 - Incense sticks', stock: 26, price: 135.00 },
  { id: 4, type: 'BOOK', name: 'A Call to the Youth of India', sku: 'BK-104 - Compiled from the writings of Sri Aurobindo and the Mother - Books', stock: 28, price: 85.00 },
  { id: 5, type: 'BOOK', name: "A Commentary on Sri Aurobindo's Poem Ilion", sku: 'BK-105 - Books', stock: 12, price: 250.00 },
];

interface InvoiceItem {
  id: number;
  product: typeof DUMMY_PRODUCTS[0];
  qty: number;
  price: number;
  disc: number;
  tax: number;
  amount: number;
}

interface BuildInvoiceProps {
  onBack?: () => void;
}

const BuildInvoice: React.FC<BuildInvoiceProps> = ({ onBack }) => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  
  const [documentType, setDocumentType] = useState('Tax invoice');
  const [invoiceDate, setInvoiceDate] = useState('2026-09-23');
  const [customerName, setCustomerName] = useState('Walk-in customer');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerState, setCustomerState] = useState('');
  
  const [billDiscount, setBillDiscount] = useState<string>('0');
  const [otherCharges, setOtherCharges] = useState<string>('0');
  const [payments, setPayments] = useState<{id: number, method: string, amount: string, ref: string}[]>([{
    id: Date.now(),
    method: 'UPI',
    amount: '',
    ref: ''
  }]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  // Extract unique categories (text after the last ' - ')
  const categories = Array.from(new Set(DUMMY_PRODUCTS.map(p => {
    const parts = p.sku.split(' - ');
    return parts.length > 1 ? parts[parts.length - 1].trim() : p.sku;
  })));

  useEffect(() => {
    fetch('http://localhost:8000/members')
      .then(res => res.json())
      .then(data => {
        setMembers(data);
      })
      .catch(console.error);
  }, []);

  const handleAddItem = (product: typeof DUMMY_PRODUCTS[0]) => {
    setInvoiceItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, qty: item.qty + 1, amount: (item.qty + 1) * item.price } 
            : item
        );
      }
      return [...prev, {
        id: Date.now(),
        product,
        qty: 1,
        price: product.price,
        disc: 0,
        tax: 0,
        amount: product.price
      }];
    });
  };

  const clearItems = () => setInvoiceItems([]);

  const itemSubtotal = invoiceItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const totalAmount = invoiceItems.reduce((acc, item) => acc + item.amount, 0) + parseFloat(otherCharges || '0');
  const totalReceived = payments.reduce((acc, p) => acc + parseFloat(p.amount || '0'), 0);
  const balance = totalAmount - totalReceived;

  if (showPreview) {
    return (
      <div className="bg-white min-h-[calc(100vh-56px)] text-slate-900 font-sans p-8 mx-auto max-w-4xl print:p-0 print:max-w-none print:w-full">
        
        {/* Top toolbar (hidden in print) */}
        <div className="flex justify-between items-center mb-8 print:hidden border-b border-gray-200 pb-4">
          <button 
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm"
          >
            ← Back to Editor
          </button>
          <button 
            onClick={() => window.print()}
            className="px-5 py-2 text-sm font-bold text-white bg-[#254ab8] hover:bg-blue-800 rounded-lg shadow-sm"
          >
            Print Invoice
          </button>
        </div>

        <div className="print:block">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-[11px] text-slate-500 mb-6">9/23/26, 3:19 PM</div>
              <h1 className="text-xl font-bold text-[#1a2b4b] mb-1">SAS Hyderabad</h1>
              <div className="text-sm text-slate-600">Hyderabad</div>
              <div className="text-sm text-slate-600">Hyderabad, Telangana</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-500 mb-6 mr-10">SAS Hyderabad</div>
              <h2 className="text-2xl font-bold text-[#1a2b4b] mb-2">{documentType}</h2>
              <div className="text-sm text-slate-600 mb-1">No: HYD-INV-0026</div>
              <div className="text-sm text-slate-600">Date: {invoiceDate}</div>
            </div>
          </div>

          {/* Banner Removed */}

          {/* Customer & Details */}
          <div className="flex justify-between mb-8">
            <div className="w-1/2 pr-8">
              <div className="text-[10px] font-bold text-slate-800 tracking-wider mb-3">BILL TO</div>
              <div className="text-sm font-bold text-slate-900 mb-1">{customerName || 'Walk-in customer'}</div>
              {customerAddress && <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">{customerAddress}</div>}
              {customerPhone && <div className="text-sm text-slate-800 mt-1">{customerPhone}</div>}
            </div>
            <div className="w-1/2">
              <div className="mb-6">
                <div className="text-[10px] font-bold text-slate-800 tracking-wider mb-2">REFERENCE</div>
                <div className="text-sm text-slate-900">—</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-800 tracking-wider mb-2">STATUS</div>
                <div className="text-sm text-slate-900">{balance <= 0 && totalAmount > 0 ? 'Paid in full' : 'Unpaid'}</div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 text-[11px] font-bold text-slate-900 w-12">#</th>
                  <th className="py-3 text-[11px] font-bold text-slate-900">Item</th>
                  <th className="py-3 text-[11px] font-bold text-slate-900 text-center w-16">Qty</th>
                  <th className="py-3 text-[11px] font-bold text-slate-900 text-right w-24">Rate</th>
                  <th className="py-3 text-[11px] font-bold text-slate-900 text-center w-16">Disc</th>
                  <th className="py-3 text-[11px] font-bold text-slate-900 text-center w-16">Tax</th>
                  <th className="py-3 text-[11px] font-bold text-slate-900 text-right w-28">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.length === 0 ? (
                  <tr><td colSpan={7} className="py-4 text-center text-sm text-slate-400">No items</td></tr>
                ) : (
                  invoiceItems.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-100">
                      <td className="py-3 text-sm text-slate-800 align-top">{idx + 1}</td>
                      <td className="py-3 pr-4">
                        <div className="text-sm font-bold text-slate-900">{item.product.name}</div>
                        <div className="text-[13px] text-slate-600">SKU: {item.product.sku.split(' - ')[0]}</div>
                      </td>
                      <td className="py-3 text-sm text-slate-800 text-center align-top">{item.qty}</td>
                      <td className="py-3 text-sm text-slate-800 text-right align-top">₹{item.price.toFixed(2)}</td>
                      <td className="py-3 text-sm text-slate-800 text-center align-top">{item.disc}%</td>
                      <td className="py-3 text-sm text-slate-800 text-center align-top">{item.tax}%</td>
                      <td className="py-3 text-sm text-slate-800 text-right align-top">₹{item.amount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Totals & Footer */}
          <div className="flex justify-between items-start">
            <div className="w-1/2 pt-16">
              <div className="text-sm text-slate-800">
                <span className="font-bold">Payment:</span> {payments.length > 0 ? payments.map(p => p.method).join(', ') : 'No payment recorded'}
              </div>
            </div>
            <div className="w-[300px]">
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm text-slate-800">
                  <span>Subtotal</span>
                  <span>₹{itemSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-800">
                  <span>Discounts</span>
                  <span>– ₹0.00</span>
                </div>
                <div className="flex justify-between text-sm text-slate-800">
                  <span>Tax</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between text-sm text-slate-800">
                  <span>Other charges</span>
                  <span>₹{parseFloat(otherCharges || '0').toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t-2 border-slate-800 py-3 mb-3">
                <div className="flex justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-800">
                  <span>Received</span>
                  <span>₹{totalReceived.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-800">
                  <span>Balance</span>
                  <span>₹{balance.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-[#f8f9fa] flex flex-col font-sans h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-[11px] font-bold text-blue-800 tracking-wider uppercase mb-1 flex items-center gap-2">
            <span className="cursor-pointer hover:underline" onClick={onBack}>SALES / BILLING</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Build an invoice</h1>
          <p className="text-sm text-slate-500">Find an item, check the bill, then preview or issue a demo invoice.</p>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1">
          Quick search <span className="bg-white border border-gray-200 rounded px-1.5 py-0.5 shadow-sm text-slate-600 font-medium">Ctrl</span> + <span className="bg-white border border-gray-200 rounded px-1.5 py-0.5 shadow-sm text-slate-600 font-medium">K</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Pane - Products */}
        <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800">Products</h2>
              <span className="text-xs text-slate-500 font-medium">{DUMMY_PRODUCTS.length} items</span>
            </div>
            
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={productSearchQuery}
                onChange={(e) => setProductSearchQuery(e.target.value)}
                placeholder="Search title, author, SKU or barcode" 
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400 transition-shadow"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="relative w-48">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:border-blue-400 text-slate-700 font-medium bg-white truncate"
                >
                  <option value="All categories">All categories</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="text-[11px] text-slate-400">Click Add or press Enter</div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {DUMMY_PRODUCTS.filter(product => {
                const searchLower = productSearchQuery.toLowerCase();
                const matchesSearch = product.name.toLowerCase().includes(searchLower) || 
                                      product.sku.toLowerCase().includes(searchLower);
                const parts = product.sku.split(' - ');
                const productCategory = parts.length > 1 ? parts[parts.length - 1].trim() : product.sku;
                const matchesCategory = selectedCategory === 'All categories' || productCategory === selectedCategory;
                return matchesSearch && matchesCategory;
              }).map(product => (
                <div key={product.id} className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-gray-100 group">
                  <div className={`w-12 h-12 flex-shrink-0 rounded-md flex items-center justify-center text-[10px] font-bold ${
                    product.type === 'ITEM' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {product.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 truncate mb-0.5" title={product.name}>{product.name}</h3>
                    <p className="text-[11px] text-slate-500 truncate mb-1" title={product.sku}>{product.sku.replace(' - ', ' . ')}</p>
                    <div className="text-[11px] font-medium text-emerald-600">{product.stock} available</div>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <div className="font-bold text-slate-900 text-sm">₹{product.price.toFixed(2)}</div>
                    <button 
                      onClick={() => handleAddItem(product)}
                      className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-2 py-1 rounded shadow-sm transition-all active:scale-95"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane - Invoice Builder */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
          
          {/* Top Section */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-1">New invoice</h2>
                <p className="text-xs text-slate-500">Draft · Number assigned when issued</p>
              </div>
              <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Draft
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Document type</label>
                <div className="relative">
                  <select 
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:border-blue-400 text-slate-800 font-medium bg-white"
                  >
                    <option>Tax invoice</option>
                    <option>Bill of supply</option>
                    <option>Retail invoice</option>
                    <option>Pro forma</option>
                    <option>Quotation</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-400 text-slate-800 font-medium bg-white" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Branch / number series</label>
                <input type="text" value="Hyderabad · HYD-INV" readOnly className="w-full border border-gray-100 bg-slate-50 rounded-lg py-2 px-3 text-sm focus:outline-none text-slate-600 font-medium cursor-default" />
              </div>
            </div>
          </div>

          {/* Customer Section */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex justify-between items-center">
            <div>
              <div className="text-[10px] font-bold text-blue-600 tracking-wider uppercase mb-1">Customer</div>
              <h3 className="font-bold text-slate-800">{customerName || 'Walk-In customer'}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Add customer details if needed</p>
            </div>
            <button 
              onClick={() => setIsCustomerModalOpen(true)}
              className="text-xs font-bold text-slate-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95"
            >
              Edit customer
            </button>
          </div>

          {/* Invoice Items */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5 min-h-[250px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Invoice items <span className="text-slate-400 font-medium text-sm">({invoiceItems.length})</span></h3>
              {invoiceItems.length > 0 && (
                <button onClick={clearItems} className="text-xs font-bold text-red-600 hover:text-red-700">Clear items</button>
              )}
            </div>
            
            <div className="flex-1">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 pl-2">Item</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 w-16 text-center">Qty</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 w-24 text-right">Price ₹</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 w-20 text-center">Disc %</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 w-16 text-center">Tax %</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 pr-2 w-28 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-[13px] text-slate-400">
                        Your invoice is empty. Add an item from the product list.
                      </td>
                    </tr>
                  ) : (
                    invoiceItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-50">
                        <td className="py-3 pl-2">
                          <div className="text-sm font-semibold text-slate-800">{item.product.name}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{item.product.sku}</div>
                        </td>
                        <td className="py-3 text-center">
                          <input type="number" min="1" value={item.qty} readOnly className="w-12 text-center border border-gray-200 rounded py-1 text-sm font-medium focus:outline-none bg-transparent" />
                        </td>
                        <td className="py-3 text-right text-sm font-medium text-slate-700">{item.price.toFixed(2)}</td>
                        <td className="py-3 text-center text-sm font-medium text-slate-700">{item.disc}</td>
                        <td className="py-3 text-center text-sm font-medium text-slate-700">{item.tax}</td>
                        <td className="py-3 pr-2 text-right text-sm font-bold text-slate-900">{item.amount.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Row - Totals & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Totals */}
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5">
              <h3 className="font-bold text-slate-800 mb-4">Totals</h3>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Bill discount %</label>
                  <input 
                    type="number" 
                    value={billDiscount}
                    onChange={(e) => setBillDiscount(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-400 text-slate-800 font-medium" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Other charges ₹</label>
                  <input 
                    type="number" 
                    value={otherCharges}
                    onChange={(e) => setOtherCharges(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-400 text-slate-800 font-medium" 
                  />
                </div>
              </div>
              
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Item subtotal</span>
                  <span className="font-bold text-slate-800">
                    ₹{invoiceItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Line discounts</span>
                  <span className="font-bold text-slate-800">– ₹0.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Bill discount</span>
                  <span className="font-bold text-slate-800">– ₹0.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax</span>
                  <span className="font-bold text-slate-800">₹0.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Other charges</span>
                  <span className="font-bold text-slate-800">₹{parseFloat(otherCharges || '0').toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-4">
                 <span className="font-bold text-slate-900 text-sm">Total payable</span>
                 <span className="font-bold text-[#254ab8] text-xl">
                   ₹{(
                     invoiceItems.reduce((acc, item) => acc + item.amount, 0) + 
                     parseFloat(otherCharges || '0')
                   ).toFixed(2)}
                 </span>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Payment</h3>
                <button 
                  onClick={() => setPayments([...payments, { id: Date.now(), method: 'UPI', amount: '0', ref: '' }])}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#254ab8] hover:text-blue-800"
                >
                  <Plus className="w-3 h-3" /> Add method
                </button>
              </div>
              
              <div className="flex-1">
                {payments.length === 0 ? (
                  <div className="h-full min-h-[120px] flex flex-col items-center justify-center text-slate-400">
                    <p className="text-xs font-medium">No payment methods added</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {payments.map((payment, idx) => (
                      <div key={payment.id} className="space-y-2">
                        <div className="flex gap-2 items-center">
                          <div className="relative flex-1">
                            <select 
                              value={payment.method}
                              onChange={(e) => {
                                const newP = [...payments];
                                newP[idx].method = e.target.value;
                                setPayments(newP);
                              }}
                              className="w-full appearance-none border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:border-blue-400 text-slate-700 bg-white"
                            >
                              <option>UPI</option>
                              <option>Cash</option>
                              <option>Card</option>
                              <option>Bank transfer</option>
                              <option>Cheque</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                          <input 
                            type="number" 
                            value={payment.amount}
                            onChange={(e) => {
                              const newP = [...payments];
                              newP[idx].amount = e.target.value;
                              setPayments(newP);
                            }}
                            className="w-24 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-400 text-slate-800"
                          />
                          <button 
                            onClick={() => setPayments(payments.filter((_, i) => i !== idx))}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Transaction reference (optional)"
                          value={payment.ref}
                          onChange={(e) => {
                            const newP = [...payments];
                            newP[idx].ref = e.target.value;
                            setPayments(newP);
                          }}
                          className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-400 text-slate-800 placeholder:text-gray-400"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-6 space-y-2.5 text-sm pt-4 border-t border-gray-100">
                <div className="flex justify-between text-slate-500">
                  <span>Received</span>
                  <span className="font-bold text-slate-800">
                    ₹{totalReceived.toFixed(2)}
                  </span>
                </div>
                {balance > 0 || totalAmount === 0 ? (
                  <div className="flex justify-between text-slate-500">
                    <span>Balance due</span>
                    <span className="font-bold text-amber-700">₹{Math.max(0, balance).toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-slate-500">
                    <span>Status</span>
                    <span className="font-bold text-emerald-600">Paid in full</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Notes and Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Invoice note</label>
              <textarea 
                rows={3} 
                placeholder="Optional message to customer"
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500 text-slate-800 resize-none placeholder:text-gray-400"
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Order / reference number</label>
              <input 
                type="text" 
                placeholder="Optional PO or reference"
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500 text-slate-800 placeholder:text-gray-400"
              />
              <p className="text-[11px] text-slate-500 mt-1.5">Appears on the print preview.</p>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4 bg-[#f8f9fa] sticky bottom-0 z-10 pb-2">
            <div className="text-[11px] text-slate-500 leading-tight">
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg text-sm font-bold text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-colors">
                Save draft
              </button>
              <button 
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 rounded-lg text-sm font-bold text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-colors"
              >
                Preview
              </button>
              <button 
                onClick={() => {
                  setShowPreview(true);
                  setTimeout(() => window.print(), 100);
                }}
                className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-[#254ab8] hover:bg-blue-800 shadow-sm transition-colors"
              >
                Issue & print
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Customer Modal */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-6 pb-4 border-b border-gray-100 relative">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Customer details</h2>
              <p className="text-sm text-slate-500">Enter only the fields relevant to this invoice.</p>
              <button 
                onClick={() => setIsCustomerModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="relative">
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Name / business</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => {
                      if (customerName === 'Walk-in customer') setCustomerName('');
                      setIsDropdownOpen(true);
                    }}
                    placeholder="Search or enter name..."
                    className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800" 
                  />
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    <div 
                      className="px-3 py-2 text-sm text-slate-800 hover:bg-blue-50 cursor-pointer border-b border-gray-100 font-medium"
                      onClick={() => {
                        setCustomerName('Walk-in customer');
                        setCustomerPhone('');
                        setCustomerAddress('');
                        setCustomerState('');
                        setIsDropdownOpen(false);
                      }}
                    >
                      Walk-in customer
                    </div>
                    {members
                      .filter(m => `${m.first_name || ''} ${m.last_name || ''}`.toLowerCase().includes(customerName.toLowerCase()))
                      .map(m => {
                        const fullName = `${m.first_name || ''} ${m.last_name || ''}`.trim();
                        return (
                          <div 
                            key={m.id} 
                            className="px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 cursor-pointer"
                            onClick={() => {
                              setCustomerName(fullName);
                              setCustomerPhone(m.contact_number || '');
                              setCustomerAddress(`${m.address || ''}\n${m.city || ''}`.trim());
                              setCustomerState(m.state || '');
                              setIsDropdownOpen(false);
                            }}
                          >
                            <div className="font-semibold">{fullName}</div>
                            {m.contact_number && <div className="text-[11px] text-slate-500">{m.contact_number}</div>}
                          </div>
                        );
                    })}
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Phone</label>
                  <input 
                    type="text" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1.5">GSTIN (if applicable)</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800" />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Billing address</label>
                <textarea 
                  rows={3} 
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 resize-none"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">State / place of supply</label>
                <input 
                  type="text" 
                  value={customerState}
                  onChange={(e) => setCustomerState(e.target.value)}
                  placeholder="e.g. Telangana" 
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800" 
                />
              </div>
            </div>
            
            <div className="p-6 pt-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button 
                onClick={() => setIsCustomerModalOpen(false)}
                className="px-5 py-2 rounded-lg text-sm font-bold text-slate-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsCustomerModalOpen(false)}
                className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-[#254ab8] hover:bg-blue-800 transition-colors shadow-sm"
              >
                Save customer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BuildInvoice;
