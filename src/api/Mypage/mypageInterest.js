import api from '../../Axios';

// 마이페이지 - 관심 분야 가져오기
export const mypageInterest = async () => {
	try {
		const response = await api.get('/member/myPage/field');
		return response.data.field;
	} catch (error) {
		console.error('mypageInterest API 호출 중 오류:', error.message);
		throw error;
	}
};
