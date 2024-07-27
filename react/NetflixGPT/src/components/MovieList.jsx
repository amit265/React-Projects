import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {

  return (
    <div>
      <h1 className="font-bold text-lg text-center lg:text-left px-8 md:text-3xl my-4">{title}</h1>
      <div className="flex overflow-x-auto">
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap overflow-x-auto ">
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
