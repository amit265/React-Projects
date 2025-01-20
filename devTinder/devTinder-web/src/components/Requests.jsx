import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

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

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {}, // Empty body if no payload is required
        {
          withCredentials: true, // Ensure this is part of the Axios config, not the body
        }
      );
      console.log(res.data);
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log("error from request", error);
    }
  };

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
      <div className="flex flex-col items-center gap-6 flex-wrap justify-center">
        {requests.map((request) => (
          <div
            key={request._id}
            className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 flex flex-row items-center bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200"
          >
            {/* Profile Image */}
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={request.fromUserId.photoUrl}
                alt="Profile Pic"
                className="rounded-full w-full h-full object-cover"
              />
            </div>

            {/* User Information */}
            <div className="flex flex-col flex-grow mx-6">
              <h2 className="text-lg font-bold text-gray-800">
                {request.fromUserId.firstName} {request.fromUserId.lastName}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {request.fromUserId.about || "No bio available"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 justify-center items-center">
              <button
                className="px-4 py-2 text-sm rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="px-4 py-2 text-sm rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
