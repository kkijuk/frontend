import axios from 'axios';

export const CareertextEdit = async (careerId, categoryEnName, summary) => {
	try {
		// 요청 데이터 형식
		const requestData = {
			type: categoryEnName.toUpperCase(), // 대문자로 변환 (API 요구사항에 맞게)
			summary: summary,
		};

		// API 요청
		const response = await axios.patch(
			`https://api.kkijuk.com/career/${careerId}`, // API 엔드포인트
			requestData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		// 성공 시 응답 출력
		console.log('Career text updated successfully:', response.data);
		return response.data;
	} catch (error) {
		// 에러 처리
		console.error('Error updating career text:', error);
		if (error.response) {
			console.error('Server responded with:', error.response.data);
		}
		throw error; // 에러를 상위 호출자로 전달
	}
};

export const CareerEdit = async (careerId, data) => {
	try {
		//무원추가
		console.log('Received data: ', data);
		const response = await axios.patch(
			`https://api.kkijuk.com/career/${careerId}`,
			data,

			{
				withCredentials: true,

				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				// 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄
			},
		);
		console.log('CareerDetailEdit.js 원래 데이터 출력 : ', response.data);
		return response.data;
	} catch (error) {
		console.log('Error', error.message);
		if (error.response) {
			console.log('서버 오류 응답 데이터:', error.response.data);
			console.log('서버 오류 상태 코드:', error.response.status);
			console.log('서버 오류 헤더:', error.response.headers);
		}
	}
};

export const CareerDelete = async (careerId) => {
	try {
		const response = await axios.delete(
			`https://api.kkijuk.com/career/${careerId}`,

			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			},
		);
		console.log('CareerEdit.js 원래 데이터 출력 : ', response.data);
		return response.data;
	} catch (error) {
		console.log('Error', error.message);
		if (error.response) {
			console.log('서버 오류 응답 데이터:', error.response.data);
			console.log('서버 오류 상태 코드:', error.response.status);
			console.log('서버 오류 헤더:', error.response.headers);
		}
	}
};
