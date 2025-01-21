import api from '../../Axios'; 

export const getRecruitCalendar = async (year, month) => {
  try {
    // Axios로 요청
    const response = await api.get(`/recruit/calendar`, {
      params: { year, month }, // 쿼리 파라미터 전달
    });

    return response.data; // JSON 데이터 반환
  } catch (error) {
    console.error('Error fetching recruit calendar data:', error);
    throw error; // 에러 다시 던지기
  }
};
