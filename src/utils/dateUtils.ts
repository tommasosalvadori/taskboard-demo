// Converte una stringa data (YYYY-MM-DD) in una Date locale (evita problemi timezone)
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Formatta una Date in stringa YYYY-MM-DD (formato input date)
export function formatDateToInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Converte stringa YYYY-MM-DD in formato italiano leggibile
export function formatDateToItalian(dateString: string): string {
  const date = parseLocalDate(dateString);
  return date.toLocaleDateString('it-IT', { 
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  });
}

// Controlla se due date sono lo stesso giorno
export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}




