import React, { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import BudgetService from "../api/BudgetService";
import "../css/BudgetScreen.css"

const VariableExpensesSection = ({ expenses, budgetId, fetchBudget }) => {
  const [variableExpenses, setVariableExpenses] = useState([]);

  // Use useEffect to set variableExpenses based on expenses prop
  useEffect(() => {
    if (expenses && expenses.length > 0) {
      // If expenses are provided, set them to state
      setVariableExpenses(expenses);
    } else {
      // If no expenses are present, load default values
      setVariableExpenses([
        { id: null, budgetId: budgetId, category: "Groceries", amount: 0 },
        { id: null, budgetId: budgetId, category: "Transportation", amount: 0 },
        { id: null, budgetId: budgetId, category: "Dining-Out", amount: 0 },
      ]);
    }
  }, [expenses, budgetId]);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedExpenses = [...variableExpenses];
    updatedExpenses[index].amount = value; // Update the amount for the specific expenses
    setVariableExpenses(updatedExpenses);
  };

  const handleSave = async () => {
    try {
      // Send the array of variable expenses to the backend
      console.log("Variable expenses before save:", variableExpenses);

      await BudgetService.saveVariableExpenses(variableExpenses, budgetId);
      // Fetch the updated budget data after saving
      fetchBudget(); // Refresh the budget data
    } catch (error) {
      console.error("Failed to save variable expenses:", error);
    }
  };

  return (
    <CollapsibleSection title="Variable Expenses">
      <div className="income-form">
        {variableExpenses.map((expense, index) => (
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

export default VariableExpensesSection;
