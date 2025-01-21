import api from '../../Axios'; 

export const getUserInfo = async () => {
  try {
    // Axios GET 요청
    const response = await api.get('/dashboard/user-info');

    // 응답 데이터 반환
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    return null;
  }
};
