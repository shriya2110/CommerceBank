import React, { useEffect, useState } from "react";
// import "../css/BudgetAdvice.css";
import axiosInstance from "../axiosConfig";
import ExpenseService from "../api/ExpenseService";
import BudgetService from "../api/BudgetService";
import { useNavigate } from "react-router-dom";

const BudgetAdvice = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedMonth = new Date().getMonth() + 1;
  const selectedYear = new Date().getFullYear();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoading(true);
      let income;
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
            const prompt = `Based on an income of $${totalIncome} and expenses of $${totalExpenses}, provide financial advice on optimizing the budget.`;

            const response = await BudgetService.getAdvice(prompt);
            if (response) {
            setAdvice(response);
            } else {
            setAdvice("Unable to fetch advice at the moment.");
            }
          } else {
            setAdvice("Unable to fetch advice at the moment.");
          }
        }   
      } catch (error) {
        console.error("Error fetching budget advice:", error);
        setAdvice("An error occurred while fetching advice.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <div className="budget-advice-container">
        {/* Back Button */}
      <div className="back-block" onClick={handleBackClick}>
        <svg className="jss101" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{ height: "20px" }}>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
        <span style={{ paddingLeft: "4px" }}>Back</span>
      </div>
      <h2>Budget Advice</h2>
      {loading ? (
        <p>Loading advice...</p>
      ) : (
        <div className="advice-box">
            <div>
                {advice.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                    {line}
                    <br />
                    </React.Fragment>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default BudgetAdvice;
