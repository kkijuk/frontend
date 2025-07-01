import { create } from 'zustand';

const useAuthStore = create((set) => ({
	token: null,
	refreshToken: null,
	isLoggedIn: false,
	isProfileComplete: false,

	// 초기 상태 복원
	restoreState: () => {
		const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzOTA2OTA1MTk3IiwiaWF0IjoxNzUxMjkyNzQ0LCJleHAiOjE3NTEyOTYzNDQsImlzUHJvZmlsZUNvbXBsZXRlIjp0cnVlfQ.T0B4wvrfKKxlDk9Xf8YfuWfmzVahR9oxVUVaXQI9P7U';
		const refreshToken = localStorage.getItem('refreshToken') || 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTA2OTA1MTk3IiwianRpIjoiZTEzNWUzOTgtMDQyYy00OTU4LWJlMjMtYWVhOWU3YjBhOTBlIiwiaWF0IjoxNzUxMjkyNzQ0LCJleHAiOjE3NTEzNzkxNDR9.2AXoy7w3J0VCaYuw8IQZf9KClr9wz4rvwpzkNBW25E4';
		const isProfileComplete = localStorage.getItem('isProfileComplete') === 'true';

		set({
			token: token || null,
			refreshToken: refreshToken || null,
			isLoggedIn: !!token,
			isProfileComplete: isProfileComplete,
		});
	},

	// 로그인 시 토큰 저장
	login: (token, refreshToken, isProfileComplete) => {
		if (token) localStorage.setItem('token', token);
		if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
		localStorage.setItem('isProfileComplete', isProfileComplete);

		set({
			token: token,
			refreshToken: refreshToken,
			isLoggedIn: true,
			isProfileComplete,
		});
	},

	// 로그아웃 시 토큰 제거
	logout: () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('isProfileComplete');
		set({
			token: null,
			refreshToken: null,
			isLoggedIn: false,
			isProfileComplete: false,
		});
	},

	// 액세스 토큰 갱신
	updateAccessToken: (newAccessToken, newRefreshToken) => {
		if (newAccessToken) {
			localStorage.setItem('token', newAccessToken);
			set({ token: newAccessToken });
		}

		if (newRefreshToken) {
			localStorage.setItem('refreshToken', newRefreshToken);
			set({ refreshToken: newRefreshToken });
		}
	},
}));

export default useAuthStore;

// **앱 초기화 시 상태 복원**
useAuthStore.getState().restoreState();

// **localStorage 변경 감지 추가**
if (typeof window !== 'undefined') {
	window.addEventListener('storage', () => {
		useAuthStore.getState().restoreState();
	});
}
