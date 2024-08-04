import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default App;
