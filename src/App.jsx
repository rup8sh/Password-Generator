import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numallowed, setNumallowed] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordref = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallowed) str += "0123456789";
    if (character) str += "!@#$%^&*(){}~`";
    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }
    setPassword(pass);
  }, [length, numallowed, character, setPassword]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numallowed, character, passwordgenerator]);

  const copypassword = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3 pb-2">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 pb-2">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly="true"
            ref={passwordref}
          />
          <button
            onClick={copypassword}
            className="outline-none bg-blue-700 text-white
          px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 pb-5">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          ></input>
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numallowed}
            id="numberInput"
            onChange={() => {
              setNumallowed((prev) => !prev);
            }}
          ></input>
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={character}
            id="characterInput"
            onChange={() => {
              setCharacter((prev) => !prev); // Update the state for characters
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
