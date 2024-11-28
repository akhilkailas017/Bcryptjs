import React, { useState } from "react";
import bcrypt from "bcryptjs";

function App() {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputHashedPassword, setInputHashedPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const hashPassword = async () => {
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      setHashedPassword(hash);
      setCopySuccess(false); // Reset copy success status
    } else {
      alert("Please enter a password to hash.");
    }
  };

  const copyToClipboard = async () => {
    if (hashedPassword) {
      await navigator.clipboard.writeText(hashedPassword);
      setCopySuccess(true);
    }
  };

  const checkPassword = async () => {
    if (inputPassword && inputHashedPassword) {
      const isMatch = await bcrypt.compare(inputPassword, inputHashedPassword);
      setPasswordMatch(isMatch);
    } else {
      alert("Please provide both a password and a hashed password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 flex items-center justify-center">
      <div className="bg-gray-800 shadow-2xl rounded-lg p-8 w-full max-w-6xl border border-green-500">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8 tracking-widest">
          Bcrypt Hasher & Checker
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section: Password Hasher */}
          <div className="bg-gray-900 p-6 rounded-md border border-green-400 shadow-lg">
            <h2 className="text-2xl font-semibold text-green-300 mb-6">
              Hash a Password
            </h2>
            <input
              type="password"
              placeholder="Enter password to hash"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-green-400 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 placeholder-gray-500"
            />
            <button
              onClick={hashPassword}
              className="w-full bg-green-500 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-transform transform hover:scale-105"
            >
              Hash Password
            </button>
            {hashedPassword && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-green-300">
                  Hashed Password:
                </h3>
                <div className="bg-gray-800 text-green-400 p-4 rounded-md mt-2 flex items-center justify-between border border-green-500">
                  <span className="break-all text-sm">{hashedPassword}</span>
                  <button
                    onClick={copyToClipboard}
                    className="ml-4 bg-green-500 text-gray-900 font-medium py-1 px-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-transform transform hover:scale-105"
                  >
                    Copy
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-green-400 text-sm mt-2">
                    Copied to clipboard!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Section: Password Checker */}
          <div className="bg-gray-900 p-6 rounded-md border border-green-400 shadow-lg">
            <h2 className="text-2xl font-semibold text-green-300 mb-6">
              Check Password Match
            </h2>
            <input
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-green-400 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Enter hashed password"
              value={inputHashedPassword}
              onChange={(e) => setInputHashedPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-green-400 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 placeholder-gray-500"
            />
            <button
              onClick={checkPassword}
              className="w-full bg-green-500 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-transform transform hover:scale-105"
            >
              Check Password
            </button>
            {passwordMatch !== null && (
              <p
                className={`mt-4 text-center font-medium text-lg ${
                  passwordMatch ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordMatch ? "Password Matched!" : "Password Did Not Match."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
