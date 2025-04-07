'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/lib/data/mockData';
import { User } from '@/types';

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

  // Load user from localStorage on initial load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear user state
    setUser(null);

    // Clear localStorage
    localStorage.removeItem('user');

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
