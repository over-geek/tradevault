"use client";

import { useNavigation } from './navigation-provider';
import { useEffect } from 'react';

import HomePage from '@/app/page';
import AccountsPage from '@/app/accounts/page';
import JournalPage from '@/app/journal/page';
import TradingPlanPage from '@/app/trading-plan/page';

export function PageRouter() {
  const { currentPage, navigateTo } = useNavigation();

  useEffect(() => {
    const handlePopState = () => {
      navigateTo(window.location.pathname);
    };

    const handleCustomNavigate = (event: any) => {
      navigateTo(event.detail);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('navigate', handleCustomNavigate);
    
    // Set initial page based on current URL
    navigateTo(window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigate', handleCustomNavigate);
    };
  }, [navigateTo]);

  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <HomePage />;
      case '/accounts':
        return <AccountsPage />;
      case '/journal':
        return <JournalPage />;
      case '/trading-plan':
        return <TradingPlanPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {renderPage()}
    </div>
  );
}
