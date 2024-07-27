import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, NOW_PLAYING, POPULAR } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { clearError, setError } from "../utils/errorSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const popularMovies = useSelector(
    (store) => store.movies.popularMovies
);

  const getPopularMovies = async () => {

    try {
    const data = await fetch(POPULAR, API_OPTIONS);
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
    dispatch(clearError());
    } catch (error) {
      dispatch(setError("Failed to fetch popular movies: " + error))
    }
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
