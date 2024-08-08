import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <div className="bg-[var(--background-color)] albert-sans">
          <div className="main-anima">
            <Header />
            <div className="min-h-[80vh]">
              <Outlet />
            </div>

            <Footer />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
