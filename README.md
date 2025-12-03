# 📋 TaskBoard

Una moderna applicazione di gestione task con autenticazione, filtri avanzati e visualizzazioni multiple. Costruita con React, TypeScript e Tailwind CSS.

![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Funzionalità

### 🔐 Sistema di Autenticazione
- **Registrazione** con validazione password robusta
  - Minimo 8 caratteri
  - Almeno una maiuscola, una minuscola, un numero e un carattere speciale
  - Feedback visivo in tempo reale
- **Login/Logout** con gestione token
- **Route protette** con redirect automatico
- **Persistenza sessione** - mantiene l'autenticazione anche dopo refresh

### 📝 Gestione Task
- **Creazione, modifica ed eliminazione** task
- **Stati multipli**: Da fare, In corso, Completati
- **Livelli di difficoltà**: Bassa, Media, Alta
- **Date personalizzabili**: Data inizio e scadenza
- **Descrizioni dettagliate** per ogni task

### 🎯 Filtri Avanzati
- Filtro per **stato** (tutti, da fare, in corso, completati)
- Filtro per **difficoltà** (tutte, bassa, media, alta)
- Filtro per **tempistiche**:
  - Scadute
  - In scadenza (prossimi 7 giorni)
  - Da iniziare
- Filtro per **data specifica**

### 📊 Visualizzazioni
- **Vista Griglia**: Layout responsive con card colorate
- **Vista Calendario**: Visualizza task per data con navigazione mensile
- **Vista Report**: Statistiche e grafici mensili
  - Grafico a barre delle completate per giorno
  - Metriche di produttività
  - Analisi delle difficoltà

### 🎨 Design e UX
- **Dark Mode** con transizioni fluide
- **Responsive** - ottimizzato per desktop, tablet e mobile
- **Animazioni moderne** per migliorare l'esperienza utente
- **Sidebar con statistiche** in tempo reale
- **Interfaccia intuitiva** con icone Lucide React

## 🛠️ Tecnologie

- **[React](https://react.dev/)** 19.2.0 - Library UI
- **[TypeScript](https://www.typescriptlang.org/)** 5.9.3 - Type safety
- **[Vite](https://vite.dev/)** 7.2.4 - Build tool e dev server
- **[React Router](https://reactrouter.com/)** 7.9.6 - Routing
- **[Tailwind CSS](https://tailwindcss.com/)** 3.4.18 - Styling
- **[Lucide React](https://lucide.dev/)** - Icone
- **[Recharts](https://recharts.org/)** 3.5.1 - Grafici
- **[JSON Server](https://github.com/typicode/json-server)** 1.0.0-beta.3 - Mock API

## 📋 Prerequisiti

- **Node.js** 18.x o superiore
- **npm** 9.x o superiore

## 🚀 Installazione

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd taskboard-demo
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Avvia il server JSON (API mock)**
   ```bash
   npm run api
   ```
   Il server API sarà disponibile su `http://localhost:3000`

4. **Avvia l'applicazione** (in un nuovo terminale)
   ```bash
   npm run dev
   ```
   L'applicazione sarà disponibile su `http://localhost:5173`

## 📖 Come Usare

### Prima Volta

1. **Registrazione**
   - Apri l'app nel browser
   - Clicca su "Registrati"
   - Compila il form con:
     - Nome completo
     - Email valida
     - Password sicura (rispettando i requisiti)
   - Verrai automaticamente loggato e reindirizzato alla dashboard

2. **Esplora l'app**
   - Crea il tuo primo task con il pulsante `+`
   - Naviga tra le diverse visualizzazioni (Griglia, Calendario, Report)
   - Applica filtri per organizzare i task
   - Modifica o elimina task esistenti

### Funzionalità Principali

#### Gestione Task
- **Nuovo Task**: Clicca il pulsante `+` nella barra superiore
- **Modifica Task**: Clicca su un task esistente
- **Elimina Task**: Apri il task e clicca sull'icona cestino
- **Cambia Stato**: Usa i badge colorati per cambiare lo stato

#### Filtri
- **Desktop**: Usa i pulsanti nella barra superiore e i filtri avanzati
- **Mobile**: Apri il menu hamburger per accedere a tutti i filtri

#### Visualizzazioni
- **Griglia**: Vista predefinita con tutti i task
- **Calendario**: Clicca l'icona calendario per vedere i task organizzati per data
- **Report**: Clicca l'icona grafico per vedere le statistiche

#### Dark Mode
- Clicca l'icona sole/luna per alternare tra tema chiaro e scuro

## 🗂️ Struttura del Progetto

```
taskboard-demo/
├── src/
│   ├── components/          # Componenti React riutilizzabili
│   │   ├── CalendarBlock.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── Footer.tsx
│   │   ├── ProtectedRoute.tsx  # Protezione route
│   │   ├── ReportBlock.tsx
│   │   ├── StatsPanel.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskModal.tsx
│   ├── pages/               # Pagine dell'applicazione
│   │   ├── About.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx        # Pagina login
│   │   └── Register.tsx     # Pagina registrazione
│   ├── utils/               # Utility functions
│   │   ├── auth.ts          # Logica autenticazione
│   │   └── dateUtils.ts
│   ├── App.tsx              # Componente principale
│   ├── types.ts             # Definizioni TypeScript
│   ├── main.tsx             # Entry point
│   └── index.css            # Stili globali
├── public/                  # Asset statici
├── tasks.json               # Database JSON (API mock)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🔐 Sistema di Autenticazione

L'applicazione utilizza un sistema di autenticazione finto basato su localStorage:

### Validazione Password
Le password devono soddisfare i seguenti requisiti:
- ✅ Minimo 8 caratteri
- ✅ Almeno una lettera maiuscola (A-Z)
- ✅ Almeno una lettera minuscola (a-z)
- ✅ Almeno un numero (0-9)
- ✅ Almeno un carattere speciale (!@#$%^&*...)

### Token
- I token hanno una durata di **7 giorni**
- Vengono automaticamente verificati ad ogni caricamento
- Token scaduti richiedono un nuovo login

### Storage
I dati utente sono salvati nel localStorage:
- `taskboard_users` - Array di utenti registrati
- `taskboard_auth_token` - Token di autenticazione corrente
- `user` - Informazioni utente corrente (per compatibilità)

> ⚠️ **Nota**: Questo è un sistema di autenticazione demo. In produzione, usare un sistema di autenticazione sicuro lato server con password hashate e token JWT.

## 🗄️ API

L'applicazione utilizza JSON Server per una REST API mock:

### Endpoints

- `GET /tasks` - Ottieni tutti i task
- `POST /tasks` - Crea un nuovo task
- `GET /tasks/:id` - Ottieni un task specifico
- `PATCH /tasks/:id` - Aggiorna un task
- `DELETE /tasks/:id` - Elimina un task

### Esempio Request

```javascript
// Crea un nuovo task
fetch('http://localhost:3000/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Nuovo Task',
    description: 'Descrizione del task',
    status: 'todo',
    difficulty: 'medium',
    startDate: '2025-12-03',
    dueDate: '2025-12-10',
    createdAt: new Date().toISOString()
  })
})
```

## 📱 Responsive Design

L'applicazione è completamente responsive:

- **Desktop (≥1024px)**: Layout a 3 colonne con sidebar laterale
- **Tablet (768px-1023px)**: Layout a 2 colonne
- **Mobile (<768px)**: Layout a colonna singola con menu bottom

## 🎨 Temi

### Light Mode
- Colori chiari e vibranti
- Ottimo per ambienti luminosi
- Contrasto ottimizzato per leggibilità

### Dark Mode
- Palette scura con accenti colorati
- Riduce l'affaticamento degli occhi
- Perfetto per sessioni notturne

## 🛠️ Script Disponibili

```bash
npm run dev        # Avvia il server di sviluppo
npm run build      # Crea build di produzione
npm run preview    # Anteprima build di produzione
npm run lint       # Esegui ESLint
npm run api        # Avvia JSON Server (porta 3000)
```

## 🤝 Contribuire

Le contribuzioni sono benvenute! Per contribuire:

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è rilasciato sotto licenza MIT.

## 👨‍💻 Autore

Creato con ❤️ per la gestione efficiente dei task.

---

**Nota**: Questa è un'applicazione demo. I dati sono salvati solo nel browser (localStorage e JSON Server locale). Per un uso in produzione, implementare un backend sicuro con database persistente.
