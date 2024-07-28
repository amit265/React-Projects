import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const GPTMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;
  return (
    <div className="w-11/12 px-4 py-4 mx-auto bg-black text-white bg-opacity-85">
      <div className="">
        {movieNames.map((movie, index) => (
          <MovieList key={movie} title={movie} movies={movieResults[index]} />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
