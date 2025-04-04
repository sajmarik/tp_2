
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchShows, Show } from '@/services/api';

interface ShowContextType {
  shows: Show[];
  isLoading: boolean;
  error: string | null;
  refreshShows: () => Promise<void>;
  filterByCategory: (category: string) => Show[];
}

const ShowContext = createContext<ShowContextType | undefined>(undefined);

export const ShowProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadShows = async () => {
    setIsLoading(true);
    try {
      const data = await fetchShows();
      setShows(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch shows');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadShows();
  }, []);

  const refreshShows = async () => {
    await loadShows();
  };

  const filterByCategory = (category: string): Show[] => {
    return shows.filter(show => show.category === category);
  };

  return (
    <ShowContext.Provider 
      value={{ 
        shows, 
        isLoading, 
        error, 
        refreshShows,
        filterByCategory 
      }}
    >
      {children}
    </ShowContext.Provider>
  );
};

export const useShows = () => {
  const context = useContext(ShowContext);
  if (context === undefined) {
    throw new Error('useShows must be used within a ShowProvider');
  }
  return context;
};
