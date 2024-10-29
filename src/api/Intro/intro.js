import api from '../../Axios';
//others 자기소개서: 마스터 자기소개서를 제외한, 기업 공고 별로 하나씩 생성되는 자기소개서 입니다.

// [others 자기소개서 생성]
const createIntro = async (recruitId, data) => {
	try {
		const response = await api.post(`/history/intro?recruitId=${recruitId}`, data);
		console.log('Sucess-createIntro: ', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-createIntro: ', error);
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

// [others 자기소개서 조회]
const readIntro = async (introId) => {
	try {
		const response = await api.get(`/history/intro/detail/?introId=${introId}`);
		console.log('Success-readIntro:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-readIntro: ', error);
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

// [others 자기소개서 수정]
const updateIntro = async (introId, data) => {
	try {
		const response = await api.patch(`/history/intro?introId=${introId}`, data);
		console.log('Success-updateIntro:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-updateIntro: ', error);
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

// [others 자기소개서 삭제]
const deleteIntro = async (introId) => {
	try {
		const response = await api.delete(`/history/intro?introId=${introId}`);
		console.log('Success-deleteIntro:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-deleteIntro: ', error);
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

export { createIntro, readIntro, updateIntro, deleteIntro };
