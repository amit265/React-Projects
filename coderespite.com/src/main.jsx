import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Blogs from "./components/Blogs.jsx";
import Forum from "./components/Forum.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import Error from "./components/Error.jsx";
import ProjectPage from "./components/ProjectPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Admin from "./components/Admin.jsx";
import Login from "./components/Login.jsx";
import BlogPage from "./components/BlogPage.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/:id", // Relative path for single blog
        element: <BlogPage />,
      },
      {
        path: "forum",
        element: <Forum />,
      },
      {
        path: "project",
        element: <ProjectPage />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*", // Wildcard path to match any other routes
        element: <Error />,
      }
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
