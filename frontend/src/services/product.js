import axios from "axios";

const API_URL = "http://localhost:8000/products";

export const getProducts = async (category) => {
  try {
    const response = await axios.get(API_URL, {
      params: { product_type: category },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${productId}:`, error);
    throw error;
  }
};

export const getCountByType = async () => {
  try {
    const response = await axios.get(`${API_URL}/type/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the count", error);
    throw error;
  }
};

export const changeType = async (productId, type) => {
  try {
    const response = await axios.patch(`${API_URL}/${productId}/type`, null, {
      params: { product_type: type },
    });
    return response.data;
  } catch (error) {
    console.error(`Error editing type of product with id ${productId}:`, error);
    throw error;
  }
};
