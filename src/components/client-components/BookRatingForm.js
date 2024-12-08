import React from "react";

const BookRatingForm = ({ ratingInput, setRatingInput, getBookRating }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter book title"
        value={ratingInput}
        onChange={(e) => setRatingInput(e.target.value)}
      />
      <div className="b-container">
        <button className="button-element" onClick={getBookRating}>Get Rating</button>
      </div>
    </div>
  );
};

export default BookRatingForm;
