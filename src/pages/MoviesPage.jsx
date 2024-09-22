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

  const useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      try {
        const moviesData = await fetchMoviesByQuery(query);
        setSearchParams(moviesData);
      }
      catch (error) {
        console.error("Failed to fetch the movies", error)
      }
      fetchMovies()
    }
  }, [query]);

  return (
    <div>
      <h1>Пошук фільмів</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movie-search">
          <input type="text" value={query} onChange={(e) => handleSubmit(e.target.value)} />
        </label>

      </form>
      
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
