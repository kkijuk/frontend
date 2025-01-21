import api from '../../Axios'; 

export const deleteRecruit = async (id) => {
	try {
		// Axios DELETE 요청
		const response = await api.delete(`/recruit/${id}`);

		// 성공 시 데이터 반환
		return response.data;
	} catch (error) {
		console.error('Error deleting recruit:', error.message);
		throw error;
	}
};
