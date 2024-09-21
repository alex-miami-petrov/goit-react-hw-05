import React, { useEffect, useState } from "react";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=YOUR_API_KEY`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (reviews.length === 0) {
    return <div>No reviews available for this movie.</div>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
