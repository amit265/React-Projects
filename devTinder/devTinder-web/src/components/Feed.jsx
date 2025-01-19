import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [feeds, setFeeds] = useState([]);
  const [err, setErr] = useState("");
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("res from feed", res.data.data);
      setFeeds(res.data.data);
      dispatch(addFeed(res.data.data));
    } catch (error) {
      setErr(error.message);

      console.error("error from feed", error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center my-10">
      {/* <h1>Feed</h1> */}
      {/* Add more feed items here */}
      {/* <FeedItem key={feed.id} data={feed} /> */}
      {feeds && feeds.map((feed) => (
        <UserCard key={feed._id} user={feed} />
       ))}
    </div>
  );
};

export default Feed;
