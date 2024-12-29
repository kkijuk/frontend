import api from '../../Axios';

export const getActivityByTag = async (tagID, sort) => {
	try {
		return await api.get(`/career/find/tag?tagId=${tagID}&sort=${sort}`);
	} catch (error) {
		console.error('내커리어 활동검색 선택 태그 활동 기록 조회 API 오류: ', error);
	}
};
