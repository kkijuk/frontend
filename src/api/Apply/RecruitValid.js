import api from '../../Axios'; 

export const getValidRecruitList = async (date) => {
  if (!date) {
    console.error('Date parameter is required for fetching valid recruit list');
    throw new Error('Date parameter is required');
  }

  try {
    console.log('Fetching valid recruit list after date:', date); // 디버깅용 로그 추가

    // Axios GET 요청
    const response = await api.get(`/recruit/list/valid`, {
      params: { time: encodeURIComponent(date) }, // 쿼리 파라미터 전달
    });

    console.log('Valid recruit list fetched:', response.data); // 디버깅용 로그 추가

    // API 응답 데이터 반환
    return response.data;
  } catch (error) {
    console.error('Error fetching valid recruit list:', error.message);
    throw error;
  }
};
