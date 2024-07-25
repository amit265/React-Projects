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
    const data = await fetch(POPULAR, API_OPTIONS);
    const json = await data.json();
    // console.log("movieList", json);
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
