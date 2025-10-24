import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { loginUser, registerUser, getUserById, updateUserProfile, verifyEmailCode } from '../services/mockData';
import { useToast } from '@/hooks/use-toast'; // [ADDED]: For toast notifications

/* [CHANGE 1]: Update User type to include googleId and isVerified
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'requester' | 'runner' | 'both';
  avatar?: string;
  googleId?: string; // Added for Google OAuth
  isVerified?: boolean; // Added for email verification
};
*/
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (userData: Partial<User> & { password: string }) => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<boolean>; // [ADDED]: For email verification
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast(); // [ADDED]: For error notifications

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      getUserById(parsedUser.id).then((userData) => {
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string = '') => {
    setIsLoading(true);
    try {
      const userData = await loginUser(email, password);
      if (!userData) {
        toast({ title: "Error", description: "Invalid email or password", variant: "destructive" });
        setIsLoading(false);
        return null;
      }
      // [CHANGE 2]: Check if user is verified
      if (!userData.isVerified && password !== '') {
        toast({ title: "Error", description: "Please verify your email before logging in", variant: "destructive" });
        setIsLoading(false);
        return null;
      }
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return userData;
    } catch (error) {
      toast({ title: "Error", description: "Login failed. Please try again.", variant: "destructive" });
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // [CHANGE 3]: Initialize isVerified: false for new users
      const newUser = await registerUser({
        ...userData,
        isVerified: false, // Ensure new users are unverified
        googleId: userData.googleId, // Support Google OAuth
      });
      if (newUser) {
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      setIsLoading(false);
      return newUser;
    } catch (error) {
      toast({ title: "Error", description: "Registration failed. Please try again.", variant: "destructive" });
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // [CHANGE 4]: Add verifyEmail function
  const verifyEmail = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      const isVerified = await verifyEmailCode(email, code);
      if (isVerified && user) {
        const updatedUser = { ...user, isVerified: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
      }
      toast({ title: "Error", description: "Invalid verification code", variant: "destructive" });
      return false;
    } catch (error) {
      toast({ title: "Error", description: "Verification failed. Please try again.", variant: "destructive" });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!user) {
      toast({ title: "Error", description: "No user is logged in", variant: "destructive" });
      throw new Error('No user is logged in');
    }
    setIsLoading(true);
    try {
      const updatedUserData = await updateUserProfile(user.id, updatedUser);
      if (updatedUserData) {
        setUser(updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      }
      setIsLoading(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to update user profile", variant: "destructive" });
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
        updateUser,
        verifyEmail, // [CHANGE 5]: Provide verifyEmail function
      }}
    >
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