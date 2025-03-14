import api from '../../Axios';

export const getMycareerActivityByView = async (status) => {
	try {
		return await api.get(`/career?status=${status}`);
	} catch (error) {
		console.error('내커리어 활동 API 오류: ', error);
	}
};
