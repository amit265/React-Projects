import React from "react";
import { useSelector } from "react-redux";
import single_user from "../assets/images/single_user.png";
import LogoutButton from "../components/auth/LogoutButton";

const Profile = () => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const totalScore = useSelector((store) => store.quiz.totalScore);
  console.log("user", user);

  //add all the cells of an array, example: totalScore[90, 90,100]
  const userScore = totalScore.reduce((a, b) => a + b, 0);

  return (
    <div className="w-full mx-auto flex-col p-4 rounded-lg flex gap-4 text-white">
      <h1 className="text-3xl font-semibold">Profile</h1>
      <div>
        <div className="flex justify-between items-center mt-12 shadow-lg p-4 bg-white text-black rounded-full">
          <div className="flex gap-2 px-8 items-center mx-auto">
            <div className="w-24">
              <img
                src={user.image_url ? user.image_url : single_user}
                alt={user.name}
                className="rounded-full w-full text-red-900"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">{user.name}</h2>
              <h2 className="">{user.email}</h2>
              <h2 className="">Total Score: {userScore}</h2>
            </div>
          </div>
          <div className="flex gap-2 px-8 items-center mx-auto">
            {isAuthenticated && user && <LogoutButton user={user} />}
          </div>
        </div>
        <div className="text-center mt-12">
          <h1>Your History</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
