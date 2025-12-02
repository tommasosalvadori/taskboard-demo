import { Clock, Trash2 } from 'lucide-react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Sei sicuro di voler eliminare questa task?')) {
      onDelete(task.id);
    }
  };

  return (
    <article 
      onClick={() => onEdit(task)}
      className="group relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ')}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400 group-hover:text-slate-500 transition-colors">
            #{task.id}
          </span>
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 transition-all"
            title="Elimina task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 leading-tight">
        {task.title}
      </h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
        {task.description}
      </p>
      
      <div className="pt-4 border-t border-gray-100 dark:border-slate-700/50 flex items-center text-xs text-slate-400">
        <Clock size={12} className="mr-1.5" />
        {new Date(task.createdAt).toLocaleDateString('it-IT', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        })}
      </div>
    </article>
  );
}

export default TaskCard;
