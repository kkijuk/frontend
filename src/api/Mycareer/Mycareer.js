import axios from 'axios';
const apiUrl = 'https://api.kkijuk.com/career';

export const addCareer = async () => {
	try {
		const response = await axios.get(`${apiUrl}?status=year`, {
			withCredentials: true,

			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더에 토큰 포함
			},
		});
		console.log('통신 완료 : ', response.data);
	} catch (error) {
		console.log('Error', error.message);
		if (error.response) {
			console.log('서버 오류 응답 데이터:', error.response.data);
			console.log('서버 오류 상태 코드:', error.response.status);
			console.log('서버 오류 헤더:', error.response.headers);
		}
	}
};
