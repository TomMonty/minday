import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cards';

export const getDailyCards = async () => {
  try {
    const response = await axios.get(API_URL);
    const shuffled = [...response.data].sort(() => 0.5 - Math.random());
    const dailyCards = shuffled.slice(0, 5);
    return { status: "success", data: dailyCards };
  } catch (error) {
    console.error("Error fetching cards:", error);
    return { status: "error", message: "Failed to fetch cards" };
  }
};
