import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLeaderboard } from "../store/leaderboardSlice";

const useFetchLeaderboard = () => {
  const dispatch = useDispatch();

  // Fetch leaderboard data from API and store it in Redux slice
  const leaderboard = useSelector((store) => store.leaderboard.leaderboard);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (leaderboard.length > 0) return; // Skip if leaderboard is already fetched
      try {
        const response = await fetch("https://coderespite.com/api/trivia/");
        const data = await response.json();
        console.log("data from leaderboard", data);
        dispatch(setLeaderboard(data));
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, [dispatch, leaderboard.length]);

  return leaderboard;
};

export default useFetchLeaderboard;
