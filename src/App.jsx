import React, { useState, useEffect } from 'react';
import HydroDashboard from './HydroDashboard';
import Login from './Login';
// อย่าลืม import ไฟล์ Logic ถ้าจำเป็น (แต่ใน App.js ปกติใช้แค่จัดการหน้า)

const App = () => {
  // ----------------------------------------------------
  // *** 1. สูตรลับกันลืม (Persist Login State) ***
  // ----------------------------------------------------
  // ใช้ useState แบบ Lazy Initializer:
  // มันจะเช็ค localStorage ก่อนเลย "ตั้งแต่เริ่มรันบรรทัดแรก"
  // ทำให้หน้า Login ไม่เด้งแวบๆ ตอนกด Refresh
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isHydroLoggedIn');
    return savedAuth === 'true'; // ถ้ามีค่า 'true' ก็ให้เป็น true เลย
  });

  // ----------------------------------------------------
  // *** 2. ฟังก์ชัน Login (ส่งให้ลูกใช้) ***
  // ----------------------------------------------------
  const handleLogin = (username) => {
    // จังหวะนี้ User กรอกรหัสผ่าน (ใน component Login)
    // เราก็สั่งจดลงสมุดพก (localStorage) ว่า "เข้าแล้วนะ"
    localStorage.setItem('isHydroLoggedIn', 'true');
    localStorage.setItem('hydroUser', username); // เผื่ออยากจำชื่อด้วย
    setIsAuthenticated(true);
  };

  // ----------------------------------------------------
  // *** 3. ฟังก์ชัน Logout (ส่งให้ลูกใช้) ***
  // ----------------------------------------------------
  const handleLogout = () => {
    // ลบออกจากสมุดพก ถีบส่งไปหน้า Login
    localStorage.removeItem('isHydroLoggedIn');
    localStorage.removeItem('hydroUser');
    setIsAuthenticated(false);
  };

  // ----------------------------------------------------
  // *** 4. เลือกโชว์หน้าไหนดี? ***
  // ----------------------------------------------------
  return (
    <>
      {isAuthenticated ? (
        // ถ้าล็อกอินแล้ว -> โชว์ Dashboard
        // ส่งไม้ต่อ handleLogout ไปให้ปุ่มใน Dashboard กด
        <HydroDashboard onLogout={handleLogout} />
      ) : (
        // ถ้ายังไม่ล็อกอิน -> โชว์หน้า Login
        // ส่งไม้ต่อ handleLogin ไปให้ฟอร์ม Login เรียกใช้ตอนกด Submit
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;