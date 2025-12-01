import React from 'react';
import Button from '../components/Button';
import { playClickSound } from '../constants';

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>

      <div className="w-full max-w-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white dark:border-gray-700 animate-slide-up relative z-10">
        <div className="flex flex-col items-center mb-10">
          {/* Logo with Entrance Animation */}
          <div className="mb-6 animate-logo-entrance flex items-center justify-center">
             <div className="w-24 h-24 rounded-full bg-green-50 dark:bg-gray-700 flex items-center justify-center shadow-lg shadow-green-100 dark:shadow-none overflow-hidden">
              <img 
                src="/assets/sp.jpeg" 
                alt="Sporacle Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Sporacle</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Farm Management OS</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Email</label>
            <input 
              type="email" 
              defaultValue="manager@sporacle.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
              onClick={() => playClickSound()}
            />
          </div>
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Password</label>
            <input 
              type="password" 
              defaultValue="password123"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
              onClick={() => playClickSound()}
            />
          </div>

          <Button type="submit" fullWidth className="mt-4 shadow-lg shadow-green-200 dark:shadow-none">
            Sign In
          </Button>

          <div className="flex flex-col items-center gap-4 mt-6">
            <p 
              onClick={() => playClickSound()}
              className="text-xs text-gray-400 font-medium cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 active:text-gray-800 transition-colors"
            >
              Forgot Password?
            </p>
            <div className="w-full h-px bg-gray-100 dark:bg-gray-700"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Don't have an account? 
              <button 
                type="button"
                onClick={() => { playClickSound(); onSwitchToRegister(); }}
                className="ml-2 font-bold text-primary hover:text-green-600 transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;