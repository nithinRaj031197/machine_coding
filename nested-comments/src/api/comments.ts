import axios from "axios";

const API_URL = "http://localhost:5173/comments.json";

export const fetchComments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
