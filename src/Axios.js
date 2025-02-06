import axios from 'axios';
import { refreshAccessToken } from './services/refreshToken';
import useAuthStore from './stores/useAuthStore';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// 무한 요청 방지 플래그
let isRefreshing = false;

// 요청 인터셉터: 토큰 검증 및 리디렉션 처리
export const setupApiInterceptors = (navigate, location) => {
    api.interceptors.request.use(
        (config) => {
            const { token, logout } = useAuthStore.getState();

            if (!token) {
                // 🔹 토큰 없는 사용자는 무조건 '/'로 이동
                if (location.pathname !== '/') {
                    navigate('/');
                }
                return Promise.reject(new Error('No authentication token. Redirecting to login.'));
            }

            // 🔹 토큰이 있는 사용자는 '/'로 이동 못하게 막음
            if (location.pathname === '/') {
                return Promise.reject(new Error('Authenticated users cannot access login page.'));
            }

            // 🔹 Authorization 헤더에 토큰 추가
            config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    // 응답 인터셉터: 401 에러 처리 및 토큰 재발급
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const { setSnackbarOpen, logout } = useAuthStore.getState();

            if (error.response?.status === 401) {
                if (isRefreshing) {
                    return Promise.reject(error);
                }

                isRefreshing = true;

                try {
                    const success = await refreshAccessToken();
                    if (success) {
                        const newToken = useAuthStore.getState().token;
                        error.config.headers['Authorization'] = `Bearer ${newToken}`;
                        return api.request(error.config);
                    } else {
                        // 🔹 로그아웃 및 리디렉션
                        logout();
                        navigate('/');
                        setSnackbarOpen({
                            text: '세션이 만료되었습니다. 다시 로그인해주세요.',
                            severity: 'warning',
                        });
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    logout();
                    navigate('/');
                    setSnackbarOpen({
                        text: '세션이 만료되었습니다. 다시 로그인해주세요.',
                        severity: 'warning',
                    });
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};

export default api;
