import api from '../../Axios'; 

export const deleteReview = async (recruitId, reviewId) => {
	try {
		// Axios DELETE 요청
		const response = await api.delete(`/recruit/${recruitId}/review/${reviewId}`);

		// 성공 시 true 반환
		return true;
	} catch (error) {
		console.error('Error deleting review:', error.message);
		throw error;
	}
};
