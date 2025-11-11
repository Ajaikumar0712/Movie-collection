import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";

const API_KEY = "8fbec20df76ef6fd1bd99cc81ed39122"; 

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [modalLoading, setModalLoading] = useState(false);

  const searchMovie = async () => {
    setError("");
    setMovies([]);
    setCollectionName("");
    setLoading(true);

    try {
      // Step 1: Search movie by name
      const searchRes = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );

      if (searchRes.data.results.length === 0) {
        setError(" No movie found!");
        setLoading(false);
        return;
      }

      // Step 2: Get first movie details
      const movie = searchRes.data.results[0];
      const movieDetails = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
      );

      // Step 3: Check collection
      const collection = movieDetails.data.belongs_to_collection;

      if (collection) {
        const collectionRes = await axios.get(
          `https://api.themoviedb.org/3/collection/${collection.id}?api_key=${API_KEY}`
        );
        setCollectionName(collectionRes.data.name);
        setMovies(collectionRes.data.parts);
      } else {
        setError("⚠️ This movie doesn't belong to any collection!");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // fetch and open movie details in a modal
  const openMovieDetails = async (movieId) => {
    
    setModalLoading(true);
    try {
     
      const detailsRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
      );

      setSelectedMovie(detailsRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load movie details.");
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => setSelectedMovie(null);

  const focusSearch = () => {
    const el = document.getElementById("movie-search");
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="hero">
          <div className="hero-inner">
            <h1 className="hero-title">🎬 Movie Collection Finder</h1>
            <p className="hero-subtitle">Discover full collections, trailers and details — search any movie</p>

          </div>
        </div>
      </header>

      <main className="app-container">
        <SearchBar query={query} setQuery={setQuery} onSearch={searchMovie} />

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {collectionName && <h2 className="collection-name">{collectionName}</h2>}

        
        {!loading && !error && !collectionName && !movies.length && (
          <div className="empty-state">Try searching for a movie title (e.g. "Jurassic Park")</div>
        )}

        <MovieList movies={movies} onSelect={openMovieDetails} />
        {selectedMovie && (
          <MovieModal movie={selectedMovie} loading={modalLoading} onClose={closeModal} />
        )}
      </main>
    </div>
  );
}

export default App;
