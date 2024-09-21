// import React, { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";

// const MovieReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [error, setError] = useState(null);
//   const { movieId } = useOutletContext();

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=57014c96b87c08f332a92718923bcab2`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch reviews");
//         }
//         const data = await response.json();
//         setReviews(data.results);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchReviews();
//   }, [movieId]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (reviews.length === 0) {
//     return <div>No reviews available for this movie.</div>;
//   }

//   return (
//     <div>
//       <h2>Reviews</h2>
//       <ul>
//         {reviews.map((review) => (
//           <li key={review.id}>
//             <h3>{review.author}</h3>
//             <p>{review.content}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MovieReviews;

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
