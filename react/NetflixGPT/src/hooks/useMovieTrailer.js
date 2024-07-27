import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { clearError, setError } from "../utils/errorSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    if (!movieId) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await response.json();
      const filterData = json.results.filter((vid) => vid.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];

      dispatch(addTrailerVideo({ id: movieId, trailer }));
      dispatch(clearError());
    } catch (error) {
      dispatch(setError("Failed to fetch movie trailer: " + error))
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
