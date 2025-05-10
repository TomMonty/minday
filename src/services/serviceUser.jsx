import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const getProfile = async () => {
  try {
    const response = await axios.get(API_URL);
    return { status: "success", data: response.data };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { status: "error", message: "Failed to fetch profile" };
  }
};
