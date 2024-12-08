import { sendRequest } from "./GenericApi";

export const getProducts = async () => {
  try {
    const request = {
      url: 'http://localhost:8080/books/all',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await sendRequest(request);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
};

export const getReservations = async () => {
  try {
    const request = {
      url: 'http://localhost:8080/reservations',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
    }
   };
   const response = await sendRequest(request);
   return await response.json();
  } catch (error) {
    console.error('Error fetching reservations: ', error);
    throw error
  }
}

export const deleteProduct = async (id) => {
  try {
    const request = {
      url: `http://localhost:8080/books/delete/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await sendRequest(request);
    return await response.json();
  } catch (error) {
    console.error('Error deleting product: ', error)
    throw error;
  }
}