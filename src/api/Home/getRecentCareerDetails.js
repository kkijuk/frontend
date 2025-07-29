import api from '@/Axios';

export const getRecentCareerDetails = async () => {
  const response = await api.get('/career/detail/dashboard');
  return response.data.data;
};
