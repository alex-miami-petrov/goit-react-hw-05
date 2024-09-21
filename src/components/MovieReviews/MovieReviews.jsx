import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchMovieReviews } from "../../Api/Api";

const MovieReviews = () => {
  const { movieId } = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await fetchMovieReviews(movieId);
        setReviews(reviewData);
      } catch (error) {
        setError("Failed to fetch reviews");
      }
    };

    getReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available for this movie.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
