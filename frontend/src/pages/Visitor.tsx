import React, { useState, useEffect } from 'react';
import { Search, Edit, X, Star, Filter, ChevronDown, ArrowDown, User, Calendar, MapPin, Mail, Phone, FileText, List, Save, Users, CalendarDays } from 'lucide-react';

const hyderabadPincodes = Array.from({length: 114}, (_, i) => (500001 + i).toString());

const emptyForm = {
  title: 'Mrs',
  first_name: '',
  last_name: '',
  dob: '',
  country_code: '+ 91(India)',
  mobile: '',
  email: '',
  address_1: '',
  address_2: '',
  address_3: '',
  city: '',
  pincode: '',
  country: '',
  state: '',
  visit_date: new Date().toISOString().split('T')[0],
  visit_purpose: '',
  interested_to_become_member: false
};

const Visitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'list'>('register');
  const [members, setMembers] = useState<any[]>([]);
  const [formData, setFormData] = useState({ ...emptyForm });

  const [visitorsList, setVisitorsList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Edit modal state
  const [editingVisitor, setEditingVisitor] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ ...emptyForm });
  const [editSaving, setEditSaving] = useState(false);

  const fetchVisitors = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/visitors`);
      const data = await res.json();
      setVisitorsList(data);
    } catch (err) {
      console.error("Error fetching visitors:", err);
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/members`)
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error("Error fetching members:", err));
      
    fetchVisitors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    if (!formData.first_name.trim()) { alert("First Name is required."); return; }
    if (!formData.mobile.trim()) { alert("Mobile Number is required."); return; }
    if (!formData.visit_purpose.trim()) { alert("Visit Purpose is required."); return; }
    
    try {
      const submitData: any = { ...formData };
      if (!submitData.dob) delete submitData.dob;
      if (!submitData.visit_date) delete submitData.visit_date;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/visitors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      
      if (response.ok) {
        alert("Visitor registered successfully!");
        fetchVisitors();
        setFormData({ ...emptyForm, visit_date: new Date().toISOString().split('T')[0] });
        setActiveTab('list');
      } else {
        alert("Failed to register visitor.");
      }
    } catch (error) {
      console.error("Error saving visitor:", error);
      alert("An error occurred while saving.");
    }
  };

  // --- Edit handlers ---
  const handleEditOpen = (visitor: any) => {
    setEditingVisitor(visitor);
    setEditForm({
      title: visitor.title || 'Mrs',
      first_name: visitor.first_name || '',
      last_name: visitor.last_name || '',
      dob: visitor.dob || '',
      country_code: visitor.country_code || '+ 91(India)',
      mobile: visitor.mobile || '',
      email: visitor.email || '',
      address_1: visitor.address_1 || '',
      address_2: visitor.address_2 || '',
      address_3: visitor.address_3 || '',
      city: visitor.city || '',
      pincode: visitor.pincode || '',
      country: visitor.country || '',
      state: visitor.state || '',
      visit_date: visitor.visit_date || new Date().toISOString().split('T')[0],
      visit_purpose: visitor.visit_purpose || '',
      interested_to_become_member: visitor.interested_to_become_member || false,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditSave = async () => {
    if (!editForm.first_name.trim()) { alert("First Name is required."); return; }
    if (!editForm.mobile.trim()) { alert("Mobile Number is required."); return; }
    if (!editForm.visit_purpose.trim()) { alert("Visit Purpose is required."); return; }

    setEditSaving(true);
    try {
      const submitData: any = { ...editForm };
      if (!submitData.dob) delete submitData.dob;
      if (!submitData.visit_date) delete submitData.visit_date;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/visitors/${editingVisitor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        await fetchVisitors();
        setEditingVisitor(null);
      } else {
        alert("Failed to update visitor.");
      }
    } catch (error) {
      console.error("Error updating visitor:", error);
      alert("An error occurred while updating.");
    } finally {
      setEditSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Edit Modal */}
      {editingVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-sm w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-slate-800">Edit Visitor</h2>
              <button
                onClick={() => setEditingVisitor(null)}
                className="p-1.5 rounded-lg bg-white shadow-sm hover:shadow-sm text-slate-500 hover:text-red-500 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column */}
              <div className="flex-1 space-y-0">
                <div className="bg-[#a56472] text-white px-4 py-2 font-semibold text-sm rounded-t-md shadow-md">
                  Visitor Info
                </div>
                <div className="border-none rounded-b-md p-5 space-y-4 bg-white shadow-sm">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 relative w-max">
                      Title<span className="text-red-500 absolute -top-1 -right-2 text-lg leading-none">*</span>
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {['Mr', 'Mrs', 'Ms', 'Dr'].map(t => (
                        <label key={t} className="flex items-center space-x-1 cursor-pointer">
                          <input type="radio" name="title" value={t} checked={editForm.title === t} onChange={handleEditChange} className="form-radio text-black focus:ring-black h-4 w-4" />
                          <span className="text-sm font-medium">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* First / Last Name */}
                  <div className="flex gap-4">
                    <div className="relative w-1/2 bg-white shadow-sm rounded overflow-hidden">
                      <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent"></div>
                      <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">First Name</label>
                      <input type="text" name="first_name" value={editForm.first_name} onChange={handleEditChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                    </div>
                    <div className="relative w-1/2 bg-white shadow-sm rounded overflow-hidden">
                      <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Last Name</label>
                      <input type="text" name="last_name" value={editForm.last_name} onChange={handleEditChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                    </div>
                  </div>
                  {/* DOB */}
                  <div className="relative bg-white shadow-sm rounded overflow-hidden">
                    <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Date of Birth</label>
                    <input type="date" name="dob" value={editForm.dob} onChange={handleEditChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                  </div>
                  {/* Country Code & Mobile */}
                  <div className="flex gap-4">
                    <div className="relative w-1/3 bg-white shadow-sm rounded overflow-hidden">
                      <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent"></div>
                      <label className="block px-2 pt-1 text-[10px] font-medium text-[#52a8d1]">Country Code</label>
                      <select name="country_code" value={editForm.country_code} onChange={handleEditChange} className="w-full text-sm focus:outline-none text-gray-800 font-medium bg-transparent px-2 pb-1 appearance-none">
                        <option value="+ 91(India)">+ 91(India)</option>
                        <option value="+ 1(USA)">+ 1(USA)</option>
                      </select>
                    </div>
                    <div className="relative w-2/3 bg-white shadow-sm rounded overflow-hidden">
                      <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent"></div>
                      <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Mobile Number</label>
                      <input type="text" name="mobile" value={editForm.mobile} onChange={handleEditChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                    </div>
                  </div>
                  {/* Email */}
                  <div className="relative bg-white shadow-sm rounded overflow-hidden">
                    <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Email</label>
                    <input type="email" name="email" value={editForm.email} onChange={handleEditChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                  </div>
                  {/* Address */}
                  {['address_1', 'address_2', 'address_3'].map((field, i) => (
                    <div key={field} className="relative bg-white shadow-sm rounded overflow-hidden">
                      <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Address {i + 1}</label>
                      <input type="text" name={field} value={(editForm as any)[field]} onChange={handleEditChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                    </div>
                  ))}
                  {/* City & Pincode */}
                  <div className="flex gap-4">
                    <div className="relative w-1/2 bg-white shadow-sm rounded overflow-hidden">
                      <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">City</label>
                      <input type="text" name="city" value={editForm.city} onChange={handleEditChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                    </div>
                    <div className="relative w-1/2 bg-white shadow-sm rounded overflow-hidden flex items-center">
                      <input list="edit-hyderabad-pincodes" name="pincode" value={editForm.pincode} onChange={handleEditChange} className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none text-gray-800 font-medium placeholder-gray-500" placeholder="Pincode" />
                      <datalist id="edit-hyderabad-pincodes">
                        {hyderabadPincodes.map(pin => <option key={pin} value={pin} />)}
                      </datalist>
                    </div>
                  </div>
                  {/* Country & State */}
                  <div className="flex gap-4">
                    <div className="relative w-1/2 bg-white shadow-sm rounded overflow-hidden flex items-center">
                      <select name="country" value={editForm.country} onChange={handleEditChange} className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none text-gray-800 font-medium appearance-none">
                        <option value="">Country</option>
                        <option value="India">India</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2 pointer-events-none" />
                    </div>
                    <div className="relative w-1/2 bg-white shadow-sm rounded overflow-hidden flex flex-col">
                      <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">State</label>
                      <div className="flex items-center px-2 pb-1 relative">
                        <select name="state" value={editForm.state} onChange={handleEditChange} className="w-full text-sm focus:outline-none text-gray-800 font-medium bg-transparent appearance-none">
                          <option value="">--Select--</option>
                          <option value="Telangana">Telangana</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-600 absolute right-0 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full lg:w-[300px] flex flex-col gap-4 pt-0 lg:pt-10">
                {/* Visit Date */}
                <div className="relative bg-white shadow-sm rounded overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent z-10 pointer-events-none"></div>
                  <label className="block px-3 pt-1.5 text-[10px] font-medium text-gray-500">Visit Date</label>
                  <input type="date" name="visit_date" value={editForm.visit_date} onChange={handleEditChange} className="w-full bg-transparent px-3 pb-1.5 text-sm focus:outline-none text-gray-800 font-medium" />
                </div>
                {/* Visit Purpose */}
                <div>
                  <div className="relative bg-white shadow-sm rounded overflow-hidden">
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent pointer-events-none"></div>
                    <label className="block px-3 pt-1.5 text-[10px] font-medium text-gray-500">Visit Purpose</label>
                    <textarea name="visit_purpose" value={editForm.visit_purpose} onChange={handleEditChange} className="w-full px-3 pb-1 text-sm focus:outline-none text-gray-800 font-medium min-h-[60px] resize-none bg-transparent" />
                  </div>
                  <div className="text-right text-[10px] text-gray-500 font-medium mt-1">Required</div>
                </div>
                {/* Interested */}
                <div className="flex items-center space-x-2 pt-2">
                  <input type="checkbox" id="edit-interested" name="interested_to_become_member" checked={editForm.interested_to_become_member} onChange={handleEditChange} className="rounded border-gray-400 text-gray-600 focus:ring-gray-600 h-4 w-4 bg-white" />
                  <label htmlFor="edit-interested" className="text-sm font-medium text-gray-700">Is interested to become Member</label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setEditingVisitor(null)}
                className="bg-white hover:shadow-sm hover:text-red-600 text-black px-8 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={editSaving}
                className="bg-white hover:shadow-sm hover:text-green-600 text-black px-8 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm disabled:opacity-50"
              >
                {editSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header & Tabs */}
      <div className="mb-6 relative">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-[#0c3f50]">Visitor</h1>
          <p className="text-slate-500 text-sm mt-1 mb-6">Register a new visitor or view the visitor list</p>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('register')}
              className={`flex items-center justify-center px-5 py-2.5 font-semibold text-sm transition-all rounded-lg ${
                activeTab === 'register' 
                  ? 'bg-[#2b6be0] text-white shadow-sm hover:bg-[#255bc2]' 
                  : 'text-slate-600 hover:bg-gray-100 bg-transparent'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Visitor Register
            </button>
            <button 
              onClick={() => setActiveTab('list')}
              className={`flex items-center justify-center px-5 py-2.5 font-semibold text-sm transition-all rounded-lg ${
                activeTab === 'list' 
                  ? 'bg-[#2b6be0] text-white shadow-sm hover:bg-[#255bc2]' 
                  : 'text-slate-600 hover:bg-gray-100 bg-transparent'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              Visitor List
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'register' ? (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                <div className="flex items-start space-x-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#f0f5fc] text-[#2b6be0] flex items-center justify-center">
                    <User className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h2 className="text-[17px] font-bold text-slate-800">Visitor Information</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Please enter the visitor details below</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-4">
                      {['Mr', 'Mrs', 'Ms', 'Dr'].map(t => (
                        <label key={t} className="flex items-center space-x-2 cursor-pointer">
                          <input type="radio" name="title" value={t} checked={formData.title === t} onChange={handleChange} className="w-4 h-4 text-[#2b6be0] border-gray-300 focus:ring-[#2b6be0]" />
                          <span className="text-sm font-medium text-gray-700">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* First Name & Last Name */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="text" name="first_name" value={formData.first_name || ''} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] placeholder-gray-400" placeholder="Enter first name" />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="text" name="last_name" value={formData.last_name || ''} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] placeholder-gray-400" placeholder="Enter last name" />
                      </div>
                    </div>
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] text-gray-800" />
                    </div>
                  </div>

                  {/* Country Code & Mobile Number */}
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Country Code</label>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 flex items-center">
                          <span className="text-sm">🇮🇳</span>
                        </div>
                        <select name="country_code" value={formData.country_code || ''} onChange={handleChange} className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] appearance-none bg-white">
                          <option value="+ 91(India)">+91 (India)</option>
                          <option value="+ 1(USA)">+1 (USA)</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="w-2/3">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="text" name="mobile" value={formData.mobile || ''} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] placeholder-gray-400" placeholder="Enter mobile number" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] placeholder-gray-400" placeholder="Enter email address" />
                    </div>
                  </div>

                  {/* Address 1, 2, 3 */}
                  {['address_1', 'address_2', 'address_3'].map((field, i) => (
                    <div key={field}>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Address {i + 1}</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="text" name={field} value={(formData as any)[field] || ''} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] placeholder-gray-400" placeholder={`Enter address line ${i + 1}`} />
                      </div>
                    </div>
                  ))}

                  {/* City & Pincode */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">City</label>
                      <input type="text" name="city" value={formData.city || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] placeholder-gray-400" placeholder="Enter city" />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Pincode</label>
                      <div className="relative">
                        <input 
                          list="hyderabad-pincodes"
                          name="pincode" 
                          value={formData.pincode || ''} 
                          onChange={handleChange} 
                          className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] placeholder-gray-400" 
                          placeholder="Search Pincode"
                        />
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                        <datalist id="hyderabad-pincodes">
                          {hyderabadPincodes.map(pin => <option key={pin} value={pin} />)}
                        </datalist>
                      </div>
                    </div>
                  </div>

                  {/* Country & State */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Country</label>
                      <div className="relative">
                        <select name="country" value={formData.country || ''} onChange={handleChange} className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] appearance-none bg-white text-gray-700">
                          <option value="">Country</option>
                          <option value="India">India</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">State</label>
                      <div className="relative">
                        <select name="state" value={formData.state || ''} onChange={handleChange} className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] appearance-none bg-white text-gray-700">
                          <option value="">--Select--</option>
                          <option value="Telangana">Telangana</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="w-full lg:w-[480px] space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start space-x-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#fce8e8] text-[#e63946] flex items-center justify-center">
                    <CalendarDays className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h2 className="text-[17px] font-bold text-slate-800">Visit Details</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Provide purpose and visit date</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Visit Date */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Visit Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input type="date" name="visit_date" value={formData.visit_date || ''} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] text-gray-800" />
                    </div>
                  </div>

                  {/* Visit Purpose */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Visit Purpose <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <textarea 
                        name="visit_purpose"
                        value={formData.visit_purpose || ''}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2b6be0] focus:ring-1 focus:ring-[#2b6be0] placeholder-gray-400 resize-none h-32"
                        placeholder="Enter purpose of visit..."
                        maxLength={250}
                      ></textarea>
                      <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 font-medium">
                        {formData.visit_purpose.length}/250
                      </div>
                    </div>
                  </div>
                  
                  {/* Interested to become member */}
                  <label className={`block cursor-pointer border rounded-xl p-4 transition-all ${formData.interested_to_become_member ? 'bg-[#f0f5fc] border-[#2b6be0]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-start">
                      <div className="flex items-center h-5 mt-0.5">
                        <input 
                          type="checkbox" 
                          name="interested_to_become_member" 
                          checked={formData.interested_to_become_member} 
                          onChange={handleChange} 
                          className="w-4 h-4 text-[#2b6be0] border-gray-300 rounded focus:ring-[#2b6be0]" 
                        />
                      </div>
                      <div className="ml-3">
                        <span className="block text-sm font-bold text-gray-800">Is interested to become Member</span>
                        <span className="block text-xs text-gray-500 mt-1">Check this if the visitor is interested in membership</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end items-center gap-4 mt-6">
                <button 
                  onClick={() => setFormData({ ...emptyForm, visit_date: new Date().toISOString().split('T')[0] })}
                  className="flex items-center px-6 py-2.5 rounded-lg font-bold text-sm text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reset
                </button>
                <button 
                  onClick={handleSave} 
                  className="flex items-center px-6 py-2.5 rounded-lg font-bold text-sm text-white bg-[#2b6be0] hover:bg-[#255bc2] transition-all shadow-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Visitor
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border-none overflow-hidden flex flex-col min-h-[500px]">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 pl-9 pr-4 py-2 text-sm focus:outline-none min-w-[200px]"
              />
            </div>
            <button className="bg-white hover:shadow-sm text-black px-6 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-sm border-none">
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

            <div className="flex items-center ml-auto space-x-1 cursor-pointer bg-white shadow-sm hover:shadow-sm px-4 py-1.5 rounded-lg transition-all">
              <span className="text-sm text-slate-800 font-medium">Actions</span>
              <ChevronDown className="w-4 h-4 text-slate-800" />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex items-center px-4 pb-3">
            <Filter className="w-4 h-4 text-gray-600 mr-3" />
            <div className="flex items-center bg-[#8ebc7f]/80 text-[#1f3718] px-3 py-1.5 rounded-lg border-none shadow-sm text-xs font-semibold">
              <input type="checkbox" defaultChecked className="mr-2 rounded-sm text-green-800 focus:ring-green-800" />
              <Star className="w-3.5 h-3.5 mr-1 text-[#1f3718]" />
              <span>Members</span>
              <button className="ml-2 hover:text-black rounded-sm p-0.5 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto flex-1 mx-4 mb-4 shadow-sm bg-white rounded-xl">
            <table className="w-full text-sm text-left whitespace-nowrap border border-gray-300">
              <thead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 w-10 border-r border-gray-300"></th>
                  <th className="px-4 py-3 border-r border-gray-300">Title</th>
                  <th className="px-4 py-3 border-r border-gray-300">First Name</th>
                  <th className="px-4 py-3 border-r border-gray-300">Last Name</th>
                  <th className="px-4 py-3 border-r border-gray-300">Date of Birth</th>
                  <th className="px-4 py-3 border-r border-gray-300">Mobile Number</th>
                  <th className="px-4 py-3 border-r border-gray-300">Email</th>
                  <th className="px-4 py-3 border-r border-gray-300 flex items-center justify-between cursor-pointer hover:text-blue-600">
                    <span>Visit Date</span>
                    <ArrowDown className="w-3 h-3 ml-1" />
                  </th>
                  <th className="px-4 py-3 border-r border-gray-300">Visit Purpose</th>
                  <th className="px-4 py-3">Membership Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {visitorsList
                  .filter(v => {
                    const q = searchQuery.toLowerCase();
                    return (
                      (v.first_name || '').toLowerCase().includes(q) ||
                      (v.last_name || '').toLowerCase().includes(q) ||
                      (v.mobile || '').toLowerCase().includes(q) ||
                      (v.email || '').toLowerCase().includes(q) ||
                      (v.visit_purpose || '').toLowerCase().includes(q)
                    );
                  })
                  .map((visitor, index) => {
                  const isInterested = visitor.interested_to_become_member;
                  const membershipType = isInterested ? 'Interested' : 'Visitor';
                  return (
                    <tr 
                      key={visitor.id || index} 
                      className={`hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors ${isInterested ? 'bg-[#8ebc7f]/20 font-medium' : 'bg-transparent text-slate-600'}`}
                    >
                      <td className="px-4 py-2 border-r border-gray-300">
                        <button
                          onClick={() => handleEditOpen(visitor)}
                          className={`p-1.5 rounded-md bg-white shadow-sm hover:shadow-sm ${isInterested ? 'text-[#2b4c23]' : 'text-blue-500'} transition-all`}
                          title="Edit visitor"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="px-4 py-2 border-r border-gray-300">{visitor.title}</td>
                      <td className="px-4 py-2 border-r border-gray-300">{visitor.first_name}</td>
                      <td className="px-4 py-2 border-r border-gray-300">{visitor.last_name}</td>
                      <td className="px-4 py-2 border-r border-gray-300">{visitor.dob}</td>
                      <td className="px-4 py-2 border-r border-gray-300">{visitor.mobile}</td>
                      <td className="px-4 py-2 border-r border-gray-300">{visitor.email}</td>
                      <td className="px-4 py-2 border-r border-gray-300">{visitor.visit_date}</td>
                      <td className="px-4 py-2 border-r border-gray-300">{visitor.visit_purpose}</td>
                      <td className="px-4 py-2">{membershipType}</td>
                    </tr>
                  );
                })}
                {visitorsList.filter(v => {
                    const q = searchQuery.toLowerCase();
                    return (
                      (v.first_name || '').toLowerCase().includes(q) ||
                      (v.last_name || '').toLowerCase().includes(q) ||
                      (v.mobile || '').toLowerCase().includes(q) ||
                      (v.email || '').toLowerCase().includes(q) ||
                      (v.visit_purpose || '').toLowerCase().includes(q)
                    );
                  }).length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-gray-500 font-medium">
                      No visitors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mx-4 mb-4 rounded-xl shadow-sm text-xs font-semibold text-slate-600 flex justify-end">
            {(() => {
              const count = visitorsList.filter(v => {
                const q = searchQuery.toLowerCase();
                return (
                  (v.first_name || '').toLowerCase().includes(q) ||
                  (v.last_name || '').toLowerCase().includes(q) ||
                  (v.mobile || '').toLowerCase().includes(q) ||
                  (v.email || '').toLowerCase().includes(q) ||
                  (v.visit_purpose || '').toLowerCase().includes(q)
                );
              }).length;
              return count > 0 ? `1 - ${count} of ${count}` : '0 results';
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitor;
