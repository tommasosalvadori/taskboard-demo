import { CheckCircle2, Code2, Rocket, Zap } from 'lucide-react';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="min-h-screen flex flex-col relative pb-[6.75rem] lg:pb-0 pt-20 lg:pt-36 xl:pt-32 font-sans transition-colors duration-300">
      <main className="max-w-3xl mx-auto flex-1 w-full px-4 sm:px-6 lg:px-8 mb-12">
        
        <div className="text-center mb-16">
          <div className="inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
            <Rocket size={48} className="text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Task Board Demo
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Un'applicazione moderna per la gestione dei task
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Scopo dell'App</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Task Board Demo è un'applicazione di gestione dei task costruita con le tecnologie 
            web più moderne. Permette di organizzare, monitorare e completare le tue attività 
            quotidiane in modo semplice ed efficiente.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            L'interfaccia minimal e intuitiva ti consente di concentrarti su ciò che conta davvero: 
            portare a termine i tuoi obiettivi.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Funzionalità Principali</h2>
          <div className="space-y-4">
            {[
              { icon: CheckCircle2, text: 'Crea, modifica ed elimina task con facilità' },
              { icon: Zap, text: 'Filtra task per stato (todo, in-progress, completed)' },
              { icon: Code2, text: 'Interfaccia responsive con dark mode' },
              { icon: Rocket, text: 'Aggiornamenti in tempo reale tramite API REST' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 pt-1.5">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Stack Tecnologico</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'JSON Server'].map((tech) => (
              <div key={tech} className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
