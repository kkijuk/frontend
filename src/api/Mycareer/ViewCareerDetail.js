import api from '../../Axios'; // 수정: api 인스턴스 사용

// 활동 내역 클릭 시 CareerId에 맞는 상세 정보 가져오기
export const ViewCareerDetail = async (careerId, type) => {
	try {
		const response = await api.get(`/career/${type}/${careerId}`);
		console.log('API 호출 URL:', `/career/${type}/${careerId}`);
		console.log('통신 완료: ', response.data);
		return response.data;
	} catch (error) {
		console.error('API 호출 URL:', `/career/${type}/${careerId}`);
		console.error('Error fetching career detail:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error; // 실패 시 에러를 던져서 상위 컴포넌트에서 핸들 가능하게
	}
};
