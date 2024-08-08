// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PASSWORD, USERNAME } from "../utils/constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    // Hardcoded credentials
    const validUsername = USERNAME;
    const validPassword = PASSWORD;

    if (username === validUsername && password === validPassword) {
      // Store auth status in localStorage (or a more secure place if needed)
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <section className="py-12 text-[var(--text-color)] ">
      <div className="container mx-auto px-8 text-center max-w-md shadow-[var(--text-color)] shadow-lg py-8 ">
        <h2 className="text-xl sm:text-2xl text-[var(--primary-color)] font-bold mb-6 lexend">
          Login
        </h2>
        <div className="mb-4 text-[var(--background-color)]">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-2 max-w-1/2"
          />
        </div>
        <div className="mb-4 text-[var(--background-color)]">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-2 max-w-1/2"
          />
        </div>
        <button
          className="px-4 py-2 bg-[var(--primary-color)] text-lg rounded-md hover:bg-[#ef231a]"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </section>
  );
};

export default Login;
