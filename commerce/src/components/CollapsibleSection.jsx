import React, { useState } from "react";
import "../css/CollapsibleSection.css"; // Optional for styling

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-section">
      <div className="section-header" onClick={toggleSection}>
        <h3>{title}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
