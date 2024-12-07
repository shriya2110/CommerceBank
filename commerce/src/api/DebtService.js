import axiosInstance from "../axiosConfig";

const API_URL = 'http://localhost:8080/api/debts'; // Replace with your backend URL

// Save a debt
const saveDebt = async (debtData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/save`, debtData);
    return response.data;
  } catch (error) {
    console.error("Error saving debt:", error);
    throw error;
  }
};

// Get debts by user ID
const getDebtsByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching debts:", error);
    throw error;
  }
};

export default {
  saveDebt,
  getDebtsByUserId
};
