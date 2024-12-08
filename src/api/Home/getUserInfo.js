export const getUserInfo = async () => {
	const apiUrl = `${process.env.REACT_APP_API_URL}/dashboard/user-info`;

	try {
		const response = await fetch(apiUrl, {
			credentials: 'include', // 쿠키와 인증 정보를 함께 보냄
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.error('Failed to fetch data:', response.status);
			return null;
		}
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
};
