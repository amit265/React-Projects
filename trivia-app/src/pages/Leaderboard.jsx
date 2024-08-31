import React from "react";
import LeaderboardHead from "../components/leaderboard/LeaderboardHead";
import LeaderboardItemList from "../components/leaderboard/LeaderboardItemList";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const leaderboard = useSelector((store) => store.leaderboard.leaderboard);
  console.log("leaderboard form leaderboard", leaderboard);
  return (
    <div className="container max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col gap-10">
        <div>
          <LeaderboardHead leaderboard={leaderboard} />
        </div>
        <div>
          {leaderboard.map((leaderboardItem) => (
            <div key={leaderboardItem.uid} className="mb-8">
              <LeaderboardItemList leaderboard={leaderboardItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
