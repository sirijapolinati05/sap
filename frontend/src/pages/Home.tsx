import React, { useState, useEffect } from 'react';
import { Plus, Expand } from 'lucide-react';

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
          
          {/* Upcoming Birthdays */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#467f92] px-4 py-2.5 text-white font-medium text-sm flex justify-between items-center">
              Upcoming Birthdays
            </div>
            <div className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-2 font-medium">Member Name</th>
                    <th className="px-4 py-2 font-medium">Date Of Birth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Harish', date: '28-Sep' },
                    { name: 'Jigar Katariya', date: '30-Sep' },
                    { name: 'Sundara Moorthy V.', date: '01 Oct' },
                    { name: 'Jammalamadaka Seshasekhar', date: '14-Oct' },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-2.5 text-[#467f92]">{item.name}</td>
                      <td className="px-4 py-2.5 text-slate-600">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Membership Renewal Reminder */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#467f92] px-4 py-2.5 text-white font-medium text-sm flex justify-between items-center">
              Membership Renewal Reminder
            </div>
            <div className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-2 font-medium">Member Name</th>
                    <th className="px-4 py-2 font-medium">Membership Ends On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Chakrapani Nadimpally', date: '30-Sep-2026' },
                    { name: 'Padmaja', date: '30-Sep-2026' },
                    { name: 'Kiranjeet Kaur', date: '30 Sep 2026' },
                    { name: 'SRIDHAR R', date: '01-Oct-2026' },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-2.5 text-[#467f92]">{item.name}</td>
                      <td className="px-4 py-2.5 text-slate-600">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
