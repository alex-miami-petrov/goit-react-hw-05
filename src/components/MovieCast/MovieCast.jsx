import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchMovieCast } from "../../Api/Api";

const MovieCast = () => {
  const { movieId } = useOutletContext();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData);
      } catch (error) {
        setError("Failed to fetch cast");
      }
    };

    getCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;

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
