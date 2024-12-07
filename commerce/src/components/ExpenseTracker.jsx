import React, { useState, useEffect } from "react";
import "../css/ExpenseTracker.css";
import { useNavigate } from "react-router-dom";
import ExpenseService from "../api/ExpenseService"; // Import the service

const predefinedCategories = ["Rent", "Groceries", "Dining Out", "Transportation", "Entertainment", "Utilities", "Additional Income"];

const ExpenseTracker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [expenses, setExpenses] = useState({
    Rent: {amount: "", id: null},
    Groceries: { amount: "", id: null },
    "Dining Out": { amount: "", id: null },
    Transportation: { amount: "", id: null },
    Entertainment: { amount: "", id: null },
    Utilities: { amount: "", id: null },
    "Additional Income": { amount: "", id: null }
  });
  const [totalExpenses, setTotalExpenses] = useState(0);

  const navigate = useNavigate();

  // Fetch expenses when date changes or on load
  useEffect(() => {
    if (selectedDate) {
      fetchExpensesForDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchExpensesForDate = async (date) => {
    try {
      const response = await ExpenseService.getExpensesForDate(date);
      const data = response.data;

      if (data.length === 0) {
        // No expenses logged for the date, reset the inputs
        setExpenses({
          Rent: { amount: "", id: null},
          Groceries: { amount: "", id: null },
          "Dining Out": { amount: "", id: null },
          Transportation: { amount: "", id: null },
          Entertainment: { amount: "", id: null },
          Utilities: { amount: "", id: null },
          "Additional Income": { amount: "", id: null }
        });
      } else {
        // Set fetched expenses with IDs
        const fetchedExpenses = data.reduce((acc, expense) => {
          acc[expense.category] = { amount: expense.amount, id: expense.id };
          return acc;
        }, {});
        setExpenses((prevExpenses) => ({
          ...prevExpenses,
          ...fetchedExpenses
        }));
        // Calculate total expenses
        const total = data.reduce((sum, expense) => {
          if (expense.category !== "Additional Income") {
            return sum + parseFloat(expense.amount); // Return the updated sum
          }
          return sum; // If the condition is false, return the current sum
        }, 0); // Initial sum is 0

        setTotalExpenses(total);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const handleExpenseChange = (category, amount) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: {
        ...prevExpenses[category],
        amount
      }
    }));
  };

  const logExpenses = async () => {
    const newLoggedExpenses = Object.entries(expenses)
      .filter(([_, { amount }]) => amount !== "")
      .map(([category, { amount, id }]) => ({
        expenseDate: selectedDate,
        category,
        amount,
        id
      }));

    if (newLoggedExpenses.length === 0) {
      alert("Please enter at least one expense.");
      return;
    }

    try {
      await ExpenseService.saveExpenses(newLoggedExpenses);

      alert("Expenses saved successfully!");

      // Recalculate total expenses after saving
      const total = newLoggedExpenses.reduce((sum, expense) => {
        if (expense.category !== "Additional Income") {
          return sum + parseFloat(expense.amount); // Return the updated sum
        }
        return sum; // If the condition is false, return the current sum
      }, 0);
      setTotalExpenses(total);

      fetchExpensesForDate(selectedDate);
      // Clear input fields after logging
      // setExpenses({
      //   Rent: { amount: "", id: null },
      //   Groceries: { amount: "", id: null },
      //   "Dining Out": { amount: "", id: null },
      //   Transportation: { amount: "", id: null },
      //   Entertainment: { amount: "", id: null },
      //   Utilities: { amount: "", id: null }
      // });
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/home"); // Navigates back to home
  };

  return (
    <div className="expense-tracker">
      {/* Back Button */}
      <div className="back-block" onClick={handleBackClick}>
        <svg className="jss101" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{ height: "20px" }}>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
        <span style={{ paddingLeft: "4px" }}>Back</span>
      </div>

      <h2>Expense Tracker</h2>

      <div className="date-picker">
        <label>Select Date:</label>
        <input className="expense-input" type="date" value={selectedDate} onChange={handleDateChange} />
      </div>

      {/* Expense input fields for each category */}
      <div className="expense-inputs">
        {predefinedCategories.map((category) => (
          <div key={category} className="expense-category">
            <label>{category}:</label>
            <input
              className="expense-input"
              type="number"
              value={expenses[category].amount}
              onChange={(e) => handleExpenseChange(category, e.target.value)}
              placeholder={`Enter ${category} amount`}
            />
          </div>
        ))}
      </div>

      <button onClick={logExpenses} disabled={!selectedDate}>
        Log Expenses
      </button>

      {/* Display total expenses */}
      <div className="total-expenses">
        <h3>Total Expenses for {selectedDate}</h3>
        <p>${totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ExpenseTracker;
