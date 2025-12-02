// ⚠️ IMPORTANTE: NON CANCELLARE QUESTO FILE
// Questo file contiene i tipi condivisi dell'applicazione
// Tutti i componenti DEVONO importare da qui per evitare errori circolari

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'todo';
  createdAt: string;
}
