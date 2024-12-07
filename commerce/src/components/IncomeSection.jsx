import React, { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import BudgetService from "../api/BudgetService";

const IncomeSection = ({ incomeSources, budgetId, fetchBudget }) => {
  // Initialize state for income sources
  const [incomeData, setIncomeData] = useState([]);

  // Use useEffect to set incomeData based on incomeSources prop
  useEffect(() => {
    if (incomeSources && incomeSources.length > 0) {
      // If incomeSources are provided, set them to state
      setIncomeData(incomeSources);
    } else {
      // If no incomeSources are present, load default values
      setIncomeData([
        { id: null, budgetId: budgetId, sourceName: "Allowances", amount: 0 },
        { id: null, budgetId: budgetId, sourceName: "Part-time", amount: 0 },
        { id: null, budgetId: budgetId, sourceName: "Scholarships", amount: 0 },
      ]);
    }
  }, [incomeSources, budgetId]);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedIncomeSources = [...incomeData];
    updatedIncomeSources[index].amount = value; // Update the amount for the specific income source
    setIncomeData(updatedIncomeSources);
  };

  const handleSave = async () => {
    try {
      // Send the array of IncomingDTO to the backend
      console.log("Income Sources before save:", incomeData);

      await BudgetService.saveIncomeSources(incomeData, budgetId);
      // Fetch the updated budget data after saving
      fetchBudget(); // Refresh the budget data
    } catch (error) {
      console.error("Failed to save income sources:", error);
    }
  };

  return (
    <CollapsibleSection title="Income">
      <div className="income-form">
        {incomeData.map((income, index) => (
          <div className="input-item" key={income.sourceName}>
            <label>{income.sourceName}</label>
            <input
              className="budget-inputs"
              type="number"
              name="amount" // Only the amount is editable
              value={income.amount}
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

export default IncomeSection;
