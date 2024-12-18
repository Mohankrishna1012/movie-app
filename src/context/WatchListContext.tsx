import React, { createContext, useContext, useState } from 'react';
import { Movie } from '../types/Movie';

interface WatchListContextProps {
  watchList: Movie[];
  addToWatchList: (movie: Movie) => void;
  removeFromWatchList: (id: string) => void;
  updateRating: (id: string, rating: number) => void;
}

const WatchListContext = createContext<WatchListContextProps | undefined>(undefined);

export const WatchListProvider: React.FC = ({ children }) => {
  const [watchList, setWatchList] = useState<Movie[]>([]);

  const addToWatchList = (movie: Movie) => {
    setWatchList((prev) => [...prev, movie]);
  };

  const removeFromWatchList = (id: string) => {
    setWatchList((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  const updateRating = (id: string, rating: number) => {
    setWatchList((prev) =>
      prev.map((movie) =>
        movie.imdbID === id ? { ...movie, Rating: rating } : movie
      )
    );
  };

  return (
    <WatchListContext.Provider value={{ watchList, addToWatchList, removeFromWatchList, updateRating }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = (): WatchListContextProps => {
  const context = useContext(WatchListContext);
  if (!context) {
    throw new Error('useWatchList must be used within a WatchListProvider');
  }
  return context;
};
