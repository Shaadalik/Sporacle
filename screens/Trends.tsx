import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceArea } from 'recharts';
import Button from '../components/Button';
import { AlertCircle, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { playClickSound, TRENDS_DATA } from '../constants';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Tab } from '../types';

interface TrendsProps {
  onNavigate: (tab: Tab) => void;
}

const Trends: React.FC<TrendsProps> = ({ onNavigate }) => {
  const [period, setPeriod] = useState<'24h' | '7d' | '30d'>('24h');

  const handlePeriodChange = (p: '24h' | '7d' | '30d') => {
    playClickSound();
    setPeriod(p);
  };

  // Interactive tooltip customizer
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-xl rounded-lg">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{label}</p>
          <p className="text-lg font-bold" style={{ color: payload[0].stroke }}>
            {payload[0].value.toFixed(1)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pb-24 px-6 pt-8 animate-slide-up bg-background dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Environmental Trends</h1>
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
           <Activity className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Header banner (subtle, professional) */}
      <div className="hidden sm:block mb-8 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 relative">
        <div className="h-[200px] relative bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 [background-image:radial-gradient(#94a3b81a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
          <div className="relative z-10 p-6 flex items-end justify-between h-full">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">CO2 • Humidity • Temperature</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Trends, optimal bands, and anomalies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Selector */}
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-8">
        {(['24h', '7d', '30d'] as const).map((p) => (
          <button
            key={p}
            onClick={() => handlePeriodChange(p)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              period === p 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Render All 4 Trends */}
      <div className="space-y-8">
        {TRENDS_DATA.map((trend) => {
          // 3D tilt using mouse
          const mx = useMotionValue(0);
          const my = useMotionValue(0);
          const rotateX = useTransform(my, [-50, 50], [8, -8]);
          const rotateY = useTransform(mx, [-50, 50], [-8, 8]);
          const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            mx.set(x / (rect.width / 2) * 50);
            my.set(y / (rect.height / 2) * 50);
          };
          const handleLeave = () => {
            mx.set(0); my.set(0);
          };
          return (
          <motion.div
            key={trend.id}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 140, damping: 12 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: trend.color }}></div>
                <h3 className="font-bold text-gray-800 dark:text-white">{trend.title}</h3>
              </div>
              <span className="text-xs font-bold text-gray-400">{trend.unit}</span>
            </div>

            <div className="h-40 w-full relative">
              <div className="absolute top-0 right-0 z-10 flex items-center gap-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-lg">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: trend.color, opacity: 0.3 }}></div>
                <span className="text-[10px] text-gray-500 dark:text-gray-300 font-medium">Optimal: {trend.optimalMin}-{trend.optimalMax}</span>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend.data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" className="stroke-gray-100 dark:stroke-gray-700" />
                  <XAxis dataKey="time" tick={{fontSize: 9}} tickLine={false} axisLine={false} interval={5} tickFormatter={(v) => v.split(':')[0] + 'h'} />
                  <YAxis domain={['auto', 'auto']} tick={{fontSize: 9}} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceArea y1={trend.optimalMin} y2={trend.optimalMax} fill={trend.color} fillOpacity={0.1} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={trend.color} 
                    strokeWidth={3} 
                    dot={false}
                    isAnimationActive
                    animationDuration={700}
                    animationBegin={120}
                    animationEasing="ease-out"
                    activeDot={{ r: 5, fill: trend.color, stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )})}
      </div>

      {/* Prescriptive Action Card (Appears at bottom if any critical) */}
      <div className="mt-8 bg-white dark:bg-gray-800 border-l-4 border-alert-red rounded-xl p-6 shadow-md shadow-red-50 dark:shadow-none flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-alert-red flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-alert-red font-bold text-sm tracking-wide uppercase mb-1">Critical Action Required</h3>
            <p className="text-gray-800 dark:text-gray-200 leading-snug">
              Humidity is dropping rapidly. Run the misting system for <span className="font-bold">12 minutes</span> immediately.
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          fullWidth
          onClick={() => {
            playClickSound();
            try { sessionStorage.setItem('returnTab', Tab.TRENDS); } catch {}
            onNavigate(Tab.TASKS);
          }}
        >
          Assign to Staff
        </Button>
      </div>
    </div>
  );
};

export default Trends;