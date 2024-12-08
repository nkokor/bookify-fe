import React from "react";

const ToggleButtons = ({ activeForm, handleFormSwitch }) => {
  return (
    <div className="toggle-buttons">
      <button
        onClick={() => handleFormSwitch("recommendation")}
        className={activeForm === "recommendation" ? "active" : ""}
      >
        Book Recommendation
      </button>
      <button
        onClick={() => handleFormSwitch("rating")}
        className={activeForm === "rating" ? "active" : ""}
      >
        Check Book Rating
      </button>
    </div>
  );
};

export default ToggleButtons;
