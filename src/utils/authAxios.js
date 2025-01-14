import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import { refreshAccessToken } from '../services/refreshToken'; // 토큰 재발급 함수

const useAuthAxios = () => {
    const navigate = useNavigate();
    const { setSnackbarOpen } = useAuthStore.getState(); // 알림 설정 함수 가져오기

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    });

    // 무한 요청 방지 플래그
    let isRefreshing = false;

     // 요청 전 토큰을 Authorization 헤더에 추가
    axiosInstance.interceptors.request.use((config) => {
        const token = useAuthStore.getState().token; // Zustand에서 토큰 가져오기
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    // 응답 인터셉터: 401 에러 처리 및 토큰 재발급
    axiosInstance.interceptors.response.use(
        (response) => response, // 성공 응답 그대로 반환
        async (error) => {
            if (error.response?.status === 401) {
                if (isRefreshing) {
                    // 다른 요청이 이미 재발급 중인 경우, 실패 처리
                    return Promise.reject(error);
                }

                isRefreshing = true; // 무한 호출 방지 플래그 설정

                try {
                    const success = await refreshAccessToken(); // 토큰 재발급 요청
                    if (success) {
                        // 새로 발급받은 액세스 토큰으로 실패한 요청 재시도
                        const newToken = useAuthStore.getState().token;
                        error.config.headers['Authorization'] = `Bearer ${newToken}`;
                        return axiosInstance.request(error.config);
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
    );

    return axiosInstance;
};

export default useAuthAxios;
