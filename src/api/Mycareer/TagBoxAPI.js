import api from '../../Axios'; // 수정: api 인스턴스 사용

// 태그 리스트 가져오기
export const TagBoxFetchList = async () => {
	try {
		const response = await api.get('/career/tag');
		console.log('태그 리스트 가져오기 완료: ', response.data);
		return response.data.data.tagList; // ✅ tagList만 반환
	} catch (error) {
		console.error('Error fetching tag list:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		return []; // 실패 시 빈 배열 반환
	}
};

// 새 태그 추가하기
export const TagBoxCreateTag = async (tagName) => {
	try {
		const response = await api.post('/career/tag', { tagName });
		console.log('태그 생성 완료: ', response.data);
		return response.data;
	} catch (error) {
		console.error('Error creating tag:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error;
	}
};

// 태그 삭제하기
export const TagBoxDeleteTag = async (tagId) => {
	try {
		const response = await api.delete(`/career/tag/${tagId}`);
		console.log('태그 삭제 완료: ', response.data);
		return response.data;
	} catch (error) {
		console.error('Error deleting tag:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error;
	}
};
