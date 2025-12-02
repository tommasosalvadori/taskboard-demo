import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  difficultyFilter: string;
  setDifficultyFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
}

function FilterPanel({ difficultyFilter, setDifficultyFilter, dateFilter, setDateFilter }: FilterPanelProps) {
  const hasActiveFilters = difficultyFilter !== 'all' || dateFilter !== 'all';

  const resetFilters = () => {
    setDifficultyFilter('all');
    setDateFilter('all');
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-4 mb-6">
      
      <div className="flex items-center gap-4">
        
        {/* Icon + Title */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Filter size={16} className="text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Filtri:</span>
        </div>

        {/* Select Difficoltà */}
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
        >
          <option value="all">Tutte le difficoltà</option>
          <option value="low">🟢 Bassa</option>
          <option value="medium">🟡 Media</option>
          <option value="high">🔴 Alta</option>
        </select>

        {/* Select Tempistiche */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
        >
          <option value="all">Tutte le tempistiche</option>
          <option value="overdue">⚠️ Scadute</option>
          <option value="upcoming">⏰ In Scadenza (7gg)</option>
          <option value="not-started">📅 Da Iniziare</option>
        </select>

        {/* Reset Button - Sempre visibile */}
        <button
          onClick={resetFilters}
          disabled={!hasActiveFilters}
          className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
            hasActiveFilters
              ? 'text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
          title={hasActiveFilters ? "Reset filtri" : "Nessun filtro attivo"}
        >
          <X size={18} />
        </button>

      </div>
    </div>
  );
}

export default FilterPanel;
