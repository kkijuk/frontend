import axios from 'axios';

//활동 내역 클릭하면 CareerId를 넘겨주고 그 CareerId에 맞는 정보들 불러오기

export const ViewCareerDetail = async (careerId, type) => {
	try {
		const response = await axios.get(`https://api.kkijuk.com/career/${type}/${careerId}`, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더에 토큰 포함
			},
			withCredentials: true, // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄
		});
		console.log('API 호출 URL:', `https://api.kkijuk.com/career/${type}/${careerId}`);

		console.log('통신 완료: ', response.data);
		return response.data; // 응답 데이터 반환
	} catch (error) {
		console.log('API 호출 URL:', `https://api.kkijuk.com/career/${type}/${careerId}`);

		console.log('Error', error.message);
		if (error.response) {
			console.log('서버 오류 응답 데이터:', error.response.data);
			console.log('서버 오류 상태 코드:', error.response.status);
			console.log('서버 오류 헤더:', error.response.headers);
		}
		return [];
	}
};
