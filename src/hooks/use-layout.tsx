import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LayoutType = 'grid' | 'list';

interface LayoutContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutType>('grid');

  // Load saved layout preference on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem('motorado-layout') as LayoutType;
    if (savedLayout && (savedLayout === 'grid' || savedLayout === 'list')) {
      setLayoutState(savedLayout);
    }
  }, []);

  const setLayout = (newLayout: LayoutType) => {
    setLayoutState(newLayout);
    localStorage.setItem('motorado-layout', newLayout);
  };

  const toggleLayout = () => {
    const newLayout = layout === 'grid' ? 'list' : 'grid';
    setLayout(newLayout);
  };

  return (
    <LayoutContext.Provider value={{ layout, setLayout, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}