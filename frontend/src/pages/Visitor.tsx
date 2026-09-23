import React, { useState, useEffect } from 'react';
import { Search, Edit, X, Star, Filter, ChevronDown, ArrowDown } from 'lucide-react';

const visitorsData = [
  {
    title: 'Mrs', firstName: 'Silpa', lastName: 'Mallela', dob: '21-Feb-1986',
    mobile: '+91 9885043828', email: 'silpamallela@gmail.com', visitDate: '30-Aug-2026',
    purpose: 'Manager- Temp', membershipType: 'Visitor'
  },
  {
    title: 'Mr', firstName: 'Pankaj', lastName: 'Verma', dob: '',
    mobile: '', email: '', visitDate: '15-Aug-2026',
    purpose: 'Darshan', membershipType: 'Ashram members'
  },
  {
    title: 'Mrs', firstName: 'Test', lastName: 'Test', dob: '',
    mobile: '+91 9999999999', email: '', visitDate: '09-Aug-2026',
    purpose: 'Test', membershipType: 'Visitor'
  },
  {
    title: 'Ms', firstName: 'A', lastName: 'Mangamma', dob: '',
    mobile: '+91 9618225201', email: '', visitDate: '15-Jul-2026',
    purpose: 'Sat talk', membershipType: 'Ashram members'
  }
];
const hyderabadPincodes = Array.from({length: 114}, (_, i) => (500001 + i).toString());

const Visitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'list'>('register');
  const [members, setMembers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
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
  });

  const [visitorsList, setVisitorsList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVisitors = async () => {
    try {
      const res = await fetch('http://localhost:8000/visitors');
      const data = await res.json();
      setVisitorsList(data);
    } catch (err) {
      console.error("Error fetching visitors:", err);
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/members')
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
    // Validate required fields
    if (!formData.first_name.trim()) {
      alert("First Name is required.");
      return;
    }
    if (!formData.mobile.trim()) {
      alert("Mobile Number is required.");
      return;
    }
    if (!formData.visit_purpose.trim()) {
      alert("Visit Purpose is required.");
      return;
    }
    
    try {
      const submitData = { ...formData };
      if (!submitData.dob) delete submitData.dob;
      if (!submitData.visit_date) delete submitData.visit_date;

      const response = await fetch('http://localhost:8000/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      
      if (response.ok) {
        alert("Visitor registered successfully!");
        fetchVisitors(); // Refresh the list
        setFormData({
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
        });
        setActiveTab('list');
      } else {
        alert("Failed to register visitor.");
      }
    } catch (error) {
      console.error("Error saving visitor:", error);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Tabs */}
      <div className="flex space-x-6 mb-6">
        <button 
          onClick={() => setActiveTab('register')}
          className={`flex items-center justify-center px-4 py-1.5 font-medium text-sm transition-all rounded-full ${
            activeTab === 'register' 
              ? 'bg-[#5a6c8e] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#4a5a75] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Visitor Register
        </button>
        <button 
          onClick={() => setActiveTab('list')}
          className={`flex items-center justify-center px-6 py-1.5 font-medium text-sm transition-all rounded-full ${
            activeTab === 'list' 
              ? 'bg-[#5a6c8e] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#4a5a75] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Visitor List
        </button>
      </div>

      {activeTab === 'register' ? (
        <div className="flex flex-col gap-6 max-w-[1000px] bg-[#f0f0f3] p-6 rounded-xl shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] border-none">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-0">
              <div className="bg-[#a56472] text-white px-4 py-2 font-semibold text-sm rounded-t-md shadow-md">
                Visitor Info
              </div>
              <div className="border-none rounded-b-md p-6 space-y-5 bg-[#f0f0f3] shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 relative w-max">
                    Title<span className="text-red-500 absolute -top-1 -right-2 text-lg leading-none">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4 w-48">
                    {['Mr', 'Mrs', 'Ms', 'Dr'].map(t => (
                      <label key={t} className="flex items-center space-x-1 cursor-pointer">
                        <input type="radio" name="title" value={t} checked={formData.title === t} onChange={handleChange} className="form-radio text-black focus:ring-black h-4 w-4" />
                        <span className="text-sm font-medium">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* First Name & Last Name */}
                <div className="flex gap-4">
                  <div className="relative w-1/2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden">
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent"></div>
                    <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">First Name</label>
                    <input type="text" name="first_name" value={formData.first_name || ''} onChange={handleChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                  </div>
                  <div className="relative w-1/2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden">
                    <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Last Name</label>
                    <input type="text" name="last_name" value={formData.last_name || ''} onChange={handleChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                  </div>
                </div>

                {/* DOB */}
                <div className="relative w-full border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden flex flex-col">
                  <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Dob</label>
                  <div className="flex-1">
                    <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                  </div>
                </div>

                {/* Country Code & Mobile Number */}
                <div className="flex gap-4">
                  <div className="relative w-1/3 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden shadow-[0_0_0_1px_#52a8d1]">
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent"></div>
                    <label className="block px-2 pt-1 text-[10px] font-medium text-[#52a8d1]">Country Code</label>
                    <div className="flex items-center px-2 pb-1 relative">
                      <select name="country_code" value={formData.country_code || ''} onChange={handleChange} className="w-full text-sm focus:outline-none text-gray-800 font-medium bg-transparent appearance-none">
                        <option value="+ 91(India)">+ 91(India)</option>
                        <option value="+ 1(USA)">+ 1(USA)</option>
                      </select>
                      <div className="absolute right-0 flex items-center gap-1 text-gray-500 bg-white px-1 pointer-events-none">
                        <X className="w-3 h-3 cursor-pointer hover:text-black pointer-events-auto" />
                        <div className="h-4 w-px bg-gray-300"></div>
                        <ChevronDown className="w-3 h-3 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="relative w-2/3 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden">
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent"></div>
                    <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Mobile Number</label>
                    <input type="text" name="mobile" value={formData.mobile || ''} onChange={handleChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                  </div>
                </div>

                {/* Email */}
                <div className="relative w-full border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden">
                  <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Email</label>
                  <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                </div>

                {/* Address 1 */}
                <div className="relative w-full border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden">
                  <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Address 1</label>
                  <input type="text" name="address_1" value={formData.address_1 || ''} onChange={handleChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                </div>

                {/* Address 2 */}
                <div className="relative w-full border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden">
                  <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Address 2</label>
                  <input type="text" name="address_2" value={formData.address_2 || ''} onChange={handleChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                </div>

                {/* Address 3 */}
                <div className="relative w-full border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden">
                  <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">Address 3</label>
                  <input type="text" name="address_3" value={formData.address_3 || ''} onChange={handleChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                </div>

                {/* City & Pincode */}
                <div className="flex gap-4">
                  <div className="relative w-1/2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden">
                    <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">City</label>
                    <input type="text" name="city" value={formData.city || ''} onChange={handleChange} className="w-full bg-transparent px-2 pb-1 text-sm focus:outline-none text-gray-800 font-medium" />
                  </div>
                  <div className="relative w-1/2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden flex items-center bg-gray-50">
                    <input 
                      list="hyderabad-pincodes"
                      name="pincode" 
                      value={formData.pincode || ''} 
                      onChange={handleChange} 
                      className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none text-gray-800 font-medium bg-transparent placeholder-gray-500" 
                      placeholder="Search Pincode"
                    />
                    <datalist id="hyderabad-pincodes">
                      {hyderabadPincodes.map(pin => (
                        <option key={pin} value={pin} />
                      ))}
                    </datalist>
                    <Search className="w-4 h-4 text-gray-400 absolute right-2 pointer-events-none" />
                  </div>
                </div>

                {/* Country & State */}
                <div className="flex gap-4">
                  <div className="relative w-1/2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden flex items-center">
                    <select name="country" value={formData.country || ''} onChange={handleChange} className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none text-gray-800 font-medium bg-transparent appearance-none">
                      <option value="">Country</option>
                      <option value="India">India</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2 pointer-events-none" />
                  </div>
                  <div className="relative w-1/2 border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden flex flex-col">
                     <label className="block px-2 pt-1 text-[10px] font-medium text-gray-500">State</label>
                     <div className="flex items-center px-2 pb-1 relative">
                        <select name="state" value={formData.state || ''} onChange={handleChange} className="w-full text-sm focus:outline-none text-gray-800 font-medium bg-transparent appearance-none">
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
            <div className="w-full lg:w-[450px] flex flex-col gap-4 pt-0 lg:pt-10">
              {/* Visit Date */}
              <div className="relative border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden flex">
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent z-10 pointer-events-none"></div>
                <div className="flex-1 relative">
                  <label className="absolute top-1.5 left-3 text-[10px] font-medium text-gray-500 pointer-events-none">Visit Date</label>
                  <input type="date" name="visit_date" value={formData.visit_date || ''} onChange={handleChange} className="w-full bg-transparent px-3 pt-5 pb-1.5 text-sm focus:outline-none text-gray-800 font-medium" />
                </div>
              </div>

              {/* Visit Purpose */}
              <div>
                <div className="relative border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-red-500 border-r-transparent pointer-events-none"></div>
                  <label className="block px-3 pt-1.5 text-[10px] font-medium text-gray-500">Visit Purpose</label>
                  <textarea 
                    name="visit_purpose"
                    value={formData.visit_purpose || ''}
                    onChange={handleChange}
                    className="w-full px-3 pb-1 text-sm focus:outline-none text-gray-800 font-medium min-h-[60px] resize-none"
                    placeholder=""
                  ></textarea>
                </div>
                <div className="text-right text-[10px] text-gray-500 font-medium mt-1">Required</div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input type="checkbox" id="interested" name="interested_to_become_member" checked={formData.interested_to_become_member} onChange={handleChange} className="rounded border-gray-400 text-gray-600 focus:ring-gray-600 h-4 w-4 bg-white" />
                <label htmlFor="interested" className="text-sm font-medium text-gray-700">Is interested to become Member</label>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center mt-6 pt-4">
            <button className="bg-[#f0f0f3] hover:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] hover:text-red-600 text-black px-8 py-2 rounded-lg font-semibold text-sm transition-all shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff] border-none">
              Cancel
            </button>
            <button onClick={handleSave} className="bg-[#f0f0f3] hover:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] hover:text-green-600 text-black px-8 py-2 rounded-lg font-semibold text-sm transition-all shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff] border-none">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#f0f0f3] rounded-xl shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] border-none overflow-hidden flex flex-col min-h-[500px]">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 p-4">
            <div className="flex items-center relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none min-w-[200px]"
              />
            </div>
            <button className="bg-[#f0f0f3] hover:shadow-[inset_2px_2px_5px_#cbced1,inset_-2px_-2px_5px_#ffffff] text-black px-6 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] border-none">
              Go
            </button>
            
            <div className="flex items-center ml-4 space-x-2">
              <span className="text-sm text-slate-600 font-medium">Rows</span>
              <div className="relative">
                <select className="appearance-none border-none bg-[#f0f0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] rounded-lg px-4 py-1.5 pr-8 text-sm focus:outline-none">
                  <option>50</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center ml-auto space-x-1 cursor-pointer bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] px-4 py-1.5 rounded-lg transition-all">
              <span className="text-sm text-slate-800 font-medium">Actions</span>
              <ChevronDown className="w-4 h-4 text-slate-800" />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex items-center px-4 pb-3">
            <Filter className="w-4 h-4 text-gray-600 mr-3" />
            <div className="flex items-center bg-[#8ebc7f]/80 text-[#1f3718] px-3 py-1.5 rounded-lg border-none shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] text-xs font-semibold">
              <input type="checkbox" defaultChecked className="mr-2 rounded-sm text-green-800 focus:ring-green-800" />
              <Star className="w-3.5 h-3.5 mr-1 text-[#1f3718]" />
              <span>Members</span>
              <button className="ml-2 hover:text-black rounded-sm p-0.5 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto flex-1 mx-4 mb-4 p-4 shadow-[inset_5px_5px_10px_#cbced1,inset_-5px_-5px_10px_#ffffff] bg-[#f0f0f3] rounded-xl">
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
                  .map((visitor, index, filteredArray) => {
                  const isInterested = visitor.interested_to_become_member;
                  const membershipType = isInterested ? 'Interested' : 'Visitor';
                  return (
                    <tr 
                      key={visitor.id || index} 
                      className={`hover:bg-[#8ebc7f] hover:text-[#2b4c23] transition-colors ${isInterested ? 'bg-[#8ebc7f]/20 font-medium' : 'bg-transparent text-slate-600'}`}
                    >
                      <td className="px-4 py-2 border-r border-gray-300">
                        <button className={`p-1.5 rounded-md bg-[#f0f0f3] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] ${isInterested ? 'text-[#2b4c23]' : 'text-blue-500'}`}>
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
          
          <div className="p-4 mx-4 mb-4 rounded-xl shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] text-xs font-semibold text-slate-600 flex justify-end">
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

