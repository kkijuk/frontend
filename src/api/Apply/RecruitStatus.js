import api from '../../Axios'; 

export const updateRecruitStatus = async (recruitId, status) => {
  if (!recruitId || !status) {
    console.error('Invalid parameters for API request');
    throw new Error('Both recruitId and status are required');
  }

  try {
    // Axios로 PATCH 요청
    const response = await api.patch(`/recruit/${recruitId}/status`, { status });

    console.log('Recruit status updated:', response.data);

    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('Error updating recruit status:', error.message);
    throw error; // 에러를 그대로 throw
  }
};
