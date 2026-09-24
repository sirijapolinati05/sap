import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus, Trash2, Package, Users, Minus, MessageCircle, FileText, User, Eye, Save, Phone, MapPin, Building, X } from 'lucide-react';

interface Product {
  id: number;
  type: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
}

interface InvoiceItem {
  id: number;
  product: Product;
  qty: number;
  price: number;
  disc: number;
  tax: number;
  amount: number;
}

interface BuildInvoiceProps {
  onBack?: () => void;
  onSave?: (invoice: any, returnToInvoices?: boolean) => void;
  initialInvoice?: any;
  openInPreview?: boolean;
  openInPosMode?: boolean;
}

const BuildInvoice: React.FC<BuildInvoiceProps> = ({ onBack, onSave, initialInvoice, openInPreview, openInPosMode }) => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>(initialInvoice?.items || []);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(!!openInPreview);
  
  const [documentType, setDocumentType] = useState(initialInvoice?.documentType || 'Tax invoice');
  const [invoiceDate, setInvoiceDate] = useState(initialInvoice?.date || new Date().toISOString().split('T')[0]);
  const [customerName, setCustomerName] = useState(initialInvoice?.customer || 'Walk-in customer');
  const [customerPhone, setCustomerPhone] = useState(initialInvoice?.customerPhone || '');
  const [customerAddress, setCustomerAddress] = useState(initialInvoice?.customerAddress || '');
  const [customerState, setCustomerState] = useState(initialInvoice?.customerState || '');
  
  const [billDiscount, setBillDiscount] = useState<string>('0');
  const [otherCharges, setOtherCharges] = useState<string>(initialInvoice?.otherCharges || '0');
  const [payments, setPayments] = useState<{id: number, method: string, amount: string, ref: string}[]>(initialInvoice?.payments || [{
    id: Date.now(),
    method: 'UPI',
    amount: '',
    ref: ''
  }]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  const [products, setProducts] = useState<Product[]>([]);

  // Extract unique categories (text after the last ' - ')
  const categories = Array.from(new Set(products.map(p => {
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
      
    fetch('http://localhost:8000/inventory')
      .then(res => res.json())
      .then(data => {
        const mappedProducts = data.map((item: any) => ({
          id: item.id,
          type: item.item_type || 'ITEM',
          name: item.item_name || '',
          sku: `${item.item_code} - ${item.item_category}`,
          stock: item.opening_qty || 0,
          price: item.opening_rate || 0,
        }));
        setProducts(mappedProducts);
      })
      .catch(console.error);
  }, []);

  const handleAddItem = (product: Product) => {
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
  const totalReceived = payments.reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0);
  const balance = totalAmount - totalReceived;

  const handleSave = (status: string, returnToInvoices: boolean = true) => {
    if (onSave) {
      onSave({
        id: initialInvoice?.id || `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        date: invoiceDate,
        customer: customerName || 'Walk-in customer',
        amount: totalAmount.toFixed(2),
        status: status,
        items: invoiceItems,
        customerPhone,
        customerAddress,
        customerState,
        otherCharges,
        payments,
        documentType
      }, returnToInvoices);
    }
  };

  if (showPreview) {
    return (
      <div className="bg-white min-h-[calc(100vh-56px)] text-slate-900 font-sans p-8 max-w-4xl print:p-0 print:max-w-none print:w-full">
        
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
              <h1 className="text-xl font-bold text-[#1a2b4b] mb-1 mt-6">SAS Hyderabad</h1>
              <div className="text-sm text-slate-600">Hyderabad</div>
              <div className="text-sm text-slate-600">Hyderabad, Telangana</div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-[#1a2b4b] mb-2 mt-6">{documentType}</h2>
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
    <div className="flex flex-col font-sans h-full bg-transparent">
      {/* Header */}
      <div className="mb-6 relative">
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="text-[10px] font-bold text-amber-500 tracking-wider uppercase mb-1 flex items-center gap-2">
              <span className="cursor-pointer hover:underline" onClick={onBack}>SALES / BILLING</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0c3f50] mb-1">Build an invoice</h1>
            <p className="text-slate-500 text-sm">Find an item, check the bill, then preview or issue a demo invoice.</p>
          </div>
        </div>
      </div>

      <div className={`flex flex-col ${openInPosMode ? 'lg:flex-row gap-6 flex-1 min-h-0 w-full' : 'gap-6 flex-1 min-h-0 bg-white p-4 md:p-6 rounded-2xl max-w-5xl mx-auto w-full'}`}>
        
        {/* Left Pane - Products (POS Mode Only) */}
        {openInPosMode && (
          <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col bg-white rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden h-fit max-h-full">
            <div className="bg-white z-10 p-5 pb-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-slate-800 flex items-center gap-3 text-lg">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                    <Package className="w-5 h-5" />
                  </div>
                  Products
                </h2>
                <span className="text-xs text-slate-500 font-medium">{products.length} items</span>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  placeholder="Search title, author, SKU or barcode" 
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-300 focus:bg-white placeholder:text-gray-400 transition-all text-slate-700 font-medium"
                />
              </div>
              
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1 group">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-2 pl-3 pr-8 text-sm focus:outline-none focus:border-blue-300 text-slate-700 font-medium truncate transition-all"
                  >
                    <option value="All categories">All categories</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 px-4 py-2 rounded-xl transition-all border border-gray-200 shadow-sm shrink-0">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-2">
                {products.filter(product => {
                  const searchLower = productSearchQuery.toLowerCase();
                  const matchesSearch = product.name.toLowerCase().includes(searchLower) || 
                                        product.sku.toLowerCase().includes(searchLower);
                  const parts = product.sku.split(' - ');
                  const productCategory = parts.length > 1 ? parts[parts.length - 1].trim() : product.sku;
                  const matchesCategory = selectedCategory === 'All categories' || productCategory === selectedCategory;
                  return matchesSearch && matchesCategory;
                }).map(product => (
                  <div key={product.id} className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-gray-100 transition-all group cursor-pointer bg-white">
                    <div className="w-14 h-14 flex-shrink-0 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                      {product.type === 'BOOK' ? (
                        <div className="w-8 h-10 bg-amber-600 rounded-sm shadow-sm flex items-center justify-center text-white text-[8px] font-serif text-center px-1 leading-tight">{product.name.slice(0, 15)}</div>
                      ) : (
                        <Package className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="text-sm font-bold text-slate-800 truncate mb-0.5" title={product.name}>{product.name}</h3>
                      <p className="text-[11px] text-slate-500 truncate mb-1.5" title={product.sku}>{product.sku.replace(' - ', ' . ')}</p>
                      <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        {product.stock} available
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between flex-shrink-0 py-0.5">
                      <div className="font-bold text-slate-700 text-sm tracking-tight">₹{product.price.toFixed(2)}</div>
                      <button 
                        onClick={() => {
                          setInvoiceItems([...invoiceItems, {
                            product: product,
                            qty: 1,
                            price: product.price,
                            disc: 0,
                            tax: 0,
                            amount: product.price
                          }]);
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-white hover:bg-blue-50 border border-gray-200 px-3 py-1.5 rounded-lg transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Invoice Builder */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-4">
          
          {/* Top Section */}
          <div className="bg-white rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 p-6 relative overflow-hidden">
            <div className="bg-[#eff1fe] p-5 rounded-2xl mb-6 flex items-center gap-4 relative overflow-hidden">
               <div className="absolute right-0 bottom-0 w-64 h-full pointer-events-none opacity-50">
                 <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-[#dce1fc]">
                   <path d="M0,50 Q25,20 50,30 T100,10 L100,50 Z" fill="currentColor" />
                 </svg>
               </div>
               <div className="bg-white w-12 h-12 rounded-xl text-blue-600 flex items-center justify-center shrink-0 shadow-sm relative z-10">
                 <FileText className="w-6 h-6 text-blue-500" />
               </div>
               <div className="relative z-10">
                 <h2 className="text-lg font-bold text-slate-800 mb-0.5 tracking-tight">New invoice</h2>
                 <p className="text-xs text-slate-500">Create and manage customer invoices</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Document type</label>
                <div className="relative">
                  <select 
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-2.5 pl-3 pr-8 text-sm focus:outline-none focus:border-blue-400 text-slate-700 font-medium transition-all shadow-sm"
                  >
                    <option>Tax invoice</option>
                    <option>Bill of supply</option>
                    <option>Retail invoice</option>
                    <option>Pro forma</option>
                    <option>Quotation</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-blue-400 text-slate-700 font-medium transition-all shadow-sm" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Branch / number series</label>
                <div className="relative">
                  <input type="text" value="Hyderabad · HYD-INV" readOnly className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none text-slate-600 font-medium cursor-default shadow-sm" />
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Customer Section */}
          <div className="bg-white rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] p-5 relative overflow-hidden border border-gray-100 flex flex-col gap-5">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="bg-[#f3effe] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                     <User className="w-6 h-6 text-[#7c3aed]" />
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-800 text-sm mb-0.5">{customerName || 'Customer'}</h3>
                     <p className="text-[11px] text-slate-400">Select a customer or add new</p>
                   </div>
                </div>
                <button 
                  onClick={() => setIsCustomerModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 px-4 py-2 rounded-lg transition-all border border-blue-100 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> {customerName && customerName !== 'Walk-in customer' ? 'Edit Customer' : 'Add New Customer'}
                </button>
             </div>
             
             {/* Customer Search Bar */}
             <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Search customer by name, mobile or email..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-colors text-slate-700" 
                />
             </div>
          </div>

          {/* Invoice Items */}
          <div className="bg-white rounded-3xl shadow-sm min-h-[250px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Invoice items <span className="text-slate-400 font-medium text-sm">({invoiceItems.length})</span></h3>
              {invoiceItems.length > 0 && (
                <button onClick={clearItems} className="text-xs font-bold text-red-600 hover:text-red-700">Clear items</button>
              )}
            </div>
            
            <div className="flex-1 overflow-x-auto pb-4">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 pl-2 w-64">Item</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 w-28 text-center">Qty</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 w-24 text-right">Price ₹</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 w-20 text-center">Disc %</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 w-16 text-center">Tax %</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 pr-2 w-28 text-right">Amount</th>
                    <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 w-12 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center">
                           <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center mb-3">
                              <FileText className="w-6 h-6 text-gray-300" />
                           </div>
                           <h4 className="text-sm font-bold text-slate-700 mb-1 tracking-tight">Your invoice is empty</h4>
                           <p className="text-[11px]">Search and add items from the products list to get started.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    invoiceItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-50/50 group">
                        <td className="py-3 pl-2">
                          <div className="relative">
                            <select 
                              value={item.product?.id || ''}
                              onChange={(e) => {
                                const p = products.find(prod => prod.id.toString() === e.target.value);
                                if (p) {
                                  const newItems = [...invoiceItems];
                                  newItems[idx] = { 
                                    ...newItems[idx], 
                                    product: p, 
                                    price: p.price, 
                                    amount: p.price * newItems[idx].qty * (1 - newItems[idx].disc/100) 
                                  };
                                  setInvoiceItems(newItems);
                                }
                              }}
                              className="w-full appearance-none bg-white rounded-xl py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-0 text-slate-700 font-medium transition-all shadow-sm border-none"
                            >
                              <option value="" disabled>Select product...</option>
                              {products.map(p => (
                                <option key={p.id} value={p.id}>{p.name} (₹{p.price})</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center justify-center gap-1.5">
                            <button 
                              onClick={() => {
                                const newQty = Math.max(1, item.qty - 1);
                                const newItems = [...invoiceItems];
                                newItems[idx].qty = newQty;
                                newItems[idx].amount = newItems[idx].price * newQty * (1 - newItems[idx].disc/100);
                                setInvoiceItems(newItems);
                              }}
                              className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg bg-white shadow-sm active:shadow-sm text-slate-500 hover:text-blue-600 transition-all border-none focus:outline-none"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input 
                              type="number" 
                              min="1" 
                              value={item.qty} 
                              onChange={(e) => {
                                const newQty = parseInt(e.target.value) || 1;
                                const newItems = [...invoiceItems];
                                newItems[idx].qty = newQty;
                                newItems[idx].amount = newItems[idx].price * newQty * (1 - newItems[idx].disc/100);
                                setInvoiceItems(newItems);
                              }}
                              className="w-10 text-center bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 py-1.5 text-sm font-medium focus:outline-none border-none text-slate-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                            />
                            <button 
                              onClick={() => {
                                const newQty = item.qty + 1;
                                const newItems = [...invoiceItems];
                                newItems[idx].qty = newQty;
                                newItems[idx].amount = newItems[idx].price * newQty * (1 - newItems[idx].disc/100);
                                setInvoiceItems(newItems);
                              }}
                              className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg bg-white shadow-sm active:shadow-sm text-slate-500 hover:text-blue-600 transition-all border-none focus:outline-none"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <input 
                            type="number" 
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => {
                              const newPrice = parseFloat(e.target.value) || 0;
                              const newItems = [...invoiceItems];
                              newItems[idx].price = newPrice;
                              newItems[idx].amount = newPrice * newItems[idx].qty * (1 - newItems[idx].disc/100);
                              setInvoiceItems(newItems);
                            }}
                            className="w-20 text-right bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 py-2 text-sm font-medium focus:outline-none border-none text-slate-700 ml-auto block" 
                          />
                        </td>
                        <td className="py-3 text-center px-2">
                          <input 
                            type="number" 
                            min="0"
                            max="100"
                            value={item.disc}
                            onChange={(e) => {
                              const newDisc = parseFloat(e.target.value) || 0;
                              const newItems = [...invoiceItems];
                              newItems[idx].disc = newDisc;
                              newItems[idx].amount = newItems[idx].price * newItems[idx].qty * (1 - newDisc/100);
                              setInvoiceItems(newItems);
                            }}
                            className="w-16 text-center bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 py-2 text-sm font-medium focus:outline-none border-none text-slate-700 block" 
                          />
                        </td>
                        <td className="py-3 text-center text-sm font-medium text-slate-700">{item.tax}</td>
                        <td className="py-3 pr-2 text-right text-sm font-bold text-slate-900">₹{item.amount.toFixed(2)}</td>
                        <td className="py-3 text-center">
                          <button 
                            onClick={() => {
                              const newItems = [...invoiceItems];
                              newItems.splice(idx, 1);
                              setInvoiceItems(newItems);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={() => {
                  setInvoiceItems([
                    ...invoiceItems, 
                    { product: { id: '', name: '', sku: '', price: 0 }, qty: 1, price: 0, disc: 0, tax: 0, amount: 0 }
                  ]);
                }}
                className="flex items-center gap-2 text-[11px] font-bold text-blue-600 bg-white shadow-sm hover:shadow-sm hover:text-blue-700 px-4 py-2.5 rounded-xl transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item Line
              </button>
            </div>
          </div>

          {/* Bottom Row - Totals & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Totals */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="font-bold text-slate-700 mb-4 tracking-tight">Totals</h3>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Bill discount %</label>
                  <input 
                    type="number" 
                    value={billDiscount}
                    onChange={(e) => setBillDiscount(e.target.value)}
                    className="w-full bg-gray-50/50 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 font-medium transition-all shadow-sm border border-gray-100" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-slate-500 mb-1.5">Other charges ₹</label>
                  <input 
                    type="number" 
                    value={otherCharges}
                    onChange={(e) => setOtherCharges(e.target.value)}
                    className="w-full bg-gray-50/50 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 font-medium transition-all shadow-sm border border-gray-100" 
                  />
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
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
              
              <div className="mt-5 flex justify-between items-center border-t border-gray-100 pt-5">
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
            <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700 tracking-tight">Payment</h3>
                <button 
                  onClick={() => setPayments([...payments, { id: Date.now(), method: 'UPI', amount: '0', ref: '' }])}
                  className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50/50 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
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
                                className="w-full appearance-none bg-gray-50/50 rounded-xl py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 transition-all border border-gray-100 shadow-sm"
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
                            className="w-24 bg-gray-50/50 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 transition-all border border-gray-100 shadow-sm"
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
                          className="w-full bg-gray-50/50 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 placeholder:text-gray-400 transition-all border border-gray-100 shadow-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-6 space-y-3 text-sm pt-5 border-t border-gray-100">
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
          <div className="flex items-center justify-end pt-2 mt-4 sticky bottom-0 z-10 pb-2">
            <div className="flex gap-4">
              <button 
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-colors"
              >
                <Eye className="w-4 h-4" /> Preview Invoice
              </button>
              <button 
                onClick={() => {
                  let status = 'Unpaid';
                  if (totalReceived >= totalAmount && totalAmount > 0) status = 'Paid';
                  else if (totalReceived > 0) status = 'Partial';
                  
                  handleSave(status, false);
                  setShowPreview(true);
                  setTimeout(() => window.print(), 100);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#2563eb] hover:bg-blue-700 shadow-sm transition-colors border-none"
              >
                <Save className="w-4 h-4" /> Save & Issue Invoice
              </button>
              <button 
                onClick={() => {
                  if (!customerPhone) {
                    alert('Please enter a customer mobile number first.');
                    return;
                  }
                  const phoneFormatted = customerPhone.replace(/\D/g, '');
                  if (phoneFormatted.length < 10) {
                    alert('Please enter a valid mobile number.');
                    return;
                  }
                  const finalPhone = phoneFormatted.length === 10 ? `91${phoneFormatted}` : phoneFormatted;
                  window.open(`https://wa.me/${finalPhone}`, '_blank');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#25D366] hover:bg-[#1ebd59] shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Customer Modal */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.1)] w-full max-w-[550px] overflow-hidden flex flex-col relative">
            
            <button 
              onClick={() => setIsCustomerModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-100 hover:bg-gray-50 text-slate-500 transition-colors z-20 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="bg-[#eff1fe] p-6 relative overflow-hidden">
               <div className="absolute right-0 bottom-0 w-64 h-full pointer-events-none opacity-50">
                 <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-[#dce1fc]">
                   <path d="M0,50 Q25,20 50,30 T100,10 L100,50 Z" fill="currentColor" />
                 </svg>
               </div>
               <div className="flex items-center gap-4 relative z-10">
                 <div className="bg-white w-14 h-14 rounded-2xl text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                   <Users className="w-7 h-7 text-blue-600" />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-[#0c3f50] mb-0.5 tracking-tight">Customer details</h2>
                   <p className="text-sm text-slate-500">Enter only the fields relevant to this invoice.</p>
                 </div>
               </div>
            </div>
            
            <div className="p-6 space-y-5">
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-1.5">
                   <div className="bg-[#eff1fe] text-blue-600 p-1.5 rounded-lg">
                      <User className="w-3.5 h-3.5" />
                   </div>
                   <label className="block text-sm font-bold text-slate-700">Name / business <span className="text-red-500">*</span></label>
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
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
                    className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-8 text-sm focus:outline-none focus:border-blue-400 text-slate-800 transition-colors shadow-sm" 
                  />
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    <div 
                      className="px-3 py-2.5 text-sm text-slate-800 hover:bg-blue-50 cursor-pointer border-b border-gray-100 font-medium"
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
                            className="px-3 py-2.5 text-sm text-slate-700 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0"
                            onClick={() => {
                              setCustomerName(fullName);
                              setCustomerPhone(m.contact_number || '');
                              setCustomerAddress(`${m.address || ''}\n${m.city || ''}`.trim());
                              setCustomerState(m.state || '');
                              setIsDropdownOpen(false);
                            }}
                          >
                            <div className="font-semibold">{fullName}</div>
                            {m.contact_number && <div className="text-[11px] text-slate-500 mt-0.5">{m.contact_number}</div>}
                          </div>
                        );
                    })}
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                     <div className="bg-[#eff1fe] text-blue-600 p-1.5 rounded-lg">
                        <Phone className="w-3.5 h-3.5" />
                     </div>
                     <label className="block text-sm font-bold text-slate-700">Phone</label>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input 
                      type="text" 
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-400 text-slate-800 transition-colors shadow-sm" 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                     <div className="bg-[#eff1fe] text-blue-600 p-1.5 rounded-lg">
                        <FileText className="w-3.5 h-3.5" />
                     </div>
                     <label className="block text-sm font-bold text-slate-700">GSTIN (if applicable)</label>
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input 
                      type="text" 
                      placeholder="Enter GSTIN number"
                      className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-400 text-slate-800 transition-colors shadow-sm" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                   <div className="bg-[#eff1fe] text-blue-600 p-1.5 rounded-lg">
                      <MapPin className="w-3.5 h-3.5" />
                   </div>
                   <label className="block text-sm font-bold text-slate-700">Billing address</label>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  <textarea 
                    rows={3} 
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Enter complete billing address"
                    className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-400 text-slate-800 resize-none transition-colors shadow-sm"
                  ></textarea>
                  <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 font-medium">
                    {customerAddress.length}/300
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                   <div className="bg-[#eff1fe] text-blue-600 p-1.5 rounded-lg">
                      <Building className="w-3.5 h-3.5" />
                   </div>
                   <label className="block text-sm font-bold text-slate-700">State / place of supply</label>
                </div>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input 
                    type="text" 
                    value={customerState}
                    onChange={(e) => setCustomerState(e.target.value)}
                    placeholder="e.g. Telangana" 
                    className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-8 text-sm focus:outline-none focus:border-blue-400 text-slate-800 transition-colors shadow-sm" 
                  />
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
              <button 
                onClick={() => setIsCustomerModalOpen(false)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button 
                onClick={() => setIsCustomerModalOpen(false)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#2563eb] hover:bg-blue-700 transition-colors shadow-sm border-none"
              >
                <Save className="w-4 h-4" /> Save customer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BuildInvoice;
