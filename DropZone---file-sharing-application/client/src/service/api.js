import axios from "axios";

const API_URI = "${process.env.API_URI}";

export const uploadFile = async (data) => {
  try {
    const response = await axios.post(`${API_URI}/upload`, data);
    return response.data;
  } catch (error) {
    console.log("Error while calling the API ", error.message);
  }
};
