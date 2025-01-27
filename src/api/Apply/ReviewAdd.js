import api from '../../Axios';

export const ReviewAdd = async (recruitId, reviewData) => {
    try {
        const response = await api.post(`/recruit/${recruitId}/review`, reviewData);
        return response.data; // 성공적으로 추가된 리뷰 데이터 반환
    } catch (error) {
        if (error.response) {
            console.error('Error message from server:', error.response.data.message); // 서버에서 반환된 에러 메시지
        }
        console.error('Error adding review:', error);
        throw error;
    }
};
