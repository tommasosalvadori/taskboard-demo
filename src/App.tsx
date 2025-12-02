import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  LayoutGrid, 
  Moon, 
  Sun,
  Plus,
  X
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'todo';
  createdAt: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isDark, setIsDark] = useState(false);
  
  // Stato per la modale di creazione
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carica i task iniziali
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Errore API:", err));
  }, []);

  // Gestione Dark Mode
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  // Gestione creazione Task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setIsSubmitting(true);

    const newTask = {
      id: Date.now().toString(), // ID temporaneo univoco
      title: newTaskTitle,
      description: newTaskDesc,
      status: 'todo',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });

      if (res.ok) {
        // Aggiornamento ottimistico della UI
        setTasks(prev => [...prev, newTask as Task]);
        setNewTaskTitle('');
        setNewTaskDesc('');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Errore creazione task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtra i task
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen relative pb-20 pt-32 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      
      {/* Floating Header */}
      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1 p-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/20">
          
          {[
            { id: 'all', icon: LayoutGrid, label: 'Tutti' },
            { id: 'todo', icon: Circle, label: 'Da fare' },
            { id: 'in-progress', icon: Clock, label: 'In corso' },
            { id: 'completed', icon: CheckCircle2, label: 'Completati' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              title={label}
              className={`p-2.5 rounded-full transition-all duration-200 ${
                filter === id 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              <Icon size={18} strokeWidth={2.5} />
            </button>
          ))}

          <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1"></div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            title="Nuovo Task"
          >
            <Plus size={18} strokeWidth={3} />
          </button>

          <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1"></div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-full text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-all"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Modal Creazione Task */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Nuovo Task</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Titolo</label>
                <input 
                  type="text" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Cosa devi fare?"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 transition-all dark:text-white"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrizione</label>
                <textarea 
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Aggiungi qualche dettaglio..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 transition-all dark:text-white resize-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Annulla
                </button>
                <button 
                  type="submit"
                  disabled={!newTaskTitle.trim() || isSubmitting}
                  className="px-5 py-2.5 rounded-xl font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200 dark:shadow-none"
                >
                  {isSubmitting ? 'Salvataggio...' : 'Crea Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Griglia Task */}
      <main className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <article 
              key={task.id} 
              className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusColor(task.status)}`}>
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
              
              <div className="pt-4 border-t border-gray-100 dark:border-slate-700/50 flex items-center text-xs text-slate-400">
                <Clock size={12} className="mr-1.5" />
                {new Date(task.createdAt).toLocaleDateString('it-IT', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
            </article>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex p-4 rounded-full bg-gray-50 dark:bg-slate-800/50 mb-4 text-slate-300 dark:text-slate-600">
              <LayoutGrid size={48} strokeWidth={1} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Nessun task trovato.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
