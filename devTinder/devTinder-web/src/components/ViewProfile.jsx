import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ViewProfile = () => {
  const { _id } = useParams();
  console.log("params id", _id);

  const connections = useSelector((store) => store.connections);
  // const user = useSelector((store) => store.user);
  // console.log("user from connections", user);
  console.log("connections from user", connections);

  const userProfile = connections.filter(
    (connection) => connection._id === _id
  );
  const { firstName, lastName, photoUrl, age, gender, about } = userProfile[0];

  console.log("user profile from connections", userProfile);

  if (!connections) return;
  if (connections.length <= 0) return <h1>No profile</h1>;
  return (
    <>
      <h1 className="text-center font-bold py-8 text-2xl">Profile</h1>

      <div className="w-full sm:w-96 mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
        {/* Profile Image */}
        <figure className="w-full">
          <img
            className="w-full h-64 object-cover"
            src={photoUrl}
            alt="userPhoto"
          />
        </figure>

        {/* Card Body */}
        <div className="p-6">
          {/* User Info */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="text-gray-600 text-sm mb-4">{`${age}, ${gender}`}</p>
          )}
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {about || "No bio available"}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4">
            <button
              className="flex-grow px-4 py-2 text-sm rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
              // onClick={() => handleSendRequest("ignored", _id)}
            >
             Send Message
            </button>
            <button
              className="flex-grow px-4 py-2 text-sm rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
              // onClick={() => handleSendRequest("interested", _id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
