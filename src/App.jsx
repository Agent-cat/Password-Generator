import React, { useState, useCallback, useEffect } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbers] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [password, setPassword] = useState();
  const [copySuccess, setCopySuccess] = useState("Copy");
  const passwordGenerate = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) {
      string += "0123456789";
    }
    if (charAllowed) {
      string += "!@#$%^&*()_+";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass = pass + string.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerate();
  }, [length, numbersAllowed, charAllowed, passwordGenerate]);

  const copy = () => {
    window.navigator.clipboard.writeText(password);
    setCopySuccess("Copied!");
    
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg m-8 text-orange-500 px-4 py-3 bg-gray-800">
        <h1 className="my-3 text-2xl font-bold tracking-wide">
          Password Generator
        </h1>
        <div className="flex flex-col gap-y-4 mt-4 mb-4">
          <input
            type="text"
            value={password}
            className="outline-none px-3 py-2"
            placeholder="Password"
            readOnly
          />
          <button
            onClick={copy}
            className={`outline-none w-full ${
              copySuccess === "Copy" ? "bg-blue-500" : "bg-green-500"
            } text-white px-4 py-2 font-medium`}
          >
            {copySuccess}
          </button>
        </div>

        <div className="flex flex-col gap-y-4 mt-4 mb-4">
          <div className="flex items-center justify-center  gap-x-2">
            <input
              type="range"
              min={6}
              max={20}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
                setCopySuccess("Copy");
              }}
            />
            <label className="text-xl">Length: {length}</label>
          </div>
              <div className="flex items-center justify-center gap-5">
              <div className="flex items-center justify-center gap-x-2">
            <input
              className="w-5 h-5 "
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="numbers"
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label className="text-xl">Number</label>
          </div>

          <div className="flex items-center justify-center  gap-x-2">
            <input
              className="w-5 h-5"
              type="checkbox"
              defaultChecked={charAllowed}
              id="characters"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label className="text-xl">Characters</label>
          </div>
              </div>
         
        </div>
      </div>
    </>
  );
};

export default App;
