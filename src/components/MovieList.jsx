import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, onSelect }) {
  if (!movies.length) return null; // no movies, handled by parent

  return (
    <section className="movie-list" role="list" aria-label="Movie collection">
      {movies.map((movie) => (
        <div role="listitem" key={movie.id}>
          <MovieCard movie={movie} onClick={() => onSelect && onSelect(movie.id)} />
        </div>
      ))}
    </section>
  );
}

export default MovieList;
