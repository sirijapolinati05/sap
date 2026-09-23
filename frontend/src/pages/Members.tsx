import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, Star, Clock, UserPlus, Calendar, Search, MoreVertical, Edit, Eye, RotateCcw, Grid, LayoutDashboard, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MemberForm from '../components/forms/MemberForm';
import MemberDetails from '../components/MemberDetails';

const chartData = [
  { name: 'Dec 2025', members: 1 },
  { name: 'Jan 2026', members: 1 },
  { name: 'Feb 2026', members: 4 },
  { name: 'Mar 2026', members: 7 },
  { name: 'Apr 2026', members: 3 },
  { name: 'May 2026', members: 9 },
  { name: 'Jun 2026', members: 5 },
  { name: 'Jul 2026', members: 1 },
  { name: 'Aug 2026', members: 7 },
  { name: 'Sep 2026', members: 2 },
  { name: 'Oct 2026', members: 8 },
];

const Members: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'list'>('dashboard');
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [editingMember, setEditingMember] = useState<any | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error("Error fetching members:", err));
  }, []);

  const handleAddMember = (newMember: any) => {
    setMembers(prev => [...prev, newMember]);
  };

  const handleUpdateMember = (updatedMember: any) => {
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  const handleDeleteMember = async (memberId: number) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    
    try {
      const response = await fetch(`http://localhost:8000/members/${memberId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setMembers(prev => prev.filter(m => m.id !== memberId));
      } else {
        alert('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Error deleting member');
    }
  };

  if (selectedMember) {
    return <MemberDetails member={selectedMember} onBack={() => setSelectedMember(null)} />;
  }

  return (
    <div className="p-4 md:p-6 space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-slate-900">Members</h1>
        <div className="flex flex-wrap gap-3">
          {currentView === 'dashboard' ? (
            <button 
              onClick={() => setCurrentView('list')}
              className="flex items-center space-x-2 bg-[#2b2b2b] hover:bg-[#1a1a1a] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_4px_6px_rgba(0,0,0,0.3)] border border-black active:scale-95 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
            >
              <Users className="w-4 h-4" />
              <span>Members List</span>
            </button>
          ) : (
            <>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-[#2c2825] hover:bg-[#1a1715] text-white px-5 py-2.5 rounded font-bold text-sm transition-colors"
              >
                Dashboard
              </button>
              <button className="flex items-center space-x-2 bg-[#b57317] hover:bg-[#965e10] text-white px-5 py-2.5 rounded font-bold text-sm transition-colors">
                <Grid className="w-4 h-4" />
                <span>View as Report</span>
              </button>
            </>
          )}
          <button 
            onClick={() => { setEditingMember(null); setIsModalOpen(true); }}
            className="bg-[#e7e6e2] hover:bg-[#d6d4ce] text-[#003366] px-5 py-2.5 rounded font-bold text-sm transition-colors"
          >
            Add Member
          </button>
        </div>
      </div>

      {currentView === 'dashboard' ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
          <div className="bg-[#4a84a0] w-10 h-10 rounded text-white flex items-center justify-center mb-4">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-800">{members.length}</div>
          <div className="text-xs text-slate-500 mt-1 uppercase">Total Members</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
          <div className="bg-[#5c8b93] w-10 h-10 rounded text-white flex items-center justify-center mb-4">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-800">{members.filter(m => !m.membership_ends_on || new Date(m.membership_ends_on) > new Date()).length}</div>
          <div className="text-xs text-slate-500 mt-1 uppercase">Active Members</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
          <div className="bg-[#59847d] w-10 h-10 rounded text-white flex items-center justify-center mb-4">
            <Star className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-800">{members.filter(m => (m.membership_category || "").toLowerCase().includes("committee")).length}</div>
          <div className="text-xs text-slate-500 mt-1 uppercase">Committee</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
          <div className="bg-[#598858] w-10 h-10 rounded text-white flex items-center justify-center mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-800">{members.filter(m => { if (!m.membership_ends_on) return false; const diff = (new Date(m.membership_ends_on).getTime() - Date.now()) / (1000 * 60 * 60 * 24); return diff >= 0 && diff <= 30; }).length}</div>
          <div className="text-xs text-slate-500 mt-1 uppercase">Expiring Soon</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
          <div className="bg-[#6c915f] w-10 h-10 rounded text-white flex items-center justify-center mb-4">
            <UserPlus className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-800">{members.filter(m => { if (!m.joining_date) return false; const d = new Date(m.joining_date); const now = new Date(); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length}</div>
          <div className="text-xs text-slate-500 mt-1 uppercase">New This Month</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#467f92] px-4 py-3 text-white font-medium text-sm flex justify-between items-center">
              Membership Renewal Reminder
            </div>
            <div className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-medium">Member Name</th>
                    <th className="px-4 py-3 font-medium">Membership Ends On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Ashok Ravulapati', date: '01-Oct-2026' },
                    { name: 'Chakrapani Nadimpally', date: '30-Sep-2026' },
                    { name: 'Kiranjeet Kaur', date: '30-Sep-2026' },
                    { name: 'Padmaja', date: '30-Sep-2026' },
                    { name: 'SRIDHAR R', date: '01-Oct-2026' },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-[#467f92]">{item.name}</td>
                      <td className="px-4 py-3 text-slate-600">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 text-xs text-[#467f92] italic border-t border-gray-100 bg-slate-50">
              Members whose membership ends within 30 days of current date.
            </div>
          </div>

          <div className="bg-[#6b7c84] px-4 py-3 text-white font-medium text-sm rounded-lg shadow-sm">
            Visitors interested for membership
          </div>
        </div>

        {/* Middle Column (Chart) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full min-h-[300px] p-4">
            <h3 className="text-slate-800 font-semibold mb-6">New Member Registrations</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{fontSize: 10}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <YAxis tick={{fontSize: 10}} tickLine={false} axisLine={false} domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
                  <Tooltip />
                  <Line type="stepAfter" dataKey="members" stroke="#4a84a0" strokeWidth={2} dot={{r: 2, fill: '#4a84a0'}} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#597858] px-4 py-3 text-white font-medium text-sm">
              Management Committee Members
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { role: 'SAS MC Member', name: 'Guna Kotamraju', date: '31-Mar-2031' },
                { role: 'SAS MC Member', name: 'G. Ramakrishna', date: '31-Jul-2029' },
                { role: 'SAS MC Member', name: 'Srivalli Teja', date: '31-May-2029' },
                { role: 'SAS MC Member', name: 'Srinivas Mulugu', date: '31-May-2035' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="text-xs text-slate-500">{item.role}</div>
                  <div className="font-semibold text-slate-800">{item.name}</div>
                  <div className="text-xs text-slate-500 mt-1">Membership upto : {item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </>
      ) : (
        <div className="flex h-[calc(100vh-10rem)] overflow-hidden gap-6">
          {/* Left Sidebar Filters */}
          <div className="w-[300px] flex-shrink-0 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full overflow-x-auto">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-6">
              
              {/* Membership Status */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm text-slate-800">Membership Status</h3>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" name="status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Active <span className="text-gray-400 text-xs">(150)</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" name="status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Inactive <span className="text-gray-400 text-xs">(9)</span></span>
                  </label>
                </div>
              </div>

              {/* Profile Completeness */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm text-slate-800">Profile Completeness</h3>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Complete <span className="text-gray-400 text-xs">(125)</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Incomplete <span className="text-gray-400 text-xs">(34)</span></span>
                  </label>
                </div>
              </div>

              {/* Relation with SAS */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm text-slate-800">Relation with SAS</h3>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>SAS Members <span className="text-gray-400 text-xs">(149)</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>SAS MC Member <span className="text-gray-400 text-xs">(7)</span></span>
                  </label>
                </div>
              </div>

              {/* Membership Category */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm text-slate-800">Membership Category</h3>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Member with Magazine-3 Year <span className="text-gray-400 text-xs">(55)</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Member with Magazine-5 Year <span className="text-gray-400 text-xs">(36)</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Member with Magazine-10 Year <span className="text-gray-400 text-xs">(29)</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Member without Magazine-3 Year <span className="text-gray-400 text-xs">(13)</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Lifetime Members-99 Year <span className="text-gray-400 text-xs">(11)</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Member without Magazine-1 Year <span className="text-gray-400 text-xs">(9)</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Member with Magazine-1 Year <span className="text-gray-400 text-xs">(5)</span></span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Member Distribution */}
          <div className="flex-1 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-slate-800 font-semibold">Total Members {members.length}</h2>
              <button className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-slate-900">
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {/* Member Cards */}
                {members.map((member, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{member.first_name ? `${member.first_name} ` : ''}{member.last_name}</h3>
                      <p className="text-slate-500 text-sm mb-4">{member.membership_category || 'Ashram members'}</p>
                      
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-xs">Membership Ends</span>
                      </div>
                      <div className="text-sm font-bold text-[#1e3a5f] mb-4">{member.membership_ends_on || 'N/A'}</div>

                      <div className="space-y-1.5 mt-4">
                        {member.email && (
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <span className="text-[#a855f7] w-3 h-3 block rounded-full border border-purple-200 bg-purple-50 flex items-center justify-center font-bold">@</span>
                            <span>{member.email}</span>
                          </div>
                        )}
                        {member.contact_number && (
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <span className="text-[#ef4444] w-3 h-3 block rounded-full border border-red-200 bg-red-50 flex items-center justify-center font-bold">📞</span>
                            <span>{member.isd_code ? `${member.isd_code} ` : ''}{member.contact_number}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <span className="text-[#3b82f6] w-3 h-3 block rounded-full border border-blue-200 bg-blue-50 flex items-center justify-center font-bold">🏢</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 space-x-2">
                      <div className="flex space-x-2">
                        <button onClick={() => setSelectedMember(member)} className="bg-blue-50 text-blue-600 p-2 rounded flex items-center justify-center hover:bg-blue-100 transition-colors border border-blue-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setEditingMember(member); setIsModalOpen(true); }} className="bg-green-50 text-green-600 p-2 rounded flex items-center justify-center hover:bg-green-100 transition-colors border border-green-200">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => handleDeleteMember(member.id)} className="bg-red-50 text-red-600 p-2 rounded flex items-center justify-center hover:bg-red-100 transition-colors border border-red-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center items-center mt-8 space-x-4 text-sm text-slate-600">
                <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700 transition-colors">&lt;</button>
                <span>1 - 15 of 159</span>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700 transition-colors">&gt;</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Member Modal */}
      <MemberForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onMemberAdded={handleAddMember}
        onMemberUpdated={handleUpdateMember}
        initialData={editingMember}
      />
    </div>
  );
};

export default Members;
