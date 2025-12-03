import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ArrowRight, CheckCircle } from 'lucide-react';
import type { Task } from '../types';
import { formatDateToInput, isSameDay } from '../utils/dateUtils';

interface CalendarBlockProps {
  tasks: Task[];
  onDayClick: (date: Date) => void;
}

function CalendarBlock({ tasks, onDayClick }: CalendarBlockProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Ottieni primo e ultimo giorno del mese
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Calcola giorni da mostrare (inclusi quelli del mese precedente/successivo)
  const startDayOfWeek = firstDay.getDay();
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // Lunedì = 0
  
  const daysInMonth = lastDay.getDate();
  const totalCells = Math.ceil((adjustedStartDay + daysInMonth) / 7) * 7;

  // Genera array di giorni
  const days: (Date | null)[] = [];
  for (let i = 0; i < totalCells; i++) {
    if (i < adjustedStartDay || i >= adjustedStartDay + daysInMonth) {
      days.push(null);
    } else {
      days.push(new Date(year, month, i - adjustedStartDay + 1));
    }
  }

  // Navigazione mesi
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Selettore manuale mese/anno
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(year, parseInt(e.target.value), 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(e.target.value), month, 1));
  };

  // Filtra task per un giorno specifico
  const getTasksForDay = (date: Date) => {
    const dateString = formatDateToInput(date);
    return {
      starting: tasks.filter(t => t.startDate === dateString),
      ending: tasks.filter(t => t.dueDate === dateString)
    };
  };

  // Controlla se è oggi
  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return isSameDay(date, today);
  };

  // Nomi mesi e giorni
  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];
  const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-4 sm:p-6">
        
        {/* Header Calendario */}
        <div className="space-y-4 mb-6">
          {/* Navigazione principale */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              title="Mese precedente"
            >
              <ChevronLeft size={20} className="text-slate-600 dark:text-slate-300" />
            </button>

            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
                {monthNames[month]} {year}
              </h2>
              <button
                onClick={goToToday}
                className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1"
              >
                Vai a oggi
              </button>
            </div>

            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              title="Mese successivo"
            >
              <ChevronRight size={20} className="text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Selettori Mese e Anno */}
          <div className="flex gap-3 justify-center">
            <select
              value={month}
              onChange={handleMonthChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              {monthNames.map((name, idx) => (
                <option key={idx} value={idx}>{name}</option>
              ))}
            </select>

            <select
              value={year}
              onChange={handleYearChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Griglia Calendario */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Intestazione giorni settimana */}
          {dayNames.map(day => (
            <div
              key={day}
              className="text-center text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 py-2"
            >
              {day}
            </div>
          ))}

          {/* Celle giorni */}
          {days.map((date, index) => {
            const dayTasks = date ? getTasksForDay(date) : { starting: [], ending: [] };
            const hasStarting = dayTasks.starting.length > 0;
            const hasEnding = dayTasks.ending.length > 0;
            const hasTasks = hasStarting || hasEnding;
            
            // Calcola la riga del giorno (0 = prima riga, 1 = seconda, ecc.)
            const row = Math.floor(index / 7);
            const isTopRows = row < 2; // Prime 2 righe: tooltip verso il basso

            return (
              <div key={index} className="relative group">
                <button
                  onClick={() => date && onDayClick(date)}
                  disabled={!date}
                  className={`
                    w-full aspect-square p-1 sm:p-2 rounded-lg transition-all relative
                    ${date ? 'hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer hover:scale-105' : 'cursor-default'}
                    ${isToday(date) ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500' : ''}
                    ${!date ? 'opacity-0' : ''}
                  `}
                >
                  {date && (
                    <>
                      {/* Numero giorno */}
                      <div className={`
                        text-sm sm:text-base font-semibold mb-1
                        ${isToday(date) ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}
                      `}>
                        {date.getDate()}
                      </div>

                      {/* Pallini Task */}
                      {hasTasks && (
                        <div className="flex flex-wrap gap-0.5 justify-center items-center min-h-[12px]">
                          {/* Pallini verdi per task che iniziano */}
                          {dayTasks.starting.map((task, i) => (
                            <div
                              key={`start-${task.id}-${i}`}
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 dark:bg-green-400"
                              title={`▶ Inizia: ${task.title}`}
                            />
                          ))}
                          {/* Pallini rossi per task che scadono */}
                          {dayTasks.ending.map((task, i) => (
                            <div
                              key={`end-${task.id}-${i}`}
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 dark:bg-red-400"
                              title={`⏰ Scade: ${task.title}`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </button>

                {/* Tooltip con lista task al hover */}
                {date && hasTasks && (
                  <div className={`hidden group-hover:block absolute z-50 ${isTopRows ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 -translate-x-1/2 w-72 pointer-events-none animate-in fade-in ${isTopRows ? 'slide-in-from-top-2' : 'slide-in-from-bottom-2'} duration-200`}>
                    {/* Freccia del tooltip */}
                    <div className={`absolute ${isTopRows ? '-top-1' : '-bottom-1'} left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-slate-800 border-t border-l border-gray-200 dark:border-slate-700 rotate-45 ${isTopRows ? '' : 'rotate-[225deg]'}`}></div>
                    
                    <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                      {/* Header con data */}
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-center">
                        <div className="font-bold text-sm text-white">
                          {date.toLocaleDateString('it-IT', { 
                            weekday: 'short',
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        </div>
                      </div>

                      {/* Contenuto task */}
                      <div className="p-3 space-y-3">
                        {hasStarting && (
                          <div>
                            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-gray-200 dark:border-slate-700">
                              <div className="p-1 bg-green-500/20 rounded">
                                <ArrowRight size={12} className="text-green-600 dark:text-green-400" />
                              </div>
                              <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">Iniziano</span>
                              <span className="ml-auto text-[10px] bg-green-500/20 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-semibold">
                                {dayTasks.starting.length}
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {dayTasks.starting.map(task => (
                                <div key={task.id} className="flex items-start gap-2 text-xs bg-green-50 dark:bg-slate-700/30 rounded-lg p-2 hover:bg-green-100 dark:hover:bg-slate-700/50 transition-colors border border-green-200 dark:border-transparent">
                                  <span className="text-green-600 dark:text-green-400 font-mono font-semibold text-[10px] mt-0.5 shrink-0">
                                    #{task.id}
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-200 leading-tight">
                                    {task.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {hasEnding && (
                          <div>
                            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-gray-200 dark:border-slate-700">
                              <div className="p-1 bg-red-500/20 rounded">
                                <CheckCircle size={12} className="text-red-600 dark:text-red-400" />
                              </div>
                              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">Scadono</span>
                              <span className="ml-auto text-[10px] bg-red-500/20 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full font-semibold">
                                {dayTasks.ending.length}
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {dayTasks.ending.map(task => (
                                <div key={task.id} className="flex items-start gap-2 text-xs bg-red-50 dark:bg-slate-700/30 rounded-lg p-2 hover:bg-red-100 dark:hover:bg-slate-700/50 transition-colors border border-red-200 dark:border-transparent">
                                  <span className="text-red-600 dark:text-red-400 font-mono font-semibold text-[10px] mt-0.5 shrink-0">
                                    #{task.id}
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-200 leading-tight">
                                    {task.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="bg-gray-50 dark:bg-slate-950/50 px-3 py-2 text-center border-t border-gray-200 dark:border-slate-700">
                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                          <span>Clicca per filtrare i task di questo giorno</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <ArrowRight size={14} className="text-green-500" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 dark:bg-green-400"></div>
              <span className="text-slate-600 dark:text-slate-400">Task Inizia</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-red-500" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 dark:bg-red-400"></div>
              <span className="text-slate-600 dark:text-slate-400">Task Scade</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} className="text-blue-500" />
              <span className="text-slate-600 dark:text-slate-400">Oggi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarBlock;

