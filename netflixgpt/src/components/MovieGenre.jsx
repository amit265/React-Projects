import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MOVIE_GENRE } from "../utils/constants";
import useMovieGenre from "../hooks/useMovieGenre";
import MovieCard from "./MovieCard";
import { clearGPTMovieResults } from "../utils/gptSlice";
import { clearLoading, setLoading } from "../utils/loadingSlice";
import ReactLoading from "react-loading";

const MovieGenre = () => {
  const [genreId, setGenreId] = useState(null);
  const [genreTitle, setGenreTitle] = useState("Romance");
  const dispatch = useDispatch();
  useMovieGenre(genreId);

  const movieGenre = useSelector((store) => store?.movies?.movieGenre);
  const loading = useSelector((store) => store?.loading?.loading);

  const handleGenreSearch = (id, name) => {
    setGenreId(id);
    setGenreTitle(name);
    dispatch(clearGPTMovieResults());
    dispatch(setLoading());
  };

  useEffect(() => {
    if (movieGenre?.length) {
      dispatch(clearLoading());
    }
  }, [movieGenre, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen p-12">
        <ReactLoading
          type={"spin"}
          color={"white"}
          height={"10%"}
          width={"10%"}
        />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-11/12 p-4 m-4">
        <div>
          <div className="w-full lg:8/12 mx-auto flex flex-auto gap-4 flex-wrap justify-center">
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
        {movieGenre && (
          <div className="mx-auto py-2 px-4 my-4 bg-black rounded-lg text-white bg-opacity-80">
            <h1 className="text-xl sm:text-3xl text-center  font-bold py-2 pb-4">
              {genreTitle}
            </h1>
            <div className="flex justify-around lg:justify-center  flex-wrap gap-8 mx-auto w-full">
              {movieGenre.map((movie) => (
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
