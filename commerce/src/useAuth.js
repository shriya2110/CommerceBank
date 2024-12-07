import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Simple token presence check; could add additional validation if needed
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

export default useAuth;
