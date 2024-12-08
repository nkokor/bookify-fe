import React from "react";

const genreOptions = [
  "Fantasy", "History", "Fiction", "Non-Fiction", "Self-Help", "Romance",
  "Horror", "Thriller", "Sci-Fi", "Children's", "Action", "Mystery"
];

const BookRecommendationForm = ({ genres, setGenres, authors, setAuthors, userFavourites, setUserFavourites, getBookRecommendation }) => {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <p>Select up to 3 genres:</p>
        <div className="dropdown-group">
          {genres.map((genre, index) => (
            <select
              key={index}
              value={genre}
              onChange={(e) =>
                setGenres(genres.map((g, i) => (i === index ? e.target.value : g)))
              }
            >
              <option value="">Select genre</option>
              {genreOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p>Provide up to three authors you enjoy:</p>
        {authors.map((author, index) => (
          <input
            key={index}
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) =>
              setAuthors(authors.map((a, i) => (i === index ? e.target.value : a)))
            }
          />
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p>Provide up to 3 of your favourite books:</p>
        {userFavourites.map((book, index) => (
          <input
            key={index}
            type="text"
            placeholder="Enter book title"
            value={book}
            onChange={(e) =>
              setUserFavourites(userFavourites.map((b, i) => (i === index ? e.target.value : b)))
            }
          />
        ))}
      </div>
      <div className="b-container">
        <button className="button-element" onClick={getBookRecommendation}>Get Recommendation</button>
      </div>
    </div>
  );
};

export default BookRecommendationForm;
