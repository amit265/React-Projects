import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [err, setErr] = useState("");
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("res from feed", res.data.data);
      dispatch(addFeed(res.data.data));
    } catch (error) {
      setErr(error.message);

      console.error("error from feed", error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0) return <h1 className="text-xl text-red-600 text-center py-10">No more user left</h1>;
  return (
    <div className="flex flex-col items-center justify-center my-10">
      {/* <h1>Feed</h1> */}
      {/* Add more feed items here */}
      {/* <FeedItem key={feed.id} data={feed} /> */}
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
