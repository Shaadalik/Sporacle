import React from 'react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { Tab } from '../types';
import { Home, Activity, CheckSquare, Camera, Settings, BarChart3, Sprout } from 'lucide-react';
import { playClickSound } from '../constants';
import Sporcbot from './Sporcbot';
import Aurora from './Aurora';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const navItems = [
    { id: Tab.HOME, icon: Home, label: 'Home' },
    { id: Tab.STATS, icon: BarChart3, label: 'Stats' },
    { id: Tab.PROGRESS, icon: Sprout, label: 'Progress' },
    { id: Tab.TRENDS, icon: Activity, label: 'Trends' },
    { id: Tab.TASKS, icon: CheckSquare, label: 'Tasks' },
    { id: Tab.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  const handleTabClick = (tab: Tab) => {
    playClickSound();
    onTabChange(tab);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 text-gray-900 dark:text-white font-sans antialiased transition-colors duration-300">
      <main className="min-h-screen relative overflow-hidden">
        <Aurora opacity={0.18} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
        
        {/* Floating AI Assistant */}
        <Sporcbot />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 px-4 py-4 flex justify-between items-center z-40 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.02)] transition-colors duration-300">
        <LayoutGroup>
          <div className="flex w-full justify-between">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className="flex flex-col items-center gap-1 min-w-[3.5rem] relative group active:scale-90 transition-transform duration-100"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -top-1 w-12 h-8 rounded-full -z-10"
                      style={{ backgroundColor: 'rgba(16,185,129,0.12)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon 
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive ? 'text-primary stroke-[2.5px]' : 'text-gray-400 dark:text-gray-500 stroke-[2px] group-hover:text-gray-600 dark:group-hover:text-gray-300'
                    }`} 
                  />
                  <span className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </nav>
    </div>
  );
};

export default Layout;