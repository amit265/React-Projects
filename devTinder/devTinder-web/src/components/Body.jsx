import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
