[
    {
        "id": "32f1783721971a78",
        "type": "tab",
        "label": "Flow-all-sparate",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "8821ee06eba89b63",
        "type": "tab",
        "label": "Master-Flow-Full-Sensors",
        "disabled": false,
        "info": "รับค่าทุก Sensor + คำนวณ Power + รวมยอด Total"
    },
    {
        "id": "d024a9f604070b03",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "e0e3c15d74266858",
        "type": "subflow",
        "name": "SQL API Template",
        "info": "API Template สำหรับดึงข้อมูลจากตาราง MySQL",
        "category": "",
        "in": [
            {
                "x": 100,
                "y": 80,
                "wires": [
                    {
                        "id": "c7117565c6977759"
                    }
                ]
            }
        ],
        "out": [
            {
                "x": 620,
                "y": 80,
                "wires": [
                    {
                        "id": "23a137754f9a560f"
                    }
                ]
            }
        ],
        "env": [
            {
                "name": "DB_TABLE",
                "type": "str",
                "value": "unit_rpm",
                "ui": {
                    "label": "Database Table Name",
                    "type": "input",
                    "opts": {
                        "types": [
                            "str"
                        ]
                    }
                }
            },
            {
                "name": "DB_COLUMN",
                "type": "str",
                "value": "rpm",
                "ui": {
                    "label": "Database Column Name",
                    "type": "input",
                    "opts": {
                        "types": [
                            "str"
                        ]
                    }
                }
            }
        ],
        "color": "#DDAA99"
    },
    {
        "id": "65303e9d85b332d9",
        "type": "mqtt-broker",
        "name": "",
        "broker": "172.20.10.3",
        "port": 1883,
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": 4,
        "keepalive": 60,
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "4fa89a030be0165d",
        "type": "mqtt-broker",
        "name": "",
        "broker": "192.168.1.247",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": 4,
        "keepalive": 60,
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "aa12b35ebe3d1cef",
        "type": "mqtt-broker",
        "name": "",
        "broker": "host.docker.internal",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": 4,
        "keepalive": 60,
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "19cb3b33f450401c",
        "type": "mqtt-broker",
        "name": "",
        "broker": "192.168.142.178",
        "port": 1883,
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": 4,
        "keepalive": 60,
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "fec06e0969e6c3cc",
        "type": "influxdb",
        "hostname": "127.0.0.1",
        "port": 8086,
        "protocol": "http",
        "database": "database",
        "name": "",
        "usetls": false,
        "tls": "",
        "influxdbVersion": "1.8-flux",
        "url": "http://localhost:8086",
        "timeout": 10,
        "rejectUnauthorized": true
    },
    {
        "id": "c96aa414a181a660",
        "type": "influxdb",
        "hostname": "127.0.0.1",
        "port": 8086,
        "protocol": "http",
        "database": "database",
        "name": "",
        "usetls": false,
        "tls": "",
        "influxdbVersion": "1.8-flux",
        "url": "http://localhost:8086",
        "timeout": 10,
        "rejectUnauthorized": true
    },
    {
        "id": "a201d65e8deed7a9",
        "type": "influxdb",
        "hostname": "cpe406-influxdb_v1",
        "port": 8086,
        "protocol": "http",
        "database": "data_sensor",
        "name": "my_database",
        "usetls": false,
        "tls": "",
        "influxdbVersion": "1.x",
        "url": "http://cpe406-influxdb:8086",
        "timeout": 10,
        "rejectUnauthorized": true
    },
    {
        "id": "c8c993ccc217920f",
        "type": "MySQLdatabase",
        "name": "",
        "host": "localhost",
        "port": "3306",
        "db": "bladeless-turbine",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "894f1b3b3eb5926e",
        "type": "MySQLdatabase",
        "name": "gnt_monitoring DB",
        "host": "host.docker.internal",
        "port": "3306",
        "db": "gnt_monitoring",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "mqtt_local",
        "type": "mqtt-broker",
        "name": "Local MQTT",
        "broker": "localhost",
        "port": "1883",
        "clientid": "",
        "autoConnect": true
    },
    {
        "id": "39a0f016b4a9755c",
        "type": "websocket-listener",
        "path": "/ws/generator",
        "wholemsg": "false"
    },
    {
        "id": "c7117565c6977759",
        "type": "change",
        "z": "e0e3c15d74266858",
        "name": "Set SQL Query",
        "rules": [
            {
                "t": "set",
                "p": "topic",
                "pt": "msg",
                "to": "SELECT $env('DB_COLUMN') AS value, timestamp FROM $env('DB_TABLE') ORDER BY timestamp DESC LIMIT 20",
                "tot": "jsonata"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 280,
        "y": 80,
        "wires": [
            [
                "e5e8c148e6c75c87"
            ]
        ]
    },
    {
        "id": "23a137754f9a560f",
        "type": "change",
        "z": "e0e3c15d74266858",
        "name": "Set Payload",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 560,
        "y": 80,
        "wires": [
            []
        ]
    },
    {
        "id": "e5e8c148e6c75c87",
        "type": "mysql",
        "z": "e0e3c15d74266858",
        "mydb": "d6e83c21a1200000",
        "name": "Query DB",
        "x": 450,
        "y": 80,
        "wires": [
            [
                "23a137754f9a560f"
            ]
        ]
    },
    {
        "id": "809dfe240807d0be",
        "type": "http response",
        "z": "32f1783721971a78",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 1100,
        "y": 420,
        "wires": []
    },
    {
        "id": "023b74a2945ab0c7",
        "type": "http in",
        "z": "32f1783721971a78",
        "name": "GET /api/villages/status",
        "url": "/api/villages/status",
        "method": "get",
        "upload": false,
        "skipBodyParsing": false,
        "swaggerDoc": "",
        "x": 180,
        "y": 420,
        "wires": [
            [
                "be03fab9e2468b3f"
            ]
        ]
    },
    {
        "id": "be03fab9e2468b3f",
        "type": "function",
        "z": "32f1783721971a78",
        "name": "Set SQL for Villages",
        "func": "// Function Node: Set SQL for Villages\n\n// SQL Query: ดึง ID, ชื่อ, พิกัด X, พิกัด Y และ Max Capacity \n// (เราจะส่ง max_capacity_w ไปด้วย เผื่อใช้ในอนาคต)\nmsg.topic = \"SELECT unit_id, name, map_x, map_y, max_capacity_w FROM villages\";\n\nmsg.payload = []; \n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 420,
        "y": 420,
        "wires": [
            [
                "26cabbf5026d06d3"
            ]
        ]
    },
    {
        "id": "f6bd5b22dfa86516",
        "type": "change",
        "z": "32f1783721971a78",
        "name": "Add CORS Header",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Access-Control-Allow-Origin\":\"*\",\"Access-Control-Allow-Methods\":\"GET, OPTIONS\",\"Access-Control-Allow-Headers\":\"Content-Type, Authorization, X-Requested-With\",\"Content-Type\":\"application/json\"}",
                "tot": "json"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 890,
        "y": 420,
        "wires": [
            [
                "809dfe240807d0be"
            ]
        ]
    },
    {
        "id": "26cabbf5026d06d3",
        "type": "mysql",
        "z": "32f1783721971a78",
        "mydb": "894f1b3b3eb5926e",
        "name": "SELECT Villages",
        "x": 650,
        "y": 420,
        "wires": [
            [
                "f6bd5b22dfa86516",
                "70b3bdad182ea358"
            ]
        ]
    },
    {
        "id": "70b3bdad182ea358",
        "type": "debug",
        "z": "32f1783721971a78",
        "name": "debug 2",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 460,
        "wires": []
    },
    {
        "id": "4e745d76c51760fd",
        "type": "mqtt in",
        "z": "8821ee06eba89b63",
        "name": "📡 Recv All (gnt/+/+)",
        "topic": "gnt/+/+",
        "qos": "0",
        "datatype": "auto-detect",
        "broker": "aa12b35ebe3d1cef",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 360,
        "y": 160,
        "wires": [
            [
                "1028181e59ded703"
            ]
        ]
    },
    {
        "id": "1028181e59ded703",
        "type": "function",
        "z": "8821ee06eba89b63",
        "name": "🧠 Master Logic: Calc & Route",
        "func": "// --- CONFIG (ตั้งค่าสเปกเครื่องตรงนี้) ---\nconst MAX_RPM = 4000;       // รอบสูงสุดที่เครื่องรับได้\nconst MAX_POWER_W = 5000;   // ผลิตไฟได้สูงสุด (Watt) per Unit\n\n// 1. แกะซองจดหมาย\nconst parts = msg.topic.split('/');\nif (parts.length < 3) return null;\n\nconst unitId = parts[1];    // 'unit01'\nconst type = parts[2];      // 'rpm', 'temp', etc.\nlet val = msg.payload;\n\nif (typeof val === 'object') {\n    val = parseFloat(val[Object.keys(val)[0]]);\n} else {\n    val = parseFloat(val);\n}\n\nlet sqlQuery = \"\";\nlet sqlParams = [];\n\n// --- 2. แยกประเภท (ตัด status_flag ออกจาก SQL) ---\n\nif (type === 'temp' || type === 'temperature') {\n    flow.set(unitId + '_temp', val);\n    // ❌ ลบ status_flag ออก\n    sqlQuery = \"INSERT INTO unit_temperature (unit_id, temperature) VALUES (?, ?)\";\n    sqlParams = [unitId, val];\n\n} else if (type === 'vibration') {\n    flow.set(unitId + '_vibration', val);\n    // ❌ ลบ status_flag ออก\n    sqlQuery = \"INSERT INTO unit_vibration (unit_id, vibration) VALUES (?, ?)\";\n    sqlParams = [unitId, val];\n\n} else if (type === 'level') {\n    flow.set(unitId + '_level', val);\n    // ❌ ลบ status_flag ออก\n    sqlQuery = \"INSERT INTO unit_level (unit_id, level) VALUES (?, ?)\";\n    sqlParams = [unitId, val];\n\n} else if (type === 'rpm') {\n    // *** พระเอกอยู่นี่ ***\n    flow.set(unitId + '_rpm', val);\n\n    // คำนวณ Power\n    let currentPower = (val / MAX_RPM) * MAX_POWER_W;\n    if (currentPower < 0) currentPower = 0;\n    if (currentPower > MAX_POWER_W) currentPower = MAX_POWER_W;\n\n    flow.set('power_' + unitId, currentPower);\n\n    // รวมยอด\n    let totalPower = 0;\n    let activeUnits = 0;\n    for (let i = 1; i <= 10; i++) {\n        let uid = 'unit' + String(i).padStart(2, '0');\n        let p = flow.get('power_' + uid) || 0;\n        totalPower += p;\n        if (p > 0) activeUnits++;\n    }\n\n    flow.set('total_power', totalPower);\n    flow.set('active_units', activeUnits);\n\n    // --- PACKAGES ส่งออก ---\n\n    // 1. บันทึก RPM (❌ ลบ status_flag ออก)\n    const msgRPM = {\n        topic: \"INSERT INTO unit_rpm (unit_id, rpm) VALUES (?, ?)\",\n        payload: [unitId, val]\n    };\n\n    // 2. บันทึก Power\n    const msgPower = {\n        topic: \"INSERT INTO unit_power (unit_id, currentPower) VALUES (?, ?)\",\n        payload: [unitId, parseFloat(currentPower.toFixed(2))]\n    };\n\n    // 3. บันทึกยอดรวม\n    const msgSystemStats = {\n        topic: \"INSERT INTO system_summary_log (total_power_w, total_demand_w, active_units_count, timestamp) VALUES (?, 0, ?, NOW())\",\n        payload: [parseFloat(totalPower.toFixed(2)), activeUnits]\n    };\n\n    // 4. ส่ง WebSocket\n    const msgTotal = { /* ... (ส่งไป WS เหมือนเดิม) ... */ };\n    // *หมายเหตุ: ตรงนี้เราไม่ส่ง msgTotal ออกขา 2 แล้ว เพราะเรามีโหนด Prepare WS Broadcast มารับช่วงต่อ*\n\n    // ส่งออก 2 ขา: [ [SQL ทั้งหมด], null ] \n    // (ขา 2 ปล่อยว่างไว้ เพราะ Inject จะไปกระตุ้น Prepare WS Broadcast เอง)\n    return [[msgRPM, msgPower, msgSystemStats], null];\n}\n\nif (sqlQuery) {\n    msg.topic = sqlQuery;\n    msg.payload = sqlParams;\n    return [msg, null];\n}\n\nreturn null;",
        "outputs": 2,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 630,
        "y": 180,
        "wires": [
            [
                "57d4fed0ca188a5a",
                "9797b2a092e36ae5"
            ],
            [
                "a15dcbe923611640",
                "websocket_out"
            ]
        ]
    },
    {
        "id": "57d4fed0ca188a5a",
        "type": "mysql",
        "z": "8821ee06eba89b63",
        "mydb": "894f1b3b3eb5926e",
        "name": "💾 Save to DB",
        "x": 940,
        "y": 140,
        "wires": [
            []
        ]
    },
    {
        "id": "9797b2a092e36ae5",
        "type": "debug",
        "z": "8821ee06eba89b63",
        "name": "SQL Monitor",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "payload",
        "statusType": "auto",
        "x": 930,
        "y": 200,
        "wires": []
    },
    {
        "id": "a15dcbe923611640",
        "type": "debug",
        "z": "8821ee06eba89b63",
        "name": "⚡ Total Power Live",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "payload",
        "statusType": "auto",
        "x": 950,
        "y": 280,
        "wires": []
    },
    {
        "id": "http_get_units",
        "type": "http in",
        "z": "8821ee06eba89b63",
        "name": "GET /api/units",
        "url": "/api/units",
        "method": "get",
        "upload": false,
        "skipBodyParsing": false,
        "swaggerDoc": "",
        "x": 430,
        "y": 520,
        "wires": [
            [
                "query_all_units"
            ]
        ]
    },
    {
        "id": "query_all_units",
        "type": "function",
        "z": "8821ee06eba89b63",
        "name": "Query All Units",
        "func": "// --- CONFIG: ตั้งชื่อหมู่บ้านตรงนี้ (ถ้าไม่แก้ มันจะโชว์ unit01, unit02) ---\nconst VILLAGE_NAMES = {\n    'unit01': 'หมู่บ้านทาคิ',\n    'unit02': 'หมู่บ้านโคโนฮะ',\n    'unit03': 'หมู่บ้านคิริ',\n    'unit04': 'หมู่บ้านซึนะ',\n    'unit05': 'หมู่บ้านโอโตะ',\n    'unit06': 'หมู่บ้านยูงะ',\n    'unit07': 'หมู่บ้านอาเมะ',\n    'unit08': 'หมู่บ้านคุโมะ',\n    'unit09': 'หมู่บ้านอิวะ',\n    'unit10': 'หมู่บ้านคุสะ'\n};\n\n// ดึงข้อมูลล่าสุดของทุก Unit\nconst units = [];\n\nfor (let i = 1; i <= 10; i++) {\n    const unitId = 'unit' + String(i).padStart(2, '0');\n\n    // ดึงจาก Context (ที่ Master Logic เก็บไว้)\n    const rpm = flow.get(unitId + '_rpm') || 0;\n    const temp = flow.get(unitId + '_temp') || 0;\n    const vibration = flow.get(unitId + '_vibration') || 0;\n    const level = flow.get(unitId + '_level') || 0;\n    const power = flow.get('power_' + unitId) || 0;\n\n    units.push({\n        id: unitId,\n        name: VILLAGE_NAMES[unitId] || unitId, // ✅ เพิ่มชื่อหมู่บ้านส่งไปด้วย\n        rpm: rpm,\n        temperature: temp,\n        vibration: vibration,\n        level: level,\n        power: power,\n        rpmStatus: rpm < 100 ? 'WARNING' : 'NORMAL',\n        tempStatus: temp > 80 ? 'CRITICAL' : 'NORMAL',\n        vibStatus: vibration > 10 ? 'CRITICAL' : 'NORMAL',\n        levelStatus: level > 4.5 ? 'WARNING' : 'NORMAL'\n    });\n}\n\n// คำนวณ Total (ดึงค่าที่ Master Logic คำนวณเสร็จแล้วมาใช้)\nconst totalPower = flow.get('total_power') || 0;\nconst activeUnits = units.filter(u => u.power > 0).length;\n\nmsg.payload = {\n    type: 'update', // ✅ ใส่ type ให้ React สบายใจ\n    units: units,\n    totalPower: totalPower,\n    activeUnits: activeUnits,\n    timestamp: new Date().toISOString()\n};\n\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 520,
        "wires": [
            [
                "http_response"
            ]
        ]
    },
    {
        "id": "http_response",
        "type": "http response",
        "z": "8821ee06eba89b63",
        "name": "API Response",
        "statusCode": "200",
        "headers": {},
        "x": 870,
        "y": 520,
        "wires": []
    },
    {
        "id": "c9a9d7d2641868e4",
        "type": "http response",
        "z": "8821ee06eba89b63",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 1220,
        "y": 620,
        "wires": []
    },
    {
        "id": "42c2c23fec8c51ce",
        "type": "http in",
        "z": "8821ee06eba89b63",
        "name": "GET /api/villages/status",
        "url": "/api/villages/status",
        "method": "get",
        "upload": false,
        "skipBodyParsing": false,
        "swaggerDoc": "",
        "x": 300,
        "y": 620,
        "wires": [
            [
                "31f1e052a8499444"
            ]
        ]
    },
    {
        "id": "31f1e052a8499444",
        "type": "function",
        "z": "8821ee06eba89b63",
        "name": "Set SQL for Villages",
        "func": "// Function Node: Set SQL for Villages\n\n// SQL Query: ดึง ID, ชื่อ, พิกัด X, พิกัด Y และ Max Capacity \n// (เราจะส่ง max_capacity_w ไปด้วย เผื่อใช้ในอนาคต)\nmsg.topic = \"SELECT unit_id, name, map_x, map_y, max_capacity_w FROM villages\";\n\nmsg.payload = []; \n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 540,
        "y": 620,
        "wires": [
            [
                "c04b2eefd0c8fe06"
            ]
        ]
    },
    {
        "id": "7e7f0edf83c0676f",
        "type": "change",
        "z": "8821ee06eba89b63",
        "name": "Add CORS Header",
        "rules": [
            {
                "t": "set",
                "p": "headers",
                "pt": "msg",
                "to": "{\"Access-Control-Allow-Origin\":\"*\",\"Access-Control-Allow-Methods\":\"GET, OPTIONS\",\"Access-Control-Allow-Headers\":\"Content-Type, Authorization, X-Requested-With\",\"Content-Type\":\"application/json\"}",
                "tot": "json"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1010,
        "y": 620,
        "wires": [
            [
                "c9a9d7d2641868e4"
            ]
        ]
    },
    {
        "id": "c04b2eefd0c8fe06",
        "type": "mysql",
        "z": "8821ee06eba89b63",
        "mydb": "894f1b3b3eb5926e",
        "name": "SELECT Villages",
        "x": 770,
        "y": 620,
        "wires": [
            [
                "7e7f0edf83c0676f",
                "2ecc006c6064842b"
            ]
        ]
    },
    {
        "id": "2ecc006c6064842b",
        "type": "debug",
        "z": "8821ee06eba89b63",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 960,
        "y": 660,
        "wires": []
    },
    {
        "id": "d4649c734f638284",
        "type": "http in",
        "z": "8821ee06eba89b63",
        "name": "",
        "url": "/api/history",
        "method": "get",
        "upload": false,
        "skipBodyParsing": false,
        "swaggerDoc": "",
        "x": 300,
        "y": 780,
        "wires": [
            [
                "07ab5b8b4039361d"
            ]
        ]
    },
    {
        "id": "07ab5b8b4039361d",
        "type": "function",
        "z": "8821ee06eba89b63",
        "name": "Set SQL for Villages",
        "func": "// ดึง 20 แถวล่าสุดจากตาราง Log รวม\n// (เช็คชื่อตารางให้ตรงกับ DB พี่นะ ในโค้ดก่อนหน้านี้เราใช้ 'system_summary_log')\nmsg.topic = \"SELECT total_power_w, timestamp FROM system_summary_log ORDER BY id DESC LIMIT 20\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 500,
        "y": 780,
        "wires": [
            [
                "75b1f0cc144a500a"
            ]
        ]
    },
    {
        "id": "75b1f0cc144a500a",
        "type": "mysql",
        "z": "8821ee06eba89b63",
        "mydb": "894f1b3b3eb5926e",
        "name": "SELECT history",
        "x": 720,
        "y": 780,
        "wires": [
            [
                "57188463dfa63b39"
            ]
        ]
    },
    {
        "id": "57188463dfa63b39",
        "type": "function",
        "z": "8821ee06eba89b63",
        "name": "Set SQL for Villages",
        "func": "// Database ส่งมาแบบ ใหม่ -> เก่า (DESC)\n// แต่กราฟต้องการ เก่า -> ใหม่ (Left -> Right)\nconst rows = msg.payload.reverse();\n\nmsg.payload = rows.map(row => {\n    const d = new Date(row.timestamp);\n    return {\n        // จัด Format เวลาให้ตรงกับที่ React รอรับ\n        time: d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),\n        power: row.total_power_w\n    };\n});\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 780,
        "wires": [
            [
                "5e28f6d829db047d"
            ]
        ]
    },
    {
        "id": "5e28f6d829db047d",
        "type": "http response",
        "z": "8821ee06eba89b63",
        "name": "",
        "statusCode": "200",
        "headers": {},
        "x": 1180,
        "y": 780,
        "wires": []
    },
    {
        "id": "ce2cc76d365d73b7",
        "type": "inject",
        "z": "8821ee06eba89b63",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "1",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 670,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "websocket_out",
        "type": "websocket out",
        "z": "8821ee06eba89b63",
        "name": "WS: Broadcast to Clients",
        "server": "39a0f016b4a9755c",
        "client": "",
        "x": 950,
        "y": 380,
        "wires": []
    },
    {
        "id": "441c19bcbdbfff1e",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-contrib-influxdb": "0.7.0",
            "node-red-node-mysql": "2.0.0"
        }
    }
]