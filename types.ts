export enum Severity {
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING',
  NORMAL = 'NORMAL',
  OFFLINE = 'OFFLINE'
}

export enum Tab {
  HOME = 'HOME',
  STATS = 'STATS',
  TRENDS = 'TRENDS',
  TASKS = 'TASKS',
  PROGRESS = 'PROGRESS',
  CAMERA = 'CAMERA',
  SETTINGS = 'SETTINGS'
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE'
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: Severity;
  history: number[]; // For sparkline
  isFan?: boolean; // Special property for AER tile
  isActive?: boolean; // For fan rotation
}

export interface Alert {
  id: string;
  chamber: string;
  timestamp: string;
  message: string;
  action: string;
  severity: Severity;
}

export interface Task {
  id: string;
  title: string;
  location: string;
  assignedTo?: string; // If undefined, unassigned
  status: TaskStatus;
  timestamp: string;
  description: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
  avatar: string;
}

export type Sender = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}