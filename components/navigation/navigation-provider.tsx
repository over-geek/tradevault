"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type NavigationContextType = {
  currentPage: string;
  navigateTo: (page: string) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentPage, setCurrentPage] = useState('/');

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page);
    
    window.dispatchEvent(new CustomEvent('page-changed', { detail: page }));
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}
