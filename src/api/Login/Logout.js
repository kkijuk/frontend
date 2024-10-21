export async function logout() {
	const apiUrl = `${process.env.REACT_APP_API_URL}/logout`;

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				accept: '*/*',
			},
			credentials: 'include',
		});

		if (response.ok) {
			const resultText = await response.text();

			if (resultText === 'logout success') {
				console.log('로그아웃 성공:', resultText);
				return true;
			} else {
				throw new Error('Unexpected response format');
			}
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || '로그아웃 중 오류가 발생했습니다.');
		}
	} catch (error) {
		console.error('로그아웃 오류:', error.message);
		throw new Error(error.message);
	}
}
