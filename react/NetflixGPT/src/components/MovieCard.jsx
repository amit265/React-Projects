import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
// import useMovieTrailer from "../hooks/useMovieTrailer";

const MovieCard = ({ movies }) => {
  // const movieId = movies?.id;

  // const showTrailer = () => {
  //   useMovieTrailer(movieId);

  // }
  return (
    <div className="w-48">
      <img className="cursor-pointer hover:opacity-65" src={IMG_CDN_URL + movies?.poster_path} alt="" />
    </div>
  );
};

export default MovieCard;
