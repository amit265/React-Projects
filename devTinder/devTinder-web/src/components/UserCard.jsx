import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
const dispatch = useDispatch();
const handleSendRequest = async (status, userId) => {
  try {
    const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true})

     dispatch(removeUserFromFeed(userId));
    if (!res.ok) {
      throw new Error("Failed to send request");
    }
  } catch (error) {
    console.error(error);
  }
  // TODO: Show success message or update UI with request sent status.
}

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img className="w-full p-4" src={photoUrl} alt="userPhoto" />
      </figure>
      <div className="card-body">
        <h2 className="cardTitle">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
