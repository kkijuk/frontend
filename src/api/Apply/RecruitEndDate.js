export const getRecruitListEndDate = async (date) => {
	if (!date) {
		console.error('No date provided for API request');
		throw new Error('Date parameter is required');
	}

	console.log('Fetching recruit list for end date:', date);

	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/recruit/list/end?date=${encodeURIComponent(date)}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'accept': '*/*',
			},
			credentials: 'include',
		});

		if (!response.ok) {
			console.error('API response error:', response.status, response.statusText);
			throw new Error('Failed to fetch recruit list for end date');
		}

		const data = await response.json();
		console.log('Recruit list fetched:', data);

		return data.recruits;
	} catch (error) {
		console.error('Error fetching recruit list for end date:', error.message);
		throw error;
	}
};