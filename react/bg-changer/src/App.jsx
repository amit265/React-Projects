import { useState } from "react";

import "./index.css";

function App() {
  const [color, setColor] = useState("blue");

  let colour = [
    "Red",
    "Green",
    "Blue",
    "Olive",
    "Gray",
    "Yellow",
    "Pink",
    "Purple",
    "Lavender",
    "White",
    "Black",
  ];



  return (
    <>
      <div
        className="w-[100vw] h-[100vh] duration-150"
        style={{ backgroundColor: color }}
      ><h1 className="p-4 font-bold text-2xl rounded-lg text-black text-center shadow-lg cursor-pointer" 
      
      
      >Background Changer</h1>
        <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          

          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
            {colour.map((color, index) => (
              <button
                key={index}
                onClick={() => setColor(color.toLowerCase())}
                className="outline-none px-4 m-2 py-1 rounded-full text-black shadow-lg"
                style={{ backgroundColor: color }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
