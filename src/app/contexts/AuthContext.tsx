import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Instructor } from '../types';
import { mockCurrentUser, mockInstructors } from '../data/mockData';

interface AuthContextType {
  user: User | Instructor | null;
  isAuthenticated: boolean;
  isInstructor: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchToInstructor: () => void;
  switchToStudent: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | Instructor | null>(mockCurrentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const isInstructor = user?.user_type === 'INSTRUCTOR';

  const login = async (email: string, password: string) => {
    // Mock login - em produção, isso faria uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email.includes('instrutor') || email.includes('instructor')) {
      setUser(mockInstructors[0]);
    } else {
      setUser(mockCurrentUser);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const switchToInstructor = () => {
    setUser(mockInstructors[0]);
  };

  const switchToStudent = () => {
    setUser(mockCurrentUser);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isInstructor, login, logout, switchToInstructor, switchToStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
