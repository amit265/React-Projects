import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, NOW_PLAYING } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
);

  const getNowPlayingMovies = async () => {
    const data = await fetch(NOW_PLAYING, API_OPTIONS);
    const json = await data.json();
    // console.log("movieList", json);
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
