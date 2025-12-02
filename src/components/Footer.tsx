import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          
          {/* Left: Project Name & Year */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-3.5 h-3.5 text-white"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              TaskBoard
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              © {currentYear}
            </span>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-6">
            <Link 
              to="/about"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <a 
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          
          {/* Project Name & Year */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-3.5 h-3.5 text-white"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              TaskBoard
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              © {currentYear}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-4">
            <Link 
              to="/about"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a 
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a 
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

