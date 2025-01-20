import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
//   const user = useSelector((store) => store.user);
//   console.log("user from connections", user);
  console.log("connections from user", connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      // console.log
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Function to go to profile page of the first connection




  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="text-center text-red-600 font-bold">
        No Connections found yet
      </h1>
    );
  return (
    <div>
      <h1 className="text-center font-bold py-8 text-2xl">Connections</h1>
      <div className="flex flex-col items-center gap-2 flex-wrap justify-center">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="w-full sm:w-1/3 p-4 flex flex-row items-center bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200"
          >
            {/* Profile Image */}
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={connection.photoUrl}
                alt="Profile Pic"
                className="rounded-full w-full h-full object-cover"
              />
            </div>

            {/* User Information */}
            <div className="flex flex-col flex-grow mx-6 gap-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {connection.about || "No bio available"}
              </p>
              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <Link to={"/profile/" + connection._id}>
                <button
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
              
                >
                  View Profile
                </button></Link>
                <button className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
