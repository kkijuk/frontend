import api from '../../Axios'; // Axios 인스턴스를 가져옵니다.

// 공고 태그 불러오기 (GET)
export const fetchModalTags = async () => {
	try {
		const response = await api.get('/recruit/tag'); // Axios 인스턴스를 사용
		return response.data.tags; // 서버에서 받은 태그 목록 반환
	} catch (error) {
		console.error('Error fetching tags:', error);
		return [];
	}
};

// 공고 태그 추가 (POST)
export const addModalTag = async (tagName) => {
	try {
		const response = await api.post(`/recruit/tag`, null, {
			params: { tag: tagName }, // 쿼리 파라미터로 전달
		});
		return response.data; // 서버에서 추가된 태그 반환
	} catch (error) {
		console.error('Error adding tag:', error);
		throw error;
	}
};

// 공고 태그 삭제 (DELETE)
export const deleteModalTag = async (tagName) => {
	try {
		await api.delete(`/recruit/tag`, {
			params: { tag: tagName }, // 쿼리 파라미터로 전달
		});
	} catch (error) {
		console.error('Error deleting tag:', error);
		throw error;
	}
};
