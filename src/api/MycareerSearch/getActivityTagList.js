import api from '../../Axios';

export const getActivityTagList = async (searchParam) => {
	try {
		return await api.get(`/career/find/taglist?keyword=${searchParam}`);
	} catch (error) {
		console.error('내커리어 활동검색 검색 태그 조회 API 오류: ', error);
	}
};
