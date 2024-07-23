import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <Header />
      <Outlet />
      <Footer />
      </Provider>
    </>
  );
}

export default App;
