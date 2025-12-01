import { Metric, Severity, Alert, Task, TaskStatus, WorkerProfile, ChatMessage } from './types';

// iOS-style keyboard click / soft tap sound (Base64 WAV)
export const CLICK_SOUND_B64 = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="; 
// Actually, let's use a slightly longer, real "tock" sound.
// This is a short generated PCM buffer representation for a click.
const REAL_CLICK_B64 = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACQB5AHAQQA////////AAD//w==";
// To ensure it works well across browsers without external requests, we will use a small beep function or a hosted file if base64 is too tricky to get perfect in text.
// Let's use a reliable hosted sound for "UI Click" to ensure quality.
export const SOUND_URL = "https://cdn.freesound.org/previews/256/256116_3263906-lq.mp3"; 

export const playClickSound = () => {
  const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
  audio.volume = 0.2;
  // Clone node or new Audio allows overlapping sounds for rapid clicks
  audio.play().catch(() => {}); 
};

export const playReceiveSound = () => {
  const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3"); // Soft notification
  audio.volume = 0.15;
  audio.play().catch(() => {});
}
// Suggested FAQ for Sporcbot (static Q&A)
export const SPORCBOT_FAQ: Array<{ q: string; a: string }> = [
  { q: 'Optimal CO2 during pinning?', a: 'Maintain 800–1200 ppm. Use frequent fresh air exchanges to avoid spikes.' },
  { q: 'Ideal humidity for fruiting?', a: 'Keep 85–95% RH. Prefer short mist pulses to avoid pooling.' },
  { q: 'Best temperature for oyster?', a: 'Target 20–22°C (range 18–24°C) for consistent cap formation.' },
  { q: 'CO2 rising at night — fix?', a: 'Add low-speed ventilation cycles (10–15 min/hr) overnight; verify intake filters.' },
  { q: 'Caps yellowing — cause?', a: 'Likely low humidity or heat. Increase RH and diffuse lighting; check hotspots.' },
  { q: 'Post-harvest misting?', a: 'Mist 8–12 minutes immediately, then hold ~90% RH for 2–3 hours to rehydrate.' },
  { q: 'Assign corrective action fast?', a: 'Open Alerts, tap Assign Task, select worker, add duration and notes, confirm.' },
  { q: 'Flat RH but rising CO2?', a: 'Ventilation inadequate. Increase air exchanges; inspect dampers and obstructions.' },
  { q: 'Stems elongating?', a: 'High CO2 or poor light diffusion. Improve airflow and adjust light angle/intensity.' },
  { q: 'Misting: long vs pulses?', a: 'Prefer 1–2 min pulses spaced 10–15 min; reduces pooling and bacterial risk.' },
  { q: 'Shiitake vs oyster conditions?', a: 'Shiitake browning at lower RH and cooler temps (16–20°C); longer rest between flushes.' },
  { q: 'Basic PPE for maintenance?', a: 'N95/KN95, nitrile gloves, eye protection; sanitize hands/tools between chambers.' },
];

export const MOCK_METRICS: Metric[] = [
  {
    id: 'temp',
    label: 'Temperature',
    value: 22.5,
    unit: '°C',
    status: Severity.NORMAL,
    history: [21, 21.5, 22, 22.2, 22.5, 22.5, 22.4, 22.5]
  },
  {
    id: 'humidity',
    label: 'Humidity %RH',
    value: 78,
    unit: '%',
    status: Severity.WARNING, // Slightly low
    history: [85, 84, 82, 80, 79, 78, 78, 78]
  },
  {
    id: 'co2',
    label: 'CO2',
    value: 850,
    unit: 'ppm',
    status: Severity.NORMAL,
    history: [800, 810, 820, 830, 840, 850, 850, 850]
  },
  {
    id: 'aer',
    label: 'Air Flow (ACH)',
    value: 12.4,
    unit: 'ACH',
    status: Severity.NORMAL,
    history: [12, 12, 12, 12.2, 12.4, 12.4, 12.4, 12.4],
    isFan: true,
    isActive: true
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    chamber: 'Chamber 1 - Shiitake',
    timestamp: '10:42 AM',
    message: 'Humidity dropped below 80%',
    action: 'Run misting system for 12 mins',
    severity: Severity.WARNING
  },
  {
    id: 'a2',
    chamber: 'Chamber 3 - Button',
    timestamp: '09:15 AM',
    message: 'CO2 Levels Critical (>1200ppm)',
    action: 'Check ventilation intake fans',
    severity: Severity.CRITICAL
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Fix Fan',
    location: 'Chamber 2',
    status: TaskStatus.PENDING,
    timestamp: '2h ago',
    description: 'Main intake fan making noise. Check bearings.'
  },
  {
    id: 't2',
    title: 'Misting Cycle',
    location: 'Chamber 3',
    status: TaskStatus.IN_PROGRESS,
    timestamp: '15m ago',
    description: 'Manual misting required due to sensor calibration.'
  }
];

export const WORKERS: WorkerProfile[] = [
  { id: 'w1', name: 'John Doe', status: 'AVAILABLE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: 'w2', name: 'Maria S.', status: 'BUSY', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
  { id: 'w3', name: 'Alex T.', status: 'AVAILABLE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
];

// Settings & Factory Data
export const COMPANY_INFO = {
  address: "123 Mycelium Drive, Fungi Valley, CA 94043",
  gst: "22AAAAA0000A1Z5",
  size: "Large",
  employees: 42,
};

export const EMPLOYEE_PROFILE = {
  name: "Sarah Chen",
  id: "EMP-2024-089",
  gender: "Female",
  role: "Senior Mycologist",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  joinDate: "March 12, 2021",
  timeline: [
    { date: "Mar 2021", title: "Joined Sporacle", description: "Started as Junior Mycologist in Chamber 1." },
    { date: "Nov 2021", title: "Certification", description: "Completed Advanced Spore Analysis certification." },
    { date: "Aug 2022", title: "Promoted", description: "Promoted to Team Lead for Oyster cultivation." },
    { date: "Jan 2024", title: "Senior Role", description: "Promoted to Senior Mycologist overseeing all chambers." },
    { date: "Present", title: "Current", description: "Leading research on yield optimization." }
  ]
};

export const CHAMBER_LIST = [
  "Chamber 1 - Shiitake",
  "Chamber 2 - Oyster",
  "Chamber 3 - Button",
  "Chamber 4 - Milky",
  "Chamber 5 - Lion's Mane",
  "Chamber 6 - Enoki",
  "Chamber 7 - Portobello"
];

// Stats for Graphs
export const MUSHROOM_VARIETIES = [
  { name: 'Oyster', production: 1200, inventory: 300 },
  { name: 'Button', production: 2400, inventory: 800 },
  { name: 'Shiitake', production: 1500, inventory: 450 },
  { name: 'Milky', production: 800, inventory: 150 },
  { name: 'Lion\'s Mane', production: 600, inventory: 100 },
  { name: 'Enoki', production: 900, inventory: 200 },
  { name: 'Portobello', production: 1100, inventory: 350 },
];

export const TOTAL_STATS_HISTORY = {
  day: [
    { name: '06:00', production: 40, inventory: 240 },
    { name: '10:00', production: 85, inventory: 220 },
    { name: '14:00', production: 120, inventory: 180 },
    { name: '18:00', production: 90, inventory: 260 },
  ],
  month: [
    { name: 'Wk 1', production: 2000, inventory: 5000 },
    { name: 'Wk 2', production: 2400, inventory: 4800 },
    { name: 'Wk 3', production: 2100, inventory: 5200 },
    { name: 'Wk 4', production: 2800, inventory: 4500 },
  ],
  year: [
    { name: 'Q1', production: 12000, inventory: 8000 },
    { name: 'Q2', production: 15000, inventory: 7500 },
    { name: 'Q3', production: 18000, inventory: 9000 },
    { name: 'Q4', production: 22000, inventory: 8500 },
  ]
};

// Trends Data
const generateTrend = (base: number, variance: number) => 
  Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: base + (Math.random() * variance) - (variance / 2)
  }));

export const TRENDS_DATA = [
  {
    id: 'temp',
    title: 'Temperature',
    unit: '°C',
    color: '#10B981', // Green
    optimalMin: 21,
    optimalMax: 24,
    data: generateTrend(22.5, 3)
  },
  {
    id: 'humidity',
    title: 'Humidity',
    unit: '%',
    color: '#1E88E5', // Blue
    optimalMin: 80,
    optimalMax: 90,
    data: generateTrend(82, 10).map((d, i) => i > 18 ? { ...d, value: d.value - 15 } : d) // Simulate drop
  },
  {
    id: 'co2',
    title: 'CO2 Levels',
    unit: 'ppm',
    color: '#F59E0B', // Yellow
    optimalMin: 600,
    optimalMax: 1000,
    data: generateTrend(850, 100)
  },
  {
    id: 'airflow',
    title: 'Air Flow',
    unit: 'ACH',
    color: '#8B5CF6', // Purple
    optimalMin: 10,
    optimalMax: 15,
    data: generateTrend(12, 1)
  }
];

// --- SPORCBOT AI LOGIC ---

// Context for the specific scenario requested
export const SPORCBOT_CONTEXT = {
  date: "Saturday, November 29, 2025",
  chamberId: "FZ-402",
  variety: "Oyster (Pleurotus)",
  phase: "Pinning",
  sensors: {
    temp: 25.1,
    humidity: 75,
    co2: 1250,
    airflow: 250
  },
  thresholds: {
    // Oyster Pinning Phase Thresholds
    temp: { min: 10, max: 24, ideal: 18 },
    humidity: { min: 85, max: 95, ideal: 90 },
    co2: { min: 400, max: 1000, ideal: 700 } // Pinning requires fresh air
  }
};

export const generateSporcbotResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase();
  const ctx = SPORCBOT_CONTEXT;

  // 1. Check for status/health request
  if (msg.includes("status") || msg.includes("health") || msg.includes("how is") || msg.includes("check")) {
    const issues = [];
    if (ctx.sensors.co2 > ctx.thresholds.co2.max) issues.push(`CO2 is critically high (${ctx.sensors.co2} PPM) for the Pinning phase (Target: <1000).`);
    if (ctx.sensors.humidity < ctx.thresholds.humidity.min) issues.push(`Humidity is too low (${ctx.sensors.humidity}%) for pinning (Target: >85%).`);
    if (ctx.sensors.temp > ctx.thresholds.temp.max) issues.push(`Temperature is slightly elevated (${ctx.sensors.temp}°C).`);

    if (issues.length > 0) {
      return `Analysis for Chamber ${ctx.chamberId} (${ctx.variety}):\n\n${issues.join("\n")}\n\nRecommended Action: Increase fresh air exchange (FAE) immediately to lower CO2, and increase misting duration to correct humidity.`;
    } else {
      return `Chamber ${ctx.chamberId} is currently within optimal parameters for ${ctx.variety} in the ${ctx.phase} phase.`;
    }
  }

  // 2. Check for specific parameter inquiries
  if (msg.includes("co2")) {
    const diff = ctx.sensors.co2 - ctx.thresholds.co2.max;
    return `Current CO2: ${ctx.sensors.co2} PPM. This is ${diff > 0 ? `above target by ${diff} PPM` : 'optimal'}. High CO2 during pinning causes long, spindly stems. Increase airflow immediately.`;
  }
  
  if (msg.includes("humidity") || msg.includes("rh")) {
    return `Current Humidity: ${ctx.sensors.humidity}%. This is suboptimal for ${ctx.phase} (Target: 90-95%). Risk of pin aborts is high. Please verify the misting nozzles in sector 2.`;
  }

  if (msg.includes("temp")) {
    return `Current Temp: ${ctx.sensors.temp}°C. It is slightly above the ideal range (10-24°C) for Oysters. Consider lowering ambient temperature to encourage robust fruiting body formation.`;
  }

  // 3. Predictions (Linear Regression context)
  if (msg.includes("predict") || msg.includes("future") || msg.includes("trend")) {
    return `Linear Regression models indicate a trend of rising CO2 (+50 PPM/10min). Without intervention, CO2 will breach 1500 PPM within 45 minutes, risking suffocation of pins.`;
  }

  // 4. Contamination (Isolation Forest context)
  if (msg.includes("contam") || msg.includes("mold") || msg.includes("clean")) {
    return `Isolation Forest model check: Normal. No multivariate anomalies detected that suggest contamination ("Silent Killer"). Regular visual inspection is still recommended.`;
  }

  // 5. General greeting or unknown
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return `Hello. I am Sporcbot. I am currently monitoring Chamber ${ctx.chamberId}. Current phase: ${ctx.phase}. How can I assist with the environmental regulation?`;
  }

  return "I understand. Based on current sensor data, please monitor the CO2 and Humidity levels closely. Would you like me to generate a maintenance task for the airflow system?";
};