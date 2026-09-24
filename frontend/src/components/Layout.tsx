import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, HelpCircle, User,
  Home as HomeIcon, Users, UserCheck, TrendingUp, ShoppingCart, Package,
  BookOpen, FileBarChart, Settings, Key, LogOut, ChevronDown, Flower2,
  Search, Bell, ChevronRight
} from 'lucide-react';
import BackgroundImage from '../assets/Background1.png';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const location = useLocation();
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('inventory')) return 'Inventory';
    if (path.includes('members')) return 'Members';
    if (path.includes('visitor')) return 'Visitor';
    if (path.includes('sales')) return 'Sales';
    if (path.includes('purchase')) return 'Purchase';
    if (path.includes('cash-book')) return 'Cash Book';
    if (path.includes('reports')) return 'Reports';
    if (path.includes('setup')) return 'System Setup';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 relative">
      {/* Global fixed background */}
      <div
        className="fixed top-0 bottom-0 left-0 right-0 pointer-events-none -z-20"
        style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Top Navbar */}
      <header className="h-[72px] flex items-center justify-between px-4 sm:px-10 bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-30 md:pl-[264px] print:hidden">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 hover:bg-gray-200/50 rounded text-slate-600 transition-colors md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center text-sm md:flex hidden">
            <span className="font-bold text-slate-800 text-lg tracking-tight">{getBreadcrumb()}</span>
          </div>
        </div>

        {/* Center Search Bar - 3D inset look */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl hidden sm:flex items-center px-4">
          <div className="flex-1 flex items-center rounded-full px-4 py-2 transition-all"
            style={{
              background: 'linear-gradient(145deg, #e2e8f0, #f8fafc)',
              boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.12), inset -2px -2px 5px rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search members, sales, inventory..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-600 placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-5 text-sm">
          <button className="relative text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          
          
          <div className="group relative flex items-center space-x-1.5 cursor-pointer p-1 rounded transition-colors">
            <span className="font-medium text-slate-700 hidden sm:block">Mrs Sharada Attili</span>
            <div className="flex items-center space-x-2 bg-white/50 border border-gray-200/60 rounded-full pl-2 pr-1.5 py-1.5 shadow-sm hover:bg-white transition-colors">
              <div className="w-8 h-8 bg-[#e8f1ec] text-[#1b5e40] rounded-full flex items-center justify-center font-bold text-xs tracking-wide">
                SA
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block border border-gray-100">
              <button className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Key className="w-4 h-4" />
                <span>Change password</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button onClick={handleLogout} className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Separator line under header */}
      <div className="px-10 fixed top-[72px] left-0 right-0 z-20 md:pl-[264px]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>
      </div>

      <div className="flex flex-1 overflow-hidden relative mt-[72px]">
        
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed top-0 bottom-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out z-50 w-56 bg-[#0c3f50] border-r border-[#082a36] flex flex-col py-6 print:hidden overflow-y-auto shadow-xl md:shadow-none`}>
          
          {/* SAS Logo */}
          <div className="flex flex-col items-center justify-center mb-8 cursor-pointer group" onClick={() => navigate('/home')}>
            <div className="text-[#d8a868] mb-1 transform group-hover:scale-110 transition-transform">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7" />
                <polygon points="12 2 20.66 17 3.34 17" />
                <polygon points="12 22 3.34 7 20.66 7" />
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="3.34" y1="7" x2="20.66" y2="17" />
                <line x1="20.66" y1="7" x2="3.34" y2="17" />
              </svg>
            </div>
            <span className="text-[#d8a868] font-serif text-[12px] tracking-[0.3em] mt-1">SAS</span>
          </div>

          <nav className="flex-1 space-y-1.5 px-3">
            {[
              { icon: HomeIcon, label: 'Home', path: '/home' },
              { icon: Users, label: 'Members', path: '/members' },
              { icon: UserCheck, label: 'Visitor', path: '/visitor' },
              { icon: TrendingUp, label: 'Sales', path: '/sales' },
              { icon: ShoppingCart, label: 'Purchase', path: '/purchase' },
              { icon: Package, label: 'Inventory', path: '/inventory' },
              { icon: BookOpen, label: 'Cash Book', path: '/cash-book' },
              { icon: FileBarChart, label: 'Reports', path: '/reports' },
              { icon: Settings, label: 'System setup', path: '/setup' },
            ].map((item, index) => (
              <NavLink 
                key={index} 
                to={item.path} 
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 relative ${
                    isActive 
                    ? 'bg-white/10 text-[#d8a868] font-medium' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-[#d8a868]'
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="flex items-center w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    {isActive && <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#d8a868] rounded-r-md" />}
                    <item.icon className={`w-[20px] h-[20px] mr-3 stroke-[1.5] ${isActive ? 'text-[#d8a868]' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom floral accent */}
          <div className="mt-8 text-[#d8a868]/20 w-full overflow-hidden flex justify-center">
             <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="transform translate-y-8">
                <path d="M50 0C50 0 65 35 100 50C100 50 65 65 50 100C50 100 35 65 0 50C0 50 35 35 50 0Z" />
                <circle cx="50" cy="50" r="20" className="opacity-50" />
             </svg>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-transparent md:ml-56 px-4 sm:px-10 py-8 relative min-h-screen">
          <div className="relative z-10 w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
