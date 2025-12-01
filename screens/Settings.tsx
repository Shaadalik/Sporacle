import React, { useState } from 'react';
import { Moon, Sun, Building2, Users, CreditCard, Factory, X, Calendar, LogOut } from 'lucide-react';
import { COMPANY_INFO, EMPLOYEE_PROFILE, playClickSound } from '../constants';
import Button from '../components/Button';

interface SettingsProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, onToggleDarkMode, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleDarkModeToggle = () => {
    playClickSound();
    onToggleDarkMode();
  };

  const toggleProfile = () => {
    playClickSound();
    setShowProfile(!showProfile);
  }

  const handleLogout = () => {
    playClickSound();
    onLogout();
  }

  return (
    <div className="pb-24 px-6 pt-8 animate-fade-in bg-background dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          onClick={handleDarkModeToggle}
          className={`p-3 rounded-full transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800 text-yellow-400 shadow-lg shadow-gray-900' 
              : 'bg-white text-gray-600 shadow-md shadow-gray-100'
          }`}
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      {/* Interactive Employee Profile Card */}
      <div 
        onClick={toggleProfile}
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
      >
        <img 
          src={EMPLOYEE_PROFILE.avatar} 
          alt="Profile" 
          className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 object-cover" 
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
             <div>
                <h2 className="text-lg font-bold">{EMPLOYEE_PROFILE.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{EMPLOYEE_PROFILE.role}</p>
             </div>
             <span className="text-xs text-primary font-bold">View</span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-md">
              {EMPLOYEE_PROFILE.id}
            </span>
            <span className="text-[10px] font-bold bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-md">
              {EMPLOYEE_PROFILE.gender}
            </span>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4" /> Company Details
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
             <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Factory className="w-5 h-5 text-primary" />
             </div>
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase">Factory Size</p>
               <p className="font-semibold">{COMPANY_INFO.size}</p>
             </div>
          </div>

          <div className="flex items-start gap-3">
             <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Users className="w-5 h-5 text-secondary" />
             </div>
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase">Employees</p>
               <p className="font-semibold">{COMPANY_INFO.employees} Active Staff</p>
             </div>
          </div>

          <div className="flex items-start gap-3">
             <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <CreditCard className="w-5 h-5 text-orange-500" />
             </div>
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase">GST Number</p>
               <p className="font-mono text-sm">{COMPANY_INFO.gst}</p>
             </div>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">{COMPANY_INFO.address}</p>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="mb-8">
        <Button 
          variant="danger" 
          fullWidth 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>

      {/* Employee Detail Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 w-full sm:w-[450px] h-[85vh] sm:h-auto rounded-t-3xl sm:rounded-3xl p-0 shadow-2xl animate-slide-up flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 pb-2 flex justify-between items-start">
               <div className="flex gap-4">
                 <img src={EMPLOYEE_PROFILE.avatar} className="w-20 h-20 rounded-2xl bg-gray-100" alt="Avatar" />
                 <div>
                   <h2 className="text-2xl font-bold dark:text-white">{EMPLOYEE_PROFILE.name}</h2>
                   <p className="text-primary font-medium">{EMPLOYEE_PROFILE.role}</p>
                   <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                     <Calendar className="w-3 h-3" /> Joined {EMPLOYEE_PROFILE.joinDate}
                   </div>
                 </div>
               </div>
               <button 
                  onClick={toggleProfile} 
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
               </button>
            </div>

            <div className="px-6 pb-4 border-b border-gray-100 dark:border-gray-700">
               <div className="grid grid-cols-2 gap-4 mt-4">
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                   <p className="text-xs text-gray-400 uppercase font-bold">Employee ID</p>
                   <p className="font-mono font-bold dark:text-gray-200">{EMPLOYEE_PROFILE.id}</p>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                   <p className="text-xs text-gray-400 uppercase font-bold">Gender</p>
                   <p className="font-bold dark:text-gray-200">{EMPLOYEE_PROFILE.gender}</p>
                 </div>
               </div>
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-6">Career Timeline</h3>
              <div className="relative pl-4 space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-4 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                {EMPLOYEE_PROFILE.timeline.map((event, index) => (
                  <div key={index} className="relative pl-8">
                    {/* Dot */}
                    <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-white border-[3px] border-primary shadow-sm z-10"></div>
                    
                    <span className="text-xs font-bold text-primary block mb-1">{event.date}</span>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base">{event.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-1">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;