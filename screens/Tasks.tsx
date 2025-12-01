import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_ALERTS, MOCK_TASKS, WORKERS, playClickSound } from '../constants';
import { Alert, Task, TaskStatus, Severity, Tab } from '../types';
import Button from '../components/Button';
import { CheckCircle, Clock, AlertTriangle, User, X, Check } from 'lucide-react';

interface TasksProps { onNavigate: (tab: Tab) => void; }

const Tasks: React.FC<TasksProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'tasks'>('alerts');
  const [showAssignModal, setShowAssignModal] = useState<Alert | null>(null);
  const [noteTask, setNoteTask] = useState<Task | null>(null);
  const [noteText, setNoteText] = useState<string>('');
  const [taskNotes, setTaskNotes] = useState<Record<string, string[]>>({});
  
  // Local state to simulate real interactivity
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('');

  const handleTabChange = (tab: 'alerts' | 'tasks') => {
    playClickSound();
    setActiveTab(tab);
  };

  const handleOpenAssign = (alert: Alert) => {
    setShowAssignModal(alert);
    setSelectedWorkerId(''); // Reset selection
  };

  const handleConfirmAssignment = () => {
    if (!showAssignModal) return;

    // Create new task from alert
    const worker = WORKERS.find(w => w.id === selectedWorkerId);
    const newTask: Task = {
      id: `t-${Date.now()}`,
      title: 'Corrective Action',
      location: showAssignModal.chamber,
      status: TaskStatus.PENDING,
      timestamp: 'Just now',
      description: `${showAssignModal.message}. Suggested: ${showAssignModal.action}`,
      assignedTo: worker?.name
    };

    // Update state
    setTasks([newTask, ...tasks]);
    setAlerts(alerts.filter(a => a.id !== showAssignModal.id));
    setShowAssignModal(null);
    
    // Switch to tasks tab to show result
    setActiveTab('tasks');

    // If user came from another tab (e.g., Trends), navigate back
    try {
      const ret = sessionStorage.getItem('returnTab') as Tab | null;
      if (ret) {
        sessionStorage.removeItem('returnTab');
        onNavigate(ret);
      }
    } catch {}
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: TaskStatus.COMPLETED } : t
    ));
  };

  const handleOpenNote = (task: Task) => {
    playClickSound();
    setNoteTask(task);
    setNoteText('');
  };

  const handleSaveNote = () => {
    if (!noteTask) return;
    const text = noteText.trim();
    if (!text) return;
    setTaskNotes(prev => ({
      ...prev,
      [noteTask.id]: [...(prev[noteTask.id] || []), text]
    }));
    setNoteTask(null);
    setNoteText('');

    // Navigate back to previous tab if requested
    try {
      const ret = sessionStorage.getItem('returnTab') as Tab | null;
      if (ret) {
        sessionStorage.removeItem('returnTab');
        onNavigate(ret);
      }
    } catch {}
  };

  // Manager View: Active Alerts
  const renderAlerts = () => (
    <div className="flex flex-col gap-4 animate-fade-in">
      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
           <CheckCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
           <p className="font-medium text-gray-500 dark:text-gray-400">All Clear! No active alerts.</p>
        </div>
      ) : (
        alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all duration-300 hover:shadow-md"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.26, delay: i * 0.04, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${alert.severity === Severity.CRITICAL ? 'bg-alert-red' : 'bg-alert-yellow'}`}></div>
            
            <div className="flex justify-between items-start mb-2 pl-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{alert.chamber} • {alert.timestamp}</span>
              {alert.severity === Severity.CRITICAL && <AlertTriangle className="w-4 h-4 text-alert-red animate-pulse" />}
            </div>
            
            <div className="pl-2 mb-4">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{alert.message}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg inline-block">
                Suggest: <span className="font-medium text-gray-800 dark:text-gray-200">{alert.action}</span>
              </p>
            </div>

            <div className="pl-2">
              <Button onClick={() => handleOpenAssign(alert)} variant="primary" className="w-full py-2 text-sm shadow-green-100 dark:shadow-none">
                Assign Task
              </Button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  // Worker View: My Tasks
  const renderMyTasks = () => (
    <div className="flex flex-col gap-4 animate-fade-in">
      {tasks.length === 0 && (
         <div className="flex flex-col items-center justify-center py-20 opacity-50">
           <CheckCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
           <p className="font-medium text-gray-500 dark:text-gray-400">No tasks assigned.</p>
        </div>
      )}
      {tasks.map((task, i) => (
        <motion.div
          key={task.id}
          className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 ${task.status === TaskStatus.COMPLETED ? 'opacity-60' : ''}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.26, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="flex justify-between items-start mb-3">
             <div className="flex flex-col">
               <span className="text-xs text-gray-400 mb-0.5">{task.location}</span>
               <h3 className={`font-bold text-lg text-gray-900 dark:text-white ${task.status === TaskStatus.COMPLETED ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
             </div>
             <div className={`px-2 py-1 rounded-md text-xs font-bold ${
               task.status === TaskStatus.PENDING ? 'bg-blue-50 dark:bg-blue-900/30 text-secondary dark:text-blue-300' :
               task.status === TaskStatus.IN_PROGRESS ? 'bg-yellow-50 dark:bg-yellow-900/30 text-alert-yellow dark:text-yellow-300' : 'bg-green-50 dark:bg-green-900/30 text-primary dark:text-green-300'
             }`}>
               {task.status.replace('_', ' ')}
             </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {task.description}
          </p>

          {task.status !== TaskStatus.COMPLETED && (
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1 py-3 text-sm" onClick={() => handleOpenNote(task)}>Add Note</Button>
              <Button 
                variant="primary" 
                className="flex-[2] py-3 text-sm flex items-center justify-center gap-2"
                onClick={() => handleCompleteTask(task.id)}
              >
                <CheckCircle className="w-4 h-4" />
                Mark Complete
              </Button>
            </div>
          )}
          {taskNotes[task.id] && taskNotes[task.id].length > 0 && (
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-3">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Notes</p>
              <ul className="space-y-2">
                {taskNotes[task.id].map((n, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-200 leading-snug">• {n}</li>
                ))}
              </ul>
            </div>
          )}
          {task.status === TaskStatus.COMPLETED && (
             <div className="flex items-center justify-center gap-2 text-primary dark:text-green-300 font-bold bg-green-50 dark:bg-green-900/20 py-3 rounded-xl">
               <Check className="w-5 h-5" /> Completed
             </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="pb-24 pt-4 min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      {/* Header Tabs */}
      <div className="px-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Alerts & Tasks</h1>
        <div className="bg-gray-200 dark:bg-gray-800 p-1 rounded-xl flex">
          <button 
            onClick={() => handleTabChange('alerts')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'alerts' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Active Alerts {alerts.length > 0 && <span className="ml-1 text-[10px] bg-alert-red text-white px-1.5 py-0.5 rounded-full">{alerts.length}</span>}
          </button>
          <button 
            onClick={() => handleTabChange('tasks')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'tasks' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            My Tasks {tasks.filter(t => t.status !== TaskStatus.COMPLETED).length > 0 && <span className="ml-1 text-[10px] bg-secondary text-white px-1.5 py-0.5 rounded-full">{tasks.filter(t => t.status !== TaskStatus.COMPLETED).length}</span>}
          </button>
        </div>
      </div>

      <div className="px-6">
        {activeTab === 'alerts' ? renderAlerts() : renderMyTasks()}
      </div>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 w-full sm:w-96 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold dark:text-white">Assign Task</h3>
              <button 
                onClick={() => { playClickSound(); setShowAssignModal(null); }} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full active:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Task Name</label>
              <input 
                type="text" 
                defaultValue={`Fix: ${showAssignModal.message}`}
                className="w-full border-b-2 border-gray-200 dark:border-gray-600 py-2 text-gray-900 dark:text-white font-medium focus:border-primary outline-none bg-transparent"
                onFocus={() => playClickSound()}
              />
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">Select Worker</label>
              <div className="space-y-2">
                {WORKERS.map(worker => (
                  <label 
                    key={worker.id} 
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary cursor-pointer transition-colors has-[:checked]:border-primary has-[:checked]:bg-green-50 dark:has-[:checked]:bg-green-900/20 active:scale-[0.98]"
                    onClick={() => playClickSound()}
                  >
                    <div className="flex items-center gap-3">
                      <img src={worker.avatar} alt={worker.name} className="w-8 h-8 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">{worker.name}</p>
                        <p className={`text-xs ${worker.status === 'AVAILABLE' ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>{worker.status}</p>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="worker" 
                      className="accent-primary w-4 h-4" 
                      checked={selectedWorkerId === worker.id}
                      onChange={() => setSelectedWorkerId(worker.id)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <Button 
              fullWidth 
              onClick={handleConfirmAssignment}
              disabled={!selectedWorkerId}
              className={!selectedWorkerId ? 'opacity-50' : ''}
            >
              Confirm Assignment
            </Button>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {noteTask && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 w-full sm:w-96 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold dark:text-white">Add Note</h3>
              <button 
                onClick={() => { playClickSound(); setNoteTask(null); }} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full active:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Task</label>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{noteTask.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{noteTask.location}</div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Note</label>
              <textarea
                rows={4}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add details, observations, or next steps..."
                className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => { playClickSound(); setNoteTask(null); }}>Cancel</Button>
                <Button className="flex-[2]" onClick={() => { playClickSound(); handleSaveNote(); setActiveTab('tasks'); }} disabled={!noteText.trim()}>
                Save Note
                </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;