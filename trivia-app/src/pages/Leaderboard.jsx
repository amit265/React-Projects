import React from "react";
import LeaderboardHead from "../components/leaderboard/LeaderboardHead";
import LeaderboardItemList from "../components/leaderboard/LeaderboardItemList";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const leaderboard = useSelector((store) => store.leaderboard.leaderboard);
  console.log("leaderboard form leaderboard", leaderboard);
  return (
    <div className="mx-auto p-4 rounded-lg shadow-md text-white w-full overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">Leaderboard</h2>

      <div className="flex flex-col gap-10">
        <div>
          <LeaderboardHead leaderboard={leaderboard} />
        </div>
        <div>
          {leaderboard.map((leaderboardItem, index) => (
            <div key={leaderboardItem.uid} className="mb-8">
              <LeaderboardItemList leaderboard={leaderboardItem} index = {index}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
