import type { RegisteredUser, AuthToken, LoginCredentials, RegisterData, User } from '../types';

const USERS_KEY = 'taskboard_users';
const AUTH_TOKEN_KEY = 'taskboard_auth_token';
const CURRENT_USER_KEY = 'user'; // Manteniamo compatibilità con il vecchio sistema

// Validazione password: minimo 8 caratteri, almeno un carattere speciale, una maiuscola, un numero
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('La password deve contenere almeno 8 caratteri');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('La password deve contenere almeno una lettera maiuscola');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('La password deve contenere almeno una lettera minuscola');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('La password deve contenere almeno un numero');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('La password deve contenere almeno un carattere speciale (!@#$%^&*...)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Validazione email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Ottieni tutti gli utenti registrati
export const getRegisteredUsers = (): RegisteredUser[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Errore nel recupero degli utenti:', error);
    return [];
  }
};

// Salva utenti
const saveUsers = (users: RegisteredUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Genera token finto
const generateToken = (userId: string): AuthToken => {
  const token = `token_${userId}_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 giorni
  
  return {
    token,
    userId,
    expiresAt
  };
};

// Salva token
const saveAuthToken = (authToken: AuthToken): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(authToken));
};

// Ottieni token corrente
export const getAuthToken = (): AuthToken | null => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;
    
    const authToken: AuthToken = JSON.parse(token);
    
    // Verifica se il token è scaduto
    if (authToken.expiresAt < Date.now()) {
      logout();
      return null;
    }
    
    return authToken;
  } catch (error) {
    console.error('Errore nel recupero del token:', error);
    return null;
  }
};

// Verifica se l'utente è autenticato
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

// Ottieni utente corrente
export const getCurrentUser = (): User | null => {
  const authToken = getAuthToken();
  if (!authToken) return null;
  
  const users = getRegisteredUsers();
  const registeredUser = users.find(u => u.id === authToken.userId);
  
  if (!registeredUser) {
    logout();
    return null;
  }
  
  // Converti RegisteredUser a User (senza password)
  const user: User = {
    id: registeredUser.id,
    name: registeredUser.name,
    email: registeredUser.email,
    avatar: registeredUser.avatar
  };
  
  return user;
};

// Registrazione
export const register = (data: RegisterData): { success: boolean; error?: string; user?: User } => {
  const { name, email, password, confirmPassword } = data;
  
  // Validazione nome
  if (!name.trim() || name.trim().length < 2) {
    return { success: false, error: 'Il nome deve contenere almeno 2 caratteri' };
  }
  
  // Validazione email
  if (!validateEmail(email)) {
    return { success: false, error: 'Email non valida' };
  }
  
  // Validazione password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return { success: false, error: passwordValidation.errors.join('. ') };
  }
  
  // Verifica conferma password
  if (password !== confirmPassword) {
    return { success: false, error: 'Le password non coincidono' };
  }
  
  // Verifica se l'utente esiste già
  const users = getRegisteredUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    return { success: false, error: 'Un utente con questa email è già registrato' };
  }
  
  // Crea nuovo utente
  const newUser: RegisteredUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password, // In produzione, questa dovrebbe essere hashata!
    createdAt: new Date().toISOString()
  };
  
  // Salva utente
  users.push(newUser);
  saveUsers(users);
  
  // Effettua login automatico
  const authToken = generateToken(newUser.id);
  saveAuthToken(authToken);
  
  const user: User = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar
  };
  
  // Salva anche nel vecchio formato per compatibilità
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  
  return { success: true, user };
};

// Login
export const login = (credentials: LoginCredentials): { success: boolean; error?: string; user?: User } => {
  const { email, password } = credentials;
  
  // Validazione email
  if (!validateEmail(email)) {
    return { success: false, error: 'Email non valida' };
  }
  
  // Validazione password vuota
  if (!password) {
    return { success: false, error: 'Inserisci la password' };
  }
  
  // Cerca utente
  const users = getRegisteredUsers();
  const registeredUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!registeredUser) {
    return { success: false, error: 'Credenziali non valide' };
  }
  
  // Verifica password
  if (registeredUser.password !== password) {
    return { success: false, error: 'Credenziali non valide' };
  }
  
  // Genera e salva token
  const authToken = generateToken(registeredUser.id);
  saveAuthToken(authToken);
  
  const user: User = {
    id: registeredUser.id,
    name: registeredUser.name,
    email: registeredUser.email,
    avatar: registeredUser.avatar
  };
  
  // Salva anche nel vecchio formato per compatibilità
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  
  return { success: true, user };
};

// Logout
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

