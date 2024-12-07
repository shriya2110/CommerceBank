import React, { useState } from "react";
import axiosInstance from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css"; // Include CSS file for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For navigation

  const isFormValid = username && password;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axiosInstance.post("/api/user/login", {
          email: username,
          password: password,
        });

        if (response.status === 200) {
          //Store the token in LocalStorage
          const token = response.data.token;
          const userId = response.data.userId;
          localStorage.setItem("userId", userId);
          localStorage.setItem("token", token);
          // Navigate to home page if login is successful
          navigate("/home");
        } else {
          setErrorMessage("Invalid username or password. Please try again.");
        }
      } catch (error) {
        // Display error message if login fails
        setErrorMessage("Invalid username or password. Please try again.");
      }
    }
  };

  const openRegister = async() => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="heading"> 
        <img src="/bank-logo.png" alt="Logo" className="logo-image" />
        <span>Budget Planner</span>
      </div>
      <div className="login-box">
        <div className="top-right">English (UK)</div>
        <div className="title">
          Login
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            type="submit"
            disabled={!isFormValid}
            className="login-button"
          >
            Login
          </button>
        </form>
        <form className="register-button-form" onSubmit={openRegister}>
          <button type="submit" className="register-button">
              Create new account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
