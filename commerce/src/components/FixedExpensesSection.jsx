import React, { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import BudgetService from "../api/BudgetService";
import "../css/BudgetScreen.css"

const FixedExpensesSection = ({ expenses, budgetId, fetchBudget }) => {
  const [fixedExpenses, setFixedExpenses] = useState([]);

  // Use useEffect to set fixedExpenses based on expenses prop
  useEffect(() => {
    if (expenses && expenses.length > 0) {
      // If expenses are provided, set them to state
      setFixedExpenses(expenses);
    } else {
      // If no expenses are present, load default values
      setFixedExpenses([
        { id: null, budgetId: budgetId, category: "Rent", amount: 0 },
        { id: null, budgetId: budgetId, category: "Utilities", amount: 0 },
        { id: null, budgetId: budgetId, category: "Subscriptions", amount: 0 },
      ]);
    }
  }, [expenses, budgetId]);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedExpenses = [...fixedExpenses];
    updatedExpenses[index].amount = value; // Update the amount for the specific income source
    setFixedExpenses(updatedExpenses);
  };

  const handleSave = async () => {
    try {
      // Send the array of IncomingDTO to the backend
      console.log("Income Sources before save:", fixedExpenses);

      await BudgetService.saveFixedExpenses(fixedExpenses, budgetId);
      // Fetch the updated budget data after saving
      fetchBudget(); // Refresh the budget data
    } catch (error) {
      console.error("Failed to save income sources:", error);
    }
  };

  return (
    <CollapsibleSection title="Fixed Expenses">
      <div className="income-form">
        {fixedExpenses.map((expense, index) => (
          <div className="input-item" key={expense.category}>
            <label>{expense.category}</label>
            <input
              className="budget-inputs"
              type="number"
              name="amount" // Only the amount is editable
              value={expense.amount}
              onChange={(event) => handleInputChange(index, event)} // Pass index to update specific source
              placeholder="Amount"
            />
          </div>
        ))}
      </div>
      <div className="budget-footer">
        <button className="btn-save" onClick={handleSave}>
          Save
        </button>
      </div>
    </CollapsibleSection>
  );
};

export default FixedExpensesSection;
