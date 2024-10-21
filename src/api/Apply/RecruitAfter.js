export const getRecruitListAfterDate = async (date) => {
	try {
		console.log('Fetching recruit list after date:', date); // 디버깅용 로그 추가

		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/recruit/list/after?time=${encodeURIComponent(date)}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'accept': '*/*',
				},
				credentials: 'include',
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch recruit list');
		}

		const data = await response.json();
		console.log('Recruit list fetched:', data); // 디버깅용 로그 추가

		// recruitData의 recruits 배열이 비어있는 경우 처리
		if (!data.recruits || data.recruits.length === 0) {
			console.warn('No recruits found after the specified date.');
		}

		return data;
	} catch (error) {
		console.error('Error fetching recruit list:', error);
		throw error;
	}
};
