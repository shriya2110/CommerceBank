import React, { useState, useEffect } from "react";
import IncomeSection from "./IncomeSection";
import FixedExpensesSection from "./FixedExpensesSection";
import VariableExpensesSection from "./VariableExpensesSection";
import SavingsGoalsSection from "./SavingsGoalsSection";
import BudgetService from "../api/BudgetService";
import "../css/BudgetScreen.css";
import { useNavigate } from "react-router-dom";

const BudgetScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [budgetData, setBudgetData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [newBudgetName, setNewBudgetName] = useState(''); // For new budget creation
  const navigate = useNavigate();

  const fetchBudget = async () => {
    setIsLoading(true);
    try {
      const data = await BudgetService.getBudgetForMonth(selectedMonth, selectedYear);
      if (data) {
        setBudgetData(data);
        setIsDataAvailable(true);
      } else {
        setBudgetData(null);
        setIsDataAvailable(false); // No data available
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
      setIsDataAvailable(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch budget data when the component mounts or the month/year changes
  useEffect(() => {
    fetchBudget();
  }, [selectedMonth, selectedYear]);

  // Handler for month/year change
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  // Function to save the budget through API
  const saveBudget = async (updatedBudget) => {
    try {
      const data = await BudgetService.saveBudget(updatedBudget);
      // setBudgetData(data); // Update the state with the saved budget
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };

  // Create a new budget when none exists
  const createNewBudget = async () => {

    if (!newBudgetName.trim()) {
      // Show an alert or a validation message if the budget name is empty
      alert("Budget name cannot be empty.");
      return; // Exit the function early
    }
    const newBudget = {
      name: newBudgetName,
      userId: localStorage.getItem('userId'),
      month: selectedMonth,
      year: selectedYear,
      incomeSources: [],  // Add initial empty sections or data
      fixedExpenses: [],
      variableExpenses: [],
      savingGoals: [],
    };

    // Save the new budget and load it into the screen
    try {
      const savedBudget = await BudgetService.saveBudget(newBudget);
      setBudgetData(newBudget); // Set the new budget data
      fetchBudget();
      setIsDataAvailable(true); // Mark data as available
    } catch (error) {
      console.error("Error creating new budget:", error);
    }
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setBudgetData((prevData) => ({
      ...prevData,
      name: value, // Update name in budgetData
      userId: localStorage.getItem('userId')
    }));
    saveBudget({...budgetData, name: value, userId: localStorage.getItem('userId')});
  };
  

  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <div className="budget-screen">
      {/* Back Button */}
      <div className="back-block" onClick={handleBackClick}>
        <svg className="jss101" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{ height: "20px" }}>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
        <span style={{ paddingLeft: "4px" }}>Back</span>
      </div>

      {/* Header */}
      <div className="budget-header">
        <h2>Budget Overview</h2>
        <div className="date-selector">
          <label>Month: </label>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>

          <label style={{ marginLeft: "10px" }}>Year: </label>
          <input
            type="number"
            value={selectedYear}
            onChange={handleYearChange}
            min="2000"
            max="2100"
            style={{ padding: "7px", height: "14px" }}
          />
        </div>
      </div>

      {/* Check if data is loading */}
      {isLoading ? (
        <div>Loading budget data...</div>
      ) : !isDataAvailable ? (
        <div>
          <p>No budget data available for the selected month and year.</p>
          <p>Would you like to create a new budget?</p>
          <input
            type="text"
            placeholder="Enter budget name"
            value={newBudgetName}
            onChange={(e) => setNewBudgetName(e.target.value)}
            style={{ padding: "7px", marginBottom: "10px", width: "200px" }}
          />
          <button onClick={createNewBudget} style={{ padding: "7px 14px" }}>
            Create New Budget
          </button>
        </div>
      ) : (
        <div>
          <div>
            <label style={{ fontWeight: 600 }}>Name: </label>
            <input
              className="budget-name"
              type="text"
              value={budgetData?.name || ''}
              onBlur={handleNameChange}
              style={{ padding: "7px", height: "14px" }}
            />
          </div>

          {/* Main sections */}
          <div className="budget-sections">
            {/* Income Section */}
            <IncomeSection incomeSources={budgetData?.incomeSources || []} budgetId={budgetData?.budgetId} fetchBudget={fetchBudget} />

            {/* Fixed Expenses Section */}
            <FixedExpensesSection expenses={budgetData?.fixedExpenses || []} budgetId={budgetData?.budgetId} fetchBudget={fetchBudget} />

            {/* Variable Expenses Section */}
            <VariableExpensesSection expenses={budgetData?.variableExpenses || []} budgetId={budgetData?.budgetId} fetchBudget={fetchBudget}/>

            {/* Savings Goals Section */}
            <SavingsGoalsSection savings={budgetData?.savingGoals || []} budgetId={budgetData?.budgetId} fetchBudget={fetchBudget}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetScreen;
