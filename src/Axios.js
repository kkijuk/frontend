import axios from 'axios';
import { refreshAccessToken } from './services/refreshToken';
import useAuthStore from './stores/useAuthStore';

// Axios 인스턴스 생성 
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// 무한 요청 방지를 위한 플래그
let isRefreshing = false;

// **추가: 대기 중인 요청을 저장하는 큐**
let refreshQueue = [];

// 요청을 보내기 전 실행되는 인터셉터
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 401 에러 처리 및 토큰 재발급
export const setupApiInterceptors = (navigate) => {
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const { logout } = useAuthStore.getState();

            if (error.response?.status === 401) {
                if (isRefreshing) {
                    // **추가: 기존 요청을 큐에 저장하고, 토큰 재발급 후 재시도**
                    return new Promise((resolve) => {
                        refreshQueue.push((newToken) => {
                            error.config.headers['Authorization'] = `Bearer ${newToken}`;
                            resolve(api.request(error.config));
                        });
                    });
                }

                isRefreshing = true; // 무한 요청 방지 플래그 설정

                try {
                    const success = await refreshAccessToken();
                    if (success) {
                        const newToken = useAuthStore.getState().token;
                        error.config.headers['Authorization'] = `Bearer ${newToken}`;

                        // **추가: 모든 대기 중인 요청을 재시도**
                        refreshQueue.forEach((callback) => callback(newToken));
                        refreshQueue = [];

                        return api.request(error.config);
                    } else {
                        // 재발급 실패 시 로그아웃 및 리디렉트
                        logout();
                        navigate('/');
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    logout();
                    navigate('/');
                } finally {
                    isRefreshing = false; // 재발급 프로세스 종료
                }
            }

            return Promise.reject(error);
        }
    );
};

export default api;
