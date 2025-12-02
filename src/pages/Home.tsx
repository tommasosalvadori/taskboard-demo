import { useState, useEffect } from 'react';
import { LayoutGrid } from 'lucide-react';
import { useAppContext } from '../App';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import type { Task } from '../types';

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { filter, isModalOpen, setIsModalOpen } = useAppContext();

  // Carica i task iniziali
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Errore API:", err));
  }, []);

  // Filtra i task
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  // Crea nuovo task
  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });

      if (res.ok) {
        const newTask = await res.json();
        setTasks(prev => [...prev, newTask]);
      }
    } catch (error) {
      console.error("Errore creazione task:", error);
    }
  };

  // Aggiorna task esistente
  const handleUpdateTask = async (taskData: Partial<Task>) => {
    if (!editingTask) return;

    try {
      const res = await fetch(`http://localhost:3000/tasks/${editingTask.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });

      if (res.ok) {
        const updatedTask = await res.json();
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
      }
    } catch (error) {
      console.error("Errore aggiornamento task:", error);
    }
  };

  // Elimina task
  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setTasks(prev => prev.filter(t => t.id !== taskId));
      }
    } catch (error) {
      console.error("Errore eliminazione task:", error);
    }
  };

  // Apri modal per modifica
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Chiudi modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Salva task (crea o aggiorna)
  const handleSaveTask = async (taskData: Omit<Task, 'id'> | Partial<Task>) => {
    if (editingTask) {
      await handleUpdateTask(taskData);
    } else {
      await handleCreateTask(taskData as Omit<Task, 'id'>);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen relative pb-20 pt-32 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      
      {/* Modal Creazione/Modifica Task */}
      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}

      {/* Griglia Task */}
      <main className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
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

export default Home;
