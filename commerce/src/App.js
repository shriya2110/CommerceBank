import React from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import BudgetScreen from "./components/BudgetScreen";
import ExpenseTracker from "./components/ExpenseTracker";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Trends from "./components/Trends";
import DebtTracker from "./components/DebtTracker";
import FinancialGrowthInsights from "./components/FinancialGrowthInsights";
import BudgetAdvice from "./components/BudgetAdvice";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/budgets" element={<Layout><BudgetScreen /></Layout>} />
        <Route path="/expense-tracker" element={<Layout><ExpenseTracker /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/trends" element={<Layout><Trends /></Layout>} />
        <Route path="/debt-tracker" element={<Layout><DebtTracker /></Layout>} />
        <Route path="/investment-insights" element={<Layout><FinancialGrowthInsights /></Layout>} />
        <Route path="/budget-advice" element={<Layout><BudgetAdvice/></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
