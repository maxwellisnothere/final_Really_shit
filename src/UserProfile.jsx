import React from 'react';
import { ArrowLeft, User, Mail, Shield, Calendar, MapPin, Edit, Camera } from 'lucide-react';

const UserProfile = ({ onBack, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#0b0c0f] text-gray-200 font-sans p-4 md:p-8">
      
      {/* Navbar แบบย่อ */}
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#ccff00] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-xl font-bold text-white">User Profile</h1>
      </header>

      {/* Profile Card */}
      <main className="max-w-4xl mx-auto bg-[#16181c] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl relative">
        
        {/* Banner Background */}
        <div className="h-48 bg-gradient-to-r from-[#ccff00]/20 to-blue-600/20 relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="px-8 pb-8">
          {/* Avatar & Action Button */}
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full p-1 bg-[#16181c]">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                  alt="Admin" 
                  className="w-full h-full rounded-full bg-[#0b0c0f]"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-[#ccff00] rounded-full text-black hover:bg-[#b3e600] transition-colors shadow-lg">
                <Camera size={16} />
              </button>
            </div>
            <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-sm transition-colors flex items-center gap-2">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>

          {/* User Info Grid */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Admin User</h2>
            <p className="text-gray-500 mb-8">System Administrator • Sripatum University</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Personal Info */}
              <div className="bg-[#0b0c0f] p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Personal Information</h3>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-white">Admin User</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-white">admin@hydro.smart</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-white">Bangkok, Thailand</p>
                  </div>
                </div>
              </div>

              {/* Box 2: Account Details */}
              <div className="bg-[#0b0c0f] p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Account Details</h3>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="text-white">Super Admin</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Joined Date</p>
                    <p className="text-white">November 28, 2025</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;