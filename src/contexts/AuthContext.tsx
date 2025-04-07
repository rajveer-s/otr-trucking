'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/lib/data/mockData';
import { User } from '@/types';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from cookies on initial load
  useEffect(() => {
    try {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        setUser(JSON.parse(userCookie));
      } else {
        // If no cookie is found, redirect to login
        router.push('/login');
      }
    } catch (error) {
      console.error('Error loading user from cookies:', error);
      Cookies.remove('user');
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const user = mockUsers.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Store user data with all required properties
      const userData: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        password: user.password,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        ...(user.licenseNumber && { licenseNumber: user.licenseNumber }),
        ...(user.experience && { experience: user.experience }),
        ...(user.preferredRoutes && { preferredRoutes: user.preferredRoutes }),
        ...(user.department && { department: user.department }),
        ...(user.accessLevel && { accessLevel: user.accessLevel }),
      };

      setUser(userData);
      // Store in cookie instead of localStorage
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Expires in 7 days
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear user state
    setUser(null);

    // Clear cookie
    Cookies.remove('user');

    // Force a hard reload to clear all state
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
