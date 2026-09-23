import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Menu, HelpCircle, User,
  Home as HomeIcon, Users, UserCheck, TrendingUp, ShoppingCart, 
  Package, BookOpen, FileBarChart, Settings, Key, LogOut
} from 'lucide-react';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 hover:bg-gray-100 rounded text-slate-600 transition-colors md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/home')}>
            <svg className="w-6 h-6 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <span className="font-semibold text-indigo-900 tracking-tight hidden sm:block">
              SAS Hyderabad Branch Management Application
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 text-sm">
          <button className="hidden md:flex items-center space-x-1.5 bg-[#232f4e] hover:bg-slate-800 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors shadow-sm">
            <ShoppingCart className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
          
          <button className="hidden sm:flex items-center space-x-1 text-slate-600 hover:text-slate-900 transition-colors">
            <Package className="w-4 h-4" />
            <span>Install App</span>
          </button>
          
          <button className="text-slate-600 hover:text-slate-900 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          
          <div className="group relative flex items-center space-x-1.5 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
            <User className="w-4 h-4 text-slate-600" />
            <span className="font-medium">sharada</span>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
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

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`absolute md:static inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out z-50 w-56 bg-white border-r border-gray-200 flex flex-col py-4 h-full`}>
          <nav className="flex-1 space-y-1 px-3">
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
                  `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    isActive 
                    ? 'bg-[#0f5298] text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="flex items-center w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <item.icon className={`w-4 h-4 mr-3 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
