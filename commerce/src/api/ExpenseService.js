// ExpenseService.js
import axiosInstance from '../axiosConfig';

const API_URL = 'http://localhost:8080/api'; // Replace with your actual API URL

const ExpenseService = {
  getExpensesForDate: (date) => {
    const userId = localStorage.getItem('userId');
    return axiosInstance.get(`${API_URL}/${userId}/expense?date=${date}`);
  },

  saveExpenses: (expenses) => {
    const userId = localStorage.getItem('userId');
    return axiosInstance.post(`${API_URL}/${userId}/expense`, expenses);
  },

  getDashboardData: (month) => {
    const userId = localStorage.getItem('userId');
    return axiosInstance.get(`${API_URL}/${userId}/expense/dashboard?month=${month}`, userId)
  }
};

export default ExpenseService;
