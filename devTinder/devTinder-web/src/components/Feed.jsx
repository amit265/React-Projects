import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";

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
  });
  return (
    <div>
      {err && <p>{err}</p>}
      <h1>Feed</h1>
      {/* Add more feed items here */}
      {/* <FeedItem key={feed.id} data={feed} /> */}
      {feeds.map((feed) => (
        <div key={feed._id}>
          <h3>userId - {feed._id}</h3>
          <img src={feed.photoUrl} width={100} alt="" className="src" />
          <h2>{feed.firstName + " " + feed.lastName}</h2>
          <h2>{feed.password}</h2>
          <h3>{feed.about}</h3>
        </div>
      ))}
    </div>
  );
};

export default Feed;
