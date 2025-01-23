import api from '../../Axios'; 

export async function editReview(recruitId, reviewId, reviewData) {
  if (!recruitId || !reviewId || !reviewData) {
    console.error('Recruit ID, Review ID, and Review Data are required');
    throw new Error('Missing parameters for editing review');
  }

  try {
    console.log('Editing review for recruit ID:', recruitId, 'review ID:', reviewId); // 디버깅용 로그 추가

    // Axios PUT 요청
    const response = await api.put(`/recruit/${recruitId}/review/${reviewId}`, reviewData);

    console.log('Review edited successfully:', response.data); // 디버깅용 로그 추가

    return response.data; // 수정된 리뷰 데이터 반환
  } catch (error) {
    console.error('Failed to edit review:', error.message);
    throw error;
  }
}
