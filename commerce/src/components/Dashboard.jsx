import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, ArcElement, BarElement, Tooltip, Legend, LinearScale } from "chart.js";
import '../css/Dashboard.css';
import { useNavigate } from "react-router-dom";
import ExpenseService from "../api/ExpenseService";
import BudgetService from "../api/BudgetService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Register required Chart.js components
Chart.register(CategoryScale, ArcElement, BarElement, Tooltip, Legend, LinearScale);

const Dashboard = () => {
  const selectedMonth = new Date().getMonth() + 1;
  const selectedYear = new Date().getFullYear();
  const [budgetSummary, setBudgetSummary] = useState({
    income: 0,
    expenses: 0,
  });

  const [expenseCategories, setExpenseCategories] = useState({
    fixed: { rent: 0, subscription: 0, utilities: 0 },
    variable: { dining: 0, groceries: 0, transportation: 0 },
  });

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  // Set your threshold percentage for alerts
  const ALERT_THRESHOLD = 0.3;

  const [showBadge, setShowBadge] = useState(false);

  // Fetch budget and expenses data (this should come from your API)
  useEffect(() => {
    // You can fetch data from an API and set the state
    const fetchDashboardData = async () => {
      try {
        const data = await BudgetService.getBudgetForMonth(selectedMonth, selectedYear);
        if (data) {
          const income = data.incomeSources.reduce(
            (acc, source) => acc + parseFloat(source.amount), 0
          );
          const expenseData = await ExpenseService.getDashboardData(selectedMonth);
          if (expenseData.data && expenseData.data.categorySpending) {
            const totalAdditionalIncome = expenseData.data.categorySpending["Additional Income"] || 0 ;
            let totalExpenses = Object.values(expenseData.data.categorySpending).reduce(
              (acc, curr) => acc + parseFloat(curr), 
              0
            );

            totalExpenses = totalExpenses - totalAdditionalIncome;
            // Set budget summary including total income and expenses
            const totalIncome = income + totalAdditionalIncome;
            console.log('totalIncome',totalIncome)
            console.log('totalExpenses',totalExpenses)
            setBudgetSummary({
              income: totalIncome,
              expenses: totalExpenses
            });

            setShowBadge(totalExpenses < totalIncome);

            const categorySpending = expenseData.data.categorySpending;

            // Map backend data to UI state structure
            const updatedExpenseCategories = {
              fixed: {
                rent: categorySpending["Rent"] || 0, // Keep existing if not provided by backend
                subscription: categorySpending["Entertainment"] || 0, 
                utilities: categorySpending["Utilities"] || 0,
              },
              variable: {
                dining: categorySpending["Dining Out"] || 0,
                groceries: categorySpending["Groceries"] || 0,
                transportation: categorySpending["Transportation"] || 0,
              }
            };

            setExpenseCategories(updatedExpenseCategories);

            // Populate notifications if spending exceeds threshold
            const newNotifications = [];
            Object.entries(expenseData.data.categorySpending).forEach(([category, amount]) => {
              if (category !== "Additional Income" && amount >= (totalIncome * ALERT_THRESHOLD)) {
                newNotifications.push({
                  category,
                  message: `Warning: Your spending in ${category} is nearing the budget limit.`,
                });
              }
            });

            setNotifications(newNotifications);
          }
        }
      } catch (error) {
        console.error("Error fetching budget:", error);
        // setIsDataAvailable(false);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Chart Data for Spending Habits
  const chartData = {
    labels: ["Rent", "Subscription", "Utilities", "Dining", "Groceries", "Transportation"],
    datasets: [
      {
        label: "Expenses",
        labelColor: "#36A2EB",
        data: [
          expenseCategories.fixed.rent,
          expenseCategories.fixed.subscription,
          expenseCategories.fixed.utilities,
          expenseCategories.variable.dining,
          expenseCategories.variable.groceries,
          expenseCategories.variable.transportation,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const handleBackClick = () => {
    navigate("/home"); // Navigates back to home
  };

  return (
    <div className="dashboard-container">

      {/* Back Button */}
      <div className="back-block" onClick={handleBackClick}>
        <svg class="jss101" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{height: "20px"}}>
          <path fill="none" d="M0 0h24v24H0z"></path><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
        <span style={{paddingLeft:"4px"}}>Back</span>
      </div>  
      {notifications.length > 0 && (
            <div className="notifications">
              {notifications.map((notification, index) => (
                <div key={index} className="notification">
                  {notification.message}
                </div>
              ))}
            </div>
      )}
      {/* Budget Summary Section */}
      <div className="summary-section">
        <h2>Budget Summary</h2>
        <div className="summary-card">
          <div className="summary-item">
            <h3>Total Income</h3>
            <p>${budgetSummary.income}</p>
          </div>
          <div className="summary-item">
            <h3>Total Expenses</h3>
            <p>${budgetSummary.expenses}</p>
          </div>
          <div className="summary-item">
            <h3>Balance</h3>
            <p>${budgetSummary.income - budgetSummary.expenses}</p>
          </div>
        </div>
      </div>

      {showBadge && (
        <div className="badge-container">
        {Array.from({ length: 5 }).map((_, index) => (
            <img 
              key={index} 
              src={`/certificate-solid.svg`} 
              alt="Badge Icon" 
              className="badge-icon" 
              style={{color:"white"}}
            />
          ))}
        🎉 Congratulations! You've stayed within your budget this month!
      </div>
      )}

      {/* Chart Section for Spending Habits */}
      <div className="chart-section">
        <h2>Spending Habits</h2>
        <div className="chart-container">
          {/* Doughnut Chart for spending breakdown */}
          <Doughnut data={chartData} />
        </div>
        <div className="chart-container">
          {/* Bar Chart for category-wise expenses */}
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
