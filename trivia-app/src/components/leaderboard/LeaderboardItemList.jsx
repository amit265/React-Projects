import React from "react";

const LeaderboardItemList = ({ leaderboard }) => {
  const { name, image_url, streak, total_score } = leaderboard;

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow-md flex gap-4 bg-white items-center justify-evenly">
      <div>
      <div className="w-16 h-16">
        <img
          src={image_url}
          alt={name}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <h2 className="text-center text-base font-semibold text-gray-800">{name}</h2>

      </div>
      <div className="flex flex-col justify-center gap-1">
        <p className="text-sm text-gray-600">
          Total Score:{" "}
          <span className="font-medium text-blue-600">{total_score}</span>
        </p>
        <p className="text-sm text-gray-600">
          Streak: <span className="font-medium text-green-600">{streak}</span>
        </p>
      </div>
    </div>
  );
};

export default LeaderboardItemList;
