import React, { useState } from "react";
import "../../css/AISupport.css";
import { getRating, getRecommendation } from "../../api/AIApi";
import StatusMessageModal from "../modals/StatusMessageModal"; 
import ToggleButtons from "./ToggleButtons";
import BookRecommendationForm from "./BookRecommendationForm";
import BookRatingForm from "./BookRatingForm";

const AISupport = () => {
  const [activeForm, setActiveForm] = useState("recommendation");
  const [genres, setGenres] = useState(["", "", ""]);
  const [authors, setAuthors] = useState(["", "", ""]);
  const [userFavourites, setUserFavourites] = useState(["", "", ""]);
  const [ratingInput, setRatingInput] = useState("");
  const [modalMessage, setModalMessage] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBookRecommendation = async () => {
    const filledGenres = genres.filter((g) => g.trim() !== "");
    const filledAuthors = authors.filter((a) => a.trim() !== "");
    const filledBooks = userFavourites.filter((b) => b.trim() !== "");

    if (filledGenres.length === 0 || filledAuthors.length === 0 || filledBooks.length === 0) {
      setModalMessage("Please provide at least one input for all categories.");
      setIsModalOpen(true);
      return;
    }

    const requestData = { genres: filledGenres, authors: filledAuthors, userFavourites: filledBooks };

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
      <ToggleButtons activeForm={activeForm} handleFormSwitch={handleFormSwitch} />

      {activeForm === "recommendation" && (
        <BookRecommendationForm 
          genres={genres} 
          setGenres={setGenres} 
          authors={authors} 
          setAuthors={setAuthors} 
          userFavourites={userFavourites} 
          setUserFavourites={setUserFavourites} 
          getBookRecommendation={getBookRecommendation} 
        />
      )}

      {activeForm === "rating" && (
        <BookRatingForm 
          ratingInput={ratingInput} 
          setRatingInput={setRatingInput} 
          getBookRating={getBookRating} 
        />
      )}

      {isModalOpen && <StatusMessageModal onClose={closeModal} message={modalMessage} />}
    </div>
  );
};

export default AISupport;
