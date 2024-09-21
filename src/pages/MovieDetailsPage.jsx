import React from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import MovieCast from "../components/MovieCast";
import MovieReviews from "../components/MovieReviews";

const MovieDetailsPage = () => {
  const { movieID } = useParams();
  const location = useLocation();
  const goBackLink = location.state ?? "/movies";

  return (
    <>
      <div>
        <Link to={goBackLink}>Go Back</Link>
        <h1>{movieID} Additional information </h1>

        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet context={{ movieId }} />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
