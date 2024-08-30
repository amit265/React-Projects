import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const totalScore = useSelector((store) => store.quiz.totalScore);

  //add all the cells of an array, example: totalScore[90, 90,100]
  const userScore = totalScore.reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-md container mx-auto p-4 rounded-lg shadow-md flex gap-4 bg-gray-100">
      <div>
      <img
        src={user.photoURL}
        alt={user.displayName}
        className="rounded-full"
      />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">{user.displayName}</h2>
        <h2 className="">{user.email}</h2>
        <h2 className="">Total Score: {userScore}</h2>
      </div>
    </div>
  );
};

export default Profile;
