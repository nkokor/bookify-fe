import React, { useState } from "react";
import "../../css/AISupport.css";
import { getRating, getRecommendation } from "../../api/AIApi";
import StatusMessageModal from "../modals/StatusMessageModal"; 

const AISupport = () => {
  const [activeForm, setActiveForm] = useState("recommendation"); 
  const [genres, setGenres] = useState(["", "", ""]);
  const [authors, setAuthors] = useState(["", "", ""]);
  const [userFavourites, setUserFavourites] = useState(["", "", ""]);
  const [ratingInput, setRatingInput] = useState("");
  const [modalMessage, setModalMessage] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const genreOptions = [
    "Fantasy",
    "History",
    "Fiction",
    "Non-Fiction",
    "Self-Help",
    "Romance",
    "Horror",
    "Thriller",
    "Sci-Fi",
    "Children's",
    "Action",
    "Mystery",
  ];

  const getBookRecommendation = async () => {
    const filledGenres = genres.filter((g) => g.trim() !== "");
    const filledAuthors = authors.filter((a) => a.trim() !== "");
    const filledBooks = userFavourites.filter((b) => b.trim() !== "");

    if (filledGenres.length === 0 || filledAuthors.length === 0 || filledBooks.length === 0) {
      setModalMessage("Please provide at least one input for all categories.");
      setIsModalOpen(true);
      return;
    }

    const requestData = {
      genres: filledGenres,
      authors: filledAuthors,
      userFavourites: filledBooks,
    };

    console.log("Request Data:", requestData);

    try {
      const recommendation = await getRecommendation(requestData);
      setModalMessage(recommendation);
      setIsModalOpen(true);
      setGenres(["", "", ""]);
      setAuthors(["", "", ""]);
      setUserFavourites(["", "", ""]);
    } catch (error) {
      setModalMessage("Something went wrong. Try again later.");
      setIsModalOpen(true);
    }
  };

  const getBookRating = async () => {
    if (ratingInput.trim() === "") {
      setModalMessage("Please provide book title.");
      setIsModalOpen(true);
      return;
    }

    try {
      const rating = await getRating(ratingInput.trim());
      setModalMessage(rating);
      setIsModalOpen(true);
      setRatingInput("");
    } catch (error) {
      setModalMessage("Something went wrong. Try again later.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleFormSwitch = (formType) => {
    if (formType === "recommendation") {
      setGenres(["", "", ""]);
      setAuthors(["", "", ""]);
      setUserFavourites(["", "", ""]);
    } else if (formType === "rating") {
      setRatingInput("");
    }
    setActiveForm(formType); 
  };

  return (
    <div id='ai-content' style={{ maxWidth: "500px", margin: "0 auto" }}>
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

      {activeForm === "recommendation" && (
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
      )}

      {activeForm === "rating" && (
        <div>
          <input
            type="text"
            placeholder="Enter book title:"
            value={ratingInput}
            onChange={(e) => setRatingInput(e.target.value)}
          />
          <div className="b-container">
            <button className="button-element" onClick={getBookRating}>Get Rating</button>
          </div>
        </div>
      )}

      {isModalOpen && <StatusMessageModal onClose={closeModal} message={modalMessage} />}
    </div>
  );
};

export default AISupport;
