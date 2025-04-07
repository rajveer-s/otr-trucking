'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        // Try to get user data from localStorage first (more reliable on mobile)
        const storedUser = localStorage.getItem('user_data');

        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsLoading(false);
          return;
        }

        // Fallback to cookies if localStorage is not available
        const token = Cookies.get('auth_token');
        const userCookie = Cookies.get('user_data');

        if (!token || !userCookie) {
          setIsLoading(false);
          return;
        }

        const userData = JSON.parse(userCookie);
        setUser(userData);

        // Also store in localStorage for future use
        localStorage.setItem('user_data', JSON.stringify(userData));
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
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

      // Store in localStorage (more reliable on mobile)
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      localStorage.setItem('auth_token', 'mock_jwt_token');

      // Also set cookies as backup
      Cookies.set('auth_token', 'mock_jwt_token', {
        expires: 7,
        sameSite: 'lax'
      });
      Cookies.set('user_data', JSON.stringify(mockUser), {
        expires: 7,
        sameSite: 'lax'
      });

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
    // Remove from localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');

    // Remove cookies
    Cookies.remove('auth_token');
    Cookies.remove('user_data');

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
