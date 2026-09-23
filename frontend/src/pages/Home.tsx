import React, { useState, useEffect } from 'react';
import { Plus, Expand, Cake, RefreshCw, UserCheck } from 'lucide-react';

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

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="py-8 text-center text-slate-400 text-sm">{message}</div>
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

  const badgeClass = (days: number) => {
    if (days === 0) return 'bg-pink-100 text-pink-700';
    if (days <= 7)  return 'bg-red-100 text-red-700';
    if (days <= 14) return 'bg-amber-100 text-amber-700';
    return 'bg-green-100 text-green-700';
  };

  const dayLabel = (days: number) => {
    if (days === 0) return 'Today 🎂';
    if (days === 1) return 'Tomorrow';
    return `In ${days}d`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-[#467f92] px-4 py-2.5 text-white font-medium text-sm flex items-center gap-2">
        <Cake className="w-4 h-4 opacity-80" />
        Upcoming Birthdays
        <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
          Next 30 days
        </span>
      </div>
      <div className="p-0">
        {loading ? (
          <SkeletonRows cols={2} />
        ) : data.length === 0 ? (
          <EmptyState message="No upcoming birthdays" />
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-2 font-medium">Member Name</th>
                <th className="px-4 py-2 font-medium">Date Of Birth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2.5 text-[#467f92] font-medium">{item.name}</td>
                  <td className="px-4 py-2.5 text-slate-600">
                    <div className="flex items-center gap-2">
                      <span>{item.dob}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${badgeClass(item.days_away)}`}>
                        {dayLabel(item.days_away)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
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

  const rowColor = (days: number) => {
    if (days <= 7)  return 'bg-red-50';
    if (days <= 14) return 'bg-amber-50';
    return '';
  };

  const badgeClass = (days: number) => {
    if (days === 0) return 'bg-red-600 text-white';
    if (days <= 7)  return 'bg-red-100 text-red-700';
    if (days <= 14) return 'bg-amber-100 text-amber-700';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-[#467f92] px-4 py-2.5 text-white font-medium text-sm flex items-center gap-2">
        <RefreshCw className="w-4 h-4 opacity-80" />
        Membership Renewal Reminder
        <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
          Next 30 days
        </span>
      </div>
      <div className="p-0">
        {loading ? (
          <SkeletonRows cols={2} />
        ) : data.length === 0 ? (
          <EmptyState message="No renewals due soon" />
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-2 font-medium">Member Name</th>
                <th className="px-4 py-2 font-medium">Membership Ends On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item, idx) => (
                <tr key={idx} className={`hover:bg-slate-50/50 transition-colors ${rowColor(item.days_remaining)}`}>
                  <td className="px-4 py-2.5 text-[#467f92] font-medium">{item.name}</td>
                  <td className="px-4 py-2.5 text-slate-600">
                    <div className="flex items-center gap-2">
                      <span>{item.membership_ends_on}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${badgeClass(item.days_remaining)}`}>
                        {item.days_remaining === 0 ? 'Today' : `${item.days_remaining}d left`}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};



// ── Home Page ─────────────────────────────────────────────────────────────────
const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
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
    
    // Then tick every second
    const interval = setInterval(() => {
      setCurrentTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getGreeting = (date: Date) => {
    const hours = date.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 flex items-center justify-between shadow-md text-white">
        <div className="flex items-center space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User Profile" 
            className="w-14 h-14 rounded-full border-2 border-white/50 shadow-sm object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{getGreeting(currentTime)}, <span className="text-yellow-400">Mrs Sharada Attilli!</span></h2>
            <p className="text-indigo-100 text-sm mt-0.5">Start your day with energy ⚡</p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-right hidden sm:block">
          <div className="text-2xl font-semibold tracking-wider">{formatTime(currentTime)}</div>
          <div className="text-xs text-indigo-100 mt-1">{formatDate(currentTime)}</div>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          <UpcomingBirthdays />
          <MembershipRenewals />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-64 overflow-hidden">
            <div className="border-b border-gray-100 px-4 py-3 text-slate-800 font-medium text-sm">
              Top 5 Donations (Current month)
            </div>
            <div className="p-4 flex items-center justify-center h-[calc(100%-45px)] text-slate-400 text-sm">
              No data available
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#8b7593] px-4 py-2.5 text-white font-medium text-sm flex justify-between items-center">
              <span>My Tasks</span>
              <div className="flex space-x-2">
                <button className="hover:bg-white/20 p-1 rounded transition-colors"><Plus className="w-4 h-4" /></button>
                <button className="hover:bg-white/20 p-1 rounded transition-colors"><Expand className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="bg-[#ede7ee] h-10 w-full border-b border-gray-200"></div>
            <div className="p-4 flex items-center justify-center min-h-[150px] text-slate-400 text-sm bg-white">
              No tasks pending
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
