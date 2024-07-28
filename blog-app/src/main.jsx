import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/blog", // Root path for blog app
    element: <App />,
    children: [
      {
        path: "", // Default route within /blog (empty path)
        element: <Home />,
      },
      {
        path: "blogs", // Relative path for blogs
        element: <Blogs />,
      },
      {
        path: "blogs/:id", // Relative path for single blog
        element: <SingleBlog />,
      },
      {
        path: "contact", // Relative path for contact page
        element: <Contact />,
      },
      {
        path: "services", // Relative path for services page
        element: <Services />,
      },
      {
        path: "about", // Relative path for about page
        element: <About />,
      },
      {
        path: "*", // Wildcard path to match any other routes
        element: <NotFound />,
      },

    ],
  },
]);

// Render the application with RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
