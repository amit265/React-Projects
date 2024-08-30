import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const userScore = useSelector((store) => store.quiz.userScore);

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
