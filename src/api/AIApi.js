import { sendRequest } from "./GenericApi";

export const getRating = async (bookTitle) => {
  try {
    const request = {
      url: 'http://localhost:8080/books/rating',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await sendRequest(request);
    return await response.json();
  } catch (error) {
    console.error('Error fetching rating: ', error);
    throw error;
  }
};
