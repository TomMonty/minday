import axios from 'axios';

const API_URL = 'http://localhost:5000/api/quiz';

export const getQuestions = async (category, count) => {
  try {
    const response = await axios.get(API_URL);
    let questions = response.data.filter(q => q.category === category);
    if (count && count > 0 && count < questions.length) {
      questions = questions.sort(() => 0.5 - Math.random()).slice(0, count);
    }
    return { status: "success", data: questions };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return { status: "error", message: "Failed to fetch questions" };
  }
};
