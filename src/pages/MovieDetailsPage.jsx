import React, { useEffect, useState, Suspense, useRef } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
} from "../Api/Api";
import s from "./MovieDetailsPage.module.css";
import { FaArrowLeft } from "react-icons/fa";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const stateRef = useRef(location.state);
  const goBackLink = stateRef.current ?? "/movies";
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
          <Link to={goBackLink} className={s.backLink}>
            <FaArrowLeft />
            Go Back
          </Link>
          <div className={s.detailsWrap}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <ul className={s.detailsList}>
              <li>
                <h1>{movieDetails.title}</h1>
              </li>
              <li>User Score: {(movieDetails.vote_average * 10).toFixed()}%</li>
              <li>
                <h2>Overview:</h2> {movieDetails.overview}
              </li>
              <li>
                <h2>Genres:</h2>{" "}
                {movieDetails.genres.map((genre) => genre.name).join(", ")}
              </li>
            </ul>
          </div>

          <h2>Additional information</h2>
          <ul className={s.infoList}>
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
