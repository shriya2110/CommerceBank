import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FinancialGrowthInsights = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFinancialGrowthInsights = async () => {
      try {
        // Calculate yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 2);
        const formattedDate = yesterday.toISOString().split('T')[0] + "T05:47";
        const response = await fetch(
          `https://api.marketaux.com/v1/news/all?language=en&countries=ca&filter_entities=true&limit=3&published_after=${formattedDate}&api_token=C1PgFl8ZcFQnqFCNzjt8cLAwuEp5kEcoygm97xQK`
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
  
        const data = await response.json();
        setNews(data.data); // Make sure data structure aligns with response
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchFinancialGrowthInsights();
  }, []);

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
      <div className="financial-growth-insights">
        <h2>Financial Growth Insights</h2>
        {error && <p className="error">{error}</p>}
        {news.length > 0 ? (
          news.map((item) => (
            <div key={item.uuid} className="news-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.image_url && (
                <img src={item.image_url} alt={item.title} style={{ width: '100px', height: 'auto' }} />
              )}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          !error && <p>Loading insights...</p>
        )}
      </div>
    </div>
  );
};

export default FinancialGrowthInsights;
