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
  Info,
  LogIn,
  LogOut
} from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import type { User } from './types';

// Context per dark mode, filtri e autenticazione
interface AppContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  filter: string;
  setFilter: (value: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

function AppContent() {
  const location = useLocation();
  const { isDark, setIsDark, filter, setFilter, setIsModalOpen, user, setUser } = useAppContext();
  const isHome = location.pathname === '/';

  // Scroll to top quando cambia la pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Funzioni di autenticazione (mock)
  const handleLogin = () => {
    // Mock login - in produzione qui faresti una chiamata API
    const mockUser: User = {
      id: '1',
      name: 'Mario Rossi',
      email: 'mario.rossi@email.com',
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <>
      {/* ========== CONTENITORE UNICO - HOME PAGE ========== */}
      {isHome && (
        <div className="fixed top-8 left-0 right-0 z-50">
          
          {/* LOGO - Sinistra */}
          <div className="absolute left-8">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/20 hover:shadow-xl transition-all duration-200 group"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-4 h-4 text-white"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskBoard
              </span>
            </Link>
          </div>

          {/* HEADER CENTRALE - Perfettamente al Centro */}
          <div className="absolute left-1/2 -translate-x-1/2">
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
            </div>
          </div>

          {/* HOME/ABOUT + DARK MODE (sinistra) + LOGIN/LOGOUT (destra) - Allineati con le task */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              
              {/* HOME/ABOUT + DARK MODE - Sinistra */}
              <div className="flex items-center gap-3">
                <nav className="flex-shrink-0">
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

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                  title="Cambia tema"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* LOGIN/LOGOUT - Destra */}
              <div className="flex-shrink-0">
                <div className="flex items-center gap-1 p-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/20">
                  {user ? (
                    <>
                      {/* Avatar */}
                      <div 
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-gray-50 dark:bg-slate-700/50"
                        title={user.name}
                      >
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-blue-500"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs ring-2 ring-blue-500">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[80px] truncate">
                          {user.name.split(' ')[0]}
                        </span>
                      </div>
                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="p-2.5 rounded-full text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all"
                        title="Logout"
                      >
                        <LogOut size={18} strokeWidth={2.5} />
                      </button>
                    </>
                  ) : (
                    // Login Button
                    <button
                      onClick={handleLogin}
                      className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                      title="Login"
                    >
                      <LogIn size={18} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ========== CONTENITORE UNICO - ABOUT PAGE ========== */}
      {!isHome && (
        <div className="fixed top-8 left-0 right-0 z-50">
          
          {/* LOGO - Sinistra */}
          <div className="absolute left-8">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/20 hover:shadow-xl transition-all duration-200 group"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-4 h-4 text-white"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskBoard
              </span>
            </Link>
          </div>

          {/* Home/About + Dark Mode + Login/Logout - Allineati */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              
              {/* HOME/ABOUT + DARK MODE - Sinistra */}
              <div className="flex items-center gap-3">
                <nav className="flex-shrink-0">
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

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                  title="Cambia tema"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* LOGIN/LOGOUT */}
              <div className="flex-shrink-0">
                <div className="flex items-center gap-1 p-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/20">
                  {user ? (
                    <>
                      <div 
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-gray-50 dark:bg-slate-700/50"
                        title={user.name}
                      >
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-blue-500"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs ring-2 ring-blue-500">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[80px] truncate">
                          {user.name.split(' ')[0]}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="p-2.5 rounded-full text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all"
                        title="Logout"
                      >
                        <LogOut size={18} strokeWidth={2.5} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                      title="Login"
                    >
                      <LogIn size={18} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

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
  const [user, setUser] = useState<User | null>(null);

  // Gestione Dark Mode
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  // Ripristina utente da localStorage al caricamento
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Errore nel recupero utente:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ isDark, setIsDark, filter, setFilter, isModalOpen, setIsModalOpen, user, setUser }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
