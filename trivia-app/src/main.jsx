import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BASE_URL } from "./utils/constants.js";
import Category from "./pages/Category.jsx";
import Home from "./pages/Home.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Profile from "./pages/Profile.jsx";
import Quiz from "./pages/Quiz.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Provider } from "react-redux";
import appStore from "./store/appStore.js";

const appRouter = createBrowserRouter([
  {
    path: BASE_URL + "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
    errorElement: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
