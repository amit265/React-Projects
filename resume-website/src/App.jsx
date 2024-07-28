import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <main className="p-4">
        <About />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

export default App;
