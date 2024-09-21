import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../Api/Api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.themoviedb.org/3/trending/movie/day?api_key=57014c96b87c08f332a92718923bcab2"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch movies");
  //       }
  //       const data = await response.json();
  //       setMovies(data.results);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Error fetching trending movies", error);
      }
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
