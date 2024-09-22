import React, { useEffect, useState, Suspense } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
} from "../Api/Api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const goBackLink = location.state ?? "/movies";
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        setError("Failed to fetch movie details");
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <>
      {movieDetails && (
        <div>
          <Link to={goBackLink}>Go Back</Link>

          <h1>{movieDetails.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <p>User Score: {(movieDetails.vote_average * 10).toFixed(2)}%</p>
          <p>Overview: {movieDetails.overview}</p>
          <p>
            Genres: {movieDetails.genres.map((genre) => genre.name).join(", ")}
          </p>
          <h2>Additional information</h2>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </div>
      )}
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet context={{ movieId }} />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
