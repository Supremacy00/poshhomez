'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ContentMenuContextType } from '@/@types';



const ProfileContentMenuContext = createContext<ContentMenuContextType | undefined>(undefined);

export const useContentMenu = () => {
  const context = useContext(ProfileContentMenuContext);
  if (!context) {
    throw new Error('useContentMenu must be used within a ContentMenuProvider');
  }
  return context;
};

interface ContentMenuProviderProps {
  children: ReactNode;
}

export const ContentMenuProvider = ({ children }: ContentMenuProviderProps) => {
  const [contentMenu, setContentMenu] = useState<string>('Personal Info');

  const handleContentMenu = (status: string) => {
    setContentMenu(status);
  };

  const contextValue: ContentMenuContextType = {
    contentMenu,
    handleContentMenu,
  };

  return (
    <ProfileContentMenuContext.Provider value={contextValue}>
      {children}
    </ProfileContentMenuContext.Provider>
  );
};
