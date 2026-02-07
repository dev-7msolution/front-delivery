'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthContextType, User, LoginCredentials } from '@/types/auth';
import { loginUser, saveAuthData, getAuthData, clearAuthData } from '@/lib/api/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Carregar dados de autenticação do localStorage ao iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { token: savedToken, user: savedUser } = getAuthData();
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await loginUser(credentials);
      
      setToken(response.token);
      setUser(response.user);
      saveAuthData(response.token, response.user);
      console.log('login successful', response.user.empresaId);
      
      // Redirecionar para dashboard ou home
      if (typeof window !== 'undefined') {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearAuthData();
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
