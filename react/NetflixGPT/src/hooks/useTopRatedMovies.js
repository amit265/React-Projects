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
    try {
    const data = await fetch(TOP_RATED, API_OPTIONS);
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch top rated movies:", error);
    }
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
