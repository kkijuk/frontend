export const getRecruitCalendar = async (year, month) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/recruit/calendar?year=${year}&month=${month}`, {
			credentials: 'include', // 쿠키와 인증 정보를 함께 보냄
		});
		if (!response.ok) {
			throw new Error('Failed to fetch recruit calendar data');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching recruit calendar data:', error);
		throw error;
	}
};