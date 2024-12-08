import axios from 'axios';


export const fetchRecruitList = async (keyword) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/recruit`, {
        withCredentials: true, // 쿠키 인증을 사용하는 경우 필요
      params: { keyword },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching recruit list:', error);
    throw error;
  }
};
