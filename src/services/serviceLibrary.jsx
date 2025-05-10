import axios from 'axios';

const API_URL = 'http://localhost:5000/api/facts';

export const getFact = async (id) => {
  try {
    const response = await axios.get(API_URL);
    const fact = response.data.find(item => item._id === id);
    if (fact) {
      return { status: "success", data: fact };
    } else {
      return { status: "error", message: "Fact not found", data: null };
    }
  } catch (error) {
    console.error("Error fetching fact:", error);
    return { status: "error", message: "Failed to fetch fact" };
  }
};

export const searchFacts = async (query) => {
  try {
    const response = await axios.get(API_URL);
    const searchTerm = query.toLowerCase();
    const results = response.data.filter(fact =>
      fact.title.toLowerCase().includes(searchTerm) ||
      fact.content.toLowerCase().includes(searchTerm) ||
      fact.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    return { status: "success", data: results };
  } catch (error) {
    console.error("Error searching facts:", error);
    return { status: "error", message: "Failed to search facts" };
  }
};
