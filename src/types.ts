// ⚠️ IMPORTANTE: NON CANCELLARE QUESTO FILE
// Questo file contiene i tipi condivisi dell'applicazione
// Tutti i componenti DEVONO importare da qui per evitare errori circolari

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'todo';
  createdAt: string;
  startDate?: string;
  dueDate?: string;
  difficulty?: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}