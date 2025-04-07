'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  licenseNumber?: string;
  experience?: string;
  preferredRoutes?: string[];
  department?: string;
  accessLevel?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

// Helper functions for cookie management
const setCookie = (name: string, value: string, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user data from cookies on mount
  useEffect(() => {
    const loadUserFromCookies = () => {
      try {
        // Try to get user data from cookies
        const userCookie = getCookie('user_data');

        if (userCookie) {
          const userData = JSON.parse(userCookie);
          setUser(userData);
          setIsLoading(false);
          return;
        }

        // If no user data cookie, check for auth token
        const token = getCookie('auth_token');

        if (!token) {
          setIsLoading(false);
          return;
        }

        // If we have a token but no user data, we might need to fetch user data
        // For now, just set loading to false
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Login attempt with:', email);

      // Mock API call - replace with actual API call
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'owner',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces&q=80',
        phone: '(555) 123-4567',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        department: 'Operations',
        accessLevel: 'Full',
      };

      // Set cookies using native browser cookies
      setCookie('auth_token', 'mock_jwt_token');
      setCookie('user_data', JSON.stringify(mockUser));

      // Set user state
      setUser(mockUser);

      // Navigate after state is updated
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Remove cookies using native browser cookies
    deleteCookie('auth_token');
    deleteCookie('user_data');

    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
