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

  // Load user data from cookies on mount
  useEffect(() => {
    const loadUserFromCookies = () => {
      try {
        const token = Cookies.get('auth_token');
        const userCookie = Cookies.get('user_data');

        if (!token || !userCookie) {
          setIsLoading(false);
          return;
        }

        const userData = JSON.parse(userCookie);
        setUser(userData);
      } catch (error) {
        console.error('Error loading user data:', error);
        // Don't remove cookies on parse error, they might be valid on next load
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock API call - replace with actual API call
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'owner',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces&q=80',
      };

      // Store authentication token (expires in 7 days)
      Cookies.set('auth_token', 'mock_jwt_token', {
        expires: 7,
        secure: true,
        sameSite: 'strict'
      });

      // Store user data (expires in 7 days)
      Cookies.set('user_data', JSON.stringify(mockUser), {
        expires: 7,
        secure: true,
        sameSite: 'strict'
      });

      setUser(mockUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Remove all auth-related cookies
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
