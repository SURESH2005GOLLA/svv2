import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App: React.FC = () => {
  const [view, setView] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    // Password validation for signup only
    if (view === "signup") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

      if (!passwordRegex.test(password)) {
        setIsError(true);
        setMessage(
          "Password must be 6+ characters with 1 uppercase, 1 lowercase, and 1 number."
        );
        return;
      }
    }

    try {
      const url =
        view === "login"
          ? "http://localhost:5000/api/login"
          : "http://localhost:5000/api/signup";

      const response = await axios.post(url, {
        username,
        password,
      });

      setMessage(response.data.message || "Success!");
      setIsLoggedIn(true);

      // Clear inputs after success
      setUsername("");
      setPassword("");

    } catch (error: unknown) {
      setIsError(true);

      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message ||
          "Network error. Is backend running?"
        );
      } else {
        setMessage("Unexpected error occurred.");
      }
    }
  };

  const toggleView = () => {
    setView((prev) => (prev === "login" ? "signup" : "login"));
    setMessage("");
    setIsError(false);
  };

  if (isLoggedIn) {
    return (
      <div className="container">
        <h2>Welcome, {username}!</h2>
        <button onClick={() => setIsLoggedIn(false)}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{view === "login" ? "Login" : "Sign Up"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />

        {view === "signup" && (
          <small>
            Must be 6+ characters, 1 uppercase, 1 lowercase,
            1 number
          </small>
        )}

        <button type="submit">
          {view === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      {message && (
        <p style={{ color: isError ? "red" : "green" }}>
          {message}
        </p>
      )}

      <p onClick={toggleView} style={{ cursor: "pointer" }}>
        {view === "login"
          ? "No account? Sign Up"
          : "Already have account? Login"}
      </p>
    </div>
  );
};

export default App;