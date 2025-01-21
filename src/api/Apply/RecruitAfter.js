import api from '../../Axios'; 

export const getRecruitListAfterDate = async (date) => {
	try {
		console.log('Fetching recruit list after date:', date); // 디버깅용 로그 추가

		// Axios GET 요청
		const response = await api.get(`/recruit/list/after`, {
			params: {
				time: date, // 쿼리 파라미터 추가
			},
		});

		const data = response.data;
		console.log('Recruit list fetched:', data); // 디버깅용 로그 추가

		// recruitData의 recruits 배열이 비어있는 경우 처리
		if (!data.recruits || data.recruits.length === 0) {
			console.warn('No recruits found after the specified date.');
		}

		return data;
	} catch (error) {
		console.error('Error fetching recruit list:', error.message);
		throw error;
	}
};
