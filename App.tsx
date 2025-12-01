import React, { useState, useEffect } from 'react';
import { Tab } from './types';
import Layout from './components/Layout';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import Trends from './screens/Trends';
import Tasks from './screens/Tasks';
import Progress from './screens/Progress';
import Settings from './screens/Settings';
import Stats from './screens/Stats';
import { Camera } from 'lucide-react';
import { playClickSound } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode class to HTML element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = () => {
    playClickSound();
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthView('login');
    setActiveTab(Tab.HOME);
  }

  const handleNavigate = (tab: Tab) => {
    setActiveTab(tab);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!isLoggedIn) {
    if (authView === 'register') {
      return (
        <Register 
          onRegister={handleLogin} 
          onSwitchToLogin={() => setAuthView('login')} 
        />
      );
    }
    return (
      <Login 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setAuthView('register')} 
      />
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <Dashboard onNavigate={handleNavigate} />;
      case Tab.STATS:
        return <Stats />;
      case Tab.TRENDS:
        return <Trends onNavigate={handleNavigate} />;
      case Tab.TASKS:
        return <Tasks onNavigate={handleNavigate} />;
      case Tab.PROGRESS:
        return <Progress />;
      case Tab.CAMERA:
        // Placeholder for Camera screen
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-gray-400 animate-fade-in bg-background dark:bg-gray-900 transition-colors duration-300">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Growth Log</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Camera feed placeholder</p>
                <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium shadow-lg shadow-green-200 dark:shadow-none active:scale-95 transition-transform" onClick={() => playClickSound()}>
                  Take Photo
                </button>
            </div>
        );
      case Tab.SETTINGS:
        return (
          <Settings 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode} 
            onLogout={handleLogout}
          />
        );
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderScreen()}
    </Layout>
  );
};

export default App;