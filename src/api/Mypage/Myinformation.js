import api from '../../Axios';

// 내 정보 불러오기 (이메일, 이름, 휴대폰번호, 생년월일)
export const fetchMyinfo = async () => {
	try {
		const response = await api.get('/member/myPage/info');
		console.log('내 정보 가져오기 완료:', response.data);
		return response.data;
	} catch (error) {
		console.error('내 정보 가져오기 에러:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
		}
		throw error;
	}
};

// 수정된 내 정보 보내기
export const changeMyinfo = async (name, phoneNumber, birthDate, marketingAgree) => {
	try {
		const requestData = {
			name,
			phoneNumber,
			birthDate,
			marketingAgree,
		};

		const response = await api.put('/member/myPage/info', requestData);
		console.log('내 정보 수정 완료:', response.data);
		return response.data; // ✅ 수정 완료된 데이터 반환
	} catch (error) {
		console.error('내 정보 수정 에러:', error.message);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
		}
		throw error;
	}
};
