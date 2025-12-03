import { useState, useEffect } from 'react';
import { LayoutGrid } from 'lucide-react';
import { useAppContext } from '../App';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import FilterPanel from '../components/FilterPanel';
import StatsPanel from '../components/StatsPanel';
import Footer from '../components/Footer';
import CalendarBlock from '../components/CalendarBlock';
import ReportBlock from '../components/ReportBlock';
import type { Task } from '../types';
import { formatDateToInput } from '../utils/dateUtils';

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { filter, setFilter, difficultyFilter, dateFilter, setDifficultyFilter, setDateFilter, isModalOpen, setIsModalOpen, isCalendarView, setIsCalendarView, isReportView } = useAppContext();

  // Carica i task iniziali
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Errore API:", err));
  }, []);

  // Filtra i task con logica multipla
  const filteredTasks = tasks.filter(task => {
    // Filtro stato
    if (filter !== 'all' && task.status !== filter) return false;

    // Filtro difficoltà
    if (difficultyFilter !== 'all' && task.difficulty !== difficultyFilter) return false;

    // Filtro date
    if (dateFilter !== 'all') {
      const now = new Date();
      const dueDate = task.dueDate ? new Date(task.dueDate) : null;
      const startDate = task.startDate ? new Date(task.startDate) : null;

      // Se dateFilter è una data specifica (formato YYYY-MM-DD)
      if (dateFilter.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Mostra task che iniziano O scadono in quel giorno
        return task.startDate === dateFilter || task.dueDate === dateFilter;
      }

      switch (dateFilter) {
        case 'overdue':
          // Scadute: hanno dueDate passata e non sono completate
          if (!dueDate || task.status === 'completed' || dueDate >= now) return false;
          break;
        case 'upcoming':
          // In scadenza prossimi 7 giorni: hanno dueDate nei prossimi 7 giorni
          if (!dueDate || task.status === 'completed') return false;
          const weekFromNow = new Date();
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          if (dueDate < now || dueDate > weekFromNow) return false;
          break;
        case 'not-started':
          // Da iniziare: hanno startDate futura
          if (!startDate || startDate <= now) return false;
          break;
      }
    }

    return true;
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

  // Gestisci click su giorno del calendario
  const handleDayClick = (date: Date) => {
    const dateString = formatDateToInput(date);
    
    // Torna alla vista task
    setIsCalendarView(false);
    
    // Reset filtri
    setFilter('all');
    setDifficultyFilter('all');
    
    // Imposta filtro per quel giorno specifico
    setDateFilter(dateString);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gestisci click su statistiche
  const handleStatClick = (type: 'all' | 'completed' | 'overdue' | 'todo' | 'in-progress' | 'not-started') => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset filtri avanzati prima di applicare il nuovo
    setDifficultyFilter('all');
    
    switch (type) {
      case 'all':
        setFilter('all');
        setDateFilter('all');
        break;
      case 'completed':
        setFilter('completed');
        setDateFilter('all');
        break;
      case 'overdue':
        setFilter('all');
        setDateFilter('overdue');
        break;
      case 'todo':
        setFilter('todo');
        setDateFilter('all');
        break;
      case 'in-progress':
        setFilter('in-progress');
        setDateFilter('all');
        break;
      case 'not-started':
        setFilter('all');
        setDateFilter('not-started');
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative pb-[6.75rem] lg:pb-0 pt-20 lg:pt-36 xl:pt-32 font-sans transition-colors duration-300">
      
      {/* Modal Creazione/Modifica Task */}
      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}

      {/* Stats Panel - Sidebar Sinistra */}
      <StatsPanel tasks={tasks} onStatClick={handleStatClick} />

      {/* Contenuto Principale */}
      <main className="max-w-4xl mx-auto flex-1 w-full px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* Vista Report */}
        {isReportView ? (
          <ReportBlock tasks={tasks} />
        ) : isCalendarView ? (
          <CalendarBlock tasks={tasks} onDayClick={handleDayClick} />
        ) : (
          <>
            {/* Pannello Filtri Avanzati - Hidden on Mobile */}
            <div className="hidden lg:block">
              <FilterPanel 
                difficultyFilter={difficultyFilter}
                setDifficultyFilter={setDifficultyFilter}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
              />
            </div>

            {/* Griglia Task */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                  Nessun task trovato con i filtri selezionati.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
