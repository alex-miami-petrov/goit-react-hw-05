// import React from "react";

// const MovieList = ({ movies }) => {
//   return (
//     <ul>
//       {movies.map((movie) => (
//         <li key={movie.id}>
//           <h2>{movie.title}</h2>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MovieList;

import React from "react";
import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
