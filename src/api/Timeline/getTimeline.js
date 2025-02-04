import api from '../../Axios';

export const getTimeline = async () => {
	try {
		return await api.get(`/career/timeline`);
	} catch (error) {
		console.error('타임라인 API 오류', error);
		throw error;
	}
};
