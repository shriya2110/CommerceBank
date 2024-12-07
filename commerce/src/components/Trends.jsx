import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosConfig';

// Register necessary components for Line Chart
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Trends = () => {
  const [spendingData, setSpendingData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch monthly spending data from API
    const fetchSpendingData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axiosInstance.get(`/api/${userId}/expense/trends`); // Update with your actual API endpoint
        const monthlySpending = response.data; // Adjusted to get the correct data structure

        if (monthlySpending && monthlySpending.length > 0) {
          const labels = monthlySpending.map((entry) => `Month ${entry.month}`); // Change to Month 1, Month 2, etc.

          // Extract category data
          const categories = Object.keys(monthlySpending[0].categorySpending);
          const datasets = categories.map((category) => ({
            label: `${category} Spending ($)`,
            data: monthlySpending.map((entry) => entry.categorySpending[category]), // Accessing category spending
            fill: false,
            borderColor: randomColor(),
            tension: 0.1,
          }));

          setSpendingData({
            labels,
            datasets,
          });

          // Generate suggestions based on the fetched data
          generateSuggestions(monthlySpending);
        }
      } catch (error) {
        console.error('Error fetching spending data:', error);
      }
    };

    fetchSpendingData();
  }, []);

  // Function to generate random colors for chart lines
  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const generateSuggestions = (spendingData) => {
    const newSuggestions = [];

    spendingData.forEach((monthData, index) => {
      if (index > 0) {
        const previousMonthData = spendingData[index - 1];
        const currentMonth = `Month ${monthData.month}`;

        Object.keys(monthData.categorySpending).forEach((category) => {
          const currentSpent = monthData.categorySpending[category];
          const previousSpent = previousMonthData.categorySpending[category] || 0; // Handle cases where the category may not exist in the previous month

          if (currentSpent > previousSpent) {
            newSuggestions.push(
              `You spent more on ${category} in ${currentMonth} compared to Month ${previousMonthData.month}. Consider cutting down in this category.`
            );
          }
        });
      }
    });

    setSuggestions(newSuggestions);
  };

  const handleBackClick = () => {
    navigate("/home"); // Navigates back to home
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Back Button */}
      <div className="back-block" onClick={handleBackClick}>
        <svg className="jss101" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{height: "20px"}}>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
        <span style={{paddingLeft:"4px"}}>Back</span>
      </div>
      <h2>Trends</h2>

      {/* Spending Comparison Chart */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Monthly Spending Comparison by Category</h3>
        {spendingData ? (
          <Line data={spendingData} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>

      {/* Cost Reduction Suggestions */}
      <div>
        <h3>Cost Reduction Suggestions</h3>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>No significant suggestions at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Trends;
