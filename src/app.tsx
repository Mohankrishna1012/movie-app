import React, { useState } from 'react';
import axios from 'axios';
import { Movie } from './types/Movie';
import MovieCard from './components/MovieCard';
import WatchList from './components/WatchList';
import { WatchListProvider } from './context/WatchListContext';
import './styles/App.css';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');

  const fetchMovies = async () => {
    if (query.trim()) {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=57fac967`);
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  };

  return (
    <WatchListProvider>
      <div className="App">
        <h1>Movie Library</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
          <button onClick={fetchMovies}>Search</button>
        </div>
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
        <WatchList />
      </div>
    </WatchListProvider>
  );
};

export default App;
