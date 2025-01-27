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

//이메일 일치하는지 확인
export const fetchEmail = async () => {
	try {
		const response = await fetch(`${apiUrl}/member/checkEmail`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더에 토큰 포함
			},
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('이메일 가져오기 완료 : ', data);
		return data.email;
	} catch (error) {
		console.log('Error', error.message);
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

export const changeUserInfo = async () => {
	try {
		const response = await axios.put(`${apiUrl}/member/myPage/info`, {
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

export const quitUser = async () => {
	try {
		const response = await axios.post(`${apiUrl}/member/inactive`, {
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
