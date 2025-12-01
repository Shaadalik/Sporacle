import React from 'react';
import Button from '../components/Button';
import { playClickSound } from '../constants';
import { User, Mail, Building2, Sprout, FileText, ArrowLeft } from 'lucide-react';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const handleSwitch = () => {
    playClickSound();
    onSwitchToLogin();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    // In a real app, form validation and API calls would happen here
    onRegister();
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>

      <div className="w-full max-w-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white dark:border-gray-700 animate-slide-up relative z-10 my-4">
        
        <div className="flex flex-col items-center mb-6">
          {/* Smaller Logo for Register to save space */}
          <div className="mb-4 animate-logo-entrance flex items-center justify-center scale-75">
             <div className="w-24 h-24 rounded-full bg-green-50 dark:bg-gray-700 flex items-center justify-center shadow-lg shadow-green-100 dark:shadow-none overflow-hidden">
              <img 
                src="/assets/sp.jpeg" 
                alt="Sporacle Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Join the Sporacle Network</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div className="space-y-1 group">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="johndoe"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                onClick={() => playClickSound()}
              />
            </div>
          </div>

          <div className="space-y-1 group">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                placeholder="john@farm.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                onClick={() => playClickSound()}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="space-y-1 group">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Farm Name</label>
                <div className="relative">
                  <Sprout className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Green Acres"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                    onClick={() => playClickSound()}
                  />
                </div>
             </div>
             <div className="space-y-1 group">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Sporacle Inc."
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                    onClick={() => playClickSound()}
                  />
                </div>
             </div>
          </div>

          <div className="space-y-1 group">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">GST Number</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="22AAAAA0000A1Z5"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500 font-mono"
                onClick={() => playClickSound()}
              />
            </div>
          </div>

          <div className="space-y-1 group">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              minLength={8}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
              onClick={() => playClickSound()}
            />
          </div>

          <div className="space-y-1 group">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Confirm Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              minLength={8}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
              onClick={() => playClickSound()}
            />
          </div>

          <Button type="submit" fullWidth className="mt-6 shadow-lg shadow-green-200 dark:shadow-none">
            Create Account
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Already have an account? 
              <button 
                onClick={handleSwitch}
                className="ml-2 font-bold text-primary hover:text-green-600 transition-colors"
              >
                Sign In
              </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;