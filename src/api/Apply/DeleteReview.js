import api from '../../Axios';

export const deleteReview = async (recruitId, reviewId) => {
    try {
        await api.delete(`/recruit/${recruitId}/review/${reviewId}`);
        return true; // 성공적으로 삭제되었음을 반환
    } catch (error) {
        if (error.response) {
            console.error('Error message from server:', error.response.data.message); // 서버 에러 메시지
        }
        console.error('Error deleting review:', error.message);
        throw error;
    }
};
