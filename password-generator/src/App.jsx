import { useState, useCallback, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charactersAllowed) str += "~!@#$%^&*()_+{}?><";

    for (let i = 0; i <= length; i++) {
      let value = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(value);
    }

    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, numberAllowed, charactersAllowed]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (
    <>
      <div className="w-full h-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 mb-4 text-orange-500 bg-gray-800">
        <h1 className="text-xl text-center text-white my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text" 
            className="outline-none w-full py-1 px-3"
            value={password} 
            placeholder="password" 
            ref = {passwordRef}
            readOnly />
          <button 
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyPasswordToClipBoard}
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              id="range"
              className="outline-none w-full py-1 px-3"
              min={8}
              max={50}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label htmlFor="range">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="num"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />{" "}
            <label htmlFor="num">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id="char"
              onChange={() => {
                setCharactersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="char">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
