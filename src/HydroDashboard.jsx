import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Activity, Zap, Bell, LogOut, 
  AlertTriangle, Search, ChevronDown, User, Map as MapIcon, 
  Wrench, Inbox, TrendingUp, Clock, Plus, ChevronLeft, 
  ChevronRight, Send, Phone, Video, ArrowLeft, Trash2, Check, 
  X, Droplets, Thermometer
} from 'lucide-react';
import { 
  AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid, XAxis 
} from 'recharts';

// Import Logic Hook (สมองของเรา)
import { useGeneratorLogic } from './useGeneratorLogic';

// --- Components ย่อย ---
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer mb-2 text-left ${
      active 
        ? 'bg-[#FFD600] text-black font-bold shadow-[0_0_15px_rgba(255,214,0,0.3)] scale-105' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

// --- Config & Mock Data ---

// 📍 พิกัดแผนที่
const VILLAGE_COORDINATES = {
  'unit01': { top: '15%', left: '10%' },
  'unit02': { top: '22%', left: '25%' },
  'unit03': { top: '40%', left: '35%' },
  'unit04': { top: '48%', left: '55%' },
  'unit05': { top: '55%', left: '42%' },
  'unit06': { top: '65%', left: '60%' },
  'unit07': { top: '45%', left: '75%' },
  'unit08': { top: '70%', left: '72%' },
  'unit09': { top: '35%', left: '80%' },
  'unit10': { top: '25%', left: '88%' },
};

const formatDateKey = (date) => date.toISOString().split('T')[0];

const generateInitialTasks = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return {
    [`${year}-${month}-03`]: [{ id: 'T-901', issue: 'Check Oil Level', location: 'Zone A (Unit 1)', status: 'Pending' }],
    [`${year}-${month}-18`]: [
        { id: 'T-902', issue: 'Water Sensor Calibration', location: 'Zone B (Unit 2)', status: 'Fixed' },
        { id: 'T-2477', issue: 'Turbine Noise Level High', location: 'Zone A', status: 'Pending' }
    ],
    [`${year}-${month}-27`]: [{ id: 'T-305', issue: 'Vibration Analysis', location: 'Zone C', status: 'Pending' }],
    [formatDateKey(today)]: [{ id: 'T-888', issue: 'System Checkup', location: 'All Zones', status: 'Pending' }] 
  };
};

const contacts = [
  { id: 1, name: 'Engineering Team', role: 'Group', msg: 'System update completed.', time: '10:30 AM', unread: 2, online: true, avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ET' },
  { id: 2, name: 'Sarah Connor', role: 'Field Technician', msg: 'Checking unit 05 vibration.', time: '09:15 AM', unread: 0, online: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 3, name: 'John Doe', role: 'Maintenance Lead', msg: 'Can you approve the budget?', time: 'Yesterday', unread: 0, online: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: 4, name: 'System Alerts', role: 'Bot', msg: 'Unit 02 Critical Error resolved.', time: 'Yesterday', unread: 5, online: true, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=System' },
];

const chatHistory = [
  { id: 1, sender: 'them', text: 'Hello, did you notice the pressure drop in Unit 03?', time: '10:00 AM' },
  { id: 2, sender: 'me', text: 'Yes, I am looking at the logs right now.', time: '10:02 AM' },
  { id: 3, sender: 'me', text: 'It seems like a sensor calibration issue.', time: '10:02 AM' },
  { id: 4, sender: 'them', text: 'Great. Shall I send a team to recalibrate?', time: '10:05 AM' },
  { id: 5, sender: 'me', text: 'Proceed. Keep me posted.', time: '10:06 AM' },
  { id: 6, sender: 'them', text: 'Copy that. Team is deploying.', time: '10:10 AM' },
];

// --- MAIN COMPONENT ---
const HydroDashboard = ({ onLogout = () => {}, onNavigateProfile = () => {} }) => {
  // 1. ดึงข้อมูล Real-time จาก Logic
  const { 
    units, 
    totalPower, 
    activeUnits, 
    alerts, 
    isConnected,
    chartData 
  } = useGeneratorLogic();

  // 2. State UI
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [timeRange, setTimeRange] = useState('1H');
  
  // Chat State
  const [selectedChat, setSelectedChat] = useState(contacts[0]);
  const [messageInput, setMessageInput] = useState('');

  // Maintenance State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasks, setTasks] = useState(generateInitialTasks());
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTicketIssue, setNewTicketIssue] = useState('');
  const [newTicketLocation, setNewTicketLocation] = useState('');

  // Map State
  const [selectedVillage, setSelectedVillage] = useState(null);

  // 3. Logic ผสานข้อมูล
  // ถ้า chartData มาจาก Hook แล้ว (มีเส้น 0 หรือข้อมูลจริง) ก็ใช้เลย
  const displayChartData = chartData || [];

  const mapDisplayUnits = useMemo(() => {
    return units.map(unit => {
      const coords = VILLAGE_COORDINATES[unit.id] || { top: '50%', left: '50%' };
      return { ...unit, ...coords };
    }).filter(u => VILLAGE_COORDINATES[u.id]);
  }, [units]);

  const stats = useMemo(() => {
    const values = displayChartData.map(d => d.power);
    const max = Math.max(...values, 0);
    const avg = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
    return { max, avg };
  }, [displayChartData]);

  // --- Helpers for Calendar ---
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const handleDateClick = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    setSelectedDateKey(`${year}-${month}-${dayStr}`);
  };

  const handleAddTask = () => {
    if (!newTicketIssue.trim() || !selectedDateKey) return;
    const newTask = { 
      id: `T-${Math.floor(Math.random() * 9000) + 1000}`, 
      issue: newTicketIssue, 
      location: newTicketLocation || 'General',
      status: 'Pending' 
    };
    setTasks(prev => ({
      ...prev,
      [selectedDateKey]: [...(prev[selectedDateKey] || []), newTask]
    }));
    setNewTicketIssue('');
    setNewTicketLocation('');
    setShowAddModal(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      [selectedDateKey]: prev[selectedDateKey].filter(t => t.id !== taskId)
    }));
  };

  const handleToggleStatus = (taskId) => {
    setTasks(prev => {
        const updatedDayTasks = prev[selectedDateKey].map(t => {
            if(t.id === taskId) {
                return { ...t, status: t.status === 'Fixed' ? 'Pending' : 'Fixed' };
            }
            return t;
        });
        return { ...prev, [selectedDateKey]: updatedDayTasks };
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-transparent border-t border-r border-white/5 opacity-30"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      const year = currentMonth.getFullYear();
      const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const key = `${year}-${month}-${dayStr}`;
      const dayTasks = tasks[key] || [];

      days.push(
        <div 
          key={day} 
          onClick={() => handleDateClick(day)}
          className={`h-24 bg-[#0b0c0f] rounded-xl p-3 flex flex-col justify-between border transition-all cursor-pointer group relative
            ${isToday ? 'border-[#FFD600] shadow-[0_0_15px_rgba(255,214,0,0.15)] bg-[#1a1d21]' : 'border-white/5 hover:border-white/20 hover:bg-[#1a1d21]'}
          `}
        >
          <span className={`text-sm font-medium ${isToday ? 'text-[#FFD600]' : 'text-gray-400 group-hover:text-white'}`}>
            {day}
          </span>
          <div className="flex gap-1 flex-wrap content-end">
            {dayTasks.map((task, idx) => (
              <div key={idx} className={`w-2 h-2 rounded-full ${task.status === 'Pending' ? 'bg-orange-500' : 'bg-green-500'}`} title={task.issue}></div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="flex min-h-screen bg-[#0b0c0f] font-sans text-gray-200 overflow-hidden selection:bg-[#FFD600] selection:text-black">
      
      {/* 1. Sidebar */}
      <aside className="w-64 p-6 hidden md:flex flex-col border-r border-white/5">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-[#FFD600] rounded-xl flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,214,0,0.4)]">
            <Zap size={24} fill="black" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            Hydro <span className="text-[#FFD600]">Smart</span>
          </h1>
        </div>
        <nav className="flex-1">
          <p className="text-xs text-gray-500 font-semibold mb-4 px-4 uppercase tracking-wider">Main Menu</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          <SidebarItem icon={MapIcon} label="Map / Units" active={activeTab === 'Map'} onClick={() => setActiveTab('Map')} />
          <SidebarItem icon={Wrench} label="Maintenance" active={activeTab === 'Maintenance'} onClick={() => setActiveTab('Maintenance')} />
          <SidebarItem icon={Inbox} label="Inbox" active={activeTab === 'Inbox'} onClick={() => setActiveTab('Inbox')} />
        </nav>
        <div className="mt-auto pt-6 border-t border-white/5">
          <SidebarItem icon={LogOut} label="Log Out" onClick={onLogout} />
        </div>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-8 relative z-50">
          <div>
            <h2 className="text-2xl font-bold text-white">{activeTab}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              System Overview 
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#FFD600]' : 'bg-red-500'} animate-pulse`}></span>
              {isConnected ? 'Online' : 'Reconnecting...'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input type="text" placeholder="Search..." className="bg-[#16181c] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#FFD600] transition-colors w-64" />
            </div>
            
            <button className="p-2 rounded-full bg-[#16181c] border border-white/5 hover:bg-white/10 relative">
              <Bell size={20} />
              {alerts.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#16181c]"></span>}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-3 pl-4 border-l border-white/10 focus:outline-none group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFD600] to-orange-500 p-[2px] transition-transform group-hover:scale-105">
                  <div className="w-full h-full rounded-full bg-[#0b0c0f] flex items-center justify-center font-bold text-[#FFD600]">AD</div>
                </div>
                <span className="text-sm font-medium hidden md:block text-gray-200 group-hover:text-white transition-colors">Admin <ChevronDown size={14} className={`inline ml-1 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}/></span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-14 w-60 bg-[#16181c] border border-white/10 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-3 border-b border-white/5 mb-2">
                    <p className="text-sm font-bold text-white">Admin User</p>
                    <p className="text-xs text-gray-500">admin@hydro.smart</p>
                  </div>
                  <button onClick={() => { setIsUserMenuOpen(false); onNavigateProfile(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors text-sm text-left mb-1">
                    <User size={16} className="text-[#FFD600]" /> My Profile
                  </button>
                  <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-gray-300 hover:text-red-500 transition-colors text-sm text-left">
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-0 animate-in fade-in duration-500">
            {/* Chart Section */}
            <section className="lg:col-span-8 bg-[#16181c] rounded-[2rem] p-8 relative overflow-hidden border border-white/5 shadow-2xl flex flex-col justify-between min-h-[450px]">
              <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#FFD600]/5 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#FFD600]/10 rounded-lg"><Activity size={20} className="text-[#FFD600]" /></div>
                  <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Real-time Generation</span>
                </div>
                <div className="bg-[#0b0c0f] p-1 rounded-xl border border-white/5 flex gap-1">
                  {['1H', '1D', '1W'].map((t) => (
                    <button key={t} onClick={() => setTimeRange(t)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === t ? 'bg-[#FFD600] text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{t}</button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-end mb-6 relative z-10">
                <div>
                   <div className="flex items-baseline gap-3 relative">
                      <h1 className="text-7xl font-bold text-white tracking-tighter drop-shadow-[0_0_25px_rgba(255,214,0,0.15)]">{totalPower.toLocaleString()}</h1>
                      <span className="text-2xl text-gray-500 font-medium mb-2">W</span>
                   </div>
                   <div className="flex items-center gap-4 mt-2">
                     <div className="flex items-center gap-2 bg-[#FFD600]/5 border border-[#FFD600]/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                       <span className={`relative inline-flex rounded-full h-2 w-2 ${activeUnits > 0 ? 'bg-[#FFD600]' : 'bg-red-500'}`}></span>
                       <span className="text-[#FFD600] text-xs font-bold">{activeUnits} Units Active</span>
                     </div>
                     <div className="flex gap-4 text-xs text-gray-500 font-mono border-l border-white/10 pl-4">
                       <div className="flex items-center gap-1"><TrendingUp size={12} className="text-blue-400"/><span>Peak: <span className="text-gray-300">{stats.max.toLocaleString()}</span></span></div>
                       <div className="flex items-center gap-1"><Clock size={12} className="text-purple-400"/><span>Avg: <span className="text-gray-300">{stats.avg.toLocaleString()}</span></span></div>
                     </div>
                   </div>
                </div>
              </div>

              {/* ✅ แก้ตรงนี้: ใช้ w-full h-[300px] เพื่อล็อคขนาดกราฟ ไม่ให้ Recharts เอ๋อ */}
              <div className="w-full h-[300px] min-h-[300px] relative z-10">
                 <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={displayChartData}>
                    <defs>
                      <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD600" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FFD600" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="time" hide={true} />
                    <Tooltip contentStyle={{ backgroundColor: '#0b0c0f', borderColor: '#333', borderRadius: '12px' }} itemStyle={{ color: '#FFD600', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="power" stroke="#FFD600" strokeWidth={3} fillOpacity={1} fill="url(#colorPower)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Notifications */}
            <section className="lg:col-span-4 bg-[#16181c] rounded-[2rem] p-6 border border-white/5 h-full flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[500px]">
                {alerts.length === 0 ? (
                  <div className="text-center py-20 text-gray-500 text-sm">System is healthy</div>
                ) : (
                  alerts.map((alert, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-[#0b0c0f] border border-white/5">
                      <div className={`mt-1 min-w-[20px] ${alert.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'}`}><AlertTriangle size={18} /></div>
                      <div>
                        <p className="text-sm font-medium text-gray-200">{alert.type}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{alert.unitId} • {alert.value}</p>
                      </div>
                      <span className="ml-auto text-[10px] text-gray-600">Now</span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {/* --- MAP TAB --- */}
        {activeTab === 'Map' && (
          <div className="h-[calc(100vh-140px)] relative">
            {!selectedVillage && (
              <div className="w-full h-full bg-[#16181c] rounded-[2rem] border border-white/5 overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="absolute inset-0 bg-[#0b0c0f]">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1d21_0%,_#0b0c0f_100%)]"></div>
                   <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay grayscale" />
                </div>

                {mapDisplayUnits.map((village) => {
                  const isWarning = village.rpmStatus === 'WARNING' || village.rpmStatus === 'CRITICAL';
                  return (
                    <div key={village.id} className="absolute group cursor-pointer" style={{ top: village.top, left: village.left }} onClick={() => setSelectedVillage(village)}>
                      <div className="relative flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-2">
                        <span className={`absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping ${isWarning ? 'bg-red-500' : 'bg-[#FFD600]'}`}></span>
                        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all group-hover:scale-110 ${isWarning ? 'bg-red-500 border-red-300 text-white' : 'bg-[#16181c] border-[#FFD600] text-[#FFD600] group-hover:bg-[#FFD600] group-hover:text-black'}`}>
                          <Zap size={20} fill={isWarning ? "white" : "currentColor"} />
                        </div>
                        <div className="mt-3 px-4 py-1.5 bg-[#16181c] border border-white/10 rounded-full text-xs font-bold text-white shadow-xl whitespace-nowrap flex items-center gap-2 group-hover:border-[#FFD600]">
                          {/* ชื่อจาก DB */}
                          {village.name || village.id} 
                          <ChevronRight size={12} className="text-gray-500 group-hover:text-[#FFD600]"/>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {selectedVillage && (
              <div className="w-full h-full flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={() => setSelectedVillage(null)} className="p-3 bg-[#16181c] border border-white/10 rounded-xl hover:bg-white/5 hover:border-[#FFD600] transition-all group">
                    <ArrowLeft size={20} className="text-gray-400 group-hover:text-white" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      {selectedVillage.name || selectedVillage.id}
                      <span className="px-2 py-1 bg-[#FFD600]/10 text-[#FFD600] text-xs rounded border border-[#FFD600]/20 font-mono">{selectedVillage.id}</span>
                    </h2>
                    <p className="text-gray-500 text-sm">Real-time unit performance details</p>
                  </div>
                  <div className="ml-auto flex gap-3">
                      <button className="px-4 py-2 bg-[#16181c] border border-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/5">View History</button>
                      <button className="px-4 py-2 bg-[#FFD600] text-black text-sm font-bold rounded-xl hover:bg-[#e6c200] shadow-[0_0_15px_rgba(255,214,0,0.2)]">Control Unit</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                   <div className="bg-[#16181c] p-6 rounded-[1.5rem] border border-white/5 relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-[#FFD600]/10 rounded-xl text-[#FFD600]"><Zap size={24} /></div>
                      </div>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Power Output</p>
                      <p className="text-3xl font-bold text-white mt-1">{Number(selectedVillage.power || 0).toLocaleString()} <span className="text-lg text-gray-500">W</span></p>
                   </div>
                   <div className="bg-[#16181c] p-6 rounded-[1.5rem] border border-white/5 relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Activity size={24} /></div>
                      </div>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">RPM</p>
                      <p className="text-3xl font-bold text-white mt-1">{Number(selectedVillage.rpm || 0).toLocaleString()}</p>
                   </div>
                   <div className="bg-[#16181c] p-6 rounded-[1.5rem] border border-white/5 relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500"><Thermometer size={24} /></div>
                      </div>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Temperature</p>
                      <p className="text-3xl font-bold text-white mt-1">{Number(selectedVillage.temperature || 0).toFixed(1)} <span className="text-lg text-gray-500">°C</span></p>
                   </div>
                   <div className="bg-[#16181c] p-6 rounded-[1.5rem] border border-white/5 relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500"><Droplets size={24} /></div>
                      </div>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Vibration</p>
                      <p className="text-3xl font-bold text-white mt-1">{Number(selectedVillage.vibration || 0).toFixed(2)}</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- MAINTENANCE TAB --- */}
        {activeTab === 'Maintenance' && (
          <div className="animate-in fade-in zoom-in duration-300 space-y-6">
            <div className="bg-[#16181c] p-6 rounded-[1.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500"><Wrench size={24} /></div>
                  <div><h2 className="text-xl font-bold text-white">Maintenance Center</h2><p className="text-sm text-gray-500">Manage repair schedules and tickets</p></div>
               </div>
               <button onClick={() => { setSelectedDateKey(formatDateKey(new Date())); setShowAddModal(true); }} className="flex items-center gap-2 px-5 py-3 bg-[#FFD600] hover:bg-[#e6c200] text-black rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(255,214,0,0.3)] transition-transform active:scale-95"><Plus size={18} /> NEW TICKET</button>
            </div>

            {selectedDateKey === null ? (
              <div className="bg-[#16181c] p-6 rounded-[2rem] border border-white/5">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-2xl font-bold text-white">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                   <div className="flex gap-2">
                     <button onClick={handlePrevMonth} className="p-2 bg-[#0b0c0f] rounded-lg border border-white/10 hover:border-white/30 text-gray-400 hover:text-white"><ChevronLeft size={20}/></button>
                     <button onClick={handleNextMonth} className="p-2 bg-[#0b0c0f] rounded-lg border border-white/10 hover:border-white/30 text-gray-400 hover:text-white"><ChevronRight size={20}/></button>
                   </div>
                </div>
                <div className="grid grid-cols-7 mb-4 text-center">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-2">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {renderCalendarDays()}
                </div>
              </div>
            ) : (
              <div className="bg-[#16181c] p-6 rounded-[2rem] border border-white/5 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                   <div className="flex items-center gap-4">
                       <button onClick={() => setSelectedDateKey(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white"><ArrowLeft size={20} /></button>
                       <div>
                          <h3 className="text-2xl font-bold text-white">{new Date(selectedDateKey).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                          <p className="text-gray-500 text-sm">Showing {tasks[selectedDateKey]?.length || 0} tasks</p>
                       </div>
                   </div>
                   <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#FFD600]/10 hover:bg-[#FFD600]/20 text-[#FFD600] border border-[#FFD600]/30 rounded-lg text-xs font-bold transition-colors"><Plus size={14} /> Add Task</button>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                       <thead>
                           <tr className="bg-[#0b0c0f] text-gray-500 text-xs uppercase tracking-wider">
                               <th className="p-4 rounded-tl-xl rounded-bl-xl">ID</th>
                               <th className="p-4">Issue</th>
                               <th className="p-4">Location</th>
                               <th className="p-4">Status</th>
                               <th className="p-4 rounded-tr-xl rounded-br-xl text-right">Action</th>
                           </tr>
                       </thead>
                       <tbody className="text-sm">
                           {!tasks[selectedDateKey] || tasks[selectedDateKey].length === 0 ? (
                               <tr><td colSpan="5" className="py-12 text-center text-gray-500">No tasks for this day.</td></tr>
                           ) : (
                               tasks[selectedDateKey].map(task => (
                                   <tr key={task.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                       <td className="p-4 font-bold text-[#FFD600]">{task.id}</td>
                                       <td className="p-4 text-white font-medium">{task.issue}</td>
                                       <td className="p-4 text-gray-400">{task.location}</td>
                                       <td className="p-4">
                                           {task.status === 'Fixed' ? <span className="text-green-400 font-bold">Fixed</span> : <span className="text-gray-400 font-bold">Pending</span>}
                                       </td>
                                       <td className="p-4 text-right">
                                           <div className="flex justify-end gap-2">
                                               <button onClick={() => handleToggleStatus(task.id)} className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20"><Check size={16} /></button>
                                               <button onClick={() => handleDeleteTask(task.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"><Trash2 size={16} /></button>
                                           </div>
                                       </td>
                                   </tr>
                               ))
                           )}
                       </tbody>
                   </table>
                </div>
              </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#16181c] border border-white/10 w-full max-w-md rounded-2xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">New Maintenance Ticket</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                        </div>
                        <div className="space-y-4">
                            <div><label className="text-xs text-gray-500 mb-1 block">Issue</label><input type="text" value={newTicketIssue} onChange={(e) => setNewTicketIssue(e.target.value)} className="w-full bg-[#0b0c0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#FFD600] outline-none" /></div>
                            <div><label className="text-xs text-gray-500 mb-1 block">Location</label><input type="text" value={newTicketLocation} onChange={(e) => setNewTicketLocation(e.target.value)} className="w-full bg-[#0b0c0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#FFD600] outline-none" /></div>
                            <div className="pt-2"><button onClick={handleAddTask} className="w-full bg-[#FFD600] text-black font-bold py-3.5 rounded-xl hover:bg-[#e6c200]">Create Ticket</button></div>
                        </div>
                    </div>
                </div>
            )}
          </div>
        )}

        {/* --- INBOX TAB --- */}
        {activeTab === 'Inbox' && (
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-[#16181c] rounded-[2rem] border border-white/5 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <h3 className="text-lg font-bold text-white mb-4 px-2">Messages</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="text" placeholder="Search chats..." className="w-full bg-[#0b0c0f] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD600] transition-colors" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {contacts.map(contact => (
                  <div key={contact.id} onClick={() => setSelectedChat(contact)} className={`p-3 rounded-xl flex gap-3 cursor-pointer transition-all mb-1 ${selectedChat.id === contact.id ? 'bg-[#FFD600] text-black shadow-lg' : 'hover:bg-white/5 text-gray-300'}`}>
                    <div className="relative"><img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full bg-gray-800" />{contact.online && <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${selectedChat.id === contact.id ? 'border-[#FFD600] bg-black' : 'border-[#16181c] bg-[#FFD600]'}`}></div>}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5"><p className="font-bold text-sm truncate">{contact.name}</p><span className={`text-[10px] ${selectedChat.id === contact.id ? 'text-black/60' : 'text-gray-500'}`}>{contact.time}</span></div>
                      <p className={`text-xs truncate ${selectedChat.id === contact.id ? 'text-black/80' : 'text-gray-500'}`}>{contact.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-9 bg-[#16181c] rounded-[2rem] border border-white/5 flex flex-col overflow-hidden relative">
               <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#16181c] z-10">
                 <div className="flex items-center gap-3">
                   <div className="relative"><img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full bg-gray-800" />{selectedChat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#FFD600] rounded-full border-2 border-[#16181c]"></div>}</div>
                   <div><h3 className="font-bold text-white text-sm">{selectedChat.name}</h3><p className="text-xs text-gray-500">{selectedChat.role}</p></div>
                 </div>
                 <div className="flex gap-2"><button className="p-2 hover:bg-white/5 rounded-full text-gray-400"><Phone size={18} /></button><button className="p-2 hover:bg-white/5 rounded-full text-gray-400"><Video size={18} /></button></div>
               </div>
               <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                 {chatHistory.map(chat => (
                   <div key={chat.id} className={`flex ${chat.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${chat.sender === 'me' ? 'bg-[#FFD600] text-black rounded-tr-none' : 'bg-[#2a2d35] text-white rounded-tl-none border border-white/5'}`}>
                       <p className="text-sm leading-relaxed">{chat.text}</p>
                       <p className={`text-[10px] mt-1 text-right ${chat.sender === 'me' ? 'text-black/60' : 'text-gray-500'}`}>{chat.time}</p>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="p-4 bg-[#16181c] border-t border-white/5">
                 <div className="flex items-center gap-2 bg-[#0b0c0f] border border-white/10 rounded-full px-2 py-2">
                   <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white placeholder-gray-500 px-2" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                   <button className="p-2 bg-[#FFD600] text-black rounded-full hover:bg-[#e6c200]"><Send size={18}/></button>
                 </div>
               </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default HydroDashboard;