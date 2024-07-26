import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MOVIE_GENRE } from "../utils/constants";
import useMovieGenre from "../hooks/useMovieGenre";
import MovieCard from "./MovieCard";

const MovieGenre = () => {
  const [genreId, setGenreId] = useState(null);
  const [genreTitle, setGenreTitle] = useState("Romance");

  useMovieGenre(genreId);

  const movieGenre = useSelector((store) => store.movies?.movieGenre);

  const handleGenreSearch = (id, name) => {
    setGenreId(id);
    setGenreTitle(name);
  };

  return (
    <>
    <div className="mx-auto p-4 m-4">
      <div>
        <div className="w-8/12 mx-auto flex flex-auto gap-4 flex-wrap justify-center">
          {MOVIE_GENRE.map((movie) => (
            <button
              key={movie.id}
              onClick={() => handleGenreSearch(movie.id, movie.name)}
              className="bg-blue-700 px-4 py-2 text-white rounded-lg col-span-3 hover:bg-blue-800"
            >
              {movie.name}
            </button>
          ))}
        </div>
      </div>
      {genreId && (
        <div className="mx-auto p-4 m-4 bg-black text-white bg-opacity-80">
          <h1 className="text-3xl font-bold py-4">{genreTitle}</h1>
          <div className="flex justify-center flex-wrap gap-8 mx-auto w-full">
            {movieGenre &&
              movieGenre.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
          </div>
        </div>
        
      )}
      </div>
    </>
  );
};

export default MovieGenre;
