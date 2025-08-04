import { create } from 'zustand';
import { users, type User } from '../data/users';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (data: { username: string; email: string; password: string; fullName: string; role: 'admin' | 'principal' | 'distributor' | 'agent' | 'customer' | 'reseller' }) => Promise<void>;
}

// Initialize state from localStorage if available
const getInitialState = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const useAuth = create<AuthState>((set) => ({
  user: getInitialState(),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = users.find(u => u.email === email && u.passwordHash === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  logout: () => {
    // Clear localStorage on logout
    localStorage.removeItem('user');
    set({ user: null, error: null });
  },

  signUp: async (data) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to create the user
      // For now, we'll just simulate success
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  }
})); 