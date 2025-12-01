import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MUSHROOM_VARIETIES, TOTAL_STATS_HISTORY, playClickSound } from '../constants';
import { TrendingUp, Package, Sprout } from 'lucide-react';

const Stats: React.FC = () => {
  const [chartPeriod, setChartPeriod] = useState<'day' | 'month' | 'year'>('month');

  const handlePeriodChange = (p: 'day' | 'month' | 'year') => {
    playClickSound();
    setChartPeriod(p);
  };

  return (
    <div className="pb-24 px-6 pt-8 animate-fade-in bg-background dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Production Statistics</h1>

      {/* Aggregate Stats Chart */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Total Output
          </h3>
          <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {(['day', 'month', 'year'] as const).map(p => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                className={`px-3 py-1 rounded-md text-xs font-bold capitalize transition-all ${
                  chartPeriod === p 
                    ? 'bg-white dark:bg-gray-600 text-primary shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TOTAL_STATS_HISTORY[chartPeriod]}>
              <defs>
                <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1E88E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-700" />
              <XAxis 
                dataKey="name" 
                tick={{fontSize: 10}} 
                tickLine={false} 
                axisLine={false} 
                stroke="#9CA3AF"
              />
              <YAxis 
                tick={{fontSize: 10}} 
                tickLine={false} 
                axisLine={false} 
                stroke="#9CA3AF"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Area type="monotone" dataKey="production" stroke="#4CAF50" fillOpacity={1} fill="url(#colorProd)" name="Production" isAnimationActive animationDuration={700} animationBegin={120} animationEasing="ease-out" />
              <Area type="monotone" dataKey="inventory" stroke="#1E88E5" fillOpacity={1} fill="url(#colorInv)" name="Inventory" isAnimationActive animationDuration={700} animationBegin={180} animationEasing="ease-out" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Breakdown by Variety */}
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Sprout className="w-5 h-5 text-primary" /> Variety Breakdown
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Production Bar Chart */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
        >
           <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-4">Production by Type</h3>
           <div className="h-60">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={MUSHROOM_VARIETIES} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-700" />
                 <XAxis type="number" hide />
                 <YAxis 
                   dataKey="name" 
                   type="category" 
                   width={80}
                   tick={{fontSize: 10, fill: '#9CA3AF'}} 
                   tickLine={false} 
                   axisLine={false} 
                 />
                 <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1F2937', color: '#fff' }}
                 />
                 <Bar dataKey="production" fill="#4CAF50" radius={[0, 4, 4, 0]} barSize={20} name="Units Produced" isAnimationActive animationDuration={600} animationBegin={100} animationEasing="ease-out" />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </motion.div>

        {/* Inventory Bar Chart */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
        >
           <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-4">Current Inventory</h3>
           <div className="h-60">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={MUSHROOM_VARIETIES} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-700" />
                 <XAxis type="number" hide />
                 <YAxis 
                   dataKey="name" 
                   type="category" 
                   width={80}
                   tick={{fontSize: 10, fill: '#9CA3AF'}} 
                   tickLine={false} 
                   axisLine={false} 
                 />
                 <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1F2937', color: '#fff' }}
                 />
                 <Bar dataKey="inventory" fill="#1E88E5" radius={[0, 4, 4, 0]} barSize={20} name="Stock Level" isAnimationActive animationDuration={600} animationBegin={100} animationEasing="ease-out" />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </motion.div>
      </div>

      {/* Detailed Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Variety</th>
              <th className="px-6 py-4 text-right">Production</th>
              <th className="px-6 py-4 text-right">Inventory</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {MUSHROOM_VARIETIES.map((m) => (
              <tr key={m.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 font-medium">{m.name}</td>
                <td className="px-6 py-4 text-right text-primary font-bold">{m.production.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-secondary font-bold">{m.inventory.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Stats;