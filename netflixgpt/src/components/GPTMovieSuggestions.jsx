import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import { clearLoading } from "../utils/loadingSlice";
import ReactLoading from "react-loading";

const GPTMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store?.gpt);
  const loading = useSelector((store) => store?.loading?.loading);
  const dispatch = useDispatch();


  useEffect(() => {
    if (movieNames?.length && movieResults?.length) {
      dispatch(clearLoading());
    }
  }, [movieNames, movieResults, dispatch]);

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
      {movieNames && (
        <div>
          <div className="text-white bg-black rounded-lg bg-opacity-85 lg:w-1/3 mx-auto p-4 m-4 w-11/12">
            <h2 className="text-sm md:text-3xl text-center text-white font-bold">
              Top 5 GPT Movie Recommendations
            </h2>
            <div className="flex flex-col gap-4 justify-center p-4">
              {movieNames.map((movieName, index) => (
                <h2
                  key={movieName + index}
                  className="bg-pink-200 text-xs md:text-lg text-black font-semibold px-2 md:py-0 py-2 rounded-lg"
                >
                  {index + 1}. {movieName}
                </h2>
              ))}
            </div>
          </div>
          <div className="w-11/12 px-4 py-4 mx-auto bg-black text-white bg-opacity-85">
            <div className="">
              {movieNames.map((movie, index) => (
                <MovieList
                  key={movie + index}
                  title={movie}
                  movies={movieResults[index]}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GPTMovieSuggestions;
