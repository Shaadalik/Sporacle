import React from 'react';
import { motion } from 'framer-motion';
import { Metric, Severity } from '../types';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Fan, CloudOff } from 'lucide-react';
import { playClickSound } from '../constants';

interface MetricTileProps {
  metric: Metric;
  isOffline?: boolean;
  onClick?: () => void;
}

const MetricTile: React.FC<MetricTileProps> = ({ metric, isOffline = false, onClick }) => {
  
  const getBorderColor = (status: Severity) => {
    if (isOffline) return 'border-gray-200 dark:border-gray-700';
    switch (status) {
      case Severity.CRITICAL: return 'border-alert-red shadow-red-100 dark:shadow-none';
      case Severity.WARNING: return 'border-alert-yellow shadow-yellow-100 dark:shadow-none';
      case Severity.NORMAL: return 'border-alert-green shadow-green-100 dark:shadow-none';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  };

  const getTextColor = (status: Severity) => {
    if (isOffline) return 'text-offline';
    switch (status) {
      case Severity.CRITICAL: return 'text-alert-red';
      case Severity.WARNING: return 'text-alert-yellow';
      case Severity.NORMAL: return 'text-gray-900 dark:text-white';
      default: return 'text-gray-900 dark:text-white';
    }
  };

  const handleClick = () => {
    playClickSound();
    if (onClick) onClick();
  };

  // Convert simple array to object array for Recharts
  const data = metric.history.map((val, idx) => ({ i: idx, v: val }));

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={!isOffline ? { y: -2 } : undefined}
      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
      className={`
      relative bg-white dark:bg-gray-800 rounded-2xl p-4 border-2 transition-all duration-300
      ${getBorderColor(metric.status)}
      ${isOffline ? 'opacity-80' : 'shadow-sm hover:shadow-md cursor-pointer'}
      flex flex-col justify-between h-40 select-none
    `}
    >
      <div className="flex justify-between items-start">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{metric.label}</span>
        {metric.isFan && !isOffline && (
          <Fan className={`w-5 h-5 text-gray-400 ${metric.isActive ? 'animate-spin' : ''}`} />
        )}
        {isOffline && <CloudOff className="w-5 h-5 text-gray-400" />}
      </div>

      <div className="mt-2">
        {isOffline ? (
          <span className="text-xl font-bold text-gray-400">OFFLINE</span>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl font-bold tracking-tight ${getTextColor(metric.status)}`}>
              {metric.value}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{metric.unit}</span>
          </div>
        )}
      </div>

      <div className="h-10 mt-2 w-full">
         {!isOffline && (
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={data}>
               <Line 
                 type="monotone" 
                 dataKey="v" 
                 stroke={metric.status === Severity.NORMAL ? '#10B981' : metric.status === Severity.WARNING ? '#F59E0B' : '#EF4444'} 
                 strokeWidth={2} 
                 dot={false} 
               />
             </LineChart>
           </ResponsiveContainer>
         )}
      </div>
    </motion.div>
  );
};

export default MetricTile;