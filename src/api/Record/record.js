import api from '../../Axios';

// [이력서 생성]
// 회원 가입과 동시에 고유한 id를 가진 하나의 이력서가 생성됩니다.
const createRecord = async (data) => {
	try {
		const response = await api.post('/history/resume', data);
		console.log('Success - createRecord:: ', response.data);
	} catch (error) {
		console.error('Error: createRecord: ', error);
		if (error.response) {
			// 서버 응답이 있는 경우
			console.error('Server responded with status code:', error.response.status);
			console.error('Server responded with: ', error.response.data);
		} else if (error.request) {
			// 요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received: ', error.request);
		} else {
			// 요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request: ', error.message);
		}
	}
};

// [이력서 전체 조회]
// 이력서 페이지 접속 시에 호출합니다.
const readRecord = async () => {
	try {
		const response = await api.get('/history/resume/', {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});
		console.log('Success - readRecord: ', response.data);
		return response.data.data;
	} catch (error) {
		console.error('Error - readRecord:', error);
		if (error.response) {
			// 서버 응답이 있는 경우
			console.error('Server responded with status code:', error.response.status);
			console.error('Response Data:', error.response.data);
		} else if (error.request) {
			// 요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received. Request details:', error.request);
		} else {
			// 요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request:', error.message);
		}
	}
};

// [이력서 정보 수정]
// 프로필 사진 또는 주소가 바뀔 때 해당 api가 호출됩니다.
const updateRecord = async (recordId, data) => {
	try {
		const response = await api.patch(`/history/resume/?recordId=${recordId}`, data);
		console.log('Success - updateRecode:', response.data);

		return response.data;
	} catch (error) {
		console.error('Error-updateRecord:', error);
		if (error.response) {
			// 서버 응답이 있는 경우
			console.error('Server responded with status code:', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			// 요청이 전송되었으나 응답을 받지 못한 경우
			console.error('No response received:', error.request);
		} else {
			// 요청 설정 중에 발생한 에러
			console.error('Error setting up request:', error.message);
		}
	}
};

export default { createRecord, readRecord, updateRecord };
