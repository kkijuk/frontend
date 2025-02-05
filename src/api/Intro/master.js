import api from '../../Axios';
//마스터 자기소개서란? 모든 공고에 공통적으로 포함되는 질문을 추려놓은 자기소개서
//한 회원 당 하나의 자기소개서가 생성됩니다.

// [마스터 자기소개서 생성]
// 회원 가입과 동시에 고유한 id를 가진 하나의 이력서가 생성됩니다.
const createMaster = async (data) => {
	try {
		const response = await api.post(`/history/intro/master`, data);
		console.log('Sucess-createMaster: ', response.data);
		return response.data.data;
	} catch (error) {
		console.error('Error-createMaster: ', error);
		if (error.response) {
			//서버 응답이 있는 경우
			console.error('Server responded with status code: ', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			//요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received: ', error.request);
		} else {
			//요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request: ', error.message);
		}
	}
};

// [마스터 자기소개서 조회]
const readMaster = async () => {
	try {
		const response = await api.get(`/history/intro/master`);
		console.log('Success-readMaster:', response.data);
		return response.data.data;
	} catch (error) {
		console.error('Error-readMaster: ', error);
		if (error.response) {
			// 서버 응답이 있는 경우
			console.error('Server responded with status code: ', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			// 요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received: ', error.request);
		} else {
			// 요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request: ', error.message);
		}
	}
};

// [마스터 자기소개서 수정]
const updateMaster = async (data) => {
	try {
		const response = await api.patch(`/history/intro/master`, data);
		console.log('Success-updateMaster:', response.data);
		return response.data.data;
	} catch (error) {
		console.error('Error-updateMaster: ', error);
		if (error.response) {
			// 서버 응답이 있는 경우
			console.error('Server responded with status code: ', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			// 요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received: ', error.request);
		} else {
			// 요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request: ', error.message);
		}
	}
};

export { createMaster, readMaster, updateMaster };
