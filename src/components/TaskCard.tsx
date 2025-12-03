import { Clock, Calendar, AlertTriangle } from 'lucide-react';
import type { Task } from '../types';
import { parseLocalDate } from '../utils/dateUtils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  index?: number;
}

function TaskCard({ task, onEdit, index = 0 }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'low': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'high': return 'text-red-600 dark:text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case 'low': return 'Bassa';
      case 'medium': return 'Media';
      case 'high': return 'Alta';
      default: return '';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = parseLocalDate(dateString);
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status === 'completed') return false;
    const dueDate = parseLocalDate(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <article 
      onClick={() => onEdit(task)}
      className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in-up"
      style={{
        animationDelay: `${index * 0.05}s`,
        animationFillMode: 'backwards'
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ')}
        </span>
        <span className="text-xs font-medium text-slate-400 group-hover:text-slate-500 transition-colors">
          #{task.id}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 leading-tight">
        {task.title}
      </h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
        {task.description}
      </p>

      {/* Date e Difficoltà */}
      <div className="space-y-2 mb-4">
        {(task.startDate || task.dueDate) && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Calendar size={12} />
            {task.startDate && <span>{formatDate(task.startDate)}</span>}
            {task.startDate && task.dueDate && <span>→</span>}
            {task.dueDate && (
              <span className={isOverdue() ? 'text-red-600 dark:text-red-400 font-semibold flex items-center gap-1' : ''}>
                {isOverdue() && <AlertTriangle size={12} />}
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        )}

        {task.difficulty && (
          <div className={`flex items-center gap-1.5 text-xs font-semibold ${getDifficultyColor(task.difficulty)}`}>
            <div className="flex gap-0.5">
              {[1, 2, 3].map((level) => (
                <div 
                  key={level}
                  className={`w-1 h-3 rounded-full ${
                    (task.difficulty === 'low' && level === 1) ||
                    (task.difficulty === 'medium' && level <= 2) ||
                    (task.difficulty === 'high' && level <= 3)
                      ? 'bg-current'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <span>{getDifficultyLabel(task.difficulty)}</span>
          </div>
        )}
      </div>
      
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
