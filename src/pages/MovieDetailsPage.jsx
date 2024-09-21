// import React, { useEffect, useState } from "react";
// import { Link, Outlet, useLocation, useParams } from "react-router-dom";

// const MovieDetailsPage = () => {
//   const { movieId } = useParams();
//   const location = useLocation();
//   const goBackLink = location.state ?? "/";
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}?api_key=57014c96b87c08f332a92718923bcab2`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch movie details");
//         }
//         const data = await response.json();
//         setMovieDetails(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchMovieDetails();
//   }, [movieId]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!movieDetails) {
//     return <div>Loading...</div>;
//   }

//   const { title, poster_path, vote_average, overview, genres } = movieDetails;

//   return (
//     <>
//       <div>
//         <Link to={goBackLink}>Go Back</Link>
//         <h1>{title}</h1>
//         <img
//           src={`https://image.tmdb.org/t/p/w500${poster_path}`}
//           alt={title}
//         />
//         <p>User Score: {Math.round(vote_average * 10)}%</p>
//         <h2>Overview</h2>
//         <p>{overview}</p>
//         <h3>Genres</h3>
//         <ul>
//           {genres.map((genre) => (
//             <li key={genre.id}>{genre.name}</li>
//           ))}
//         </ul>

//         <ul>
//           <li>
//             <Link to="cast">Cast</Link>
//           </li>
//           <li>
//             <Link to="reviews">Reviews</Link>
//           </li>
//         </ul>
//       </div>
//       <Outlet context={{ movieId }} />
//     </>
//   );
// };

// export default MovieDetailsPage;

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
  const goBackLink = location.state ?? "/";
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
