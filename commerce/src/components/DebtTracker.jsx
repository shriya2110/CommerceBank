import React, { useState, useEffect } from 'react';
import DebtService from '../api/DebtService'; // Ensure this service has getDebts and saveDebt methods
import { useNavigate } from 'react-router-dom';

const DebtTracker = () => {
  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    type: '',
    amount: '',
    interestRate: '',
    minPayment: '',
    additionalPayment: '',
    userId: parseInt(localStorage.getItem('userId'))
  });
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch existing debts when the component mounts
  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const userDebts = await DebtService.getDebtsByUserId(localStorage.getItem('userId')); // Assuming you have a method to get debts
        setDebts(userDebts);
        generateSuggestions(userDebts);
      } catch (error) {
        console.error('Failed to fetch debts:', error);
      }
    };

    fetchDebts();
  }, []);

  // Handle input change for debt form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDebt((prevDebt) => ({
      ...prevDebt,
      [name]: value,
    }));
  };

  const formattedDebt = {
    ...newDebt,
    amount: parseFloat(newDebt.amount), // Convert amount to number
    interestRate: parseFloat(newDebt.interestRate), // Convert interestRate to number
    minPayment: parseFloat(newDebt.minPayment), // Convert minPayment to number
    additionalPayment: parseFloat(newDebt.additionalPayment || 0), // Convert additionalPayment to number, default to 0
  };

  // Add a new debt to the list and save it to the server
  const addDebt = async () => {
    try {
      const savedDebt = await DebtService.saveDebt(formattedDebt); // Save the new debt using the API
      setDebts([...debts, savedDebt]);
      setNewDebt({
        type: '',
        amount: '',
        interestRate: '',
        minPayment: '',
        additionalPayment: ''
      });
      generateSuggestions([...debts, savedDebt]);
    } catch (error) {
      console.error('Failed to save debt:', error);
    }
  };

  // Function to generate repayment suggestions based on debt
  const generateSuggestions = (debts) => {
    const totalDebt = debts.reduce((acc, debt) => acc + parseFloat(debt.amount), 0);
    const totalInterestRate = debts.reduce((acc, debt) => acc + parseFloat(debt.interestRate), 0);
    
    const newSuggestions = [];

    // Suggest snowball method for users with many smaller debts
    if (debts.length > 1) {
      newSuggestions.push(
        'Consider using the Snowball method: focus on paying off the smallest debt first, then move on to larger debts.'
      );
    }

    // Suggest avalanche method for high-interest debts
    if (totalInterestRate / debts.length > 15) {
      newSuggestions.push(
        'Since you have high-interest debt, try the Avalanche method: pay off the debt with the highest interest rate first.'
      );
    }

    setSuggestions(newSuggestions);
  };

  const handleBackClick = () => {
    navigate("/home"); // Navigates back to home
  };

  return (
    <div style={{ padding: '20px' }}>

      {/* Back Button */}
      <div className="back-block" onClick={handleBackClick}>
        <svg className="jss101" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{ height: "20px" }}>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
        <span style={{ paddingLeft: "4px" }}>Back</span>
      </div>
      <h2>Debt Tracker</h2>

      {/* Debt Input Form */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Add New Debt</h3>
        <input
          type="text"
          name="type"
          placeholder="Debt Type (e.g., Student Loan, Credit Card)"
          value={newDebt.type}
          onChange={handleInputChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="number"
          name="amount"
          placeholder="Debt Amount ($)"
          value={newDebt.amount}
          onChange={handleInputChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="number"
          name="interestRate"
          placeholder="Interest Rate (%)"
          value={newDebt.interestRate}
          onChange={handleInputChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="number"
          name="minPayment"
          placeholder="Minimum Monthly Payment ($)"
          value={newDebt.minPayment}
          onChange={handleInputChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="number"
          name="additionalPayment"
          placeholder="Additional Payment ($)"
          value={newDebt.additionalPayment}
          onChange={handleInputChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button onClick={addDebt} style={{ marginTop: '10px' }}>
          Add Debt
        </button>
      </div>

      {/* Debt List */}
      <div>
        <h3>Current Debts</h3>
        {debts.length > 0 ? (
          <ul>
            {debts.map((debt, index) => (
              <li key={index}>
                <strong>{debt.type}</strong> - ${debt.amount} at {debt.interestRate}% interest, 
                Min Payment: ${debt.minPayment}, Additional Payment: ${debt.additionalPayment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No debts added yet.</p>
        )}
      </div>

      {/* Repayment Strategy Suggestions */}
      <div style={{ marginTop: '20px' }}>
        <h3>Repayment Strategies</h3>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>No suggestions at this time.</p>
        )}
      </div>

      {/* Summary Section */}
      <div style={{ marginTop: '20px' }}>
        <h3>Debt Summary</h3>
        <p>Total Debt: ${debts.reduce((acc, debt) => acc + parseFloat(debt.amount), 0)}</p>
        <p>
          Total Monthly Payment: $ 
          {debts.reduce(
            (acc, debt) => acc + parseFloat(debt.minPayment) + parseFloat(debt.additionalPayment || 0),
            0
          )}
        </p>
      </div>
    </div>
  );
};

export default DebtTracker;
