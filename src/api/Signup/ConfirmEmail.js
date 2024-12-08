export async function confirmEmail(email) {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/member/confirmEmail`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'accept': '*/*',
			},
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || '이메일 중복 확인 중 오류가 발생했습니다.');
		}

		const data = await response.json();
		return data; // 중복 확인 성공 시 true/false 반환
	} catch (error) {
		throw new Error(error.message);
	}
}
