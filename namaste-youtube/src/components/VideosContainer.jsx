import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideosContainer = () => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_API);
      const json = await data.json();
      console.log("json", json);
      console.log(import.meta.env.VITE_GOOGLE_API_KEY);

      setVideos(json.items);
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);
  
  if(videos === undefined) return;

  return (
    <div className="flex flex-wrap col-span-11">
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard  data={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideosContainer;
