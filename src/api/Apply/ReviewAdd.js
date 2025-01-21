import api from '../../Axios'; 

export const ReviewAdd = async (recruitId, reviewData) => {
  if (!recruitId || !reviewData) {
    console.error('Recruit ID and review data are required for adding a review');
    throw new Error('Recruit ID and review data are required');
  }

  try {
    console.log('Adding review for recruit ID:', recruitId); // 디버깅용 로그 추가

    // Axios POST 요청
    const response = await api.post(`/recruit/${recruitId}/review`, reviewData);

    console.log('Review added successfully:', response.data); // 디버깅용 로그 추가

    // API 응답 데이터 반환
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error.message);
    throw error;
  }
};
