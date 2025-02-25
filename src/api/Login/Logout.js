import api from '../../Axios';
import useAuthStore from '../../stores/useAuthStore';

export const logout = async () => {
    try {
        const { token, refreshToken, logout } = useAuthStore.getState();

        if (!token || !refreshToken) {
            console.warn('이미 로그아웃된 상태입니다.');
            return;
        }

        // 로그아웃 API 요청 시 accessToken과 refreshToken 포함
        const response = await api.post(
            '/member/logout',
            {
                refreshToken: refreshToken, // RequestBody에 refreshToken 포함
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Header에 accessToken 포함
                    accept: '*/*',
                },
            }
        );

        console.log('API 응답 데이터:', response.data); // 응답 로그 추가

        if (response.status === 200) {
            console.log('로그아웃 성공');

            // 상태 초기화 및 토큰 삭제
            logout();
            console.log('스토어 로그아웃 실행 완료');

            return true;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('로그아웃 오류:', error.message);

        // 예외 처리: refreshToken이 null이거나 유효하지 않은 경우
        if (error.response && error.response.data === '유효하지 않은 토큰입니다.') {
            console.warn('유효하지 않은 토큰입니다. 로그아웃 상태 초기화');

            // 상태 초기화 및 로그인 페이지로 리다이렉트
            logout();
            window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        } else {
            throw new Error(error.message);
        }
    }
};
