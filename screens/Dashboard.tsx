import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_METRICS, MOCK_TASKS, CHAMBER_LIST, playClickSound } from '../constants';
import { Severity, Tab } from '../types';
import MetricTile from '../components/MetricTile';
import { Bell, ChevronDown } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: Tab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [selectedChamber, setSelectedChamber] = useState(CHAMBER_LIST[0]);
  const [isChamberOpen, setIsChamberOpen] = useState(false);

  // Determine overall status based on worst metric
  const worstStatus = MOCK_METRICS.reduce((acc, curr) => {
    if (curr.status === Severity.CRITICAL) return Severity.CRITICAL;
    if (curr.status === Severity.WARNING && acc !== Severity.CRITICAL) return Severity.WARNING;
    return acc;
  }, Severity.NORMAL);

  const getStatusColor = (s: Severity) => {
    if (s === Severity.CRITICAL) return 'bg-alert-red text-white';
    if (s === Severity.WARNING) return 'bg-alert-yellow text-white';
    return 'bg-alert-green text-white';
  };

  const getStatusText = (s: Severity) => {
    if (s === Severity.CRITICAL) return 'CRITICAL CONDITIONS';
    if (s === Severity.WARNING) return 'WARNING DETECTED';
    return 'SYSTEM OPTIMAL';
  };

  const handleTileClick = () => {
    onNavigate(Tab.TRENDS);
  };

  const handleTaskClick = () => {
    playClickSound();
    onNavigate(Tab.TASKS);
  };

  const handleHeaderClick = () => {
    playClickSound();
    onNavigate(Tab.TASKS);
  };

  const toggleChamberMenu = () => {
    playClickSound();
    setIsChamberOpen(!isChamberOpen);
  };

  const selectChamber = (chamber: string) => {
    playClickSound();
    setSelectedChamber(chamber);
    setIsChamberOpen(false);
  };

  return (
    <div className="pb-24 animate-fade-in bg-background dark:bg-gray-900 min-h-screen transition-colors duration-300 relative">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-900 sticky top-0 z-20 shadow-sm/50 dark:shadow-gray-800 transition-colors duration-300">
        <div className="flex flex-col relative">
           <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Chamber Selection</span>
           <div 
             className="flex items-center gap-1 cursor-pointer active:opacity-70 transition-opacity"
             onClick={toggleChamberMenu}
           >
             <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{selectedChamber}</h1>
             <ChevronDown className={`w-4 h-4 text-primary transition-transform ${isChamberOpen ? 'rotate-180' : ''}`} />
           </div>
           
           {/* Dropdown Menu */}
           {isChamberOpen && (
             <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up z-50">
               {CHAMBER_LIST.map((chamber) => (
                 <div 
                   key={chamber}
                   className={`px-4 py-3 text-sm font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedChamber === chamber ? 'text-primary' : 'text-gray-700 dark:text-gray-200'}`}
                   onClick={() => selectChamber(chamber)}
                 >
                   {chamber}
                 </div>
               ))}
             </div>
           )}
        </div>
        <div 
          onClick={handleHeaderClick}
          className="relative p-2 bg-gray-50 dark:bg-gray-800 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all"
        >
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-alert-red rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></span>
        </div>
      </header>

      {/* Overlay for dropdown */}
      {isChamberOpen && (
        <div className="fixed inset-0 z-10" onClick={() => setIsChamberOpen(false)} />
      )}

      <div className="px-6 mt-6">
        {/* Overall Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-1.5 mb-6 active:scale-[0.99] transition-all duration-300 border border-transparent dark:border-gray-700"
          onClick={handleTaskClick}
        >
          <div className={`${getStatusColor(worstStatus)} rounded-2xl py-6 px-6 flex flex-col items-center justify-center text-center shadow-inner`}>
             <h2 className="text-2xl font-bold tracking-tight mb-1">{getStatusText(worstStatus)}</h2>
             <p className="opacity-90 text-sm font-medium">Check Alerts/Tasks for action items</p>
          </div>
        </motion.div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {MOCK_METRICS.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.24, delay: i * 0.04, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <MetricTile metric={m} onClick={handleTileClick} />
            </motion.div>
          ))}
        </div>

        {/* Quick Tasks Preview */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
             <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active Tasks</h3>
             <button onClick={handleTaskClick} className="text-xs font-bold text-primary active:text-green-700">View All</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {MOCK_TASKS.map((task, i) => (
              <motion.div 
                key={task.id} 
                onClick={handleTaskClick}
                className="min-w-[200px] bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-2 active:scale-95 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.26, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-secondary dark:text-blue-300">
                    {task.status}
                  </span>
                  <span className="text-xs text-gray-400">{task.timestamp}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm">{task.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{task.location}</p>
                </div>
              </motion.div>
            ))}
             <motion.div 
               onClick={handleTaskClick}
               className="min-w-[100px] flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 active:bg-gray-100 dark:active:bg-gray-700 cursor-pointer"
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0.3 }}
               transition={{ duration: 0.26, delay: MOCK_TASKS.length * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
             >
               <span className="text-sm text-primary font-medium">View All &rarr;</span>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;