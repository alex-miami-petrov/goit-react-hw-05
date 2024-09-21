import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const handleSearch = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
    );
    const data = await response.json();
    setMovies(data.results)
  };
  return (
    <div>
      <h1>Пошук фільмів</h1>
      <input type="text" onChange={(e) => handleSearch(e.target.value)} />
      <MovieList movies={movies} />
    </div>;
  ) 
};

export default MoviesPage;
