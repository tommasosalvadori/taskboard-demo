import { useState, useEffect, useRef } from 'react';
import { LayoutGrid, CheckCircle2, AlertTriangle, Clock, Circle, Calendar } from 'lucide-react';
import type { Task } from '../types';

interface StatsPanelProps {
  tasks: Task[];
  onStatClick: (type: 'all' | 'completed' | 'overdue' | 'todo' | 'in-progress' | 'not-started') => void;
}

function StatsPanel({ tasks, onStatClick }: StatsPanelProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'fixed' | 'absolute'>('fixed');
  const [bottom, setBottom] = useState<number | undefined>(undefined);

  // Calcola statistiche
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const overdue = tasks.filter(t => 
    t.dueDate && 
    new Date(t.dueDate) < new Date() && 
    t.status !== 'completed'
  ).length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const notStarted = tasks.filter(t => {
    if (!t.startDate) return false;
    return new Date(t.startDate) > new Date();
  }).length;

  // Rileva vicinanza al footer
  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      const footer = document.querySelector('footer');
      if (!footer) return;

      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      
      // Solo se la sidebar sta per toccare il footer
      if (sidebarRect.bottom >= footerRect.top - 20) {
        setPosition('absolute');
        const footerOffsetFromBottom = document.body.scrollHeight - footer.offsetTop;
        setBottom(footerOffsetFromBottom + 20);
      } else if (position === 'absolute') {
        // Ritorna a fixed solo se era in absolute
        setPosition('fixed');
        setBottom(undefined);
      }
    };

    // Delay iniziale per evitare problemi al refresh
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [position]);

  const stats = [
    {
      type: 'all' as const,
      label: 'Totali',
      value: total,
      icon: LayoutGrid,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      type: 'completed' as const,
      label: 'Completati',
      value: completed,
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      type: 'overdue' as const,
      label: 'In Ritardo',
      value: overdue,
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      type: 'todo' as const,
      label: 'Da Fare',
      value: todo,
      icon: Circle,
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-50 dark:bg-gray-900/20'
    },
    {
      type: 'in-progress' as const,
      label: 'In Corso',
      value: inProgress,
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      type: 'not-started' as const,
      label: 'Da Iniziare',
      value: notStarted,
      icon: Calendar,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <>
      {/* DESKTOP - Sidebar Compatta */}
      <aside 
        ref={sidebarRef}
        className={`${position === 'fixed' ? 'fixed top-32' : 'absolute'} left-8 z-40 w-56 hidden xl:block`}
        style={position === 'absolute' ? { bottom: `${bottom}px` } : undefined}
      >
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-3 space-y-2">
          
          {/* Header Compatto */}
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-slate-700">
            <LayoutGrid size={14} className="text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">Riepilogo</h3>
          </div>

          {/* Stats Cards - Icona in Alto a Destra */}
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.label}
                onClick={() => onStatClick(stat.type)}
                className={`w-full ${stat.bgColor} rounded-xl p-3 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-left active:scale-100 relative`}
              >
                {/* Icona in Alto a Destra */}
                <div className="absolute top-2.5 right-2.5">
                  <Icon size={18} strokeWidth={2.5} className={stat.color} />
                </div>
                
                {/* Numero Grande in Alto */}
                <div className={`text-2xl font-bold ${stat.color} leading-none mb-1.5`}>
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </button>
            );
          })}

        </div>
      </aside>

      {/* MOBILE - Solo le principali 4 metriche */}
      <div className="xl:hidden mb-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-4">
          <div className="grid grid-cols-4 gap-3">
            {stats.slice(0, 4).map((stat) => {
              const Icon = stat.icon;
              return (
                <button
                  key={stat.label}
                  onClick={() => onStatClick(stat.type)}
                  className={`${stat.bgColor} rounded-xl p-3 text-center transition-all hover:scale-105 cursor-pointer active:scale-100`}
                >
                  <div className={`inline-flex p-2 rounded-lg bg-white dark:bg-slate-800 mb-2 ${stat.color}`}>
                    <Icon size={18} strokeWidth={2.5} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsPanel;
