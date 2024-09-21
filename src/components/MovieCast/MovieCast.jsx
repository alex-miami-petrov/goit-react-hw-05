import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useOutletContext();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=57014c96b87c08f332a92718923bcab2`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cast");
        }
        const data = await response.json();
        setCast(data.cast);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
