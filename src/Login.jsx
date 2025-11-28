import React, { useState } from 'react';
import { User, Lock, Zap, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    // จำลองการโหลด 1.5 วินาที
    setTimeout(() => {
        onLogin(username);
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-[#0b0c0f] font-sans selection:bg-[#FFD600] selection:text-black">
      
      {/* --- Left Side: Visual Banner --- */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1574975963232-9e500286c8e7?q=80&w=2070&auto=format&fit=crop" 
                alt="Hydro Dam" 
                className="w-full h-full object-cover opacity-50 scale-105 animate-[kenburns_20s_infinite_alternate]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-[#0b0c0f]/60 to-[#FFD600]/20 mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0f]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 p-12 text-left max-w-xl">
            <div className="inline-flex p-4 rounded-3xl bg-[#FFD600]/20 mb-8 backdrop-blur-md border border-[#FFD600]/30 shadow-[0_0_30px_rgba(255,214,0,0.2)]">
                <Zap size={48} className="text-[#FFD600]" fill="#FFD600" />
            </div>
            <h1 className="text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Aqua <span className="text-[#FFD600]">Volt</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
                Advanced hydroelectric monitoring and management system. Real-time data, predictive insights, and complete control.
            </p>
        </div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD600]/5 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          
          <div className="lg:hidden flex justify-center mb-6">
              <div className="p-3 rounded-2xl bg-[#FFD600]/20 backdrop-blur-md border border-[#FFD600]/30">
                 <Zap size={32} className="text-[#FFD600]" fill="#FFD600" />
              </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">Welcome Back</h2>
            <p className="mt-3 text-base text-gray-400">
              Sign in to access your dashboard
            </p>
          </div>

          <form className="mt-10 space-y-7" onSubmit={handleSubmit}>
            
            <div className="group relative">
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2 ml-1">Username</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#FFD600] transition-colors">
                    <User size={22} />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 text-base bg-[#16181c] border-2 border-transparent text-white rounded-2xl focus:outline-none focus:border-[#FFD600]/70 focus:bg-[#0b0c0f] focus:shadow-[0_0_15px_rgba(255,214,0,0.1)] transition-all placeholder-gray-600"
                    placeholder="Enter your username"
                  />
              </div>
            </div>

            <div className="group relative">
             <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2 ml-1">Password</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#FFD600] transition-colors">
                    <Lock size={22} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 text-base bg-[#16181c] border-2 border-transparent text-white rounded-2xl focus:outline-none focus:border-[#FFD600]/70 focus:bg-[#0b0c0f] focus:shadow-[0_0_15px_rgba(255,214,0,0.1)] transition-all placeholder-gray-600"
                    placeholder="••••••••"
                  />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#FFD600] focus:ring-[#FFD600] border-gray-700 rounded bg-[#16181c] cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-400 select-none cursor-pointer">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#FFD600] hover:text-[#e6c200] transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex items-center justify-center py-4 px-8 border border-transparent text-base font-bold rounded-2xl text-black bg-gradient-to-r from-[#FFD600] to-[#FFC000] hover:from-[#e6c200] hover:to-[#e6ac00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD600] focus:ring-offset-[#0b0c0f] transition-all duration-200 shadow-[0_0_25px_rgba(255,214,0,0.3)] hover:shadow-[0_0_35px_rgba(255,214,0,0.5)] hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : (
                  <span className="absolute left-6 inset-y-0 flex items-center transition-transform group-hover:translate-x-1">
                    <ArrowRight size={24} className="text-black/70 group-hover:text-black" />
                  </span>
              )}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="font-bold text-[#FFD600] hover:text-[#e6c200] transition-colors">
              Contact Administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;