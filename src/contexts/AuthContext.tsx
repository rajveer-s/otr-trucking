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

// Cookie options based on environment
const getCookieOptions = () => ({
  expires: 7,
  // Use more permissive cookie settings for better mobile compatibility
  sameSite: 'lax' as const,
  // Only use secure in production and when on HTTPS
  ...(process.env.NODE_ENV === 'production' && window.location.protocol === 'https:' && {
    secure: false
  })
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

      // Store authentication token and user data
      const cookieOptions = getCookieOptions();
      console.log('Setting cookies with options:', cookieOptions);

      // Set cookies immediately
      Cookies.set('auth_token', 'mock_jwt_token', cookieOptions);
      Cookies.set('user_data', JSON.stringify(mockUser), cookieOptions);

      // Verify cookies were set
      const token = Cookies.get('auth_token');
      const userCookie = Cookies.get('user_data');
      console.log('Cookies set successfully:', !!token, !!userCookie);

      // Set user state
      setUser(mockUser);

      // Use a small delay before navigation to ensure state is updated
      setTimeout(() => {
        router.push('/dashboard');
      }, 300);
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
