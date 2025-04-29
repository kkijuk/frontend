import api from '../../Axios'; // 수정: api 인스턴스 사용

// 내커리어 텍스트 수정
export const CareertextEdit = async (careerId, categoryEnName, summary) => {
	try {
		const requestData = {
			type: categoryEnName.toUpperCase(), // 대문자로 변환
			summary: summary,
		};

		const response = await api.patch(`/career/${careerId}`, requestData);
		console.log('Career text updated successfully:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error updating career text:', error);
		if (error.response) {
			console.error('Server responded with:', error.response.data);
		}
		throw error;
	}
};

// 내커리어 수정 (전체 데이터 보내는 버전)
export const CareerEdit = async (careerId, data) => {
	try {
		console.log('Received data: ', data);
		const response = await api.patch(`/career/${careerId}`, data);
		console.log('CareerEdit 수정 완료 데이터 출력:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error updating career:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error;
	}
};

// 내커리어 삭제
export const CareerDelete = async (careerId) => {
	try {
		const response = await api.delete(`/career/${careerId}`);
		console.log('CareerDelete 삭제 완료 데이터 출력:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error deleting career:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error;
	}
};
