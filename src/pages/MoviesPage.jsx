import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../Api/Api";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query: e.target.inputQuery.value.trim().toLowerCase() });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      try {
        const moviesData = await fetchMoviesByQuery(query);
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch the movies", error);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movie-search">
          <input
            type="text"
            name="inputQuery"
            id="movie-search"
            defaultValue={query}
            // onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
