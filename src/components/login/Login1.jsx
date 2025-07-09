import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./login.css";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((reg) => console.log("Service Worker registered:", reg))
          .catch((err) =>
            console.error("Service Worker registration failed:", err)
          );
      });
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://pwa-backend-rw9x.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.id);
        navigate("/landing");
      } else {
        setMessage(result.error || "Login failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Server error. Try again later.");
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p style={{ color: "red", marginTop: "1rem" }}>{message}</p>}
    </div>
  );
};

export default login;
