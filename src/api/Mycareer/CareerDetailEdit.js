import api from '../../Axios'; // 수정: 직접 axios 대신 api 인스턴스 사용

// 내커리어 career detail 수정
export const CareerDetailEdit = async (careerId, detailId, data) => {
	try {
		const response = await api.patch(`/career/detail/${careerId}/${detailId}`, data);
		console.log('CareerDetailEdit 수정 완료 데이터 출력:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error;
	}
};

// 내커리어 career detail 삭제
export const CareerDetailDelete = async (careerId, detailId) => {
	try {
		const response = await api.delete(`/career/detail/${careerId}/${detailId}`);
		console.log('CareerDetailDelete 삭제 완료 데이터 출력:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error;
	}
};
