import api from '../../Axios'; 

export const getRecruitListEndDate = async (date) => {
  if (!date) {
    console.error('No date provided for API request');
    throw new Error('Date parameter is required');
  }

  console.log('Fetching recruit list for end date:', date);

  try {
    // Axios로 GET 요청
    const response = await api.get(`/recruit/list/end`, {
      params: { date }, // 쿼리 파라미터 전달
    });

    console.log('Recruit list fetched:', response.data);

    return response.data.recruits; // 응답 데이터의 recruits 반환
  } catch (error) {
    console.error('Error fetching recruit list for end date:', error.message);
    throw error;
  }
};
