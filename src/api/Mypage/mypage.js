import api from '../../Axios';
// 비밀번호 재확인 페이지: 가려진 이메일 & 로그인 방식 불러오기
export const fetchLogindata = async () => {
	try {
		const response = await api.get('/member/getEmail');
		console.log('가려진 이메일 및 로그인 방식:', response.data);
		return response.data;
	} catch (error) {
		console.error('로그인 데이터 가져오는 중 오류 발생:', error);
		throw error;
	}
};

// 이메일 중복 확인
export const fetchEmail = async (inputEmail) => {
	try {
		const response = await api.post('/member/checkEmail', { email: inputEmail });
		console.log('fetchEmail 응답 데이터:', response.data);
		return response.data;
	} catch (error) {
		console.error('Email 중복 확인 중 오류 발생:', error);
		throw error;
	}
};

// 사용자 정보 가져오기
export const fetchUserInfo = async () => {
	try {
		const response = await api.get('/member/myPage/info');
		return response.data;
	} catch (error) {
		console.error('사용자 정보를 가져오는 중 오류 발생:', error);
		throw error;
	}
};

// 사용자 정보 수정
export const changeUserInfo = async (email, phoneNumber, birthDate, marketingAgree) => {
	try {
		const response = await api.put('/member/myPage/info', {
			email,
			phoneNumber,
			birthDate,
			marketingAgree,
		});
		return response.data;
	} catch (error) {
		console.error('사용자 정보 수정 중 오류 발생:', error);
		throw error;
	}
};

// 회원 탈퇴
export const quitUser = async () => {
	try {
		const response = await api.post('/member/inactive', {});
		return response.data;
	} catch (error) {
		console.error('회원 탈퇴 중 오류 발생:', error);
		throw error;
	}
};

// 이메일 인증 코드 전송
export const sendCode = async (email) => {
	try {
		const response = await api.post('/auth', { email });
		return response.data;
	} catch (error) {
		console.error('인증번호 전송 중 오류 발생:', error);
		throw error;
	}
};

// 인증번호 확인
export const verifyCode = async ({ email, authNumber }) => {
	console.log('API 요청 데이터:', { email, authNumber });
	try {
		const response = await api.post('/auth/confirm', { email, authNumber });
		console.log('API 응답 데이터 response.data:', response.data);
		return response.data;
	} catch (error) {
		console.error('인증번호 확인 중 오류 발생:', error);
		throw error;
	}
};
