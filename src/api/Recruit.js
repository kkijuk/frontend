import axios from 'axios';

const API_URL = 'http://43.203.222.231/recruit';

export const addJob = async (job) => {
  try {
    const response = await axios.post(`${API_URL}`, job);
    return response.data;
  } catch (error) {
    console.error("Error adding job", error);
    throw error;
  }
};



















