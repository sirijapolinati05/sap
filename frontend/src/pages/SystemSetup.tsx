import React, { useState } from 'react';
import { 
  Settings, Users, Shield, Tag, 
  UserPlus, FileCode, Users as UsersIcon, 
  Receipt, UserCircle, Info,
  Search, ChevronDown, X
} from 'lucide-react';
import UpdateInfoForm from '../components/forms/UpdateInfoForm';


const SystemSetup: React.FC = () => {
  const [currentView, setCurrentView] = useState<string | null>(null);
  const [isUpdateInfoOpen, setIsUpdateInfoOpen] = useState<boolean>(false);

  const cards = [
    {
      title: 'Manage Lookups',
      description: 'Manage the system wide lookups.',
      icon: Settings,
      bgColor: 'bg-[#5c8b8c]'
    },
    {
      title: 'Users',
      description: 'Create user, modify user info and reset password.',
      icon: Users,
      bgColor: 'bg-[#4a7272]'
    },
    {
      title: 'Manage permissions',
      description: 'Manage all permissions for each user role.',
      icon: Shield,
      bgColor: 'bg-[#4a848c]'
    },
    {
      title: 'Manage Discounts',
      description: 'Configure discounts for sales module',
      icon: Tag,
      bgColor: 'bg-[#5c986c]'
    },
    {
      title: 'User roles',
      description: 'Add/Edit user roles.',
      icon: UserPlus,
      bgColor: 'bg-[#6c8c5c]'
    },
    {
      title: 'Code References',
      description: 'Manage the format for all type of codes.',
      icon: FileCode,
      bgColor: 'bg-[#8c8472]'
    },
    {
      title: 'Membership category',
      description: 'Configure membership category.',
      icon: UsersIcon,
      bgColor: 'bg-[#988454]'
    },
    {
      title: 'Taxes',
      description: 'Tax Master',
      icon: Receipt,
      bgColor: 'bg-[#ac6c44]'
    },
    {
      title: 'Employee',
      description: '',
      icon: UserCircle,
      bgColor: 'bg-[#cc6c5c]'
    },
    {
      title: 'Update Info',
      description: '',
      icon: Info,
      bgColor: 'bg-[#ac5c6c]'
    }
  ];

  const lookupData = [
    { type: 'Application Settings', code: 'APPLICATION_NAME', name: 'SAS Hyderabad Branch Management Application', status: 'Active', sortOrder: '' },
    { type: 'Binding Type', code: 'PB', name: 'Paper Binding', status: 'Active', sortOrder: '20' },
    { type: 'Binding Type', code: 'HB', name: 'Hard Binding', status: 'Active', sortOrder: '10' },
    { type: 'Expense Type', code: 'E1', name: 'Flowers', status: 'Active', sortOrder: '1' },
    { type: 'Member Occupation', code: 'MO_40', name: 'Business', status: 'Active', sortOrder: '' },
    { type: 'Member Occupation', code: 'MO_49', name: 'PROPRIETOR', status: 'Active', sortOrder: '' },
    { type: 'Member Occupation', code: 'MO_43', name: 'Principal', status: 'Active', sortOrder: '' },
  ];

  const usersData = [
    { name: 'Murthy Musunuri', role: 'Modifier', username: 'MURTHY', validTill: '' },
    { name: 'Guna Kotamraju', role: 'Modifier', username: 'GUNA', validTill: '' },
    { name: 'Sharada Attilli', role: 'Admin', username: 'SHARADA', validTill: '01-Apr-2027' },
    { name: 'Himansu Behera', role: 'Admin', username: 'HIMANSU', validTill: '' },
    { name: 'Srinivas Mulugu', role: 'Admin', username: 'SMULUGU', validTill: '' },
    { name: 'Archana Udaykumar', role: 'Admin', username: 'ARCHANA', validTill: '' },
    { name: 'Pankaj Verma', role: 'Admin', username: 'PVERMA', validTill: '31-May-2027' },
    { name: 'Prafulla Sunder', role: 'Modifier', username: 'PRAFULLA', validTill: '' },
    { name: 'Silpa Mallela', role: 'Modifier', username: 'SILPA', validTill: '' },
    { name: 'Harshitha Krishnaveti', role: 'Admin', username: 'HARSHITHA', validTill: '' },
  ];

  const permissionsData = [
    { name: 'Reports', access: 'Full Access' },
    { name: 'Purchase', access: 'Full Access' },
    { name: 'Inventory', access: 'Full Access' },
    { name: 'Members', access: 'Full Access' },
    { name: 'Visitors', access: 'Full Access' },
    { name: 'Masters', access: 'Full Access' },
    { name: 'Sales', access: 'Full Access' },
    { name: 'System setup', access: 'Full Access' },
  ];

  const discountsData = [
    { code: 'MEMBER5', name: '5% for 5yr Membership', type: '%', val: '5', startDate: '22-Aug-2026', endDate: '23-Aug-2026' }
  ];

  const rolesData = [
    { code: 'MODIFIER', name: 'Modifier', status: 'Active' },
    { code: 'VIEWER', name: 'Viewer', status: 'Active' },
    { code: 'ADMIN', name: 'Admin', status: 'Active' }
  ];

  const membershipData = [
    { options: 'Member without Magazine', period: '1 Year', code: 'O', fees: '30', status: 'Active' },
    { options: 'Member with Magazine', period: '1 Year', code: 'O1', fees: '200', status: 'Active' },
    { options: 'Institutional Member', period: '1 Year', code: 'I', fees: '1500', status: 'Active' },
    { options: 'Member without Magazine', period: '3 Year', code: 'W', fees: '580', status: 'Active' },
    { options: 'Member with Magazine', period: '3 Year', code: 'T', fees: '580', status: 'Active' },
    { options: 'Member with Magazine', period: '5 Year', code: 'F', fees: '960', status: 'Active' },
    { options: 'Member with Magazine', period: '10 Year', code: 'D', fees: '4000', status: 'Active' },
    { options: 'Corporate Member', period: '10 Year', code: 'R', fees: '25000', status: 'Active' },
    { options: 'Lifetime Members', period: '99 Year', code: 'L', fees: '1000', status: 'Active' },
  ];

  const taxesData = [
    { name: '18% GST', rate: '18', cgst: '9', sgst: '9', igst: '18', isUserDefined: 'N' },
    { name: '5% GST', rate: '5', cgst: '2.5', sgst: '2.5', igst: '5', isUserDefined: 'Y' },
    { name: '9% GST', rate: '9', cgst: '4.5', sgst: '4.5', igst: '9', isUserDefined: 'N' },
    { name: '0% GST', rate: '0', cgst: '0', sgst: '0', igst: '0', isUserDefined: 'N' },
  ];

  if (currentView === 'manage-lookups') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentView(null)}>
            System setup \
          </div>
          <h1 className="text-xl font-bold text-slate-900">Manage Lookups</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
            
            {/* Top Search Area */}
            <div className="border-b border-gray-200 bg-white flex justify-center items-end space-x-4">
              <div className="relative w-96">
                <label className="absolute left-3 top-1 text-[10px] text-gray-500 z-10">Lookup Type</label>
                <select className="w-full border border-gray-300 rounded px-3 pt-5 pb-1 text-sm appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner">
                  <option>--Select--</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-4 pointer-events-none" />
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-6 py-2.5 rounded text-sm font-medium border border-gray-200">
                Search
              </button>
            </div>

            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-[#f9fafb]">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-4">Edit</button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">Save</button>
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-2">Add Row</button>
              
              <div className="ml-auto flex items-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span className="text-sm">Reset</span>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-2 py-3 w-10"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></th>
                    <th className="px-4 py-3 flex items-center space-x-1">
                      <span>Lookup Type</span>
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                    </th>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Lookup Name</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Sort Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                  {lookupData.map((row, idx) => (
                    <tr key={idx} className={idx === 0 ? "bg-[#eef8f1]" : ""}>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked={idx === 0} />
                      </td>
                      <td className="px-2 py-3 border-r border-gray-200 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.type}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.code}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.name}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.status}</td>
                      <td className="px-4 py-3 text-slate-700 text-right">{row.sortOrder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 text-xs text-slate-500 flex justify-between bg-white border-t border-gray-200">
              <span>1 rows selected</span>
              <span className="font-semibold text-slate-800">Total 111</span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'users') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentView(null)}>
            System setup \
          </div>
          <h1 className="text-xl font-bold text-slate-900">Users</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
            
            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-[#f9fafb]">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-4">Edit</button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">Save</button>
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-2">Add Row</button>
              
              <div className="ml-auto flex items-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span className="text-sm">Reset</span>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-2 py-3 w-10"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></th>
                    <th className="px-4 py-3">Member</th>
                    <th className="px-4 py-3">User Role</th>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">Password</th>
                    <th className="px-4 py-3">Valid Till</th>
                    <th className="px-4 py-3">Reset<br/>Password</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                  {usersData.map((row, idx) => (
                    <tr key={idx} className={idx === 0 ? "bg-[#eef8f1]" : ""}>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked={idx === 0} />
                      </td>
                      <td className="px-2 py-3 border-r border-gray-200 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.name}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.role}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.username}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">******</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.validTill}</td>
                      <td className="px-4 py-3 text-[#0088cc] hover:underline cursor-pointer">Reset</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 text-xs text-slate-500 flex justify-between bg-white border-t border-gray-200">
              <span>1 rows selected</span>
              <span className="font-semibold text-slate-800">Total 11</span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'permissions') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentView(null)}>
            System setup \
          </div>
          <h1 className="text-xl font-bold text-slate-900">User Role Permissions</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
            
            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-[#f9fafb]">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-4">Edit</button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">Save</button>
              
              <div className="ml-auto flex items-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span className="text-sm">Reset</span>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-auto flex-1">
              
              {/* Group By indicator */}
              <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 border-b border-gray-200">
                <ChevronDown className="w-4 h-4 text-gray-500 cursor-pointer" />
                <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded border border-gray-200 flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300 bg-green-500" defaultChecked />
                  <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  <span className="font-medium">User Role</span>
                  <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 ml-1" />
                </div>
              </div>

              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-2 py-3 w-10"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></th>
                    <th className="px-4 py-3">Permissions</th>
                    <th className="px-4 py-3">Access Rights</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                  {/* Group header */}
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td colSpan={4} className="px-4 py-2 text-slate-500 font-medium text-xs">
                      <div className="flex items-center space-x-2">
                        <ChevronDown className="w-3 h-3" />
                        <span>User Role: Admin</span>
                      </div>
                    </td>
                  </tr>

                  {permissionsData.map((row, idx) => (
                    <tr key={idx} className={idx === 0 ? "bg-[#eef8f1]" : ""}>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked={idx === 0} />
                      </td>
                      <td className="px-2 py-3 border-r border-gray-200 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.name}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 text-xs text-slate-500 flex justify-between bg-white border-t border-gray-200">
              <span>1 rows selected</span>
              <span className="font-semibold text-slate-800">Total 24</span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'discounts') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentView(null)}>
            System setup \
          </div>
          <h1 className="text-xl font-bold text-slate-900">Manage discounts</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
            
            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-[#f9fafb]">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-4">Edit</button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">Save</button>
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-2">Add Row</button>
              
              <div className="ml-auto flex items-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span className="text-sm">Reset</span>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-2 py-3 w-10"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></th>
                    <th className="px-4 py-3">Discount Code</th>
                    <th className="px-4 py-3">Discount Name</th>
                    <th className="px-4 py-3">Discount Type</th>
                    <th className="px-4 py-3 text-right">Discount Val</th>
                    <th className="px-4 py-3">Start Date</th>
                    <th className="px-4 py-3">End Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                  {discountsData.map((row, idx) => (
                    <tr key={idx} className={idx === 0 ? "bg-[#eef8f1]" : ""}>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked={idx === 0} />
                      </td>
                      <td className="px-2 py-3 border-r border-gray-200 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.code}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.name}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.type}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700 text-right">{row.val}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.startDate}</td>
                      <td className="px-4 py-3 text-slate-700">{row.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 text-xs text-slate-500 flex justify-between bg-white border-t border-gray-200">
              <span>1 rows selected</span>
              <span className="font-semibold text-slate-800">Total {discountsData.length}</span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'roles') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentView(null)}>
            System setup \
          </div>
          <h1 className="text-xl font-bold text-slate-900">User Roles</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
            
            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-[#f9fafb]">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-4">Edit</button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">Save</button>
              
              <div className="ml-auto flex items-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span className="text-sm">Reset</span>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-2 py-3 w-10"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></th>
                    <th className="px-4 py-3">Role Code</th>
                    <th className="px-4 py-3">Role Name</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                  {rolesData.map((row, idx) => (
                    <tr key={idx} className={idx === 1 ? "bg-[#eef8f1]" : ""}>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked={idx === 1} />
                      </td>
                      <td className="px-2 py-3 border-r border-gray-200 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.code}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.name}</td>
                      <td className="px-4 py-3 text-slate-700">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 text-xs text-slate-500 flex justify-between bg-white border-t border-gray-200">
              <span>1 rows selected</span>
              <span className="font-semibold text-slate-800">Total {rolesData.length}</span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'membership') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentView(null)}>
            System setup \
          </div>
          <h1 className="text-xl font-bold text-slate-900">Membership Category</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
            
            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-[#f9fafb]">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-4">Edit</button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">Save</button>
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-2">Add Row</button>
              
              <div className="ml-auto flex items-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span className="text-sm">Reset</span>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-2 py-3 w-10"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></th>
                    <th className="px-4 py-3">Membership Options</th>
                    <th className="px-4 py-3">Membership Period</th>
                    <th className="px-4 py-3">Membership Code</th>
                    <th className="px-4 py-3">Membership Fees<br/>(In INR)</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                  {membershipData.map((row, idx) => (
                    <tr key={idx} className={idx === 0 ? "bg-[#eef8f1]" : ""}>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked={idx === 0} />
                      </td>
                      <td className="px-2 py-3 border-r border-gray-200 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.options}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.period}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.code}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.fees}</td>
                      <td className="px-4 py-3 text-slate-700">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 text-xs text-slate-500 flex justify-between bg-white border-t border-gray-200">
              <span>1 rows selected</span>
              <span className="font-semibold text-slate-800">Total {membershipData.length}</span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'taxes') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentView(null)}>
            System setup \
          </div>
          <h1 className="text-xl font-bold text-slate-900">Taxes</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
            
            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-[#f9fafb]">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search: All Text Columns" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-4">Edit</button>
              <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">Save</button>
              <button className="font-semibold text-sm text-slate-800 hover:text-black ml-2">Add Row</button>
              
              <div className="ml-auto flex items-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span className="text-sm">Reset</span>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-[11px] text-[#1e3a5f] font-bold border-b border-gray-200 bg-white">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-2 py-3 w-10"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></th>
                    <th className="px-4 py-3">Tax Name</th>
                    <th className="px-4 py-3 text-right">Tax Rate</th>
                    <th className="px-4 py-3 text-right">CGST<br/>Percent</th>
                    <th className="px-4 py-3 text-right">SGST<br/>Percent</th>
                    <th className="px-4 py-3 text-right">IGST<br/>Percent</th>
                    <th className="px-4 py-3">Is User Defined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-[#f9fafb]">
                  {taxesData.map((row, idx) => (
                    <tr key={idx} className={idx === 0 ? "bg-[#eef8f1]" : ""}>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked={idx === 0} />
                      </td>
                      <td className="px-2 py-3 border-r border-gray-200 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700">{row.name}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700 text-right">{row.rate}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700 text-right">{row.cgst}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700 text-right">{row.sgst}</td>
                      <td className="px-4 py-3 border-r border-gray-200 text-slate-700 text-right">{row.igst}</td>
                      <td className="px-4 py-3 text-slate-700">{row.isUserDefined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 text-xs text-slate-500 flex justify-between bg-white border-t border-gray-200">
              <span>1 rows selected</span>
              <span className="font-semibold text-slate-800">Total {taxesData.length}</span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'code-references') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentView(null)}>
            System setup \
          </div>
          <h1 className="text-xl font-bold text-slate-900">Code References</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full items-center justify-center text-gray-500">
            <p>Code References under construction.</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'employee') {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#f9fbfd]">
        <div className="md:bg-white border-b border-gray-200 pb-4">
          <div className="text-[#0088cc] text-sm cursor-pointer mb-1 hover:underline" onClick={() => setCurrentView(null)}>
            System setup \
          </div>
          <h1 className="text-xl font-bold text-slate-900">Employee List</h1>
        </div>
        
        {/* Banner */}
        <div className="h-6 w-full bg-[#1e3a5f] bg-opacity-80" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f9cc4a\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="flex-1 md:overflow-auto">
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col">
            
            {/* Toolbar */}
            <div className="p-3 border-b border-gray-100 flex flex-wrap items-center gap-4 bg-[#f9fafb]">
              <div className="flex items-center space-x-2 border border-gray-300 rounded px-2 bg-white">
                <Search className="w-4 h-4 text-gray-400" />
                <ChevronDown className="w-3 h-3 text-gray-400" />
                <input type="text" placeholder="Search" className="border-none py-1 focus:ring-0 text-sm w-48 outline-none" />
              </div>
              <button className="font-semibold text-sm text-slate-800 hover:text-black">Go</button>
              
              <div className="flex items-center space-x-1 text-sm font-medium ml-4 cursor-pointer">
                <span>Actions</span>
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </div>
              
              <div className="ml-auto flex items-center">
                <button className="bg-[#467f92] hover:bg-[#3a6878] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm border border-[#2d525e] active:scale-95 active:shadow-sm">Add Employee</button>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16 bg-white">
              <Search className="w-10 h-10 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">No data found.</p>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:bg-slate-50 min-h-[calc(100vh-3.5rem)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div 
            key={index} 
            onClick={() => {
              if (card.title === 'Manage Lookups') setCurrentView('manage-lookups');
              else if (card.title === 'Users') setCurrentView('users');
              else if (card.title === 'Manage permissions') setCurrentView('permissions');
              else if (card.title === 'Manage Discounts') setCurrentView('discounts');
              else if (card.title === 'User roles') setCurrentView('roles');
              else if (card.title === 'Membership category') setCurrentView('membership');
              else if (card.title === 'Taxes') setCurrentView('taxes');
              else if (card.title === 'Code References') setCurrentView('code-references');
              else if (card.title === 'Employee') setCurrentView('employee');
              else if (card.title === 'Update Info') setIsUpdateInfoOpen(true);
            }}
            className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className={`${card.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white shadow-sm`}>
              <card.icon className="w-5 h-5" />
            </div>
            <h3 className="text-slate-800 font-semibold mb-2">{card.title}</h3>
            {card.description && (
              <p className="text-slate-500 text-xs leading-relaxed">{card.description}</p>
            )}
          </div>
        ))}
      </div>

      <UpdateInfoForm 
        isOpen={isUpdateInfoOpen} 
        onClose={() => setIsUpdateInfoOpen(false)} 
      />

    </div>
  );
};

export default SystemSetup;

