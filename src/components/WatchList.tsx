import React from 'react';
import { useWatchList } from '../context/WatchListContext';

const WatchList: React.FC = () => {
  const { watchList, removeFromWatchList, updateRating } = useWatchList();

  if (watchList.length === 0) {
    return <p>Your watch list is empty.</p>;
  }

  return (
    <div className="watch-list">
      <h2>Your Watch List</h2>
      {watchList.map((movie) => (
        <div key={movie.imdbID} className="watch-list-item">
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title} ({movie.Year})</h3>
          <label>
            Rating:
            <input
              type="number"
              value={movie.Rating || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                updateRating(movie.imdbID, Number(e.target.value))}
              min="1"
              max="5"
            />
          </label>
          <button onClick={() => removeFromWatchList(movie.imdbID)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default WatchList;
