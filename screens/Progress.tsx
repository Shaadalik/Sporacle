import React, { useState } from 'react';
import { Leaf, Clock, AlertCircle, Sprout, Info, ChevronRight, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../constants';

// --- Types for this specific component ---
interface Phase {
  name: string;
  startDay: number;
  duration: number;
  color: string;
}

interface MushroomLifecycle {
  varietyName: string;
  chamberId: string;
  currentDay: number;
  totalDays: number;
  emoji: string;
  phases: Phase[];
}

// --- MOCK DATA ---
const MUSHROOM_DATA: MushroomLifecycle[] = [
  {
    varietyName: "Shiitake",
    chamberId: "Chamber 1",
    currentDay: 45,
    totalDays: 100,
    emoji: "🍄",
    phases: [
      { name: "Mycelial Run", startDay: 1, duration: 60, color: "bg-green-700" },
      { name: "Pinning Induction", startDay: 61, duration: 20, color: "bg-orange-500" },
      { name: "Fruiting & Harvest", startDay: 81, duration: 20, color: "bg-amber-700" }
    ]
  },
  {
    varietyName: "Oyster",
    chamberId: "Chamber 2",
    currentDay: 28,
    totalDays: 35,
    emoji: "🍄",
    phases: [
      { name: "Mycelial Run", startDay: 1, duration: 15, color: "bg-blue-600" },
      { name: "Pinning Induction", startDay: 16, duration: 5, color: "bg-cyan-500" },
      { name: "Fruiting & Harvest", startDay: 21, duration: 14, color: "bg-indigo-600" }
    ]
  },
  {
    varietyName: "Button",
    chamberId: "Chamber 3",
    currentDay: 90,
    totalDays: 105,
    emoji: "🍄",
    phases: [
      { name: "Phase 1", startDay: 1, duration: 30, color: "bg-green-800" },
      { name: "Phase 2", startDay: 31, duration: 40, color: "bg-green-600" },
      { name: "Pinning & Casing", startDay: 71, duration: 15, color: "bg-yellow-500" },
      { name: "Fruiting & Harvest", startDay: 86, duration: 19, color: "bg-amber-900" }
    ]
  },
  {
    varietyName: "Milky",
    chamberId: "Chamber 4",
    currentDay: 30,
    totalDays: 55,
    emoji: "🍄",
    phases: [
      { name: "Mycelial Run", startDay: 1, duration: 25, color: "bg-purple-700" },
      { name: "Casing & Pinning", startDay: 26, duration: 10, color: "bg-pink-500" },
      { name: "Fruiting & Harvest", startDay: 36, duration: 19, color: "bg-gray-400" }
    ]
  },
  {
    varietyName: "Lion's Mane",
    chamberId: "Chamber 5",
    currentDay: 10,
    totalDays: 45,
    emoji: "🍄",
    phases: [
      { name: "Mycelial Run", startDay: 1, duration: 20, color: "bg-teal-600" },
      { name: "Pinning Induction", startDay: 21, duration: 5, color: "bg-yellow-600" },
      { name: "Fruiting & Harvest", startDay: 26, duration: 19, color: "bg-pink-700" }
    ]
  },
  {
    varietyName: "Enoki",
    chamberId: "Chamber 6",
    currentDay: 48,
    totalDays: 50,
    emoji: "🍄",
    phases: [
      { name: "Mycelial Run", startDay: 1, duration: 30, color: "bg-indigo-700" },
      { name: "Pinning Induction", startDay: 31, duration: 10, color: "bg-cyan-500" },
      { name: "Fruiting", startDay: 41, duration: 9, color: "bg-gray-500" },
      { name: "Harvest Window", startDay: 50, duration: 1, color: "bg-red-600" }
    ]
  },
  {
    varietyName: "Portobello",
    chamberId: "Chamber 7",
    currentDay: 5,
    totalDays: 70,
    emoji: "🍄",
    phases: [
      { name: "Incubation/Run", startDay: 1, duration: 40, color: "bg-green-900" },
      { name: "Casing & Pinning", startDay: 41, duration: 10, color: "bg-lime-700" },
      { name: "Fruiting & Harvest", startDay: 51, duration: 19, color: "bg-amber-900" }
    ]
  }
];

const Progress: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (chamberId: string) => {
    playClickSound();
    setExpandedId(expandedId === chamberId ? null : chamberId);
  };

  const getDaysRemaining = (total: number, current: number) => {
    return Math.max(0, total - current);
  };

  const getCurrentPhase = (lifecycle: MushroomLifecycle) => {
    let dayCount = 0;
    for (const phase of lifecycle.phases) {
      if (lifecycle.currentDay >= phase.startDay && lifecycle.currentDay < (phase.startDay + phase.duration)) {
        return phase.name;
      }
      dayCount += phase.duration;
    }
    return lifecycle.currentDay >= lifecycle.totalDays ? "Ready for Harvest" : "Unknown Phase";
  };

  return (
    <div className="pb-24 pt-4 min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      
      {/* Header */}
      <div className="px-6 mb-6 flex items-center gap-3">
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cultivation Progress</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Lifecycle tracking across chambers</p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {MUSHROOM_DATA.map((mushroom) => {
          const daysRemaining = getDaysRemaining(mushroom.totalDays, mushroom.currentDay);
          const isCritical = daysRemaining <= 5;
          const progressPercent = Math.min(100, (mushroom.currentDay / mushroom.totalDays) * 100);
          const currentPhaseName = getCurrentPhase(mushroom);
          const isExpanded = expandedId === mushroom.chamberId;

          return (
            <div 
              key={mushroom.chamberId} 
              className={`
                bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 
                overflow-hidden transition-all duration-300
                ${isCritical ? 'ring-1 ring-alert-red/30' : ''}
              `}
            >
              {/* Card Header / Main Info */}
              <div 
                className="p-5 cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/50 transition-colors"
                onClick={() => toggleExpand(mushroom.chamberId)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl bg-gray-50 dark:bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full shadow-inner">
                      {mushroom.emoji}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                        {mushroom.varietyName}
                        {isCritical && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        )}
                      </h3>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{mushroom.chamberId}</p>
                    </div>
                  </div>
                  
                  {/* Days Remaining Badge */}
                  <div className={`
                    px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm
                    ${isCritical 
                      ? 'bg-red-50 dark:bg-red-900/30 text-alert-red animate-pulse' 
                      : 'bg-green-50 dark:bg-green-900/30 text-primary'}
                  `}>
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold whitespace-nowrap">
                      {daysRemaining === 0 ? "HARVEST NOW" : `${daysRemaining} Days Left`}
                    </span>
                  </div>
                </div>

                {/* Main Progress Bar Container */}
                <div className="relative h-6 w-full rounded-full overflow-hidden flex bg-gray-100 dark:bg-gray-700 shadow-inner">
                  {/* Generate Segments based on Phases */}
                  {mushroom.phases.map((phase, idx) => {
                    const widthPercent = (phase.duration / mushroom.totalDays) * 100;
                    return (
                      <div 
                        key={idx}
                        style={{ width: `${widthPercent}%` }}
                        className={`${phase.color} h-full relative group border-r border-white/10 last:border-0`}
                      >
                         {/* Hover Tooltip (Desktop) / Minimal Label */}
                      </div>
                    );
                  })}

                  {/* Current Day Indicator Overlay */}
                  <div 
                    style={{ left: `${progressPercent}%` }} 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 transition-all duration-1000 ease-out"
                  >
                    <div className="absolute -top-1 -left-[5px] w-3.5 h-3.5 bg-white rounded-full shadow-md border-2 border-primary"></div>
                  </div>
                </div>

                {/* Sub-info: Current Day & Phase */}
                <div className="flex justify-between items-center mt-3">
                   <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                     Day <span className="text-gray-900 dark:text-white font-bold">{mushroom.currentDay}</span> / {mushroom.totalDays}
                   </p>
                   <p className="text-xs font-bold text-primary dark:text-green-400 flex items-center gap-1">
                     <Sprout className="w-3 h-3" />
                     {currentPhaseName}
                   </p>
                </div>
              </div>

              {/* Expanded Details / Legend */}
              {isExpanded && (
                <div className="bg-gray-50 dark:bg-gray-900/50 p-5 border-t border-gray-100 dark:border-gray-700 animate-slide-up">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Lifecycle Phases
                  </h4>
                  <div className="space-y-3">
                    {mushroom.phases.map((phase, idx) => {
                      const isCurrentPhase = mushroom.currentDay >= phase.startDay && mushroom.currentDay < (phase.startDay + phase.duration);
                      const isCompleted = mushroom.currentDay >= (phase.startDay + phase.duration);
                      
                      return (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                             <div className={`w-3 h-3 rounded-full ${phase.color} shadow-sm`}></div>
                             <span className={`font-medium ${isCurrentPhase ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
                               {phase.name}
                             </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{phase.duration} days</span>
                            {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                            {isCurrentPhase && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {isCritical && (
                    <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-alert-red/20 shadow-sm flex gap-3 items-start">
                      <AlertCircle className="w-5 h-5 text-alert-red flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-alert-red uppercase mb-0.5">Harvest Window Active</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          This chamber is approaching peak maturity. Prepare harvest crews and check storage capacity.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;