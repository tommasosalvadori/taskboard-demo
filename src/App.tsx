import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  LayoutGrid, 
  Moon, 
  Sun,
  Plus,
  Home as HomeIcon,
  Info
} from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';

// Context per dark mode e filtri
interface AppContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  filter: string;
  setFilter: (value: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

function AppContent() {
  const location = useLocation();
  const { isDark, setIsDark, filter, setFilter, setIsModalOpen } = useAppContext();
  const isHome = location.pathname === '/';

  return (
    <>
      {/* Navigation Switch - Sinistra */}
      <nav className="fixed top-8 left-8 z-50">
        <div className="flex items-center gap-1 p-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/20">
          <Link
            to="/"
            className={`p-2.5 rounded-full transition-all duration-200 ${
              isHome
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
            title="Home"
          >
            <HomeIcon size={18} strokeWidth={2.5} />
          </Link>
          <Link
            to="/about"
            className={`p-2.5 rounded-full transition-all duration-200 ${
              !isHome
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
            title="About"
          >
            <Info size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </nav>

      {/* Floating Bar Centrale - Solo su Home */}
      {isHome && (
        <header className="fixed top-8 left-1/2 -translate-x-1/2 z-40">
          <div className="flex items-center gap-1 p-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/20">
            
            {/* Filtri */}
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

            {/* Nuovo Task */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              title="Nuovo Task"
            >
              <Plus size={18} strokeWidth={3} />
            </button>

            <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1"></div>

            {/* Dark Mode */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-full text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-all"
              title="Cambia tema"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>
      )}

      {/* Dark Mode Toggle - Solo su About (in alto a destra) */}
      {!isHome && (
        <div className="fixed top-8 right-8 z-50">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
            title="Cambia tema"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gestione Dark Mode
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return (
    <AppContext.Provider value={{ isDark, setIsDark, filter, setFilter, isModalOpen, setIsModalOpen }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
