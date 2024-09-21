import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=57014c96b87c08f332a92718923bcab2"
      );
      const data = await response.json();
      setMovies(data.result);
    };
  });

  return (
     <div>
      <h1>Популярні фільми</h1>
      <MovieList movies={movies} />
  </div>;
  )
 
};

export default HomePage;
