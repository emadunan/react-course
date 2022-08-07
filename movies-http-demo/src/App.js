import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(null);
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) throw new Error("Can't fetch data from API");
      
      const data = await response.json()

      const transformedMovies = data.results.map(movie => ({
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date
      }));

      setMovies(transformedMovies);
    } catch (error) {
      setIsError(error.message)
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && "Loading ..."}
        {!isLoading && movies.length === 0 && !isError && "No found movies"}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && isError && <p>{isError}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
