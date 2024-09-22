import axios from "axios";

const API_KEY = "57014c96b87c08f332a92718923bcab2";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await api.get(`/trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch trending movies", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch movie details for ID ${movieId}`, error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await api.get(
      `/movie/${movieId}/reviews?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error(`Failed to fetch reviews for movie ID ${movieId}`, error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await api.get(
      `/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    return response.data.cast;
  } catch (error) {
    console.error(`Failed to fetch cast for movie ID ${movieId}`, error);
    throw error;
  }

  export const fetchMoviesByQuery = async (query) => {
    const response = await api.get(
      `/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
  };
};
