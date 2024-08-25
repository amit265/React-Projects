import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BASE_URL } from './utils/constants.js';

const appRouter = createBrowserRouter([
  {
    path: BASE_URL + "/",
    element: <App />,
    errorElement: <App />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
