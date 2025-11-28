import { useState, useEffect, useRef } from 'react'

export const useGeneratorLogic = ({ hostOverride } = {}) => {
  // --- 1. State Variables (ตัวแปรเก็บค่าหน้าเว็บ) ---
  const [units, setUnits] = useState([])
  const [totalPower, setTotalPower] = useState(0)
  const [activeUnits, setActiveUnits] = useState(0)
  const [alerts, setAlerts] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  
  // เก็บข้อมูลกราฟ (เริ่มต้นเป็นอาเรย์ว่าง เดี๋ยวรอ API มาเติม)
  const [chartData, setChartData] = useState([])

  // 🔴 พระเอกของเรา: ตัวฝากค่าล่าสุด (ใช้ส่งต่อให้กราฟวาดตัวเอง)
  const latestPowerRef = useRef(0) 

  // --- 2. Configuration (ตั้งค่า IP อัตโนมัติ) ---
  // ดึง IP จาก URL Browser โดยตรง (เปิดมือถือก็ได้ IP คอม, เปิด localhost ก็ได้ localhost)
  // รองรับทั้ง HTTP และ HTTPS
  // --- 2. Configuration ---
  const protocol = window.location.protocol;
  const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;

  // ❌ ของเก่า: ถ้าเป็น 5173 ให้ไป 1880
  // const NODE_RED_BASE = host.includes('5173') ? `${window.location.hostname}:1880` : host;

  // ✅ ของใหม่: บังคับไป 8080 ตลอด (ถ้ามั่นใจว่า Nginx รันอยู่ที่ 8080)
  const NODE_RED_BASE = host.includes('5173') 
    ? `${window.location.hostname}:8080` // บังคับเข้าทาง Nginx แม้จะ Dev อยู่
    : host;

  const WS_URL = `${wsProtocol}//${NODE_RED_BASE}/ws/generator`;
  const API_URL = `${protocol}//${NODE_RED_BASE}/api/units`;
  const API_HISTORY_URL = `${protocol}//${NODE_RED_BASE}/api/history`; 

  const wsRef = useRef(null)

  // --- 3. Main Logic (ทำงานเมื่อเปิดเว็บ) ---
  useEffect(() => {
    let mounted = true

    // ✅ ฟังก์ชัน 1: ดึงกราฟย้อนหลัง 20 จุดจาก Database
    const fetchHistoryData = async () => {
      try {
        const res = await fetch(API_HISTORY_URL)
        if (res.ok) {
          const historyData = await res.json()
          if (!mounted) return
          
          if (historyData.length > 0) {
             console.log("✅ Loaded History:", historyData.length, "points");
             
             // 1. ใส่กราฟย้อนหลังลงไป
             setChartData(historyData)
             
             // 2. เอาค่าล่าสุดจาก DB มาตั้งเป็นค่าเริ่มต้น (กราฟจะได้วาดต่อจากจุดนี้)
             const lastPoint = historyData[historyData.length - 1]
             latestPowerRef.current = lastPoint.power
             
             // 🔥 3. อัปเดตตัวเลขโชว์หน้าเว็บทันที!
             setTotalPower(lastPoint.power) 
          }
        }
      } catch (err) {
        console.error("❌ History Fetch Error:", err)
      }
    }

    // ✅ ฟังก์ชัน 2: ดึงสถานะเครื่องปัจจุบัน (Snapshot)
    const fetchCurrentStatus = async () => {
      try {
        const res = await fetch(API_URL)
        if (res.ok) {
          const data = await res.json()
          if (!mounted) return
          handleDataUpdate(data)
        }
      } catch (err) { /* silent error */ }
    }

    // เรียกใช้ทันทีที่เปิดเว็บ
    fetchHistoryData() 
    fetchCurrentStatus()

    // ✅ ฟังก์ชัน 3: เชื่อมต่อ WebSocket (Real-time)
    const connectWs = () => {
      if (!mounted) return
      try {
        console.log("Connecting WS to:", WS_URL);
        const ws = new WebSocket(WS_URL)
        wsRef.current = ws

        ws.onopen = () => setIsConnected(true)
        
        ws.onmessage = (ev) => {
          try {
            handleDataUpdate(JSON.parse(ev.data))
          } catch (e) { console.error(e) }
        }
        
        ws.onclose = () => {
          setIsConnected(false)
          // พยายามต่อใหม่ทุก 3 วินาที
          setTimeout(connectWs, 3000)
        }
      } catch (err) { setIsConnected(false) }
    }
    
    connectWs()

    // Cleanup เมื่อปิดหน้าเว็บ
    return () => {
      mounted = false
      if (wsRef.current) wsRef.current.close()
    }
  }, [API_URL, WS_URL])

  // --- Helper: ฟังก์ชันจัดการข้อมูลกลาง ---
  const handleDataUpdate = (rawData) => {
    let unitsData = []
    
    // แกะกล่องของขวัญ (รองรับทุกท่าที่ Node-RED ส่งมา)
    if (Array.isArray(rawData)) unitsData = rawData
    else if (rawData.units) unitsData = rawData.units
    else if (rawData.id) unitsData = [rawData]

    if (unitsData.length > 0) {
      setUnits([...unitsData])
      
      // คำนวณยอดรวมสดๆ ที่หน้าเว็บ (เพื่อให้แม่นยำ 100%)
      const currentTotal = unitsData.reduce((sum, u) => sum + Number(u.power || 0), 0)
      const currentActive = unitsData.filter((u) => Number(u.power || 0) > 0).length

      setTotalPower(currentTotal)
      setActiveUnits(currentActive)
      
      // อัปเดตค่าเข้า Ref (ฝากไว้ให้กราฟมาหยิบไปวาด)
      latestPowerRef.current = currentTotal 
      
      processAlerts(unitsData)
    }
  }

  // --- 4. ⏰ Heartbeat Graph (วาดกราฟตลอดเวลา ทุก 1 วินาที) ---
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = now.toLocaleTimeString('th-TH', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });

      setChartData((prevData) => {
        // ไปหยิบค่าล่าสุดมา (ถ้าไม่มีข้อมูลใหม่ ก็จะเป็นค่าเดิม = กราฟวิ่งเส้นตรง)
        const currentPower = latestPowerRef.current; 
        const newPoint = { time: timeLabel, power: currentPower };
        
        // เอาของเก่า + จุดใหม่
        const newData = [...prevData, newPoint];
        
        // ตัดให้เหลือ 20 จุดเสมอ (กราฟจะได้ไม่แน่นเกิน)
        return newData.slice(-20);
      });
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  // --- 5. Alert Logic ---
  const processAlerts = (unitsData) => {
    const newAlerts = []
    unitsData.forEach((unit) => {
      if (unit.tempStatus === 'CRITICAL') newAlerts.push({ unitId: unit.id, type: 'High Temp', value: `${(unit.temperature || 0).toFixed(1)}°C`, severity: 'critical' })
      if (unit.vibStatus === 'CRITICAL') newAlerts.push({ unitId: unit.id, type: 'High Vibration', value: `${(unit.vibration || 0).toFixed(1)} mm/s`, severity: 'critical' })
      if (unit.rpmStatus === 'WARNING') newAlerts.push({ unitId: unit.id, type: 'Low RPM', value: `${unit.rpm || 0} RPM`, severity: 'warning' })
    })
    setAlerts(newAlerts.slice(0, 10))
  }

  // ส่งค่าออกไปให้ UI ใช้
  return { units, totalPower, activeUnits, alerts, isConnected, chartData }
}