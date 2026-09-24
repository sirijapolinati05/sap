import React, { useState, useEffect, useMemo } from 'react';
import { Users, CheckCircle, Star, Clock, UserPlus, Calendar, Cake, Search, MoreVertical, Edit, Eye, RotateCcw, Grid, LayoutDashboard, Trash2, ArrowDown, ChevronDown, ChevronRight, Info, BarChart3, CalendarDays } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MemberForm from '../components/forms/MemberForm';
import MemberDetails from '../components/MemberDetails';
import BackgroundImage from '../assets/Background1.png';


const Members: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'list'>('dashboard');
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [interestedVisitors, setInterestedVisitors] = useState<any[]>([]);
  const [memberStats, setMemberStats] = useState<any>({
    membership_status: { Active: 0, Inactive: 0 },
    profile_completeness: { Complete: 0, Incomplete: 0 },
    relation_with_sas: {},
    membership_category: {}
  });

  const dynamicChartData = useMemo(() => {
    const data: {name: string, month: number, year: number, members: number}[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = d.toLocaleDateString('en-US', { month: 'short' });
      const yearStr = d.getFullYear();
      data.push({
        name: `${monthStr} ${yearStr}`,
        month: d.getMonth(),
        year: d.getFullYear(),
        members: 0
      });
    }

    members.forEach(m => {
      if (m.joining_date) {
        const jd = new Date(m.joining_date);
        const point = data.find(d => d.month === jd.getMonth() && d.year === jd.getFullYear());
        if (point) {
          point.members += 1;
        }
      }
    });

    return data.map(d => ({ name: d.name, members: d.members }));
  }, [members]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/members`)
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error("Error fetching members:", err));

    fetch(`${import.meta.env.VITE_API_URL}/visitors`)
      .then(res => res.json())
      .then(data => {
        const interested = data.filter((v: any) => v.interested_to_become_member === true);
        setInterestedVisitors(interested);
      })
      .catch(err => console.error("Error fetching visitors:", err));
      
    fetch(`${import.meta.env.VITE_API_URL}/members/stats`)
      .then(res => res.json())
      .then(data => setMemberStats(data))
      .catch(err => console.error("Error fetching member stats:", err));
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/members/${memberId}`, {
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
    <div className="w-full space-y-6 relative">
      {/* Background image */}
      <div
        className="fixed top-[72px] bottom-0 left-0 md:left-[224px] right-0 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      {/* Header */}
      <div className="mb-6 relative">
        <div className="absolute right-0 top-[-2rem] w-[600px] h-[200px] pointer-events-none opacity-30 bg-no-repeat bg-right-top z-0" style={{ backgroundImage: "url('/sas-watermark.svg')" }}></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0c3f50]">Members</h1>
            <p className="text-slate-500 text-sm mt-1 mb-6">Manage and track all membership activities</p>
          </div>
          <div className="flex space-x-3 mb-6 sm:mb-0">
            {currentView === 'dashboard' ? (
              <button 
                onClick={() => setCurrentView('list')}
                className="flex items-center bg-[#0c3f50] hover:bg-[#082a36] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm"
              >
                <Users className="w-4 h-4 mr-2" />
                Members List
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="bg-[#2c2825] hover:bg-[#1a1715] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors"
                >
                  Dashboard
                </button>
                <button className="flex items-center space-x-2 bg-[#b57317] hover:bg-[#965e10] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
                  <Grid className="w-4 h-4" />
                  <span>View as Report</span>
                </button>
              </>
            )}
            <button 
              onClick={() => { setEditingMember(null); setIsModalOpen(true); }}
              className="flex items-center bg-white hover:bg-gray-50 text-[#2b6be0] border border-gray-200 px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm"
            >
              <span className="text-lg leading-none mr-2 font-light">+</span>
              Add Member
            </button>
          </div>
        </div>
      </div>

      {currentView === 'dashboard' ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            {/* Total Members */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col p-5 relative overflow-hidden h-[130px]">
              <div className="absolute bottom-0 right-0 w-32 h-16 pointer-events-none">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-blue-50">
                  <path d="M0,50 Q25,30 50,40 T100,20 L100,50 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 w-10 h-10 rounded-xl text-blue-500 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-[13px] text-slate-600 font-medium leading-tight">Total Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-800 font-serif">{members.length}</div>
                  <div className="flex items-center text-xs font-bold text-emerald-500 mt-1">
                    <ArrowDown className="w-3 h-3 mr-1 rotate-135" />
                    +12%
                  </div>
                </div>
              </div>
            </div>

            {/* Active Members */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col p-5 relative overflow-hidden h-[130px]">
              <div className="absolute bottom-0 right-0 w-32 h-16 pointer-events-none">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-purple-50">
                  <path d="M0,50 Q25,30 50,40 T100,20 L100,50 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 w-10 h-10 rounded-xl text-purple-500 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="text-[13px] text-slate-600 font-medium leading-tight">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-800 font-serif">{members.filter(m => !m.membership_ends_on || new Date(m.membership_ends_on) > new Date()).length}</div>
                  <div className="flex items-center text-xs font-bold text-emerald-500 mt-1">
                    <ArrowDown className="w-3 h-3 mr-1 rotate-135" />
                    +8%
                  </div>
                </div>
              </div>
            </div>

            {/* Committee */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col p-5 relative overflow-hidden h-[130px]">
              <div className="absolute bottom-0 right-0 w-32 h-16 pointer-events-none">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-orange-50">
                  <path d="M0,50 Q25,30 50,40 T100,20 L100,50 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-50 w-10 h-10 rounded-xl text-orange-500 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="text-[13px] text-slate-600 font-medium leading-tight">Committee</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-800 font-serif">{members.filter(m => (m.membership_category || "").toLowerCase().includes("committee")).length}</div>
                  <div className="flex items-center text-xs font-bold text-amber-500 mt-1">
                    <ArrowDown className="w-3 h-3 mr-1 -rotate-90" />
                    0%
                  </div>
                </div>
              </div>
            </div>

            {/* Expiring Soon */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col p-5 relative overflow-hidden h-[130px]">
              <div className="absolute bottom-0 right-0 w-32 h-16 pointer-events-none">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-emerald-50">
                  <path d="M0,50 Q25,30 50,40 T100,20 L100,50 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 w-10 h-10 rounded-xl text-emerald-500 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-[13px] text-slate-600 font-medium leading-tight">Expiring Soon</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-800 font-serif">{members.filter(m => { if (!m.membership_ends_on) return false; const diff = (new Date(m.membership_ends_on).getTime() - Date.now()) / (1000 * 60 * 60 * 24); return diff >= 0 && diff <= 30; }).length}</div>
                  <div className="flex items-center text-xs font-bold text-emerald-500 mt-1">
                    <ArrowDown className="w-3 h-3 mr-1 rotate-135" />
                    +20%
                  </div>
                </div>
              </div>
            </div>

            {/* New This Month */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col p-5 relative overflow-hidden h-[130px]">
              <div className="absolute bottom-0 right-0 w-32 h-16 pointer-events-none">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-red-50">
                  <path d="M0,50 Q25,30 50,40 T100,20 L100,50 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 w-10 h-10 rounded-xl text-red-500 flex items-center justify-center shrink-0">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div className="text-[13px] text-slate-600 font-medium leading-tight">New This Month</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-800 font-serif">{members.filter(m => { if (!m.joining_date) return false; const d = new Date(m.joining_date); const now = new Date(); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length}</div>
                  <div className="flex items-center text-xs font-bold text-emerald-500 mt-1">
                    <ArrowDown className="w-3 h-3 mr-1 rotate-135" />
                    +50%
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="w-full space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-orange-50/50 p-4 border-b border-orange-100/50 flex justify-between items-center relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-48 h-full pointer-events-none">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-orange-100/50">
                  <path d="M0,50 Q25,20 50,30 T100,10 L100,50 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-orange-100/80 w-8 h-8 rounded-lg text-orange-600 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <h3 className="text-slate-800 font-bold text-sm">Membership Renewal Reminder</h3>
              </div>
              <button className="flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 relative z-10 transition-colors">
                View all <ChevronRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>
            
            <div className="p-0">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-white">
                  <tr>
                    <th className="px-5 py-3 border-b border-gray-100">Member Name</th>
                    <th className="px-5 py-3 border-b border-gray-100 text-right">Membership Ends On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {members
                    .filter(m => {
                      if (!m.membership_ends_on) return false;
                      const diff = (new Date(m.membership_ends_on).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                      return diff >= 0 && diff <= 30;
                    })
                    .slice(0, 1) 
                    .map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-5 py-3 text-slate-700 font-medium">{[m.title, m.first_name, m.last_name].filter(Boolean).join(' ')}</td> 
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <span className="text-slate-600">{new Date(m.membership_ends_on).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">1 day left</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {members.filter(m => m.membership_ends_on && (new Date(m.membership_ends_on).getTime() - Date.now()) / (1000 * 60 * 60 * 24) >= 0 && (new Date(m.membership_ends_on).getTime() - Date.now()) / (1000 * 60 * 60 * 24) <= 30).length === 0 && (
                      <tr className="hover:bg-slate-50/50">
                        <td className="px-5 py-3 text-slate-700 font-medium">Mr sirija Polinati</td>
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <span className="text-slate-600">Sep 25, 2026</span>
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">1 day left</span>
                          </div>
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 bg-slate-50 border border-gray-100 m-4 rounded-lg flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-[11px] text-slate-500 italic font-medium">Members whose membership ends within 30 days of current date.</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-blue-50/50 p-4 border-b border-blue-100/50 flex justify-between items-center relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-48 h-full pointer-events-none">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-blue-100/50">
                  <path d="M0,50 Q25,20 50,30 T100,10 L100,50 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-blue-100/80 w-8 h-8 rounded-lg text-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-slate-800 font-bold text-sm">Visitors interested for membership</h3>
              </div>
              <button className="flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 relative z-10 transition-colors">
                View all <ChevronRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>
            <div className="p-0">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-white">
                  <tr>
                    <th className="px-5 py-3 border-b border-gray-100">Visitor Name</th>
                    <th className="px-5 py-3 border-b border-gray-100">Mobile</th>
                    <th className="px-5 py-3 border-b border-gray-100 text-right">Visit Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {interestedVisitors.length > 0 ? interestedVisitors.map((v, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 text-slate-700">{[v.title, v.first_name, v.last_name].filter(Boolean).join(' ')}</td>
                      <td className="px-5 py-3 text-slate-600">{v.mobile}</td>
                      <td className="px-5 py-3 text-right text-slate-600">{v.visit_date}</td>
                    </tr>
                  )) : (
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 text-slate-700 font-medium">Mrs jhgfds YHGFDSA</td>
                      <td className="px-5 py-3 text-slate-600">7654321</td>
                      <td className="px-5 py-3 text-right text-slate-600">2026-09-23</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Middle Column (Chart) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[400px]">
            <div className="p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 w-8 h-8 rounded-lg text-blue-500 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="text-slate-800 font-bold text-sm">New Member Registrations</h3>
              </div>
              <button className="flex items-center text-xs font-semibold text-slate-500 hover:text-slate-700 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors">
                This Year <ChevronDown className="w-3 h-3 ml-1" />
              </button>
            </div>
            
            <div className="flex-1 w-full p-2 pb-5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dynamicChartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} />
                  <YAxis tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} tickCount={5} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="members" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorMembers)" activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="bg-emerald-50/50 p-4 border-b border-emerald-100/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100/80 w-8 h-8 rounded-lg text-emerald-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-slate-800 font-bold text-sm">Management Committee Members</h3>
              </div>
              <button className="flex items-center text-xs font-semibold text-emerald-600 hover:text-emerald-800 transition-colors">
                View all <ChevronRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>
            <div className="divide-y divide-gray-50 flex-1 p-2">
              {[
                { role: 'SAS MC Member', name: 'Guna Kotamraju', date: '31-Mar-2031', initial: 'GK', color: 'bg-blue-100 text-blue-600' },
                { role: 'SAS MC Member', name: 'G. Ramakrishna', date: '31-Jul-2029', initial: 'GR', color: 'bg-orange-100 text-orange-600' },
                { role: 'SAS MC Member', name: 'Srivalli Teja', date: '31-May-2029', initial: 'ST', color: 'bg-amber-100 text-amber-600' },
                { role: 'SAS MC Member', name: 'Srinivas Mulugu', date: '31-May-2035', initial: 'SM', color: 'bg-emerald-100 text-emerald-600' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors rounded-xl group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`${item.color} w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0`}>
                      {item.initial}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.role}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Membership upto : {item.date}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
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
            <div className="border-b border-gray-100">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 w-full space-y-6">
              
              {/* Membership Status */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm text-slate-800">Membership Status</h3>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" name="status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Active <span className="text-gray-400 text-xs">({memberStats.membership_status?.Active || 0})</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" name="status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Inactive <span className="text-gray-400 text-xs">({memberStats.membership_status?.Inactive || 0})</span></span>
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
                    <span>Complete <span className="text-gray-400 text-xs">({memberStats.profile_completeness?.Complete || 0})</span></span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span>Incomplete <span className="text-gray-400 text-xs">({memberStats.profile_completeness?.Incomplete || 0})</span></span>
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
                  {Object.entries(memberStats.relation_with_sas || {}).map(([key, count]: [string, any]) => (
                    <label key={key} className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span>{key} <span className="text-gray-400 text-xs">({count})</span></span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Membership Category */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm text-slate-800">Membership Category</h3>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  {Object.entries(memberStats.membership_category || {}).map(([key, count]: [string, any]) => (
                    <label key={key} className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
                      <input type="checkbox" className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <span>{key} <span className="text-gray-400 text-xs">({count})</span></span>
                    </label>
                  ))}
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
