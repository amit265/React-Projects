import React from "react";
import trohy_icon from "../../assets/images/trophy.png";

const LeaderboardItemList = ({ leaderboard, index }) => {
  const { name, image_url, streak, total_score, total_quizzes } = leaderboard;
  console.log("image_url: ", image_url);

  console.log("leaderboard", leaderboard);
  
  return (
    <div className="max-w-md mx-auto p-4 shadow-md flex gap-4 bg-white text-black items-center justify-center rounded-full">
     

     <div>
      <h1 className="text-xl w-1/3 p-1">
        {index + 1}
        {/* {index === 0 && <span><img src={trohy_icon} alt="" /></span>}
        {index === 1 && <span className="text-yellow-600">���</span>}
        {index === 2 && <span className="text-orange-600">���</span>} */}
      </h1>
     </div>
      <div className="flex flex-col justify-center items-center gap-2 h-full w-1/3 p-1">
      {/* <p className="text-sm text-gray-600">
          Total Quiz:{" "}
          <span className="font-medium text-orange-600">{total_quizzes}</span>
        </p> */}

        <p className="text-sm text-gray-600">
          Total Score:{" "}
          <span className="font-medium text-blue-600">{total_score}</span>
        </p>
        <p className="text-sm text-gray-600">
          Streak: <span className="font-medium text-green-600">{streak}</span>
        </p>
      </div>
      <div className="flex flex-col items-center h-full w-1/3 gap-1">
        <div className="w-16 h-16">
          <img
            src={image_url}
            alt={name}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <h2 className="text-center text-base font-semibold text-gray-800">
          {name.split(' ')[0]}
        </h2>
      </div>
    </div>
  );
};

export default LeaderboardItemList;
