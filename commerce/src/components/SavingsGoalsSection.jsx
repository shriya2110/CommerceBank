import React, { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import BudgetService from "../api/BudgetService";
import "../css/BudgetScreen.css"

const SavingsGoalsSection = ({ savings, budgetId, fetchBudget }) => {
  const [savingsGoals, setSavingsGoals] = useState([]);

  // Use useEffect to set savingsGoals based on savings prop
  useEffect(() => {
    if (savings && savings.length > 0) {
      // If savings are provided, set them to state
      setSavingsGoals(savings);
    } else {
      // If no savings are present, load default values
      setSavingsGoals([
        { id: null, budgetId: budgetId, name: "Vacation", amount: 0 },
        { id: null, budgetId: budgetId, name: "Emergency fund", amount: 0 },
        { id: null, budgetId: budgetId, name: "Retirement", amount: 0 },
      ]);
    }
  }, [savings, budgetId]);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedExpenses = [...savingsGoals];
    updatedExpenses[index].amount = value; // Update the amount for the specific savings
    setSavingsGoals(updatedExpenses);
  };

  const handleSave = async () => {
    try {
      // Send the array of variable savings to the backend
      console.log("savings before save:", savingsGoals);

      await BudgetService.saveSavingsGoals(savingsGoals, budgetId);
      // Fetch the updated budget data after saving
      fetchBudget(); // Refresh the budget data
    } catch (error) {
      console.error("Failed to save savings:", error);
    }
  };

  return (
    <CollapsibleSection title="Saving Goals">
      <div className="income-form">
        {savingsGoals.map((expense, index) => (
          <div className="input-item" key={expense.name}>
            <label>{expense.name}</label>
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

export default SavingsGoalsSection;
