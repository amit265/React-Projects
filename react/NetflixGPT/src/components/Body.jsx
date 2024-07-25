import Login from "./Login";
import Browse from "./Browse";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Error from "./Error";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: BASE_URL + "/",
      element: <Login />,
    },
    {
      path: BASE_URL + "/browse",
      element: <Browse />,
    },
    {
      path: "*", // Wildcard path to match any other routes
      element: <Navigate to={BASE_URL + "/"} />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
