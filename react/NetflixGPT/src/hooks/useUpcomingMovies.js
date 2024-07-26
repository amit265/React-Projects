import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, NOW_PLAYING, UPCOMING } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.upcomingMovies
);

  const getUpcomingMovies = async () => {
    try {
    const data = await fetch(UPCOMING, API_OPTIONS);
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);

    }
  };

  useEffect(() => {
    !nowPlayingMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
