import React, { useState } from 'react';
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

const Visitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'list'>('list');

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
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side */}
            <div className="flex-1 space-y-6">
              {/* Member/Visitor Dropdown */}
              <div className="relative mb-2">
                <select className="w-full border border-[#5a879d] border-dashed border-l-4 border-l-red-500 rounded px-3 py-3 text-sm bg-white text-[#5a879d] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Member/Visitor</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-4 pointer-events-none" />
                <div className="absolute right-0 -bottom-5 text-[10px] text-gray-400">Required</div>
              </div>

              {/* Visiting History */}
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
                <div className="bg-[#5a879d] text-white px-4 py-3 font-medium text-sm">
                  Visiting History
                </div>
                <div className="p-4 text-xs text-slate-700 bg-white min-h-[60px] flex items-center">
                  No visiting history available
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 space-y-6">
              {/* Visit Date */}
              <div className="relative">
                <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">Visit Date</label>
                <input 
                  type="text" 
                  defaultValue="22-Sep-2026"
                  className="w-full border border-gray-300 border-l-4 border-l-red-500 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="absolute right-0 top-0 bottom-0 bg-gray-100 border-l border-gray-300 rounded-r flex items-center justify-center px-3">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
              </div>

              {/* Visit Purpose */}
              <div className="relative mb-2">
                <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">Visit Purpose</label>
                <textarea 
                  className="w-full border border-gray-300 border-l-4 border-l-red-500 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px] resize-none"
                  placeholder=""
                ></textarea>
                <div className="absolute right-0 -bottom-5 text-[10px] text-gray-400">Required</div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input type="checkbox" id="interested" className="rounded border-gray-300 text-[#4a6b93] focus:ring-[#4a6b93]" />
                <label htmlFor="interested" className="text-sm text-slate-700 font-medium">Is interested to become Member</label>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center pt-8 w-full">
            <button className="flex items-center space-x-2 bg-white border border-gray-300 text-slate-600 hover:bg-gray-50 px-4 py-1.5 rounded shadow-sm text-sm font-medium transition-colors">
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.2)] border border-[#2d525e] active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 p-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search" 
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[200px]"
              />
            </div>
            <button className="font-semibold text-sm text-slate-800 hover:text-black">
              Go
            </button>
            
            <div className="flex items-center ml-4 space-x-2">
              <span className="text-sm text-slate-600">Rows</span>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>50</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center ml-auto space-x-1 cursor-pointer hover:bg-gray-200 p-1.5 rounded-md transition-colors">
              <span className="text-sm text-slate-800 font-medium">Actions</span>
              <ChevronDown className="w-4 h-4 text-slate-800" />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex items-center p-3 border-b border-gray-200">
            <Filter className="w-4 h-4 text-gray-600 mr-3" />
            <div className="flex items-center bg-[#8ebc7f] text-[#2b4c23] px-2 py-1 rounded-md border border-[#7db06d] text-xs font-medium shadow-sm">
              <input type="checkbox" defaultChecked className="mr-1.5 rounded-sm text-green-700 focus:ring-green-700" />
              <Star className="w-3.5 h-3.5 mr-1 text-[#2b4c23]" />
              <span>Members</span>
              <button className="ml-1.5 hover:text-black hover:bg-white/30 rounded-sm p-0.5 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-[11px] font-bold text-[#1e293b] border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 w-10"></th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">First Name</th>
                  <th className="px-4 py-3">Last Name</th>
                  <th className="px-4 py-3">Date of Birth</th>
                  <th className="px-4 py-3">Mobile Number</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 flex items-center space-x-1 cursor-pointer hover:text-blue-600">
                    <span>Visit Date</span>
                    <ArrowDown className="w-3 h-3" />
                  </th>
                  <th className="px-4 py-3">Visit Purpose</th>
                  <th className="px-4 py-3">Membership Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visitorsData.map((visitor, index) => {
                  const isMember = visitor.membershipType === 'Ashram members';
                  return (
                    <tr 
                      key={index} 
                      className={isMember ? 'bg-[#8ebc7f] text-[#2b4c23]' : 'bg-white text-slate-600 hover:bg-gray-50'}
                    >
                      <td className="px-4 py-2 border-r border-gray-100">
                        <button className={`p-1 rounded ${isMember ? 'text-[#2b4c23] hover:bg-[#7aaf6a]' : 'text-blue-500 hover:bg-blue-50'}`}>
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-4 py-2 border-r border-gray-100">{visitor.title}</td>
                      <td className="px-4 py-2 border-r border-gray-100">{visitor.firstName}</td>
                      <td className="px-4 py-2 border-r border-gray-100">{visitor.lastName}</td>
                      <td className="px-4 py-2 border-r border-gray-100">{visitor.dob}</td>
                      <td className="px-4 py-2 border-r border-gray-100">{visitor.mobile}</td>
                      <td className="px-4 py-2 border-r border-gray-100">{visitor.email}</td>
                      <td className="px-4 py-2 border-r border-gray-100">{visitor.visitDate}</td>
                      <td className="px-4 py-2 border-r border-gray-100">{visitor.purpose}</td>
                      <td className="px-4 py-2">{visitor.membershipType}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-3 border-t border-gray-200 text-xs font-medium text-slate-600 flex justify-end">
            1 - 4 of 4
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitor;

