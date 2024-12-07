import React, { useState } from "react";
import "../css/Register.css"; // Include CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isFormValid = firstName && lastName && email && password;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axiosInstance.post("/api/user/register", {
          firstName,
          lastName,
          email,
          password,
        });

        if (response.status === 200) {
          // Navigate to login page if registration is successful
          navigate("/login");
        }
      } catch (error) {
        // Display error message if registration fails
        setErrorMessage("Registration failed. Please try again.");
      }
    }
    console.log("Registered");
  };

  return (
    <div className="register-container">
      <div className="heading"> 
        <img src="/bank-logo.png" alt="Logo" className="logo-image" />
        <span>Budget Planner</span>
      </div>
      <div className="register-box">
        <div className="top-right">English (UK)</div>
        <div className="title">Create Account</div>
        <form onSubmit={handleRegister} className="register-form">
          <div className="name">
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>&nbsp;&nbsp;</div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            className="create-account-button"
          >
            Create Account
          </button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
