import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import Inspiration from "./components/Inspiration";

function App() {
  return (
    <div className="bg-gray-100 text-gray-800 mx-auto">
      <Header />
      <main>
        <About />
        <Projects />
        <Skills />
        <Certificates />
        <Inspiration />
      </main>
      <Footer />
    </div>
  );
}

export default App;
