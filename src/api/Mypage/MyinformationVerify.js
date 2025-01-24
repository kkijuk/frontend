const apiUrl = process.env.REACT_APP_API_URL;
export const verifyPassword = async (currentPassword) => {
	try {
		const response = await fetch(`${apiUrl}/member/myPage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			credentials: 'include',
			body: JSON.stringify({ currentPassword }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('T/F:', data);
		return data;
	} catch (error) {
		console.error('비밀번호 확인 실패:', error.message);
		throw error;
	}
};
