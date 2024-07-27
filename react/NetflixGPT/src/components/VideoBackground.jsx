import React from "react";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailers[movieId]);
  if(!trailerVideo) return;
  return (
    <div className="top-0 left-0 w-full h-full overflow-hidden -mt-40 md:mt-0">
      {trailerVideo ? (
        <iframe
          className="top-0 left-0 w-full h-full object-cover"
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${trailerVideo.key}`}
          title="Youtube player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="text-white">Loading trailer...</p>
      )}
    </div>
  );
};

export default VideoBackground;
