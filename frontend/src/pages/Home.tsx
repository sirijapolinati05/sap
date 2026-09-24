import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Check, Gift, Heart, Plus, ArrowRight, BarChart2, CalendarDays, X, Users, UserCheck, TrendingUp, Package, ChevronRight, ChevronDown } from 'lucide-react';

interface BirthdayEntry {
  name: string;
  dob: string;
  days_away: number;
}

interface RenewalEntry {
  name: string;
  membership_ends_on: string;
  days_remaining: number;
}

// ── Shared helpers ────────────────────────────────────────────────────────────
const SkeletonRows: React.FC<{ cols: number }> = ({ cols }) => (
  <div className="p-3 space-y-2 animate-pulse">
    {[1, 2, 3].map(i => (
      <div key={i} className="flex gap-3">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} className="h-4 bg-slate-100 rounded flex-1" />
        ))}
      </div>
    ))}
  </div>
);

const EmptyStateCard: React.FC<{ icon: React.ReactNode, title: string, subtitle: string }> = ({ icon, title, subtitle }) => (
  <div className="flex flex-col py-10 space-y-3 items-center text-center">
    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-slate-300 mt-2 mb-2">
      {icon}
    </div>
    <div>
      <div className="font-bold text-slate-800 text-[15px]">{title}</div>
      <div className="text-slate-500 text-[13px] mt-1">{subtitle}</div>
    </div>
  </div>
);

// ── Upcoming Birthdays Widget ────────────────────────────────────────────────
const UpcomingBirthdays: React.FC = () => {
  const [data, setData] = useState<BirthdayEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/home/upcoming-birthdays?days=30')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d: unknown) => {
        setData(Array.isArray(d) ? d as BirthdayEntry[] : []);
        setLoading(false);
      })
      .catch(() => { setData([]); setLoading(false); });
  }, []);

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden">
      <div className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-[#0c3f50]">
          <Gift className="w-[22px] h-[22px] stroke-[1.5]" />
          <h2 className="text-[19px] font-serif font-bold">Upcoming birthdays</h2>
        </div>
        <span className="bg-[#eaf5ef] text-[#2c815b] text-[12px] font-bold px-3 py-1 rounded-md">{data.length} upcoming</span>
      </div>
      <div className="px-6 pb-4 text-slate-500 text-[13px]">
        Member celebrations on the calendar
      </div>
      
      {loading ? (
        <SkeletonRows cols={2} />
      ) : data.length === 0 ? (
        <div className="py-4 text-center text-slate-500 text-sm">No upcoming birthdays</div>
      ) : (
        data.map((item, idx) => (
          <div key={idx} className="px-6 py-3 border-t border-gray-50 flex items-center justify-between group cursor-pointer hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#eaf5ef] text-[#2c815b] flex items-center justify-center font-bold text-[13px]">
                {getInitials(item.name)}
              </div>
              <div className="font-bold text-[#0c3f50] text-[14px]">{item.name}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-[#0c3f50] text-[13px]">{item.dob}</div>
              <div className="text-slate-400 text-[12px] mt-0.5">
                {item.days_away === 0 ? 'Today 🎂' : item.days_away === 1 ? 'Tomorrow' : `In ${item.days_away} days`}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// ── Membership Renewal Reminder Widget ───────────────────────────────────────
const MembershipRenewals: React.FC = () => {
  const [data, setData] = useState<RenewalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/home/membership-renewals?days=30')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d: unknown) => {
        setData(Array.isArray(d) ? d as RenewalEntry[] : []);
        setLoading(false);
      })
      .catch(() => { setData([]); setLoading(false); });
  }, []);

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden">
      <div className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-[#0c3f50]">
          <CalendarDays className="w-[22px] h-[22px] stroke-[1.5]" />
          <h2 className="text-[19px] font-serif font-bold">Membership renewals</h2>
        </div>
        <span className="bg-[#fdf4e8] text-[#c98330] text-[12px] font-bold px-3 py-1 rounded-md">{data.length} due soon</span>
      </div>
      <div className="px-6 pb-4 text-slate-500 text-[13px]">
        Members whose plans end soon
      </div>
      
      {loading ? (
        <SkeletonRows cols={2} />
      ) : data.length === 0 ? (
        <div className="py-4 text-center text-slate-500 text-sm">No renewals due soon</div>
      ) : (
        data.map((item, idx) => (
          <div key={idx} className="px-6 py-4 border-t border-gray-50 flex items-center justify-between group cursor-pointer hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#fdf4e8] text-[#c98330] flex items-center justify-center font-bold text-[13px]">
                {getInitials(item.name)}
              </div>
              <div>
                <div className="font-bold text-[#0c3f50] text-[14px]">{item.name}</div>
                <div className="text-slate-500 text-[13px] mt-0.5">Membership ends {item.membership_ends_on}</div>
              </div>
            </div>
            <div className="font-bold text-[#0c3f50] text-[13px]">
              {item.days_remaining === 0 ? 'Today' : `In ${item.days_remaining} days`}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// ── Home Page ─────────────────────────────────────────────────────────────────
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [renewalCount, setRenewalCount] = useState(0);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [tasks, setTasks] = useState<{id: number, name: string, date: string, status: string}[]>([]);
  const [kpiData, setKpiData] = useState({
    totalMembers: 0,
    todayVisitors: 0,
    todaySales: 0,
    lowStock: 0
  });

  useEffect(() => {
    // Fetch real KPI data
    const fetchKPIs = async () => {
      try {
        const [membersRes, visitorsRes, salesRes, inventoryRes] = await Promise.all([
          fetch('http://localhost:8000/members').catch(() => null),
          fetch('http://localhost:8000/visitors').catch(() => null),
          fetch('http://localhost:8000/sales').catch(() => null),
          fetch('http://localhost:8000/inventory').catch(() => null)
        ]);

        const members = membersRes && membersRes.ok ? await membersRes.json() : [];
        const visitors = visitorsRes && visitorsRes.ok ? await visitorsRes.json() : [];
        const sales = salesRes && salesRes.ok ? await salesRes.json() : [];
        const inventory = inventoryRes && inventoryRes.ok ? await inventoryRes.json() : [];

        const today = new Date().toISOString().split('T')[0];

        const todayVisitors = visitors.filter((v: any) => v.visit_date && v.visit_date.startsWith(today)).length || visitors.length;
        
        const todaySales = sales.reduce((sum: number, s: any) => {
           return sum + (Number(s.total_amount) || Number(s.total) || 0);
        }, 0);

        const lowStock = inventory.filter((i: any) => (i.current_stock || 0) <= (i.min_stock_level || 0)).length;

        setKpiData({
          totalMembers: members.length || 0,
          todayVisitors: todayVisitors || 0,
          todaySales: todaySales || 0,
          lowStock: lowStock || 0
        });
      } catch (err) {
        console.error("Error fetching KPIs", err);
      }
    };
    fetchKPIs();

    const fetchTime = async () => {
      try {
        const response = await fetch('http://localhost:8000/time');
        if (response.ok) {
          const data = await response.json();
          setCurrentTime(new Date(data.time));
        }
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchTime();
    
    // Fetch renewal count for banner
    fetch('http://localhost:8000/home/membership-renewals?days=30')
      .then(r => r.json())
      .then((d: unknown) => {
        if (Array.isArray(d)) setRenewalCount(d.length);
      })
      .catch(() => {});
      
    // Fetch tasks
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/tasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
      
    // Tick every second
    const interval = setInterval(() => {
      setCurrentTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getGreeting = (date: Date) => {
    const hours = date.getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleCreateTask = async () => {
    if (!taskName || !taskDate) return;
    try {
      const res = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName, date: taskDate, status: 'pending' })
      });
      if (res.ok) {
        const newTask = await res.json();
        setTasks(prev => [...prev, newTask]);
        setIsTaskModalOpen(false);
        setTaskName('');
        setTaskDate('');
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8 mt-2">
        <div>
          <h3 className="text-[#c39b5b] font-bold text-[11px] tracking-[0.2em] uppercase mb-3">Daily Overview</h3>
          <h1 className="text-[32px] font-serif text-[#0c3f50] font-bold tracking-tight">{getGreeting(currentTime)}, Mrs Sharada Attili 👋</h1>
          <p className="text-slate-500 mt-1 font-medium text-[15px]">Here's what's happening with your workspace today.</p>
        </div>
        <div className="flex items-center text-slate-500 font-medium text-[15px] pb-1">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Renewal Banner */}
      <div className="bg-[#fef9e8] border border-[#f3e5c4] rounded-xl p-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-5">
          <div className="w-12 h-12 bg-[#f7eacc] rounded-xl flex items-center justify-center text-[#c98330]">
             <CalendarDays className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-[#0c3f50] font-bold text-[16px]">{renewalCount} memberships renew in next 30 days</h3>
            <p className="text-slate-500 text-[14px] mt-0.5">Review these members before their renewal date.</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/members')}
          className="flex items-center bg-[#b36614] hover:bg-[#965410] text-white font-medium text-[13px] px-4 py-2 rounded-lg transition-colors group shadow-sm">
          View renewals <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Members */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative overflow-hidden h-[150px]">
          <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none z-0">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,100 L100,100 L100,50 Q75,80 50,85 T0,95 Z" fill="#e8effa" />
             </svg>
          </div>
          <div className="relative z-10 p-5 h-full flex flex-col justify-between">
             <div className="flex justify-between items-start">
                <div className="bg-[#f0f5fc] p-2.5 rounded-xl text-[#3b71ca] shadow-sm">
                   <Users className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div></div>
             </div>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-4">
                <p className="text-[#0c3f50] font-bold text-[11px] tracking-wide uppercase mb-1">Total Members</p>
                <h2 className="text-[#0c3f50] text-[34px] font-bold font-serif leading-none tracking-tight">{kpiData.totalMembers}</h2>
             </div>
             <div className="mt-auto">
                <span className="text-[#1b5e40] font-bold text-[12px]">↑ +12%</span>
             </div>
          </div>
        </div>

        {/* Today's Visitors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative overflow-hidden h-[150px]">
          <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none z-0">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,100 L100,100 L100,45 Q75,40 50,65 T0,90 Z" fill="#f4ebf8" />
             </svg>
          </div>
          <div className="relative z-10 p-5 h-full flex flex-col justify-between">
             <div className="flex justify-between items-start">
                <div className="bg-[#f9f1fb] p-2.5 rounded-xl text-[#9044d4] shadow-sm">
                   <UserCheck className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div></div>
             </div>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-4">
                <p className="text-[#0c3f50] font-bold text-[11px] tracking-wide uppercase mb-1">Today's Visitors</p>
                <h2 className="text-[#0c3f50] text-[34px] font-bold font-serif leading-none tracking-tight">{kpiData.todayVisitors}</h2>
             </div>
             <div className="mt-auto">
                <span className="text-[#1b5e40] font-bold text-[12px]">↑ +6%</span>
             </div>
          </div>
        </div>

        {/* Today's Sales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative overflow-hidden h-[150px]">
          <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none z-0">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,100 L100,100 L100,30 Q60,70 50,55 T0,70 Z" fill="#e6f2ec" />
             </svg>
          </div>
          <div className="relative z-10 p-5 h-full flex flex-col justify-between">
             <div className="flex justify-between items-start">
                <div className="bg-[#ebf7f0] p-2.5 rounded-xl text-[#1b5e40] shadow-sm">
                   <TrendingUp className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div></div>
             </div>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-4">
                <p className="text-[#0c3f50] font-bold text-[11px] tracking-wide uppercase mb-1">Today's Sales</p>
                <h2 className="text-[#0c3f50] text-[34px] font-bold font-serif leading-none tracking-tight">₹ {kpiData.todaySales.toLocaleString()}</h2>
             </div>
             <div className="mt-auto">
                <span className="text-[#1b5e40] font-bold text-[12px]">↑ +8%</span>
             </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative overflow-hidden h-[150px]">
          <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none z-0">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,100 L100,100 L100,60 Q80,50 60,60 T0,75 Z" fill="#faeae0" />
             </svg>
          </div>
          <div className="relative z-10 p-5 h-full flex flex-col justify-between">
             <div className="flex justify-between items-start">
                <div className="bg-[#fcf0ea] p-2.5 rounded-xl text-[#e66c2d] shadow-sm">
                   <Package className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div></div>
             </div>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-4">
                <p className="text-[#0c3f50] font-bold text-[11px] tracking-wide uppercase mb-1">Low Stock Items</p>
                <h2 className="text-[#0c3f50] text-[34px] font-bold font-serif leading-none tracking-tight">{kpiData.lowStock}</h2>
             </div>
             <div className="mt-auto">
                <span className="text-[#e14b38] font-bold text-[12px]">↓ -2</span>
             </div>
          </div>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          <MembershipRenewals />
          <UpcomingBirthdays />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* My Tasks Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden h-[240px] flex flex-col">
            <div className="px-6 py-5 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-[#0c3f50]">
                <div className="bg-[#e8f1fc] text-[#3b82f6] p-1 rounded-md border border-[#cbe1fc]">
                  <Check className="w-5 h-5 stroke-[2]" />
                </div>
                <h2 className="text-[19px] font-serif font-bold">My tasks</h2>
              </div>
              <button 
                onClick={() => setIsTaskModalOpen(true)}
                className="flex items-center space-x-1.5 bg-[#f0f6ff] text-[#2563eb] hover:bg-[#e0edff] transition-colors px-3 py-1.5 rounded-lg text-[13px] font-bold shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add task</span>
              </button>
            </div>
            
            <div className="flex-1 flex flex-col border-t border-gray-50 mx-6 py-4 overflow-y-auto">
              {tasks.length === 0 ? (
                <EmptyStateCard 
                  icon={<Check className="w-6 h-6 stroke-[2]" />}
                  title="No tasks to display"
                  subtitle="Add a task to keep your next action visible."
                />
              ) : (
                <div className="w-full h-full overflow-hidden flex flex-col pt-2">
                  <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                    {tasks.map(task => (
                      <div key={task.id} className="grid grid-cols-[1fr_100px] gap-4 items-center text-sm group">
                        <div className="flex items-center space-x-3 truncate">
                          <div className="font-bold text-[13px] text-slate-800 truncate">{task.name}</div>
                        </div>
                        <div className="text-slate-500 text-right whitespace-nowrap flex items-center justify-end">
                          {task.date}
                          <ChevronRight className="w-4 h-4 ml-2 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Top Donations Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden h-[240px] flex flex-col">
            <div className="px-6 py-5 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-[#0c3f50]">
                <h2 className="text-[19px] font-serif font-bold">Top donations</h2>
              </div>
              <div className="flex items-center space-x-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 bg-white cursor-pointer shadow-sm">
                <span>This month</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 flex flex-col mx-6 border-t border-gray-50 pt-6">
              <div className="flex flex-col items-center justify-center text-slate-400">
                <div className="bg-[#f8f9fa] rounded-full p-4 mb-3 border border-gray-100">
                  <Heart className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm font-bold text-[#0c3f50]">No donation data available</p>
                <p className="text-[12px] mt-0.5 text-slate-500 text-center">Donations for the current month will appear here.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Add Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200/80">
              <h2 className="text-xl font-bold text-gray-900">Add My Task</h2>
              <button 
                onClick={() => setIsTaskModalOpen(false)}
                className="p-1.5 border border-dashed border-gray-400 rounded hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 stroke-[1.5]" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 bg-white">
              
              {/* Task Name */}
              <div>
                <div className="relative border border-gray-300 rounded-md focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 overflow-hidden">
                  <div className="absolute top-0 left-0 w-3 h-3 bg-[#e14b38]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                  <textarea 
                    className="w-full p-4 min-h-[120px] focus:outline-none resize-y text-gray-800"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  ></textarea>
                </div>
                <div className="text-right mt-1 text-[11px] text-gray-500 font-medium">Required</div>
              </div>

              {/* Task Date */}
              <div>
                <div className="relative flex border border-gray-300 rounded-md focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 overflow-hidden">
                  <div className="absolute top-0 left-0 w-3 h-3 bg-[#e14b38]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', zIndex: 10 }}></div>
                  <input 
                    type="date" 
                    className="flex-1 p-4 focus:outline-none text-gray-800 bg-transparent"
                    placeholder="Task Date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                  />
                </div>
                <div className="text-right mt-1 text-[11px] text-gray-500 font-medium">Required</div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200/80 flex items-center justify-between bg-white">
              <button 
                onClick={() => setIsTaskModalOpen(false)}
                className="px-6 py-2.5 bg-[#f0f0f0] text-gray-800 font-bold text-[14px] rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateTask}
                className="px-6 py-2.5 bg-[#2a2723] text-white font-bold text-[14px] rounded-md hover:bg-black transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
