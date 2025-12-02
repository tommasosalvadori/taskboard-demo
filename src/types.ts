export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'todo';
  createdAt: string;
}

