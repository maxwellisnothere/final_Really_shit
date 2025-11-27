import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Zap, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  Droplets, 
  Fan, 
  AlertTriangle,
  Search,
  ChevronDown,
  Power
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Import Logic ที่พี่ให้มา
import { useGeneratorLogic } from './useGeneratorLogic';

// --- Components ย่อยเพื่อความสะอาด ---

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer mb-2 ${
    active 
      ? 'bg-[#ccff00] text-black font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]' 
      : 'text-gray-400 hover:bg-white/5 hover:text-white'
  }`}>
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

const StatPill = ({ icon: Icon, label, value, unit }) => (
  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full text-xs text-gray-300 border border-white/10">
    <Icon size={14} className="text-[#ccff00]" />
    <span>{label}: <span className="text-white font-mono">{value}</span> {unit}</span>
  </div>
);

// --- Mock Data สำหรับกราฟ (เพราะ Logic ส่งมาแต่ค่าปัจจุบัน) ---
const chartData = [
  { time: '10:00', power: 4000 },
  { time: '11:00', power: 3000 },
  { time: '12:00', power: 2000 },
  { time: '13:00', power: 2780 },
  { time: '14:00', power: 1890 },
  { time: '15:00', power: 2390 },
  { time: '16:00', power: 3490 },
  { time: '17:00', power: totalPower => totalPower || 4200 }, // รอรับค่าจริง
];

const HydroDashboard = () => {
  // เรียกใช้ Logic Hook ของพี่ตรงนี้
  const { 
    units, 
    totalPower, 
    activeUnits, 
    alerts, 
    isConnected 
  } = useGeneratorLogic();

  // Mock การเลือก Tab
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="flex min-h-screen bg-[#0b0c0f] font-sans text-gray-200 overflow-hidden selection:bg-[#ccff00] selection:text-black">
      
      {/* 1. Sidebar (Left) */}
      <aside className="w-64 p-6 hidden md:flex flex-col border-r border-white/5">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-[#ccff00] rounded-xl flex items-center justify-center text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]">
            <Zap size={24} fill="black" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">HydroSmart</h1>
        </div>

        <nav className="flex-1">
          <p className="text-xs text-gray-500 font-semibold mb-4 px-4 uppercase tracking-wider">Main Menu</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={true} />
          <SidebarItem icon={Activity} label="Turbine Status" />
          <SidebarItem icon={Zap} label="Village Load" />
          <SidebarItem icon={Settings} label="Configuration" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <SidebarItem icon={LogOut} label="Log Out" />
        </div>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Overview</h2>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              Welcome back, Admin 
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#ccff00]' : 'bg-red-500'} animate-pulse`}></span>
              {isConnected ? 'System Online' : 'Connecting...'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search unit..." 
                className="bg-[#16181c] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#ccff00] transition-colors w-64"
              />
            </div>
            <button className="p-2 rounded-full bg-[#16181c] border border-white/5 hover:bg-white/10 relative">
              <Bell size={20} />
              {alerts.length > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#16181c]"></span>
              )}
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ccff00] to-green-600 p-[2px]">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="rounded-full bg-[#0b0c0f]" />
              </div>
              <span className="text-sm font-medium hidden md:block">Admin User <ChevronDown size={14} className="inline ml-1"/></span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* 2.1 Hero Section (Chart) - Span 8 columns */}
          <section className="lg:col-span-8 bg-[#16181c] rounded-[2rem] p-6 relative overflow-hidden border border-white/5 shadow-xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Power Output</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-bold text-white tracking-tight">
                    {totalPower.toLocaleString()} <span className="text-lg text-gray-500 font-normal">W</span>
                  </h3>
                  <span className="text-[#ccff00] text-sm font-medium bg-[#ccff00]/10 px-2 py-0.5 rounded-md">
                    +{activeUnits} Units Active
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {['1H', '1D', '1W', '1M'].map(time => (
                  <button key={time} className="px-3 py-1 rounded-lg text-xs font-medium hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Pills */}
            <div className="flex gap-3 mb-6 flex-wrap">
              <StatPill icon={Droplets} label="Flow" value="1,240" unit="L/s" />
              <StatPill icon={Fan} label="Avg RPM" value="1,500" unit="RPM" />
              <StatPill icon={Zap} label="Voltage" value="220" unit="V" />
            </div>

            {/* Chart Area */}
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ccff00" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ccff00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#16181c', borderColor: '#333', borderRadius: '12px' }}
                    itemStyle={{ color: '#ccff00' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="power" 
                    stroke="#ccff00" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPower)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 2.2 Control Panel - Span 4 columns */}
          <section className="lg:col-span-4 flex flex-col gap-6">
            {/* Control Card */}
            <div className="bg-[#16181c] rounded-[2rem] p-6 border border-white/5 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Turbine Control</h3>
                <div className="space-y-4">
                  <div className="bg-[#0b0c0f] p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Target Output Limit</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ccff00] w-[85%]"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-[#1a1d21] text-gray-300 py-3 rounded-xl text-sm font-medium border border-white/5 hover:border-[#ccff00] transition-colors">
                      Restart
                    </button>
                    <button className="bg-[#1a1d21] text-gray-300 py-3 rounded-xl text-sm font-medium border border-white/5 hover:border-[#ccff00] transition-colors">
                      Calibrate
                    </button>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-4 rounded-2xl mt-6 transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                <Power size={20} strokeWidth={3} />
                EMERGENCY STOP
              </button>
            </div>
          </section>

          {/* 2.3 Village/Unit Data List - Span 8 columns */}
          <section className="lg:col-span-8 bg-[#16181c] rounded-[2rem] p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Generator Units Status</h3>
              <button className="text-sm text-[#ccff00] font-medium hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                    <th className="pb-3 pl-2">Unit Name</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Output (W)</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {units.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">Waiting for data...</td>
                    </tr>
                  ) : (
                    units.map((unit) => (
                      <tr key={unit.id} className="group border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 pl-2 font-medium flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <Zap size={16} />
                          </div>
                          {unit.id}
                        </td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            unit.rpmStatus === 'CRITICAL' ? 'bg-red-500/10 text-red-500' :
                            unit.rpmStatus === 'WARNING' ? 'bg-yellow-500/10 text-yellow-500' :
                            'bg-green-500/10 text-green-500'
                          }`}>
                            {unit.rpmStatus || 'NORMAL'}
                          </span>
                        </td>
                        <td className="py-4 font-mono text-gray-300">
                          {unit.power?.toLocaleString()} W
                        </td>
                        <td className="py-4 text-right pr-2">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-[#ccff00] hover:text-black rounded-lg transition-colors text-gray-400">
                              <Settings size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2.4 Alerts & AI - Span 4 columns */}
          <section className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Notifications */}
            <div className="bg-[#16181c] rounded-[2rem] p-6 border border-white/5 flex-1">
              <h3 className="text-lg font-bold text-white mb-4">System Notifications</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {alerts.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 text-sm">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                       <Activity size={24} className="text-green-500"/>
                    </div>
                    System is healthy
                  </div>
                ) : (
                  alerts.map((alert, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-[#0b0c0f] border border-white/5">
                      <div className={`mt-1 min-w-[20px] ${alert.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'}`}>
                        <AlertTriangle size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-200">{alert.type}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{alert.unitId} • {alert.value}</p>
                      </div>
                      <span className="ml-auto text-[10px] text-gray-600">Now</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* AI Prediction (Static for now) */}
            <div className="bg-gradient-to-br from-[#16181c] to-[#1c2026] rounded-[2rem] p-6 border border-white/5 relative overflow-hidden">
               <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                 <span className="text-blue-400">✦</span> Maintenance AI
               </h3>
               <p className="text-sm text-gray-400 leading-relaxed mb-4">
                 Based on vibration analysis, Unit <span className="text-white font-mono">GEN-02</span> requires lubrication within 48 hours to maintain 98% efficiency.
               </p>
               <button className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors border border-white/10">
                 View Analysis
               </button>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
};

export default HydroDashboard;