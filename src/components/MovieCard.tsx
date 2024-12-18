import React from 'react';
import { Movie } from '../types/Movie';
import { useWatchList } from '../context/WatchListContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addToWatchList } = useWatchList();

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button onClick={() => addToWatchList(movie)}>Add to Watch List</button>
    </div>
  );
};

export default MovieCard;
