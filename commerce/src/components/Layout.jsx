import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Layout.css'; // Import CSS for styling the layout

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token (Assume token is stored in localStorage)
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="layout">
      <div className="layout-header">
        <div className="header-logo-title">
          <img src="/bank-logo.png" alt="Logo" className="logo-image" />
          <h1>Budget Planner</h1>
        </div>
        {/* Logout button on the top right */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Render the child components (the screens) */}
      <div className="layout-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
