import React from "react";

function SearchBar({ query, setQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch();
  };

  const clear = () => setQuery("");

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search" aria-label="Search movies">
      <label htmlFor="movie-search" className="visually-hidden">Search movie</label>
      <input
        id="movie-search"
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Movie title"
      />

      <div className="search-actions">
        <button type="submit" className="btn primary" disabled={!query.trim()} aria-disabled={!query.trim()}>
          Search
        </button>
        <button type="button" className="btn" onClick={clear} aria-label="Clear search">
          Clear
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
