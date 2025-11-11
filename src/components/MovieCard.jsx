import React from "react";

function MovieCard({ movie, onClick }) {
  const year = movie.release_date ? movie.release_date.split("-")[0] : "—";
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const handleKey = (e) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") onClick();
  };

  return (
    <article
      className="movie-card"
      tabIndex={0}
      aria-labelledby={`title-${movie.id}`}
      onClick={() => onClick && onClick()}
      onKeyDown={handleKey}
      role={onClick ? "button" : "article"}
    >
      {poster ? (
        <img src={poster} alt={`${movie.title} poster`} />
      ) : (
        <div className="no-poster" aria-hidden="true">
          <svg width="80" height="100" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="100" rx="8" fill="#2b2b2b" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#888" fontSize="10">No Image</text>
          </svg>
        </div>
      )}

      <div className="movie-info">
        <h3 id={`title-${movie.id}`}>{movie.title}</h3>
        <div className="meta">
          <span className="year">{year}</span>
          {movie.vote_average !== undefined && (
            <span className="rating">⭐ {movie.vote_average}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
