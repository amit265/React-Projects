import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, TOP_RATED } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const topRatedMovies = useSelector(
    (store) => store.movies.topRatedMovies
);

  const getTopRatedMovies = async () => {
    const data = await fetch(TOP_RATED, API_OPTIONS);
    const json = await data.json();
    // console.log("movieList", json);
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
