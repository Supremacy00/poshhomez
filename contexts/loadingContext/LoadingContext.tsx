'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  isAuthChecking: boolean; // Add isAuthChecking to the context
  setLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [isAuthChecking, setAuthChecking] = useState(true); // Initialize isAuthChecking state

  return (
    <LoadingContext.Provider value={{ isLoading, isAuthChecking, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
