import axios from 'axios';

// 공고 태그 불러오기 (GET)
export const fetchModalTags = async () => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_API_URL}/recruit/tag`, {
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
		return response.data.tags; // 서버에서 받은 태그 목록 반환
	} catch (error) {
		console.error('Error fetching tags:', error);
		return [];
	}
};

// 공고 태그 추가 (POST)
export const addModalTag = async (tagName) => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_API_URL}/recruit/tag?tag=${tagName}`, {}, {
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
		return response.data; // 서버에서 추가된 태그 반환
	} catch (error) {
		console.error('Error adding tag:', error);
	}
};

// 공고 태그 삭제 (DELETE)
export const deleteModalTag = async (tagName) => {
	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/recruit/tag?tag=${tagName}`, {
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
	} catch (error) {
		console.error('Error deleting tag:', error);
	}
};