import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      try {
        const moviesData = await fetchMoviesByQuery(query);
        setMovies(moviesData);
      }
      catch (error) {
        console.error("Failed to fetch the movies", error)
      }
      
    }
    fetchMovies()
  }, [query]);

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="movie-search">
          <input type="text" id="movie-search" value={query} onChange={(e) => setSearchParams(query: e.target.value)} />
        </label>
<button type="submit">Search</button>
      </form>
      
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
