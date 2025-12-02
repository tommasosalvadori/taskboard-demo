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
  LogOut,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top quando cambia la pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Chiudi menu mobile quando cambia la route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Funzioni di autenticazione (mock)
  const handleLogin = () => {
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
      {/* ========== HEADER DESKTOP - Hidden on Mobile ========== */}
      <div className="hidden lg:block">
        {/* LOGO CENTRATO - Contenitore Separato (Solo su schermi lg-xl) */}
        {isHome && (
          <div className="fixed top-4 left-0 right-0 z-50 xl:hidden">
            <div className="flex justify-center">
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
          </div>
        )}

        {isHome && (
          <div className="fixed top-8 xl:top-8 lg:top-20 left-0 right-0 z-50">
            
            {/* LOGO - Sinistra (Solo su schermi XL+) */}
            <div className="absolute left-8 hidden xl:block">
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

            {/* HEADER CENTRALE */}
            <div className="absolute left-1/2 -translate-x-1/2">
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
              </div>
            </div>

            {/* HOME/ABOUT + DARK MODE + LOGIN/LOGOUT */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                
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

                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                    title="Cambia tema"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>

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

        {/* LOGO CENTRATO - Contenitore Separato About (Solo su schermi lg-xl) */}
        {!isHome && (
          <div className="fixed top-4 left-0 right-0 z-50 xl:hidden">
            <div className="flex justify-center">
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
          </div>
        )}

        {!isHome && (
          <div className="fixed top-8 xl:top-8 lg:top-20 left-0 right-0 z-50">
            
            {/* LOGO - Sinistra (Solo su schermi XL+) */}
            <div className="absolute left-8 hidden xl:block">
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

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                
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

                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                    title="Cambia tema"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>

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
      </div>

      {/* ========== HEADER MOBILE - Visible only on Mobile ========== */}
      <div className="lg:hidden">
        {/* Top Bar Mobile */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between px-4 h-16">
            
            {/* Dark Mode - Sinistra */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Logo - Centro */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-5 h-5 text-white"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskBoard
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Login/Logout */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  title="Login"
                >
                  <LogIn size={20} />
                </button>
              )}

              {/* Menu Button - Solo su Home */}
              {isHome && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Dropdown - Filtri */}
          {isHome && isMobileMenuOpen && (
            <div className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">FILTRI</div>
                {[
                  { id: 'all', icon: LayoutGrid, label: 'Tutti i Task' },
                  { id: 'todo', icon: Circle, label: 'Da Fare' },
                  { id: 'in-progress', icon: Clock, label: 'In Corso' },
                  { id: 'completed', icon: CheckCircle2, label: 'Completati' }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setFilter(id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      filter === id 
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={20} strokeWidth={2.5} />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Mobile - Sempre Visibile */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 shadow-2xl safe-bottom">
          <div className="flex items-center px-6 py-3">
            
            {/* Home - Posizione Fissa Sinistra */}
            <Link
              to="/"
              className="relative flex flex-col items-center gap-1.5 px-5 py-2 transition-all group flex-1"
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-300 ${
                isHome 
                  ? 'bg-blue-600 shadow-lg shadow-blue-600/30 scale-105' 
                  : 'bg-gray-100 dark:bg-slate-800 group-hover:bg-gray-200 dark:group-hover:bg-slate-700'
              }`}>
                <HomeIcon 
                  size={22} 
                  strokeWidth={2.5} 
                  className={isHome ? 'text-white' : 'text-slate-600 dark:text-slate-400'}
                />
              </div>
              <span className={`text-xs font-semibold transition-colors ${
                isHome ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
              }`}>
                Home
              </span>
              {isHome && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Link>

            {/* Pulsante Nuovo - Centro - Solo su Home */}
            {isHome && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative flex flex-col items-center gap-1.5 px-5 py-2 active:scale-95 transition-transform flex-1"
              >
                <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl shadow-blue-600/40">
                  <Plus size={26} strokeWidth={3} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nuovo
                </span>
              </button>
            )}

            {/* Spacer invisibile quando non c'è il pulsante Nuovo */}
            {!isHome && (
              <div className="flex-1"></div>
            )}

            {/* About - Posizione Fissa Destra */}
            <Link
              to="/about"
              className="relative flex flex-col items-center gap-1.5 px-5 py-2 transition-all group flex-1"
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-300 ${
                !isHome 
                  ? 'bg-blue-600 shadow-lg shadow-blue-600/30 scale-105' 
                  : 'bg-gray-100 dark:bg-slate-800 group-hover:bg-gray-200 dark:group-hover:bg-slate-700'
              }`}>
                <Info 
                  size={22} 
                  strokeWidth={2.5} 
                  className={!isHome ? 'text-white' : 'text-slate-600 dark:text-slate-400'}
                />
              </div>
              <span className={`text-xs font-semibold transition-colors ${
                !isHome ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
              }`}>
                About
              </span>
              {!isHome && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Link>

          </div>
        </div>
      </div>

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
