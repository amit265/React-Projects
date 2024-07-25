import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />

      {/* 
    **1** Main Video COntainer
        - video container
        - video title

    **2** Secondart Container
        - Movie-List
          - cards + n
     */}
    </div>
  );
};

export default Browse;
