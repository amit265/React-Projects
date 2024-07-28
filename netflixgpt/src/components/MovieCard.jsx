import React, { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import TrailerModal from "./TrailerModal";

const MovieCard = ({ movies }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedDate = movies.release_date.split("-").reverse().join("-");
  const stars = movies.vote_average.toFixed(1);
  const overview = movies.overview;
  const movieId = movies.id;

  useMovieTrailer(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailers[movieId]);
  const trailerKey = trailerVideo?.key;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative w-2/3 md:w-48 text-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full h-72">
        <img
          className="w-full h-full object-cover cursor-pointer transition-opacity duration-300 hover:opacity-30"
          src={IMG_CDN_URL + movies?.poster_path}
          alt={movies.original_title}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-60">
          <p className="text-sm mb-2">Release date: {formattedDate}</p>
          <p className="text-xs">
            {overview.length > 150 ? overview.slice(0, 150) + "..." : overview}
          </p>
        </div>
      </div>
      <div className="p-4">
        <p>
          <span className="mr-2">⭐</span>
          {stars}
        </p>
        <h1 className="text-sm font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
          {movies.original_title}
        </h1>
        <button
          className="mt-2 w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleOpenModal}
        >
          Watch Trailer
        </button>
      </div>
      {isModalOpen && (
        <TrailerModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          trailerKey={trailerKey} // Pass the correct trailer key
        />
      )}
    </div>
  );
};

export default MovieCard;
