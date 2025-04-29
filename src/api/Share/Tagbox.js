import api from '../../Axios';

// 태그 박스 리스트 가져오기
export const TagBoxApi = async () => {
	try {
		const response = await api.get('/career/tag');
		console.log('통신 완료:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error;
	}
};
