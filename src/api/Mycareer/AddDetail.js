import api from '../../Axios';

//수정

export const AddDetail = async (careerId, data) => {
	try {
		console.log('저장할 데이터:', data);
		console.log('careerId:', careerId);

		const response = await api.post(`/career/detail/${careerId}`, data);

		console.log('통신 완료 : ', response.data);
		return response.data;
	} catch (error) {
		console.error('Error:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error; // 필요 시 호출한 쪽에서 catch 가능
	}
};
