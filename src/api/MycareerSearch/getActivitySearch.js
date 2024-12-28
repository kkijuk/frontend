import api from '../../Axios';

export const getActivitySearch = async (searchParam, sort) => {
	try {
		return await api.get(`/career/find?keyword=${searchParam}&sort=${sort}`);
	} catch (error) {
		console.error('내커리어 활동검색 API 오류: ', error);
	}
};
