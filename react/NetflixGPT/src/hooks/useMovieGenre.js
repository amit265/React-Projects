import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, MOVIE_GENRE_API } from "../utils/constants";
import { addMovieGenre } from "../utils/moviesSlice";
import { useEffect } from "react";
import { clearError, setError } from "../utils/errorSlice";

const useMovieGenre = (genre) => {
  const dispatch = useDispatch();

  // const movieGenre = useSelector((store) => store.movies.movieGenre);


  const getMovieGenre = async () => {
    if (!genre) return;
    try {
      const data = await fetch(MOVIE_GENRE_API + genre, API_OPTIONS);
      const json = await data.json();
      dispatch(addMovieGenre(json.results));
      dispatch(clearError());
    } catch (error) {
      dispatch(setError("Failed to fetch movie genre: " + error))
    }
  };

  useEffect(() => {
    getMovieGenre();
  }, [genre, dispatch]); // Add genre and dispatch as dependencies to useEffect
};

export default useMovieGenre;
