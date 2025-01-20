import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, edit }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res.data);

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
      // Handle error here if required. For now, just console log it.
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="w-full sm:w-96 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
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
        {!edit && <div className="flex justify-between gap-4">
          <button
            className="flex-grow px-4 py-2 text-sm rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="flex-grow px-4 py-2 text-sm rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>}
      </div>
    </div>
  );
};

export default UserCard;
