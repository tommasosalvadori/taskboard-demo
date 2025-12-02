# 📋 Task Board Demo

Un'applicazione moderna di gestione task costruita con React, TypeScript e Tailwind CSS, con una fake REST API powered by JSON Server.

## 📖 Descrizione Progetto

Task Board Demo è una Single Page Application (SPA) che permette di gestire task in modo efficiente e intuitivo. L'applicazione offre un'interfaccia minimal e pulita con supporto completo per dark mode, filtri dinamici e operazioni CRUD complete sui task.

### Caratteristiche Principali

- ✨ **UI Moderna**: Design minimal con Tailwind CSS
- 🌙 **Dark Mode**: Supporto completo tema chiaro/scuro
- 🔄 **Real-time Updates**: Aggiornamenti istantanei tramite API REST
- 🎯 **Filtri Dinamici**: Filtra task per stato (todo, in-progress, completed)
- 📱 **Responsive**: Ottimizzata per desktop, tablet e mobile
- 🚀 **Fast**: Powered by Vite per sviluppo velocissimo

## 🛠️ Stack Tecnologico

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router 7.9
- **Icons**: Lucide React
- **Fake API**: JSON Server 1.0

## 📋 Requisiti

Prima di iniziare, assicurati di avere installato:

- **Node.js**: versione 18.x o superiore
- **npm**: versione 9.x o superiore
- **Git**: per clonare il repository

## 🚀 Installazione

### 1. Clona il Repository

```bash
git clone https://github.com/tommasosalvadori/taskboard-demo.git
cd taskboard-demo
```

### 2. Installa le Dipendenze

```bash
npm install
```

Questo installerà tutte le dipendenze necessarie, incluse:
- React e React DOM
- React Router per il routing
- Tailwind CSS per lo styling
- JSON Server per la fake API
- Lucide React per le icone

## ▶️ Avvio Applicazione

L'applicazione richiede **due server** in esecuzione contemporaneamente:

### 1. Avvia la Fake API (JSON Server)

In un terminale, esegui:

```bash
npm run api
```

Questo avvierà JSON Server sulla porta **3000**:
- 🔌 API Endpoint: `http://localhost:3000/tasks`
- 📝 File dati: `tasks.json`
- 🔄 Auto-reload al cambiamento del file

### 2. Avvia il Server di Sviluppo (Vite)

In un **secondo terminale**, esegui:

```bash
npm run dev
```

Questo avvierà l'applicazione React sulla porta **5173** (o successiva se occupata):
- 🌐 URL: `http://localhost:5173/`
- ⚡ Hot Module Replacement abilitato

### 3. Apri nel Browser

Naviga su `http://localhost:5173/` per utilizzare l'applicazione.

## 📜 Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm install` | Installa tutte le dipendenze |
| `npm run dev` | Avvia il server di sviluppo Vite |
| `npm run api` | Avvia la fake API JSON Server |
| `npm run build` | Crea build di produzione |
| `npm run preview` | Preview della build di produzione |
| `npm run lint` | Esegue ESLint per controllo codice |

## 📁 Struttura Cartelle

```
taskboard-demo/
├── public/              # Asset statici
│   └── vite.svg
├── src/
│   ├── assets/          # Immagini e risorse
│   │   └── react.svg
│   ├── components/      # Componenti React riutilizzabili
│   │   ├── TaskCard.tsx      # Card per visualizzare singolo task
│   │   └── TaskModal.tsx     # Modal per create/edit task
│   ├── pages/           # Pagine dell'applicazione
│   │   ├── Home.tsx          # Pagina principale con task board
│   │   └── About.tsx         # Pagina informativa
│   ├── App.tsx          # Componente root con routing e context
│   ├── main.tsx         # Entry point dell'applicazione
│   ├── index.css        # Stili globali e direttive Tailwind
│   └── App.css          # Stili specifici App (legacy)
├── tasks.json           # Database fake per JSON Server
├── tailwind.config.js   # Configurazione Tailwind CSS
├── postcss.config.cjs   # Configurazione PostCSS
├── vite.config.ts       # Configurazione Vite
├── tsconfig.json        # Configurazione TypeScript
├── package.json         # Dipendenze e scripts
└── README.md            # Questo file
```

## 🎯 Funzionalità Implementate

### Gestione Task

- **Visualizzazione**: Griglia responsive con card
- **Creazione**: Modal con form per nuove task (stato default: "todo")
- **Modifica**: Click su una card per modificare titolo, descrizione e stato
- **Filtri**: Visualizza task per stato (Tutti, Da fare, In corso, Completati)

### Interfaccia

- **Routing**: Navigazione tra Home e About
- **Switch Navigazione**: Floating bar in alto a sinistra (🏠 Home / ℹ️ About)
- **Floating Bar Centrale**: Filtri e azioni principali (solo su Home)
- **Dark Mode**: Toggle tema chiaro/scuro persistente
- **Responsive**: Layout adattivo per tutti i dispositivi

### API Operations

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/tasks` | Recupera tutte le task |
| GET | `/tasks/:id` | Recupera task specifica |
| POST | `/tasks` | Crea nuova task |
| PATCH | `/tasks/:id` | Aggiorna task esistente |
| DELETE | `/tasks/:id` | Elimina task |

## 🔧 Note Tecniche

### Context API

L'applicazione utilizza React Context per gestire lo stato globale:
- `isDark`: Stato del tema (light/dark)
- `filter`: Filtro attivo per i task
- `isModalOpen`: Stato di apertura del modal

### Tailwind CSS

- **Dark Mode**: Configurato con strategia `class`
- **PostCSS**: Utilizza file `.cjs` per compatibilità con ES Modules
- **Purge**: Configurato per scansionare tutti i file `.tsx` e `.jsx`

### TypeScript

- **Strict Mode**: Abilitato per type safety massimo
- **Interfaces**: Tipo `Task` definito ed esportato da `Home.tsx`
- **Type Safety**: Props e state tipizzati completamente

### JSON Server

Il file `tasks.json` contiene i dati iniziali nel formato:

```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Task Title",
      "description": "Task Description",
      "status": "todo",
      "createdAt": "2025-12-01T10:00:00Z"
    }
  ]
}
```

## ⚠️ Problemi Noti

### Porte Già in Uso

Se ricevi errori tipo "Port already in use":
- Vite cercherà automaticamente la prossima porta disponibile
- Oppure termina i processi esistenti: `npx kill-port 5173 3000`

### CSS Non Caricato

Se gli stili Tailwind non vengono applicati:
1. Ferma il server dev (`Ctrl+C`)
2. Elimina la cache: `rm -rf node_modules/.vite`
3. Riavvia: `npm run dev`

### Export/Import TypeScript

Se vedi errori come "does not provide an export named 'Task'":
- Assicurati che tutti i file siano salvati
- Riavvia completamente il dev server
- Cancella la cache del browser (`Ctrl+Shift+R`)

### Git Remote Issues

Se hai problemi con `upstream already exists`:
```bash
git remote remove upstream
```

## 👨‍💻 Sviluppo

### Workflow Git

1. Crea una feature branch: `git checkout -b feature/nome-feature`
2. Fai le modifiche e commit frequenti
3. Push: `git push -u origin feature/nome-feature`
4. Apri Pull Request su GitHub
5. Merge dopo review

### Best Practices

- ✅ Commit messaggi chiari e descrittivi
- ✅ Codice formattato e lintato
- ✅ Componenti piccoli e riutilizzabili
- ✅ Tipizzazione TypeScript completa

## 📝 Licenza

Questo progetto è privato e a scopo dimostrativo.

## 👤 Autore

**Tommaso Salvadori**
- GitHub: [@tommasosalvadori](https://github.com/tommasosalvadori)
- Email: tommaso.salvadori@fuzzymarketing.it

---

Made with ❤️ using React + TypeScript + Vite

### 2. Avvia il Server di Sviluppo (Vite)

In un **secondo terminale**, esegui:

```bash
npm run dev
```

Questo avvierà l'applicazione React sulla porta **5173** (o successiva se occupata):
- 🌐 URL: `http://localhost:5173/`
- ⚡ Hot Module Replacement abilitato

### 3. Apri nel Browser

Naviga su `http://localhost:5173/` per utilizzare l'applicazione.

## 📜 Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm install` | Installa tutte le dipendenze |
| `npm run dev` | Avvia il server di sviluppo Vite |
| `npm run api` | Avvia la fake API JSON Server |
| `npm run build` | Crea build di produzione |
| `npm run preview` | Preview della build di produzione |
| `npm run lint` | Esegue ESLint per controllo codice |

## 📁 Struttura Cartelle

```
taskboard-demo/
├── public/              # Asset statici
│   └── vite.svg
├── src/
│   ├── assets/          # Immagini e risorse
│   │   └── react.svg
│   ├── components/      # Componenti React riutilizzabili
│   │   ├── TaskCard.tsx      # Card per visualizzare singolo task
│   │   └── TaskModal.tsx     # Modal per create/edit task
│   ├── pages/           # Pagine dell'applicazione
│   │   ├── Home.tsx          # Pagina principale con task board
│   │   └── About.tsx         # Pagina informativa
│   ├── App.tsx          # Componente root con routing e context
│   ├── main.tsx         # Entry point dell'applicazione
│   ├── index.css        # Stili globali e direttive Tailwind
│   └── App.css          # Stili specifici App (legacy)
├── tasks.json           # Database fake per JSON Server
├── tailwind.config.js   # Configurazione Tailwind CSS
├── postcss.config.cjs   # Configurazione PostCSS
├── vite.config.ts       # Configurazione Vite
├── tsconfig.json        # Configurazione TypeScript
├── package.json         # Dipendenze e scripts
└── README.md            # Questo file
```

## 🎯 Funzionalità Implementate

### Gestione Task

- **Visualizzazione**: Griglia responsive con card
- **Creazione**: Modal con form per nuove task (stato default: "todo")
- **Modifica**: Click su una card per modificare titolo, descrizione e stato
- **Filtri**: Visualizza task per stato (Tutti, Da fare, In corso, Completati)

### Interfaccia

- **Routing**: Navigazione tra Home e About
- **Switch Navigazione**: Floating bar in alto a sinistra (🏠 Home / ℹ️ About)
- **Floating Bar Centrale**: Filtri e azioni principali (solo su Home)
- **Dark Mode**: Toggle tema chiaro/scuro persistente
- **Responsive**: Layout adattivo per tutti i dispositivi

### API Operations

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/tasks` | Recupera tutte le task |
| GET | `/tasks/:id` | Recupera task specifica |
| POST | `/tasks` | Crea nuova task |
| PATCH | `/tasks/:id` | Aggiorna task esistente |
| DELETE | `/tasks/:id` | Elimina task |

## 🔧 Note Tecniche

### Context API

L'applicazione utilizza React Context per gestire lo stato globale:
- `isDark`: Stato del tema (light/dark)
- `filter`: Filtro attivo per i task
- `isModalOpen`: Stato di apertura del modal

### Tailwind CSS

- **Dark Mode**: Configurato con strategia `class`
- **PostCSS**: Utilizza file `.cjs` per compatibilità con ES Modules
- **Purge**: Configurato per scansionare tutti i file `.tsx` e `.jsx`

### TypeScript

- **Strict Mode**: Abilitato per type safety massimo
- **Interfaces**: Tipo `Task` definito ed esportato da `Home.tsx`
- **Type Safety**: Props e state tipizzati completamente

### JSON Server

Il file `tasks.json` contiene i dati iniziali nel formato:

```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Task Title",
      "description": "Task Description",
      "status": "todo",
      "createdAt": "2025-12-01T10:00:00Z"
    }
  ]
}
```

## ⚠️ Problemi Noti

### Porte Già in Uso

Se ricevi errori tipo "Port already in use":
- Vite cercherà automaticamente la prossima porta disponibile
- Oppure termina i processi esistenti: `npx kill-port 5173 3000`

### CSS Non Caricato

Se gli stili Tailwind non vengono applicati:
1. Ferma il server dev (`Ctrl+C`)
2. Elimina la cache: `rm -rf node_modules/.vite`
3. Riavvia: `npm run dev`

### Export/Import TypeScript

Se vedi errori come "does not provide an export named 'Task'":
- Assicurati che tutti i file siano salvati
- Riavvia completamente il dev server
- Cancella la cache del browser (`Ctrl+Shift+R`)

### Git Remote Issues

Se hai problemi con `upstream already exists`:
```bash
git remote remove upstream
```

## 👨‍💻 Sviluppo

### Workflow Git

1. Crea una feature branch: `git checkout -b feature/nome-feature`
2. Fai le modifiche e commit frequenti
3. Push: `git push -u origin feature/nome-feature`
4. Apri Pull Request su GitHub
5. Merge dopo review

### Best Practices

- ✅ Commit messaggi chiari e descrittivi
- ✅ Codice formattato e lintato
- ✅ Componenti piccoli e riutilizzabili
- ✅ Tipizzazione TypeScript completa

## 📝 Licenza

Questo progetto è privato e a scopo dimostrativo.

## 👤 Autore

**Tommaso Salvadori**
- GitHub: [@tommasosalvadori](https://github.com/tommasosalvadori)
- Email: tommaso.salvadori@fuzzymarketing.it

---

Made with ❤️ using React + TypeScript + Vite

### 2. Avvia il Server di Sviluppo (Vite)

In un **secondo terminale**, esegui:

```bash
npm run dev
```

Questo avvierà l'applicazione React sulla porta **5173** (o successiva se occupata):
- 🌐 URL: `http://localhost:5173/`
- ⚡ Hot Module Replacement abilitato

### 3. Apri nel Browser

Naviga su `http://localhost:5173/` per utilizzare l'applicazione.

## 📜 Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm install` | Installa tutte le dipendenze |
| `npm run dev` | Avvia il server di sviluppo Vite |
| `npm run api` | Avvia la fake API JSON Server |
| `npm run build` | Crea build di produzione |
| `npm run preview` | Preview della build di produzione |
| `npm run lint` | Esegue ESLint per controllo codice |

## 📁 Struttura Cartelle

```
taskboard-demo/
├── public/              # Asset statici
│   └── vite.svg
├── src/
│   ├── assets/          # Immagini e risorse
│   │   └── react.svg
│   ├── components/      # Componenti React riutilizzabili
│   │   ├── TaskCard.tsx      # Card per visualizzare singolo task
│   │   └── TaskModal.tsx     # Modal per create/edit task
│   ├── pages/           # Pagine dell'applicazione
│   │   ├── Home.tsx          # Pagina principale con task board
│   │   └── About.tsx         # Pagina informativa
│   ├── App.tsx          # Componente root con routing e context
│   ├── main.tsx         # Entry point dell'applicazione
│   ├── index.css        # Stili globali e direttive Tailwind
│   └── App.css          # Stili specifici App (legacy)
├── tasks.json           # Database fake per JSON Server
├── tailwind.config.js   # Configurazione Tailwind CSS
├── postcss.config.cjs   # Configurazione PostCSS
├── vite.config.ts       # Configurazione Vite
├── tsconfig.json        # Configurazione TypeScript
├── package.json         # Dipendenze e scripts
└── README.md            # Questo file
```

## 🎯 Funzionalità Implementate

### Gestione Task

- **Visualizzazione**: Griglia responsive con card
- **Creazione**: Modal con form per nuove task (stato default: "todo")
- **Modifica**: Click su una card per modificare titolo, descrizione e stato
- **Filtri**: Visualizza task per stato (Tutti, Da fare, In corso, Completati)

### Interfaccia

- **Routing**: Navigazione tra Home e About
- **Switch Navigazione**: Floating bar in alto a sinistra (🏠 Home / ℹ️ About)
- **Floating Bar Centrale**: Filtri e azioni principali (solo su Home)
- **Dark Mode**: Toggle tema chiaro/scuro persistente
- **Responsive**: Layout adattivo per tutti i dispositivi

### API Operations

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/tasks` | Recupera tutte le task |
| GET | `/tasks/:id` | Recupera task specifica |
| POST | `/tasks` | Crea nuova task |
| PATCH | `/tasks/:id` | Aggiorna task esistente |
| DELETE | `/tasks/:id` | Elimina task |

## 🔧 Note Tecniche

### Context API

L'applicazione utilizza React Context per gestire lo stato globale:
- `isDark`: Stato del tema (light/dark)
- `filter`: Filtro attivo per i task
- `isModalOpen`: Stato di apertura del modal

### Tailwind CSS

- **Dark Mode**: Configurato con strategia `class`
- **PostCSS**: Utilizza file `.cjs` per compatibilità con ES Modules
- **Purge**: Configurato per scansionare tutti i file `.tsx` e `.jsx`

### TypeScript

- **Strict Mode**: Abilitato per type safety massimo
- **Interfaces**: Tipo `Task` definito ed esportato da `Home.tsx`
- **Type Safety**: Props e state tipizzati completamente

### JSON Server

Il file `tasks.json` contiene i dati iniziali nel formato:

```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Task Title",
      "description": "Task Description",
      "status": "todo",
      "createdAt": "2025-12-01T10:00:00Z"
    }
  ]
}
```

## ⚠️ Problemi Noti

### Porte Già in Uso

Se ricevi errori tipo "Port already in use":
- Vite cercherà automaticamente la prossima porta disponibile
- Oppure termina i processi esistenti: `npx kill-port 5173 3000`

### CSS Non Caricato

Se gli stili Tailwind non vengono applicati:
1. Ferma il server dev (`Ctrl+C`)
2. Elimina la cache: `rm -rf node_modules/.vite`
3. Riavvia: `npm run dev`

### Export/Import TypeScript

Se vedi errori come "does not provide an export named 'Task'":
- Assicurati che tutti i file siano salvati
- Riavvia completamente il dev server
- Cancella la cache del browser (`Ctrl+Shift+R`)

### Git Remote Issues

Se hai problemi con `upstream already exists`:
```bash
git remote remove upstream
```

## 👨‍💻 Sviluppo

### Workflow Git

1. Crea una feature branch: `git checkout -b feature/nome-feature`
2. Fai le modifiche e commit frequenti
3. Push: `git push -u origin feature/nome-feature`
4. Apri Pull Request su GitHub
5. Merge dopo review

### Best Practices

- ✅ Commit messaggi chiari e descrittivi
- ✅ Codice formattato e lintato
- ✅ Componenti piccoli e riutilizzabili
- ✅ Tipizzazione TypeScript completa

## 📝 Licenza

Questo progetto è privato e a scopo dimostrativo.

## 👤 Autore

**Tommaso Salvadori**
- GitHub: [@tommasosalvadori](https://github.com/tommasosalvadori)
- Email: tommaso.salvadori@fuzzymarketing.it

---

Made with ❤️ using React + TypeScript + Vite

### 2. Avvia il Server di Sviluppo (Vite)

In un **secondo terminale**, esegui:

```bash
npm run dev
```

Questo avvierà l'applicazione React sulla porta **5173** (o successiva se occupata):
- 🌐 URL: `http://localhost:5173/`
- ⚡ Hot Module Replacement abilitato

### 3. Apri nel Browser

Naviga su `http://localhost:5173/` per utilizzare l'applicazione.

## 📜 Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm install` | Installa tutte le dipendenze |
| `npm run dev` | Avvia il server di sviluppo Vite |
| `npm run api` | Avvia la fake API JSON Server |
| `npm run build` | Crea build di produzione |
| `npm run preview` | Preview della build di produzione |
| `npm run lint` | Esegue ESLint per controllo codice |

## 📁 Struttura Cartelle

```
taskboard-demo/
├── public/              # Asset statici
│   └── vite.svg
├── src/
│   ├── assets/          # Immagini e risorse
│   │   └── react.svg
│   ├── components/      # Componenti React riutilizzabili
│   │   ├── TaskCard.tsx      # Card per visualizzare singolo task
│   │   └── TaskModal.tsx     # Modal per create/edit task
│   ├── pages/           # Pagine dell'applicazione
│   │   ├── Home.tsx          # Pagina principale con task board
│   │   └── About.tsx         # Pagina informativa
│   ├── App.tsx          # Componente root con routing e context
│   ├── main.tsx         # Entry point dell'applicazione
│   ├── index.css        # Stili globali e direttive Tailwind
│   └── App.css          # Stili specifici App (legacy)
├── tasks.json           # Database fake per JSON Server
├── tailwind.config.js   # Configurazione Tailwind CSS
├── postcss.config.cjs   # Configurazione PostCSS
├── vite.config.ts       # Configurazione Vite
├── tsconfig.json        # Configurazione TypeScript
├── package.json         # Dipendenze e scripts
└── README.md            # Questo file
```

## 🎯 Funzionalità Implementate

### Gestione Task

- **Visualizzazione**: Griglia responsive con card
- **Creazione**: Modal con form per nuove task (stato default: "todo")
- **Modifica**: Click su una card per modificare titolo, descrizione e stato
- **Filtri**: Visualizza task per stato (Tutti, Da fare, In corso, Completati)

### Interfaccia

- **Routing**: Navigazione tra Home e About
- **Switch Navigazione**: Floating bar in alto a sinistra (🏠 Home / ℹ️ About)
- **Floating Bar Centrale**: Filtri e azioni principali (solo su Home)
- **Dark Mode**: Toggle tema chiaro/scuro persistente
- **Responsive**: Layout adattivo per tutti i dispositivi

### API Operations

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/tasks` | Recupera tutte le task |
| GET | `/tasks/:id` | Recupera task specifica |
| POST | `/tasks` | Crea nuova task |
| PATCH | `/tasks/:id` | Aggiorna task esistente |
| DELETE | `/tasks/:id` | Elimina task |

## 🔧 Note Tecniche

### Context API

L'applicazione utilizza React Context per gestire lo stato globale:
- `isDark`: Stato del tema (light/dark)
- `filter`: Filtro attivo per i task
- `isModalOpen`: Stato di apertura del modal

### Tailwind CSS

- **Dark Mode**: Configurato con strategia `class`
- **PostCSS**: Utilizza file `.cjs` per compatibilità con ES Modules
- **Purge**: Configurato per scansionare tutti i file `.tsx` e `.jsx`

### TypeScript

- **Strict Mode**: Abilitato per type safety massimo
- **Interfaces**: Tipo `Task` definito ed esportato da `Home.tsx`
- **Type Safety**: Props e state tipizzati completamente

### JSON Server

Il file `tasks.json` contiene i dati iniziali nel formato:

```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Task Title",
      "description": "Task Description",
      "status": "todo",
      "createdAt": "2025-12-01T10:00:00Z"
    }
  ]
}
```

## ⚠️ Problemi Noti

### Porte Già in Uso

Se ricevi errori tipo "Port already in use":
- Vite cercherà automaticamente la prossima porta disponibile
- Oppure termina i processi esistenti: `npx kill-port 5173 3000`

### CSS Non Caricato

Se gli stili Tailwind non vengono applicati:
1. Ferma il server dev (`Ctrl+C`)
2. Elimina la cache: `rm -rf node_modules/.vite`
3. Riavvia: `npm run dev`

### Export/Import TypeScript

Se vedi errori come "does not provide an export named 'Task'":
- Assicurati che tutti i file siano salvati
- Riavvia completamente il dev server
- Cancella la cache del browser (`Ctrl+Shift+R`)

### Git Remote Issues

Se hai problemi con `upstream already exists`:
```bash
git remote remove upstream
```

## 👨‍💻 Sviluppo

### Workflow Git

1. Crea una feature branch: `git checkout -b feature/nome-feature`
2. Fai le modifiche e commit frequenti
3. Push: `git push -u origin feature/nome-feature`
4. Apri Pull Request su GitHub
5. Merge dopo review

### Best Practices

- ✅ Commit messaggi chiari e descrittivi
- ✅ Codice formattato e lintato
- ✅ Componenti piccoli e riutilizzabili
- ✅ Tipizzazione TypeScript completa

## 📝 Licenza

Questo progetto è privato e a scopo dimostrativo.

## 👤 Autore

**Tommaso Salvadori**
- GitHub: [@tommasosalvadori](https://github.com/tommasosalvadori)
- Email: tommaso.salvadori@fuzzymarketing.it

---

Made with ❤️ using React + TypeScript + Vite

### 2. Avvia il Server di Sviluppo (Vite)

In un **secondo terminale**, esegui:

```bash
npm run dev
```

Questo avvierà l'applicazione React sulla porta **5173** (o successiva se occupata):
- 🌐 URL: `http://localhost:5173/`
- ⚡ Hot Module Replacement abilitato

### 3. Apri nel Browser

Naviga su `http://localhost:5173/` per utilizzare l'applicazione.

## 📜 Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm install` | Installa tutte le dipendenze |
| `npm run dev` | Avvia il server di sviluppo Vite |
| `npm run api` | Avvia la fake API JSON Server |
| `npm run build` | Crea build di produzione |
| `npm run preview` | Preview della build di produzione |
| `npm run lint` | Esegue ESLint per controllo codice |

## 📁 Struttura Cartelle

```
taskboard-demo/
├── public/              # Asset statici
│   └── vite.svg
├── src/
│   ├── assets/          # Immagini e risorse
│   │   └── react.svg
│   ├── components/      # Componenti React riutilizzabili
│   │   ├── TaskCard.tsx      # Card per visualizzare singolo task
│   │   └── TaskModal.tsx     # Modal per create/edit task
│   ├── pages/           # Pagine dell'applicazione
│   │   ├── Home.tsx          # Pagina principale con task board
│   │   └── About.tsx         # Pagina informativa
│   ├── App.tsx          # Componente root con routing e context
│   ├── main.tsx         # Entry point dell'applicazione
│   ├── index.css        # Stili globali e direttive Tailwind
│   └── App.css          # Stili specifici App (legacy)
├── tasks.json           # Database fake per JSON Server
├── tailwind.config.js   # Configurazione Tailwind CSS
├── postcss.config.cjs   # Configurazione PostCSS
├── vite.config.ts       # Configurazione Vite
├── tsconfig.json        # Configurazione TypeScript
├── package.json         # Dipendenze e scripts
└── README.md            # Questo file
```

## 🎯 Funzionalità Implementate

### Gestione Task

- **Visualizzazione**: Griglia responsive con card
- **Creazione**: Modal con form per nuove task (stato default: "todo")
- **Modifica**: Click su una card per modificare titolo, descrizione e stato
- **Filtri**: Visualizza task per stato (Tutti, Da fare, In corso, Completati)

### Interfaccia

- **Routing**: Navigazione tra Home e About
- **Switch Navigazione**: Floating bar in alto a sinistra (🏠 Home / ℹ️ About)
- **Floating Bar Centrale**: Filtri e azioni principali (solo su Home)
- **Dark Mode**: Toggle tema chiaro/scuro persistente
- **Responsive**: Layout adattivo per tutti i dispositivi

### API Operations

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/tasks` | Recupera tutte le task |
| GET | `/tasks/:id` | Recupera task specifica |
| POST | `/tasks` | Crea nuova task |
| PATCH | `/tasks/:id` | Aggiorna task esistente |
| DELETE | `/tasks/:id` | Elimina task |

## 🔧 Note Tecniche

### Context API

L'applicazione utilizza React Context per gestire lo stato globale:
- `isDark`: Stato del tema (light/dark)
- `filter`: Filtro attivo per i task
- `isModalOpen`: Stato di apertura del modal

### Tailwind CSS

- **Dark Mode**: Configurato con strategia `class`
- **PostCSS**: Utilizza file `.cjs` per compatibilità con ES Modules
- **Purge**: Configurato per scansionare tutti i file `.tsx` e `.jsx`

### TypeScript

- **Strict Mode**: Abilitato per type safety massimo
- **Interfaces**: Tipo `Task` definito ed esportato da `Home.tsx`
- **Type Safety**: Props e state tipizzati completamente

### JSON Server

Il file `tasks.json` contiene i dati iniziali nel formato:

```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Task Title",
      "description": "Task Description",
      "status": "todo",
      "createdAt": "2025-12-01T10:00:00Z"
    }
  ]
}
```

## ⚠️ Problemi Noti

### Porte Già in Uso

Se ricevi errori tipo "Port already in use":
- Vite cercherà automaticamente la prossima porta disponibile
- Oppure termina i processi esistenti: `npx kill-port 5173 3000`

### CSS Non Caricato

Se gli stili Tailwind non vengono applicati:
1. Ferma il server dev (`Ctrl+C`)
2. Elimina la cache: `rm -rf node_modules/.vite`
3. Riavvia: `npm run dev`

### Export/Import TypeScript

Se vedi errori come "does not provide an export named 'Task'":
- Assicurati che tutti i file siano salvati
- Riavvia completamente il dev server
- Cancella la cache del browser (`Ctrl+Shift+R`)

### Git Remote Issues

Se hai problemi con `upstream already exists`:
```bash
git remote remove upstream
```

## 👨‍💻 Sviluppo

### Workflow Git

1. Crea una feature branch: `git checkout -b feature/nome-feature`
2. Fai le modifiche e commit frequenti
3. Push: `git push -u origin feature/nome-feature`
4. Apri Pull Request su GitHub
5. Merge dopo review

### Best Practices

- ✅ Commit messaggi chiari e descrittivi
- ✅ Codice formattato e lintato
- ✅ Componenti piccoli e riutilizzabili
- ✅ Tipizzazione TypeScript completa

## 📝 Licenza

Questo progetto è privato e a scopo dimostrativo.

## 👤 Autore

**Tommaso Salvadori**
- GitHub: [@tommasosalvadori](https://github.com/tommasosalvadori)
- Email: tommaso.salvadori@fuzzymarketing.it

---

Made with ❤️ using React + TypeScript + Vite
