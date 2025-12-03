import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, CheckCircle2, AlertTriangle, Clock, Calendar, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Task } from '../types';
import { parseLocalDate } from '../utils/dateUtils';

interface ReportBlockProps {
  tasks: Task[];
}

function ReportBlock({ tasks }: ReportBlockProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dataScope, setDataScope] = useState<'monthly' | 'all'>('monthly');

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // Navigazione mesi
  const goToPreviousMonth = () => {
    setSelectedDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(year, month + 1, 1));
  };

  const goToCurrentMonth = () => {
    setSelectedDate(new Date());
  };

  // Selettore manuale mese/anno
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(new Date(year, parseInt(e.target.value), 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(new Date(parseInt(e.target.value), month, 1));
  };

  // Calcola statistiche
  const calculateStats = (taskList: Task[]) => {
    const totalTasks = taskList.length;
    const completedTasks = taskList.filter(t => t.status === 'completed').length;
    const todoTasks = taskList.filter(t => t.status === 'todo').length;
    const inProgressTasks = taskList.filter(t => t.status === 'in-progress').length;
    
    // Task in ritardo
    const overdueTasks = taskList.filter(t => {
      if (!t.dueDate || t.status === 'completed') return false;
      const dueDate = parseLocalDate(t.dueDate);
      return dueDate < new Date();
    }).length;

    // Durata media (in giorni)
    const tasksWithDuration = taskList.filter(t => t.startDate && t.dueDate);
    const avgDuration = tasksWithDuration.length > 0
      ? tasksWithDuration.reduce((sum, task) => {
          const start = parseLocalDate(task.startDate!);
          const due = parseLocalDate(task.dueDate!);
          const duration = Math.ceil((due.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          return sum + duration;
        }, 0) / tasksWithDuration.length
      : 0;

    // Task per difficoltà
    const byDifficulty = {
      low: taskList.filter(t => t.difficulty === 'low').length,
      medium: taskList.filter(t => t.difficulty === 'medium').length,
      high: taskList.filter(t => t.difficulty === 'high').length,
    };

    return {
      total: totalTasks,
      completed: completedTasks,
      todo: todoTasks,
      inProgress: inProgressTasks,
      overdue: overdueTasks,
      avgDuration: Math.round(avgDuration * 10) / 10,
      byDifficulty
    };
  };

  // Filtra task del mese o usa tutti
  const getTaskList = () => {
    if (dataScope === 'all') {
      return tasks;
    } else {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      return tasks.filter(task => {
        const startDate = task.startDate ? parseLocalDate(task.startDate) : null;
        const dueDate = task.dueDate ? parseLocalDate(task.dueDate) : null;

        return (
          (startDate && startDate >= firstDay && startDate <= lastDay) ||
          (dueDate && dueDate >= firstDay && dueDate <= lastDay)
        );
      });
    }
  };

  const currentTasks = getTaskList();
  const stats = calculateStats(currentTasks);

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

  // Dati per il grafico a torta - Distribuzione per Difficoltà
  const pieChartData = [
    { name: 'Bassa', value: stats.byDifficulty.low, color: '#10b981' },
    { name: 'Media', value: stats.byDifficulty.medium, color: '#eab308' },
    { name: 'Alta', value: stats.byDifficulty.high, color: '#ef4444' },
  ].filter(item => item.value > 0);

  const COLORS = pieChartData.map(d => d.color);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Compatto */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Report {dataScope === 'monthly' ? 'Mensile' : 'Completo'}
          {dataScope === 'monthly' && isCurrentMonth && (
            <span className="ml-3 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">Mese corrente</span>
          )}
        </h2>

        {/* Controlli Compatti */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Toggle Scope */}
            <div className="flex bg-gray-100 dark:bg-slate-900 rounded-lg p-1">
              <button
                onClick={() => setDataScope('monthly')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  dataScope === 'monthly'
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Mensile
              </button>
              <button
                onClick={() => setDataScope('all')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  dataScope === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Tutti
              </button>
            </div>

            {/* Navigazione Mese - Solo se scope è monthly */}
            {dataScope === 'monthly' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPreviousMonth}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <ChevronLeft size={18} className="text-slate-600 dark:text-slate-300" />
                </button>
                
                <select
                  value={month}
                  onChange={handleMonthChange}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {monthNames.map((name, idx) => (
                    <option key={idx} value={idx}>{name}</option>
                  ))}
                </select>

                <select
                  value={year}
                  onChange={handleYearChange}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                <button
                  onClick={goToNextMonth}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <ChevronRight size={18} className="text-slate-600 dark:text-slate-300" />
                </button>

                <button
                  onClick={goToCurrentMonth}
                  className="ml-2 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  Oggi
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid Compatto */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Totali', value: stats.total, icon: TrendingUp, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Completati', value: stats.completed, icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'In Corso', value: stats.inProgress, icon: Clock, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
          { label: 'In Ritardo', value: stats.overdue, icon: AlertTriangle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-xl p-4 transition-all`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={20} strokeWidth={2.5} className={stat.color} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grafico a Torta + Dettagli */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Grafico a Torta */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-slate-600 dark:text-slate-300" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Distribuzione per Difficoltà</h3>
          </div>
          
          {stats.total > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Nessun task disponibile</p>
            </div>
          )}
        </div>

        {/* Dettagli Aggiuntivi */}
        <div className="space-y-6">
          {/* Tasso Completamento */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Completamento</h3>
            {stats.total > 0 ? (
              <>
                <div className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                  {Math.round((stats.completed / stats.total) * 100)}%
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden mb-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stats.completed} di {stats.total} task completati
                </p>
              </>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">N/A</p>
            )}
          </div>

          {/* Durata Media */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-slate-600 dark:text-slate-300" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Durata Media</h3>
            </div>
            {stats.avgDuration > 0 ? (
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {stats.avgDuration}
                <span className="text-xl ml-2">gg</span>
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">N/A</p>
            )}
          </div>
        </div>

      </div>

      {/* Difficoltà Compatta */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Per Difficoltà</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {stats.byDifficulty.low}
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Bassa</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              {stats.byDifficulty.medium}
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Media</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
              {stats.byDifficulty.high}
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Alta</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportBlock;

