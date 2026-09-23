import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, KeyRound, EyeOff, Eye } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('sharada');
  const [password, setPassword] = useState('Themother1');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      navigate('/home');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 flex items-center justify-center p-4">
      <div className="relative">
        {/* Glow effect behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-3xl blur opacity-30"></div>
        
        {/* Main Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
          
          {/* Logo Placeholder */}
          <div className="mb-4">
            <svg className="w-16 h-16 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-slate-800 text-center mb-8 px-4">
            SAS Hyderabad Branch Management Application
          </h1>

          <form className="w-full space-y-4" onSubmit={handleLogin}>
            
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center">
                {error}
              </div>
            )}
            {/* Username Input */}
            <div className="relative flex items-center w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                placeholder="Username" 
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                placeholder="Password" 
                required
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mt-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
