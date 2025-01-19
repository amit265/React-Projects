import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests); // Get requests from Redux store

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("res from requests", res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log("error from requests", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="text-center text-red-600 font-bold">
        No Requests found yet
      </h1>
    );

  return (
    <div>
      <h1 className="text-center font-bold py-8 text-2xl">Requests</h1>
      <div className="flex flex-wrap justify-center">
        {requests.map((request) => (
          <div
            key={request._id}
            className="w-1/3 p-4 flex justify-around flex-row bg-slate-300 rounded-lg"
          >
            <div>
              <img
                src={request.fromUserId.photoUrl}
                alt="Profile Pic"
                className="w-full rounded-full h-32 object-cover"
              />
            </div>
            <div className="flex flex-col mx-8 gap-1">
              <h2 className="text-xl font-bold mt-4">
                {request.fromUserId.firstName +
                  " " +
                  request.fromUserId.lastName}
              </h2>
              <p className="text-gray-600">{request.fromUserId.about}</p>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
            <button
              className="h-10 w-full p-2 rounded-lg text-white bg-green-500 hover:bg-green-700"
              onClick={() => {
                // Handle accept request logic here
              }}
              >Accept</button>
              <button
                className="h-10 p-2 w-full rounded-lg text-white bg-red-500 hover:bg-red-700"
                onClick={() => {
                    // Handle decline request logic here
              }}>Reject</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
