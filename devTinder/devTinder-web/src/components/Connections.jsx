import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

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
      <div className="flex flex-wrap justify-center">
        {connections.map((connection) => (
          <div key={connection._id} className="w-1/3 p-4 flex flex-row bg-slate-300 rounded-lg">
            <div>
              <img
                src={connection.photoUrl}
                alt="Profile Pic"
                className="w-full rounded-full h-32 object-cover"
              />
            </div>
            <div className="flex flex-col mx-8 gap-1">
              <h2 className="text-xl font-bold mt-4">
                {connection.firstName + " " + connection.lastName}
              </h2>
              <p className="text-gray-600">{connection.about}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
