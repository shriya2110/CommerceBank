import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any session storage
    localStorage.removeItem("token");
    navigate("/login"); // Navigate back to the login page
  };

  return (
    <div className="home-container">
      <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
        <h1>Welcome to Your Financial Hub!</h1>
        <p style={{margin:0}}>Plan, track, and achieve your financial goals with ease. Explore each tool below to manage your budget, monitor expenses, and make smarter financial decisions.</p>
      </div>

      <div className="card-container">
        <div className="card" onClick={() => navigate("/budgets")}>
          <h3>Budgets</h3>
        </div>
        <div className="card" onClick={() => navigate("/expense-tracker")}>
          <h3>Expense Tracker</h3>
        </div>
        <div className="card" onClick={() => navigate("/dashboard")}>
          <h3>Dashboard</h3>
        </div>
        <div className="card" onClick={() => navigate("/trends")}>
          <h3>Trends</h3>
        </div>
        <div className="card" onClick={() => navigate("/debt-tracker")}>
          <h3>Debt Tracker</h3>
        </div>
        <div className="card" onClick={() => navigate("/investment-insights")}>
          <h3>Investment Insights</h3>
        </div>
        <div className="card" onClick={() => navigate("/budget-advice")}>
          <h3>Budget Advice</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;