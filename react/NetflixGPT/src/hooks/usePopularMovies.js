import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, NOW_PLAYING, POPULAR } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

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
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);

    }
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
