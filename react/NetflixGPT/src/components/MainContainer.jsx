import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;

  const mainMovie = movies[2];
  const { original_title, overview, id } = mainMovie;
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
