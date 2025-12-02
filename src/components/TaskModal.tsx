import { useState, useEffect } from 'react';
import { X, Trash2, Calendar, AlertCircle } from 'lucide-react';
import type { Task } from '../types';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id'> | Partial<Task>) => void;
  onDelete?: (taskId: string) => void;
}

function TaskModal({ task, onClose, onSave, onDelete }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'completed'>('todo');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [difficulty, setDifficulty] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setStartDate(task.startDate || '');
      setDueDate(task.dueDate || '');
      setDifficulty(task.difficulty || 'medium');
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setStartDate('');
      setDueDate('');
      setDifficulty('medium');
    }
    setDateError('');
  }, [task]);

  const validateDates = (start: string, due: string): boolean => {
    if (start && due) {
      const startDateObj = new Date(start);
      const dueDateObj = new Date(due);
      if (dueDateObj < startDateObj) {
        setDateError('La data di scadenza deve essere successiva alla data di inizio');
        return false;
      }
    }
    setDateError('');
    return true;
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    validateDates(value, dueDate);
  };

  const handleDueDateChange = (value: string) => {
    setDueDate(value);
    validateDates(startDate, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    if (!validateDates(startDate, dueDate)) return;

    setIsSubmitting(true);

    const taskData = task
      ? { title, description, status, startDate: startDate || undefined, dueDate: dueDate || undefined, difficulty }
      : { title, description, status, startDate: startDate || undefined, dueDate: dueDate || undefined, difficulty, createdAt: new Date().toISOString() };

    await onSave(taskData);
    setIsSubmitting(false);
  };

  const handleDelete = () => {
    if (task && onDelete && confirm('Sei sicuro di voler eliminare questa task?')) {
      onDelete(task.id);
      onClose();
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 p-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {task ? 'Modifica Task' : 'Nuovo Task'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Titolo</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Cosa devi fare?"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 transition-all dark:text-white"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrizione</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Aggiungi qualche dettaglio..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 transition-all dark:text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Calendar size={14} />
                Data Inizio
              </label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 transition-all dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Calendar size={14} />
                Scadenza
              </label>
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => handleDueDateChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 transition-all dark:text-white"
              />
            </div>
          </div>

          {dateError && (
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              <AlertCircle size={16} />
              <span>{dateError}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Difficoltà</label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    difficulty === diff
                      ? getDifficultyColor(diff) + ' ring-2 ring-offset-2 ring-current dark:ring-offset-slate-800'
                      : 'bg-gray-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {diff === 'low' ? 'Bassa' : diff === 'medium' ? 'Media' : 'Alta'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Stato</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'todo' | 'in-progress' | 'completed')}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 transition-all dark:text-white"
            >
              <option value="todo">Da fare</option>
              <option value="in-progress">In corso</option>
              <option value="completed">Completato</option>
            </select>
          </div>

          <div className="pt-2 flex justify-between items-center gap-3">
            {task && onDelete ? (
              <button 
                type="button"
                onClick={handleDelete}
                className="px-4 py-2.5 rounded-xl font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
              >
                <Trash2 size={18} />
                <span>Elimina</span>
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Annulla
              </button>
              <button 
                type="submit"
                disabled={!title.trim() || isSubmitting || !!dateError}
                className="px-5 py-2.5 rounded-xl font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200 dark:shadow-none"
              >
                {isSubmitting ? 'Salvataggio...' : task ? 'Aggiorna' : 'Crea Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
