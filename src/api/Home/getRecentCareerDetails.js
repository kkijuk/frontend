import api from '@/Axios';

export const getRecentCareerDetails = async () => {
  try {
    const response = await api.get('/career/detail/dashboard');
    return response.data?.data ?? [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      
      return [];
    }
    throw error; 
  }
};
