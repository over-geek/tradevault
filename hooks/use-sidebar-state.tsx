"use client";

import { useState, useEffect } from "react";

export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkSidebarState = () => {
      const sidebar = document.querySelector('[data-slot="sidebar"]');
      if (sidebar) {
        const sidebarContainer = sidebar.closest('[data-state]');
        if (sidebarContainer) {
          const state = sidebarContainer.getAttribute('data-state');
          setIsCollapsed(state === 'collapsed');
        }
      }
    };

    checkSidebarState();

    const handleSidebarStateChange = () => {
      setTimeout(checkSidebarState, 100);
    };

    document.addEventListener('click', handleSidebarStateChange);
    
    window.addEventListener('sidebar-state-changed', handleSidebarStateChange);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-state') {
          checkSidebarState();
        }
      });
    });

    const sidebarElement = document.querySelector('[data-state]');
    if (sidebarElement) {
      observer.observe(sidebarElement, { attributes: true });
    }

    return () => {
      document.removeEventListener('click', handleSidebarStateChange);
      window.removeEventListener('sidebar-state-changed', handleSidebarStateChange);
      observer.disconnect();
    };
  }, []);

  return { isCollapsed };
}
