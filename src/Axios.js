import axios from 'axios';
import { refreshAccessToken } from './services/refreshToken';
import useAuthStore from './stores/useAuthStore';

// Axios 인스턴스 생성성
const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

// 무한 요청 방지 플래그
let isRefreshing = false;

// Authorization 헤더 추가
api.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if(token){
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
)

// 응답 인터셉터: 401 에러 처리 및 토큰 재발급
export const setupApiInterceptors = ( navigate ) => {
	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const {setSnackbarOpen, logout} = useAuthStore.getState();
	
			if (error.response?.status === 401){
				if (isRefreshing) {
					// 다른 요청이 이미 재발급 중인 경우, 실패 처리
					return Promise.reject(error);
				}
	
				isRefreshing = true; // 무한 호출 방지 플래그 설정
			
	
				try{
					const success = await refreshAccessToken(); // 토큰 재발급 요청
					if (success) {
						// 새로 발급받은 액세스 토큰으로 실패한 요청 재시도
						const newToken = useAuthStore.getState().token;
						error.config.headers['Authorization'] = `Bearer ${newToken}`;
						return api.request(error.config);
					} else {
						// 재발급 실패 시 로그아웃 및 리디렉션
						useAuthStore.getState().logout();
						navigate('/');
						setSnackbarOpen({
							text: '세션이 만료되었습니다. 다시 로그인해주세요.',
							severity: 'warning',
						});
					}
				} catch (refreshError) {
					console.error('Token refresh failed:', refreshError);
					useAuthStore.getState().logout();
					navigate('/');
				} finally {
					isRefreshing = false; // 재발급 프로세스 종료
				}
			}
	
			return Promise.reject(error); // 다른 에러는 그대로 반환
		}
	)
}


export default api;
