import api from '../../Axios';

export const getActivityDetailSearch = async (searchParam, sort) => {
	try {
		return await api.get(`/career/find/detail?keyword=${searchParam}&sort=${sort}`);
	} catch (error) {
		console.error('내커리어 활동검색 활동기록 API 오류: ', error);
	}
};
