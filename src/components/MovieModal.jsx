import React, { useEffect } from "react";

function MovieModal({ movie, loading, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (loading) {
    return (
      <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="modal" aria-live="polite">
          <div className="modal-body">Loading details...</div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;

  // youtube trailer
  const videos = movie.videos && movie.videos.results ? movie.videos.results : [];
  const trailer = videos.find(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));

  const runtime = movie.runtime ? `${movie.runtime} min` : "—";
  const genres = movie.genres ? movie.genres.map(g => g.name).join(", ") : "—";

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-label={`${movie.title} details`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-grid">
          <div className="modal-poster">
            {poster ? <img src={poster} alt={`${movie.title} poster`} /> : <div className="no-poster">No Image</div>}
          </div>

          <div className="modal-info">
            <h2>{movie.title} <span className="muted">({movie.release_date ? movie.release_date.split("-")[0] : "—"})</span></h2>
            <div className="meta-row">
              <span className="chip">{genres}</span>
              <span className="chip">{runtime}</span>
              <span className="rating">⭐ {movie.vote_average ?? "—"}</span>
            </div>

            <p className="overview">{movie.overview || "No synopsis available."}</p>

            {trailer ? (
              <div className="trailer">
                <h3>Trailer</h3>
                <div className="video-wrap">
                  <iframe
                    title="trailer"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="no-trailer">No trailer available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
