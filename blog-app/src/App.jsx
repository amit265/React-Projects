import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DataProvider } from './context/DataContext';
function App() {
  return (
    <>
      <DataProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </DataProvider>
    </>
  );
}

export default App;
