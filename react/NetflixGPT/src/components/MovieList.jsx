import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="4">
      <h1 className="font-bold text-3xl my-4">{title}</h1>
      <div className="flex overflow-x-auto">
        <div className="flex flex-col">
          <div className="flex gap-4 overflow-x-auto ">
            {movies &&
              movies.map((movie) => (
                <MovieCard key={movie?.id} movies={movie} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
