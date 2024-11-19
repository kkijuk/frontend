import api from '../../Axios';
import record from './record';

const createLicense = async (recordId, data) => {
	try {
		const response = await api.post(`/history/resume/license/recordId=${record}`);
		console.log('Success-createLicense:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error deleting education:', error);
		if (error.response) {
			// 서버 응답이 있는 경우
			console.error('Server responded with status code:', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			// 요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received:', error.request);
		} else {
			// 요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request:', error.message);
		}
	}
};

const updateLicense = async (licenseId, data) => {
	try {
		const response = api.patch(`/history/resume/licence/licenseId=${licenseId}`);
		console.log('Success-createing license: ', response.data);
		return response.data;
	} catch (error) {
		if (error.response) {
			// 서버 응답이 있는 경우
			console.error('Server responded with status code:', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			// 요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received:', error.request);
		} else {
			// 요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request:', error.message);
		}
	}
};

const deleteLicense = async (licenseId, data) => {
	try {
		const response = api.delete(`/history/resume/license=${licenseId}`);
		console.log('Success-deleteing license:', response.data);
		return (await response).data;
	} catch (error) {}
};

export default { createLicense, updateLicense, deleteLicense };
