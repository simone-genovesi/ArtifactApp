import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as authServiceLogin, logout as authServiceLogout, isAuthenticated as authServiceIsAuthenticated, getCurrentUser as authServiceGetCurrentUser } from './AuthService'; // Importa le funzioni del AuthService
import { AuthContextType, LoginDTO, RegisterDTO, User } from '../models/User';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType | null => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const initialAuthData: AuthContextType = {
    user: null,
    loading: true,
    login: async (loginData: LoginDTO) => {},
    register: async (registerData: RegisterDTO) => {
      return {} as User;
    },
    getUserData: async () => {
      return {} as User;
    },
    logout: () => {},
    isAuthenticated: () => false,
    getCurrentUser: () => null,
    getUserById: async (userId: string) => {
      return {} as User;
    },
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = authServiceIsAuthenticated();
      if (isAuthenticated) {
        const currentUser = authServiceGetCurrentUser();

        if (currentUser) {
          setUser(currentUser);
        }
      }
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  const login = async (loginData: LoginDTO) => {
    const token = await authServiceLogin(loginData);
    if (token) {
      const currentUser = authServiceGetCurrentUser();
      setUser(currentUser);
    }
  };

  const logout = () => {
    authServiceLogout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ ...initialAuthData, user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};