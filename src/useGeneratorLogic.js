import { useState, useEffect, useRef } from 'react'

export const useGeneratorLogic = ({ hostOverride } = {}) => {
  // --- 1. State Variables ---
  const [units, setUnits] = useState([])
  const [totalPower, setTotalPower] = useState(0)
  const [activeUnits, setActiveUnits] = useState(0)
  const [alerts, setAlerts] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [chartData, setChartData] = useState([]) // ✅ เก็บข้อมูลกราฟเรียลไทม์

  // --- 2. Configuration ---
  const NODE_RED_HOST =
    hostOverride || import.meta.env.VITE_NODE_RED_HOST || 'localhost:1880'
  const WS_URL = `ws://${NODE_RED_HOST}/ws/generator`
  const API_URL = `http://${NODE_RED_HOST}/api/units`

  const wsRef = useRef(null)
  const backoffRef = useRef({ tries: 0, timeout: null })

  // --- 3. Main Logic ---
  useEffect(() => {
    let mounted = true

    // 3.1 Fetch ข้อมูลเริ่มต้น (ถ้ามี API)
    const fetchInitialData = async () => {
      try {
        const res = await fetch(API_URL)
        if (res.ok) {
          const data = await res.json()
          if (!mounted) return
          handleDataUpdate(data)
        }
      } catch (err) {
        // เงียบไว้ก่อน เดี๋ยวรอ WebSocket เอา
      }
    }

    fetchInitialData()

    // 3.2 WebSocket Connection
    const connectWs = () => {
      if (!mounted) return
      try {
        const ws = new WebSocket(WS_URL)
        wsRef.current = ws

        ws.onopen = () => {
          console.log('✅ WebSocket Connected')
          setIsConnected(true)
          backoffRef.current.tries = 0
        }

        ws.onmessage = (ev) => {
          try {
            const rawData = JSON.parse(ev.data)
            handleDataUpdate(rawData) // ส่งไปฟังก์ชันประมวลผลกลาง
          } catch (e) {
            console.error('❌ Parse Error:', e)
          }
        }

        ws.onerror = (err) => {
          console.error('❌ WS Error', err)
          setIsConnected(false)
        }

        ws.onclose = () => {
          console.log('⚠️ WebSocket Disconnected')
          setIsConnected(false)
          const tries = backoffRef.current.tries
          const delay = Math.min(30000, 1000 * 2 ** tries)
          backoffRef.current.tries = tries + 1
          backoffRef.current.timeout = setTimeout(connectWs, delay)
        }
      } catch (err) {
        setIsConnected(false)
      }
    }

    connectWs()

    return () => {
      mounted = false
      if (wsRef.current) wsRef.current.close()
      if (backoffRef.current.timeout) clearTimeout(backoffRef.current.timeout)
    }
  }, [API_URL, WS_URL])

  // --- 4. Central Data Handler (ตัวจัดการข้อมูลกลาง) ---
  const handleDataUpdate = (rawData) => {
    let unitsData = []
    let timestamp = Date.now()

    // 🕵️‍♂️ แกะกล่องของขวัญ (Support ทุกท่าที่ Node-RED ส่งมา)
    if (Array.isArray(rawData)) {
      unitsData = rawData
    } else if (rawData.units && Array.isArray(rawData.units)) {
      unitsData = rawData.units
      if (rawData.timestamp) timestamp = new Date(rawData.timestamp).getTime()
    } else if (typeof rawData === 'object' && rawData.id) {
      unitsData = [rawData]
      if (rawData.timestamp) timestamp = new Date(rawData.timestamp).getTime()
    }

    if (unitsData.length > 0) {
      // 1. อัปเดตข้อมูลเครื่อง
      setUnits([...unitsData])

      // 2. คำนวณค่ารวม
      const currentTotalPower = unitsData.reduce((sum, u) => sum + Number(u.power || 0), 0)
      const currentActive = unitsData.filter((u) => Number(u.power || 0) > 0).length

      setTotalPower(currentTotalPower)
      setActiveUnits(currentActive)

      // 3. ประมวลผลกราฟ (Real-time Chart Logic)
      const timeLabel = new Date(timestamp).toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      setChartData((prev) => {
        const newPoint = { time: timeLabel, power: currentTotalPower }
        // เก็บแค่ 20 จุดล่าสุด เพื่อไม่ให้กราฟอืด
        const newData = [...prev, newPoint]
        return newData.slice(-20) 
      })

      // 4. เช็ค Alert
      processAlerts(unitsData)
    }
  }

  // --- 5. Alert Logic ---
  const processAlerts = (unitsData) => {
    const newAlerts = []
    unitsData.forEach((unit) => {
      if (unit.tempStatus === 'CRITICAL') {
        newAlerts.push({
          unitId: unit.id,
          type: 'High Temp',
          value: `${(unit.temperature || 0).toFixed(1)}°C`,
          severity: 'critical',
        })
      }
      if (unit.vibStatus === 'CRITICAL') {
        newAlerts.push({
          unitId: unit.id,
          type: 'High Vibration',
          value: `${(unit.vibration || 0).toFixed(1)} mm/s`,
          severity: 'critical',
        })
      }
      if (unit.rpmStatus === 'WARNING') {
        newAlerts.push({
          unitId: unit.id,
          type: 'Low RPM',
          value: `${unit.rpm || 0} RPM`,
          severity: 'warning',
        })
      }
    })
    setAlerts(newAlerts.slice(0, 10))
  }

  return {
    units,
    totalPower,
    activeUnits,
    alerts,
    isConnected,
    chartData, // ส่งกราฟออกไป
  }
}