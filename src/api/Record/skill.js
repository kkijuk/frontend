import api from '../../Axios';

const createSkill = async (data) => {
	try {
		const response = await api.post(`/history/resume/skill`, data);
		console.log('Success-createSkill: ', data);
		return response.data;
	} catch (error) {
		console.error('Error-createSkill: ', error);
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

const updateSkill = async (skillId, data) => {
	try {
		const response = await api.patch(`/history/resume/skill?skillId=${skillId}`, data);
		console.log('Success-updateSkill:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-updateSkill:', error);
		if (error.response) {
			//서버 응답이 있는 경우
			console.error('Server responded with status code:', error.response.status);
			console.error('Server responded with: ', error.response.data);
		} else if (error.request) {
			//요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received: ', error.request);
		} else {
			//요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request:', error.message);
		}
	}
};

const deleteSkill = async (skillId) => {
	try {
		const response = await api.delete(`/history/resume/skill?skillId=${skillId}`);
		console.log('Success-deleteSkill:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-deleteSkill:', error);
		if (error.response) {
			//서버 응답이 있는 경우
			console.error('Server responded with status code:', error.response.status);
			console.error('Server responded with: ', error.response.data);
		} else if (error.request) {
			//요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received: ', error.request);
		} else {
			//요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request:', error.message);
		}
	}
};

export { createSkill, updateSkill, deleteSkill };
