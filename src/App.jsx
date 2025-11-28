import { useState } from 'react';
import HydroDashboard from './HydroDashboard';
import Login from './Login'; // นำเข้าไฟล์ Login ที่สร้างใหม่

function App() {
  // สร้าง state เพื่อเก็บสถานะการเข้าสู่ระบบและชื่อผู้ใช้
  const [user, setUser] = useState(null); 

  // ฟังก์ชันเมื่อ Login สำเร็จ
  const handleLogin = (username) => {
    setUser(username);
  };

  // ฟังก์ชันเมื่อ Logout
  const handleLogout = () => {
    setUser(null);
  };

  // ถ้ายังไม่มี user ให้แสดงหน้า Login
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // ถ้ามี user แล้ว ให้แสดงหน้า Dashboard
  // ส่ง onLogout prop ไปให้ HydroDashboard ใช้
  return (
    <div className="w-full min-h-screen bg-[#0b0c0f]">
      <HydroDashboard onLogout={handleLogout} username={user} />
    </div>
  );
}

export default App;