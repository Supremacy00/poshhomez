import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext/Auth-Context';

export const useAuth = () => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
  
    const { user, isLoading, isAuthChecking, error } = context;
    const isAuthenticated = Boolean(user);
  
    const isReady = !isLoading && !isAuthChecking && !error;
  
    return { ...context, isAuthenticated, isReady };
  };
  