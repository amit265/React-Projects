import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import { FaSearch } from "react-icons/fa";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const API = "http://www.omdbapi.com/?i=tt3896198&apikey=79a50ec3";

  const searchMovies = async (title) => {
    const response = await fetch(`${API}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data);
  };
  useEffect(() => {
    searchMovies();
  }, []);
  console.log(movies, "hello");

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => searchMovies(searchTerm)}>
        <FaSearch />

        </button>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {/* {movie.map((movie) =>  */}
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
          {/* )} */}
        </div>
      ) : (
        <div className="empty">
          <h2>No movie found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
