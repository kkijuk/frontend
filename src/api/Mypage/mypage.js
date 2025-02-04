import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// 비밀번호 재확인 페이지 랜더링 시 가려진 이메일이랑 로그인 방식을 받아온다.
export const fetchLogindata = async () => {
	try {
		const response = await axios.get(`${apiUrl}/member/getEmail`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더에 토큰 포함
			},
			withCredentials: true, // 쿠키와 인증 정보를 함께 보냄
		});

		console.log('가려진 이메일 및 로그인 방식:', response.data);
		return response.data;
	} catch (error) {
		console.error('로그인 데이터 가져오는 중 오류 발생:', error);
		if (error.response) {
			console.error('서버 오류 응답 데이터:', error.response.data);
			console.error('서버 오류 상태 코드:', error.response.status);
			console.error('서버 오류 헤더:', error.response.headers);
		}
		throw error; // 오류를 다시 던져서 호출 측에서 처리할 수 있도록 함
	}
};

export const fetchEmail = async (inputEmail) => {
	try {
		const response = await fetch(`${apiUrl}/member/checkEmail`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
			credentials: 'include',
			body: JSON.stringify({ email: inputEmail }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// 단순 true/false 반환 처리
		const data = await response.json();
		console.log('fetchEmail 응답 데이터:', data); // true 또는 false
		return data; // true 또는 false 그대로 반환
	} catch (error) {
		console.log('Error:', error.message);
		throw error;
	}
};

// 사용자 정보를 가져오는 API 함수
export const fetchUserInfo = async () => {
	try {
		const response = await axios.get(`${apiUrl}/member/myPage/info`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더에 토큰 포함
			},
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('사용자 정보를 가져오는 중 오류 발생:', error);
		throw error;
	}
};

export const changeUserInfo = async (phoneNumber, birthDate, marketingAgree) => {
	try {
		const response = await axios.put(
			`${apiUrl}/member/myPage/info`,
			{
				phoneNumber,
				birthDate,
				marketingAgree,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더에 토큰 포함
				},
				withCredentials: true,
			},
		);
		return response.data;
	} catch (error) {
		console.error('사용자 정보를 가져오는 중 오류 발생:', error);
		throw error;
	}
};

export const quitUser = async () => {
	try {
		const response = await axios.post(
			`${apiUrl}/member/inactive`,
			{},
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더에 토큰 포함
				},
				withCredentials: true,
			},
		);
		return response.data;
	} catch (error) {
		console.error('사용자 정보를 가져오는 중 오류 발생:', error);
		throw error;
	}
};

// 이메일 인증 코드 전송 API
export const sendCode = async (email) => {
	try {
		const response = await axios.post(
			`${apiUrl}/auth`,
			{ email },
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
				withCredentials: true,
			},
		);
		return response.data;
	} catch (error) {
		console.error('인증번호 전송 중 오류 발생:', error);
		throw error;
	}
};

//인증번호 확인
export const verifyCode = async (email) => {
	try {
		const response = await axios.post(
			`${apiUrl}/auth/confirm`,
			{ email },
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
				withCredentials: true,
			},
		);
		return response.data;
	} catch (error) {
		console.error('인증번호 전송 중 오류 발생:', error);
		throw error;
	}
};
