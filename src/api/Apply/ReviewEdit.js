import api from '../../Axios';

export async function editReview(recruitId, reviewId, reviewData) {
    try {
        const response = await api.put(`/recruit/${recruitId}/review/${reviewId}`, reviewData);
        return response.data; // 성공적으로 수정된 리뷰 데이터 반환
    } catch (error) {
        if (error.response) {
            console.error('Error message from server:', error.response.data.message); // 서버에서 반환된 에러 메시지
        }
        console.error('Failed to edit review:', error);
        throw error;
    }
}
