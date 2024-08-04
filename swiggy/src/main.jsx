import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import About from "./components/About.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error.jsx";
import Body from "./components/Body.jsx";
import Contact from "./components/Contact.jsx";
import ResDetail from "./components/ResDetail.jsx";
import Cart from "./components/Cart.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/projects/react/swiggy/",
    element: <App />,
    children: [
      {
        path: "/projects/react/swiggy/",
        element: <Body />,
      },
      {
        path: "/projects/react/swiggy/about",
        element: <About />,
      },
      {
        path: "/projects/react/swiggy/contact",
        element: <Contact />,
      },
      {
        path: "/projects/react/swiggy/:resId",
        element: <ResDetail />,
      },
      {
        path: "/projects/react/swiggy/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
